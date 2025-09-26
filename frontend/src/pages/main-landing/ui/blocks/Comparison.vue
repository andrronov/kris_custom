<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Button, Icon } from "@/shared/ui";
import { ICONS } from "@/shared/assets";

type BodyRow = {
  parameter: string;
  negativeValue: string;
  positiveValue: string | boolean;
};

const { t, tm } = useI18n();

const tableContent = computed(() => ({
  headRows: tm("main_landing.comparison.table.headRows") as string[],
  bodyRows: tm("main_landing.comparison.table.bodyRows") as BodyRow[],
}));
</script>

<template>
  <section class="py-6 pb-16 flex flex-col w-full">
    <h2 class="container text-3xl md:text-4xl text-primary font-semibold mb-2">
      {{ t("main_landing.comparison.title") }}
    </h2>
    <p class="container mb-4 md:hidden text-lg">
      ({{ t("common.swipe-to-see") }})
    </p>
    <div class="overflow-x-auto md:container">
      <table class="table-fixed table-lg w-full mb-3 md:mb-0 min-w-[625px]">
        <colgroup>
          <col class="w-[23.5%] md:w-[28.5%]" />
          <col class="w-[31%] md:w-[35%]" />
          <col class="w-[38.5%] md:w-[36.5%]" />
        </colgroup>
        <thead class="text-lg">
          <tr>
            <th scope="col" />
            <th
              scope="col"
              v-for="(headRow, index) in tableContent.headRows"
              :key="index"
              :class="{
                'text-secondary border-x-2 border-t-2 rounded-md border-primary':
                  index === 1,
              }"
            >
              {{ headRow }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in tableContent.bodyRows"
            :key="index"
            class="md:hover:bg-base-300 transition-all duration-200"
            :class="{ 'bg-base-200': index % 2 !== 0 }"
          >
            <th
              scope="col"
              class="text-base md:text-xl pl-3 md:pl-0 text-rose-light text-left"
            >
              {{ row.parameter }}
            </th>
            <td class="text-xl text-center">
              <template v-if="typeof row.negativeValue === 'string'">
                <span>{{ row.negativeValue }}</span>
              </template>
              <template v-else>
                <Icon :name="ICONS.closeOutline" class="w-8 h-8 mx-auto" />
              </template>
            </td>
            <td
              class="text-2xl text-secondary font-bold border-x-2 text-center border-primary"
              :class="{
                'border-b-2': index === tableContent.bodyRows.length - 1,
              }"
            >
              <template v-if="typeof row.positiveValue === 'string'">
                <span>{{ row.positiveValue }}</span>
              </template>
              <template v-else>
                <Icon :name="ICONS.successSolid" class="w-8 h-8 mx-auto" />
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
