
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
  overrideContentClassName,
}) => {
  const parseTime = (timeStr: string) => {
    if (!timeStr) return { hour: "", minute: "", period: "AM" };
    const [hour24, minute] = timeStr.split(":");
    const hourNum = parseInt(hour24);
    const period = hourNum >= 12 ? "PM" : "AM";
    const hour12 = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
    return {
      hour: hour12.toString(),
      minute,
      period,
    };
  };

  const { hour, minute, period } = parseTime(value);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  const handleTimeChange = (
    newHour: string,
    newMinute: string,
    newPeriod: string
  ) => {
    if (!newHour || !newMinute) return;

    let hour24 = parseInt(newHour);
    if (newPeriod === "PM" && hour24 !== 12) hour24 += 12;
    else if (newPeriod === "AM" && hour24 === 12) hour24 = 0;

    const timeString = `${hour24.toString().padStart(2, "0")}:${newMinute.padStart(2, "0")}`;
    onChange(timeString);
  };

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, "0"));
  const periods = ["AM", "PM"];

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
              <div className="ml-auto flex items-center" onClick={handleClear}>
                <X className="!h-3 !w-3 shrink-0 opacity-50" aria-hidden="true" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className={cn(
            "w-auto p-0 bg-popover border shadow-lg rounded-lg z-50 max-h-72 overflow-y-auto",
            overrideContentClassName
          )}
        >
          <div className="flex min-w-max">
            {/* Hours Column */}
            <div className="flex flex-col bg-card/50">
              <div className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground bg-muted/30 border-b">
                Hours
              </div>
              <div 
                className="h-56 w-20 overflow-y-auto overscroll-contain"
                onWheel={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="p-2 space-y-1">
                  {hours.map((h) => (
                    <div
                      key={h}
                      className={cn(
                        "px-3 py-2.5 cursor-pointer text-xs rounded-md text-center font-medium transition-all duration-200",
                        "hover:bg-accent/80 hover:scale-105 hover:shadow-sm hover:text-accent-foreground",
                        hour === h && "bg-primary text-primary-foreground shadow-md scale-105"
                      )}
                      onClick={() => handleTimeChange(h, minute || "00", period)}
                    >
                      {h.padStart(2, "0")}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Minutes Column */}
            <div className="flex flex-col bg-card/50">
              <div className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground bg-muted/30 border-b">
                Minutes
              </div>
              <div 
                className="h-56 w-20 overflow-y-auto overscroll-contain"
                onWheel={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="p-2 space-y-1">
                  {minutes.map((m) => (
                    <div
                      key={m}
                      className={cn(
                        "px-3 py-2.5 cursor-pointer text-xs rounded-md text-center font-medium transition-all duration-200",
                        "hover:bg-accent/80 hover:scale-105 hover:shadow-sm hover:text-accent-foreground",
                        minute === m && "bg-primary text-primary-foreground shadow-md scale-105"
                      )}
                      onClick={() => handleTimeChange(hour || "12", m, period)}
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AM/PM Column */}
            <div className="flex flex-col bg-card/50">
              <div className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground bg-muted/30 border-b">
                Period
              </div>
              <div 
                className="h-56 w-20 overflow-y-auto overscroll-contain"
                onWheel={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="p-2 space-y-1">
                  {periods.map((p) => (
                    <div
                      key={p}
                      className={cn(
                        "px-3 py-2.5 cursor-pointer text-xs rounded-md text-center font-medium transition-all duration-200",
                        "hover:bg-accent/80 hover:scale-105 hover:shadow-sm hover:text-accent-foreground",
                        period === p && "bg-primary text-primary-foreground shadow-md scale-105"
                      )}
                      onClick={() => handleTimeChange(hour || "12", minute || "00", p)}
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimeRangeFilter;
