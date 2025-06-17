
import { suiteletUrl } from '@/lib/constants';

export interface WOAddress {
  id: string;
  workorder: {
    text: string;
    value: string;
  };
  customer: {
    text: string;
    value: string;
  };
  events: string[];
  address: {
    text: string;
    value: string;
  };
  addressDetails: string;
  customerUrl: string;
}

// Mockup data for local development
const mockWOAddresses: WOAddress[] = [
  {
    id: '1',
    workorder: {
      text: 'WO-001',
      value: '1'
    },
    customer: {
      text: 'ABC Construction Corp',
      value: '1'
    },
    events: ['event1', 'event2'],
    address: {
      text: '123 Main Street, Downtown District',
      value: '1'
    },
    addressDetails: '123 Main Street<br/>Suite 100<br/>Downtown District<br/>New York, NY 10001',
    customerUrl: '/customer/1'
  },
  {
    id: '2',
    workorder: {
      text: 'WO-002',
      value: '2'
    },
    customer: {
      text: 'XYZ Development LLC',
      value: '2'
    },
    events: ['event2'],
    address: {
      text: '456 Oak Avenue, Industrial Park',
      value: '2'
    },
    addressDetails: '456 Oak Avenue<br/>Building B<br/>Industrial Park<br/>Los Angeles, CA 90210',
    customerUrl: '/customer/2'
  },
  {
    id: '3',
    workorder: {
      text: 'WO-003',
      value: '3'
    },
    customer: {
      text: 'Metro Infrastructure Inc',
      value: '3'
    },
    events: ['event3', 'event4'],
    address: {
      text: '789 Pine Road, Commercial Zone',
      value: '3'
    },
    addressDetails: '789 Pine Road<br/>Floor 5<br/>Commercial Zone<br/>Chicago, IL 60601',
    customerUrl: '/customer/3'
  }
];

export const fetchWOAddresses = async (): Promise<WOAddress[]> => {
  // Check if running locally (development environment)
  if (suiteletUrl.includes('api.example.com')) {
    console.log('WOAddress: Using mockup data for local development');
    return mockWOAddresses;
  }

  try {
    console.log('WOAddress: Starting to fetch work order addresses');
    
    let allData: WOAddress[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&action=getWorkOrderAddresses&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`WOAddress service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch work order addresses chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`WOAddress service RESULT chunk ${i + 1}:`, chunkData);
      
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
    
    console.log(`Finished chunked fetch. Total work order address records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no work order address data across all chunks");
      throw new Error("No work order address data returned from API");
    }

    return allData;

  } catch (error) {
    console.error('WOAddress: Error fetching work order addresses:', error);
    throw error;
  }
};
