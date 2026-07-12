import type { RouteRecordRaw } from "vue-router";
import type { RouteNamedMap } from "./meta.d";

type NamedRoute = keyof RouteNamedMap;

type NamedRouteRecordParent<T extends string> = {
  name?: T;
  children: NamedRouteRecord<T>[];
};
type NamedRouteRecordChild<T extends string> = { name: T };
export type NamedRouteRecord<T extends string> =
  | (Omit<RouteRecordRaw, "name" | "children"> & NamedRouteRecordParent<T>)
  | NamedRouteRecordChild<T>;

const appRoutes: NamedRouteRecord<NamedRoute>[] = [
  {
    path: "/",
    name: "main-landing",
    meta: {
      layout: "default",
      platform: "landing",
    },
    component: () => import("@/pages/main-landing/Page.vue"),
  },
  {
    path: "/catalog",
    name: "catalog",
    meta: {
      layout: "default",
      platform: "catalog",
    },
    component: () => import("@/pages/catalog/Page.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    meta: {
      layout: "default",
      platform: "landing",
    },
    component: () => import("@/pages/404/Page.vue"),
  },
  {
    path: "/product/:slug",
    name: "product",
    meta: {
      layout: "default",
      platform: "product",
    },
    component: () => import("@/pages/product/Page.vue"),
  },
];

const redirects: RouteRecordRaw[] = [];

export const routes: RouteRecordRaw[] = [
  ...(appRoutes as RouteRecordRaw[]),
  ...redirects,
];
