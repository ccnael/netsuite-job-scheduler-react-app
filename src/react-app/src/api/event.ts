
import { suiteletUrl } from '@/lib/constants';

export interface Event {
  id: string;
  title?: string;
  workorder?: {
    text: string;
    value: string;
  };
  location?: string;
  status?: {
    text: string;
    value: string;
    code?: string;
  };
  date?: {
    recurrence: string;
    dates: string[] | null;
    start: string;
    end: string;
  };
  time?: {
    start: string;
    end: string;
  };
  priority?: {
    text: string;
    value: string;
    code?: string;
  };
  note?: string;
  url?: string;
  color?: string;
  woRef?: any;
  resources?: any[];
  vendors?: any[];
  assets?: any[];
  items?: any[];
  unassigned?: boolean;
  contacts?: any[];
  addresses?: any[];
  address?: {
    text: string;
    value: string;
  };
  organizer?: {
    text: string;
    value: string;
  };
  projectInsight?: {
    text: string;
    value: string;
  };
  assetMaintenance?: string;
}

const getMockEvents = (): Event[] => {
  return [
    {
      id: '1',
      title: 'Project Kickoff Meeting',
      workorder: {
        text: 'Test Work Order - Mei',
        value: '86'
      },
      location: 'Conference Room A',
      status: {
        text: 'Confirmed',
        value: 'CONFIRMED',
        code: 'CONFIRMED'
      },
      date: {
        recurrence: '7/1/2024',
        dates: ['7/1/2024'],
        start: '2024-07-01',
        end: '2024-07-01'
      },
      time: {
        start: '09:00',
        end: '10:30'
      },
      priority: {
        text: 'High',
        value: '3',
        code: 'HIGH'
      },
      note: 'Initial meeting to discuss project requirements and timeline',
      url: '/event/1',
      color: '#1a6756',
      woRef: {},
      resources: [],
      vendors: [],
      assets: [],
      items: [],
      unassigned: true,
      contacts: [],
      addresses: [],
      address: {
        text: 'Main Office',
        value: 'addr_001'
      },
      organizer: {
        text: 'John Doe',
        value: 'emp_001'
      },
      projectInsight: {
        text: 'Field Operations Insight',
        value: 'pi_001'
      },
      assetMaintenance: 'false'
    },
    {
      id: '2',
      title: 'Design Review Session',
      workorder: {
        text: 'Test Work Order - Mei',
        value: '85'
      },
      location: 'Design Studio',
      status: {
        text: 'Confirmed',
        value: 'CONFIRMED',
        code: 'CONFIRMED'
      },
      date: {
        recurrence: '7/2/2024',
        dates: ['7/2/2024'],
        start: '2024-07-02',
        end: '2024-07-02'
      },
      time: {
        start: '14:00',
        end: '16:00'
      },
      priority: {
        text: 'Medium',
        value: '2',
        code: 'MEDIUM'
      },
      note: 'Review and approve design mockups',
      url: '/event/2',
      color: '#1a6756',
      woRef: {},
      resources: [],
      vendors: [],
      assets: [],
      items: [],
      unassigned: true,
      contacts: [],
      addresses: [],
      address: {
        text: 'Design Studio',
        value: 'addr_002'
      },
      organizer: {
        text: 'Jane Smith',
        value: 'emp_002'
      },
      projectInsight: {
        text: 'Design Insight',
        value: 'pi_002'
      },
      assetMaintenance: 'false'
    },
    {
      id: '3',
      title: 'Client Presentation',
      workorder: {
        text: 'Test Work order',
        value: '84'
      },
      location: 'Client Office',
      status: {
        text: 'Tentative',
        value: 'TENTATIVE',
        code: 'TENTATIVE'
      },
      date: {
        recurrence: '7/3/2024',
        dates: ['7/3/2024'],
        start: '2024-07-03',
        end: '2024-07-03'
      },
      time: {
        start: '10:00',
        end: '11:30'
      },
      priority: {
        text: 'High',
        value: '3',
        code: 'HIGH'
      },
      note: 'Present final deliverables to client',
      url: '/event/3',
      color: '#1a6756',
      woRef: {},
      resources: [],
      vendors: [],
      assets: [],
      items: [],
      unassigned: true,
      contacts: [],
      addresses: [],
      address: {
        text: 'Client Office',
        value: 'addr_003'
      },
      organizer: {
        text: 'Mike Johnson',
        value: 'emp_003'
      },
      projectInsight: {
        text: 'Standard Operations Insight',
        value: 'pi_003'
      },
      assetMaintenance: 'true'
    }
  ];
};

const isLocalDevelopment = (): boolean => {
  return import.meta.env.DEV || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
};

export const fetchEvents = async (): Promise<Event[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock event data for local development');
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMockEvents()), 500);
    });
  }

  try {
    let allData: Event[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&mode=getEvents&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`Event service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch events chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`Event service RESULT chunk ${i + 1}:`, chunkData);
      
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
    
    console.log(`Finished chunked fetch. Total event records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no event data across all chunks");
      throw new Error("No event data returned from API");
    }

    return allData;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
