import { ref, computed, onMounted, onUnmounted } from "vue";

type Options = {
  onFinished?: () => void;
  // optional: store key to persist across refresh
  storageKey?: string;
};

function formatHHMMSS(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export function useCountdown(durationSeconds: number, options: Options = {}) {
  const remainingSeconds = ref(durationSeconds);
  const isTimeUp = computed(() => remainingSeconds.value <= 0);
  const timeLeftText = computed(() => formatHHMMSS(remainingSeconds.value));

  // We use a hard end timestamp so throttling doesn't matter
  const startedAtMs = ref<number>(Date.now());
  const endAtMs = ref<number>(Date.now() + durationSeconds * 1000);

  let rafId: number | null = null;
  let intervalId: number | null = null;
  let finishedCalled = false;

  function loadPersisted() {
    if (!options.storageKey) return;

    const raw = localStorage.getItem(options.storageKey);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed?.endAtMs === "number" && typeof parsed?.startedAtMs === "number") {
        startedAtMs.value = parsed.startedAtMs;
        endAtMs.value = parsed.endAtMs;
      }
    } catch {
      // ignore
    }
  }

  function persist() {
    if (!options.storageKey) return;
    localStorage.setItem(
      options.storageKey,
      JSON.stringify({ startedAtMs: startedAtMs.value, endAtMs: endAtMs.value })
    );
  }

  function computeRemaining() {
    const now = Date.now();
    const diff = Math.ceil((endAtMs.value - now) / 1000);
    remainingSeconds.value = Math.max(0, diff);

    if (!finishedCalled && remainingSeconds.value <= 0) {
      finishedCalled = true;
      options.onFinished?.();
    }
  }

  // For smooth UI updates while visible
  function tickRaf() {
    computeRemaining();
    rafId = requestAnimationFrame(tickRaf);
  }

  function start() {
    finishedCalled = false;

    // If persisted, use it; otherwise set fresh
    loadPersisted();
    // If nothing persisted, init
    if (!options.storageKey || !localStorage.getItem(options.storageKey)) {
      startedAtMs.value = Date.now();
      endAtMs.value = startedAtMs.value + durationSeconds * 1000;
      persist();
    }

    computeRemaining();

    // Use RAF while visible (smooth), and an interval fallback (1s) for hidden states
    rafId = requestAnimationFrame(tickRaf);

    intervalId = window.setInterval(() => {
      // Interval might be throttled — but when it runs again it will “catch up”
      computeRemaining();
    }, 1000);

    // When tab becomes visible again, instantly recompute
    const onVis = () => computeRemaining();
    document.addEventListener("visibilitychange", onVis);

    onUnmounted(() => {
      document.removeEventListener("visibilitychange", onVis);
    });
  }

  function reset(newDurationSeconds = durationSeconds) {
    startedAtMs.value = Date.now();
    endAtMs.value = startedAtMs.value + newDurationSeconds * 1000;
    remainingSeconds.value = newDurationSeconds;
    finishedCalled = false;
    persist();
  }

  function stop() {
    if (rafId != null) cancelAnimationFrame(rafId);
    if (intervalId != null) clearInterval(intervalId);
    rafId = null;
    intervalId = null;
  }

  onMounted(start);
  onUnmounted(stop);

  return {
    timeLeftText,
    remainingSeconds,
    isTimeUp,
    startedAtMs,
    endAtMs,
    reset,
    stop,
  };
}
