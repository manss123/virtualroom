<template>
    <!-- QT1: picture + 4 choice cards (layoutเหมือน 1.1) -->
    <div v-if="block.type === 'QT1'" class="flex flex-col lg:flex-row items-center justify-center gap-14 pb-12 border-b border-black">
        <div class="w-fit h-fit bg-gray-300 rounded-nw flex items-center justify-center">
            <img v-if="block.image" :src="getImageURL(block.image)" alt=""
                class="max-w-690px h-auto object-contain cursor-zoom-in" @click="openZoom(getImageURL(block.image))" />
        </div>

        <div class="flex flex-col w-full lg:w-[763px]">
            <div class="font-bold">{{ block.prompt }}</div>
            <div class="flex flex-col gap-4 mt-8">
                <button v-for="opt in block.options" :key="opt.value" type="button" @click="select(opt.value)"
                    :class="optionClasses(opt.value, 'w-full, h-[100px]')">
                    {{ opt.text }}
                </button>
            </div>
        </div>
    </div>

    <!-- QT2: confidence (2 buttons center) -->
    <div v-else-if="block.type === 'QT2'"
        class="w-full flex flex-col items-center justify-center pb-12 border-b border-black">
        <div class="font-bold">{{ block.prompt }}</div>
        <div class="flex flex-col lg:flex-row w-full items-center justify-evenly mt-8 gap-5 lg:gap-0">
            <!-- <button >
                {{ opt.text }}
            </button> -->

            <div v-for="opt in block.options" :key="opt.value" type="button" @click="select(opt.value)"
                :class="optionClasses(opt.value, 'w-[260px] h-20')">
                {{ opt.text }}
            </div>
        </div>
    </div>

    <!-- QT3: 4 choice cards full width (แบบ 1.3) -->
    <div v-else-if="block.type === 'QT3'"
        class="w-full flex flex-col items-center justify-center pb-12 border-b border-black">
        <div class="font-bold">{{ block.prompt }}</div>
        <div class="flex flex-col gap-4 mt-8 w-full justify-center items-center">
            <button v-for="opt in block.options" :key="opt.value" type="button" @click="select(opt.value)"
                :class="optionClasses(opt.value, 'w-full max-w-[760px] h-fit min-h-[100px] p-4')">
                {{ opt.text }}
            </button>
        </div>
    </div>

    <!-- QT5: Horizontal Image, 4 Choices -->
    <div v-if="block.type === 'QT5'" class="flex flex-col items-center justify-center gap-14 pb-12 border-b border-black">
        <div v-if="block.image" class="w-[690px] h-[370px] bg-gray-300 rounded-nw flex items-center justify-center">
            <img v-if="block.image" :src="block.image" alt="" class="max-w-full max-h-full object-contain"
                @click="openZoom(getImageURL(block.image))" />
        </div>

        <div class="flex flex-col w-full items-center justify-center">
            <div class="font-bold">{{ block.prompt }}</div>
            <div class="flex flex-col lg:flex-row gap-4 mt-8">
                <button v-for="opt in block.options" :key="opt.value" type="button" @click="select(opt.value)"
                    :class="[optionClasses(opt.value, 'flex-col w-full min-h-[100px] h-fit'), opt.image ? ' p-2' : '']">
                    <img v-if="opt.image" :src="getImageURL(opt.image)" :alt="opt.value"
                        @click="openZoom(getImageURL(opt.image))" class="w-[340px] h-[285px] object-contain mb-2" />
                    <!-- label เช่น ก. ข. หรือข้อความ มั่นใจ/ไม่มั่นใจ -->
                    <span v-if="opt.text">
                        {{ opt.text }}
                    </span>
                </button>
            </div>
        </div>
    </div>

    <!-- QT6: 2 Rows Horizontal Image, 4 Choices -->
    <div v-if="block.type === 'QT6'" class="flex flex-col items-center justify-center gap-14 pb-12 border-b border-black">
        <div v-if="block.image" class="w-[690px] h-[370px] bg-gray-300 rounded-nw flex items-center justify-center">
            <img v-if="block.image" :src="block.image" alt="" class="max-w-full max-h-full object-contain"
                @click="openZoom(getImageURL(block.image))" />
        </div>

        <div class="flex flex-col w-full lg:w-auto items-center justify-center">
            <div class="font-bold">{{ block.prompt }}</div>
            <div class="flex flex-col lg:flex-row w-full flex-wrap items-center justify-center gap-x-10 gap-y-10 mt-8">
                <button v-for="opt in block.options" :key="opt.value" type="button" @click="select(opt.value)"
                    :class="[optionClasses(opt.value, 'flex-col w-full lg:w-4/12 min-h-[100px] h-fit'), opt.image ? ' p-2' : '']">
                    <img v-if="opt.image" :src="getImageURL(opt.image)" :alt="opt.value"
                        @click="openZoom(getImageURL(opt.image))" class="w-full h-[285px] object-contain mb-2" />
                    <!-- label เช่น ก. ข. หรือข้อความ มั่นใจ/ไม่มั่นใจ -->
                    <span v-if="opt.text">
                        {{ opt.text }}
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { reactive, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
    block: { type: Object, required: true },
    modelValue: { type: [String, Number, null], default: null },
});

const { getImageURL } = useAssetUrl();
const emit = defineEmits(["update:modelValue"]);

const { openModal } = useModal();
const openZoom = (src) => openModal("imageZoom", { src });

const select = (value) => emit("update:modelValue", value);

const optionClasses = (value, extra = "") =>
    [
        "flex items-center justify-center rounded-nw shadow-md shadow-[#00000040] cursor-pointer",
        "bg-[#EFF7F7] hover:bg-[#bdcece] h-fit lg:h-auto p-4",
        extra,
        props.modelValue === value && "!bg-[#FFC233] !text-black",
    ]
        .filter(Boolean)
        .join(" ");
</script>
