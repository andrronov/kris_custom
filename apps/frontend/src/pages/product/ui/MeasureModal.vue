<script setup lang="ts">
import { useAttrs } from "vue";
import { useI18n } from "vue-i18n";
import { Modal, Button, Image, Icon } from "@/shared/ui";
import { useModal } from "@/shared/lib/composables/use-modal";
import { ICONS } from "@/shared/assets";

const { t } = useI18n();
const attrs = useAttrs();
const { visible, open, close } = useModal();
</script>

<template>
  <Modal :open="visible" @close="close" :padding="false">
    <div class="flex flex-col overflow-auto">
      <Image src="/images/information/sizes_shapes.png" layout="fullWidth" />
      <Image src="/images/information/how_to_measure.png" layout="fullWidth" />
    </div>
  </Modal>
  <Button v-bind="attrs" @click="open" size="md" variant="link">
    <Icon :name="ICONS.measure" class="size-6" />
    {{ t("product.size_chart") }}
  </Button>
</template>
