
import { useState, useCallback } from 'react';
import { DropdownOption, FetchOptionsFunction } from './types';

interface UseDropdownFetchProps {
  options: DropdownOption[];
  fetchOptionsOnOpen?: FetchOptionsFunction;
  alwaysRefetch?: boolean;
}

export const useDropdownFetch = ({
  options,
  fetchOptionsOnOpen,
  alwaysRefetch = false
}: UseDropdownFetchProps) => {
  const [localOptions, setLocalOptions] = useState<DropdownOption[]>(options);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const handleOpenChange = useCallback(async (isOpen: boolean) => {
    if (isOpen && fetchOptionsOnOpen && (alwaysRefetch || !hasFetched)) {
      setIsLoading(true);
      try {
        const fetchedOptions = await fetchOptionsOnOpen();
        setLocalOptions(fetchedOptions);
        setHasFetched(true);
      } catch (error) {
        console.error('Error fetching options:', error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [fetchOptionsOnOpen, alwaysRefetch, hasFetched]);

  const resetLocalOptions = useCallback(() => {
    setLocalOptions(options);
    setHasFetched(false);
  }, [options]);

  return {
    localOptions,
    isLoading,
    handleOpenChange,
    resetLocalOptions
  };
};
