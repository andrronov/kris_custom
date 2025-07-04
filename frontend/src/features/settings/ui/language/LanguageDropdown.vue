<script setup lang="ts">
import { Dropdown } from "@/shared/ui";
import LanguageIcon from "./LanguageIcon.vue";
import LanguageMenu from "./LanguageMenu.vue";

defineProps<{
  alignment: "left" | "right";
}>();
</script>

<template>
  <Dropdown
    :placement="alignment === 'right' ? 'bottom-end' : 'bottom-start'"
    margin="big"
  >
    <template #toggler>
      <LanguageIcon class="text-primary-content" />
    </template>
    <template #default="{ close }">
      <div class="w-32">
        <LanguageMenu @language-change="close()" />
      </div>
    </template>
  </Dropdown>
</template>
