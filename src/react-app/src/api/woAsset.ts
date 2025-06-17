
import { suiteletUrl } from '@/lib/constants';

export interface WOAsset {
  id: string;
  name: string;
  workorder: {
    text: string;
    value: string;
  };
  event: string;
  quantity: number;
  maxQuantity: number;
  description: string;
  asset: {
    text: string;
    value: string;
  };
  onMaintenance: boolean;
  owned: boolean;
  time: {
    start: string;
    end: string;
  };
}

// Mockup data for local development
const mockWOAssets: WOAsset[] = [
  {
    id: '1',
    name: 'Excavator CAT 320',
    workorder: {
      text: 'WO-001',
      value: '1'
    },
    event: 'event1',
    quantity: 1,
    maxQuantity: 1,
    description: 'Heavy excavator for foundation work',
    asset: {
      text: 'Excavator CAT 320',
      value: '1'
    },
    onMaintenance: false,
    owned: true,
    time: {
      start: '08:00',
      end: '17:00'
    }
  },
  {
    id: '2',
    name: 'Crane Liebherr LTM 1070',
    workorder: {
      text: 'WO-002',
      value: '2'
    },
    event: 'event2',
    quantity: 1,
    maxQuantity: 1,
    description: 'Mobile crane for lifting operations',
    asset: {
      text: 'Crane Liebherr LTM 1070',
      value: '2'
    },
    onMaintenance: false,
    owned: false,
    time: {
      start: '09:00',
      end: '16:00'
    }
  },
  {
    id: '3',
    name: 'Generator Caterpillar 500kW',
    workorder: {
      text: 'WO-003',
      value: '3'
    },
    event: 'event3',
    quantity: 2,
    maxQuantity: 3,
    description: 'Backup power generator',
    asset: {
      text: 'Generator Caterpillar 500kW',
      value: '3'
    },
    onMaintenance: true,
    owned: true,
    time: {
      start: '24:00',
      end: '24:00'
    }
  }
];

export const fetchWOAssets = async (): Promise<WOAsset[]> => {
  // Check if running locally (development environment)
  if (suiteletUrl.includes('api.example.com')) {
    console.log('WOAsset: Using mockup data for local development');
    return mockWOAssets;
  }

  try {
    console.log('WOAsset: Starting to fetch work order assets');
    
    let allData: WOAsset[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&action=getWorkOrderAssets&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`WOAsset service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch work order assets chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`WOAsset service RESULT chunk ${i + 1}:`, chunkData);
      
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
    
    console.log(`Finished chunked fetch. Total work order asset records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no work order asset data across all chunks");
      throw new Error("No work order asset data returned from API");
    }

    return allData;

  } catch (error) {
    console.error('WOAsset: Error fetching work order assets:', error);
    throw error;
  }
};
