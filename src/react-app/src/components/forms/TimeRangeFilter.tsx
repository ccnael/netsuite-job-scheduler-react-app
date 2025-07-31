
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import * as helper from "@/lib/helpers";

interface TimeRangeFilterProps {
  id: string;
  label: string;
  value: string;
  onChange: (time: string) => void;
  isRequired?: boolean;
  disabled?: boolean;
  overrideLabelClassName?: string;
  overrideFieldClassName?: string;
  overrideContentClassName?: string;
}

const TimeRangeFilter: React.FC<TimeRangeFilterProps> = ({
  id,
  label,
  value,
  onChange,
  isRequired,
  disabled = false,
  overrideLabelClassName,
  overrideFieldClassName,
  overrideContentClassName
}) => {
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  const timeOptions = helper.generateTimeOptions();

  return (
    <div className="space-y-1">
      <Label htmlFor={id} className={overrideLabelClassName || "!text-[12px]"}>
        {label}
        {isRequired && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            disabled={disabled}
            className={overrideFieldClassName || cn(
              "w-full justify-start text-left font-normal h-7 text-[12px] tracking-tight",
              !value && "text-muted-foreground"
            )}
          >
            <Clock className="mr-2 h-3 w-3" />
            {value ? helper.formatTimeDisplay(value) : "Select time"}
            {value && (
              <div 
                className="ml-auto flex items-center"
                onClick={handleClear}
              >
                <X className="!h-3 !w-3 shrink-0 opacity-50" aria-hidden="true" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="popover-content w-auto p-0" align="start">
          <ScrollArea className="h-48 w-32" style={{ overflow: 'auto' }}>
            <div className="p-1" style={{ height: 'auto' }}>
              {timeOptions.map((time) => (
                <div
                  key={time}
                  className={overrideContentClassName ? overrideContentClassName + (value === time ? " bg-primary text-primary-foreground" : "") : cn(
                    "px-3 py-2 hover:bg-accent cursor-pointer text-[12px] rounded-sm transition-colors",
                    value === time && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => onChange(time)}
                  onWheel={(e) => {
                    // Allow wheel scrolling to propagate to ScrollArea
                    e.stopPropagation();
                  }}
                >
                  {helper.formatTimeDisplay(time)}
                </div>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimeRangeFilter;
