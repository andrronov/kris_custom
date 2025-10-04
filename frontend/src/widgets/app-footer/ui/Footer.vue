<script setup lang="ts">
import { Logo, Link, Icon } from "@/shared/ui";
import { ICONS } from "@/shared/assets";
import { EXTERNAL } from "@/shared/config";
</script>

<template>
  <footer class="w-full bg-primary/75 rounded-t-full p-4">
    <div class="container flex flex-col gap-4">
      <div class="flex justify-between w-full items-center">
        <Link to="/">
          <Logo />
        </Link>
        <div class="flex gap-2">
          <Link :to="EXTERNAL.instagram">
            <Icon :name="ICONS.instagram" class="w-8 h-8" />
          </Link>
        </div>
      </div>
    </div>
  </footer>
</template>
