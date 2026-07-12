import type { RouteLocationRaw, RouteRecordInfo } from "vue-router";
import type { AppTheme, Platform } from "@/shared/types";
import type { Layout } from "../layouts";

export interface RouteNamedMap {
  "main-landing": RouteRecordInfo<
    "main-landing",
    "/",
    Record<never, never>,
    Record<never, never>
  >;

  catalog: RouteRecordInfo<
    "catalog",
    "/catalog",
    Record<never, never>,
    Record<never, never>
  >;

  "404": RouteRecordInfo<
    "404",
    "/:path(.*)",
    { path: string },
    { path: string }
  >;

  product: RouteRecordInfo<
    "product",
    "/product/:id",
    { id: string },
    { id: string }
  >;
}

declare module "vue-router" {
  interface TypesConfig {
    RouteNamedMap: RouteNamedMap;
  }

  interface RouteMeta {
    /*
     * App layout, clean is used only for widget
     **/
    layout: Layout;
    /**
     * Route key for parent-child relationship, used for scroll perseverance
     */
    routeKey?: string;
    /*
     * Page platform (landing)
     */
    platform: Platform;
    /*
     * Auth guard type
     **/
    auth?: "required" | "forbidden";
    /*
     * For for login/signup pages
     **/
    hideAuthNavigation?: boolean;
    /*
     * Explicitly set theme for the page
     **/
    theme?: AppTheme;
    /*
     * For pages with sticky header
     **/
    unstickyHeader?: boolean;
    /*
     * Custom hook for auth guard handling
     **/
    afterAuth?: () => { redirectTo: RouteLocationRaw };
  }
}
