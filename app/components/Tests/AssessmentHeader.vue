<template>
    <div class="flex flex-col xl:flex-row w-full justify-between items-center mt-6">
        <div class="flex flex-col xl:flex-row items-center">
            <img v-if="leftIcon" class="w-[118px] h-auto" :src="leftIcon" alt="" />
            <div class="text-[36px] ml-4">
                {{ title }}
            </div>
        </div>

        <div v-if="showTimer" class="flex flex-col xl:flex-row items-center gap-5">
            <div class="text-[36px]">เวลาที่เหลือ:</div>
            <div
                class="flex items-center justify-center text-[36px] w-[250px] h-20 rounded-nw bg-[#FF0000] text-white font-bold">
                {{ timeText }}
            </div>
            <img v-if="rightIcon" class="w-[118px] h-auto" :src="rightIcon" alt="" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: { type: String, required: true },
    timeText: { type: String, default: '' },
    showTimer: { type: Boolean, default: true },
    leftIcon: { type: String, default: '' },
    rightIcon: { type: String, default: '' },
});
</script>
