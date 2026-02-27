<script setup lang="ts">
import type { HowStep } from "./types";
import { ICONS } from "@/shared/assets";
import { Icon } from "@/shared/ui";

defineProps<{
  steps: HowStep[];
}>();
</script>

<template>
  <div class="flex w-full flex-col pl-4 md:pl-0 items-start gap-0">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="flex pl-2 py-4 items-start gap-4 border-l-primary border-l-2"
      :class="{
        'md:border-b-2 border-primary md:rounded-bl-xl w-full':
          index === steps.length - 1,
      }"
    >
      <Icon
        :name="ICONS[step.icon as keyof typeof ICONS]"
        class="-translate-x-7 min-w-10 min-h-10 bg-base-100 p-2 border border-primary rounded-xl"
      />
      <div class="-translate-x-7">
        <p
          class="text-secondary font-medium text-xl md:text-2xl"
          :class="{
            'text-2xl md:text-3xl !text-primary font-semibold':
              index === steps.length - 1,
          }"
        >
          {{ step.title }}
        </p>
        <p
          class="text-base md:text-lg md:max-w-[90%]"
          :class="{
            'text-lg md:!text-xl font-medium max-w-none':
              index === steps.length - 1,
          }"
        >
          {{ step.description }}
        </p>
      </div>
    </div>
  </div>
</template>
