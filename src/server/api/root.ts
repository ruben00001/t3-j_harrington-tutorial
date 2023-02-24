import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { topicRouter } from "./routers/topic";
import { imageRouter } from "./routers/image";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  topic: topicRouter,
  image: imageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
