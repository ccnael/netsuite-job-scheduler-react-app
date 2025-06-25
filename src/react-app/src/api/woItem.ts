
import { suiteletUrl } from '@/lib/constants';
import { isLocalDevelopment } from '@/lib/helpers';

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
const mockWOItems: WOItem[] = [{
    "id": "648",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000835",
      "value": "24427"
    },
    "event": "101132",
    "uuid": "24427_6",
    "line": "6",
    "item": {
      "text": "J2HB-5124-SS1RS1",
      "value": "2036"
    },
    "description": "X Series PST,HngdDr,51.5Hx24Wx24D,B/B/F,Valet,RH,PtdDwr,Ptd/StlDr,Ellipse Pull,Reg Top,Glide",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 3
  },
  {
    "id": "647",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000835",
      "value": "24427"
    },
    "event": "",
    "uuid": "24427_6",
    "line": "6",
    "item": {
      "text": "J2HB-5124-SS1RS1",
      "value": "2036"
    },
    "description": "X Series PST,HngdDr,51.5Hx24Wx24D,B/B/F,Valet,RH,PtdDwr,Ptd/StlDr,Ellipse Pull,Reg Top,Glide",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "642",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000835",
      "value": "24427"
    },
    "event": "",
    "uuid": "24427_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "649",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000835",
      "value": "24427"
    },
    "event": "101132",
    "uuid": "24427_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 1
  },
  {
    "id": "643",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000835",
      "value": "24427"
    },
    "event": "",
    "uuid": "24427_2",
    "line": "2",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "644",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000835",
      "value": "24427"
    },
    "event": "",
    "uuid": "24427_3",
    "line": "3",
    "item": {
      "text": "VZCW-0000-PS1S1",
      "value": "2033"
    },
    "description": "Compose,Wall Mount,Fits All Heights",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 48,
    "completedQty": 0
  },
  {
    "id": "645",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000835",
      "value": "24427"
    },
    "event": "",
    "uuid": "24427_4",
    "line": "4",
    "item": {
      "text": "VZFS-1654-RS1",
      "value": "2034"
    },
    "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
    "quantity": 6,
    "availableQty": 6,
    "note": "",
    "quantityReceived": 108,
    "completedQty": 0
  },
  {
    "id": "646",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000835",
      "value": "24427"
    },
    "event": "",
    "uuid": "24427_5",
    "line": "5",
    "item": {
      "text": "VZTI-1654-FNNS1",
      "value": "2035"
    },
    "description": "Compose,Single Tile,16In.HX54In.W,Fabric/Tackable,Std Core,No Tech",
    "quantity": 12,
    "availableQty": 12,
    "note": "",
    "quantityReceived": 192,
    "completedQty": 0
  }
];

export const fetchWOItems = async (woId: string, eventId: string): Promise<WOItem[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock item data for local development');
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockWOItems), 500);
    });
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
      const url = `${suiteletUrl}&mode=getWorkOrderItems&woId=${woId}&eventId=${eventId}&start=${start}&end=${end}`;
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
