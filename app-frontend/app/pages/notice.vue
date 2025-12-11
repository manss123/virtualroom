<template>
    <div class="flex w-full h-full text-white items-center justify-center overflow-auto">
        <div class="flex w-fit h-full items-center justify-end">
            <img class="w-auto h-auto" :src="getImageURL('images/cartoons/gear-ghost.png')" alt="">
        </div>
        <div
            class="relative flex flex-col items-center justify-start lg:w-[844px] lg:h-fit bg-[#C4C5C54D] rounded-nw shadow-[#FFC233] shadow-md">
            <div class="text-[36px] font-medium text-[#FFC233] py-9">
                แจ้งให้นักเรียนทราบครับ !!
            </div>
            <div
                class="w-full h-[496px] flex justify-center items-center rounded-nw bg-white overflow-y-auto text-black">
                <div class="max-w-[860px] h-full py-6 text-center text-[26px]">
                    สิ่งที่นักเรียนจะได้เจอต่อไปนี้คือ แบบทดสอบก่อนเรียน <br />
                    เรื่องเฟือง มีทั้งหมด 17 ข้อ <span class="text-[#FF0000]"> ภายในเวลา 60 นาที </span> <br />
                    หากหมดเวลาแล้วนักเรียนยังทำไม่เสร็จ <br />
                    ระบบจะปิดรับคำตอบและตรวจนับคะแนนเท่าที่นักเรียนทำได้ <br />
                    <br />
                    ดังนั้นก่อนกดเริ่มทำแบบทดสอบ ให้นักเรียนเตรียมตัวให้เรียบร้อย <br />
                    เช่น เช็กอินเตอร์เน็ต เช็กแบตเตอรี่ที่ใช้งานอยู่ <br />
                    เพื่อไม่พลาดการทำแบบทดสอบต่อเนื่องและลื่นไหลภายในเวลาที่กำหนด
                </div>
            </div>

            <button @click="next" class="absolute -bottom-7 flex w-[300px] h-[80px] text-[26px] font-medium bg-[#FFC233] text-black hover:bg-[#B97530] hover:text-white drop-shadow-xl font-medium
            rounded-[15px] items-center justify-center cursor-pointer">
                พร้อมทำแบบทดสอบ
            </button>
        </div>

    </div>
</template>

<script setup lang="ts">
// import { useAuth } from '~/composables/useAuth'
// definePageMeta({ middleware: ['auth'] })

// const { user, ready } = useAuth()

const { getImageURL } = useAssetUrl()

const next = async () => {
    return navigateTo('/pretest', { replace: true })
}
</script>
