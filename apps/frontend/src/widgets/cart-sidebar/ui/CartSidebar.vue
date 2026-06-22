<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { LanguageDropdown, ThemeSwitcher } from "@/features/settings";
import { Button, Icon } from "@/shared/ui";
import { ICONS } from "@/shared/assets";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-4 h-full overflow-hidden">
    <div class="w-full flex items-center justify-end">
      <Button @click="emit('close')" size="sm" color="ghost" shape="circle">
        <Icon :name="ICONS.close" class="w-6 h-6" />
      </Button>
    </div>
    <h3
      class="text-2xl md:text-4xl pt-4 font-medium text-center text-secondary"
    >
      Cart
    </h3>
  </div>
</template>
