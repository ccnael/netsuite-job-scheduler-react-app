
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
        "id": "1",
        "name": " ",
        "initials": "",
        "email": "",
        "phone": "",
        "active": false,
        "workorder": {
            "text": "Installation of Furnitures",
            "value": "2"
        },
        "events": [],
        "employee": {
            "text": "",
            "value": ""
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "2",
        "name": " ",
        "initials": "",
        "email": "",
        "phone": "",
        "active": false,
        "workorder": {
            "text": "Installation of Furnitures",
            "value": "2"
        },
        "events": [],
        "employee": {
            "text": "",
            "value": ""
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "3",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Installation of Furnitures",
            "value": "2"
        },
        "events": [],
        "employee": {
            "text": "Mei Matriano",
            "value": "1647"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "New York",
            "value": "15"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "4",
        "name": "Bonita Kane",
        "initials": "BK",
        "email": "bdickens@ramsey.com",
        "phone": "(123) 456-7890",
        "active": false,
        "workorder": {
            "text": "Installation of Furnitures",
            "value": "3"
        },
        "events": [],
        "employee": {
            "text": "Bonita Kane",
            "value": "912"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "5",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Installation of Furnitures",
            "value": "3"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "6",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Installation of Furnitures",
            "value": "3"
        },
        "events": [],
        "employee": {
            "text": "Mei Matriano",
            "value": "1647"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "New York",
            "value": "15"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "7",
        "name": "Bonita Kane",
        "initials": "BK",
        "email": "bdickens@ramsey.com",
        "phone": "(123) 456-7890",
        "active": false,
        "workorder": {
            "text": "Crates Pick up",
            "value": "4"
        },
        "events": [],
        "employee": {
            "text": "Bonita Kane",
            "value": "912"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 300,
        "vendor": {
            "text": "Haworth, Inc.",
            "value": "1664"
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "8",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Crates Pick up",
            "value": "4"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 300,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "9",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Installation of chairs",
            "value": "5"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 350,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "10",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Crates Pick up",
            "value": "4"
        },
        "events": [],
        "employee": {
            "text": "Mei Matriano",
            "value": "1647"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 500,
        "vendor": {
            "text": "CFI Furniture Inc.",
            "value": "1661"
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "New York",
            "value": "15"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "11",
        "name": "Bonita Kane",
        "initials": "BK",
        "email": "bdickens@ramsey.com",
        "phone": "(123) 456-7890",
        "active": false,
        "workorder": {
            "text": "Install Walls",
            "value": "7"
        },
        "events": [],
        "employee": {
            "text": "Bonita Kane",
            "value": "912"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "12",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Install Walls",
            "value": "7"
        },
        "events": [],
        "employee": {
            "text": "Mei Matriano",
            "value": "1647"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "New York",
            "value": "15"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "13",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Install Walls",
            "value": "7"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "14",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Walls Installation",
            "value": "13"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "15",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Walls Installation",
            "value": "13"
        },
        "events": [],
        "employee": {
            "text": "Mei Matriano",
            "value": "1647"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "New York",
            "value": "15"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "16",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Walls Installation",
            "value": "13"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "17",
        "name": "Rowe Riomalos",
        "initials": "RR",
        "email": "rowe@erpsuccesspartners.com",
        "phone": "",
        "active": false,
        "workorder": {
            "text": "Walls Installation",
            "value": "13"
        },
        "events": [],
        "employee": {
            "text": "Rowe Riomalos",
            "value": "1766"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "18",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Install Walls",
            "value": "14"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "19",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Install Walls",
            "value": "14"
        },
        "events": [],
        "employee": {
            "text": "Mei Matriano",
            "value": "1647"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "New York",
            "value": "15"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "20",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Install Walls",
            "value": "14"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "21",
        "name": "Rowe Riomalos",
        "initials": "RR",
        "email": "rowe@erpsuccesspartners.com",
        "phone": "",
        "active": false,
        "workorder": {
            "text": "Install Walls",
            "value": "14"
        },
        "events": [],
        "employee": {
            "text": "Rowe Riomalos",
            "value": "1766"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "22",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Drop off and Walls Installation",
            "value": "15"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "23",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Drop off and Walls Installation",
            "value": "15"
        },
        "events": [],
        "employee": {
            "text": "Mei Matriano",
            "value": "1647"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "New York",
            "value": "15"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "25",
        "name": "Rowe Riomalos",
        "initials": "RR",
        "email": "rowe@erpsuccesspartners.com",
        "phone": "",
        "active": false,
        "workorder": {
            "text": "Drop off and Walls Installation",
            "value": "15"
        },
        "events": [],
        "employee": {
            "text": "Rowe Riomalos",
            "value": "1766"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "26",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Drop off and Walls Installation",
            "value": "15"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "27",
        "name": "Bonita Kane",
        "initials": "BK",
        "email": "bdickens@ramsey.com",
        "phone": "(123) 456-7890",
        "active": false,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Bonita Kane",
            "value": "912"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "28",
        "name": "Bonita Kane",
        "initials": "BK",
        "email": "bdickens@ramsey.com",
        "phone": "(123) 456-7890",
        "active": false,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Bonita Kane",
            "value": "912"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "29",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "30",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Mei Matriano",
            "value": "1647"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "New York",
            "value": "15"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "31",
        "name": "Bonita Kane",
        "initials": "BK",
        "email": "bdickens@ramsey.com",
        "phone": "(123) 456-7890",
        "active": false,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Bonita Kane",
            "value": "912"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "32",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "33",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "34",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "35",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Mei Matriano",
            "value": "1647"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "New York",
            "value": "15"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "36",
        "name": "Rowe Riomalos",
        "initials": "RR",
        "email": "rowe@erpsuccesspartners.com",
        "phone": "",
        "active": false,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Rowe Riomalos",
            "value": "1766"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "37",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "38",
        "name": "Bonita Kane",
        "initials": "BK",
        "email": "bdickens@ramsey.com",
        "phone": "(123) 456-7890",
        "active": false,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Bonita Kane",
            "value": "912"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "39",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Conference Table Delivery",
            "value": "28"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "40",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Security Camera Installation",
            "value": "29"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "41",
        "name": "Rowe Riomalos",
        "initials": "RR",
        "email": "rowe@erpsuccesspartners.com",
        "phone": "",
        "active": false,
        "workorder": {
            "text": "Flooring Installation ",
            "value": "30"
        },
        "events": [],
        "employee": {
            "text": "Rowe Riomalos",
            "value": "1766"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "42",
        "name": "Rowe Riomalos",
        "initials": "RR",
        "email": "rowe@erpsuccesspartners.com",
        "phone": "",
        "active": false,
        "workorder": {
            "text": "Flooring Installation",
            "value": "31"
        },
        "events": [],
        "employee": {
            "text": "Rowe Riomalos",
            "value": "1766"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "43",
        "name": "Bonita Kane",
        "initials": "BK",
        "email": "bdickens@ramsey.com",
        "phone": "(123) 456-7890",
        "active": false,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Bonita Kane",
            "value": "912"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "44",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "45",
        "name": "Bonita Kane",
        "initials": "BK",
        "email": "bdickens@ramsey.com",
        "phone": "(123) 456-7890",
        "active": false,
        "workorder": {
            "text": "Flooring Installation",
            "value": "31"
        },
        "events": [],
        "employee": {
            "text": "Bonita Kane",
            "value": "912"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "46",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Flooring Installation",
            "value": "31"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "47",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Flooring Installation",
            "value": "31"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "48",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Crates Pick up",
            "value": "4"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 350,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "49",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "AV Installation",
            "value": "33"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "50",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "AV Installation",
            "value": "33"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "51",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Flooring Installation",
            "value": "31"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "52",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Flooring Installation",
            "value": "31"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "53",
        "name": "Bonita Kane",
        "initials": "BK",
        "email": "bdickens@ramsey.com",
        "phone": "(123) 456-7890",
        "active": false,
        "workorder": {
            "text": "Flooring Installation",
            "value": "31"
        },
        "events": [],
        "employee": {
            "text": "Bonita Kane",
            "value": "912"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "54",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Flooring Installation",
            "value": "31"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "55",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Flooring Installation",
            "value": "31"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "56",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Furniture and Flooring Installation",
            "value": "34"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "57",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture and Flooring Installation",
            "value": "34"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "59",
        "name": "Bonita Kane",
        "initials": "BK",
        "email": "bdickens@ramsey.com",
        "phone": "(123) 456-7890",
        "active": false,
        "workorder": {
            "text": "Test Site Checklist",
            "value": "39"
        },
        "events": [],
        "employee": {
            "text": "Bonita Kane",
            "value": "912"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "60",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Test Site Checklist",
            "value": "39"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "61",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Site Checklist",
            "value": "39"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "62",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Site Checklist",
            "value": "39"
        },
        "events": [],
        "employee": {
            "text": "Mei Matriano",
            "value": "1647"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "New York",
            "value": "15"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "63",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Site Checklist",
            "value": "39"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "64",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "42"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "65",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "43"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "66",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "44"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "67",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "AV Installation",
            "value": "47"
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "68",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "AV Installation",
            "value": "47"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "69",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Flooring Installation",
            "value": "48"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "70",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Flooring Installation",
            "value": "48"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "71",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "61"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "72",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Crates Pick up",
            "value": "4"
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "73",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "61"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "74",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "61"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "75",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "67"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "76",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "67"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "84",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "67"
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "85",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "67"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "86",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "67"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "87",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "FOP User Guide TEST",
            "value": "81"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [
            {
                "text": "designer",
                "value": "1"
            }
        ],
        "rate": 10,
        "vendor": {
            "text": "Template - Service Person",
            "value": "2"
        },
        "purchaseOrder": {
            "text": "Purchase Order #PUR00001001",
            "value": "215"
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "88",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "FOP User Guide TEST",
            "value": "81"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [
            {
                "text": "designer",
                "value": "1"
            }
        ],
        "rate": 5,
        "vendor": {
            "text": "Torrance Printing, Inc.",
            "value": "10"
        },
        "purchaseOrder": {
            "text": "Purchase Order #PUR00001001",
            "value": "215"
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "89",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "FOP User Guide TEST",
            "value": "81"
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [
            {
                "text": "designer",
                "value": "1"
            }
        ],
        "rate": 5,
        "vendor": {
            "text": "Template - Sales Person",
            "value": "1"
        },
        "purchaseOrder": {
            "text": "Purchase Order #PUR00001001",
            "value": "215"
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "90",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "FOP User Guide TEST",
            "value": "81"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [
            {
                "text": "designer",
                "value": "1"
            }
        ],
        "rate": 10,
        "vendor": {
            "text": "Template - Sales Person",
            "value": "1"
        },
        "purchaseOrder": {
            "text": "Purchase Order #PUR00001001",
            "value": "215"
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "91",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "FOP User Guide TEST",
            "value": "81"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [
            {
                "text": "designer",
                "value": "1"
            }
        ],
        "rate": 10,
        "vendor": {
            "text": "Template - Sales Person",
            "value": "1"
        },
        "purchaseOrder": {
            "text": "Purchase Order #PUR00001001",
            "value": "215"
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "92",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "67"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "93",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "67"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "94",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "67"
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "95",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "67"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "96",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "67"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "97",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "67"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "98",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "67"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "99",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "100",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "101",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "102",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "103",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "104",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "105",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "106",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "107",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "108",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "109",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "110",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "111",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "112",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "113",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "114",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "115",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "116",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "117",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "118",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "119",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "120",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "121",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "122",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "123",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order Test **Do not use** - Mei",
            "value": "82"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "128",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "83"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "129",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "83"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "131",
        "name": "Joanne Miller",
        "initials": "JM",
        "email": "jc@erpsuccesspartners.com",
        "phone": "",
        "active": false,
        "workorder": {
            "text": "Test Work order",
            "value": "84"
        },
        "events": [],
        "employee": {
            "text": "Joanne Miller",
            "value": "1022"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            }
        ],
        "types": [
            {
                "text": "Designer",
                "value": "3"
            }
        ],
        "subTypes": [
            {
                "text": "designer",
                "value": "1"
            }
        ],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "132",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "85"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "133",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "85"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "135",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "85"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "136",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "86"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "137",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "86"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "138",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "86"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "139",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "87"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "140",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "87"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "141",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "87"
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "142",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "87"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "143",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Dry Run Oct 31",
            "value": "88"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "144",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Dry Run Oct 31",
            "value": "88"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "145",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Dry Run Oct 31",
            "value": "88"
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "146",
        "name": " ",
        "initials": "",
        "email": "",
        "phone": "",
        "active": false,
        "workorder": {
            "text": "Test Dry Run Oct 31",
            "value": "88"
        },
        "events": [],
        "employee": {
            "text": "",
            "value": ""
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "153",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order - Oct 31 - Test 1",
            "value": "92"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "154",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order - Oct 31 - Test 1",
            "value": "92"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "155",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order - Oct 31 - Test 1",
            "value": "92"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "170",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "86"
        },
        "events": [],
        "employee": {
            "text": "Mei Matriano",
            "value": "1647"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 20,
        "vendor": {
            "text": "CFI Furniture Inc.",
            "value": "1661"
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Vendor",
            "value": "2"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "New York",
            "value": "15"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "180",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "86"
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 60,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "181",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 30,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "182",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Mei Matriano",
            "value": "1647"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 20,
        "vendor": {
            "text": "CFI Furniture Inc.",
            "value": "1661"
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Vendor",
            "value": "2"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "New York",
            "value": "15"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "183",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 60,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "185",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 30,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "191",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order - Oct 31 - Test 1",
            "value": "92"
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "194",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order - Nov 4 Dry run",
            "value": "95"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "195",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order - Nov 4 Dry run",
            "value": "95"
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "196",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Work Order - Nov 4 Dry run",
            "value": "95"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "197",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order - Nov 4 Dry run",
            "value": "95"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "198",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order - Nov 4 Dry run",
            "value": "95"
        },
        "events": [],
        "employee": {
            "text": "Mei Matriano",
            "value": "1647"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 20,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "New York",
            "value": "15"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "199",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - Nov 4",
            "value": "94"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "200",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - Nov 4",
            "value": "94"
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "201",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Test Work Order - Nov 4",
            "value": "94"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "205",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "210",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Flooring Installation",
            "value": "31"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "211",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "212",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 60,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "214",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "215",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "216",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "1"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "217",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "218",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "SLS00000621_WRKORDR001",
            "value": "32"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "219",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order Test 4",
            "value": "79"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "220",
        "name": " ",
        "initials": "",
        "email": "",
        "phone": "",
        "active": false,
        "workorder": {
            "text": "Test Fop Dry Run Part 2",
            "value": "75"
        },
        "events": [],
        "employee": {
            "text": "Template - Sales Person",
            "value": "1"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "221",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "222",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Flooring Installation",
            "value": "31"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "223",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "224",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "AV Installation",
            "value": "33"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "227",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "66"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "231",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "86"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "233",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "240",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "242",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order for Testing Nov 5",
            "value": "96"
        },
        "events": [],
        "employee": {
            "text": "Mei Matriano",
            "value": "1647"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 20,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "New York",
            "value": "15"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "243",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order for Testing Nov 5",
            "value": "96"
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 60,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "244",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order Dry Run - Nov 8",
            "value": "100"
        },
        "events": [],
        "employee": {
            "text": "Mei Matriano",
            "value": "1647"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 20,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "New York",
            "value": "15"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "245",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Work Order Dry Run - Nov 8",
            "value": "100"
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 60,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "246",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "66"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 30,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "247",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "66"
        },
        "events": [],
        "employee": {
            "text": "Mei Matriano",
            "value": "1647"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 20,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "New York",
            "value": "15"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "251",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Mei Matriano",
            "value": "1647"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 20,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "New York",
            "value": "15"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "252",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 60,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "253",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "103"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "254",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "AV Installation Only",
            "value": "104"
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "255",
        "name": "Brandy Samms",
        "initials": "BS",
        "email": "adminaccess2@ramsey.com",
        "phone": "(713) 456-7878",
        "active": false,
        "workorder": {
            "text": "AV Installation Only",
            "value": "104"
        },
        "events": [],
        "employee": {
            "text": "Brandy Samms",
            "value": "1545"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "256",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "103"
        },
        "events": [],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "257",
        "name": "Brenda Wilson",
        "initials": "BW",
        "email": "bwilson@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "103"
        },
        "events": [],
        "employee": {
            "text": "Brenda Wilson",
            "value": "1513"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco : QA Hold",
            "value": "5"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "258",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "259",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "105"
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "260",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "87"
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "261",
        "name": "Clark Koozer",
        "initials": "CK",
        "email": "jc@erpsuccesspartners.com",
        "phone": "650-555-8300",
        "active": true,
        "workorder": {
            "text": "Install Cove Lights",
            "value": "106"
        },
        "events": [],
        "employee": {
            "text": "Clark Koozer",
            "value": "23"
        },
        "resourceGroups": [
            {
                "text": "Drivers",
                "value": "3"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "262",
        "name": "Ruth Smith",
        "initials": "RS",
        "email": "jc@erpsuccesspartners.com",
        "phone": "(713) 555-1212",
        "active": true,
        "workorder": {
            "text": "Install Cove Lights",
            "value": "106"
        },
        "events": [],
        "employee": {
            "text": "Ruth Smith",
            "value": "1539"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "263",
        "name": "Dale Williams",
        "initials": "DW",
        "email": "jc@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Install Cove Lights",
            "value": "106"
        },
        "events": [],
        "employee": {
            "text": "Dale Williams",
            "value": "224"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "264",
        "name": "Walter Reagan",
        "initials": "WR",
        "email": "wreagan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Install Cove Lights",
            "value": "106"
        },
        "events": [],
        "employee": {
            "text": "Walter Reagan",
            "value": "918"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "265",
        "name": "Brian Harris",
        "initials": "BH",
        "email": "myohai@avectra.com",
        "phone": "510-555-5290",
        "active": false,
        "workorder": {
            "text": "Work Order - Oct 31 - Test 1",
            "value": "92"
        },
        "events": [],
        "employee": {
            "text": "Brian K Harris",
            "value": "31"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco : QA Hold",
            "value": "5"
        },
        "department": {
            "text": "Admin",
            "value": "1"
        }
    },
    {
        "id": "266",
        "name": "Carmen Matthews",
        "initials": "CM",
        "email": "cmatthews@ramsey.com",
        "phone": "415-555-3696",
        "active": true,
        "workorder": {
            "text": "Install Cove Lights",
            "value": "106"
        },
        "events": [],
        "employee": {
            "text": "Carmen Matthews",
            "value": "24"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Marketing",
            "value": "4"
        }
    },
    {
        "id": "267",
        "name": "Brenda Wilson",
        "initials": "BW",
        "email": "bwilson@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Brenda Wilson",
            "value": "1513"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco : QA Hold",
            "value": "5"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "268",
        "name": "Clark Koozer",
        "initials": "CK",
        "email": "jc@erpsuccesspartners.com",
        "phone": "650-555-8300",
        "active": true,
        "workorder": {
            "text": "Install Office Furniture",
            "value": "109"
        },
        "events": [],
        "employee": {
            "text": "Clark Koozer",
            "value": "23"
        },
        "resourceGroups": [
            {
                "text": "Drivers",
                "value": "3"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "269",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Install Office Furniture",
            "value": "109"
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "270",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Install Office Furniture",
            "value": "109"
        },
        "events": [],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "271",
        "name": "Brian Harris",
        "initials": "BH",
        "email": "myohai@avectra.com",
        "phone": "510-555-5290",
        "active": false,
        "workorder": {
            "text": "Install Office Furniture",
            "value": "109"
        },
        "events": [],
        "employee": {
            "text": "Brian K Harris",
            "value": "31"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco : QA Hold",
            "value": "5"
        },
        "department": {
            "text": "Admin",
            "value": "1"
        }
    },
    {
        "id": "272",
        "name": "Dale Williams",
        "initials": "DW",
        "email": "jc@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Install Office Furniture",
            "value": "109"
        },
        "events": [],
        "employee": {
            "text": "Dale Williams",
            "value": "224"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "273",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Install Office Furniture",
            "value": "109"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "274",
        "name": "Brandy Samms",
        "initials": "BS",
        "email": "adminaccess2@ramsey.com",
        "phone": "(713) 456-7878",
        "active": false,
        "workorder": {
            "text": "Install Office Furniture",
            "value": "109"
        },
        "events": [],
        "employee": {
            "text": "Brandy Samms",
            "value": "1545"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "275",
        "name": "Ruth Smith",
        "initials": "RS",
        "email": "jc@erpsuccesspartners.com",
        "phone": "(713) 555-1212",
        "active": true,
        "workorder": {
            "text": "Install Office Furniture",
            "value": "109"
        },
        "events": [],
        "employee": {
            "text": "Ruth Smith",
            "value": "1539"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "276",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Install Office Furniture",
            "value": "109"
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "277",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Install Office Furniture",
            "value": "109"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "278",
        "name": "Clark Koozer",
        "initials": "CK",
        "email": "jc@erpsuccesspartners.com",
        "phone": "650-555-8300",
        "active": true,
        "workorder": {
            "text": "Install AC",
            "value": "110"
        },
        "events": [],
        "employee": {
            "text": "Clark Koozer",
            "value": "23"
        },
        "resourceGroups": [
            {
                "text": "Drivers",
                "value": "3"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "279",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Install AC",
            "value": "110"
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "280",
        "name": "Brandy Samms",
        "initials": "BS",
        "email": "adminaccess2@ramsey.com",
        "phone": "(713) 456-7878",
        "active": false,
        "workorder": {
            "text": "Install AC",
            "value": "110"
        },
        "events": [],
        "employee": {
            "text": "Brandy Samms",
            "value": "1545"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "281",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Install AC",
            "value": "110"
        },
        "events": [],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "282",
        "name": "Brenda Wilson",
        "initials": "BW",
        "email": "bwilson@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Install AC",
            "value": "110"
        },
        "events": [],
        "employee": {
            "text": "Brenda Wilson",
            "value": "1513"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco : QA Hold",
            "value": "5"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "283",
        "name": "Dale Williams",
        "initials": "DW",
        "email": "jc@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Install AC",
            "value": "110"
        },
        "events": [],
        "employee": {
            "text": "Dale Williams",
            "value": "224"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "284",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Install AC",
            "value": "110"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "285",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Install AC",
            "value": "110"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "286",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "111"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "287",
        "name": "Brenda Wilson",
        "initials": "BW",
        "email": "bwilson@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "105"
        },
        "events": [],
        "employee": {
            "text": "Brenda Wilson",
            "value": "1513"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco : QA Hold",
            "value": "5"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "288",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "105"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "289",
        "name": "Brandy Samms",
        "initials": "BS",
        "email": "adminaccess2@ramsey.com",
        "phone": "(713) 456-7878",
        "active": false,
        "workorder": {
            "text": "Furniture Installation",
            "value": "111"
        },
        "events": [],
        "employee": {
            "text": "Brandy Samms",
            "value": "1545"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "290",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "AV Installation",
            "value": "112"
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "291",
        "name": "Brian Harris",
        "initials": "BH",
        "email": "myohai@avectra.com",
        "phone": "510-555-5290",
        "active": false,
        "workorder": {
            "text": "AV Installation",
            "value": "112"
        },
        "events": [],
        "employee": {
            "text": "Brian K Harris",
            "value": "31"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco : QA Hold",
            "value": "5"
        },
        "department": {
            "text": "Admin",
            "value": "1"
        }
    },
    {
        "id": "292",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "AV Installation",
            "value": "112"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "293",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Delivery",
            "value": "113"
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "294",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "66"
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "295",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "66"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "296",
        "name": "Brandy Samms",
        "initials": "BS",
        "email": "adminaccess2@ramsey.com",
        "phone": "(713) 456-7878",
        "active": false,
        "workorder": {
            "text": "Furniture Installation",
            "value": "66"
        },
        "events": [],
        "employee": {
            "text": "Brandy Samms",
            "value": "1545"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "297",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "66"
        },
        "events": [],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "298",
        "name": "Brenda Wilson",
        "initials": "BW",
        "email": "bwilson@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "66"
        },
        "events": [],
        "employee": {
            "text": "Brenda Wilson",
            "value": "1513"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco : QA Hold",
            "value": "5"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "299",
        "name": "Brian Harris",
        "initials": "BH",
        "email": "myohai@avectra.com",
        "phone": "510-555-5290",
        "active": false,
        "workorder": {
            "text": "Furniture Installation",
            "value": "66"
        },
        "events": [],
        "employee": {
            "text": "Brian K Harris",
            "value": "31"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco : QA Hold",
            "value": "5"
        },
        "department": {
            "text": "Admin",
            "value": "1"
        }
    },
    {
        "id": "300",
        "name": "Carmen Matthews",
        "initials": "CM",
        "email": "cmatthews@ramsey.com",
        "phone": "415-555-3696",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "66"
        },
        "events": [],
        "employee": {
            "text": "Carmen Matthews",
            "value": "24"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 40,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Marketing",
            "value": "4"
        }
    },
    {
        "id": "301",
        "name": "Clark Koozer",
        "initials": "CK",
        "email": "jc@erpsuccesspartners.com",
        "phone": "650-555-8300",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "66"
        },
        "events": [],
        "employee": {
            "text": "Clark Koozer",
            "value": "23"
        },
        "resourceGroups": [
            {
                "text": "Drivers",
                "value": "3"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            }
        ],
        "subTypes": [],
        "rate": 40,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "302",
        "name": "Dale Williams",
        "initials": "DW",
        "email": "jc@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "66"
        },
        "events": [],
        "employee": {
            "text": "Dale Williams",
            "value": "224"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "303",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "66"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "304",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "66"
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 60,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "305",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Lobby Room",
            "value": "114"
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "306",
        "name": "Clark Koozer",
        "initials": "CK",
        "email": "jc@erpsuccesspartners.com",
        "phone": "650-555-8300",
        "active": true,
        "workorder": {
            "text": "Lobby Room",
            "value": "114"
        },
        "events": [],
        "employee": {
            "text": "Clark Koozer",
            "value": "23"
        },
        "resourceGroups": [
            {
                "text": "Drivers",
                "value": "3"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "307",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "115"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "308",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "309",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "115"
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "310",
        "name": "Brandy Samms",
        "initials": "BS",
        "email": "adminaccess2@ramsey.com",
        "phone": "(713) 456-7878",
        "active": false,
        "workorder": {
            "text": "Furniture Installation",
            "value": "115"
        },
        "events": [],
        "employee": {
            "text": "Brandy Samms",
            "value": "1545"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "311",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "117"
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "312",
        "name": "Brandy Samms",
        "initials": "BS",
        "email": "adminaccess2@ramsey.com",
        "phone": "(713) 456-7878",
        "active": false,
        "workorder": {
            "text": "Furniture Installation",
            "value": "117"
        },
        "events": [],
        "employee": {
            "text": "Brandy Samms",
            "value": "1545"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "313",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "314",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "119"
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "315",
        "name": "Brandy Samms",
        "initials": "BS",
        "email": "adminaccess2@ramsey.com",
        "phone": "(713) 456-7878",
        "active": false,
        "workorder": {
            "text": "Furniture Installation",
            "value": "119"
        },
        "events": [],
        "employee": {
            "text": "Brandy Samms",
            "value": "1545"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "316",
        "name": "Brenda Wilson",
        "initials": "BW",
        "email": "bwilson@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Installation of Furnitures",
            "value": "120"
        },
        "events": [],
        "employee": {
            "text": "Brenda Wilson",
            "value": "1513"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco : QA Hold",
            "value": "5"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "317",
        "name": "Brian Harris",
        "initials": "BH",
        "email": "myohai@avectra.com",
        "phone": "510-555-5290",
        "active": false,
        "workorder": {
            "text": "Installation of Furnitures",
            "value": "120"
        },
        "events": [],
        "employee": {
            "text": "Brian K Harris",
            "value": "31"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco : QA Hold",
            "value": "5"
        },
        "department": {
            "text": "Admin",
            "value": "1"
        }
    },
    {
        "id": "318",
        "name": "Dale Williams",
        "initials": "DW",
        "email": "jc@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Installation of Furnitures",
            "value": "120"
        },
        "events": [],
        "employee": {
            "text": "Dale Williams",
            "value": "224"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "319",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "320",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "121"
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "321",
        "name": "Brandy Samms",
        "initials": "BS",
        "email": "adminaccess2@ramsey.com",
        "phone": "(713) 456-7878",
        "active": false,
        "workorder": {
            "text": "Furniture Installation",
            "value": "121"
        },
        "events": [],
        "employee": {
            "text": "Brandy Samms",
            "value": "1545"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "322",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "121"
        },
        "events": [],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "323",
        "name": "Carmen Matthews",
        "initials": "CM",
        "email": "cmatthews@ramsey.com",
        "phone": "415-555-3696",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "121"
        },
        "events": [],
        "employee": {
            "text": "Carmen Matthews",
            "value": "24"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Marketing",
            "value": "4"
        }
    },
    {
        "id": "324",
        "name": "Dale Williams",
        "initials": "DW",
        "email": "jc@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "121"
        },
        "events": [],
        "employee": {
            "text": "Dale Williams",
            "value": "224"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "325",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "326",
        "name": "Clark Koozer",
        "initials": "CK",
        "email": "jc@erpsuccesspartners.com",
        "phone": "650-555-8300",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "119"
        },
        "events": [],
        "employee": {
            "text": "Clark Koozer",
            "value": "23"
        },
        "resourceGroups": [
            {
                "text": "Drivers",
                "value": "3"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            }
        ],
        "subTypes": [],
        "rate": 40,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "327",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "119"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 30,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "328",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "AV Installation",
            "value": "118"
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "329",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "AV Installation",
            "value": "118"
        },
        "events": [],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "330",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "AV Installation",
            "value": "118"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "331",
        "name": "Brian Harris",
        "initials": "BH",
        "email": "myohai@avectra.com",
        "phone": "510-555-5290",
        "active": false,
        "workorder": {
            "text": "Furniture Installation",
            "value": "121"
        },
        "events": [],
        "employee": {
            "text": "Brian K Harris",
            "value": "31"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco : QA Hold",
            "value": "5"
        },
        "department": {
            "text": "Admin",
            "value": "1"
        }
    },
    {
        "id": "332",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "333",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "334",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "119"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "335",
        "name": "Brenda Wilson",
        "initials": "BW",
        "email": "bwilson@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "119"
        },
        "events": [],
        "employee": {
            "text": "Brenda Wilson",
            "value": "1513"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco : QA Hold",
            "value": "5"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "336",
        "name": "Brian Harris",
        "initials": "BH",
        "email": "myohai@avectra.com",
        "phone": "510-555-5290",
        "active": false,
        "workorder": {
            "text": "Furniture Installation",
            "value": "119"
        },
        "events": [],
        "employee": {
            "text": "Brian K Harris",
            "value": "31"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco : QA Hold",
            "value": "5"
        },
        "department": {
            "text": "Admin",
            "value": "1"
        }
    },
    {
        "id": "337",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "338",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "AV Installation",
            "value": "112"
        },
        "events": [],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 60,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "339",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101079"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "340",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101079"
        ],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "341",
        "name": "Dale Williams",
        "initials": "DW",
        "email": "jc@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [],
        "employee": {
            "text": "Dale Williams",
            "value": "224"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "342",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "343",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "344",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "345",
        "name": "Ruth Smith",
        "initials": "RS",
        "email": "jc@erpsuccesspartners.com",
        "phone": "(713) 555-1212",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [],
        "employee": {
            "text": "Ruth Smith",
            "value": "1539"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "346",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "347",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "121"
        },
        "events": [],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "348",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "353",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Furniture Installation",
            "value": "121"
        },
        "events": [
            "101072"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "07:00",
            "end": "15:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "358",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101075"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "09:00",
            "end": "17:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "359",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101075"
        ],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "10:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "360",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101076"
        ],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "17:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "361",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101062"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "362",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101062"
        ],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "363",
        "name": "Carmen Matthews",
        "initials": "CM",
        "email": "cmatthews@ramsey.com",
        "phone": "415-555-3696",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101062"
        ],
        "employee": {
            "text": "Carmen Matthews",
            "value": "24"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Marketing",
            "value": "4"
        }
    },
    {
        "id": "366",
        "name": "Sam Cruz",
        "initials": "SC",
        "email": "scruz@ramsey.com",
        "phone": "408-555-4344",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101062"
        ],
        "employee": {
            "text": "Sam R Cruz",
            "value": "18"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "367",
        "name": "Brenda Wilson",
        "initials": "BW",
        "email": "bwilson@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101079"
        ],
        "employee": {
            "text": "Brenda Wilson",
            "value": "1513"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco : QA Hold",
            "value": "5"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "368",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101080"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "373",
        "name": "Clark Koozer",
        "initials": "CK",
        "email": "jc@erpsuccesspartners.com",
        "phone": "650-555-8300",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101082"
        ],
        "employee": {
            "text": "Clark Koozer",
            "value": "23"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Sales",
            "value": "2"
        }
    },
    {
        "id": "374",
        "name": "Youssef Ezz",
        "initials": "YE",
        "email": "yk@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101082"
        ],
        "employee": {
            "text": "Youssef Ezz",
            "value": "1656"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "375",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101082"
        ],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "",
            "end": ""
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "376",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101083"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "377",
        "name": "Ruth Smith",
        "initials": "RS",
        "email": "jc@erpsuccesspartners.com",
        "phone": "(713) 555-1212",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101083"
        ],
        "employee": {
            "text": "Ruth Smith",
            "value": "1539"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "378",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101083"
        ],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "379",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101084"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "380",
        "name": "Ruth Smith",
        "initials": "RS",
        "email": "jc@erpsuccesspartners.com",
        "phone": "(713) 555-1212",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101084"
        ],
        "employee": {
            "text": "Ruth Smith",
            "value": "1539"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "381",
        "name": "Walter Reagan",
        "initials": "WR",
        "email": "wreagan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101084"
        ],
        "employee": {
            "text": "Walter Reagan",
            "value": "918"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "382",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Lobby Area",
            "value": "125"
        },
        "events": [
            "101085"
        ],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Drivers",
                "value": "3"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "384",
        "name": "Dale Williams",
        "initials": "DW",
        "email": "jc@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Lobby Area",
            "value": "125"
        },
        "events": [
            "101085"
        ],
        "employee": {
            "text": "Dale Williams",
            "value": "224"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "386",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101084"
        ],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "387",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Test Work Order - AC Installation",
            "value": "123"
        },
        "events": [
            "101084"
        ],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "389",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Lobby Area",
            "value": "125"
        },
        "events": [
            "101085"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "00:00",
            "end": "00:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "390",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Office Area 1",
            "value": "132"
        },
        "events": [
            "101087"
        ],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "391",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Office Area 1",
            "value": "132"
        },
        "events": [
            "101088"
        ],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "392",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Office Area 1",
            "value": "132"
        },
        "events": [
            "101088"
        ],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "397",
        "name": "Gary Grant",
        "initials": "GG",
        "email": "garygrant@ramsey.com",
        "phone": "(873) 775-6114",
        "active": true,
        "workorder": {
            "text": "Creation of New Work Order",
            "value": "135"
        },
        "events": [
            "101095"
        ],
        "employee": {
            "text": "Gary Grant",
            "value": "1312"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 30,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "04:00",
            "end": "08:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "398",
        "name": "Matt Nolan",
        "initials": "MN",
        "email": "mnolan@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Creation of New Work Order",
            "value": "135"
        },
        "events": [
            "101095"
        ],
        "employee": {
            "text": "Matt Nolan",
            "value": "1292"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "04:00",
            "end": "10:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "399",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Lobby Area",
            "value": "134"
        },
        "events": [
            "101096"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [
            {
                "text": "designer",
                "value": "1"
            }
        ],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "400",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Lobby Area",
            "value": "134"
        },
        "events": [
            "101096"
        ],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [
            {
                "text": "designer",
                "value": "1"
            }
        ],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "401",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Office Area 1",
            "value": "132"
        },
        "events": [
            "101097"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [
            {
                "text": "designer",
                "value": "1"
            }
        ],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "402",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Office Area 1",
            "value": "132"
        },
        "events": [
            "101097"
        ],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [
            {
                "text": "designer",
                "value": "1"
            }
        ],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "10:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "403",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Office Area 1",
            "value": "132"
        },
        "events": [
            "101098"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "10:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "404",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Office Area 1",
            "value": "132"
        },
        "events": [
            "101098"
        ],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "405",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Office Area 1",
            "value": "132"
        },
        "events": [
            "101099"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "406",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Office Area 1",
            "value": "132"
        },
        "events": [
            "101099"
        ],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "10:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "414",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [
            "101102"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "431",
        "name": " ",
        "initials": "",
        "email": "",
        "phone": "",
        "active": false,
        "workorder": {
            "text": "Android Full Dryrun",
            "value": "137"
        },
        "events": [
            "101120"
        ],
        "employee": {
            "text": "",
            "value": ""
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "432",
        "name": " ",
        "initials": "",
        "email": "",
        "phone": "",
        "active": false,
        "workorder": {
            "text": "Android Full Dryrun",
            "value": "137"
        },
        "events": [
            "101120"
        ],
        "employee": {
            "text": "",
            "value": ""
        },
        "resourceGroups": [],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "",
            "value": ""
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "433",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Android Full Dryrun",
            "value": "137"
        },
        "events": [
            "101122"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "434",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Android Full Dryrun",
            "value": "137"
        },
        "events": [
            "101122"
        ],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "435",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Android Full Dryrun",
            "value": "137"
        },
        "events": [
            "101123"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "436",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Android Full Dryrun",
            "value": "137"
        },
        "events": [
            "101123"
        ],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "437",
        "name": "Carmen Matthews",
        "initials": "CM",
        "email": "cmatthews@ramsey.com",
        "phone": "415-555-3696",
        "active": true,
        "workorder": {
            "text": "Android Full Dryrun",
            "value": "137"
        },
        "events": [
            "101123"
        ],
        "employee": {
            "text": "Carmen Matthews",
            "value": "24"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Marketing",
            "value": "4"
        }
    },
    {
        "id": "438",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Android Full Dryrun",
            "value": "137"
        },
        "events": [
            "101124"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "439",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Android Full Dryrun",
            "value": "137"
        },
        "events": [
            "101124"
        ],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "440",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Android Full Dryrun",
            "value": "137"
        },
        "events": [
            "101126"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "441",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Android Full Dryrun",
            "value": "137"
        },
        "events": [
            "101126"
        ],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "442",
        "name": "Carmen Matthews",
        "initials": "CM",
        "email": "cmatthews@ramsey.com",
        "phone": "415-555-3696",
        "active": true,
        "workorder": {
            "text": "Android Full Dryrun",
            "value": "137"
        },
        "events": [
            "101126"
        ],
        "employee": {
            "text": "Carmen Matthews",
            "value": "24"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Marketing",
            "value": "4"
        }
    },
    {
        "id": "448",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Lobby Area - Product Core Dryrun",
            "value": "138"
        },
        "events": [
            "101132"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "449",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Lobby Area - Product Core Dryrun",
            "value": "138"
        },
        "events": [
            "101132"
        ],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "09:00",
            "end": "17:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "450",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Lobby Area - Product Test",
            "value": "139"
        },
        "events": [
            "101133"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "22:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "451",
        "name": "Brenda Wilson",
        "initials": "BW",
        "email": "bwilson@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Lobby Area - Product Test",
            "value": "139"
        },
        "events": [
            "101133"
        ],
        "employee": {
            "text": "Brenda Wilson",
            "value": "1513"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco : QA Hold",
            "value": "5"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "452",
        "name": "Carmen Matthews",
        "initials": "CM",
        "email": "cmatthews@ramsey.com",
        "phone": "415-555-3696",
        "active": true,
        "workorder": {
            "text": "Lobby Area - Product Test",
            "value": "139"
        },
        "events": [
            "101133"
        ],
        "employee": {
            "text": "Carmen Matthews",
            "value": "24"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Marketing",
            "value": "4"
        }
    },
    {
        "id": "453",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Product Core Testing - 2",
            "value": "140"
        },
        "events": [
            "101134"
        ],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "455",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Android Full Dryrun",
            "value": "137"
        },
        "events": [
            "101121"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "16:00",
            "end": "20:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "456",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "HVAC Maintenance",
            "value": "141"
        },
        "events": [
            "101138"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "14:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "457",
        "name": "Brandy Samms",
        "initials": "BS",
        "email": "adminaccess2@ramsey.com",
        "phone": "(713) 456-7878",
        "active": false,
        "workorder": {
            "text": "HVAC Maintenance",
            "value": "141"
        },
        "events": [
            "101138"
        ],
        "employee": {
            "text": "Brandy Samms",
            "value": "1545"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "07:00",
            "end": "17:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "",
            "value": ""
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "458",
        "name": "Carmen Matthews",
        "initials": "CM",
        "email": "cmatthews@ramsey.com",
        "phone": "415-555-3696",
        "active": true,
        "workorder": {
            "text": "HVAC Maintenance",
            "value": "141"
        },
        "events": [
            "101138"
        ],
        "employee": {
            "text": "Carmen Matthews",
            "value": "24"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Marketing",
            "value": "4"
        }
    },
    {
        "id": "463",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Product Core Testing - 2",
            "value": "140"
        },
        "events": [
            "101146"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "464",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Product Core Testing - 2",
            "value": "140"
        },
        "events": [
            "101146"
        ],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "465",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [
            "101147"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "07:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "466",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [
            "101147"
        ],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "07:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "467",
        "name": "Bea Quilinguin",
        "initials": "BQ",
        "email": "beatrice.q@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [
            "101147"
        ],
        "employee": {
            "text": "Bea Quilinguin",
            "value": "1767"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "07:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "468",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [
            "101147"
        ],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "07:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "469",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Lobby Area - Product Test",
            "value": "139"
        },
        "events": [
            "101149"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "470",
        "name": "Aiden Somerhalder",
        "initials": "AS",
        "email": "admin@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Lobby Area - Product Test",
            "value": "139"
        },
        "events": [
            "101150"
        ],
        "employee": {
            "text": "Aiden Somerhalder",
            "value": "1524"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "12:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "471",
        "name": "Brenda Jones",
        "initials": "BJ",
        "email": "bjones@ramsey.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Lobby Area - Product Test",
            "value": "139"
        },
        "events": [
            "101150"
        ],
        "employee": {
            "text": "Brenda Jones",
            "value": "1516"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "12:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "472",
        "name": "Arun Sharma",
        "initials": "AS",
        "email": "aruns.unlock2go@gmail.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "",
            "value": ""
        },
        "events": [
            "101151"
        ],
        "employee": {
            "text": "Arun Sharma",
            "value": "1770"
        },
        "resourceGroups": [
            {
                "text": "Designers",
                "value": "2"
            },
            {
                "text": "Drivers",
                "value": "3"
            },
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [
            {
                "text": "Delivery Driver",
                "value": "2"
            },
            {
                "text": "Designer",
                "value": "3"
            },
            {
                "text": "Installer",
                "value": "1"
            }
        ],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "In-House",
            "value": "1"
        },
        "time": {
            "start": "08:00",
            "end": "18:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "02: Boston",
            "value": "1"
        },
        "department": {
            "text": "",
            "value": ""
        }
    },
    {
        "id": "473",
        "name": "Carmen Matthews",
        "initials": "CM",
        "email": "cmatthews@ramsey.com",
        "phone": "415-555-3696",
        "active": true,
        "workorder": {
            "text": "Lobby Area - Product Test",
            "value": "139"
        },
        "events": [
            "101150"
        ],
        "employee": {
            "text": "Carmen Matthews",
            "value": "24"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "08:00",
            "end": "12:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "Marketing",
            "value": "4"
        }
    },
    {
        "id": "474",
        "name": "Dale Williams",
        "initials": "DW",
        "email": "jc@erpsuccesspartners.com",
        "phone": "",
        "active": true,
        "workorder": {
            "text": "Lobby Area - Product Test",
            "value": "139"
        },
        "events": [
            "101150"
        ],
        "employee": {
            "text": "Dale Williams",
            "value": "224"
        },
        "resourceGroups": [
            {
                "text": "Installers",
                "value": "1"
            }
        ],
        "types": [],
        "subTypes": [],
        "rate": 0,
        "vendor": {
            "text": "",
            "value": ""
        },
        "purchaseOrder": {
            "text": " ",
            "value": ""
        },
        "affiliationType": {
            "text": "Crew Enhancement",
            "value": "3"
        },
        "time": {
            "start": "08:00",
            "end": "12:00"
        },
        "resourceSkills": [],
        "location": {
            "text": "01: San Francisco",
            "value": "2"
        },
        "department": {
            "text": "",
            "value": ""
        }
    }
];

const isLocalDevelopment = (): boolean => {
  return import.meta.env.DEV || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
};

export const fetchWOResources = async (): Promise<WOResource[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock asset data for local development');
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockWOResources), 500);
    });
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
      const url = `${suiteletUrl}&mode=getWorkOrderResources&start=${start}&end=${end}`;
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
