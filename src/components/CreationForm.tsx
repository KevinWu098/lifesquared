"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/app/_trpc/client";

const birthdayRegex = /^\d{2}\/\d{2}\/\d{4}$/;

const isDateValid = (dateStr: string) => {
    if (!dateStr.match(birthdayRegex)) {
        return false;
    }

    const parts = dateStr.split("/");
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(month) || isNaN(day) || isNaN(year)) {
        return false;
    }

    const dateObject = new Date(year, month - 1, day);
    if (
        dateObject.getMonth() !== month - 1 ||
        dateObject.getDate() !== day ||
        dateObject.getFullYear() !== year
    ) {
        return false;
    }

    return true;
};

const FormSchema = z.object({
    birthday: z.string().refine((data) => isDateValid(data), {
        message: "Invalid birthday format or date. Please use mm/dd/yyyy.",
    }),
    finalYear: z.string().refine(
        (data) => {
            const parsedNumber = parseInt(data, 10);
            return true;
            return (
                !isNaN(parsedNumber) &&
                parsedNumber >= 80 &&
                parsedNumber <= 100
            );
        },
        {
            message: "Final year must be between 80 and 100 (inclusive)",
        },
    ),
});

interface CreationFormProps {
    setBirthday: Dispatch<SetStateAction<string | null>>;
    setFinalYear: Dispatch<SetStateAction<number | null>>;
    birthday: string | null;
    finalYear: number | null;
}

const CreationForm = ({
    setBirthday,
    setFinalYear,
    birthday,
    finalYear,
}: CreationFormProps) => {
    const { toast } = useToast();

    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            birthday: birthday ?? undefined,
            finalYear: finalYear?.toString() ?? "90",
        },
    });

    const { mutate: updateUser } = trpc.updateUser.useMutation({
        onSuccess: () => {
            setIsUpdating(false);
        },
        onMutate() {
            setIsUpdating(true);
        },
        onSettled() {
            setIsUpdating(false);
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const { birthday: newBirthday, finalYear: newFinalYear } = data;

        setBirthday(newBirthday);
        setFinalYear(parseInt(newFinalYear));

        updateUser({
            birthday: newBirthday,
            finalYear: parseInt(newFinalYear),
        });

        toast({
            title: "You submitted the following values:",
            description: (
                <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-white flex flex-col gap-y-1">
                    <span>Birthday: {newBirthday}</span>
                    <span>Final Year: {newFinalYear}</span>
                </div>
            ),
        });
    }

    const handleSave = () => {};

    return (
        <Card className="w-100 border-2">
            <CardHeader className="flex flex-row justify-between">
                <div>
                    <CardTitle>Get Started</CardTitle>
                    <CardDescription>Life, piece by piece.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4 px-6 pb-6">
                            <FormField
                                control={form.control}
                                name="birthday"
                                render={({ field }) => (
                                    <FormItem className="mt-0 space-y-1.5">
                                        <FormLabel>Birthday</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="mm/dd/yyyy"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="finalYear"
                                render={({ field }) => (
                                    <FormItem className="mt-0 space-y-1.5">
                                        <FormLabel>Final Year</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="90"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="px-6 pb-6 flex justify-between">
                            <Button
                                variant={"outline"}
                                className={cn(
                                    birthday && finalYear
                                        ? "flex"
                                        : "invisible",
                                )}
                                onClick={handleSave}
                            >
                                {isSaving ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    "Save Calendar"
                                )}
                            </Button>

                            <Button type="submit">
                                {isUpdating ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    "Create"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default CreationForm;
