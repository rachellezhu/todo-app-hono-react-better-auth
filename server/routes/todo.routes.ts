import { Hono } from "hono";
import { HonoEnv } from "../types";
import { authMiddleware } from "../middleware/auth.middleware";
import { getTodosById } from "../db/queries";

export const todos = new Hono<HonoEnv>()
  .use(authMiddleware)
  .get("/", async (c) => {
    const user = c.get("user");

    try {
      const todos = await getTodosById(user.id);

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
