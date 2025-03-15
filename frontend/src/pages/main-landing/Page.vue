<script setup lang="ts">
import { useHead } from "@unhead/vue";
import Hero from "./ui/blocks/Hero.vue";
import SlidesAbout from "./ui/blocks/SlidesAbout.vue";
import Discounts from "./ui/blocks/Discounts.vue";

useHead({
  title: "Custom Press-on-Nails by Kris",
  meta: [
    {
      name: "description",
      content:
        "Custom Press-on-Nails by Kris is a nail salon that specializes in custom press-on nails. We offer a variety of designs and styles to choose from.",
    },
    {
      property: "og:title",
      content: "Custom Press-on-nails only for you",
    },
    {
      property: "og:description",
      content:
        "Discover the perfect custom press-on nails designed just for you. Our salon offers a wide range of unique and stylish designs to suit every occasion.",
    },
  ],
});
</script>

<template>
  <div class="-mt-10">
    <Hero />
    <SlidesAbout />
    <Discounts />
  </div>
</template>
