<script setup lang="ts">
import { Button, Icon } from "@/shared/ui";
import { ICONS } from "@/shared/assets";

const { liked } = defineProps<{
  liked: boolean;
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
    @click="emit('toggle')"
    color="secondary"
    class="absolute right-4 top-3 z-50"
  >
    <Icon :name="ICONS.likeHeart" class="text-2xl" :filled="liked" />
  </Button>
</template>
