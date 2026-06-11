<script setup lang="ts">
import { watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { setScrollLock, nothing } from "@/shared/lib/utils";
import { Keys } from "@/shared/types";

defineProps<{
  name: string;
  sidebarClass?: string;
}>();

const emit = defineEmits<{
  close: [];
  esc: [];
  blur: [];
}>();

const route = useRoute();
const open = defineModel<boolean>({ required: true });

const close = (cb = nothing) => {
  open.value = false;
  cb();
  emit("close");
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === Keys.Escape) {
    emit("esc");
    close();
  }
};

onMounted(() => document.addEventListener("keydown", handleKeydown));
onBeforeUnmount(() => document.removeEventListener("keydown", handleKeydown));

const onClickOutside = () => {
  emit("blur");
};

watch(open, (value) => {
  setScrollLock(value);
});

watch(route, () => {
  close();
});
</script>

<template>
  <div class="drawer-end">
    <input :id="name" type="checkbox" class="drawer-toggle" v-model="open" />
    <div class="drawer-content">
      <slot></slot>
    </div>
    <div
      class="drawer-side h-full"
      style="
        z-index: var(--z-drawer);
        touch-action: none;
        -ms-touch-action: none;
      "
    >
      <label
        :for="name"
        class="drawer-overlay"
        aria-label="Close menu"
        @click="onClickOutside()"
      ></label>
      <aside
        class="flex h-full flex-col overflow-y-auto bg-base-200 px-3 md:px-4 py-4"
        :class="sidebarClass"
        style="touch-action: pan-y; -ms-touch-action: none"
      >
        <slot v-if="open" name="content" :close :open></slot>
      </aside>
    </div>
  </div>
</template>
