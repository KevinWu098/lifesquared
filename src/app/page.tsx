import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Loader2, Square } from "lucide-react";

import CreationForm from "@/components/CreationForm";
import LifeCalendar from "@/components/LifeCalendar";

export default async function Home() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <main className="wrapper mt-24 flex flex-col gap-y-16 gap-x-24 min-h-[calc(100vh-6rem)]">
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

                        <CreationForm />
                    </div>
                </div>
            </div>

            <LifeCalendar birthday="03/26/2005" finalYear={30} />
        </main>
    );
}
