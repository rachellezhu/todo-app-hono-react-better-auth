import { Hono } from "hono";
import { cors } from "hono/cors";
import { getTodos } from "./db/queries";
import { auth } from "./lib/auth";

const app = new Hono().basePath("/api");

const router = app
  .on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw))
  .use("*", cors())
  .get("/", (c) => {
    return c.text("Hello Hono!");
  })
  .get("/people", (c) => {
    const people = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ];

    return c.json(people);
  })
  .get("/todos", async (c) => {
    try {
      const todos = await getTodos();

      return c.json(todos);
    } catch (error) {
      console.log("Failed to fetch todos: ", error);
      return c.json(
        {
          error: "Failed to fetch todos",
        },
        500
      );
    }
  });

export type AppType = typeof router;
export default router;
