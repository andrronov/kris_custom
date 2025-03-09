import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      layout: "default",
    },
    component: () => import("@/pages/home/Page.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export { router };