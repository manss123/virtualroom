<template>
  <div class="flex w-full h-full items-start justify-center relative mt-20">
    <div class="flex flex-col text-white text-[24px] gap-10 items-center">
      <div class="text-center text-[42px]">
        สวัสดีครับ ^-^ ยินดีต้อนรับนักเรียน <br>
        เข้าสู่ห้องเรียน 360° กับบทเรียนเรื่องเฟือง <br>
        ที่จะพาไปสู่โลกกว้างและกิจกรรมสนุกๆมากมายต่อที่แคมป์ <br>
      </div>
      <div class="flex flex-col justify-center items-start">
        <div class="text-[24px]">
          อีเมล*
        </div>
        <div class="text-[24px]">
          <input class="bg-white text-black rounded-[15px] w-[700px] h-[80px] pl-5" type="email" name="email"
            id="email">
        </div>
      </div>
      <div class="flex flex-col justify-center items-start">
        <div class="text-[24px]">
          รหัสผ่าน*
        </div>
        <div class="text-[24px]">
          <input class="bg-white text-black rounded-[15px] w-[700px] h-[80px] pl-5" type="password" name="password"
            id="password">
        </div>
        <div class="text-white text-[24px] mt-10">
          *ข้อมูลที่นักเรียนจำเป็นต้องกรอก
        </div>
      </div>
      <div
        class="flex w-fit h-[70px] px-20 bg-[#FFC233] text-black hover:bg-[#B97530] hover:text-white drop-shadow-xl font-medium rounded-[15px] items-center justify-center cursor-pointer">
        เข้าสู่ระบบ
      </div>
      <div class="flex gap-5">
        <div> ยังไม่มีบัญชี? </div>
        <button class="underline cursor-pointer" type="button" @click="auth.setPage('Register')">
          สมัครเปิดบัญชี
        </button>
      </div>
    </div>
    <div class="absolute -bottom-50">
      <img class="w-[840px] h-[610px]" :src="getImageURL('images/cartoons/gear-greet.png')" alt="">
    </div>
  </div>
</template>

<script lang="ts" setup>
const { getImageURL } = useAssetUrl()
const auth = useAuthView()
</script>

<style></style>