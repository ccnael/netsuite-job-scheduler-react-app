import { useState, useCallback } from 'react';

interface Option {
  label: string;
  value: string;
}

interface UseMultiSelectFetchProps {
  initialOptions: Option[];
  fetchOptionsOnOpen?: () => Promise<Option[]>;
}

export const useMultiSelectFetch = ({
  initialOptions,
  fetchOptionsOnOpen
}: UseMultiSelectFetchProps) => {
  const [options, setOptions] = useState<Option[]>(initialOptions);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const handleFetchOptions = useCallback(async () => {
    if (!fetchOptionsOnOpen || hasFetched) return;

    setIsLoading(true);
    try {
      const fetchedOptions = await fetchOptionsOnOpen();
      setOptions(fetchedOptions);
      setHasFetched(true);
    } catch (error) {
      console.error('Error fetching options:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchOptionsOnOpen, hasFetched]);

  return {
    options,
    isLoading,
    handleFetchOptions
  };
};