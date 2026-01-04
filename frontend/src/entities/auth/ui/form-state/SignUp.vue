<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Input, Button, Datepicker } from "@/shared/ui";

const { t } = useI18n();
</script>

<template>
  <div class="w-full sm:max-w-[400px] flex flex-col items-center gap-2">
    <h3 class="text-xl font-bold">
      {{ t("auth.sign_up.title") }}
    </h3>
    <Input class="w-full">{{ t("auth.sign_up.name") }}</Input>
    <Datepicker class="w-full">{{ t("auth.sign_up.birthday") }}</Datepicker>
    <h4 class="text-lg font-medium">
      {{ t("auth.sign_up.with") }}
    </h4>
    <Input>{{ t("auth.sign_up.email") }}</Input>
    <Button>{{ t("auth.sign_up.confirm") }}</Button>
  </div>
</template>
