
import { suiteletUrl } from '@/lib/constants';
import { isLocalDevelopment } from '@/lib/helpers';

export interface WOAsset {
  id: string;
  name: string;
  workorder: {
    text: string;
    value: string;
  };
  event: string;
  quantity: number;
  maxQuantity: number;
  description: string;
  asset: {
    text: string;
    value: string;
  };
  onMaintenance: boolean;
  owned: boolean;
  time: {
    start: string;
    end: string;
  };
}

// Mockup data for local development
const mockWOAssets: WOAsset[] = [{
    "id": "1",
    "name": "",
    "workorder": {
      "text": "Installation of Furnitures",
      "value": "2"
    },
    "event": "",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "4",
    "name": "",
    "workorder": {
      "text": "Installation of Furnitures",
      "value": "3"
    },
    "event": "",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "6",
    "name": "",
    "workorder": {
      "text": "Crates Pick up",
      "value": "4"
    },
    "event": "100816",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "7",
    "name": "",
    "workorder": {
      "text": "Install Walls",
      "value": "7"
    },
    "event": "",
    "quantity": 2,
    "maxQuantity": 2,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "8",
    "name": "",
    "workorder": {
      "text": "Walls Installation",
      "value": "13"
    },
    "event": "",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "9",
    "name": "",
    "workorder": {
      "text": "Install Walls",
      "value": "14"
    },
    "event": "",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "10",
    "name": "",
    "workorder": {
      "text": "Drop off and Walls Installation",
      "value": "15"
    },
    "event": "100686",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "11",
    "name": "",
    "workorder": {
      "text": "Conference Table Delivery",
      "value": "28"
    },
    "event": "",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "12",
    "name": "",
    "workorder": {
      "text": "Security Camera Installation",
      "value": "29"
    },
    "event": "",
    "quantity": 2,
    "maxQuantity": 2,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "13",
    "name": "",
    "workorder": {
      "text": "Crates Pick up",
      "value": "4"
    },
    "event": "100750",
    "quantity": 2,
    "maxQuantity": 2,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "14",
    "name": "",
    "workorder": {
      "text": "Flooring Installation",
      "value": "31"
    },
    "event": "",
    "quantity": 2,
    "maxQuantity": 2,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "15",
    "name": "",
    "workorder": {
      "text": "Crates Pick up",
      "value": "4"
    },
    "event": "100816",
    "quantity": 4,
    "maxQuantity": 4,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "16",
    "name": "",
    "workorder": {
      "text": "Installation of chairs",
      "value": "5"
    },
    "event": "",
    "quantity": 2,
    "maxQuantity": 2,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "17",
    "name": "",
    "workorder": {
      "text": "Crates Pick up",
      "value": "4"
    },
    "event": "100816",
    "quantity": 4,
    "maxQuantity": 4,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "18",
    "name": "",
    "workorder": {
      "text": "AV Installation",
      "value": "33"
    },
    "event": "",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "19",
    "name": "",
    "workorder": {
      "text": "Furniture and Flooring Installation",
      "value": "34"
    },
    "event": "",
    "quantity": 2,
    "maxQuantity": 2,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "20",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "42"
    },
    "event": "",
    "quantity": 2,
    "maxQuantity": 2,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "21",
    "name": "",
    "workorder": {
      "text": "Crates Pick up",
      "value": "4"
    },
    "event": "100750",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "22",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "61"
    },
    "event": "100812",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "23",
    "name": "",
    "workorder": {
      "text": "Crates Pick up",
      "value": "4"
    },
    "event": "100750",
    "quantity": 3,
    "maxQuantity": 3,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "24",
    "name": "",
    "workorder": {
      "text": "Crates Pick up",
      "value": "4"
    },
    "event": "100750",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "25",
    "name": "",
    "workorder": {
      "text": "Crates Pick up",
      "value": "4"
    },
    "event": "100816",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "26",
    "name": "",
    "workorder": {
      "text": "Drop off and Walls Installation",
      "value": "15"
    },
    "event": "",
    "quantity": 2,
    "maxQuantity": 2,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "27",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100858",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "28",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100859",
    "quantity": 2,
    "maxQuantity": 2,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "29",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100860",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "30",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100861",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "31",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100862",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "32",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100863",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "33",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100866",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "34",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100867",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "35",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100868",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "36",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100869",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "37",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100870",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "38",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100871",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "39",
    "name": "",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "event": "100875",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "40",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100876",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "41",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100877",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "42",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100878",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "43",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100879",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "44",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100880",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "45",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100881",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "46",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100882",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "47",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100883",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "48",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100885",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "49",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100886",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "50",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100887",
    "quantity": 50,
    "maxQuantity": 50,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "51",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100888",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "52",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100889",
    "quantity": 10,
    "maxQuantity": 10,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "53",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100890",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "54",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100891",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "55",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100899",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "56",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100900",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "57",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100901",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "58",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100902",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "59",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100903",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "60",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100904",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "61",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100905",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "62",
    "name": "",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100906",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "63",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "event": "100912",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "64",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "event": "100913",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "65",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "event": "100915",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "66",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "event": "100916",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "67",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "85"
    },
    "event": "100922",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "68",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "85"
    },
    "event": "100923",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "69",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "85"
    },
    "event": "100924",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "70",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "100927",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "71",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100931",
    "quantity": 50,
    "maxQuantity": 50,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "72",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100932",
    "quantity": 20,
    "maxQuantity": 20,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "73",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100933",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "76",
    "name": "",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "100945",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "77",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "100946",
    "quantity": 4,
    "maxQuantity": 4,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "78",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "100947",
    "quantity": 2,
    "maxQuantity": 2,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "81",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100950",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "83",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100952",
    "quantity": 50,
    "maxQuantity": 50,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "84",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100953",
    "quantity": 50,
    "maxQuantity": 50,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "85",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100954",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "86",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "100955",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "87",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "event": "100956",
    "quantity": 3,
    "maxQuantity": 3,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "89",
    "name": "",
    "workorder": {
      "text": "Test Dry Run Oct 31",
      "value": "88"
    },
    "event": "100959",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "90",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "66"
    },
    "event": "100960",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "91",
    "name": "",
    "workorder": {
      "text": "Work Order - Oct 31 - Test 1",
      "value": "92"
    },
    "event": "100964",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "92",
    "name": "",
    "workorder": {
      "text": "Work Order - Oct 31 - Test 1",
      "value": "92"
    },
    "event": "100965",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "95",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "66"
    },
    "event": "100968",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "96",
    "name": "",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "100969",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "97",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "100970",
    "quantity": 4,
    "maxQuantity": 4,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "101",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "101003",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "103",
    "name": "",
    "workorder": {
      "text": "Work Order - Oct 31 - Test 1",
      "value": "92"
    },
    "event": "101006",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "104",
    "name": "",
    "workorder": {
      "text": "Work Order - Oct 31 - Test 1",
      "value": "92"
    },
    "event": "101007",
    "quantity": 50,
    "maxQuantity": 50,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "105",
    "name": "",
    "workorder": {
      "text": "Work Order - Oct 31 - Test 1",
      "value": "92"
    },
    "event": "101008",
    "quantity": 20,
    "maxQuantity": 20,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "107",
    "name": "",
    "workorder": {
      "text": "Work Order - Nov 4 Dry run",
      "value": "95"
    },
    "event": "101010",
    "quantity": 50,
    "maxQuantity": 50,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "109",
    "name": "",
    "workorder": {
      "text": "Test Work Order - Nov 4",
      "value": "94"
    },
    "event": "101011",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "110",
    "name": "",
    "workorder": {
      "text": "Work Order for Testing Nov 5",
      "value": "96"
    },
    "event": "101012",
    "quantity": 50,
    "maxQuantity": 50,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "111",
    "name": "",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "39",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "112",
    "name": "",
    "workorder": {
      "text": "Work Order Dry Run - Nov 8",
      "value": "100"
    },
    "event": "101015",
    "quantity": 10,
    "maxQuantity": 10,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "113",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "103"
    },
    "event": "101028",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "118",
    "name": "",
    "workorder": {
      "text": "Furniture Installation",
      "value": "111"
    },
    "event": "101041",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "122",
    "name": "",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "event": "101037",
    "quantity": 8,
    "maxQuantity": 8,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "123",
    "name": "",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "event": "101062",
    "quantity": 4,
    "maxQuantity": 4,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "124",
    "name": "",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "event": "101077",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "125",
    "name": "",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "event": "101078",
    "quantity": 4,
    "maxQuantity": 4,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "126",
    "name": "",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "event": "101079",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "127",
    "name": "",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "event": "",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "128",
    "name": "",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "event": "101082",
    "quantity": 100,
    "maxQuantity": 100,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "129",
    "name": "",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "event": "101083",
    "quantity": 20,
    "maxQuantity": 20,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "130",
    "name": "",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "event": "101084",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "131",
    "name": "",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "event": "101080",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "132",
    "name": "",
    "workorder": {
      "text": "Office Area 1",
      "value": "132"
    },
    "event": "101087",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "135",
    "name": "",
    "workorder": {
      "text": "Creation of New Work Order",
      "value": "135"
    },
    "event": "101095",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "138",
    "name": "",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101102",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "",
      "value": ""
    },
    "onMaintenance": false,
    "owned": false,
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "163",
    "name": "Bolts",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101119",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "Bolts",
      "value": "5"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "17:00"
    }
  },
  {
    "id": "164",
    "name": "Forklift",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101119",
    "quantity": 3,
    "maxQuantity": 3,
    "description": "",
    "asset": {
      "text": "Forklift",
      "value": "4"
    },
    "onMaintenance": true,
    "owned": true,
    "time": {
      "start": "09:00",
      "end": "16:00"
    }
  },
  {
    "id": "166",
    "name": "Hammer",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101119",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "Hammer",
      "value": "3"
    },
    "onMaintenance": true,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "168",
    "name": "Forklift",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "event": "101121",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "Forklift",
      "value": "4"
    },
    "onMaintenance": true,
    "owned": true,
    "time": {
      "start": "16:00",
      "end": "21:00"
    }
  },
  {
    "id": "170",
    "name": "Forklift",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "event": "101122",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "Forklift",
      "value": "4"
    },
    "onMaintenance": true,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "171",
    "name": "Hammer",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "event": "101122",
    "quantity": 2,
    "maxQuantity": 2,
    "description": "",
    "asset": {
      "text": "Hammer",
      "value": "3"
    },
    "onMaintenance": true,
    "owned": true,
    "time": {
      "start": "09:00",
      "end": "17:00"
    }
  },
  {
    "id": "172",
    "name": "Bolts",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "event": "101126",
    "quantity": 10,
    "maxQuantity": 10,
    "description": "",
    "asset": {
      "text": "Bolts",
      "value": "5"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "175",
    "name": "Truck 1",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101127",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "Truck 1",
      "value": "1"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "08:30",
      "end": "17:45"
    }
  },
  {
    "id": "176",
    "name": "Truck 2",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101127",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "Truck 2",
      "value": "2"
    },
    "onMaintenance": true,
    "owned": true,
    "time": {
      "start": "08:45",
      "end": "17:00"
    }
  },
  {
    "id": "181",
    "name": "Bolts",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "event": "",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "Bolts",
      "value": "5"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "182",
    "name": "Bolts",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "event": "",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "Bolts",
      "value": "5"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "184",
    "name": "Bolts",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "event": "101132",
    "quantity": 25,
    "maxQuantity": 25,
    "description": "",
    "asset": {
      "text": "Bolts",
      "value": "5"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "185",
    "name": "Bolts",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "event": "101133",
    "quantity": 100,
    "maxQuantity": 100,
    "description": "",
    "asset": {
      "text": "Bolts",
      "value": "5"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "186",
    "name": "Truck 2",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "event": "101133",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "Truck 2",
      "value": "2"
    },
    "onMaintenance": true,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "187",
    "name": "Bolts",
    "workorder": {
      "text": "Product Core Testing - 2",
      "value": "140"
    },
    "event": "101134",
    "quantity": 200,
    "maxQuantity": 200,
    "description": "",
    "asset": {
      "text": "Bolts",
      "value": "5"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "188",
    "name": "Truck 1",
    "workorder": {
      "text": "Product Core Testing - 2",
      "value": "140"
    },
    "event": "101134",
    "quantity": 4,
    "maxQuantity": 4,
    "description": "",
    "asset": {
      "text": "Truck 1",
      "value": "1"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "189",
    "name": "Forklift",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101135",
    "quantity": 3,
    "maxQuantity": 3,
    "description": "",
    "asset": {
      "text": "Forklift",
      "value": "4"
    },
    "onMaintenance": true,
    "owned": true,
    "time": {
      "start": "09:00",
      "end": "17:00"
    }
  },
  {
    "id": "190",
    "name": "Hammer",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101135",
    "quantity": 2,
    "maxQuantity": 2,
    "description": "",
    "asset": {
      "text": "Hammer",
      "value": "6"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "11:00",
      "end": "17:00"
    }
  },
  {
    "id": "193",
    "name": "Bolts",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "event": "101138",
    "quantity": 500,
    "maxQuantity": 500,
    "description": "",
    "asset": {
      "text": "Bolts",
      "value": "5"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "194",
    "name": "Drills",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "event": "101138",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "Drills",
      "value": "24"
    },
    "onMaintenance": true,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "195",
    "name": "Grinders",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "event": "101138",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "Grinders",
      "value": "25"
    },
    "onMaintenance": true,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "196",
    "name": "Hammer",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "event": "101138",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "Hammer",
      "value": "6"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "197",
    "name": "Laptop",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "event": "101138",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "Laptop",
      "value": "7"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "198",
    "name": "Truck",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "event": "101138",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "Truck",
      "value": "20"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "199",
    "name": "Screwdrivers",
    "workorder": {
      "text": "Product Core Testing - 2",
      "value": "140"
    },
    "event": "101146",
    "quantity": 10,
    "maxQuantity": 10,
    "description": "",
    "asset": {
      "text": "Screwdrivers",
      "value": "27"
    },
    "onMaintenance": true,
    "owned": true,
    "time": {
      "start": "06:00",
      "end": "16:00"
    }
  },
  {
    "id": "200",
    "name": "Disposable gloves",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101147",
    "quantity": 3,
    "maxQuantity": 3,
    "description": "",
    "asset": {
      "text": "Disposable gloves",
      "value": "10"
    },
    "onMaintenance": true,
    "owned": true,
    "time": {
      "start": "07:00",
      "end": "18:00"
    }
  },
  {
    "id": "204",
    "name": "Screwdrivers",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "event": "",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "Screwdrivers",
      "value": "27"
    },
    "onMaintenance": true,
    "owned": true,
    "time": {
      "start": "17:00",
      "end": "17:00"
    }
  },
  {
    "id": "205",
    "name": "Screwdrivers",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "event": "",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "Screwdrivers",
      "value": "27"
    },
    "onMaintenance": true,
    "owned": true,
    "time": {
      "start": "19:00",
      "end": "21:00"
    }
  },
  {
    "id": "206",
    "name": "Screwdrivers",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "event": "",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "Screwdrivers",
      "value": "27"
    },
    "onMaintenance": true,
    "owned": true,
    "time": {
      "start": "19:00",
      "end": "21:00"
    }
  },
  {
    "id": "207",
    "name": "Walkie-talkies",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "event": "",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "Walkie-talkies",
      "value": "22"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "16:00",
      "end": "20:00"
    }
  },
  {
    "id": "210",
    "name": "Drills",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "event": "101149",
    "quantity": 10,
    "maxQuantity": 10,
    "description": "",
    "asset": {
      "text": "Drills",
      "value": "24"
    },
    "onMaintenance": true,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "215",
    "name": "Bolts",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101151",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "Bolts",
      "value": "5"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "216",
    "name": "Cranes",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101151",
    "quantity": 0,
    "maxQuantity": 0,
    "description": "",
    "asset": {
      "text": "Cranes",
      "value": "107"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "18:00"
    }
  },
  {
    "id": "217",
    "name": "Drills",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "event": "101150",
    "quantity": 5,
    "maxQuantity": 5,
    "description": "",
    "asset": {
      "text": "Drills",
      "value": "24"
    },
    "onMaintenance": true,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "12:00"
    }
  },
  {
    "id": "218",
    "name": "Forklifts",
    "workorder": {
      "text": "Furniture Installation and Pickup",
      "value": "101"
    },
    "event": "101152",
    "quantity": 1,
    "maxQuantity": 1,
    "description": "",
    "asset": {
      "text": "Forklifts",
      "value": "12"
    },
    "onMaintenance": false,
    "owned": true,
    "time": {
      "start": "08:00",
      "end": "10:00"
    }
  }
];

export const fetchWOAssets = async (eventId: string): Promise<WOAsset[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock asset data for local development');
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockWOAssets), 500);
    });
  }

  try {
    console.log('WOAsset: Starting to fetch work order assets');
    
    let allData: WOAsset[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&mode=getWorkOrderAssets&eventId=${eventId}&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`WOAsset service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch work order assets chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`WOAsset service RESULT chunk ${i + 1}:`, chunkData);
      
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
    
    console.log(`Finished chunked fetch. Total work order asset records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no work order asset data across all chunks");
      throw new Error("No work order asset data returned from API");
    }

    return allData;

  } catch (error) {
    console.error('WOAsset: Error fetching work order assets:', error);
    throw error;
  }
};
