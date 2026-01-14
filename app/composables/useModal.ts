// composables/useModal.ts
type ModalType = "none" | "imageZoom" | "youtubeVideo"| "quiz" | "roomIntro";

type ImageZoomPayload = { src: string };

type QuizPayload = {
  quizId: string;      // e.g. "intro1"
  label?: string;
  hotspotId?: string;  // for marking progress when passed
  roomKey?: string;
};

type YoutubePayload = {
  videoId: string;
  label?: string;

  // OPTIONAL: page can pass an identifier so it knows what to mark done
  hotspotId?: string;
};

type ModalPayloadMap = {
  none: null;
  imageZoom: ImageZoomPayload;
  youtubeVideo: YoutubePayload;
  quiz: QuizPayload;
};

type ModalState<T extends ModalType = ModalType> = {
  open: boolean;
  type: T;
  payload: ModalPayloadMap[T] | null;
};

const state = reactive<ModalState>({
  open: false,
  type: "none",
  payload: null,
});

function lockBody(lock: boolean) {
  if (typeof document === "undefined") return;
  document.body.style.overflow = lock ? "hidden" : "";
}

/** ---- Simple modal event bus (no dependencies) ---- */
type ModalEventMap = {
  "youtube:ended": { videoId: string; hotspotId?: string };
  "quiz:submitted": { quizId: string; hotspotId?: string; passed: boolean; correct: number; total: number };
  "quiz:action": {
    action: "goHome" | "goNext" | "retry" | "close";
    quizId: string;
    hotspotId?: string;
    roomKey?: string;
    passed?: boolean;
  };
  "modal:closed": { type: ModalType };
};

const bus = new EventTarget();

export function onModalEvent<K extends keyof ModalEventMap>(
  name: K,
  handler: (payload: ModalEventMap[K]) => void
) {
  const listener = (e: Event) => handler((e as CustomEvent).detail);
  bus.addEventListener(name as string, listener);
  return () => bus.removeEventListener(name as string, listener);
}

export function emitModalEvent<K extends keyof ModalEventMap>(
  name: K,
  payload: ModalEventMap[K]
) {
  bus.dispatchEvent(new CustomEvent(name as string, { detail: payload }));
}

export function useModal() {
  const openModal = <T extends ModalType>(
    type: T,
    payload: ModalPayloadMap[T]
  ) => {
    state.open = true;
    state.type = type;
    state.payload = payload as any;
    lockBody(true);
  };

  const closeModal = () => {
    const prevType = state.type;
    state.open = false;
    state.type = "none";
    state.payload = null;
    lockBody(false);

    emitModalEvent("modal:closed", { type: prevType });
  };

  return { state, openModal, closeModal, onModalEvent };
}
