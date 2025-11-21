<template>
  <component :is="currentComponent" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Login from '~/components/Home/Login.vue';
import Register from '~/components/Home/Register.vue';

const pages = {
  Login,
  Register
}

const { currentPage } = provideAuthView('Login')
const currentComponent = computed(() => pages[currentPage.value])

</script>

<style></style>