<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Dropdown, Icon } from "@/shared/ui";
import { ICONS } from "@/shared/assets";

import SortMenu from "./SortMenu.vue";

const emit = defineEmits<{
  (e: "select", sort: string): void;
}>();

const { t } = useI18n();

const select = (sort: string, cb: () => void) => {
  emit("select", sort);
  cb();
};
</script>

<template>
  <Dropdown>
    <template #toggler-content>
      <Icon :name="ICONS.sort" class="size-5" />
      {{ t("common.buttons.sort_by") }}
    </template>
    <template #default="{ close }">
      <div class="flex flex-col gap-2 min-w-40">
        <SortMenu @select="select($event, close)" />
      </div>
    </template>
  </Dropdown>
</template>
