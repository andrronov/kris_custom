<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { anchor } from "@/shared/lib/utils";
import Hero from "./ui/blocks/Hero.vue";
import SlidesAbout from "./ui/blocks/SlidesAbout.vue";
import Discounts from "./ui/blocks/discounts/Discounts.vue";
import BestSellers from "./ui/blocks/BestSellers.vue";
import HowGet from "./ui/blocks/how-get/HowGet.vue";
import Mission from "./ui/blocks/Mission.vue";
import Comparison from "./ui/blocks/Comparison.vue";

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
  <div class="-mt-20">
    <Hero />
    <SlidesAbout />
    <Discounts :id="anchor.get('discounts')" />
    <BestSellers :id="anchor.get('best-sellers')" />
    <HowGet />
    <Mission />
    <Comparison />
    <!-- <NailsAesthetic /> -->
  </div>
</template>
