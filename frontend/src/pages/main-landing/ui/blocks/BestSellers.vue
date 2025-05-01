<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ProductCard } from '@/entitites/product-card';

const { t } = useI18n();
</script>

<template>
    <section class="container py-6 pb-12 flex flex-col w-full">
        <h2 class="text-4xl text-primary font-semibold mb-3">{{ t("main_landing.best_sellers.title") }}</h2>
        <p class="text-lg text-secondary">{{ t("main_landing.best_sellers.description") }}</p>
        <div class="flex items-center gap-4 overflow-x-auto mt-6 py-4 no-scrollbar">
            <ProductCard v-for="item in 6" :key="item" />
        </div>
    </section>
</template>