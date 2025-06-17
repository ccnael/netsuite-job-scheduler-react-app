import { suiteletUrl } from '@/lib/constants';

export interface WorkOrder {
  id: string;
  name?: string;
  title?: string;
  project?: {
    text: string;
    value: string;
  };
  date?: string;
  status?: {
    text: string;
    value: string;
    code?: string;
  };
  type?: {
    text: string;
    value: string;
  };
  memo?: string;
  salesorder?: {
    text: string;
    value: string;
  };
  customer?: {
    text: string;
    value: string;
  };
  resourceGroup?: {
    text: string;
    value: string;
  };
  priority?: string;
  resources?: any[];
  vendors?: any[];
  assets?: any[];
  items?: any[];
  addresses?: any[];
  contacts?: any[];
  events?: any[];
  projectUrl?: string;
  woUrl?: string;
  soUrl?: string;
  esthours?: number;
  location?: {
    text: string;
    value: string;
  };
  receiptStatus?: {
    text: string;
    value: string;
    code?: string;
    display?: string;
  };
  projectInsight?: {
    text: string;
    value: string;
  };
}

const getMockWorkOrders = (): WorkOrder[] => {
  return [
    {
      id: '86',
      name: 'Test Work Order - Mei',
      title: 'Test Work Order - Mei',
      project: {
        text: 'AB&I Holdings : Field Ops Pro Project',
        value: 'proj_001'
      },
      date: '10/21/2024',
      status: {
        text: 'Not Started',
        value: '1',
        code: 'NOT_STARTED'
      },
      type: {
        text: 'Demo',
        value: 'demo'
      },
      memo: 'Test Work Order - Mei',
      salesorder: {
        text: 'SO-001',
        value: 'so_001'
      },
      customer: {
        text: 'AB&I Holdings',
        value: 'cust_001'
      },
      resourceGroup: {
        text: 'Field Operations',
        value: 'rg_001'
      },
      priority: 'High',
      resources: [],
      vendors: [],
      assets: [],
      items: [],
      addresses: [],
      contacts: [],
      events: [],
      projectUrl: '/project/proj_001',
      woUrl: '/workorder/86',
      soUrl: '/salesorder/so_001',
      esthours: 8,
      location: {
        text: 'Main Site',
        value: 'loc_001'
      },
      receiptStatus: {
        text: 'Not Received',
        value: '1',
        code: 'NOT_RECEIVED',
        display: 'Not Received'
      },
      projectInsight: {
        text: 'Field Operations Insight',
        value: 'pi_001'
      }
    },
    {
      id: '85',
      name: 'Test Work Order - Mei',
      title: 'Test Work Order - Mei',
      project: {
        text: 'AB&I Holdings : Field Ops Pro Project',
        value: 'proj_001'
      },
      date: '10/21/2024',
      status: {
        text: 'Not Started',
        value: '1',
        code: 'NOT_STARTED'
      },
      type: {
        text: 'Mockup',
        value: 'mockup'
      },
      memo: 'Test Work Order - Mei',
      salesorder: {
        text: 'SO-002',
        value: 'so_002'
      },
      customer: {
        text: 'AB&I Holdings',
        value: 'cust_001'
      },
      resourceGroup: {
        text: 'Design Team',
        value: 'rg_002'
      },
      priority: 'Medium',
      resources: [],
      vendors: [],
      assets: [],
      items: [],
      addresses: [],
      contacts: [],
      events: [],
      projectUrl: '/project/proj_001',
      woUrl: '/workorder/85',
      soUrl: '/salesorder/so_002',
      esthours: 6,
      location: {
        text: 'Design Studio',
        value: 'loc_002'
      },
      receiptStatus: {
        text: 'Not Received',
        value: '1',
        code: 'NOT_RECEIVED',
        display: 'Not Received'
      },
      projectInsight: {
        text: 'Design Insight',
        value: 'pi_002'
      }
    },
    {
      id: '84',
      name: 'Test Work order',
      title: 'Test Work order',
      project: {
        text: 'Kumari Pravallika : Test Kumari',
        value: 'proj_002'
      },
      date: '10/18/2024',
      status: {
        text: 'Not Started',
        value: '1',
        code: 'NOT_STARTED'
      },
      type: {
        text: 'Standard',
        value: 'standard'
      },
      memo: 'Test Work order',
      salesorder: {
        text: 'SO-003',
        value: 'so_003'
      },
      customer: {
        text: 'Kumari Pravallika',
        value: 'cust_002'
      },
      resourceGroup: {
        text: 'Standard Operations',
        value: 'rg_003'
      },
      priority: 'Low',
      resources: [],
      vendors: [],
      assets: [],
      items: [],
      addresses: [],
      contacts: [],
      events: [],
      projectUrl: '/project/proj_002',
      woUrl: '/workorder/84',
      soUrl: '/salesorder/so_003',
      esthours: 4,
      location: {
        text: 'Remote',
        value: 'loc_003'
      },
      receiptStatus: {
        text: 'Not Received',
        value: '1',
        code: 'NOT_RECEIVED',
        display: 'Not Received'
      },
      projectInsight: {
        text: 'Standard Operations Insight',
        value: 'pi_003'
      }
    }
  ];
};

const isLocalDevelopment = (): boolean => {
  return import.meta.env.DEV || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
};

export const fetchWorkOrders = async (): Promise<WorkOrder[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock work order data for local development');
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMockWorkOrders()), 500);
    });
  }

  try {
    let allData: WorkOrder[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&mode=getWorkOrders&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`Work Order service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch work orders chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`Work Order service RESULT chunk ${i + 1}:`, chunkData);
      
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
    
    console.log(`Finished chunked fetch. Total work order records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no work order data across all chunks");
      throw new Error("No work order data returned from API");
    }

    return allData;
  } catch (error) {
    console.error('Error fetching work orders:', error);
    throw error;
  }
};
