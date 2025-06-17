
import { suiteletUrl } from '@/lib/constants';

export interface WOItem {
  id: string;
  workorder: {
    text: string;
    value: string;
  };
  salesorder: {
    text: string;
    value: string;
  };
  event: string;
  uuid: string;
  line: string;
  item: {
    text: string;
    value: string;
  };
  description: string;
  quantity: number;
  availableQty: number;
  note: string;
  quantityReceived: number;
  completedQty: number;
}

// Mockup data for local development
const mockWOItems: WOItem[] = [
  {
    id: '1',
    workorder: {
      text: 'WO-001',
      value: '1'
    },
    salesorder: {
      text: 'SO-001',
      value: '1'
    },
    event: 'event1',
    uuid: 'uuid-001',
    line: '1',
    item: {
      text: 'Steel Beam 10ft',
      value: '1'
    },
    description: 'High-grade steel beam for structural support',
    quantity: 5,
    availableQty: 5,
    note: 'Handle with care',
    quantityReceived: 3,
    completedQty: 2
  },
  {
    id: '2',
    workorder: {
      text: 'WO-002',
      value: '2'
    },
    salesorder: {
      text: 'SO-002',
      value: '2'
    },
    event: 'event2',
    uuid: 'uuid-002',
    line: '2',
    item: {
      text: 'Concrete Mix 50kg',
      value: '2'
    },
    description: 'Premium concrete mix for foundation',
    quantity: 20,
    availableQty: 20,
    note: 'Store in dry place',
    quantityReceived: 15,
    completedQty: 10
  },
  {
    id: '3',
    workorder: {
      text: 'WO-003',
      value: '3'
    },
    salesorder: {
      text: 'SO-003',
      value: '3'
    },
    event: 'event3',
    uuid: 'uuid-003',
    line: '3',
    item: {
      text: 'Electrical Cable 100m',
      value: '3'
    },
    description: 'Heavy-duty electrical cable for power distribution',
    quantity: 10,
    availableQty: 8,
    note: 'Weather-resistant coating',
    quantityReceived: 10,
    completedQty: 8
  }
];

export const fetchWOItems = async (): Promise<WOItem[]> => {
  // Check if running locally (development environment)
  if (suiteletUrl.includes('api.example.com')) {
    console.log('WOItem: Using mockup data for local development');
    return mockWOItems;
  }

  try {
    console.log('WOItem: Starting to fetch work order items');
    
    let allData: WOItem[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&action=getWorkOrderItems&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`WOItem service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch work order items chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`WOItem service RESULT chunk ${i + 1}:`, chunkData);
      
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
    
    console.log(`Finished chunked fetch. Total work order item records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no work order item data across all chunks");
      throw new Error("No work order item data returned from API");
    }

    return allData;

  } catch (error) {
    console.error('WOItem: Error fetching work order items:', error);
    throw error;
  }
};
