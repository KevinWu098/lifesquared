"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface RoundedBoxProps {
    className: string;
}

const RoundedBox = ({ className }: RoundedBoxProps) => {
    return (
        <div
            className={cn(
                "h-4 w-4 rounded-xs border border-primary data-[state=checked]:bg-zinc-600 text-zinc-600",
                className,
            )}
        />
    );
};

export default RoundedBox;
