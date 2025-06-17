
import { suiteletUrl } from '@/lib/constants';

export interface WOVendor {
  id: string;
  name: string;
  vendor: {
    text: string;
    value: string;
  };
  url: string;
  email: string;
  initials: string;
  workorder: {
    text: string;
    value: string;
  };
  event: string;
  quantityRequired: number;
  quantityAvailable: number;
  purchaseOrder: {
    text: string;
    value: string;
  };
  amount: number;
  active: boolean;
  woVendor: boolean;
  memo: string;
  time: {
    start: string;
    end: string;
  };
}

// Mockup data for local development
const mockWOVendors: WOVendor[] = [
  {
    id: '1',
    name: 'ABC Supply Company',
    vendor: {
      text: 'ABC Supply Company',
      value: '1'
    },
    url: 'https://abcsupply.com',
    email: 'orders@abcsupply.com',
    initials: 'AS',
    workorder: {
      text: 'WO-001',
      value: '1'
    },
    event: 'event1',
    quantityRequired: 10,
    quantityAvailable: 8,
    purchaseOrder: {
      text: 'PO-001',
      value: '1'
    },
    amount: 1500.00,
    active: true,
    woVendor: true,
    memo: 'Primary electrical supplier',
    time: {
      start: '',
      end: ''
    }
  },
  {
    id: '2',
    name: 'XYZ Equipment Rental',
    vendor: {
      text: 'XYZ Equipment Rental',
      value: '2'
    },
    url: 'https://xyzequipment.com',
    email: 'rentals@xyzequipment.com',
    initials: 'XE',
    workorder: {
      text: 'WO-002',
      value: '2'
    },
    event: 'event2',
    quantityRequired: 2,
    quantityAvailable: 2,
    purchaseOrder: {
      text: 'PO-002',
      value: '2'
    },
    amount: 800.00,
    active: true,
    woVendor: true,
    memo: 'Heavy equipment rental',
    time: {
      start: '',
      end: ''
    }
  }
];

export const fetchWOVendors = async (): Promise<WOVendor[]> => {
  // Check if running locally (development environment)
  if (suiteletUrl.includes('api.example.com')) {
    console.log('WOVendor: Using mockup data for local development');
    return mockWOVendors;
  }

  try {
    console.log('WOVendor: Starting to fetch work order vendors');
    
    let allData: WOVendor[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&action=getWorkOrderVendors&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`WOVendor service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch work order vendors chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`WOVendor service RESULT chunk ${i + 1}:`, chunkData);
      
      if (!chunkData || chunkData.length === 0) {
        hasMoreData = false;
      } else {
        const processedChunk: WOVendor[] = chunkData.map((item: any) => {
          // Calculate initials from vendor text
          const getInitials = (vendorText: string): string => {
            let split = vendorText.split(' ').map(name => name.replace(/[^a-zA-Z]/g, ''));
            split = split.filter(Boolean);
            if (split.length > 1) {
              return `${split[0][0]}${split[1][0] || ''}`;
            } else if (split.length == 1) {
              return split[0][0];
            } else {
              return vendorText;
            }
          };

          return {
            id: item.id || '',
            name: item.name || '',
            vendor: {
              text: item.vendor?.text || '',
              value: item.vendor?.value || ''
            },
            url: item.url || '',
            email: item.email || '',
            initials: getInitials(item.vendor?.text || ''),
            workorder: {
              text: item.workorder?.text || '',
              value: item.workorder?.value || ''
            },
            event: item.event || '',
            quantityRequired: Number(item.quantityRequired) || 0,
            quantityAvailable: Number(item.quantityAvailable) || 0,
            purchaseOrder: {
              text: item.purchaseOrder?.text || '',
              value: item.purchaseOrder?.value || ''
            },
            amount: Number(item.amount) || 0,
            active: Boolean(item.active),
            woVendor: true,
            memo: item.memo || '',
            time: {
              start: '',
              end: ''
            }
          };
        });

        allData = [...allData, ...processedChunk];

        if (chunkData.length < chunkSize) {
          hasMoreData = false;
        }
      }
      
      i++;
    }
    
    console.log(`Finished chunked fetch. Total work order vendor records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no work order vendor data across all chunks");
      throw new Error("No work order vendor data returned from API");
    }

    return allData;

  } catch (error) {
    console.error('WOVendor: Error fetching work order vendors:', error);
    throw error;
  }
};
