<script setup lang="ts">
import { Button, Icon } from "@/shared/ui";
import { ICONS } from "@/shared/assets";

import type { ProductCardSize } from "../types";

const { liked } = defineProps<{
  liked: boolean;
  size?: ProductCardSize;
}>();

const emit = defineEmits<{
  (e: "toggle"): void;
}>();

const toggle = () => {
  emit("toggle");
};
</script>

<template>
  <Button
    @click="toggle()"
    color="secondary"
    class="absolute right-4 top-3 z-50"
  >
    <Icon
      :name="ICONS.likeHeart"
      :class="size === 'small' ? 'text-xl' : 'text-2xl'"
      :filled="liked"
    />
  </Button>
</template>
