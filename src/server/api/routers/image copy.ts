import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const imageRouter = createTRPCRouter({
  getAll: protectedProcedure.query(() => {
    return "";
  }),

  create: protectedProcedure
    .input(z.object({ cloudinaryId: z.string() }))
    .mutation(({ ctx, input: { cloudinaryId } }) => {
      return ctx.prisma.image.create({
        data: {
          cloudinaryId,
        },
      });
      /*       return ctx.prisma.topic.create({
        data: {
          title: "hello",
          userId: ctx.session.user.id,
        },
      }); */
    }),
});
