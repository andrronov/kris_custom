<script setup lang="ts">
const abouts = [
  "Easy to use",
  "Customizable",
  "Reusable",
  "Affordable",
  "Long-lasting",
  "100% Handmade",
  "Variety of designs",
  "Stylish",
  "Unique",
];
</script>

<template>
  <div
    class="flex flex-col gap-y-4 bg-primary text-primary-content py-3 font-medium"
  >
    <div class="relative flex overflow-x-hidden container">
      <div class="absolute top-0 flex animate-marquee whitespace-nowrap">
        <p
          v-for="(about, index) in abouts"
          :key="index"
          class="mx-5 inline-block transition duration-300 ease-in-out"
        >
          {{ about }}
        </p>
      </div>
      <div class="!mx-0 flex animate-marquee2 whitespace-nowrap !px-0">
        <p
          v-for="(about, index) in abouts"
          :key="index"
          class="mx-5 inline-block transition duration-300 ease-in-out"
        >
          {{ about }}
        </p>
      </div>
    </div>
  </div>
</template>
