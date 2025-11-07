<script setup lang="ts">
import { ref } from "vue";
import { Button, Icon } from "@/shared/ui";
import { ICONS } from "@/shared/assets";

const isLiked = ref(false);
</script>

<template>
  <Button
    @click="isLiked = !isLiked"
    color="secondary"
    class="absolute right-4 top-3 z-50"
  >
    <Icon :name="ICONS.likeHeart" class="text-2xl" :filled="isLiked" />
  </Button>
</template>
