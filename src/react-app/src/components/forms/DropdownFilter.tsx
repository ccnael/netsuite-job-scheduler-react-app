
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DropdownOption, FetchOptionsFunction } from "./types";
import { useDropdownFetch } from "./useDropdownFetch";
import DropdownFilterContent from "./DropdownFilterContent";

interface DropdownFilterProps {
  id: string;
  label: string;
  options: DropdownOption[];
  text?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  dependentFilter?: string;
  fetchOptionsOnOpen?: FetchOptionsFunction;
  alwaysRefetch?: boolean;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  id,
  label,
  options,
  text,
  value,
  onChange,
  placeholder = "Select option",
  disabled = false,
  dependentFilter,
  fetchOptionsOnOpen,
  alwaysRefetch = false,
}) => {
  const [open, setOpen] = useState(false);
  
  const {
    localOptions,
    isLoading,
    handleOpenChange,
    resetLocalOptions
  } = useDropdownFetch({ 
    options: options || [], 
    fetchOptionsOnOpen,
    alwaysRefetch
  });

  // console.log('DropdownFilter options:', localOptions);
  // console.log('DropdownFilter value:', value);
  
  // Find the selected option - check both localOptions and provided options
  let selectedOption = localOptions.find((opt) => opt.value === value);
  if (!selectedOption && value) {
    selectedOption = options.find((opt) => opt.value === value);
  }
  
  // console.log('DropdownFilter selectedOption:', selectedOption);
  
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };
  
  const onOpenChange = async (isOpen: boolean) => {
    setOpen(isOpen);
    
    await handleOpenChange(isOpen);
  };

  // Get display text for the selected value
  const getDisplayText = () => {
    if (!value) {
      return <span className="text-muted-foreground">{placeholder}</span>;
    }

    if (id === 'routingGroup' && !selectedOption) {
      return text;
    }
    
    if (selectedOption) {
      return typeof selectedOption.text === 'string' ? selectedOption.text : selectedOption.text;
    }
    
    // If we have a value but no matching option, try to show the value as fallback
    return <span className="text-foreground">{value}</span>;
  };

  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="text-[12px] tracking-tight">
        {label}
      </Label>
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-7 text-[12px] font-normal hover:bg-accent/50"
            disabled={disabled}
            type="button"
          >
            {getDisplayText()}
            {isLoading ? (
              <Loader2 className="ml-auto h-4 w-4 animate-spin" />
            ) : value ? (
              <div 
                className="ml-auto flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear(e);
                }}
              >
                <X className="!h-3 !w-3 shrink-0 opacity-50" aria-hidden="true" />
              </div>
            ) : (
              <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[--radix-popover-trigger-width] p-0 animate-fade-in rounded-md border border-input shadow-md overflow-hidden z-50" 
          align="start"
          sideOffset={8}
        >
          <DropdownFilterContent 
            options={localOptions}
            value={value}
            onSelect={onChange}
            isLoading={isLoading}
            onClose={() => setOpen(false)}
          />
        </PopoverContent>
      </Popover>
      {dependentFilter && (
        <div className="text-xs text-muted-foreground mt-1">
          Filters available {dependentFilter}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
