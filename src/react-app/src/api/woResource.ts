
import { suiteletUrl } from '@/lib/constants';

export interface WOResource {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  active: boolean;
  workorder: {
    text: string;
    value: string;
  };
  events: string[];
  employee: {
    text: string;
    value: string;
  };
  resourceGroups: Array<{
    text: string;
    value: string;
  }>;
  types: Array<{
    text: string;
    value: string;
  }>;
  subTypes: Array<{
    text: string;
    value: string;
  }>;
  rate: number;
  vendor: {
    text: string;
    value: string;
  };
  purchaseOrder: {
    text: string;
    value: string;
  };
  affiliationType: {
    text: string;
    value: string;
  };
  time: {
    start: string;
    end: string;
  };
  resourceSkills: Array<{
    text: string;
    value: string;
  }>;
  location: {
    text: string;
    value: string;
  };
  department: {
    text: string;
    value: string;
  };
}

// Mockup data for local development
const mockWOResources: WOResource[] = [
  {
    id: '1',
    name: 'John Smith',
    initials: 'JS',
    email: 'john.smith@example.com',
    phone: '555-0101',
    active: true,
    workorder: {
      text: 'WO-001',
      value: '1'
    },
    events: ['event1', 'event2'],
    employee: {
      text: 'John Smith',
      value: '1'
    },
    resourceGroups: [
      { text: 'Technicians', value: '1' }
    ],
    types: [
      { text: 'Field Tech', value: '1' }
    ],
    subTypes: [
      { text: 'Senior Tech', value: '1' }
    ],
    rate: 75.00,
    vendor: {
      text: '',
      value: ''
    },
    purchaseOrder: {
      text: '',
      value: ''
    },
    affiliationType: {
      text: 'Employee',
      value: '1'
    },
    time: {
      start: '08:00',
      end: '17:00'
    },
    resourceSkills: [
      { text: 'Electrical', value: '1' },
      { text: 'HVAC', value: '2' }
    ],
    location: {
      text: 'Main Office',
      value: '1'
    },
    department: {
      text: 'Field Services',
      value: '1'
    }
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    initials: 'SJ',
    email: 'sarah.johnson@example.com',
    phone: '555-0102',
    active: true,
    workorder: {
      text: 'WO-002',
      value: '2'
    },
    events: ['event3'],
    employee: {
      text: 'Sarah Johnson',
      value: '2'
    },
    resourceGroups: [
      { text: 'Managers', value: '2' }
    ],
    types: [
      { text: 'Project Manager', value: '2' }
    ],
    subTypes: [
      { text: 'Senior PM', value: '2' }
    ],
    rate: 95.00,
    vendor: {
      text: '',
      value: ''
    },
    purchaseOrder: {
      text: '',
      value: ''
    },
    affiliationType: {
      text: 'Employee',
      value: '1'
    },
    time: {
      start: '09:00',
      end: '18:00'
    },
    resourceSkills: [
      { text: 'Project Management', value: '3' },
      { text: 'Leadership', value: '4' }
    ],
    location: {
      text: 'Main Office',
      value: '1'
    },
    department: {
      text: 'Project Management',
      value: '2'
    }
  }
];

export const fetchWOResources = async (): Promise<WOResource[]> => {
  // Check if running locally (development environment)
  if (suiteletUrl.includes('api.example.com')) {
    console.log('WOResource: Using mockup data for local development');
    return mockWOResources;
  }

  try {
    console.log('WOResource: Starting to fetch work order resources');
    
    let allData: WOResource[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&action=getWorkOrderResources&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`WOResource service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch work order resources chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`WOResource service RESULT chunk ${i + 1}:`, chunkData);
      
      if (!chunkData || chunkData.length === 0) {
        hasMoreData = false;
      } else {
        const processedChunk: WOResource[] = chunkData.map((item: any) => ({
          id: item.id || '',
          name: item.name || '',
          initials: item.initials || '',
          email: item.email || '',
          phone: item.phone || '',
          active: Boolean(item.active),
          workorder: {
            text: item.workorder?.text || '',
            value: item.workorder?.value || ''
          },
          events: Array.isArray(item.events) ? item.events : [],
          employee: {
            text: item.employee?.text || '',
            value: item.employee?.value || ''
          },
          resourceGroups: Array.isArray(item.resourceGroups) ? item.resourceGroups : [],
          types: Array.isArray(item.types) ? item.types : [],
          subTypes: Array.isArray(item.subTypes) ? item.subTypes : [],
          rate: Number(item.rate) || 0,
          vendor: {
            text: item.vendor?.text || '',
            value: item.vendor?.value || ''
          },
          purchaseOrder: {
            text: item.purchaseOrder?.text || '',
            value: item.purchaseOrder?.value || ''
          },
          affiliationType: {
            text: item.affiliationType?.text || '',
            value: item.affiliationType?.value || ''
          },
          time: {
            start: item.time?.start || '',
            end: item.time?.end || ''
          },
          resourceSkills: Array.isArray(item.resourceSkills) ? item.resourceSkills : [],
          location: {
            text: item.location?.text || '',
            value: item.location?.value || ''
          },
          department: {
            text: item.department?.text || '',
            value: item.department?.value || ''
          }
        }));

        allData = [...allData, ...processedChunk];

        if (chunkData.length < chunkSize) {
          hasMoreData = false;
        }
      }
      
      i++;
    }
    
    console.log(`Finished chunked fetch. Total work order resource records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no work order resource data across all chunks");
      throw new Error("No work order resource data returned from API");
    }

    return allData;

  } catch (error) {
    console.error('WOResource: Error fetching work order resources:', error);
    throw error;
  }
};
