<template>
  <div class="min-h-screen text-white p-10">
    <h1 class="text-4xl font-semibold text-[#FFC233] text-center">Student Dashboard</h1>

    <div class="mt-12 bg-[#3b3b3b] rounded-2xl p-6">
      <div class="flex items-center justify-between mb-4">
        <div class="text-[#FFC233] text-2xl">ตารางแสดงข้อมูลโปรไฟล์นักเรียน</div>
        <button class="text-[#FFC233] hover:underline" @click="downloadCsv">
          ⬇ ดาวน์โหลดไฟล์
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full border-separate border-spacing-y-3">
          <thead>
            <tr class="text-center">
              <th class="px-4 py-3 bg-[#555] rounded-l-xl">No.</th>
              <th class="px-4 py-3 bg-[#555]">First Name</th>
              <th class="px-4 py-3 bg-[#555]">Last Name</th>
              <th class="px-4 py-3 bg-[#555]">Gender</th>
              <th class="px-4 py-3 bg-[#555]">Age</th>
              <th class="px-4 py-3 bg-[#555]">School Name</th>
              <th class="px-4 py-3 bg-[#555]">Code</th>
              <th class="px-4 py-3 bg-[#555] rounded-r-xl">Group</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(s, idx) in students"
              :key="s.uid"
              class="text-center cursor-pointer"
              @click="goStudent(s.uid)"
            >
              <td class="px-4 py-4 bg-[#444] rounded-l-xl">{{ idx + 1 }}</td>
              <td class="px-4 py-4 bg-[#444] hover:bg-[#4a4a4a]">{{ s.firstName }}</td>
              <td class="px-4 py-4 bg-[#444] hover:bg-[#4a4a4a]">{{ s.lastName }}</td>
              <td class="px-4 py-4 bg-[#444] hover:bg-[#4a4a4a]">{{ s.sex }}</td>
              <td class="px-4 py-4 bg-[#444] hover:bg-[#4a4a4a]">{{ s.age }}</td>
              <td class="px-4 py-4 bg-[#444] hover:bg-[#4a4a4a]">{{ s.school }}</td>
              <td class="px-4 py-4 bg-[#444] hover:bg-[#4a4a4a]">{{ s.classCode }}</td>
              <td class="px-4 py-4 bg-[#444] rounded-r-xl hover:bg-[#4a4a4a]">
                {{ s.experimentGroup }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="pending" class="mt-6 opacity-80">Loading...</div>
      <div v-if="err" class="mt-6 text-red-300">Load failed</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// definePageMeta({ middleware: ["teacher"] }); // optional

type StudentRow = {
  uid: string;
  firstName: string;
  lastName: string;
  sex: string;
  age: number | null;
  school: string;
  classCode: string;
  experimentGroup: string;
};

const router = useRouter();

const { data, pending, error: err } = await useFetch<{ students: StudentRow[] }>(
  "/api/teacher/students",
  { method: "GET" }
);

const students = computed(() => data.value?.students ?? []);

function goStudent(uid: string) {
  router.push(`/teacher/students/${uid}`);
}

// simple CSV download from current data (client side)
function downloadCsv() {
  const rows = students.value;
  const header = ["uid","firstName","lastName","sex","age","school","classCode","experimentGroup"];
  const csv = [
    header.join(","),
    ...rows.map(r => header.map(k => JSON.stringify((r as any)[k] ?? "")).join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "students.csv";
  a.click();
  URL.revokeObjectURL(url);
}
</script>
