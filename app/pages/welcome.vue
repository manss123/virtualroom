<template>
  <div class="w-full 3xl:h-[calc(100vh-70px)] flex items-start justify-center" :style="{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }">
    <div class="max-w-10/12 flex w-full flex-col items-center">
      <div class="flex flex-col items-center justify-center w-full max-w-5xl mt-[106px]">
        <div class="text-[#FFC233] font-semibold text-5xl">
          ENJOY LEARNING !!!
        </div>
        <div class="text-white text-[42px] text-center">
          ยินดีต้อนรับสู่ห้องเรียน 360° กับบทเรียนเรื่องเฟือง <br>
          โดยนักเรียนสามารถปลดล็อกไปทีละห้องได้ตามลำดับครับ
        </div>
      </div>
      <!-- Youtube Container -->
      <div class="w-full flex my-14 bg-gray-200 min-h-[800px] h-full cursor-pointer"></div>
      <!-- bottom buttons -->
      <div class="flex items-center justify-center">
        <button type="button" @click="goToLearningHome"
          class="flex w-[260px] h-[60px] justify-center items-center text-[22px] bg-[#FFC233] hover:bg-[#B97530] text-black hover:text-white drop-shadow-xl rounded-[15px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
          เข้าใจแล้ว เริ่มกันเลย!
        </button>
      </div>
    </div>
    </div>
</template>

<script lang="ts" setup>
import bg from '~/assets/images/bg/welcome-bg.png'

definePageMeta({
  middleware: ["auth"],
});

const router = useRouter()

const goToLearningHome = () => {
  router.push('/learning')
}

</script>

<style></style>