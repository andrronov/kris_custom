<script setup lang="ts">
import { Header } from "@/widgets/app-header";
import { Button } from "@/shared/ui";
</script>

<template>
  <!-- <div>
    <h1>Home Page</h1>
  </div> -->
  <div class="container">
    <h1 class="font-bold text-4xl text-primary mb-4">Color palette!</h1>
    <p>Hello (love you!!!)</p>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
  <!-- Primary -->
  <div class="p-4 rounded text-primary-content bg-primary">
    Primary (#E91E63)
  </div>
  <!-- Secondary -->
  <div class="p-4 rounded text-secondary-content bg-secondary">
    Secondary (#FF99CC)
  </div>
  <!-- Accent -->
  <div class="p-4 rounded text-accent-content bg-accent">Accent (#D81B60)</div>
  <!-- Neutral -->
  <div class="p-4 rounded text-neutral-content bg-neutral">
    Neutral (#FCE4EC)
  </div>
  <!-- Info -->
  <div class="p-4 rounded text-info-content bg-info">Info (#F9A8D4)</div>
  <!-- Success -->
  <div class="p-4 rounded text-success-content bg-success">
    Success (#14B8A6)
  </div>
  <!-- Warning -->
  <div class="p-4 rounded text-warning-content bg-warning">
    Warning (#FB923C)
  </div>
  <!-- Error -->
  <div class="p-4 rounded text-error-content bg-error">Error (#F43F5E)</div>

  <!-- Base colors -->
  <div class="p-4 rounded bg-base-100 text-base-content">
    Base 100 (#FFF5F7)
  </div>
  <div class="p-4 rounded bg-base-200 text-base-content">
    Base 200 (#FCE4EC)
  </div>
  <div class="p-4 rounded bg-base-300 text-base-content">
    Base 300 (#F8BBD0)
  </div>

  <!-- Дополнительные розовые оттенки -->
  <div class="p-4 rounded bg-rose-light text-[#1E1E1E]">Rose Light (#FFC0CB)</div>
  <div class="p-4 rounded bg-rose-dark text-[#FFF5F7]">Rose Dark (#D81B60)</div>
  <div class="p-4 rounded bg-rose-muted text-[#5E3A3A]">Rose Muted (#FADADD)</div>
</div>
  </div>
</template>
