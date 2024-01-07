import { redirect } from "next/navigation";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import Hero from "@/components/Hero";

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
        <>
            <Hero dbBirthday={dbUser.birthday} dbFinalYear={dbUser.finalYear} />
        </>
    );
}
