<template>
  <div class="flex w-full h-full items-start justify-center relative mt-20">
    <div class="flex flex-col text-white text-[24px] gap-10 items-center">
      <div class="text-center text-[42px]">
        สวัสดีครับ ^-^ ยินดีต้อนรับนักเรียน <br>
        เข้าสู่ห้องเรียน 360° กับบทเรียนเรื่องเฟือง <br>
        ที่จะพาไปสู่โลกกว้างและกิจกรรมสนุกๆมากมายต่อที่แคมป์ <br>
      </div>
      <form class="flex flex-col justify-center items-start w-full gap-6" @submit.prevent="onSubmit">
        <div class="text-[24px]">
          อีเมล*
        </div>
        <div class="text-[24px]">
          <input v-model="form.email" class="bg-white text-black rounded-[15px] w-[700px] h-[80px] pl-5"
            type="email" name="email" id="email" required>
        </div>
        <div class="flex flex-col justify-center items-start">
          <div class="text-[24px]">
            รหัสผ่าน*
          </div>
          <div class="text-[24px]">
            <input v-model="form.password" class="bg-white text-black rounded-[15px] w-[700px] h-[80px] pl-5"
              type="password" name="password" id="password" required>
          </div>
          <div class="text-white text-[24px] mt-10">
            *ข้อมูลที่นักเรียนจำเป็นต้องกรอก
          </div>
        </div>
        <div class="flex flex-col gap-4 w-full items-start">
          <button type="submit"
            class="flex w-fit h-[70px] px-20 bg-[#FFC233] text-black hover:bg-[#B97530] hover:text-white drop-shadow-xl font-medium
rounded-[15px] items-center justify-center cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            :disabled="submitting">
            {{ submitting ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ' }}
          </button>
          <div v-if="error" class="text-red-200 text-[18px]">{{ error }}</div>
          <div v-if="success" class="text-green-200 text-[18px]">{{ success }}</div>
        </div>
      </form>
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

const config = useRuntimeConfig()
const form = reactive({
  email: '',
  password: '',
})

const submitting = ref(false)
const error = ref('')
const success = ref('')

const onSubmit = async () => {
  error.value = ''
  success.value = ''
  submitting.value = true
  try {
    await $fetch(`${config.public.apiBase}/auth/login`, {
      method: 'POST',
      body: form,
      credentials: 'include',
    })
    success.value = 'เข้าสู่ระบบสำเร็จ! สามารถเริ่มต้นการเรียนรู้ได้เลย'
  } catch (err: any) {
    error.value = err?.data?.message ?? 'ไม่สามารถเข้าสู่ระบบได้ กรุณาลองอีกครั้ง'
  } finally {
    submitting.value = false
  }
}
</script>

<style></style>
