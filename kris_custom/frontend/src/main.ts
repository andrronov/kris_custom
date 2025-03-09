import "@/shared/assets/base.css";

import { createApp } from "vue";
import App from "../src/app/App.vue";
import { router } from "./app/router/routes";

const app = createApp(App);

app.use(router).mount("#app");