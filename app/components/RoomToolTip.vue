<template>
  <span class="relative inline-flex" ref="root">
    <!-- Trigger -->
    <button type="button"
      class="w-4 h-4 lg:w-6 lg:h-6 rounded-full cursor-pointer border border-[#FFC233] text-[#FFC233] bg-[#342F35] flex items-center justify-center text-xs lg:text-xl"
      @mouseenter="openHover" @mouseleave="closeHover" @click="toggleClick" aria-label="ดูรายละเอียดห้องเรียน">
      !
    </button>

    <!-- Tooltip -->
    <div v-if="open"
      class="absolute z-50 top-0 left-1/2 -translate-x-1/2 -translate-y-full mt-[-10px] w-[360px] max-w-[90vw]"
      @mouseenter="hoverLock = true" @mouseleave="hoverLock = false; closeHover()">
      <!-- arrow -->
      <div
        class="mx-auto w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-black/90">
      </div>

      <div class="bg-[#EFF7F7] text-[#342F35] rounded-xl shadow-2xl p-4 border border-white/10">
        <div class="font-bold text-base">
          :: {{ detail.header }} ::
        </div>

        <ol class="mt-3 space-y-2 text-sm list-decimal list-inside text-left">
          <li v-for="(it, idx) in detail.items" :key="idx" class="leading-relaxed">
            <span>{{ it.title }}</span>
            <span class="opacity-80"> (VDO {{ it.minutes }} นาที)</span>
          </li>
        </ol>

        <div v-if="props.isLow && detail.lowItems?.length" class="font-bold text-base mt-3 ">
          :: ติวเสริม ::
        </div>

        <ol v-if="props.isLow && detail.lowItems?.length"
          class="mt-3 space-y-2 text-sm list-decimal list-inside text-left">
          <li v-for="(it, idx) in detail.lowItems" :key="'low-' + idx">
            <span>{{ it.title }}</span>
            <span class="opacity-80"> (VDO {{ it.minutes }} นาที)</span>
          </li>
        </ol>

      </div>

    </div>
  </span>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

type RoomDetailItem = { title: string; minutes: number; url?: string };
type RoomDetail = { header: string; items: RoomDetailItem[]; lowItems?: RoomDetailItem[]; };

const props = defineProps<{
  detail: RoomDetail;
  isLow?: boolean;
}>();


const open = ref(false);
const root = ref<HTMLElement | null>(null);

// --- hover logic (desktop) ---
const hoverLock = ref(false);

function openHover() {
  // don't fight with click mode; if already open by click keep open
  open.value = true;
}
function closeHover() {
  // if user is hovering tooltip panel, keep it open
  if (hoverLock.value) return;
  // close only if it wasn't opened by click
  open.value = false;
}

// --- click logic (mobile & also ok on desktop) ---
function toggleClick() {
  open.value = !open.value;
}

// --- click outside to close ---
function onDocClick(e: MouseEvent) {
  if (!open.value) return;
  const el = root.value;
  if (!el) return;
  if (el.contains(e.target as Node)) return;
  open.value = false;
}

onMounted(() => document.addEventListener("click", onDocClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocClick));
</script>
