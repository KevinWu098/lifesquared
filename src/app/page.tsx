import { redirect } from "next/navigation";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Loader2, Square } from "lucide-react";

import HeroContent from "@/components/HeroContent";

export default async function Home() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
        redirect("/auth-callback?origin=dashboard");
    }

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id,
        },
    });

    if (!dbUser) {
        redirect("/auth-callback?origin=dashboard");
    }

    return (
        <main className="wrapper mt-24 flex flex-col gap-y-8 gap-x-24 min-h-[calc(100vh-6rem)]">
            <div>
                <div
                    className="relative -ml-2.5 h-fit w-fit"
                    aria-hidden={true}
                >
                    <Square fill="text-primary" size={112} />
                    <div className="absolute left-1/2 top-1/2 z-10 h-fit w-fit -translate-x-1/2 -translate-y-1/2 transform">
                        <Loader2
                            className="animate-spin text-white duration-50000"
                            fill="text-primary"
                            size={64}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-row justify-between gap-x-24">
                    <div className="flex flex-col gap-8">
                        <h1 className="text-7xl font-bold whitespace-nowrap">
                            Life, Squared
                        </h1>
                    </div>
                </div>
            </div>

            <HeroContent
                dbBirthday={dbUser.birthday}
                dbFinalYear={dbUser.finalYear}
            />
        </main>
    );
}
