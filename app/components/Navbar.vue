<template>
  <ClientOnly>
    <div class="bg-[#FFC233] w-full fixed top-0 z-50 shadow-md">

      <!-- Top bar -->
      <div class="flex h-[70px] items-center justify-between px-5 md:px-[45px]">

        <!-- Logo -->
        <NuxtLink class="text-[#342F35] text-xl font-bold" to="/">
          Engineer Gear-Train
        </NuxtLink>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex items-center gap-10 font-medium text-[#342F35]">
          <template v-if="authStatus !== 'authed'">
            <NuxtLink to="/" class="hover:underline">Sign in</NuxtLink>
          </template>

          <template v-else>
            <NuxtLink v-if="isTeacher" to="/teacher/dashboard" class="hover:underline">
              Student Report
            </NuxtLink>

            <NuxtLink 
              v-if="!postTestDone" 
              :to="disabledLink ? '' : '/welcome'" 
              class="hover:underline"
              :class="disabledLink ? 'opacity-50 cursor-not-allowed' : ''">
              Virtual 360° Room
            </NuxtLink>

            <span v-else class="opacity-50 cursor-not-allowed select-none" title="ทำ Post-test แล้ว">
              Virtual 360° Room
            </span>

            <NuxtLink 
              :to="disabledLink ? '' : '/dashboard'" 
              class="hover:underline"
              :class="disabledLink ? 'opacity-50 cursor-not-allowed' : ''">
              My Dashboard
            </NuxtLink>

            <span class="opacity-80">
              {{ displayName }}
            </span>

            <button class="px-4 py-2 rounded-lg bg-[#342F35] text-white hover:opacity-90" :disabled="logoutPending"
              @click="logout">
              {{ logoutPending ? "..." : "Logout" }}
            </button>
          </template>
        </div>

        <!-- Mobile Hamburger Button -->
        <button class="lg:hidden text-[#342F35]" @click="mobileOpen = !mobileOpen">
          <!-- icon -->
          <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>

          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Dropdown Menu -->
      <transition name="slide">
        <div v-if="mobileOpen"
          class="lg:hidden flex flex-col bg-[#FFC233] border-t border-[#e5b91f] px-6 py-4 space-y-4 text-[#342F35] font-medium">
          <template v-if="authStatus !== 'authed'">
            <NuxtLink @click="closeMobile" to="/">Sign in</NuxtLink>
          </template>

          <template v-else>
            <NuxtLink v-if="isTeacher" @click="closeMobile" to="/teacher/dashboard">
              Student Report
            </NuxtLink>

            <NuxtLink v-if="!postTestDone" :to="disabledLink ? '' : '/welcome'"
              :class="disabledLink ? 'opacity-50 cursor-not-allowed' : ''" @click="closeMobile">
              Virtual 360° Room
            </NuxtLink>

            <span v-else class="opacity-50">
              Virtual 360° Room
            </span>

            <NuxtLink :to="disabledLink ? '' : '/dashboard'"
              :class="disabledLink ? 'opacity-50 cursor-not-allowed' : ''" @click="closeMobile">
              My Dashboard
            </NuxtLink>

            <div class="text-sm opacity-70">
              {{ displayName }}
            </div>

            <button class="w-full text-left px-3 py-2 rounded bg-[#342F35] text-white" @click="logout">
              Logout
            </button>
          </template>
        </div>
      </transition>

    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useAuthState } from '~/composables/useAuthState'
import { computed, onMounted, ref } from 'vue'

const { authStatus, displayName, postTestDone, pretestDone, srmDone, planningDone, refreshAuth, clearAuth, me } = useAuthState()

// Disable the Virtual 360° Room link if pre-test, srm, planning is not done yet
const disabledLink = computed(() => !pretestDone.value || !srmDone.value || !planningDone.value)

const logoutPending = ref(false)
const mobileOpen = ref(false)

const isTeacher = computed(() => {
  const email = me.value?.email || ""
  return [
    "chinapat2535@gmail.com",
    "monamorn.research@gmail.com",
    "virtual360room@gmail.com"
  ].includes(email)
})

function closeMobile() {
  mobileOpen.value = false
}

async function logout() {
  try {
    logoutPending.value = true
    await $fetch("/api/auth/logout", { method: "POST" })
    clearAuth()
    mobileOpen.value = false
    await navigateTo("/")
  } finally {
    logoutPending.value = false
  }
}

onMounted(() => {
  refreshAuth()
})
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
