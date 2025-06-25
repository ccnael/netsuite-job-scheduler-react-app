
import { suiteletUrl } from '@/lib/constants';
import { isLocalDevelopment } from '@/lib/helpers';

export interface Asset {
  id: string;
  name: string;
  initials: string;
  asset: {
    text: string;
    value: string;
  };
  onMaintenance: boolean;
  description: string;
  type: {
    text: string;
    value: string;
  };
  quantity: number;
  maxQuantity: number;
  quantityRemaining: number;
  quantityUsed: number;
  owned: boolean;
  consumable: boolean;
  time: {
    start: string;
    end: string;
  };
  active: boolean;
}

const getMockAssets = (): Asset[] => {
  return [{
      "id": "5",
      "name": "Bolts",
      "initials": "B",
      "asset": {
        "text": "Bolts",
        "value": "5"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "Tools & Equipment",
        "value": "7"
      },
      "quantity": 0,
      "maxQuantity": 10002,
      "quantityRemaining": 9195,
      "quantityUsed": 807,
      "owned": true,
      "consumable": true,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "29",
      "name": "Bolts",
      "initials": "B",
      "asset": {
        "text": "Bolts",
        "value": "29"
      },
      "onMaintenance": true,
      "description": "",
      "type": {
        "text": "Fasteners",
        "value": "106"
      },
      "quantity": 0,
      "maxQuantity": 50500,
      "quantityRemaining": 49500,
      "quantityUsed": 1000,
      "owned": true,
      "consumable": true,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "107",
      "name": "Cranes",
      "initials": "C",
      "asset": {
        "text": "Cranes",
        "value": "107"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "Heavy Machinery",
        "value": "6"
      },
      "quantity": 0,
      "maxQuantity": 1,
      "quantityRemaining": 1,
      "quantityUsed": 0,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "10",
      "name": "Disposable gloves",
      "initials": "D",
      "asset": {
        "text": "Disposable gloves",
        "value": "10"
      },
      "onMaintenance": true,
      "description": "",
      "type": {
        "text": "Personal Protective Equipment (PPE)",
        "value": "9"
      },
      "quantity": 0,
      "maxQuantity": 50000,
      "quantityRemaining": 49500,
      "quantityUsed": 500,
      "owned": true,
      "consumable": true,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "28",
      "name": "Disposable gloves",
      "initials": "D",
      "asset": {
        "text": "Disposable gloves",
        "value": "28"
      },
      "onMaintenance": true,
      "description": "",
      "type": {
        "text": "Personal Protective Equipment (PPE)",
        "value": "9"
      },
      "quantity": 0,
      "maxQuantity": 50000,
      "quantityRemaining": 49500,
      "quantityUsed": 500,
      "owned": true,
      "consumable": true,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "24",
      "name": "Drills",
      "initials": "D",
      "asset": {
        "text": "Drills",
        "value": "24"
      },
      "onMaintenance": true,
      "description": "",
      "type": {
        "text": "Power Tools",
        "value": "108"
      },
      "quantity": 0,
      "maxQuantity": 600,
      "quantityRemaining": 566,
      "quantityUsed": 34,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "4",
      "name": "Forklift",
      "initials": "F",
      "asset": {
        "text": "Forklift",
        "value": "4"
      },
      "onMaintenance": true,
      "description": "",
      "type": {
        "text": "Machine Equipment",
        "value": "2"
      },
      "quantity": 0,
      "maxQuantity": 9,
      "quantityRemaining": -5,
      "quantityUsed": 14,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": false
    },
    {
      "id": "12",
      "name": "Forklifts",
      "initials": "F",
      "asset": {
        "text": "Forklifts",
        "value": "12"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "Vehicles",
        "value": "3"
      },
      "quantity": 0,
      "maxQuantity": 20,
      "quantityRemaining": 19,
      "quantityUsed": 1,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "30",
      "name": "Gas Cylinders",
      "initials": "G",
      "asset": {
        "text": "Gas Cylinders",
        "value": "30"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "Welding Supplies",
        "value": "105"
      },
      "quantity": 0,
      "maxQuantity": 5000,
      "quantityRemaining": 0,
      "quantityUsed": 5000,
      "owned": true,
      "consumable": true,
      "time": {
        "start": "",
        "end": ""
      },
      "active": false
    },
    {
      "id": "25",
      "name": "Grinders",
      "initials": "G",
      "asset": {
        "text": "Grinders",
        "value": "25"
      },
      "onMaintenance": true,
      "description": "",
      "type": {
        "text": "Power Tools",
        "value": "108"
      },
      "quantity": 0,
      "maxQuantity": 600,
      "quantityRemaining": 585,
      "quantityUsed": 15,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "3",
      "name": "Hammer",
      "initials": "H",
      "asset": {
        "text": "Hammer",
        "value": "3"
      },
      "onMaintenance": true,
      "description": "",
      "type": {
        "text": "Tools & Equipment",
        "value": "7"
      },
      "quantity": 0,
      "maxQuantity": 2,
      "quantityRemaining": 0,
      "quantityUsed": 2,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": false
    },
    {
      "id": "6",
      "name": "Hammer",
      "initials": "H",
      "asset": {
        "text": "Hammer",
        "value": "6"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "Tools & Equipment",
        "value": "7"
      },
      "quantity": 0,
      "maxQuantity": 20,
      "quantityRemaining": -5,
      "quantityUsed": 25,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": false
    },
    {
      "id": "13",
      "name": "Hammers",
      "initials": "H",
      "asset": {
        "text": "Hammers",
        "value": "13"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "Tools & Equipment",
        "value": "7"
      },
      "quantity": 0,
      "maxQuantity": 500,
      "quantityRemaining": 500,
      "quantityUsed": 0,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "7",
      "name": "Laptop",
      "initials": "L",
      "asset": {
        "text": "Laptop",
        "value": "7"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "IT Equipment",
        "value": "8"
      },
      "quantity": 0,
      "maxQuantity": 1,
      "quantityRemaining": 0,
      "quantityUsed": 1,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": false
    },
    {
      "id": "14",
      "name": "Laptop",
      "initials": "L",
      "asset": {
        "text": "Laptop",
        "value": "14"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "IT Equipment",
        "value": "8"
      },
      "quantity": 0,
      "maxQuantity": 1,
      "quantityRemaining": 1,
      "quantityUsed": 0,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "15",
      "name": "Laser levels",
      "initials": "L",
      "asset": {
        "text": "Laser levels",
        "value": "15"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "Measuring Instruments",
        "value": "110"
      },
      "quantity": 0,
      "maxQuantity": 6500,
      "quantityRemaining": 6498,
      "quantityUsed": 2,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "16",
      "name": "Measuring tapes",
      "initials": "M",
      "asset": {
        "text": "Measuring tapes",
        "value": "16"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "Measuring Instruments",
        "value": "110"
      },
      "quantity": 0,
      "maxQuantity": 5000,
      "quantityRemaining": 5000,
      "quantityUsed": 0,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "8",
      "name": "Mobile routers (for remote access)",
      "initials": "M",
      "asset": {
        "text": "Mobile routers (for remote access)",
        "value": "8"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "IT Equipment",
        "value": "8"
      },
      "quantity": 0,
      "maxQuantity": 200,
      "quantityRemaining": 200,
      "quantityUsed": 0,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "17",
      "name": "Mobile routers (for remote access)",
      "initials": "M",
      "asset": {
        "text": "Mobile routers (for remote access)",
        "value": "17"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "IT Equipment",
        "value": "8"
      },
      "quantity": 0,
      "maxQuantity": 200,
      "quantityRemaining": 200,
      "quantityUsed": 0,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "18",
      "name": "Pliers",
      "initials": "P",
      "asset": {
        "text": "Pliers",
        "value": "18"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "Tools & Equipment",
        "value": "7"
      },
      "quantity": 0,
      "maxQuantity": 500,
      "quantityRemaining": 500,
      "quantityUsed": 0,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "19",
      "name": "Portable printers",
      "initials": "P",
      "asset": {
        "text": "Portable printers",
        "value": "19"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "IT Equipment",
        "value": "8"
      },
      "quantity": 0,
      "maxQuantity": 200,
      "quantityRemaining": 200,
      "quantityUsed": 0,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "9",
      "name": "Portable printers",
      "initials": "P",
      "asset": {
        "text": "Portable printers",
        "value": "9"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "IT Equipment",
        "value": "8"
      },
      "quantity": 0,
      "maxQuantity": 200,
      "quantityRemaining": 200,
      "quantityUsed": 0,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "26",
      "name": "Scanners",
      "initials": "S",
      "asset": {
        "text": "Scanners",
        "value": "26"
      },
      "onMaintenance": true,
      "description": "",
      "type": {
        "text": "Inspection Tools",
        "value": "107"
      },
      "quantity": 0,
      "maxQuantity": 5000,
      "quantityRemaining": 4990,
      "quantityUsed": 10,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "27",
      "name": "Screwdrivers",
      "initials": "S",
      "asset": {
        "text": "Screwdrivers",
        "value": "27"
      },
      "onMaintenance": true,
      "description": "",
      "type": {
        "text": "Tools & Equipment",
        "value": "7"
      },
      "quantity": 0,
      "maxQuantity": 500,
      "quantityRemaining": 455,
      "quantityUsed": 45,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "23",
      "name": "Service vans/trucks",
      "initials": "S",
      "asset": {
        "text": "Service vans/trucks",
        "value": "23"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "Vehicles",
        "value": "3"
      },
      "quantity": 0,
      "maxQuantity": 1,
      "quantityRemaining": 0,
      "quantityUsed": 1,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": false
    },
    {
      "id": "20",
      "name": "Truck",
      "initials": "T",
      "asset": {
        "text": "Truck",
        "value": "20"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "Vehicles",
        "value": "3"
      },
      "quantity": 0,
      "maxQuantity": 1,
      "quantityRemaining": 0,
      "quantityUsed": 1,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": false
    },
    {
      "id": "21",
      "name": "Truck",
      "initials": "T",
      "asset": {
        "text": "Truck",
        "value": "21"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "Vehicles",
        "value": "3"
      },
      "quantity": 0,
      "maxQuantity": 1,
      "quantityRemaining": 1,
      "quantityUsed": 0,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "1",
      "name": "Truck 1",
      "initials": "T",
      "asset": {
        "text": "Truck 1",
        "value": "1"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "Vehicles",
        "value": "3"
      },
      "quantity": 0,
      "maxQuantity": 1,
      "quantityRemaining": 0,
      "quantityUsed": 1,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": false
    },
    {
      "id": "2",
      "name": "Truck 2",
      "initials": "T",
      "asset": {
        "text": "Truck 2",
        "value": "2"
      },
      "onMaintenance": true,
      "description": "",
      "type": {
        "text": "Vehicles",
        "value": "3"
      },
      "quantity": 0,
      "maxQuantity": 7,
      "quantityRemaining": 0,
      "quantityUsed": 7,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": false
    },
    {
      "id": "22",
      "name": "Walkie-talkies",
      "initials": "W",
      "asset": {
        "text": "Walkie-talkies",
        "value": "22"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "Communication Equipment",
        "value": "109"
      },
      "quantity": 0,
      "maxQuantity": 200,
      "quantityRemaining": 200,
      "quantityUsed": 0,
      "owned": true,
      "consumable": false,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    },
    {
      "id": "11",
      "name": "Welding rods",
      "initials": "W",
      "asset": {
        "text": "Welding rods",
        "value": "11"
      },
      "onMaintenance": false,
      "description": "",
      "type": {
        "text": "Welding Supplies",
        "value": "105"
      },
      "quantity": 0,
      "maxQuantity": 20000,
      "quantityRemaining": 50000,
      "quantityUsed": -30000,
      "owned": true,
      "consumable": true,
      "time": {
        "start": "",
        "end": ""
      },
      "active": true
    }
  ]
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
