import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "mainLanding",
    meta: {
      layout: "default",
    },
    component: () => import("@/pages/main-landing/Page.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export { router };
