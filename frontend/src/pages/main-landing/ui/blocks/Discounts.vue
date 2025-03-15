<script setup lang="ts">
import { Image, Button } from "@/shared/ui";

const discounts = [
  {
    title: "Buy 2 Get 1 Free",
    description: "Buy 2 sets of nails and get 1 set free",
    image: "first-time-customer.jpg",
  },
  {
    title: "First Time Customer",
    description: "Get 10% off your first order",
    image: "first-time-customer.jpg",
  },
  {
    title: "Refer a Friend",
    description: "Refer a friend and get 25% off your next order",
    image: "refer-a-friend.jpg",
  },
  {
    title: "Birthday Discount",
    description: "Celebrate your birthday with 20% off",
    image: "birthday-discount.jpg",
  },
];
</script>

<template>
  <section
    class="container py-12 flex items-center justify-between gap-4 overflow-x-auto overflow-y-hidden w-full"
  >
    <div
      v-for="(discount, index) in discounts"
      :key="index"
      class="relative h-48 min-w-[300px] w-full rounded-3xl bg-base-100 border border-secondary flex flex-col justify-between items-center p-4"
    >
      <Image
        src="/hero.jpg"
        layout="fullWidth"
        class="absolute w-full h-full object-cover rounded-3xl top-0 left-0 opacity-50"
      />
      <div class="w-full z-50">
        <h3 class="text-2xl font-bold text-secondary">{{ discount.title }}</h3>
        <p class="text-lg">{{ discount.description }}</p>
      </div>
      <Button
        class="mt-3 z-50 self-start"
        size="md"
        color="secondary"
        variant="outline"
        >Learn More</Button
      >
    </div>
  </section>
</template>

<style scoped>
.container {
  scrollbar-width: none;
  -ms-overflow-style: none;
  background-color: transparent;
}

.container::-webkit-scrollbar {
  display: none;
}
</style>
