<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useBreakpoints } from "@/shared/lib/composables/use-breakpoints";

import HeaderNav from "./HeaderNav.vue";

const { hiddenable = true } = defineProps<{
  hiddenable?: boolean;
}>();

const { lgAndSmaller } = useBreakpoints();

const lastScrollY = ref(0);
const isVisible = ref(true);

const handleScroll = () => {
  if (!hiddenable) return;

  const currentScrollY = window.scrollY;
  const delta = currentScrollY - lastScrollY.value;

  if (delta > 10 && currentScrollY > 100) {
    isVisible.value = false;
  } else if (delta < -15) {
    isVisible.value = true;
  }

  lastScrollY.value = currentScrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <Transition name="fade">
    <div
      v-if="lgAndSmaller && isVisible"
      class="fixed w-full overflow-x-auto z-[var(--z-header)] header bottom-8"
    >
      <HeaderNav />
    </div>
  </Transition>
</template>
