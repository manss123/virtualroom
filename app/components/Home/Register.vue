<template>
  <div class="flex w-full items-center justify-center gap-10 overflow-auto mt-10">
    <div class="flex w-fit h-full items-center justify-end">
      <img class="w-auto h-[750px]" :src="getImageURL('images/cartoons/gear-point.png')" alt="">
    </div>

    <div class="flex w-fit h-full items-center justify-start">
      <form class="flex flex-col w-full justify-start items-center text-[24px] gap-8" @submit.prevent="onSubmit">
        <div class="w-full text-[36px] text-[#FFC233] font-medium">
          กรอกข้อมูลนักเรียนเพิ่มเติมลงในฟอร์มได้เลยครับ
        </div>

        <!-- <div class="flex w-full gap-14">
          <div class="flex flex-col">
            <div class="text-white h-[36px]">อีเมล*</div>
            <input v-model="form.email" class="w-[350px] h-[80px] px-5 bg-[#EFF7F7] rounded-[15px]" type="email"
              required />
          </div>
          <div class="flex flex-col">
            <div class="text-white h-[36px]">รหัสผ่าน* (อย่างน้อย 6 ตัวอักษร)</div>
            <input v-model="form.password" minlength="6" class="w-[350px] h-[80px] px-5 bg-[#EFF7F7] rounded-[15px]"
              type="password" required />
          </div>
        </div> -->

        <!-- แถว ชื่อ - นามสกุล (เดิม) -->
        <div class="flex w-full gap-14">
          <div class="flex flex-col">
            <div class="text-white h-[36px]">ชื่อ*</div>
            <input v-model="form.firstName" class="w-[350px] h-[80px] px-5 bg-[#EFF7F7] rounded-[15px]" type="text"
              required />
          </div>
          <div class="flex flex-col">
            <div class="text-white h-[36px]">นามสกุล*</div>
            <input v-model="form.lastName" class="w-[350px] h-[80px] px-5 bg-[#EFF7F7] rounded-[15px]" type="text"
              required />
          </div>
        </div>

        <!-- แถว เพศ - อายุ - ระดับชั้น (ปรับใหม่) -->
        <div class="flex w-full gap-9">
          <!-- เพศ (Radio group) -->
          <div class="flex flex-col w-fit">
            <div class="text-white h-[36px]">เพศ*</div>
            <div class="flex gap-3">
              <label class="cursor-pointer">
                <input class="sr-only peer" type="radio" name="sex" value="ชาย" v-model="form.sex" required />
                <span class="inline-flex h-[80px] px-6 items-center justify-center rounded-[15px] bg-[#EFF7F7] text-black
                         ring-2 ring-transparent peer-checked:bg-[#FFC233] peer-checked:ring-black/30">
                  ชาย
                </span>
              </label>

              <label class="cursor-pointer">
                <input class="sr-only peer" type="radio" name="sex" value="หญิง" v-model="form.sex" required />
                <span class="inline-flex h-[80px] px-6 items-center justify-center rounded-[15px] bg-[#EFF7F7] text-black
                         ring-2 ring-transparent peer-checked:bg-[#FFC233] peer-checked:ring-black/30">
                  หญิง
                </span>
              </label>
            </div>
          </div>

          <!-- อายุ (Select) -->
          <div class="flex flex-col w-[140px]">
            <div class="text-white h-[36px]">อายุ*</div>
            <select v-model.number="form.age" class="w-full h-[80px] px-5 bg-[#EFF7F7] rounded-[15px] appearance-none"
              required>
              <option value="" disabled>เลือกอายุ</option>
              <option v-for="age in ages" :key="age" :value="age">{{ age }}</option>
            </select>
          </div>

          <!-- ระดับชั้น (Select + กลุ่มประถม/มัธยม) -->
          <div class="flex flex-col">
            <div class="text-white h-[36px]">ระดับชั้น*</div>
            <select v-model="form.grade" class="w-[350px] h-[80px] px-5 bg-[#EFF7F7] rounded-[15px] appearance-none"
              required>
              <option value="" disabled>เลือกระดับชั้น</option>
              <!-- <optgroup label="ประถมศึกษา">
                <option v-for="g in primaryGrades" :key="g" :value="g">{{ g }}</option>
              </optgroup> -->
              <optgroup label="มัธยมศึกษา">
                <option v-for="g in secondaryGrades" :key="g" :value="g">{{ g }}</option>
              </optgroup>
            </select>
          </div>
        </div>

        <div class="flex w-full gap-14">
          <div class="flex flex-col">
            <div class="text-white h-[36px]">โรงเรียน*</div>
            <input v-model="form.school" class="w-[350px] h-[80px] px-5 bg-[#EFF7F7] rounded-[15px]" type="text"
              required />
          </div>
          <div class="flex flex-col">
            <div class="text-white h-[36px]">รหัสที่ได้รับ**</div>
            <input v-model="form.classCode" class="w-[350px] h-[80px] px-5 bg-[#EFF7F7] rounded-[15px]" type="text"
              required />
          </div>
        </div>

        <div class="flex w-full text-white">
          *ข้อมูลที่นักเรียนจำเป็นต้องกรอก
        </div>
        <div class="flex w-full text-white">
          **รหัสที่นักเรียนกรอกนี้จะไม่สามารถแก้ไขได้ในภายหลัง <br> หากมีข้อผิดพลาดติดต่ออาจารย์ ชินภัท มงคลศิริวัฒนา (ครูโอห์ม) มาที่อีเมล
          chinapat.mon@dsil.ac.th
        </div>

        <div class="flex flex-col gap-4 items-center justify-center  w-full">
          <button
            class="flex w-fit h-[70px] px-10 bg-[#FFC233] text-black hover:bg-[#B97530] hover:text-white cursor-pointer drop-shadow-xl font-medium rounded-[15px] items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit" :disabled="submitting">
            {{ submitting ? 'กำลังสมัคร...' : 'ไปต่อ' }}
          </button>
          <div v-if="error" class="text-red-200 text-[18px]">{{ error }}</div>
          <div v-if="success" class="text-green-200 text-[18px]">{{ success }}</div>
          <button class="underline text-white cursor-pointer" type="button" @click="auth.setPage('Login')">
            กลับไปหน้าเข้าสู่ระบบ
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useFirebaseSession } from "~/composables/useAuth";

const { getImageURL } = useAssetUrl();
const auth = useAuthView();
const router = useRouter();

const { completeProfile } = useFirebaseSession(); // ✅ NEW

const form = reactive({
  firstName: "",
  lastName: "",
  sex: "" as "ชาย" | "หญิง" | "",
  age: undefined as number | undefined,
  grade: "",
  school: "",
  classCode: "",
  pdpa: true,
});

const submitting = ref(false);
const error = ref("");
const success = ref("");

const ages = Array.from({ length: 6 }, (_, i) => i + 14); 
// const primaryGrades = ["ป.4", "ป.5", "ป.6"];
const secondaryGrades = ["ม.4", "ม.5", "ม.6"];

const onSubmit = async () => {
  error.value = "";
  success.value = "";

  if (!form.age) {
    error.value = "กรุณาเลือกอายุ";
    return;
  }

  submitting.value = true;
  try {
    await completeProfile({
      firstName: form.firstName,
      lastName: form.lastName,
      sex: form.sex,
      age: form.age,
      grade: form.grade,
      school: form.school,
      classCode: form.classCode,
      pdpa: form.pdpa,
    });

    success.value = "บันทึกข้อมูลสำเร็จ!";
    await router.push("/pdpa");
  } catch (err: any) {
    const code = err?.data?.data?.code;

    if (code === "classCode/invalid") {
      error.value = "รหัสที่ได้รับไม่ถูกต้อง";
    } else if (code === "classCode/misconfigured") {
      error.value = "รหัสนี้ยังตั้งค่าไม่สมบูรณ์";
    } else if (code === "classCode/immutable") {
      error.value = "รหัสนี้ถูกยืนยันแล้ว ไม่สามารถเปลี่ยนได้";
    } else if (err?.statusCode === 401) {
      error.value = "กรุณาเข้าสู่ระบบด้วย Google ก่อน";
      auth.setPage("Login");
    } else {
      error.value = "ไม่สามารถบันทึกข้อมูลได้";
    }
  } finally {
    submitting.value = false;
  }
};
</script>


<style></style>
