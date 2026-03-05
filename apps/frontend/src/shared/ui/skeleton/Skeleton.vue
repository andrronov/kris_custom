<script setup lang="ts">
import { useAttrs } from "vue";

const attrs = useAttrs();
</script>

<template>
  <div v-bind="attrs" class="skeleton bg-base-300/40">&nbsp;</div>
</template>

<style>
.skeleton {
  position: relative;
  overflow: hidden;
}
.skeleton::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  height: 100%;
  width: 150px;
  background: linear-gradient(
    to right,
    transparent 0%,
    var(--base-300) 30%,
    transparent 100%
  );
  animation: load 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@keyframes load {
  from {
    left: -150px;
  }
  to {
    left: 100%;
  }
}
</style>
