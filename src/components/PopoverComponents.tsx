import { CalendarClock, CalendarPlus } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface CalendarPopoverProps {
    calendar:
        | {
              createdAt: string;
              id: string;
              userId: string | null;
              updatedAt: string;
          }
        | null
        | undefined;
}

export const CreatedAtPopover = (calendar: CalendarPopoverProps) => {
    const today = new Date();
    const createdDate = calendar.calendar
        ? today.toISOString().slice(0, 10) ==
          new Date(calendar.calendar.updatedAt).toISOString().slice(0, 10)
            ? new Date(calendar.calendar.updatedAt).toLocaleTimeString("en-US")
            : new Date(calendar.calendar.updatedAt).toLocaleDateString("en-US")
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

export const UpdatedAtPopover = (calendar: CalendarPopoverProps) => {
    const today = new Date();
    const updatedDate = calendar.calendar
        ? today.toISOString().slice(0, 10) ==
          new Date(calendar.calendar.updatedAt).toISOString().slice(0, 10)
            ? new Date(calendar.calendar.updatedAt).toLocaleTimeString("en-US")
            : new Date(calendar.calendar.updatedAt).toLocaleDateString("en-US")
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
