<script setup lang="ts">
import { VueDatePicker, type ModelValue } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { enUS, es } from "date-fns/locale";
import { ref, computed, useAttrs, useSlots, watch, nextTick } from "vue";
import { ICONS } from "@/shared/assets";
import { useBreakpoints } from "@/shared/lib/composables/use-breakpoints";
import { useAppStore } from "@/shared/stores/application";
import Icon from "../icon/Icon.vue";
import Input from "../input/Input.vue";

defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    disabled?: boolean;
    placeholder?: string;
    dimmed?: boolean;
    filled?: boolean;
  }>(),
  {
    disabled: false,
    placeholder: "",
    dimmed: false,
    filled: false,
  },
);

const modelValue = defineModel<ModelValue | undefined>({
  required: false,
  default: undefined,
});

const attrs = useAttrs();
const slots = useSlots();

const { xlOrLarger } = useBreakpoints();

const appStore = useAppStore();

const formatLocale = computed(() => {
  return {
    sp: es,
    en: enUS,
  }[appStore.lang];
});

const renderDatepicker = ref(true);

watch(formatLocale, () => {
  renderDatepicker.value = false;
  nextTick(() => {
    renderDatepicker.value = true;
  });
});

const zIndex = computed(() => {
  return getComputedStyle(document.documentElement).getPropertyValue(
    xlOrLarger.value ? "--z-datepicker-desktop" : "--z-datepicker-mobile",
  );
});
</script>

<style>
.dp--menu-wrapper {
  z-index: v-bind(zIndex);
}
</style>

<template>
  <div class="flex w-full flex-col">
    <div
      class="flex w-full items-end justify-between"
      :class="{ 'text-base-content/20': disabled }"
    >
      <span>
        <slot></slot>
      </span>
      <span
        class="text-sm"
        :class="disabled ? 'text-base-content/20' : 'text-base-content/50'"
      >
        <slot name="optional"></slot>
      </span>
    </div>
    <VueDatePicker
      v-if="renderDatepicker"
      v-bind="attrs"
      v-model="modelValue"
      :locale="formatLocale"
      :config="{ closeOnScroll: !xlOrLarger, noSwipe: true }"
      prevent-min-max-navigation
      hide-offset-dates
      :teleport-center="!xlOrLarger"
      format="PP"
      utc="preserve"
      :format-locale="formatLocale"
      :class="{
        'mt-0.5': slots.default,
      }"
      :disabled="disabled"
      position="left"
    >
      <template #dp-input="{ value }">
        <Input
          class="cursor-pointer"
          type="text"
          :value="value"
          readonly
          :disabled="disabled"
          :placeholder="placeholder"
          :dimmed="dimmed"
          :filled="filled"
        >
          <template #prefix>
            <Icon :name="ICONS.calendar" class="ml-1" />
          </template>
        </Input>
      </template>
    </VueDatePicker>
  </div>
</template>

<style>
.dp__menu_inner {
  gap: 0rem 1rem;
}

.dp__cell_disabled {
  opacity: 0.3;
}

.dp__theme_light {
  --dp-background-color: var(--base-200);
  --dp-text-color: var(--base-content);
  --dp-hover-color: var(--base-300);
  --dp-hover-text-color: var(--base-content);
  --dp-hover-icon-color: var(--base-content);
  --dp-primary-color: var(--secondary);
  --dp-primary-text-color: var(--secondary-content);
  --dp-secondary-color: var(--base-content);
  --dp-border-color: var(--base-300);
  --dp-menu-border-color: var(--base-300);
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: var(--base-300);
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-highlight-color: rgba(0, 92, 178, 0.2);
}
</style>
