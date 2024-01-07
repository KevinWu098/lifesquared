"use client";

import RoundedBox from "@/components/Calendar/RoundedBox";

import { Separator } from "../ui/separator";
import { RoundedCheckbox } from "./RoundedCheckBox";

const UnbornSquare = () => {
    return (
        <RoundedBox
            className="w-5 h-5 pattern-diagonal-lines pattern-black pattern-bg-white
  pattern-size-1 pattern-opacity-50"
        />
    );
};

const PastSquare = () => {
    return <RoundedBox className="w-5 h-5 bg-zinc-300" />;
};

function getYearDifference(birthdayString: string) {
    const birthday = new Date(birthdayString);
    const difference =
        new Date().getFullYear() - new Date(birthday).getFullYear();

    return difference;
}

function getWeeksFromStartOfYear(birthdayString: string) {
    const birthday = new Date(birthdayString);

    const startOfYear = new Date(birthday.getFullYear(), 0, 1);
    const timeDifference = birthday.getTime() - startOfYear.getTime();
    const weeks = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7));

    return weeks;
}

function getPastWeeksInBirthYear(birthdayString: string) {
    const birthday = new Date(birthdayString);
    const today = new Date();

    if (today.getFullYear() != birthday.getFullYear()) {
        return 52 - getWeeksFromStartOfYear(birthday.toString());
    }

    const timeDifference = birthday.getTime() - today.getTime();
    const weeks = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7));

    return weeks;
}

interface LifeCalendarProps {
    birthday: string | null;
    finalYear: number | null;
}

const LifeCalendar = ({ birthday, finalYear }: LifeCalendarProps) => {
    if (!birthday || !finalYear) {
        return null;
    }

    const yearDifference = getYearDifference(birthday);
    const unbornWeeks = getWeeksFromStartOfYear(birthday);
    const pastWeeksBirthYear = getPastWeeksInBirthYear(birthday);
    // Noninclusive refers to non-birth and non-current years
    const pastWeeksNoninclusive =
        (new Date().getFullYear() - new Date(birthday).getFullYear() - 1) * 52;
    const nonPastWeeks =
        finalYear * 52 -
        unbornWeeks -
        pastWeeksBirthYear -
        pastWeeksNoninclusive;

    return (
        <>
            <>
                <Separator className="my-2 border-2" />

                <div className="border-2 p-2 flex flex-col">
                    <h2 className="text-4xl font-bold text-center py-2">
                        Life Calendar
                    </h2>

                    <div className="flex flex-row justify-around">
                        <div className="grid grid-rows-[54] gap-1 text-sm">
                            <p className="mr-4 flex h-fit invisible">0000</p>
                            {[
                                ...Array(
                                    unbornWeeks > 0 ? finalYear + 1 : finalYear,
                                ).keys(),
                            ].map((index) => (
                                <p key={index} className="mr-4 h-fit flex">
                                    {parseInt(birthday.split("/")[2]!) + index}
                                </p>
                            ))}
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="grid grid-cols-52 gap-1">
                                {[...Array(52).keys()].map((index) => (
                                    <p
                                        key={index}
                                        className="text-sm h-5 w-5 text-center"
                                    >
                                        {index + 1}
                                    </p>
                                ))}
                            </div>
                            <div className="grid grid-cols-52 gap-1">
                                {[...Array(unbornWeeks).keys()].map((index) => (
                                    <UnbornSquare key={index} />
                                ))}

                                {[...Array(pastWeeksBirthYear).keys()].map(
                                    (index) => (
                                        <PastSquare key={index} />
                                    ),
                                )}

                                {[...Array(pastWeeksNoninclusive).keys()].map(
                                    (index) => (
                                        <PastSquare key={index} />
                                    ),
                                )}

                                {[...Array(nonPastWeeks).keys()].map(
                                    (index) => (
                                        <RoundedCheckbox
                                            key={index}
                                            className="w-5 h-5"
                                        />
                                    ),
                                )}

                                {[...Array(unbornWeeks).keys()].map((index) => (
                                    <RoundedCheckbox
                                        key={index}
                                        className="w-5 h-5"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default LifeCalendar;
