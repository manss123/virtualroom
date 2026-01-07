<template>
  <div class="mt-12">
    <div class="flex items-center justify-between mb-4">
      <div class="text-[#FFC233] text-2xl">{{ title }}</div>
      <button v-if="download" class="text-[#FFC233] hover:underline" @click="download">
        ⬇ ดาวน์โหลดไฟล์
      </button>
    </div>

    <div v-if="note" class="text-[#FFC233]/80 text-sm mb-3">{{ note }}</div>

    <div class="bg-[#3b3b3b] rounded-2xl p-6">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  note?: string
  download?: (() => void) | null
}>()
</script>
