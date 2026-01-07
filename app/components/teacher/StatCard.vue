<template>
  <div class="bg-[#3b3b3b] rounded-2xl overflow-hidden shadow">
    <div class="px-6 py-4 text-3xl font-semibold text-[#FFC233] text-center border-b border-black/20">
      {{ value }}
    </div>
    <div class="px-6 py-4 text-center text-white/90">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: number }>()
</script>
