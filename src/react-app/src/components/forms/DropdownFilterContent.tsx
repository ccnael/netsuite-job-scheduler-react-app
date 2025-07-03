
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
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

  const filteredOptions = options.filter(option => {
    const textToSearch = typeof option.text === 'string' ? option.text : '';
    return textToSearch.toLowerCase().includes(searchTerm.toLowerCase());
  });

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

  // Calculate dynamic height based on number of options (max 8 items visible)
  const maxVisibleItems = 8;
  const itemHeight = 32; // approximate height per item
  const maxHeight = Math.min(filteredOptions.length, maxVisibleItems) * itemHeight;

  return (
    <div className="w-full">
      {/* Search bar */}
      <div className="flex items-center border-b px-3 py-2">
        <Search className="mr-2 h-4 w-4 text-[12px] shrink-0 opacity-50" />
        <Input
          placeholder="Search options..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-6 border-0 p-0 text-[12px] placeholder:text-muted-foreground placeholder:text-[12px] focus-visible:ring-0"
        />
      </div>

      {/* Scrollable area with dynamic height and proper mouse wheel support */}
      <div 
        className="overflow-y-auto overscroll-contain"
        style={{ 
          maxHeight: `${maxHeight}px`,
          minHeight: filteredOptions.length > 0 ? '32px' : '64px'
        }}
        onWheel={(e) => {
          // Ensure mouse wheel events are handled properly
          e.stopPropagation();
        }}
      >
        <div className="p-1">
          {filteredOptions.length === 0 ? (
            <div className="p-4 text-center text-[12px] text-muted-foreground">
              No options found
            </div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-[12px] outline-none ${
                  option.value === 'CREATE_NEW'
                    ? 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                    : `hover:bg-accent hover:text-accent-foreground ${
                        value === option.value ? 'bg-accent text-accent-foreground' : ''
                      }`
                }`}
              >
                {typeof option.text === 'string' ? option.text : option.text}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownFilterContent;
