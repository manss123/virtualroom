<template>
  <div class="w-full flex justify-center">
    <div class="min-h-screen text-white px-8 py-10 max-w-7xl">
      <!-- Title -->
      <h1 class="text-4xl font-semibold text-[#FFC233] text-center">Student Dashboard</h1>
      <div class="mt-6 h-px bg-white/20"></div>

      <!-- 1) SUMMARY CARDS -->
      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCardVue label="จำนวนนักเรียนทั้งหมดในระบบ" :value="summary.totalStudents" />
        <StatCardVue label="จำนวนนักเรียนที่ทำ Pretest" :value="summary.pretestDone" />
        <StatCardVue label="จำนวนนักเรียนกำลังเรียน Virtual" :value="summary.learningNow" />
        <StatCardVue label="จำนวนนักเรียนที่ทำ Posttest" :value="summary.posttestDone" />
      </div>

      <!-- Export buttons -->
      <div class="mt-10 flex gap-4 justify-end items-center">
        <button class="flex items-center gap-2 text-[#FFC233] hover:underline" @click="exportAllXlsx">
          ⬇ ดาวน์โหลดทั้งหมด (Excel)
        </button>

        <button class="flex items-center gap-2 text-[#FFC233] hover:underline" @click="exportAllCsvZipLike">
          ⬇ ดาวน์โหลดทั้งหมด (CSV UTF-8)
        </button>
      </div>

      <!-- 2) STUDENT PROFILE TABLE -->
      <SectionBlockVue title="ตารางแสดงข้อมูลโปรไฟล์นักเรียน"
        :download="() => exportOneXlsx('students_profile', profileRows)">
        <div class="overflow-x-auto">
          <table class="w-full border-separate border-spacing-y-3">
            <thead>
              <tr class="text-center text-sm">
                <ThPillVue class="rounded-l-xl">No.</ThPillVue>
                <ThPillVue>First Name</ThPillVue>
                <ThPillVue>Last Name</ThPillVue>
                <ThPillVue>Gender</ThPillVue>
                <ThPillVue>Age</ThPillVue>
                <ThPillVue>School Name</ThPillVue>
                <ThPillVue>Code</ThPillVue>
                <ThPillVue class="rounded-r-xl">Group</ThPillVue>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(s, idx) in profileRows" :key="s.uid" class="text-center cursor-pointer"
                @click="goStudent(s.uid)">
                <TdPillVue class="rounded-l-xl">{{ idx + 1 }}</TdPillVue>
                <TdPillVue>{{ s.firstName }}</TdPillVue>
                <TdPillVue>{{ s.lastName }}</TdPillVue>
                <TdPillVue>{{ s.sex }}</TdPillVue>
                <TdPillVue>{{ s.age }}</TdPillVue>
                <TdPillVue>{{ s.school }}</TdPillVue>
                <TdPillVue>{{ s.classCode }}</TdPillVue>
                <TdPillVue class="rounded-r-xl">{{ s.experimentGroup }}</TdPillVue>
              </tr>
            </tbody>
          </table>
        </div>
      </SectionBlockVue>

      <!-- 3) RAW PRE/POST ANSWERS TABLE -->
      <SectionBlockVue title="ตารางแสดงคำตอบแบบทดสอบก่อน-หลังเรียนของนักเรียน"
        note="* คลิกที่ชื่อแถวเพื่อดูข้อมูลรายบุคคลได้" :download="() => exportOneXlsx('raw_pre_post', prePostRows)">
        <DynamicTableVue :rows="prePostRows" :sticky-cols="['No.', 'First Name', 'Last Name', 'Group']"
          @rowClick="(r) => goStudent(r.uid)" />
      </SectionBlockVue>

      <!-- 4) SRM QUESTIONNAIRE TABLE -->
      <SectionBlockVue title="ตารางแสดงระดับความคิดเห็นของนักเรียนผ่านแบบประเมินการรู้คิดและการควบคุมการรู้คิด"
        :download="() => exportOneXlsx('srm', srmRows)">
        <DynamicTableVue :rows="srmRows" :sticky-cols="['No.', 'First Name', 'Last Name', 'Group']"
          @rowClick="(r) => goStudent(r.uid)" />
      </SectionBlockVue>

      <!-- 5) LEARNING PLAN TABLE -->
      <SectionBlockVue title="ตารางแสดงแผนการเรียน (ตารางเรียน) ของนักเรียน"
        :download="() => exportOneXlsx('learning_plan', planRows)">
        <DynamicTableVue :rows="planRows" :sticky-cols="['No.', 'First Name', 'Last Name', 'Group']"
          @rowClick="(r) => goStudent(r.uid)" />
      </SectionBlockVue>

      <!-- 6) PLANNED DATE STATUS TABLE -->
      <SectionBlockVue title="ตารางแสดงสถานะผลการกำหนดเวลาเรียนและข้อความ Reflection ของนักเรียน"
        :download="() => exportOneXlsx('planned_status', statusRows)">
        <DynamicTableVue :rows="statusRows" :sticky-cols="['No.', 'First Name', 'Last Name', 'Group']"
          @rowClick="(r) => goStudent(r.uid)" />
      </SectionBlockVue>

      <div v-if="pending" class="mt-6 opacity-80">Loading...</div>
      <div v-if="err" class="mt-6 text-red-300">Load failed</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as XLSX from "xlsx"
import StatCardVue from "~/components/teacher/StatCard.vue";
import SectionBlockVue from "~/components/teacher/SectionBlock.vue";
import ThPillVue from "~/components/teacher/ThPill.vue";
import TdPillVue from "~/components/teacher/TdPill.vue";
import DynamicTableVue from "~/components/teacher/DynamicTable.vue";

type Summary = {
  totalStudents: number;
  pretestDone: number;
  learningNow: number;
  posttestDone: number;
};

type ProfileRow = {
  uid: string;
  firstName: string;
  lastName: string;
  sex: string;
  age: number | null;
  school: string;
  classCode: string;
  experimentGroup: string;
};

// For DynamicTable rows: must include uid + display columns
type AnyRow = Record<string, any> & { uid: string };

definePageMeta({ middleware: ["auth", "teacher"] });

const router = useRouter();


// ✅ Recommended: ONE endpoint that returns everything for this dashboard
const { data, pending, error: err } = await useFetch<{
  summary: Summary;
  profileRows: ProfileRow[];
  prePostRows: AnyRow[];
  srmRows: AnyRow[];
  planRows: AnyRow[];
  statusRows: AnyRow[];
}>("/api/teacher/dashboard", { method: "GET" });

const summary = computed<Summary>(() => data.value?.summary ?? {
  totalStudents: 0,
  pretestDone: 0,
  learningNow: 0,
  posttestDone: 0,
});

const profileRows = computed<ProfileRow[]>(() => data.value?.profileRows ?? []);
const prePostRows = computed<AnyRow[]>(() => data.value?.prePostRows ?? []);
const srmRows = computed<AnyRow[]>(() => data.value?.srmRows ?? []);
const planRows = computed<AnyRow[]>(() => data.value?.planRows ?? []);
const statusRows = computed<AnyRow[]>(() => data.value?.statusRows ?? []);

function goStudent(uid: string) {
  router.push(`/teacher/students/${uid}`);
}

/** ----------------- EXPORT (XLSX is best for Thai) ----------------- */

function exportOneXlsx(sheetName: string, rows: AnyRow[] | ProfileRow[]) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows as any[]);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${sheetName}.xlsx`);
}

function exportAllXlsx() {
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(profileRows.value as any[]), "Profile");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(prePostRows.value as any[]), "PrePost");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(srmRows.value as any[]), "SRM");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(planRows.value as any[]), "LearningPlan");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(statusRows.value as any[]), "PlannedStatus");

  // summary as a tiny table
  XLSX.utils.book_append_sheet(
    wb,
    XLSX.utils.json_to_sheet([summary.value]),
    "Summary"
  );

  XLSX.writeFile(wb, `teacher_dashboard_export.xlsx`);
}

/** ----------------- CSV fallback (UTF-8 BOM for Excel) ----------------- */
function csvWithBom(rows: any[]) {
  if (!rows.length) return "\ufeff";
  const keys = Object.keys(rows[0]);
  const lines = [
    keys.join(","),
    ...rows.map((r) => keys.map((k) => JSON.stringify(r[k] ?? "")).join(",")),
  ];
  return "\ufeff" + lines.join("\n"); // BOM
}

function downloadCsv(filename: string, rows: any[]) {
  const csv = csvWithBom(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Browsers can't create a real .zip without another lib,
 * so this downloads multiple CSV files one by one.
 * If you want one zip, tell me and I’ll give you JSZip version.
 */
function exportAllCsvZipLike() {
  downloadCsv("Profile.csv", profileRows.value as any[]);
  downloadCsv("PrePost.csv", prePostRows.value as any[]);
  downloadCsv("SRM.csv", srmRows.value as any[]);
  downloadCsv("LearningPlan.csv", planRows.value as any[]);
  downloadCsv("PlannedStatus.csv", statusRows.value as any[]);
  downloadCsv("Summary.csv", [summary.value]);
}
</script>
