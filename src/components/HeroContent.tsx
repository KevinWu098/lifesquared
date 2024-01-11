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
    const [weekSquares, setWeekSquares] = useState<WeekSquare[] | null>(
        dbWeekSquares,
    );

    return (
        <div className="flex flex-col gap-y-8">
            <CreationForm
                setBirthday={setBirthday}
                setFinalYear={setFinalYear}
                setWeekSquares={setWeekSquares}
                birthday={birthday}
                finalYear={finalYear}
            />

            <LifeCalendar
                dbBirthday={birthday}
                dbFinalYear={finalYear}
                dbWeekSquares={weekSquares}
            />
        </div>
    );
};

export default HeroContent;
