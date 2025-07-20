import "@/shared/assets/base.css";

import { createPinia } from "pinia";
import { createHead } from "@unhead/vue";
import { i18n } from "@/shared/services/i18n";
import { ViteSSG } from "vite-ssg";
import App from "./app/App.vue";
import { routes } from "./app/router/routes";
import { scrollBehavior } from "./app/router/scroll-behaviour";

const head = createHead();

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ app, router, isClient, head }) => {
    const pinia = createPinia();

    app.use(pinia);
    app.use(i18n.instance);
  },
);
