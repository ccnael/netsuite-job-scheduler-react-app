import { getSuiteletUrl } from './helpers';
import { DropdownOption } from '../components/forms/fields/DropdownFilter';

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

export const eventStatuses = [
  {
    value: 'Tentative',
    label: 'Tentative'
  },
  {
    value: 'Confirmed',
    label: 'Confirmed'
  },
  {
    value: 'Completed',
    label: 'Completed'
  }
];

export const eventPriorities = [
  {
    value: 'Low',
    label: 'Low'
  },
  {
    value: 'Medium',
    label: 'Medium'
  },
  {
    value: 'High',
    label: 'High'
  },
  {
    value: 'Urgent',
    label: 'Urgent'
  }
];

export const eventTypes = [
  {
    value: 'General Event',
    label: 'General Event'
  },
  {
    value: 'Non General Event',
    label: 'Non General Event'
  },
  {
    value: 'Unassigned Event',
    label: 'Unassigned Event'
  }
];

export const receiptStatuses = [
  { value: 'Not Received', label: 'Not Received' },
  { value: 'Partially Received', label: 'Partially Received' },
  { value: 'Fully Received', label: 'Fully Received' }
];