import "@/shared/assets/base.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@unhead/vue";
import App from "../src/app/App.vue";
import { router } from "./app/router/routes";

const head = createHead();
const pinia = createPinia();
const app = createApp(App);

app.use(router).use(pinia).mount("#app");
