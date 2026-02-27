import { Hono } from "hono";
import { cors } from "hono/cors";
import user from "./routes/user";
import product from "./routes/product";
import auth from "./routes/auth";
import { sessionMiddleware } from "./middleware";

const app = new Hono<{ Bindings: Env }>();

app.use(
  "/*",
  sessionMiddleware,
  cors({
    origin: ["http://localhost:5173", "https://kris-customs.com"],
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.route("/user", user);
app.route("/product", product);
app.route("/auth", auth);

export default app;
