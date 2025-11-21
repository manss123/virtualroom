<template>
  <div>
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
    <navbar />
    <div class="h-[calc(100vh-70px)] w-full overflow-hidden mt-[70px]" :style="{ backgroundImage: `url(${bg})`, backgroundSize: 'cover'}">
      <nuxt-page />
    </div>
  </div>
</template>
<script setup lang="ts">
import bg from '~/assets/images/bg/main-bg.png'
</script>
