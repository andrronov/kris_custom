<script setup lang="ts">
import { useAttrs } from "vue";
import { ICONS } from "@/shared/assets";
import { Collapsible, Button, Icon } from "@/shared/ui";

defineProps<{
  title: string;
  dirty?: boolean;
  clear?: () => void;
}>();

const attrs = useAttrs();
</script>

<template>
  <Collapsible :title variant="clean" size="sm" open-initially class="relative">
    <Transition name="fade">
      <Button
        v-if="dirty"
        @click="clear"
        size="sm"
        color="primary"
        class="absolute top-2 right-10 lg:right-12"
      >
        <Icon :name="ICONS.close" class="size-4 shrink-0" />
      </Button>
    </Transition>
    <div v-bind="attrs" class="lg:px-4">
      <slot />
    </div>
  </Collapsible>
</template>
