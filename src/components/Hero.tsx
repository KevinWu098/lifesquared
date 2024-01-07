"use client";

import React, { useState } from "react";
import { Loader2, Square } from "lucide-react";

import CreationForm from "./CreationForm";
import LifeCalendar from "./LifeCalendar";

interface HeroProps {
    dbBirthday: string | null;
    dbFinalYear: number | null;
}

const Hero = ({ dbBirthday, dbFinalYear }: HeroProps) => {
    const [birthday, setBirthday] = useState<string | null>(dbBirthday);
    const [finalYear, setFinalYear] = useState<number | null>(dbFinalYear);

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

                        <CreationForm
                            setBirthday={setBirthday}
                            setFinalYear={setFinalYear}
                        />
                    </div>
                </div>
            </div>

            <LifeCalendar birthday={birthday} finalYear={finalYear} />
        </main>
    );
};

export default Hero;
