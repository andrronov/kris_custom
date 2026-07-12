<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useCatalogFilter } from "../lib/use-catalog-filter";
import { Button } from "@/shared/ui";

const { t } = useI18n();
const { isDirty, clearAllFilters } = useCatalogFilter();
</script>

<template>
  <Transition name="collapse">
    <div
      v-if="isDirty"
      class="sticky overflow-hidden z-50 w-full min-h-9 transition-all duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
    >
      <Button
        @click="clearAllFilters()"
        color="primary"
        class="w-full lg:rounded-none"
      >
        {{ t("common.buttons.clear") }}
      </Button>
    </div>
  </Transition>
</template>
