import { Hono } from "hono";
// import { handle } from "hono/vercel";

const app = new Hono();

const welcomeStrings = [
  "Hello Hono!",
  "To learn more about Hono on Vercel, visit https://vercel.com/docs/frameworks/backend/hono",
];

app.get("/pizda", (c) => c.text(welcomeStrings.join("\n\n")));

// export const GET = handle(app);
// export const POST = handle(app);
export default app;
