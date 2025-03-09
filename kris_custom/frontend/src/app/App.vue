<script setup lang="ts">
import { useRoute } from "vue-router";
import { useSeoMeta } from "@unhead/vue";
import { layouts } from "./layouts";

const route = useRoute();

useSeoMeta({});
</script>

<template>
  <component :is="layouts[route.meta.layout]">
    <router-view />
  </component>
</template>

<style></style>