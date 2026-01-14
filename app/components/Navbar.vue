<template>
  <ClientOnly >
    <div class="flex bg-[#FFC233] w-full h-[70px] items-center justify-between px-[45px] fixed top-0 z-50">
      <NuxtLink class="text-[#342F35] text-xl font-bold" to="/">
        Engineer Gear-Train
      </NuxtLink>
  
      <!-- Center links -->
      <div class="ml-auto flex items-center gap-10 font-medium text-[#342F35]">
        <!-- Not logged in -->
        <template v-if="authStatus !== 'authed'">
          <NuxtLink to="/" class="hover:underline">Sign in</NuxtLink>
        </template>
  
        <!-- Logged in -->
        <template v-else>
          <NuxtLink v-if="me?.email === 'chinapat2535@gmail.com' || me?.email === 'monamorn.research@gmail.com' || me?.email === 'virtual360room@gmail.com'" to="/teacher/dashboard" class="hover:underline">
            Student Report
          </NuxtLink>
          <!-- Virtual Room: show only if NOT post-test done -->
          <NuxtLink v-if="!postTestDone" to="/welcome" class="hover:underline">
            Virtual 360° Room
          </NuxtLink>
  
          <!-- If you prefer "disabled" instead of hidden: -->
          <span v-else class="opacity-50 cursor-not-allowed select-none"
            title="ทำ Post-test แล้ว จึงไม่สามารถเข้าเรียนซ้ำได้">
            Virtual 360° Room
          </span>
  
  
          <NuxtLink to="/dashboard" class="hover:underline">
            My Dashboard
          </NuxtLink>
  
          <!-- User name -->
          <span class="hidden md:inline opacity-80">
            {{ displayName }}
          </span>
  
          <!-- Logout -->
          <button class="px-4 py-2 rounded-lg bg-[#342F35] text-white hover:opacity-90 cursor-pointer"
            :disabled="logoutPending" @click="logout">
            {{ logoutPending ? "..." : "Logout" }}
          </button>
        </template>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useAuthState } from '~/composables/useAuthState';

const { authStatus, displayName, postTestDone, refreshAuth, clearAuth, me } = useAuthState();

const logoutPending = ref(false);

console.log(me.value)

async function logout() {
  try {
    logoutPending.value = true;
    await $fetch("/api/auth/logout", { method: "POST" });
    clearAuth();          // instant UI update
    await navigateTo("/");
  } finally {
    logoutPending.value = false;
  }
}

// Optional: ensure navbar loads state when app starts
onMounted(() => {
  refreshAuth();
});
</script>
