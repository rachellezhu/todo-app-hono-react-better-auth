import { db, pool } from "../server/db/db";
import * as schema from "../server/db/schema";
import { seed } from "drizzle-seed";

const seedDb = async () => {
  await seed(db, { todos: schema.todos }).refine((funcs) => ({
    todos: {
      columns: {
        title: funcs.valuesFromArray({
          values: [
            "sleep",
            "read a book",
            "play games",
            "sweep the floor",
            "buy groceries",
          ],
        }),
        description: funcs.valuesFromArray({
          values: [
            "daily",
            "at 10 pm",
            "carefully",
            "weekly",
            "monthly",
            undefined,
          ],
        }),
        userId: funcs.valuesFromArray({
          values: ["zhYWnri27KqtKt48wRsf19oubkNa3uuJ"],
        }),
      },
    },
  }));
};

seedDb()
  .then(() => {
    console.log("seeded database successfully");
    return pool.end();
  })
  .catch((error) => {
    console.error(`failed to seed database:\n${error}`);
    return pool.end();
  });
