"use client";

import React, { useState } from "react";
import { WeekSquare } from "@prisma/client";

import LifeCalendar from "./Calendar/LifeCalendar";
import CreationForm from "./CreationForm";

interface HeroProps {
    dbBirthday: string | null;
    dbFinalYear: number | null;
    dbWeekSquares: WeekSquare[] | null;
}

const HeroContent = ({ dbBirthday, dbFinalYear, dbWeekSquares }: HeroProps) => {
    const [birthday, setBirthday] = useState<string | null>(dbBirthday);
    const [finalYear, setFinalYear] = useState<number | null>(dbFinalYear);

    return (
        <div className="flex flex-col gap-y-8">
            <CreationForm
                setBirthday={setBirthday}
                setFinalYear={setFinalYear}
                birthday={birthday}
                finalYear={finalYear}
            />

            <LifeCalendar
                birthday={birthday}
                finalYear={finalYear}
                dbWeekSquares={dbWeekSquares}
            />
        </div>
    );
};

export default HeroContent;
