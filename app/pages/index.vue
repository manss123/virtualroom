<!-- pages/index.vue -->
<template>
  <component :is="currentComponent" />
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import Login from "~/components/Home/Login.vue";
import Register from "~/components/Home/Register.vue";
import type { ProgressState } from "~/types/progress";

definePageMeta({ middleware: ["guest"] });

const pages = { Login, Register };
const auth = provideAuthView("Login");
const currentComponent = computed(() => pages[auth.currentPage.value]);

const router = useRouter();
const route = useRoute();

type MeResponse = {
  uid: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  classCode: string | null;
};

function redirectByProgress(p: ProgressState) {
  if (!p.pdpaDone) return router.replace("/pdpa");
  if (!p.preTestDone) return router.replace("/notice");
  if (!p.questionnaireDone) return router.replace("/srm");
  if (!p.planningDone) return router.replace("/fuzzy-result");

  const reflectionDone = !!p.reflection?.submitted;
  const postDone = !!p.postTestDone;

  if (!reflectionDone) return router.replace("/reflection");
  if (!postDone) return router.replace("/learning");

  return router.replace("/dashboard");
}

async function gate() {
  // 1) Check session
  let me: MeResponse | null = null;
  try {
    me = await $fetch<MeResponse>("/api/auth/me", { method: "GET" });
  } catch {
    // unauthenticated
    auth.setPage("Login");
    return;
  }

  // 2) Missing student doc -> show Register
  const missingProfile = !me?.firstName;
  if (missingProfile) {
    auth.setPage("Register");
    return;
  }

  // 3) Have profile -> redirect by progress
  try {
    const p = await $fetch<ProgressState>("/api/progress", { method: "GET" });
    redirectByProgress(p);
  } catch {
    // keep page as-is if needed
  }
}

onMounted(gate);

// ✅ Important: rerun gate whenever route changes (e.g., after login we bump query)
watch(
  () => route.fullPath,
  () => gate()
);
</script>
