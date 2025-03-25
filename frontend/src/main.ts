import "@/shared/assets/base.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@unhead/vue";
import { i18n } from "@/shared/services/i18n";
import App from "../src/app/App.vue";
import { router } from "./app/router/routes";

const head = createHead();
const pinia = createPinia();
const app = createApp(App);

app
    .use(router)
    .use(i18n.instance)
    .use(pinia)
    .mount("#app");
