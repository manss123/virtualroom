import { inject, provide, type InjectionKey, type Ref } from "vue";

type ViewName = "Login" | "Register" | "PDPA";
type AuthViewCtx = {
  currentPage: Ref<ViewName>;
  setPage: (p: ViewName) => void;
  toggle: () => void;
};

const AuthViewKey: InjectionKey<AuthViewCtx> = Symbol("AuthView");

export function provideAuthView(initial: ViewName = "Login") {
  const currentPage = ref<ViewName>(initial);
  const setPage = (p: ViewName) => {
    currentPage.value = p;
  };
  const toggle = () =>
    setPage(currentPage.value === "Login" ? "Register" : "Login");

  const ctx: AuthViewCtx = { currentPage, setPage, toggle };
  provide(AuthViewKey, ctx);
  return ctx;
}

export function useAuthView() {
  const ctx = inject(AuthViewKey);
  if (!ctx)
    throw new Error("useAuthView() must be used under provideAuthView()");
  return ctx;
}
