export function useCountdown(
  initialSeconds: number,
  options: { autoStart?: boolean; onFinished?: () => void } = {},
) {
  const remainingSeconds = ref(initialSeconds);
  const timerId = ref<ReturnType<typeof setInterval> | null>(null);

  const timeLeftText = computed(() => {
    const m = Math.floor(remainingSeconds.value / 60);
    const s = remainingSeconds.value % 60;
    const mm = m.toString().padStart(2, '0');
    const ss = s.toString().padStart(2, '0');
    return `${mm} : ${ss}`;
  });

  const isTimeUp = computed(() => remainingSeconds.value <= 0);

  const stop = () => {
    if (timerId.value) {
      clearInterval(timerId.value);
      timerId.value = null;
    }
  };

  const start = () => {
    if (timerId.value) return;
    timerId.value = setInterval(() => {
      if (remainingSeconds.value > 0) {
        remainingSeconds.value -= 1;
      } else {
        stop();
        options.onFinished?.();
      }
    }, 1000);
  };

  const reset = (sec = initialSeconds) => {
    remainingSeconds.value = sec;
  };

  onMounted(() => {
    if (options.autoStart ?? true) start();
  });

  onBeforeUnmount(() => {
    stop();
  });

  return { remainingSeconds, timeLeftText, isTimeUp, start, stop, reset };
}
