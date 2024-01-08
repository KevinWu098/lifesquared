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
    const createdDate = calendar.calendar
        ? new Date(calendar.calendar.createdAt).toLocaleDateString("en-US")
        : "N/A";

    return (
        <Popover>
            <PopoverTrigger aria-label="definition">
                <CalendarPlus className="h-5 w-5" />
            </PopoverTrigger>
            <PopoverContent className="w-fit text-neutral-600">
                <p className="text-sm">Created: {createdDate}</p>
            </PopoverContent>
        </Popover>
    );
};

export const UpdatedAtPopover = (calendar: CalendarPopoverProps) => {
    const updatedDate = calendar.calendar
        ? new Date(calendar.calendar.updatedAt).toLocaleDateString("en-US")
        : "N/A";

    return (
        <Popover>
            <PopoverTrigger aria-label="definition">
                <CalendarClock className="h-5 w-5" />
            </PopoverTrigger>
            <PopoverContent className="w-fit text-neutral-600">
                <p className="text-sm">Saved: {updatedDate}</p>
            </PopoverContent>
        </Popover>
    );
};
