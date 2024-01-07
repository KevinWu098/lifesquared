"use client";

import React, { useState } from "react";

import LifeCalendar from "./Calendar/LifeCalendar";
import CreationForm from "./CreationForm";

interface HeroProps {
    dbBirthday: string | null;
    dbFinalYear: number | null;
}

const HeroContent = ({ dbBirthday, dbFinalYear }: HeroProps) => {
    const [birthday, setBirthday] = useState<string | null>(dbBirthday);
    const [finalYear, setFinalYear] = useState<number | null>(dbFinalYear);

    return (
        <div className="flex flex-col gap-y-8">
            <CreationForm
                setBirthday={setBirthday}
                setFinalYear={setFinalYear}
            />

            <LifeCalendar birthday={birthday} finalYear={finalYear} />
        </div>
    );
};

export default HeroContent;
