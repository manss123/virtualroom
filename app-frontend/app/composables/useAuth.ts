type User = {
  id: string;
  email: string | null;
  firstName: string;
  lastName: string;
  sex?: string | null;
  age?: number | null;
  school?: string | null;
  grade?: string | null;
};

export function useAuth() {
  const { $api } = useNuxtApp();
  const user = useState<User | null>("user", () => null);
  const ready = useState<boolean>("authReady", () => false);

  const me = async () => {
    try {
      const res = await $api<{ user: User }>("/auth/me");
      user.value = res.user;
    } catch {
      user.value = null;
    } finally {
      ready.value = true;
    }
  };

  const login = async (payload: { email: string; password: string }) => {
    await $api("/auth/login", { method: "POST", body: payload });
    await me();
  };

  const register = async (payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    sex?: string;
    age?: number;
    school?: string;
    grade?: string;
  }) => {
    await $api("/auth/register", { method: "POST", body: payload });
    await me();
  };

  const logout = async () => {
    await $api("/auth/logout", { method: "POST" });
    user.value = null;
  };

  /** เรียกใช้ตรงๆใน guard เพื่อตรวจสถานะให้ชัวร์ */
  const ensure = async () => {
    if (!ready.value) await me();
    return !!user.value;
  };

  return { user, ready, me, login, register, logout, ensure, useAuth };
}
