import { getSuiteletUrl } from './helpers';
import { DropdownOption } from '../components/forms/types';

export const suiteletUrl = getSuiteletUrl();

// Options for dropdown filters
export const priorityOptions: DropdownOption[] = [
  { value: '1', text: 'Low' },
  { value: '2', text: 'Mid' },
  { value: '3', text: 'High' },
  { value: '4', text: 'Urgent' }
]

export const statusOptions: DropdownOption[] = [
  { value: 'TENTATIVE', text: 'Tentative' },
  { value: 'CONFIRMED', text: 'Confirmed' },
  { value: 'COMPLETED', text: 'Completed' }
];