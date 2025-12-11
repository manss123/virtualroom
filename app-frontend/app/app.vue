<template>
  <div>
    <NuxtLoadingIndicator />
    <div>
      <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
      <navbar />
      <div class="h-[calc(100vh-70px)] w-full overflow-auto mt-[70px]"
        :style="{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }">
        <nuxt-page />
      </div>
    </div>
    <!-- <div v-else class="fixed inset-0 flex items-center justify-center bg-black text-white">
      กำลังตรวจสอบเซสชัน...
    </div> -->
  </div>
</template>
<script setup lang="ts">
import bg from '~/assets/images/bg/main-bg.png'

// const { ready, ensure } = useAuth()

// ให้รู้สถานะตั้งแต่ mount แรก (ฝั่ง client)
// onBeforeMount(async () => { await ensure() })
</script>
