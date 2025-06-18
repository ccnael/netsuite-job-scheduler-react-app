import { suiteletUrl } from '@/lib/constants';

export interface Vendor {
  id: string;
  name: string;
  vendor: {
    text: string;
    value: string;
  };
  url: string;
  email: string;
  initials: string;
  quantityRequired: number;
  quantityAvailable: number;
  purchaseOrder: {
    text: string;
    value: string;
  };
  woVendor: boolean;
  events: string[];
  memo: string;
  location: {
    text: string;
    value: string;
  };
  department: {
    text: string;
    value: string;
  };
  time: {
    start: string;
    end: string;
  };
  active: boolean;
}


const getMockVendors = (): Vendor[] => {
  return [{
      "id": "12",
      "name": "Best Fixture, Inc.",
      "vendor": {
        "text": "Best Fixture, Inc.",
        "value": "12"
      },
      "url": "",
      "email": "",
      "initials": "BF",
      "quantityRequired": 0,
      "quantityAvailable": 0,
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "woVendor": false,
      "events": [],
      "memo": "",
      "location": {
        "text": "",
        "value": ""
      },
      "department": {
        "text": "",
        "value": ""
      },
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "1473",
      "name": "Bridgepoint Industries",
      "vendor": {
        "text": "Bridgepoint Industries",
        "value": "1473"
      },
      "url": "http://www.bridgepointindustries.com.de",
      "email": "support@bridgempointindustries.com.de",
      "initials": "BI",
      "quantityRequired": 0,
      "quantityAvailable": 20,
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "woVendor": false,
      "events": [],
      "memo": "",
      "location": {
        "text": "",
        "value": ""
      },
      "department": {
        "text": "",
        "value": ""
      },
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "1661",
      "name": "CFI Furniture Inc.",
      "vendor": {
        "text": "CFI Furniture Inc.",
        "value": "1661"
      },
      "url": "",
      "email": "login+plural@erpsuccesspartners.com",
      "initials": "CF",
      "quantityRequired": 0,
      "quantityAvailable": 0,
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "woVendor": false,
      "events": [],
      "memo": "",
      "location": {
        "text": "",
        "value": ""
      },
      "department": {
        "text": "",
        "value": ""
      },
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "965",
      "name": "Computer Depot Pacific",
      "vendor": {
        "text": "Computer Depot Pacific",
        "value": "965"
      },
      "url": "http://www.cdp.com",
      "email": "payables@cdp.com",
      "initials": "CD",
      "quantityRequired": 0,
      "quantityAvailable": 0,
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "woVendor": false,
      "events": [],
      "memo": "",
      "location": {
        "text": "",
        "value": ""
      },
      "department": {
        "text": "",
        "value": ""
      },
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "1664",
      "name": "Haworth, Inc.",
      "vendor": {
        "text": "Haworth, Inc.",
        "value": "1664"
      },
      "url": "",
      "email": "login+cbi2@erpsuccesspartners.com",
      "initials": "HI",
      "quantityRequired": 0,
      "quantityAvailable": 0,
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "woVendor": false,
      "events": [],
      "memo": "",
      "location": {
        "text": "",
        "value": ""
      },
      "department": {
        "text": "",
        "value": ""
      },
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    }
  ]
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
