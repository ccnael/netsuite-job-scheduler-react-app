
import { suiteletUrl } from '@/lib/constants';
import { isLocalDevelopment } from '@/lib/helpers';

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
  event: string;
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
const mockWOResources: WOResource[] = [{
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
    "event": "101079",
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
    "event": "101079",
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
    "event": "101072",
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
    "event": "101075",
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
    "event": "101075",
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
    "event": "101076",
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
    "event": "101062",
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
    "event": "101062",
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
    "event": "101062",
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
    "rate": 0,
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
    "event": "101062",
    "employee": {
      "text": "Sam R Cruz",
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
    "rate": 0,
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
    "event": "101079",
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
    "event": "101080",
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
    "event": "101082",
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
    "event": "101082",
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
    "event": "101082",
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
    "event": "101083",
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
    "event": "101083",
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
    "event": "101083",
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
    "event": "101084",
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
    "event": "101084",
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
    "rate": 0,
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
    "event": "101084",
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
    "rate": 0,
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
    "event": "101085",
    "employee": {
      "text": "Arun Sharma",
      "value": "1770"
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
    "event": "101085",
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
    "event": "101084",
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
    "event": "101084",
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
    "event": "101085",
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
    "event": "101087",
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
    "event": "101088",
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
    "event": "101088",
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
    "event": "101095",
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
    "event": "101095",
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
    "event": "101096",
    "employee": {
      "text": "Aiden Somerhalder",
      "value": "1524"
    },
    "resourceGroups": [],
    "types": [],
    "subTypes": [{
      "text": "designer",
      "value": "1"
    }],
    "rate": 0,
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
    "event": "101096",
    "employee": {
      "text": "Brenda Jones",
      "value": "1516"
    },
    "resourceGroups": [],
    "types": [],
    "subTypes": [{
      "text": "designer",
      "value": "1"
    }],
    "rate": 0,
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
    "event": "101097",
    "employee": {
      "text": "Aiden Somerhalder",
      "value": "1524"
    },
    "resourceGroups": [],
    "types": [],
    "subTypes": [{
      "text": "designer",
      "value": "1"
    }],
    "rate": 0,
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
    "event": "101097",
    "employee": {
      "text": "Brenda Jones",
      "value": "1516"
    },
    "resourceGroups": [],
    "types": [],
    "subTypes": [{
      "text": "designer",
      "value": "1"
    }],
    "rate": 0,
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
    "event": "101098",
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
    "event": "101098",
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
    "event": "101099",
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
    "event": "101099",
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
    "event": "101120",
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
    "event": "101120",
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
    "event": "101122",
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
    "event": "101122",
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
    "event": "101123",
    "employee": {
      "text": "Aiden Somerhalder",
      "value": "1524"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101123",
    "employee": {
      "text": "Brenda Jones",
      "value": "1516"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101123",
    "employee": {
      "text": "Carmen Matthews",
      "value": "24"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101124",
    "employee": {
      "text": "Aiden Somerhalder",
      "value": "1524"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101124",
    "employee": {
      "text": "Brenda Jones",
      "value": "1516"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101126",
    "employee": {
      "text": "Aiden Somerhalder",
      "value": "1524"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101126",
    "employee": {
      "text": "Brenda Jones",
      "value": "1516"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101126",
    "employee": {
      "text": "Carmen Matthews",
      "value": "24"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101132",
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
    "event": "101132",
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
    "event": "101133",
    "employee": {
      "text": "Aiden Somerhalder",
      "value": "1524"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101133",
    "employee": {
      "text": "Brenda Wilson",
      "value": "1513"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101133",
    "employee": {
      "text": "Carmen Matthews",
      "value": "24"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101134",
    "employee": {
      "text": "Brenda Jones",
      "value": "1516"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101121",
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
    "event": "101138",
    "employee": {
      "text": "Aiden Somerhalder",
      "value": "1524"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101138",
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
    "event": "101138",
    "employee": {
      "text": "Carmen Matthews",
      "value": "24"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101146",
    "employee": {
      "text": "Aiden Somerhalder",
      "value": "1524"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101146",
    "employee": {
      "text": "Brenda Jones",
      "value": "1516"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101149",
    "employee": {
      "text": "Aiden Somerhalder",
      "value": "1524"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101150",
    "employee": {
      "text": "Aiden Somerhalder",
      "value": "1524"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101150",
    "employee": {
      "text": "Brenda Jones",
      "value": "1516"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101150",
    "employee": {
      "text": "Carmen Matthews",
      "value": "24"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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
    "event": "101150",
    "employee": {
      "text": "Dale Williams",
      "value": "224"
    },
    "resourceGroups": [{
      "text": "Installers",
      "value": "1"
    }],
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

export const fetchWOResources = async (woId: string, eventId: string): Promise<WOResource[]> => {
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
      const url = `${suiteletUrl}&mode=getWorkOrderResources&woId=${woId}&eventId=${eventId}&start=${start}&end=${end}`;
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
          event: item.event,
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
