<template>
  <div class="flex w-full h-full items-center justify-center relative">
    <div class="flex flex-col text-white text-[24px] gap-10 items-center">
      <div class="text-center text-[42px]">
        ยินดีต้อนรับสู่ค่าย Engineer Gear Train! <br>
      </div>
      <div class="text-center text-[24px]">
        <br>
        กิจกรรมนี้ออกแบบมาเพื่อให้นักเรียนได้เรียนรู้พื้นฐาน <br>
        STEM ที่เกี่ยวข้องกับเฟืองและขบวนเฟือง <br>
        พร้อมฝึกทักษะสำคัญ เช่น การคิดอย่างเป็นระบบ <br>
        การแก้ปัญหาเชิงวิศวกรรม และการควบคุมตนเอง <br>
        <br>
        <!-- ในค่ายนี้ นักเรียนจะได้เรียนรู้เรื่อง <br>
        <br>
        -ทอร์ก การหมุน และอัตราทดเฟือง <br>
        -การต่อขบวนเฟืองและใช้อุปกรณ์ทดลอง <br>
        -กระบวนการออกแบบทางวิศวกรรม (ตั้งแต่ระบุปัญหาจนถึงการปรับปรุงงาน) <br>
        -การคำนวณพื้นฐานที่จำเป็น เช่น อัตราทด ค่าเฉลี่ย และเปอร์เซ็นต์ความคลาดเคลื่อน <br> -->
        กิจกรรมทั้งหมดเน้นการลงมือปฏิบัติจริง ทำงานเป็นทีม และนำความรู้ไปใช้แก้ปัญหาอย่างสร้างสรรค์ <br>
        พร้อมแล้วกดไปหน้าต่อไปเพื่อเริ่มเรียนรู้กันเลย! <br>
      </div>
      <form class="flex flex-col justify-center items-center w-full gap-6">
        <!-- <div class="flex flex-col justify-center items-start">
          <div class="text-[24px]">
            อีเมล*
          </div>
          <div class="text-[24px]">
            <input v-model="form.email" class="bg-white text-black rounded-[15px] w-[700px] h-20 pl-5" type="email"
              name="email" id="email" required>
          </div>
        </div>
        <div class="flex flex-col justify-center items-start">
          <div class="text-[24px]">
            รหัสผ่าน*
          </div>
          <div class="text-[24px]">
            <input v-model="form.password" class="bg-white text-black rounded-[15px] w-[700px] h-20 pl-5"
              type="password" name="password" id="password" required>
          </div>
          <div class="text-white text-[24px] mt-10">
            *ข้อมูลที่นักเรียนจำเป็นต้องกรอก
          </div>
        </div> -->
        <div class="flex flex-col gap-4 w-full items-center justify-start">
          <button type="button"
            class="flex w-fit h-[70px] px-20 bg-[#FFC233] text-black hover:bg-[#B97530] hover:text-white drop-shadow-xl font-medium rounded-[15px] items-center justify-center cursor-pointer"
            @click="onGoogle">
            เข้าใช้งานด้วย Gmail
          </button>

          <!-- keep email/password button if you want -->
          <!-- ... -->

          <div v-if="error" class="text-red-200 text-[18px]">{{ error }}</div>
        </div>
      </form>
      <div class="flex gap-5">
        <div> ยังไม่มีบัญชี? </div>
        <button class="underline cursor-pointer" type="button" @click="auth.setPage('Register')">
          สมัครเปิดบัญชี
        </button>
      </div>
    </div>
    <div class="absolute -bottom-50 hidden 3xl:flex">
      <img class="w-[840px] h-[610px]" :src="getImageURL('images/cartoons/gear-greet.png')" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFirebaseSession } from "~/composables/useAuth";

const { loginWithGoogleAndAttachSession, completeGoogleRedirectIfAny } =
  useFirebaseSession();

const { getImageURL } = useAssetUrl();
const auth = useAuthView();
const router = useRouter();
const error = ref("");

function bumpHome() {
  return router.replace({ path: "/", query: { r: Date.now().toString() } });
}

onMounted(async () => {
  try {
    // if redirected back from Google
    const user = await completeGoogleRedirectIfAny();
    if (user) await bumpHome();
  } catch (e) {
    console.error(e);
  }
});

const onGoogle = async () => {
  error.value = "";
  try {
    const user = await loginWithGoogleAndAttachSession();
    if (user) await bumpHome();
  } catch (err: any) {
    error.value = "ไม่สามารถเข้าสู่ระบบด้วย Google ได้ กรุณาลองอีกครั้ง";
  }
};
</script>



<style></style>