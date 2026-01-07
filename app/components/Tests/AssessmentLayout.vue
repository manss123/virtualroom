<template>
  <div ref="scroller" class="w-full h-full flex justify-center text-[#FFC233] px-[130px] overflow-auto">
    <div class="w-full flex flex-col justify-start items-center max-w-[1660px]">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from "vue";

const scroller = ref(null);

function scrollToTop(behavior = "smooth") {
  scroller.value?.scrollTo({ top: 0, left: 0, behavior });
}

defineExpose({ scrollToTop });
</script>
