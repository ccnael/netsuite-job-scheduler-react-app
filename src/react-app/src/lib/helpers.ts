
import { format, parse } from "date-fns";
// Helper functions for fetching and parsing data

// API endpoint - get from hidden input or fallback to example URL
export const getSuiteletUrl = (): string => {
  const suiteletUrlInput = document.getElementById('suiteletUrl') as HTMLInputElement;
  return suiteletUrlInput?.value ? `https://${document.domain}${decodeURIComponent(suiteletUrlInput.value)}` : "https://api.example.com/endpoint";
};

export const isLocalDevelopment = (): boolean => {
  return import.meta.env.DEV || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
};

export const generateTimeOptions = () => {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      times.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }
  }
  return times;
}

export const formatTimeDisplay = (time24: string) => {
  if (!time24) return "-- : -- --";
  return format(parse(time24, 'HH:mm', new Date()), 'h:mm a').toLowerCase();
};

export function addCommas(num: { toString: () => string; }) {
  return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
}