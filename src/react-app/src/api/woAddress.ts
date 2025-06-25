
import { suiteletUrl } from '@/lib/constants';
import { isLocalDevelopment } from '@/lib/helpers';

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
const mockWOAddresses: WOAddress[] = [{
    "id": "1",
    "workorder": {
      "text": "Furniture Installation",
      "value": "1"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100792",
      "100798"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "Test Address 1<br/>Test Address 1<br/>Test Address 1<br/>Test Address 1<br/>Test Address 1<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "10",
    "workorder": {
      "text": "Walls Installation",
      "value": "17"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "Test Address 1<br/>Test Address 1<br/>Test Address 1<br/>Test Address 1<br/>Test Address 1<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "11",
    "workorder": {
      "text": "Install Walls",
      "value": "18"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "Chad Bass<br/>AB&I Holdings<br/>1701 Rollins Road<br/>Sacramento CA 94207<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "110",
    "workorder": {
      "text": "Work Order - Oct 31 - Test 1",
      "value": "92"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101008"
    ],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "111",
    "workorder": {
      "text": "Work Order - Oct 31 - Test 1",
      "value": "92"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "54 Tale",
      "value": "245152"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  }
]

export const fetchWOAddresses = async (woId: string, eventId: string): Promise<WOAddress[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock address data for local development');
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockWOAddresses), 500);
    });
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
      const url = `${suiteletUrl}&mode=getWorkOrderAddresses&woId=${woId}&eventId=${eventId}&start=${start}&end=${end}`;
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
