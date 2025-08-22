import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./lib/auth";
import { HonoEnv } from "./types";
import { todos } from "./routes/todo.routes";

const app = new Hono<HonoEnv>().basePath("/api");

const router = app
  .on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw))
  .use("*", cors())
  .route("/todos", todos)
  .get("/people", (c) => {
    const people = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ];

    return c.json(people);
  });

export type AppType = typeof router;
export default router;
