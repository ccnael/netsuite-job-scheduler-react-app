
// Helper functions for fetching and parsing data

// API endpoint - get from hidden input or fallback to example URL
export const getSuiteletUrl = (): string => {
  const suiteletUrlInput = document.getElementById('suiteletUrl') as HTMLInputElement;
  return suiteletUrlInput?.value ? `https://${document.domain}${decodeURIComponent(suiteletUrlInput.value)}` : "https://api.example.com/endpoint";
};