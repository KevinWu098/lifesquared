import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "../db";
import { z } from "zod";

export const appRouter = router({
    authCallback: publicProcedure.query(async () => {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user?.id || !user?.email) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
        }

        const dbUser = await db.user.findFirst({
            where: {
                id: user.id,
            },
        });

        if (!dbUser) {
            console.log("no user");
            await db.user.create({
                data: {
                    id: user.id,
                    email: user.email,
                },
            });
        }

        return { success: true };
    }),
    updateUser: privateProcedure
        .input(
            z.object({
                birthday: z.string(),
                finalYear: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { birthday, finalYear } = input;

            const existingUser = await db.user.findFirst({
                where: {
                    id: userId,
                },
            });

            if (!existingUser) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            const updatedUser = await db.user.update({
                where: {
                    id: userId,
                },
                data: {
                    birthday: birthday,
                    finalYear: finalYear,
                },
            });

            return updatedUser;
        }),
    // getUserFiles: privateProcedure.query(async ({ ctx }) => {
    //     const { userId } = ctx;

    //     return await db.file.findMany({
    //         where: {
    //             userId,
    //         },
    //     });
    // }),
    // getFile: privateProcedure
    //     .input(z.object({ key: z.string() }))
    //     .mutation(async ({ ctx, input }) => {
    //         const { userId } = ctx;

    //         const file = await db.file.findFirst({
    //             where: {
    //                 key: input.key,
    //                 userId,
    //             },
    //         });

    //         if (!file) {
    //             throw new TRPCError({ code: "NOT_FOUND" });
    //         }

    //         return file;
    //     }),
});

export type AppRouter = typeof appRouter;
