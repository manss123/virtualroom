<template>
  <TestRunner mode="pre" />
</template>

<script setup>
import TestRunner from '~/components/Tests/TestRunner.vue';
definePageMeta({ middleware: ["auth"] });
</script>
