<script setup lang="ts">
import { LANGUAGES_LIST } from "@/shared/config";
import { useAppStore } from "@/shared/stores/application";
import { DropdownItem, Image } from "@/shared/ui";

const appStore = useAppStore();

const emit = defineEmits<{
  "language-change": [];
}>();

const onChange = (cb: () => void) => {
  emit("language-change");
  cb();
};
</script>

<template>
  <template v-for="item in LANGUAGES_LIST" :key="item.lang">
    <DropdownItem @click="onChange(() => appStore.changeLocale(item.value))">
      <div
        class="flex w-full items-center justify-between text-base-content"
      >
        <Image
          :src="item.icon"
          class="w-8 h-6"
        />
        <span>
          {{ item.label }}
        </span>
      </div>
    </DropdownItem>
  </template>
</template>