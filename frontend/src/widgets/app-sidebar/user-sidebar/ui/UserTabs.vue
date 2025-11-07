<script setup lang="ts">
import { Tab, Tabs, Icon } from "@/shared/ui";
import { ICONS } from "@/shared/assets";
import type { UserTabComponent, UserTab } from "../types";

const tabs: UserTabComponent[] = [
  {
    name: "home",
    icon: ICONS.homeRounded,
  },
  {
    name: "orders",
    icon: ICONS.ordersRounded,
  },
  {
    name: "profile",
    icon: ICONS.user,
  },
];

const activeTab = defineModel<UserTab>({ required: true });
</script>

<template>
  <Tabs v-model="activeTab" class="w-full">
    <Tab
      v-for="(tab, index) in tabs"
      :key="index"
      :name="tab.name"
      v-slot="{ isActive }"
      class="h-full py-2"
    >
      <Icon
        :name="tab.icon"
        class="w-8 h-8 md:w-10 md:h-10"
        :class="{ 'text-secondary': isActive }"
      />
    </Tab>
  </Tabs>
</template>
