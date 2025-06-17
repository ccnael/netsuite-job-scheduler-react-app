
import { suiteletUrl } from '@/lib/constants';

export interface Asset {
  asset: {
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

const getMockAssets = (): Asset[] => {
  return [
    {
      "asset": {
        "text": "Forklift FLT-001",
        "value": "asset001"
      },
      "initials": "FL",
      "email": "maintenance@company.com",
      "phone": "(555) 111-2222",
      "location": {
        "text": "01: San Francisco",
        "value": "2"
      },
      "active": true,
      "resourceGroups": [
        {
          "text": "Assets",
          "value": "5"
        }
      ],
      "types": [
        {
          "text": "Heavy Equipment",
          "value": "6"
        }
      ],
      "color": "#ffa726",
      "url": "%2Fapp%2Fcommon%2Fentity%2Fasset.nl%3Fcompid%3DTSTDRV2617106",
      "events": []
    },
    {
      "asset": {
        "text": "Crane CR-002",
        "value": "asset002"
      },
      "initials": "CR",
      "email": "maintenance@company.com",
      "phone": "(555) 333-4444",
      "location": {
        "text": "02: Boston",
        "value": "1"
      },
      "active": true,
      "resourceGroups": [
        {
          "text": "Assets",
          "value": "5"
        }
      ],
      "types": [
        {
          "text": "Heavy Equipment",
          "value": "6"
        }
      ],
      "color": "#66bb6a",
      "url": "%2Fapp%2Fcommon%2Fentity%2Fasset.nl%3Fcompid%3DTSTDRV2617106",
      "events": []
    },
    {
      "asset": {
        "text": "Generator GEN-003",
        "value": "asset003"
      },
      "initials": "GN",
      "email": "maintenance@company.com",
      "phone": "(555) 555-6666",
      "location": {
        "text": "01: San Francisco",
        "value": "2"
      },
      "active": true,
      "resourceGroups": [
        {
          "text": "Assets",
          "value": "5"
        }
      ],
      "types": [
        {
          "text": "Power Equipment",
          "value": "7"
        }
      ],
      "color": "#ef5350",
      "url": "%2Fapp%2Fcommon%2Fentity%2Fasset.nl%3Fcompid%3DTSTDRV2617106",
      "events": []
    }
  ];
};

const isLocalDevelopment = (): boolean => {
  return import.meta.env.DEV || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
};

export const fetchAssets = async (): Promise<Asset[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock asset data for local development');
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMockAssets()), 500);
    });
  }

  try {
    let allData: Asset[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&mode=getAssets&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`Asset service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch assets chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`Asset service RESULT chunk ${i + 1}:`, chunkData);
      
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
    
    console.log(`Finished chunked fetch. Total asset records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no asset data across all chunks");
      throw new Error("No asset data returned from API");
    }

    return allData;
  } catch (error) {
    console.error('Error fetching assets:', error);
    throw error;
  }
};
