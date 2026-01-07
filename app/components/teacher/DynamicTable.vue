<template>
  <div class="overflow-x-auto">
    <table class="min-w-max w-full border-separate border-spacing-y-3">
      <thead>
        <tr class="text-center text-sm">
          <th
            v-for="(c, i) in columns"
            :key="c"
            class="px-4 py-3 bg-[#555] text-white font-medium"
            :class="[i===0 ? 'rounded-l-xl' : '', i===columns.length-1 ? 'rounded-r-xl' : '']"
            
          >
            {{ c }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(r, idx) in rows"
          :key="r.uid || idx"
          class="text-center cursor-pointer"
          @click="$emit('rowClick', r)"
        >
          <td
            v-for="(c, i) in columns"
            :key="c"
            class="px-4 py-4 bg-[#444] hover:bg-[#4a4a4a] transition"
            :class="[i===0 ? 'rounded-l-xl' : '', i===columns.length-1 ? 'rounded-r-xl' : '']"
            
          >
            {{ r[c] ?? "" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type AnyRow = Record<string, any> & { uid: string };

const props = defineProps<{
  rows: AnyRow[];
  stickyCols?: string[];
}>();

defineEmits<{ (e: "rowClick", row: AnyRow): void }>();

const stickyCols = computed(() => props.stickyCols ?? []);

const columns = computed(() => {
  const r = props.rows?.[0];
  if (!r) return [];
  const base = ["No.", "First Name", "Last Name", "Group"];
  const keys = Object.keys(r).filter((k) => k !== "uid");
  return [
    ...base.filter((k) => keys.includes(k)),
    ...keys.filter((k) => !base.includes(k)),
  ];
});

function isSticky(col: string) {
  return stickyCols.value.includes(col);
}

const stickyLeft = computed(() => {
  const map: Record<string, number> = {};
  let acc = 0;
  for (const c of columns.value) {
    if (isSticky(c)) {
      map[c] = acc;
      acc += 160;
    }
  }
  return map;
});
</script>
