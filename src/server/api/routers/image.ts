import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const imageRouter = createTRPCRouter({
  getAll: protectedProcedure.query(() => {
    return "";
  }),

  create: protectedProcedure.query(() => {
    return "";
  }),
});
