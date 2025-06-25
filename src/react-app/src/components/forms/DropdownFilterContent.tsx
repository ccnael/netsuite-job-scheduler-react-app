
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Loader2 } from 'lucide-react';
import { DropdownOption } from './types';

interface DropdownFilterContentProps {
  options: DropdownOption[];
  value: string;
  onSelect: (value: string) => void;
  isLoading: boolean;
  onClose: () => void;
}

const DropdownFilterContent: React.FC<DropdownFilterContentProps> = ({
  options,
  value,
  onSelect,
  isLoading,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter(option =>
    option.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (optionValue: string) => {
    onSelect(optionValue);
    onClose();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="ml-2 text-[12px] text-muted-foreground">Loading...</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center border-b px-3 py-2">
        <Search className="mr-2 h-4 w-4 text-[12px] tracking-tight shrink-0 opacity-50" />
        <Input
          placeholder="Search options..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-4 border-0 p-0 !text-[12px] leading-none placeholder:text-muted-foreground placeholder:!text-[12px] focus-visible:ring-0"
        />
      </div>
      <ScrollArea className="max-h-60">
        {filteredOptions.length === 0 ? (
          <div className="p-4 text-center text-[12px] text-muted-foreground">
            No options found
          </div>
        ) : (
          <div className="p-1">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-[12px] outline-none hover:bg-accent hover:text-accent-foreground ${
                  value === option.value ? 'bg-accent text-accent-foreground' : ''
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.text}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default DropdownFilterContent;
