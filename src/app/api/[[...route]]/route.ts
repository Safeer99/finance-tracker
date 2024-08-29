import { Hono, Context } from "hono";
import { handle } from "hono/vercel";
import {
  authHandler,
  initAuthConfig,
  verifyAuth,
  type AuthConfig,
} from "@hono/auth-js";
import GitHub from "@auth/core/providers/github";
import accounts from "./accounts";
import categories from "./categories";
import transactions from "./transactions";
import summary from "./summary";

const app = new Hono({ strict: false }).basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));

app.use("/api/auth/*", authHandler());

app.use("/api/*", verifyAuth());

app.get("/api/protected", (c) => {
  const auth = c.get("authUser");
  return c.json(auth);
});

function getAuthConfig(c: Context): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    providers: [
      GitHub({
        clientId: c.env.AUTH_GITHUB_ID,
        clientSecret: c.env.AUTH_GITHUB_SECRET,
      }),
    ],
  };
}

const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions)
  .route("/summary", summary);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
