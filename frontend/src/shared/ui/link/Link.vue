<script lang="ts" setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import type { RouteLocationRaw } from "vue-router";
import type { ComponentColor } from "@/shared/types";

const props = withDefaults(
  defineProps<{
    color?: "neutral" | ComponentColor;
    hover?: boolean;
    target?: string;
    to: RouteLocationRaw;
    underline?: boolean;
    decreaseOpacity?: boolean;
    multiLine?: boolean;
  }>(),
  {
    color: undefined,
    underline: false,
    hover: false,
    decreaseOpacity: true,
    multiLine: false,
    target: undefined,
  },
);

const isExternal = computed(
  () => typeof props.to == "string" && !props.to.startsWith("/"),
);

const classes = computed(() => [
  "link underline-offset-4",
  [props.underline ? "underline" : "no-underline"],
  {
    [`link-${props.color}`]: props.color,
    ["link-hover"]: props.hover,
  },
  { "hover:opacity-80": props.decreaseOpacity },
  { "min-w-max": isExternal.value && !props.multiLine },
]);
</script>

<template>
  <a
    v-if="typeof to == 'string' && isExternal"
    :href="to"
    :target="target ?? '_blank'"
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </a>
  <router-link
    v-else
    :to="to"
    :class="classes"
    :target="target"
    v-bind="$attrs"
  >
    <slot />
  </router-link>
</template>
