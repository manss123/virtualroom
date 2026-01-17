import { ref, computed, onMounted, onUnmounted } from "vue";

type Options = {
  onFinished?: () => void;
  storageKey?: string;
};

function formatHHMMSS(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

type Persisted = {
  startedAtMs: number;
  mainEndAtMs: number;
  finalEndAtMs: number; // main + grace
};

export function useCountdown(
  mainSeconds: number,
  graceSeconds: number,
  options: Options = {}
) {
  const remainingSeconds = ref(mainSeconds);
  const timeLeftText = computed(() => formatHHMMSS(remainingSeconds.value));

  const startedAtMs = ref<number>(Date.now());
  const mainEndAtMs = ref<number>(Date.now() + mainSeconds * 1000);
  const finalEndAtMs = ref<number>(
    Date.now() + (mainSeconds + graceSeconds) * 1000
  );

  const nowMs = ref(Date.now());

  const isMainTimeUp = computed(() => nowMs.value >= mainEndAtMs.value);
  const isFinalTimeUp = computed(() => nowMs.value >= finalEndAtMs.value);
  const isInGrace = computed(() => isMainTimeUp.value && !isFinalTimeUp.value);

  let rafId: number | null = null;
  let intervalId: number | null = null;
  let mainFinishedCalled = false;
  let finalFinishedCalled = false;

  function loadPersisted() {
    if (!options.storageKey) return null;
    const raw = localStorage.getItem(options.storageKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Persisted;
    } catch {
      return null;
    }
  }

  function persist() {
    if (!options.storageKey) return;
    const payload: Persisted = {
      startedAtMs: startedAtMs.value,
      mainEndAtMs: mainEndAtMs.value,
      finalEndAtMs: finalEndAtMs.value,
    };
    localStorage.setItem(options.storageKey, JSON.stringify(payload));
  }

  function computeRemaining() {
    const now = Date.now();
    nowMs.value = now;

    const diff = Math.ceil((finalEndAtMs.value - now) / 1000);
    remainingSeconds.value = Math.max(0, diff);

    if (!finalFinishedCalled && now >= finalEndAtMs.value) {
      finalFinishedCalled = true;
      options.onFinished?.();
    }
  }

  function tickRaf() {
    computeRemaining();
    rafId = requestAnimationFrame(tickRaf);
  }

  function start() {
    mainFinishedCalled = false;
    finalFinishedCalled = false;

    const persisted = loadPersisted();
    if (persisted) {
      startedAtMs.value = persisted.startedAtMs;
      mainEndAtMs.value = persisted.mainEndAtMs;
      finalEndAtMs.value = persisted.finalEndAtMs;
    } else {
      startedAtMs.value = Date.now();
      mainEndAtMs.value = startedAtMs.value + mainSeconds * 1000;
      finalEndAtMs.value =
        startedAtMs.value + (mainSeconds + graceSeconds) * 1000;
      persist();
    }

    computeRemaining();

    rafId = requestAnimationFrame(tickRaf);
    intervalId = window.setInterval(computeRemaining, 1000);

    const onVis = () => computeRemaining();
    document.addEventListener("visibilitychange", onVis);

    onUnmounted(() => {
      document.removeEventListener("visibilitychange", onVis);
    });
  }

  function reset() {
    startedAtMs.value = Date.now();
    mainEndAtMs.value = startedAtMs.value + mainSeconds * 1000;
    finalEndAtMs.value =
      startedAtMs.value + (mainSeconds + graceSeconds) * 1000;
    remainingSeconds.value = mainSeconds + graceSeconds;
    mainFinishedCalled = false;
    finalFinishedCalled = false;
    persist();
  }

  function stop() {
    if (rafId != null) cancelAnimationFrame(rafId);
    if (intervalId != null) clearInterval(intervalId);
    rafId = null;
    intervalId = null;
  }

  function clearStorage() {
    if (!options.storageKey) return;
    localStorage.removeItem(options.storageKey);
  }

  onMounted(start);
  onUnmounted(stop);

  return {
    timeLeftText,
    remainingSeconds,

    startedAtMs,
    mainEndAtMs,
    finalEndAtMs,

    isMainTimeUp,
    isFinalTimeUp,
    isInGrace,

    reset,
    stop,
    clearStorage,
  };
}
