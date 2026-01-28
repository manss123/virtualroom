<template>
  <div class="w-full h-full flex items-start justify-center" :style="{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }">
    <div class="max-w-10/12 flex w-full flex-col items-center text-center">
      <div class="flex flex-col items-center justify-center w-full max-w-5xl mt-[106px] gap-5 lg:gap-8">
        <div class="text-[#FFC233] font-semibold text-5xl">
          ENJOY LEARNING !!!
        </div>
        <div class="text-[#b99f62] lg:text-white text-3xl lg:text-[42px] text-center">
          ยินดีต้อนรับสู่ห้องเรียน 360° กับบทเรียนเรื่องเฟือง <br class="hidden lg:block">
          โดยนักเรียนสามารถปลดล็อกไปทีละห้องได้ตามลำดับครับ
        </div>
      </div>
      <!-- Youtube Container -->
      <div class="w-full max-w-5xl my-14">
        <div class="relative w-full overflow-hidden rounded-nw shadow-md shadow-[#FFC233] bg-black"
             style="padding-top: 56.25%;">
          <iframe
            class="absolute top-0 left-0 w-full h-full"
            :src="youtubeEmbedUrl"
            title="Welcome Video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
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
  // middleware: ["auth"],
});

const router = useRouter()

const goToLearningHome = () => {
  router.push('/learning')
}

const youtubeEmbedUrl = computed(() => {
  // video id = pZ9h7cjL30Q
  return "https://www.youtube.com/embed/pZ9h7cjL30Q?rel=0&modestbranding=1"
})

</script>

<style></style>