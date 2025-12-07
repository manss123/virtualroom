<template>
    <div class="relative w-full flex items-center justify-center pl-[20%]">
        <div class="w-full max-w-[1024px]">
            <div class="w-full flex">
                <div
                    class="w-full flex items-center justify-center text-[26px] rounded-nw shadow-sm shadow-[#FFC233] gap-3 p-5">
                    <div>
                        แจ้งสถานะการทำ{{ kindLabel }}
                    </div>
                </div>
            </div>

            <div
                class="relative w-full min-h-[500px] flex flex-col items-center justify-center bg-white rounded-nw shadow-md shadow-[#FFC233]">
                <!-- หัวข้อหลัก -->
                <div class="text-[48px] font-bold text-center"
                    :class="isAllAnswered ? 'text-[#1CD725]' : 'text-[#D71C1C]'">
                    <template v-if="isAllAnswered">
                        ยินดีด้วย! <br />
                        ทำครบทุกข้อแล้วครับ!!
                    </template>
                    <template v-else>
                        เอ๊ะๆ! ทำ{{ kindLabel }} <br />
                        ยังไม่ครบทุกข้อนะครับ!!
                    </template>
                </div>

                <!-- ข้อความอธิบาย -->
                <div v-if="isAllAnswered" class="text-[#342F35] text-[26px] font-medium text-center mt-8">
                    นักเรียนทำ{{ kindLabel }}{{ modeLabel }}ครบทุกข้อแล้ว <br />
                    สามารถไปต่อหรือกลับไปทบทวนคำตอบในเวลาที่เหลือได้ครับ
                </div>

                <div v-else class="text-[#342F35] text-[22px] font-medium text-center mt-8 px-6">
                    นักเรียนยังเหลือ{{ kindLabel }} จำนวน
                    <span class="font-bold text-[#FF0000]">
                        {{ missingQuestions.length }}
                    </span>
                    ข้อ คือ ข้อ<br />
                    <span class="font-bold text-[#FF0000]">
                        {{missingQuestions.map((q) => q.mainNumber).join(', ')}}
                    </span>
                </div>

                <!-- ปุ่มด้านล่าง -->
                <div class="absolute -bottom-7 flex left-0 w-full justify-evenly">
                    <button @click="isAllAnswered ? emit('back') : emit('goToFirstMissing')" :class="[
                        'flex w-[300px] h-[80px] text-[26px] bg-[#9DA7A9] hover:bg-[#BDC3C9] text-black drop-shadow-xl rounded-[15px] items-center justify-center cursor-pointer',
                        isTimeUp ? 'opacity-40 cursor-not-allowed' : '',
                    ]" :disabled="isTimeUp">
                        {{ isAllAnswered ? 'ย้อนกลับไปทบทวน' : 'กลับไปทำข้อที่ยังไม่ครบ' }}
                    </button>

                    <button v-if="isAllAnswered" @click="emit('submit')"
                        class="flex w-[300px] h-[80px] text-[26px] bg-[#FFC233] hover:bg-[#B97530] text-black hover:text-white drop-shadow-xl rounded-[15px] items-center justify-center cursor-pointer">
                        ส่ง{{ kindLabel }}
                    </button>
                </div>
            </div>
        </div>

        <!-- รูปภาพด้านซ้าย -->
        <div class="absolute left-[14%] flex w-fit h-full items-center justify-end">
            <img class="w-auto h-full pointer-events-none" :src="isAllAnswered ? happyImage : confusedImage" alt="" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modeLabel: { type: String, default: '' }, // ก่อนเรียน/หลังเรียน
    kindLabel: { type: String, default: 'แบบทดสอบ' }, // หรือ "แบบประเมิน"
    isAllAnswered: { type: Boolean, required: true },
    missingQuestions: { type: Array, default: () => [] },
    isTimeUp: { type: Boolean, default: false },
    happyImage: { type: String, required: true },
    confusedImage: { type: String, required: true },
});

const emit = defineEmits(['back', 'goToFirstMissing', 'submit']);
</script>
