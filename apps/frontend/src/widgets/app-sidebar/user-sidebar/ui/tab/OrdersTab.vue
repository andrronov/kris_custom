<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Button } from "@/shared/ui";
import { useUserStore } from "@/shared/stores/user";

const emit = defineEmits<{
  clickLogin: [];
}>();

const { t } = useI18n();
const userStore = useUserStore();
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h3
      class="!leading-snug text-2xl md:text-4xl pt-4 font-normal text-center text-secondary"
    >
      Orders
    </h3>
    <template v-if="userStore.authorized">
      <p>You don't have any orders yet</p>
    </template>
    <template v-else>
      <Button
        class="w-full"
        color="secondary"
        size="lg"
        @click="emit('clickLogin')"
      >
        {{ t("common.buttons.log_in") }}
      </Button>
    </template>
  </div>
</template>
