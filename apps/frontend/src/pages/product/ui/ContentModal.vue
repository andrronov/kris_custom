<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Modal, Button, Image } from "@/shared/ui";
import { useModal } from "@/shared/lib/composables/use-modal";

const { t } = useI18n();
const { visible, open, close } = useModal();
</script>

<template>
  <Modal :open="visible" @close="close" :padding="false">
    <Image src="/images/information/set_includes.png" layout="fullWidth" />
  </Modal>
  <Button
    @click="open"
    size="md"
    color="primary"
    variant="outline"
    full-width
    class="!uppercase"
  >
    {{ t("product.set_includes") }}
  </Button>
</template>
