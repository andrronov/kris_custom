<script setup lang="ts">
import { useAttrs } from "vue";
import { Collapsible } from "@/shared/ui";

defineProps<{
  title: string;
}>();

const attrs = useAttrs();
</script>

<template>
  <Collapsible :title variant="clean" size="sm" open-initially>
    <div v-bind="attrs" class="lg:px-4">
      <slot />
    </div>
  </Collapsible>
</template>
