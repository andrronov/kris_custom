import { Hono } from "hono";
import user from "./routes/user";
import product from "./routes/product";

const app = new Hono<{
  Bindings: {
    KC_ASSETS: R2Bucket;
    RESEND_API_KEY: string;
  };
}>();

app.route("/user", user);
app.route("/product", product);

export default app;
