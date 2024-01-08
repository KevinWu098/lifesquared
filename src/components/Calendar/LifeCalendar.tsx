"use client";

import { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import RoundedBox from "@/components/Calendar/RoundedBox";
import { WeekSquare } from "@prisma/client";
import { Loader2 } from "lucide-react";

import { UpdatedAtPopover } from "../PopoverComponents";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
    getNonPastWeeks,
    getPastWeeksInBirthYear,
    getPastWeeksNoninclusive,
    getWeeksFromStartOfYear,
} from "./CalendarUtils";
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

interface LifeCalendarProps {
    birthday: string | null;
    finalYear: number | null;
    dbWeekSquares: WeekSquare[] | null;
}

const LifeCalendar = ({
    birthday,
    finalYear,
    dbWeekSquares,
}: LifeCalendarProps) => {
    if (!birthday || !finalYear) {
        return null;
    }

    const calendar = trpc.getUser.useQuery().data?.calendar;

    const unbornWeeks = getWeeksFromStartOfYear(birthday);
    const pastWeeksBirthYear = getPastWeeksInBirthYear(birthday); // use created at
    const pastWeeksNoninclusive = getPastWeeksNoninclusive(birthday);
    const pastWeeksCurrentYear =
        getWeeksFromStartOfYear(new Date().toString()) - 1; // Don't include current week
    const pastWeeks =
        pastWeeksBirthYear + pastWeeksNoninclusive + pastWeeksCurrentYear;
    const nonPastWeeks = finalYear * 52 - unbornWeeks - pastWeeks;
    const futureWeeks = unbornWeeks + nonPastWeeks;

    const falseArray = Array.from({ length: futureWeeks }, () => false);
    const weekSquares = dbWeekSquares
        ? dbWeekSquares.map((weekSquare) => weekSquare.value)
        : falseArray;

    const [isSaving, setIsSaving] = useState(false);
    const [checkboxValues, setCheckboxValues] =
        useState<boolean[]>(weekSquares);

    const handleCheckboxChange = (index: number) => {
        const newValues = [...checkboxValues];

        newValues[index] = !newValues[index];

        setCheckboxValues(newValues);
    };

    const { mutate: saveCalendar } = trpc.saveCalendar.useMutation({
        onSuccess: () => {
            setIsSaving(false);
        },
        onMutate() {
            setIsSaving(true);
        },
        onSettled() {
            setIsSaving(false);
        },
    });

    const handleSave = () => {
        saveCalendar({
            calendar: checkboxValues,
        });
    };

    return (
        <>
            <Separator className="my-2 border-2" />

            <div className="border-2 py-2 px-8 flex flex-col">
                <div className="py-4 flex flex-row justify-between">
                    <div className="flex-center gap-x-4 w-[165px]">
                        <Button
                            onClick={handleSave}
                            variant={"secondary"}
                            className="w-full"
                        >
                            {isSaving ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Save Calendar"
                            )}
                        </Button>

                        <UpdatedAtPopover calendar={calendar} />
                    </div>
                    <h2 className="text-4xl font-bold text-center">
                        Life Calendar
                    </h2>
                    <Button className="invisible w-[165px]">
                        Toggle Button
                    </Button>
                </div>

                <div className="flex flex-row justify-between">
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

                            {[...Array(pastWeeks).keys()].map((index) => (
                                <PastSquare key={index} />
                            ))}

                            {[...Array(futureWeeks).keys()].map((index) => (
                                <RoundedCheckbox
                                    key={index}
                                    className="w-5 h-5"
                                    checked={checkboxValues[index]}
                                    onClick={() => handleCheckboxChange(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <h2 className="text-center py-4 gap-x-2 flex-center flex-row">
                    <span>
                        <span className="text-2xl tracking-tight font-normal leading-3">
                            Now
                        </span>
                        <br />
                        <span className="text-lg font-normal leading-[0.25rem]">
                            you're
                        </span>
                    </span>
                    <span className="font-bold text-5xl">{finalYear}</span>
                </h2>
            </div>
        </>
    );
};

export default LifeCalendar;
