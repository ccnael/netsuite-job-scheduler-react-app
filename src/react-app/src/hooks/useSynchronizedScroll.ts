
import { useEffect } from 'react';

export const useSynchronizedScroll = () => {
  useEffect(() => {
    // No longer needed - resources and calendar are in unified ScrollArea
    // This hook is kept for backward compatibility but does nothing
    console.log('Synchronized scroll: Resources and calendar are now in unified ScrollArea');
  }, []);
};
