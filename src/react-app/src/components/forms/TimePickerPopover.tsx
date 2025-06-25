
import React from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from 'lucide-react';
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";

interface TimePickerPopoverProps {
  value: string;
  onChange: (time: string) => void;
  disabled?: boolean;
  className?: string;
}

export const TimePickerPopover: React.FC<TimePickerPopoverProps> = ({
  value,
  onChange,
  disabled = false,
  className
}) => {
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const formatTimeDisplay = (time24: string) => {
    return format(parse(time24, 'HH:mm', new Date()), 'h:mm a').toLowerCase();
  };

  const timeOptions = generateTimeOptions();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn("h-8 px-2 text-[14px] justify-start text-left font-normal w-full", disabled && "opacity-50", className)}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value ? formatTimeDisplay(value) : <span>Pick a time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <ScrollArea className="h-48 w-32">
          <div className="p-1">
            {timeOptions.map((time) => (
              <div
                key={time}
                className={cn(
                  "px-3 py-2 hover:bg-gray-100 cursor-pointer text-[14px] rounded-sm transition-colors",
                  value === time && "bg-blue-100 text-blue-900"
                )}
                onClick={() => onChange(time)}
              >
                {formatTimeDisplay(time)}
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
