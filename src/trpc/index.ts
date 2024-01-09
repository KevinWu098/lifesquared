import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { db } from "../db";
import { privateProcedure, publicProcedure, router } from "./trpc";

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
    getUser: privateProcedure.query(async ({ ctx }) => {
        const { userId } = ctx;

        return await db.user.findFirst({
            where: {
                id: userId,
            },
            include: {
                calendar: true,
            },
        });
    }),
    updateUser: privateProcedure
        .input(
            z.object({
                birthday: z.string(),
                finalYear: z.number(),
            }),
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
                include: {
                    calendar: true,
                },
                data: {
                    birthday: birthday,
                    finalYear: finalYear,
                    calendar: {
                        disconnect: true,
                    },
                },
            });

            return updatedUser;
        }),
    saveCalendar: privateProcedure
        .input(
            z.object({
                calendar: z.array(z.boolean()),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;
            const { calendar } = input;

            const existingUser = await db.user.findFirst({
                where: {
                    id: userId,
                },
            });

            if (!existingUser) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            const existingCalendar = await db.calendar.findFirst({
                where: {
                    userId: userId,
                },
            });

            if (existingCalendar === null) {
                await db.calendar.create({
                    data: {
                        userId: userId,
                        weekSquares: {
                            createMany: {
                                data: calendar.map((week, index) => ({
                                    value: week,
                                    index: index,
                                })),
                            },
                        },
                    },
                });
            } else {
                await db.calendar.update({
                    where: {
                        id: existingCalendar.id,
                    },
                    data: {
                        updatedAt: new Date(),
                    },
                });

                const weekSquaresToUpdate = await db.weekSquare.findMany({
                    where: {
                        calendarId: existingCalendar.id,
                    },
                });

                const updateOperations = calendar.map((week, index) => {
                    const weekSquare = weekSquaresToUpdate[index];
                    if (weekSquare.value !== week) {
                        return {
                            where: {
                                id: weekSquare.id,
                            },
                            data: {
                                value: week,
                                index: index,
                            },
                        };
                    } else {
                        return false;
                    }
                });

                for (const operation of updateOperations) {
                    if (operation == false) {
                        continue;
                    }

                    await db.weekSquare.update({
                        ...operation,
                    });
                }
            }
        }),
});

export type AppRouter = typeof appRouter;
