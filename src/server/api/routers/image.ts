import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const imageRouter = createTRPCRouter({
  getAll: protectedProcedure.query(() => {
    return "";
  }),

  uploadAndCreate: protectedProcedure
    .input(z.object({ file: z.instanceof(File) }))
    .mutation(({ ctx, input: { file } }) => {}),
  create: protectedProcedure
    .input(z.object({ cloudinaryId: z.string() }))
    .mutation(({ ctx, input: { cloudinaryId } }) => {
      return ctx.prisma.image.create({
        data: {
          cloudinaryId,
        },
      });
    }),
});
