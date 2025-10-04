<script setup lang="ts">
import { useToggle } from "@vueuse/core";
import { ICONS } from "@/shared/assets";
import { Icon, TransitionHeight } from "@/shared/ui";

defineProps<{
  title: string;
}>();

const [showPanel, togglePanel] = useToggle(false);
</script>

<template>
  <div class="rounded-full bg-base-100 text-base-content">
    <button
      @click.prevent="togglePanel()"
      class="flex w-full flex-row items-center justify-between gap-2 rounded-full bg-base-300 p-4 text-left text-xl font-medium shadow-sm duration-150 border-2 border-transparent hover:bg-base-200 hover:border-secondary hover:text-secondary"
    >
      <span class="break-words text-lg lg:text-2xl">
        {{ title }}
      </span>
      <span class="p-1">
        <Icon :name="showPanel ? ICONS.up : ICONS.down" class="h-10 w-10" />
      </span>
    </button>
    <TransitionHeight>
      <div
        :aria-hidden="!showPanel"
        class="whitespace-pre-line rounded-full p-6 text-lg leading-8"
        v-show="showPanel"
      >
        <slot></slot>
      </div>
    </TransitionHeight>
  </div>
</template>
