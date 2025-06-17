import { suiteletUrl } from '@/lib/constants';

export interface Vendor {
  vendor: {
    text: string;
    value: string;
  };
  initials: string;
  email: string;
  phone: string;
  location: {
    text: string;
    value: string;
  };
  active: boolean;
  resourceGroups: Array<{
    text: string;
    value: string;
  }>;
  types: Array<{
    text: string;
    value: string;
  }>;
  color: string;
  url: string;
  events: string[];
}

const getMockVendors = (): Vendor[] => {
  return [
    {
      "vendor": {
        "text": "ABC Supply Co",
        "value": "vendor001"
      },
      "initials": "AS",
      "email": "contact@abcsupply.com",
      "phone": "(555) 123-4567",
      "location": {
        "text": "01: San Francisco",
        "value": "2"
      },
      "active": true,
      "resourceGroups": [
        {
          "text": "Vendors",
          "value": "4"
        }
      ],
      "types": [
        {
          "text": "Material Supplier",
          "value": "4"
        }
      ],
      "color": "#ff6b35",
      "url": "%2Fapp%2Fcommon%2Fentity%2Fvendor.nl%3Fcompid%3DTSTDRV2617106",
      "events": []
    },
    {
      "vendor": {
        "text": "Quality Tools Inc",
        "value": "vendor002"
      },
      "initials": "QT",
      "email": "info@qualitytools.com",
      "phone": "(555) 987-6543",
      "location": {
        "text": "02: Boston",
        "value": "1"
      },
      "active": true,
      "resourceGroups": [
        {
          "text": "Vendors",
          "value": "4"
        }
      ],
      "types": [
        {
          "text": "Equipment Supplier",
          "value": "5"
        }
      ],
      "color": "#4ecdc4",
      "url": "%2Fapp%2Fcommon%2Fentity%2Fvendor.nl%3Fcompid%3DTSTDRV2617106",
      "events": []
    },
    {
      "vendor": {
        "text": "Bridgepoint Industries",
        "value": "vendor003"
      },
      "initials": "BI",
      "email": "info@qualitytools.com",
      "phone": "(555) 987-6543",
      "location": {
        "text": "02: Boston",
        "value": "1"
      },
      "active": true,
      "resourceGroups": [
        {
          "text": "Vendors",
          "value": "4"
        }
      ],
      "types": [
        {
          "text": "Equipment Supplier",
          "value": "5"
        }
      ],
      "color": "#4ecdc4",
      "url": "%2Fapp%2Fcommon%2Fentity%2Fvendor.nl%3Fcompid%3DTSTDRV2617106",
      "events": []
    }
  ];
};

const isLocalDevelopment = (): boolean => {
  return import.meta.env.DEV || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
};

export const fetchVendors = async (): Promise<Vendor[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock vendor data for local development');
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMockVendors()), 500);
    });
  }

  try {
    let allData: Vendor[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&mode=getVendors&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`Vendor service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch vendors chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`Vendor service RESULT chunk ${i + 1}:`, chunkData);
      
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
    
    console.log(`Finished chunked fetch. Total vendor records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no vendor data across all chunks");
      throw new Error("No vendor data returned from API");
    }

    return allData;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    throw error;
  }
};
