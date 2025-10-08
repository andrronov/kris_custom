<script setup lang="ts">
import { Icon, Button } from "@/shared/ui";
import { ICONS } from "@/shared/assets";
</script>

<template>
  <Button variant="link">
    <Icon :name="ICONS.searchLoop" class="w-8 h-8" />
  </Button>
</template>
