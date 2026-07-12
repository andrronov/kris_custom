<script setup lang="ts">
import { onClickOutside, watchThrottled, useElementHover } from "@vueuse/core";
import { ref, computed, useTemplateRef } from "vue";
import { nothing } from "@/shared/lib/utils";
import { Keys } from "@/shared/types";

const props = withDefaults(
  defineProps<{
    placement?:
      | "top-start"
      | "top-end"
      | "right-start"
      | "right-end"
      | "bottom-start"
      | "bottom-end"
      | "left-end"
      | "left-start"
      // custom
      | "center";
    hover?: boolean;
    disabled?: boolean;
    margin?: "default" | "big";
  }>(),
  {
    placement: "bottom-end",
    hover: false,
    disabled: false,
    margin: "default",
  },
);

const active = ref(false);

const toggleDropdown = (cb = nothing) => {
  if (props.disabled || props.hover) {
    return;
  }

  active.value = !active.value;
  cb();
};

const openDropdown = (cb = nothing) => {
  active.value = true;
  cb();
};

const closeDropdown = (cb = nothing) => {
  active.value = false;
  cb();
};

const classes = computed(() => [
  "dropdown",
  ...props.placement.split("-").map((place) => `dropdown-${place}`),
]);

const onKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case Keys.Enter:
    case Keys.Escape:
      closeDropdown();
  }
};

const dropdownRef = useTemplateRef("dropdown");

onClickOutside(dropdownRef, () => closeDropdown());

const isHovered = useElementHover(dropdownRef);

watchThrottled(isHovered, (value) => {
  if (props.hover && value) {
    openDropdown();
  }
});

watchThrottled(
  isHovered,
  (value) => {
    if (props.hover && !value) {
      closeDropdown();
    }
  },
  { throttle: 666 },
);
</script>

<template>
  <div :class="classes" ref="dropdown">
    <label @click="toggleDropdown()">
      <slot name="toggler" :disabled="disabled">
        <div
          class="m-auto flex h-full items-center gap-2 hover:cursor-pointer font-semibold text-sm"
        >
          <slot name="toggler-content" />
        </div>
      </slot>
    </label>
    <div
      v-show="active"
      class="menu dropdown-content z-[2] animate-fadeIn overflow-y-auto rounded-default border border-base-300 bg-base-200 p-1.5 shadow"
      :class="props.margin === 'default' ? 'mt-2' : 'mt-4'"
      @keydown="onKeyDown"
      :style="{
        visibility: active ? 'visible' : 'hidden',
        opacity: active ? 100 : 0,
        transform: 'scale(1, 1)',
      }"
    >
      <slot :toggle="toggleDropdown" :close="closeDropdown" />
    </div>
  </div>
</template>

<style>
.dropdown.dropdown-center .dropdown-content {
  @apply !left-1/2 !top-1/2 !z-[1000] !-translate-x-1/2 !-translate-y-1/2 !transform;
}
</style>
