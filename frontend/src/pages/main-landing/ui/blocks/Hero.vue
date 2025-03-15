<script setup lang="ts">
import { Image, Button } from "@/shared/ui";
</script>

<template>
  <section class="relative flex h-[720px] bg-base-100">
    <Image
      src="/hero.jpg"
      layout="fullWidth"
      class="absolute top-0 left-0 object-cover h-full w-full opacity-35 pointer-events-none"
    />
    <div
      class="container z-50 flex flex-col items-center self-center text-center"
    >
      <h1 class="font-semibold text-3xl md:text-6xl text-base-content w-full">
        Wear <span class="font-bold text-primary">Art</span>. <br />
        Define the <span class="font-bold text-primary">Beauty</span>.
      </h1>
      <p class="mt-2 w-full text-center font-light text-lg md:text-xl">
        Best handmade nails only for
        <span class="font-bold text-primary">you</span>.
      </p>
      <Button class="mt-16" variant="outline" size="lg" color="primary">
        Discover
      </Button>
    </div>
  </section>
</template>
