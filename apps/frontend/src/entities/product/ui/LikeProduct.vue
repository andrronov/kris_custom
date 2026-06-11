<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/shared/stores/user";
import { Button, Icon } from "@/shared/ui";
import { ICONS } from "@/shared/assets";
import type { ComponentColor, ComponentButtonVariant } from "@/shared/types";

import type { ProductCardSize } from "../types";

const { color = "secondary", id } = defineProps<{
  id: string;
  size?: ProductCardSize;
  color?: ComponentColor;
  variant?: ComponentButtonVariant;
}>();

const emit = defineEmits<{
  (e: "toggle"): void;
}>();

const userStore = useUserStore();

const liked = computed(() => userStore.favorites.has(id));

const toggle = () => {
  userStore.toggleFavorite(id);
  emit("toggle");
};
</script>

<template>
  <Button @click.stop="toggle()" :color="color" :variant="variant">
    <Icon
      :name="ICONS.likeHeart"
      :class="size === 'small' ? 'text-xl' : 'text-2xl'"
      :filled="liked"
    />
  </Button>
</template>
