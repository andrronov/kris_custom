<script lang="ts">
let count = 0;

export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { watch, onMounted, onBeforeUnmount, computed } from "vue";
import { ICONS } from "@/shared/assets";
import { setScrollLock } from "@/shared/lib/utils";
import { Keys } from "@/shared/types";
import Button from "../button/Button.vue";
import Icon from "../icon/Icon.vue";

const props = withDefaults(
  defineProps<{
    open?: boolean;
    padding?: boolean;
    responsive?: boolean;
    bottom?: boolean;
    closeOnClickOutside?: boolean;
    closeOnEsc?: boolean;
    customClass?: string;
    crossColor?: string;
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
    lockScroll?: boolean;
    hidden?: boolean;
    inline?: boolean;
  }>(),
  {
    open: false,
    padding: true,
    responsive: false,
    closeOnClickOutside: true,
    closeOnEsc: true,
    size: "md",
    bottom: false,
    crossColor: "text-base-content/30 hover:text-base-content/50",
    lockScroll: true,
    customClass: "",
    hidden: false,
    inline: false,
  },
);

let currentId = 0;

const emit = defineEmits<{
  close: [];
  open: [];
}>();

const classes = computed(() => [
  "modal",
  {
    "modal-open": props.open,
    "modal-bottom sm:modal-middle": props.responsive,
    "modal-bottom": props.bottom,
  },
]);

const close = () => {
  emit("close");
};

const handleClickOutside = () => {
  if (!props.closeOnClickOutside || props.hidden) {
    return;
  }
  close();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (!props.closeOnEsc || !props.open || props.hidden) {
    return;
  }

  if (currentId < count) {
    return;
  }

  event.key === Keys.Escape && close();
};

const mount = () => {
  emit("open");

  if (props.lockScroll && count === 0) {
    setScrollLock(true);
  }

  count++;

  currentId = count;
};

const unmount = () => {
  count--;

  if (props.lockScroll && count === 0) {
    setScrollLock(false);
  }

  currentId = 0;
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);

  // If for some reason the modal is still opened when the component is unmounted, we must do it with force
  if (props.open) {
    unmount();
  }
});

watch(
  () => props.open,
  (value) => {
    value ? mount() : unmount();
  },
);
</script>

<template>
  <template v-if="inline">
    <slot></slot>
  </template>
  <template v-if="open">
    <Teleport to="body">
      <div
        v-show="!hidden"
        aria-label="modal"
        :aria-hidden="hidden"
        :aria-modal="!hidden"
        :class="[classes, customClass]"
        style="z-index: var(--z-modal)"
        @click="handleClickOutside()"
      >
        <div
          :class="[
            {
              'p-0': !padding,
              'max-w-md': size === 'sm',
              'max-w-lg': size === 'md',
              'max-w-xl': size === 'lg',
              'max-w-4xl': size === 'xl',
              'max-w-5xl': size === '2xl',
            },
          ]"
          class="modal-box relative rounded-xl bg-base-200"
          v-bind="$attrs"
          @click.stop
        >
          <slot name="close" :close="close">
            <template v-if="!$slots.close">
              <Button
                data-testid="modal-close"
                size="sm"
                color="ghost"
                class="absolute right-2 top-2"
                style="z-index: var(--z-modal)"
                shape="circle"
                @click="close()"
              >
                <Icon
                  :name="ICONS.close"
                  class="h-6 w-6"
                  :class="[crossColor]"
                />
              </Button>
            </template>
          </slot>

          <slot></slot>
        </div>
      </div>
    </Teleport>
  </template>
</template>
