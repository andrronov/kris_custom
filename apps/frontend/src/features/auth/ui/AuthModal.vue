<script setup lang="ts">
import { AuthForm } from "@/entities/auth";
import { useAppStore } from "@/shared/stores/application";
import { Modal } from "@/shared/ui";

const appStore = useAppStore();
</script>

<template>
  <Modal :open="appStore.authModalVisible" @close="appStore.closeAuthModal">
    <AuthForm />
  </Modal>
</template>
