import React from "react";

import { SquaredCheckbox } from "@/components/ui/rounded-checkbox";
import { Separator } from "@/components/ui/separator";

const UnbornCheckbox = () => {
    return (
        <SquaredCheckbox
            className="w-5 h-5 pattern-diagonal-lines pattern-black pattern-bg-white
  pattern-size-1 pattern-opacity-50"
            disabled={true}
        />
    );
};

const PastCheckbox = () => {
    return <SquaredCheckbox className="w-5 h-5 bg-zinc-300" disabled={true} />;
};

interface LifeCalendarProps {
    birthday: string;
    finalYear: number;
}

function getWeeksFromStartOfYear(date: Date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const timeDifference = date.getTime() - startOfYear.getTime();
    const weeks = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7));

    return weeks;
}

function getWeeksFromToday(date: Date) {
    const timeDifference = new Date().getTime() - date.getTime();
    const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));

    return weeks;
}

// function getDaysFromToday(date: Date) {
//   const timeDifference = new Date().getTime() - date.getTime();
//   const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

//   return weeks;
// }

const LifeCalendar = ({ birthday, finalYear }: LifeCalendarProps) => {
    const yearDifference =
        new Date().getFullYear() - new Date(birthday).getFullYear();

    const unbornWeeks = birthday
        ? getWeeksFromStartOfYear(new Date(birthday))
        : 0;

    const pastWeeks = birthday ? getWeeksFromToday(new Date(birthday)) : 0;
    const normalizedPastWeeks = pastWeeks - Math.ceil(yearDifference / 7);

    return (
        <>
            {birthday && finalYear ? (
                <>
                    <Separator className="my-2" />

                    <div className="border-2 p-2 flex flex-col">
                        <h2 className="text-4xl font-bold text-center py-2">
                            Life Calendar
                        </h2>

                        <div className="flex flex-row">
                            <div className="grid grid-rows-53 gap-1 text-sm">
                                <p className="mr-4 flex h-fit invisible">
                                    0000
                                </p>
                                {[...Array(finalYear).keys()].map((index) => (
                                    <p key={index} className="mr-4 h-fit flex">
                                        {parseInt(birthday.split("/")[2]!) +
                                            index}
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
                                    {[...Array(unbornWeeks).keys()].map(
                                        (index) => (
                                            <UnbornCheckbox key={index} />
                                        )
                                    )}

                                    {[...Array(normalizedPastWeeks).keys()].map(
                                        (index) => (
                                            <PastCheckbox key={index} />
                                        )
                                    )}

                                    {[
                                        ...Array(
                                            finalYear * 52 -
                                                unbornWeeks -
                                                normalizedPastWeeks
                                        ).keys(),
                                    ].map((index) => (
                                        <SquaredCheckbox
                                            key={index}
                                            className="w-5 h-5"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default LifeCalendar;
