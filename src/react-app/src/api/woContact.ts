
import { suiteletUrl } from '@/lib/constants';

export interface WOContact {
  id: string;
  workorder: {
    text: string;
    value: string;
  };
  events: string[];
  event: string;
  contact: {
    text: string;
    value: string;
  };
  name: string;
  email: string;
  jobTitle: string;
  mobilePhone: string;
  phone: string;
  primary: boolean;
  url: string;
}

// Mockup data for local development
const mockWOContacts: WOContact[] = [
  {
    id: '1',
    workorder: {
      text: 'WO-001',
      value: '1'
    },
    events: ['event1', 'event2'],
    event: 'event1',
    contact: {
      text: 'John Smith',
      value: '1'
    },
    name: 'John Smith',
    email: 'john.smith@company.com',
    jobTitle: 'Project Manager',
    mobilePhone: '+1-555-0123',
    phone: '+1-555-0124',
    primary: true,
    url: '/contact/1'
  },
  {
    id: '2',
    workorder: {
      text: 'WO-002',
      value: '2'
    },
    events: ['event2'],
    event: 'event2',
    contact: {
      text: 'Sarah Johnson',
      value: '2'
    },
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    jobTitle: 'Site Supervisor',
    mobilePhone: '+1-555-0125',
    phone: '+1-555-0126',
    primary: false,
    url: '/contact/2'
  },
  {
    id: '3',
    workorder: {
      text: 'WO-003',
      value: '3'
    },
    events: ['event3', 'event4'],
    event: 'event3',
    contact: {
      text: 'Mike Brown',
      value: '3'
    },
    name: 'Mike Brown',
    email: 'mike.brown@contractor.com',
    jobTitle: 'Lead Electrician',
    mobilePhone: '+1-555-0127',
    phone: '+1-555-0128',
    primary: true,
    url: '/contact/3'
  }
];

export const fetchWOContacts = async (): Promise<WOContact[]> => {
  // Check if running locally (development environment)
  if (suiteletUrl.includes('api.example.com')) {
    console.log('WOContact: Using mockup data for local development');
    return mockWOContacts;
  }

  try {
    console.log('WOContact: Starting to fetch work order contacts');
    
    let allData: WOContact[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&action=getWorkOrderContacts&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`WOContact service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch work order contacts chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`WOContact service RESULT chunk ${i + 1}:`, chunkData);
      
      if (!chunkData || chunkData.length === 0) {
        hasMoreData = false;
      } else {
        allData = [...allData, ...chunkData];

        if (chunkData.length < chunkSize) {
          hasMoreData = false;
        }
      }
      
      i++;
    }
    
    console.log(`Finished chunked fetch. Total work order contact records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no work order contact data across all chunks");
      throw new Error("No work order contact data returned from API");
    }

    return allData;

  } catch (error) {
    console.error('WOContact: Error fetching work order contacts:', error);
    throw error;
  }
};
