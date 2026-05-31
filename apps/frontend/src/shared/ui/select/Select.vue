<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref, computed, useSlots, watch, useTemplateRef } from "vue";
import { ICONS } from "@/shared/assets";
import { useDevice } from "@/shared/lib/composables/use-device";
import type { ComponentSize, ComponentBrandColors } from "@/shared/types";
import Icon from "../icon/Icon.vue";

type ModelValue = string | number;

type Option = {
  label: string;
  value: ModelValue;
  description?: string;
  image?: string;
  icon?: any;
  default?: boolean;
  disabled?: boolean;
  hidden?: boolean;
};

type FormattedOption = Option & {
  selected?: boolean;
};

type Options = Option[];

const props = withDefaults(
  defineProps<{
    options: Options;
    color?: ComponentBrandColors;
    customColor?: string;
    size?: ComponentSize;
    ghost?: boolean;
    bordered?: boolean;
    disabled?: boolean;
    clearable?: boolean;
    closeOnSelect?: boolean;
    multiple?: boolean;
    canBeEmpty?: boolean;
    applyOnClose?: boolean;
    grouped?: boolean;
    placeholder?: string;
    sortBySelected?: boolean;
    dimmed?: boolean;
    filled?: boolean;
    maxOptions?: number;
  }>(),
  {
    color: undefined,
    customColor: undefined,
    placeholder: undefined,
    closeOnSelect: true,
    clearable: true,
    disabled: false,
    bordered: true,
    size: "md",
    ghost: false,
    canBeEmpty: true,
    applyOnClose: false,
    grouped: false,
    sortBySelected: false,
    dimmed: false,
    filled: false,
    maxOptions: undefined,
  },
);

const modelValue = defineModel<ModelValue | ModelValue[]>({ required: true });

const emit = defineEmits<{
  open: [];
  close: [];
}>();

const slots = useSlots();

const device = useDevice();

if (props.multiple && typeof modelValue.value === "string") {
  console.warn("[Select] Multiple select requires modelValue of an array type");
}
if (!props.multiple && typeof modelValue.value !== "string") {
  console.warn("[Select] Usual select requires modelValue of a string type");
}
if (!props.options) {
  console.warn("[Select] Options are not defined");
}
if (props.options.filter((option) => option.default).length > 1) {
  console.warn("[Select] Only one option can be default");
}

const cursorClass = computed(() => {
  if (props.disabled) {
    return "cursor-not-allowed";
  }
  return "cursor-pointer";
});

const classes = computed(() => [
  "select",
  {
    "select-bordered": props.bordered && !props.dimmed,
    [`select-${props.color}`]: props.color,
    [`select-${props.size}`]: props.size,
    "select-ghost": props.ghost,
  },
  { "text-base-content/20 select-disabled": props.disabled },
  cursorClass.value,
]);

const opened = ref(false);
const selectRef = useTemplateRef("selectContainer");

const temporaryValue = ref<ModelValue | ModelValue[]>(modelValue.value);

watch(
  () => modelValue.value,
  (value) => {
    temporaryValue.value = value;
  },
);

const defaultValue = computed(() => {
  return props.options.find((option) => option.default)?.value ?? null;
});

const isClearable = computed(() => {
  if (!props.clearable) {
    return false;
  }
  if (
    defaultValue.value &&
    (temporaryValue.value as ModelValue[])[0] === defaultValue.value
  ) {
    return false;
  }
  return (temporaryValue.value as ModelValue[]).length > 0;
});

const selectedQuantity = computed(() => {
  if (props.multiple) {
    return (temporaryValue.value as ModelValue[]).length;
  }
  return temporaryValue.value ? 1 : 0;
});

const multipleSelected = computed(() => {
  return selectedQuantity.value > 1;
});

const options = computed<FormattedOption[]>(() => {
  return props.options
    .map((item) => {
      const selected = props.multiple
        ? (temporaryValue.value as ModelValue[]).includes(item.value)
        : temporaryValue.value === item.value;

      return {
        ...item,
        selected,
        disabled:
          item.disabled ||
          (props.maxOptions !== undefined &&
            !selected &&
            selectedQuantity.value >= props.maxOptions),
      };
    })
    .filter((item) => !item.default)
    .sort((a, b) => {
      if (props.sortBySelected) {
        if (a.selected && !b.selected) {
          return -1;
        }
        if (!a.selected && b.selected) {
          return 1;
        }
      }
      return 0;
    });
});

const selectedOptions = computed(() => {
  return props.options.filter((option) => {
    return (
      (temporaryValue.value as ModelValue[]).includes(option.value) || null
    );
  });
});

const selected = computed(() => {
  if (props.multiple) {
    return selectedOptions.value[0] || null;
  }
  return (
    props.options.find((option) => option.value === temporaryValue.value) ||
    null
  );
});

const toggle = () => {
  if (props.disabled) {
    return;
  }

  opened.value = !opened.value;
  opened.value ? emit("open") : emit("close");

  if (opened.value) {
    return;
  }

  modelValue.value = temporaryValue.value;
};

const close = () => {
  if (!opened.value) {
    return;
  }

  if (props.multiple && props.applyOnClose) {
    modelValue.value = temporaryValue.value;
  }

  emit("close");

  opened.value = false;
};

const update = (item: ModelValue | ModelValue[], skipValidation = false) => {
  temporaryValue.value = item;
  if (!skipValidation && props.multiple && props.applyOnClose) {
    return;
  }
  modelValue.value = item;
};

const select = (option: FormattedOption) => {
  if (option.disabled) {
    close();
    return;
  }

  if (props.closeOnSelect) {
    close();
  }

  const action: "add" | "remove" = option.selected ? "remove" : "add";

  const selectedValue = option.value;

  if (props.multiple) {
    const modelValue = temporaryValue.value as ModelValue[];

    if (action === "add") {
      if (defaultValue.value) {
        const values = options.value.map((item) => item.value);

        const newModelValue = [...modelValue, selectedValue];

        if (values.every((item) => newModelValue.includes(item))) {
          return update([defaultValue.value]);
        }

        if (modelValue.includes(defaultValue.value)) {
          return update([
            ...modelValue.filter((item) => item !== defaultValue.value),
            selectedValue,
          ]);
        } else {
          return update([...modelValue, selectedValue]);
        }
      } else {
        return update([...modelValue, selectedValue]);
      }
    } else {
      const newModelValue = modelValue.filter((item) => item !== selectedValue);

      if (defaultValue.value && newModelValue.length === 0) {
        return update([defaultValue.value]);
      } else {
        return update(
          props.canBeEmpty
            ? newModelValue
            : newModelValue.length === 0
              ? modelValue
              : newModelValue,
        );
      }
    }
  } else {
    const modelValue = temporaryValue.value as ModelValue;

    if (action === "add") {
      return update(selectedValue);
    } else {
      return update(props.canBeEmpty ? "" : modelValue);
    }
  }
};

const clear = () => {
  if (props.disabled) {
    return;
  }

  update(
    props.multiple ? (defaultValue.value ? [defaultValue.value] : []) : "",
    true,
  );
  close();
};

onClickOutside(selectRef, close);

watch(
  () => props.options,
  (opts) => {
    const values = opts.map((item) => item.value);

    if (props.multiple) {
      const value = modelValue.value as ModelValue[];

      const newModelValue = value.filter((item) => values.includes(item));

      if (newModelValue.length !== value.length) {
        update(newModelValue);
      }
    } else {
      const value = modelValue.value as ModelValue;

      if (!values.includes(value)) {
        clear();
      }
    }
  },
);
</script>

<template>
  <label
    class="relative flex flex-col items-start"
    :class="{
      'gap-y-0.5': slots.default,
    }"
  >
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
    <div ref="selectContainer" class="relative flex w-full items-center">
      <div
        v-if="$slots['group-left']"
        :class="classes"
        class="!rounded-r-none !border-r-0 !px-2"
        :style="{ backgroundImage: 'none' }"
        :dimmed="dimmed"
        :filled="filled"
      >
        <slot name="group-left" :disabled="disabled"> </slot>
      </div>
      <div
        class="relative flex w-full flex-col justify-center outline-none"
        :class="[classes, { 'rounded-l-none': $slots['group-left'] }]"
        :style="{
          borderColor: customColor,
        }"
        :dimmed="dimmed"
        :filled="filled"
        @click.prevent="toggle"
      >
        <template v-if="selected">
          <div class="flex items-center gap-1.5 font-normal">
            <div
              class="-ml-2 flex items-center justify-center"
              v-if="!!$slots.left"
            >
              <slot name="left" :disabled="disabled"> </slot>
            </div>
            <template
              v-if="!multipleSelected && (selected.image || selected.icon)"
            >
              <component
                :is="selected.image ? 'img' : selected.icon"
                :src="selected.image"
                :alt="selected.label"
                :class="{ 'opacity-50': disabled, rounded: selected.image }"
                class="-ml-2 h-5 w-5"
              />
            </template>
            <template v-if="multipleSelected">
              <slot name="multiple-options-text" :quantity="selectedQuantity">
                {{ selectedQuantity }} options
              </slot>
            </template>
            <template v-else>
              <span
                class="truncate"
                :data-testid="'select-option-' + selected.label"
              >
                {{ selected.label }}
              </span>
            </template>
          </div>
          <template v-if="isClearable">
            <div
              class="absolute right-10 flex h-full w-6 items-center justify-end bg-inherit"
              :class="[cursorClass]"
              @click.prevent.stop="clear"
            >
              <Icon :name="ICONS.close" class="h-5 w-5" />
            </div>
          </template>
        </template>
        <template v-else>
          <span
            v-if="placeholder"
            class="truncate"
            :class="[
              disabled ? 'text-base-content/20' : 'text-base-content/50',
            ]"
          >
            {{ placeholder }}
          </span>
        </template>
      </div>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="opened"
          class="absolute left-0 z-[60] mt-0.5 w-full overflow-y-auto rounded-default border border-base-300 bg-base-200 px-1 py-1 shadow"
          style="top: 100%"
        >
          <slot name="search"></slot>
          <div
            class="flex w-full flex-col"
            :class="{
              'pointer-events-none text-base-content text-opacity-50': disabled,
              'custom-scrollbar': device.preferCustomScrollbar,
            }"
            style="overflow: overlay; max-height: 300px"
          >
            <template
              v-if="
                !options.length &&
                (slots['no-options'] || slots['no-options-content'])
              "
            >
              <slot name="no-options">
                <span class="group relative rounded p-2 text-center text-sm">
                  <slot name="no-options-content"></slot>
                </span>
              </slot>
            </template>
            <slot name="default-option">
              <span
                class="select-item group relative rounded text-center text-sm"
              >
                <slot name="default-option-content"></slot>
              </span>
            </slot>
            <div class="max-h-64 w-full" :class="[cursorClass]">
              <div
                class="select-item relative rounded px-2 py-3"
                v-for="(option, index) in options"
                :class="{
                  hidden: option.hidden,
                }"
                :key="option.value"
                :data-testid="`select-option-${option.value}`"
                @click.prevent="select(option)"
              >
                <div class="flex w-full items-center justify-between">
                  <div
                    class="flex w-full flex-col gap-2"
                    :class="{
                      'opacity-50': option.disabled,
                    }"
                  >
                    <div class="flex w-full items-center justify-between">
                      <div class="flex gap-2 truncate">
                        <template v-if="option.image || option.icon">
                          <component
                            :is="option.image ? 'img' : option.icon"
                            :src="option.image"
                            :alt="option.label"
                            class="my-auto flex-shrink-0"
                            :class="[
                              option.description ? 'h-10 w-10' : 'h-4 w-4',
                              { rounded: option.image },
                            ]"
                          />
                        </template>
                        <div class="truncate">
                          <div class="truncate">
                            <slot
                              name="before-option"
                              :item="option"
                              :index="index"
                            ></slot>
                            <span class="font-medium leading-6">
                              <slot name="option-label" :item="option">
                                {{ option.label }}
                              </slot>
                            </span>
                          </div>
                          <p v-if="option.description" class="truncate text-xs">
                            {{ option.description }}
                          </p>
                        </div>
                      </div>
                      <template v-if="option.selected">
                        <Icon
                          :name="ICONS.check"
                          class="h-5 w-5 flex-shrink-0 font-bold text-primary"
                        />
                      </template>
                    </div>
                    <slot
                      name="after-option"
                      :item="option"
                      :index="index"
                    ></slot>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </label>
</template>

<style scoped>
.select-md {
  @apply min-h-8 h-9;
}
</style>

<style>
:root {
  --select-bg: var(--base-100);
}

html[data-theme="light"] .select[dimmed="false"][filled="false"],
html[data-theme="light"] .select[dimmed="false"][filled="true"],
html[data-theme="dark"] .select[dimmed="false"][filled="true"] {
  --select-bg: var(--base-200);
}

.select,
.select-disabled {
  background-color: var(--select-bg) !important;
}

.select-disabled {
  border-color: var(--base-300) !important;
}

html[data-theme="dark"] .select-bordered:not([disabled]) {
  @apply border-opacity-10 !important;
}

@media (hover: hover) and (pointer: fine) {
  .select-item:hover {
    @apply hover:bg-base-300/50;
  }
}
</style>
