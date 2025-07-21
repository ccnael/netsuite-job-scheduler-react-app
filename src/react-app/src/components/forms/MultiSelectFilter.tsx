import React from "react";
import { Label } from "@/components/ui/label";
import { MultiSelect, Option } from "@/components/ui-custom/MultiSelect";
import { useMultiSelectFetch } from "./hooks/useMultiSelectFetch";

interface MultiSelectFilterProps {
  id: string;
  label: string;
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  maxDisplay?: number;
  fetchOptionsOnOpen?: () => Promise<Option[]>;
  className?: string;
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  id,
  label,
  options: initialOptions,
  selected,
  onChange,
  placeholder,
  maxDisplay,
  fetchOptionsOnOpen,
  className,
}) => {
  const {
    options,
    isLoading,
    handleFetchOptions
  } = useMultiSelectFetch({
    initialOptions,
    fetchOptionsOnOpen
  });

  return (
    <div className="filter-section">
      <Label htmlFor={id} className="!text-[12px] tracking-tight">
        {label}
      </Label>
      <MultiSelect
        id={id}
        options={options}
        selected={selected}
        onChange={onChange}
        placeholder={placeholder}
        maxDisplay={maxDisplay}
        className="h-8 cursor-pointer"
        isLoading={isLoading}
        onOpen={handleFetchOptions}
      />
    </div>
  );
};

export default MultiSelectFilter;