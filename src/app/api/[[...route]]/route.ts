import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.use(clerkMiddleware());
// app.use(async (c, next) => {
//     const auth = getAuth(c);

//     if (!auth?.userId) {
//       return c.json({ error: "unauthorized" }, 401);
//     }

//   await next();
// });

const routes = app.route("/accounts", accounts);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
