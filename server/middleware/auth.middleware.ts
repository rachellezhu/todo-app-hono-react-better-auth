import { createMiddleware } from "hono/factory";
import { HonoEnv } from "../types";
import { auth } from "../lib/auth";

export const authMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) return c.json({ error: "Unauthorized" }, 401);

  c.set("user", session.user);
  c.set("session", session.session);

  return next();
});
