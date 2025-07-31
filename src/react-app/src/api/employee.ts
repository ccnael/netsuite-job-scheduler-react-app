
import { suiteletUrl } from '@/lib/constants';
import { isLocalDevelopment } from '@/lib/helpers';

export interface Employee {
  id: string;
  name: string;
  employee: {
    text: string;
    value: string;
  };
  subTypes: Array<{
    text: string;
    value: string;
  }>;
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
  color?: string;
  url: string;
  events: string[];
  rate?: number;
  vendor?: {
    text: string;
    value: string;
  };
  purchaseOrder?: {
    text: string;
    value: string;
  };
  affiliationType?: {
    text: string;
    value: string;
  };
  labRates?: Array<{
    labRateCatId: string;
    labRate: number;
  }>;
  time?: {
    start: string;
    end: string;
  };
  resourceSkills?: Array<{
    text: string;
    value: string;
  }>;
  department?: {
    text: string;
    value: string;
  };
  woResourceId?: string;
}

export const getMockEmployees = (): Employee[] => {
  return [{
      "id": "1524",
      "name": "Aiden Somerhalder",
      "initials": "AS",
      "email": "admin@ramsey.com",
      "phone": "",
      "location": {
        "text": "01: San Francisco",
        "value": "2"
      },
      "active": true,
      "employee": {
        "text": "Aiden Somerhalder",
        "value": "1524"
      },
      "resourceGroups": [{
        "text": "Installers",
        "value": "1"
      }],
      "types": [{
        "text": "Installer",
        "value": "1"
      }],
      "subTypes": [],
      "rate": 0,
      "vendor": {
        "text": "",
        "value": ""
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "In-House",
        "value": "1"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D1524%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [{
          "labRateCatId": "2",
          "labRate": 5
        },
        {
          "labRateCatId": "1",
          "labRate": 5
        },
        {
          "labRateCatId": "3",
          "labRate": 5
        }
      ],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "Welding",
          "value": "6"
        },
        {
          "text": "Woodworking",
          "value": "4"
        }
      ],
      "department": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "1770",
      "name": "Arun Sharma",
      "initials": "AS",
      "email": "aruns.unlock2go@gmail.com",
      "phone": "",
      "location": {
        "text": "02: Boston",
        "value": "1"
      },
      "active": true,
      "employee": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "resourceGroups": [{
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
      "types": [{
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
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "In-House",
        "value": "1"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D1770%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "Driving",
          "value": "3"
        },
        {
          "text": "Plumbing",
          "value": "2"
        }
      ],
      "department": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "1767",
      "name": "Bea Quilinguin",
      "initials": "BQ",
      "email": "beatrice.q@erpsuccesspartners.com",
      "phone": "",
      "location": {
        "text": "01: San Francisco",
        "value": "2"
      },
      "active": false,
      "employee": {
        "text": "Bea Quilinguin",
        "value": "1767"
      },
      "resourceGroups": [{
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
      "types": [{
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
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "In-House",
        "value": "1"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D1767%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [{
          "labRateCatId": "1",
          "labRate": 10
        },
        {
          "labRateCatId": "2",
          "labRate": 20
        },
        {
          "labRateCatId": "3",
          "labRate": 30
        }
      ],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "CNC Machining",
          "value": "12"
        },
        {
          "text": "Furniture Design",
          "value": "7"
        },
        {
          "text": "Interior Design",
          "value": "14"
        }
      ],
      "department": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "912",
      "name": "Bonita Kane",
      "initials": "BK",
      "email": "bdickens@ramsey.com",
      "phone": "(123) 456-7890",
      "location": {
        "text": "02: Boston",
        "value": "1"
      },
      "active": false,
      "employee": {
        "text": "Bonita Kane",
        "value": "912"
      },
      "resourceGroups": [{
        "text": "Installers",
        "value": "1"
      }],
      "types": [{
        "text": "Installer",
        "value": "1"
      }],
      "subTypes": [],
      "rate": 20,
      "vendor": {
        "text": "Haworth, Inc.",
        "value": "1664"
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "Vendor",
        "value": "2"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D912%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "Computer-Aided Design (CAD)",
          "value": "8"
        },
        {
          "text": "Furniture Assembly",
          "value": "1"
        },
        {
          "text": "Quality Control",
          "value": "13"
        }
      ],
      "department": {
        "text": "Sales",
        "value": "2"
      }
    },
    {
      "id": "27",
      "name": "Brad Sparling",
      "initials": "BS",
      "email": "jc@erpsuccesspartners.com",
      "phone": "650-555-3226",
      "location": {
        "text": "01: San Francisco",
        "value": "2"
      },
      "active": false,
      "employee": {
        "text": "Brad Sparling",
        "value": "27"
      },
      "resourceGroups": [{
        "text": "Drivers",
        "value": "3"
      }],
      "types": [{
        "text": "Delivery Driver",
        "value": "2"
      }],
      "subTypes": [],
      "rate": 0,
      "vendor": {
        "text": "",
        "value": ""
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "In-House",
        "value": "1"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D27%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "CNC Machining",
          "value": "12"
        },
        {
          "text": "Carpentry and Joinery",
          "value": "10"
        },
        {
          "text": "Material Knowledge",
          "value": "9"
        }
      ],
      "department": {
        "text": "Engineering",
        "value": "11"
      }
    },
    {
      "id": "1545",
      "name": "Brandy Samms",
      "initials": "BS",
      "email": "adminaccess2@ramsey.com",
      "phone": "(713) 456-7878",
      "location": {
        "text": "",
        "value": ""
      },
      "active": false,
      "employee": {
        "text": "Brandy Samms",
        "value": "1545"
      },
      "resourceGroups": [{
        "text": "Installers",
        "value": "1"
      }],
      "types": [{
        "text": "Installer",
        "value": "1"
      }],
      "subTypes": [],
      "rate": 0,
      "vendor": {
        "text": "",
        "value": ""
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "In-House",
        "value": "1"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D1545%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "Painting and Finishing",
          "value": "15"
        },
        {
          "text": "Woodworking",
          "value": "4"
        }
      ],
      "department": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "1516",
      "name": "Brenda Jones",
      "initials": "BJ",
      "email": "bjones@ramsey.com",
      "phone": "",
      "location": {
        "text": "01: San Francisco",
        "value": "2"
      },
      "active": true,
      "employee": {
        "text": "Brenda Jones",
        "value": "1516"
      },
      "resourceGroups": [{
        "text": "Installers",
        "value": "1"
      }],
      "types": [{
        "text": "Installer",
        "value": "1"
      }],
      "subTypes": [],
      "rate": 0,
      "vendor": {
        "text": "",
        "value": ""
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "In-House",
        "value": "1"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D1516%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [{
          "labRateCatId": "1",
          "labRate": 5
        },
        {
          "labRateCatId": "2",
          "labRate": 10
        },
        {
          "labRateCatId": "3",
          "labRate": 15
        }
      ],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "Furniture Assembly",
          "value": "1"
        },
        {
          "text": "Metalworking",
          "value": "5"
        },
        {
          "text": "Painting and Finishing",
          "value": "15"
        }
      ],
      "department": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "1513",
      "name": "Brenda Wilson",
      "initials": "BW",
      "email": "bwilson@ramsey.com",
      "phone": "",
      "location": {
        "text": "01: San Francisco : QA Hold",
        "value": "5"
      },
      "active": true,
      "employee": {
        "text": "Brenda Wilson",
        "value": "1513"
      },
      "resourceGroups": [{
        "text": "Installers",
        "value": "1"
      }],
      "types": [{
        "text": "Installer",
        "value": "1"
      }],
      "subTypes": [],
      "rate": 0,
      "vendor": {
        "text": "",
        "value": ""
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "In-House",
        "value": "1"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D1513%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "Furniture Assembly",
          "value": "1"
        },
        {
          "text": "Painting and Finishing",
          "value": "15"
        }
      ],
      "department": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "31",
      "name": "Brian Harris",
      "initials": "BH",
      "email": "myohai@avectra.com",
      "phone": "510-555-5290",
      "location": {
        "text": "01: San Francisco : QA Hold",
        "value": "5"
      },
      "active": false,
      "employee": {
        "text": "Brian Harris",
        "value": "31"
      },
      "resourceGroups": [{
        "text": "Installers",
        "value": "1"
      }],
      "types": [{
        "text": "Installer",
        "value": "1"
      }],
      "subTypes": [],
      "rate": 0,
      "vendor": {
        "text": "",
        "value": ""
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "In-House",
        "value": "1"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D31%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "Furniture Assembly",
          "value": "1"
        },
        {
          "text": "Furniture Design",
          "value": "7"
        },
        {
          "text": "Interior Design",
          "value": "14"
        }
      ],
      "department": {
        "text": "Admin",
        "value": "1"
      }
    },
    {
      "id": "24",
      "name": "Carmen Matthews",
      "initials": "CM",
      "email": "cmatthews@ramsey.com",
      "phone": "415-555-3696",
      "location": {
        "text": "01: San Francisco",
        "value": "2"
      },
      "active": true,
      "employee": {
        "text": "Carmen Matthews",
        "value": "24"
      },
      "resourceGroups": [{
        "text": "Installers",
        "value": "1"
      }],
      "types": [{
        "text": "Installer",
        "value": "1"
      }],
      "subTypes": [],
      "rate": 40,
      "vendor": {
        "text": "",
        "value": ""
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "Crew Enhancement",
        "value": "3"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D24%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "Computer-Aided Design (CAD)",
          "value": "8"
        },
        {
          "text": "Interior Design",
          "value": "14"
        }
      ],
      "department": {
        "text": "Marketing",
        "value": "4"
      }
    },
    {
      "id": "23",
      "name": "Clark Koozer",
      "initials": "CK",
      "email": "jc@erpsuccesspartners.com",
      "phone": "650-555-8300",
      "location": {
        "text": "01: San Francisco",
        "value": "2"
      },
      "active": true,
      "employee": {
        "text": "Clark Koozer",
        "value": "23"
      },
      "resourceGroups": [{
        "text": "Drivers",
        "value": "3"
      }],
      "types": [{
        "text": "Delivery Driver",
        "value": "2"
      }],
      "subTypes": [],
      "rate": 40,
      "vendor": {
        "text": "",
        "value": ""
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "In-House",
        "value": "1"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D23%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "Carpentry and Joinery",
          "value": "10"
        },
        {
          "text": "Furniture Assembly",
          "value": "1"
        }
      ],
      "department": {
        "text": "Sales",
        "value": "2"
      }
    },
    {
      "id": "224",
      "name": "Dale Williams",
      "initials": "DW",
      "email": "jc@erpsuccesspartners.com",
      "phone": "",
      "location": {
        "text": "01: San Francisco",
        "value": "2"
      },
      "active": true,
      "employee": {
        "text": "Dale Williams",
        "value": "224"
      },
      "resourceGroups": [{
        "text": "Installers",
        "value": "1"
      }],
      "types": [{
        "text": "Installer",
        "value": "1"
      }],
      "subTypes": [],
      "rate": 0,
      "vendor": {
        "text": "",
        "value": ""
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "Crew Enhancement",
        "value": "3"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D224%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "Material Knowledge",
          "value": "9"
        },
        {
          "text": "Plumbing",
          "value": "2"
        },
        {
          "text": "Quality Control",
          "value": "13"
        }
      ],
      "department": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "1312",
      "name": "Gary Grant",
      "initials": "GG",
      "email": "garygrant@ramsey.com",
      "phone": "(873) 775-6114",
      "location": {
        "text": "02: Boston",
        "value": "1"
      },
      "active": true,
      "employee": {
        "text": "Gary Grant",
        "value": "1312"
      },
      "resourceGroups": [{
        "text": "Installers",
        "value": "1"
      }],
      "types": [{
        "text": "Installer",
        "value": "1"
      }],
      "subTypes": [],
      "rate": 30,
      "vendor": {
        "text": "",
        "value": ""
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "Crew Enhancement",
        "value": "3"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D1312%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "CNC Machining",
          "value": "12"
        },
        {
          "text": "Driving",
          "value": "3"
        }
      ],
      "department": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "1292",
      "name": "Matt Nolan",
      "initials": "MN",
      "email": "mnolan@ramsey.com",
      "phone": "",
      "location": {
        "text": "01: San Francisco",
        "value": "2"
      },
      "active": true,
      "employee": {
        "text": "Matt Nolan",
        "value": "1292"
      },
      "resourceGroups": [{
        "text": "Installers",
        "value": "1"
      }],
      "types": [{
        "text": "Installer",
        "value": "1"
      }],
      "subTypes": [],
      "rate": 0,
      "vendor": {
        "text": "",
        "value": ""
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "Crew Enhancement",
        "value": "3"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D1292%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "Interior Design",
          "value": "14"
        },
        {
          "text": "Material Knowledge",
          "value": "9"
        },
        {
          "text": "Quality Control",
          "value": "13"
        }
      ],
      "department": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "1647",
      "name": "Mei Matriano",
      "initials": "MM",
      "email": "mei@erpsuccesspartners.com",
      "phone": "",
      "location": {
        "text": "New York",
        "value": "15"
      },
      "active": true,
      "employee": {
        "text": "Mei Matriano",
        "value": "1647"
      },
      "resourceGroups": [{
        "text": "Designers",
        "value": "2"
      }],
      "types": [{
        "text": "Installer",
        "value": "1"
      }],
      "subTypes": [],
      "rate": 20,
      "vendor": {
        "text": "",
        "value": ""
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "In-House",
        "value": "1"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D1647%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "Material Knowledge",
          "value": "9"
        },
        {
          "text": "Metalworking",
          "value": "5"
        },
        {
          "text": "Welding",
          "value": "6"
        }
      ],
      "department": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "1766",
      "name": "Rowe Riomalos",
      "initials": "RR",
      "email": "rowe@erpsuccesspartners.com",
      "phone": "",
      "location": {
        "text": "",
        "value": ""
      },
      "active": false,
      "employee": {
        "text": "Rowe Riomalos",
        "value": "1766"
      },
      "resourceGroups": [{
        "text": "Designers",
        "value": "2"
      }],
      "types": [],
      "subTypes": [],
      "rate": 0,
      "vendor": {
        "text": "",
        "value": ""
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "In-House",
        "value": "1"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D1766%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "Plumbing",
          "value": "2"
        },
        {
          "text": "Upholstery",
          "value": "11"
        },
        {
          "text": "Woodworking",
          "value": "4"
        }
      ],
      "department": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "1539",
      "name": "Ruth Smith",
      "initials": "RS",
      "email": "jc@erpsuccesspartners.com",
      "phone": "(713) 555-1212",
      "location": {
        "text": "01: San Francisco",
        "value": "2"
      },
      "active": true,
      "employee": {
        "text": "Ruth Smith",
        "value": "1539"
      },
      "resourceGroups": [{
        "text": "Installers",
        "value": "1"
      }],
      "types": [{
        "text": "Installer",
        "value": "1"
      }],
      "subTypes": [],
      "rate": 50,
      "vendor": {
        "text": "",
        "value": ""
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "In-House",
        "value": "1"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D1539%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "CNC Machining",
          "value": "12"
        },
        {
          "text": "Carpentry and Joinery",
          "value": "10"
        },
        {
          "text": "Computer-Aided Design (CAD)",
          "value": "8"
        }
      ],
      "department": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "18",
      "name": "Sam Cruz",
      "initials": "SC",
      "email": "scruz@ramsey.com",
      "phone": "408-555-4344",
      "location": {
        "text": "01: San Francisco",
        "value": "2"
      },
      "active": true,
      "employee": {
        "text": "Sam Cruz",
        "value": "18"
      },
      "resourceGroups": [{
        "text": "Installers",
        "value": "1"
      }],
      "types": [{
        "text": "Installer",
        "value": "1"
      }],
      "subTypes": [],
      "rate": 60,
      "vendor": {
        "text": "",
        "value": ""
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "In-House",
        "value": "1"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D18%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "Driving",
          "value": "3"
        },
        {
          "text": "Furniture Assembly",
          "value": "1"
        },
        {
          "text": "Furniture Design",
          "value": "7"
        }
      ],
      "department": {
        "text": "Sales",
        "value": "2"
      }
    },
    {
      "id": "918",
      "name": "Walter Reagan",
      "initials": "WR",
      "email": "wreagan@ramsey.com",
      "phone": "",
      "location": {
        "text": "02: Boston",
        "value": "1"
      },
      "active": true,
      "employee": {
        "text": "Walter Reagan",
        "value": "918"
      },
      "resourceGroups": [{
        "text": "Installers",
        "value": "1"
      }],
      "types": [{
        "text": "Installer",
        "value": "1"
      }],
      "subTypes": [],
      "rate": 50,
      "vendor": {
        "text": "",
        "value": ""
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "Crew Enhancement",
        "value": "3"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D918%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "Interior Design",
          "value": "14"
        },
        {
          "text": "Material Knowledge",
          "value": "9"
        },
        {
          "text": "Painting and Finishing",
          "value": "15"
        }
      ],
      "department": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "1656",
      "name": "Youssef Ezz",
      "initials": "YE",
      "email": "yk@erpsuccesspartners.com",
      "phone": "",
      "location": {
        "text": "01: San Francisco",
        "value": "2"
      },
      "active": true,
      "employee": {
        "text": "Youssef Ezz",
        "value": "1656"
      },
      "resourceGroups": [{
        "text": "Installers",
        "value": "1"
      }],
      "types": [{
        "text": "Installer",
        "value": "1"
      }],
      "subTypes": [],
      "rate": 60,
      "vendor": {
        "text": "",
        "value": ""
      },
      "purchaseOrder": {
        "text": "",
        "value": ""
      },
      "affiliationType": {
        "text": "In-House",
        "value": "1"
      },
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D1656%26compid%3DTSTDRV2617106",
      "events": [],
      "labRates": [],
      "time": {
        "start": "",
        "end": ""
      },
      "resourceSkills": [{
          "text": "Carpentry and Joinery",
          "value": "10"
        },
        {
          "text": "Quality Control",
          "value": "13"
        },
        {
          "text": "Upholstery",
          "value": "11"
        }
      ],
      "department": {
        "text": "",
        "value": ""
      }
    }
  ];
};

export const assignEmployee = async (resourceDetails: any, eventData: any): Promise<boolean> => {
  console.log('FUCK YOU!!!', {
    resourceDetails,
    eventData
  });
  try {
    const url = `${suiteletUrl}&mode=assignEmployee`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resourceDetails,
        eventData
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to assign employee: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Error assigning employee:', error);
    throw error;
  }
};

export const fetchEmployees = async (): Promise<Employee[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock employee data for local development');
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMockEmployees()), 500);
    });
  }

  try {
    let allData: Employee[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&mode=getEmployees&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`Employee service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch employees chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`Employee service RESULT chunk ${i + 1}:`, chunkData);
      
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
    
    console.log(`Finished chunked fetch. Total employee records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no employee data across all chunks");
      throw new Error("No employee data returned from API");
    }

    return allData;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};
