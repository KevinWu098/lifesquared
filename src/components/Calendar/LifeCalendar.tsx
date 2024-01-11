"use client";

import { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import RoundedBox from "@/components/Calendar/RoundedBox";
import { WeekSquare } from "@prisma/client";
import { Loader2 } from "lucide-react";

import { LocalStorageData } from "../CreationForm";
import { UpdatedAtPopover } from "../PopoverComponents";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
    getPastWeeksBirthYear,
    getPastWeeksCurrentYear,
    getPastWeeksNoninclusive,
    getUnbornWeeks,
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
    dbBirthday: string | null;
    dbFinalYear: number | null;
    dbWeekSquares: WeekSquare[] | null;
}

const LifeCalendar = ({
    dbBirthday,
    dbFinalYear,
    dbWeekSquares,
}: LifeCalendarProps) => {
    const lsData =
        typeof window !== "undefined" ? localStorage.getItem("lsData") : null;
    const lsDataObject: LocalStorageData | null = lsData
        ? JSON.parse(lsData)
        : null;

    const birthday = dbBirthday ?? lsDataObject?.birthday ?? null;
    const finalYear = dbFinalYear ?? Number(lsDataObject?.finalYear) ?? null;

    if (!birthday || !finalYear) {
        return null;
    }

    const user = trpc.getUser.useQuery();
    const calendar = user.data?.calendar;

    const unbornWeeks = getUnbornWeeks(birthday);
    const pastWeeksBirthYear = getPastWeeksBirthYear(
        birthday,
        calendar?.createdAt,
    );
    const pastWeeksNoninclusive = getPastWeeksNoninclusive(
        birthday,
        finalYear,
        calendar?.createdAt,
    );
    const pastWeeksCurrentOrFinalYear = getPastWeeksCurrentYear(
        birthday,
        finalYear,
    );

    const pastWeeks = Math.max(
        pastWeeksBirthYear +
            pastWeeksNoninclusive +
            pastWeeksCurrentOrFinalYear,
        0,
    );
    const futureWeeks = Math.max(finalYear * 52 - pastWeeks, 0);

    const falseArray = Array.from({ length: futureWeeks }, () => false);
    const weekSquares = dbWeekSquares
        ? dbWeekSquares.map((weekSquare) => weekSquare.value)
        : lsDataObject?.weekSquares ?? falseArray;

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
        if (user.data) {
            saveCalendar({
                calendar: checkboxValues,
            });
        }

        const newLsObjectData: LocalStorageData = {
            birthday: birthday,
            finalYear: finalYear.toString(),
            weekSquares: checkboxValues,
            createdAt: lsDataObject?.createdAt ?? new Date(),
            updatedAt: new Date(),
        };
        localStorage.setItem("lsData", JSON.stringify(newLsObjectData));
    };

    return (
        <>
            <Separator className="my-2" />

            <div className="py-2 px-8 flex flex-col">
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

                        <UpdatedAtPopover
                            time={
                                calendar?.updatedAt ??
                                lsDataObject?.updatedAt.toString()
                            }
                        />
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

                <div className="py-4 gap-x-2 flex flex-col ml-auto">
                    <div className="flex-center text-center w-fit flex-col">
                        <p className="w-fit text-xl font-semibold leading-[1rem]">
                            NOW
                        </p>
                        <p className="w-fit text-lg font-normal leading-[2rem]">
                            YOU'RE
                        </p>
                        <p className="w-fit font-bold text-5xl leading-[1.5rem]">
                            {finalYear}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LifeCalendar;
