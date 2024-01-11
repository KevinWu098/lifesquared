import { CalendarClock, CalendarPlus } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface PopoverProps {
    time: string | undefined;
}

export const CreatedAtPopover = ({ time }: PopoverProps) => {
    const today = new Date();
    const createdDate = time
        ? today.toISOString().slice(0, 10) ==
          new Date(time).toISOString().slice(0, 10)
            ? new Date(time).toLocaleTimeString("en-US")
            : new Date(time).toLocaleDateString("en-US")
        : null;

    return (
        <Popover>
            <PopoverTrigger aria-label="Created At">
                <CalendarPlus className="h-5 w-5" />
            </PopoverTrigger>
            <PopoverContent className="w-fit text-neutral-600">
                <p className="text-sm">Created: {createdDate ?? "N/A"}</p>
            </PopoverContent>
        </Popover>
    );
};

export const UpdatedAtPopover = ({ time }: PopoverProps) => {
    const today = new Date();
    const updatedDate = time
        ? today.toISOString().slice(0, 10) ==
          new Date(time).toISOString().slice(0, 10)
            ? new Date(time).toLocaleTimeString("en-US")
            : new Date(time).toLocaleDateString("en-US")
        : null;

    return (
        <Popover>
            <PopoverTrigger aria-label="Updated At">
                <CalendarClock className="h-5 w-5" />
            </PopoverTrigger>
            <PopoverContent className="w-fit text-neutral-600">
                <p className="text-sm">Saved: {updatedDate ?? "N/A"}</p>
            </PopoverContent>
        </Popover>
    );
};
