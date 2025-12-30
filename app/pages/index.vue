<template>
  <component :is="currentComponent" />
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import Login from '~/components/Home/Login.vue';
import Register from '~/components/Home/Register.vue';

definePageMeta({ middleware: ['guest'] })

const pages = {
  Login,
  Register,
}

const { currentPage } = provideAuthView('Login')
const currentComponent = computed(() => pages[currentPage.value])


const router = useRouter();

interface ProgressState {
  preTestDone: boolean;
  pdpaDone: boolean;
  questionnaireDone: boolean;
  planningDone: boolean;
  completedRooms: string[];
  completedHotspotsByRoom?: Record<
    string,                              // roomKey e.g. "C2"
    string[]                             // hotspot ids in that room
  >;
}

const { data, error } = await useFetch("/api/progress", {
  method: "GET",
});

onMounted(() => {
  // If progress API failed (likely 401 unauthenticated),
  // just stay on this page (Login / Register).
  if (error.value) {
    return;
  }

  const p = (data.value || {}) as ProgressState;

  if (!p.pdpaDone) {
    router.replace("/pdpa");
    return;
  }
  
  if (!p.preTestDone) {
    router.replace("/notice");
    return;
  }
  if (!p.questionnaireDone) {
    router.replace("/srm");
    return;
  }


  if (!p.planningDone) {
    router.replace("/fuzzy-result");
    return;
  }

  router.replace("/welcome");
});


</script>

<style></style>