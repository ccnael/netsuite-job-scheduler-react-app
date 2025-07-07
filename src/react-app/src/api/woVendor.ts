
import { suiteletUrl } from '@/lib/constants';
import { isLocalDevelopment } from '@/lib/helpers';

export interface WOVendor {
  id: string;
  name: string;
  vendor: {
    text: string;
    value: string;
  };
  url: string;
  email: string;
  initials: string;
  workorder: {
    text: string;
    value: string;
  };
  event: string;
  quantityRequired: number;
  quantityAvailable: number;
  purchaseOrder: {
    text: string;
    value: string;
  };
  amount: number;
  active: boolean;
  woVendor: boolean;
  memo: string;
  time: {
    start: string;
    end: string;
  };
}

// Mockup data for local development
const mockWOVendors: WOVendor[] = [{
    "id": "1",
    "name": "1",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Flooring Installation",
      "value": "48"
    },
    "event": "",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "10",
    "name": "10",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "event": "100875",
    "quantityRequired": 0,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "100",
    "name": "100",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100953",
    "quantityRequired": 2,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "101",
    "name": "101",
    "vendor": {
      "text": "CFI Furniture Inc.",
      "value": "1661"
    },
    "url": "",
    "email": "login+plural@erpsuccesspartners.com",
    "initials": "CF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100953",
    "quantityRequired": 20,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "102",
    "name": "102",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100954",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "106",
    "name": "106",
    "vendor": {
      "text": "",
      "value": ""
    },
    "url": "",
    "email": "",
    "initials": "",
    "workorder": {
      "text": "Test Dry Run Oct 31",
      "value": "88"
    },
    "event": "100959",
    "quantityRequired": 0,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "107",
    "name": "107",
    "vendor": {
      "text": "",
      "value": ""
    },
    "url": "",
    "email": "",
    "initials": "",
    "workorder": {
      "text": "Test Dry Run Oct 31",
      "value": "88"
    },
    "event": "100959",
    "quantityRequired": 0,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "11",
    "name": "11",
    "vendor": {
      "text": "CFI Furniture Inc.",
      "value": "1661"
    },
    "url": "",
    "email": "login+plural@erpsuccesspartners.com",
    "initials": "CF",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "event": "100875",
    "quantityRequired": 0,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "12",
    "name": "12",
    "vendor": {
      "text": "Computer Depot Pacific",
      "value": "965"
    },
    "url": "http://www.cdp.com",
    "email": "payables@cdp.com",
    "initials": "CD",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "event": "100875",
    "quantityRequired": 2,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "125",
    "name": "125",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order - Oct 31 - Test 1",
      "value": "92"
    },
    "event": "101006",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "Test Event Lead Installer",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "126",
    "name": "126",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order - Oct 31 - Test 1",
      "value": "92"
    },
    "event": "101007",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "Test Event 1",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "127",
    "name": "127",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order - Oct 31 - Test 1",
      "value": "92"
    },
    "event": "101008",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "Test Event 2",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "128",
    "name": "128",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Work Order - Oct 31 - Test 1",
      "value": "92"
    },
    "event": "101008",
    "quantityRequired": 2,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "Test Event 2",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "13",
    "name": "13",
    "vendor": {
      "text": "Haworth, Inc.",
      "value": "1664"
    },
    "url": "",
    "email": "login+cbi2@erpsuccesspartners.com",
    "initials": "HI",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "event": "100875",
    "quantityRequired": 0,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "130",
    "name": "130",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order - Nov 4 Dry run",
      "value": "95"
    },
    "event": "101010",
    "quantityRequired": 15,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "Work Order Event - Nov 4 Dry run - test",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "131",
    "name": "131",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Work Order - Nov 4 Dry run",
      "value": "95"
    },
    "event": "101010",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "Work Order Event - Nov 4 Dry run",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "14",
    "name": "14",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100876",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "140",
    "name": "140",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Test Work Order - Nov 4",
      "value": "94"
    },
    "event": "101011",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "555",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "143",
    "name": "143",
    "vendor": {
      "text": "Computer Depot Pacific",
      "value": "965"
    },
    "url": "http://www.cdp.com",
    "email": "payables@cdp.com",
    "initials": "CD",
    "workorder": {
      "text": "Test Work Order - Nov 4",
      "value": "94"
    },
    "event": "101011",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "555",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "144",
    "name": "144",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order for Testing Nov 5",
      "value": "96"
    },
    "event": "101012",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "Test Event 1",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "145",
    "name": "145",
    "vendor": {
      "text": "CFI Furniture Inc.",
      "value": "1661"
    },
    "url": "",
    "email": "login+plural@erpsuccesspartners.com",
    "initials": "CF",
    "workorder": {
      "text": "Work Order for Testing Nov 5",
      "value": "96"
    },
    "event": "101012",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "Test Event 1",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "15",
    "name": "15",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100877",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "158",
    "name": "158",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Dry Run - Nov 8",
      "value": "100"
    },
    "event": "101015",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "This is a test",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "16",
    "name": "16",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100878",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "164",
    "name": "164",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "103"
    },
    "event": "101028",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "17",
    "name": "17",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100879",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "175",
    "name": "175",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "event": "101040",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "178",
    "name": "178",
    "vendor": {
      "text": "CFI Furniture Inc.",
      "value": "1661"
    },
    "url": "",
    "email": "login+plural@erpsuccesspartners.com",
    "initials": "CF",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "event": "101037",
    "quantityRequired": 2,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "180",
    "name": "180",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "121"
    },
    "event": "101055",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "189",
    "name": "189",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "event": "101062",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "19",
    "name": "19",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100880",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "191",
    "name": "191",
    "vendor": {
      "text": "CFI Furniture Inc.",
      "value": "1661"
    },
    "url": "",
    "email": "login+plural@erpsuccesspartners.com",
    "initials": "CF",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "event": "101082",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "192",
    "name": "192",
    "vendor": {
      "text": "CFI Furniture Inc.",
      "value": "1661"
    },
    "url": "",
    "email": "login+plural@erpsuccesspartners.com",
    "initials": "CF",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "event": "101083",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "193",
    "name": "193",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "event": "101084",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "2",
    "name": "2",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "61"
    },
    "event": "",
    "quantityRequired": 0,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "20",
    "name": "20",
    "vendor": {
      "text": "CFI Furniture Inc.",
      "value": "1661"
    },
    "url": "",
    "email": "login+plural@erpsuccesspartners.com",
    "initials": "CF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100880",
    "quantityRequired": 10,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "21",
    "name": "21",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100881",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "22",
    "name": "22",
    "vendor": {
      "text": "CFI Furniture Inc.",
      "value": "1661"
    },
    "url": "",
    "email": "login+plural@erpsuccesspartners.com",
    "initials": "CF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100881",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "225",
    "name": "225",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "event": "101150",
    "quantityRequired": 3,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "Need manpower equipped with carpentry skills",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "23",
    "name": "23",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100882",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "24",
    "name": "24",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100883",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "25",
    "name": "25",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100884",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "26",
    "name": "26",
    "vendor": {
      "text": "CFI Furniture Inc.",
      "value": "1661"
    },
    "url": "",
    "email": "login+plural@erpsuccesspartners.com",
    "initials": "CF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100884",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "27",
    "name": "27",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100885",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "28",
    "name": "28",
    "vendor": {
      "text": "Computer Depot Pacific",
      "value": "965"
    },
    "url": "http://www.cdp.com",
    "email": "payables@cdp.com",
    "initials": "CD",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100885",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "29",
    "name": "29",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100886",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "3",
    "name": "3",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "30",
    "name": "30",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100887",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "31",
    "name": "31",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100887",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "32",
    "name": "32",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100888",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "33",
    "name": "33",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100889",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "34",
    "name": "34",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100890",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "35",
    "name": "35",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100891",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "39",
    "name": "39",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100899",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "4",
    "name": "4",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "40",
    "name": "40",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100900",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "41",
    "name": "41",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100901",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "42",
    "name": "42",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100902",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "43",
    "name": "43",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100903",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "44",
    "name": "44",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100904",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "45",
    "name": "45",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100905",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "46",
    "name": "46",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "event": "100906",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "48",
    "name": "48",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "event": "100912",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "49",
    "name": "49",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "event": "100913",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "5",
    "name": "5",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "50",
    "name": "50",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "event": "100915",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "51",
    "name": "51",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "event": "100916",
    "quantityRequired": 10,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "52",
    "name": "52",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "85"
    },
    "event": "100922",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "53",
    "name": "53",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "85"
    },
    "event": "100923",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "54",
    "name": "54",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "85"
    },
    "event": "100924",
    "quantityRequired": 10,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "55",
    "name": "55",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "100927",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "56",
    "name": "56",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100931",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "57",
    "name": "57",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100931",
    "quantityRequired": 20,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "58",
    "name": "58",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100932",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "59",
    "name": "59",
    "vendor": {
      "text": "CFI Furniture Inc.",
      "value": "1661"
    },
    "url": "",
    "email": "login+plural@erpsuccesspartners.com",
    "initials": "CF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100932",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "6",
    "name": "6",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100870",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "60",
    "name": "60",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100933",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "61",
    "name": "61",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100933",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "7",
    "name": "7",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "event": "100871",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "8",
    "name": "8",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "FOP User Guide ",
      "value": "80"
    },
    "event": "100874",
    "quantityRequired": 0,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "9",
    "name": "9",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "event": "100875",
    "quantityRequired": 0,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "94",
    "name": "94",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100950",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "95",
    "name": "95",
    "vendor": {
      "text": "CFI Furniture Inc.",
      "value": "1661"
    },
    "url": "",
    "email": "login+plural@erpsuccesspartners.com",
    "initials": "CF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100950",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "98",
    "name": "98",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100952",
    "quantityRequired": 2,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "99",
    "name": "99",
    "vendor": {
      "text": "CFI Furniture Inc.",
      "value": "1661"
    },
    "url": "",
    "email": "login+plural@erpsuccesspartners.com",
    "initials": "CF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "event": "100952",
    "quantityRequired": 20,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "151",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "1"
    },
    "event": "100682",
    "quantityRequired": 0,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "146",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "39",
    "quantityRequired": 2,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "153",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "20",
    "quantityRequired": 11,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "97",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "100951",
    "quantityRequired": 0,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "122",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101005",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "ASDASD",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "200",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101102",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "123\n456",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "120",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101004",
    "quantityRequired": 3,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "TEST12345",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "67",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "100939",
    "quantityRequired": 2,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "123\n456",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "222",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101147",
    "quantityRequired": 0,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "A",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "195",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Office Area 1",
      "value": "132"
    },
    "event": "101087",
    "quantityRequired": 3,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "test",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "161",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation and Pickup",
      "value": "101"
    },
    "event": "101017",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "198",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Creation of New Work Order",
      "value": "135"
    },
    "event": "101095",
    "quantityRequired": 3,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "AAA\nBBB",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "194",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "event": "101084",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "188",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "event": "101075",
    "quantityRequired": 0,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "220",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "event": "101132",
    "quantityRequired": 3,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "123\n456",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "182",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "AV Installation",
      "value": "118"
    },
    "event": "101057",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "TEST\n111",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "181",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "event": "101056",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "213",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "event": "101122",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "TEST\n123",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "159",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "66"
    },
    "event": "100968",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "124",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "101003",
    "quantityRequired": 3,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "a\na\na\na",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "86",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "100947",
    "quantityRequired": 0,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "74",
    "name": "Best Fixture, Inc.",
    "vendor": {
      "text": "Best Fixture, Inc.",
      "value": "12"
    },
    "url": "",
    "email": "",
    "initials": "BF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "100942",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "221",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "event": "101132",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "ABC\nDEF",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "155",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "1"
    },
    "event": "100682",
    "quantityRequired": 2,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "147",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "39",
    "quantityRequired": 2,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "157",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "6",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "96",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "100951",
    "quantityRequired": 2,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "104",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "event": "100956",
    "quantityRequired": 3,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "199",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Creation of New Work Order",
      "value": "135"
    },
    "event": "101095",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "CCC\nDDD",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "113",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "66"
    },
    "event": "100968",
    "quantityRequired": 4,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "CCC\nDDDD\nEE",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "108",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "66"
    },
    "event": "100960",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "115",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "100970",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "TEST",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "103",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "100955",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "83",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "100945",
    "quantityRequired": 4,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "66",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "100938",
    "quantityRequired": 4,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "68",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "100939",
    "quantityRequired": 0,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "87",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "100947",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "123",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101005",
    "quantityRequired": 3,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "85",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "100946",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "75",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "100942",
    "quantityRequired": 2,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "114",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "100969",
    "quantityRequired": 5,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "AAA\nBBB",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "223",
    "name": "Bridgepoint Industries",
    "vendor": {
      "text": "Bridgepoint Industries",
      "value": "1473"
    },
    "url": "http://www.bridgepointindustries.com.de",
    "email": "support@bridgempointindustries.com.de",
    "initials": "BI",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101147",
    "quantityRequired": 0,
    "quantityAvailable": 20,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": true,
    "woVendor": true,
    "memo": "B",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "184",
    "name": "CFI Furniture Inc.",
    "vendor": {
      "text": "CFI Furniture Inc.",
      "value": "1661"
    },
    "url": "",
    "email": "login+plural@erpsuccesspartners.com",
    "initials": "CF",
    "workorder": {
      "text": "AV Installation",
      "value": "112"
    },
    "event": "101061",
    "quantityRequired": 0,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "148",
    "name": "CFI Furniture Inc.",
    "vendor": {
      "text": "CFI Furniture Inc.",
      "value": "1661"
    },
    "url": "",
    "email": "login+plural@erpsuccesspartners.com",
    "initials": "CF",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "39",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "224",
    "name": "CFI Furniture Inc.",
    "vendor": {
      "text": "CFI Furniture Inc.",
      "value": "1661"
    },
    "url": "",
    "email": "login+plural@erpsuccesspartners.com",
    "initials": "CF",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "101147",
    "quantityRequired": 8,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "183",
    "name": "CFI Furniture Inc.",
    "vendor": {
      "text": "CFI Furniture Inc.",
      "value": "1661"
    },
    "url": "",
    "email": "login+plural@erpsuccesspartners.com",
    "initials": "CF",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "event": "101060",
    "quantityRequired": 2,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "149",
    "name": "Computer Depot Pacific",
    "vendor": {
      "text": "Computer Depot Pacific",
      "value": "965"
    },
    "url": "http://www.cdp.com",
    "email": "payables@cdp.com",
    "initials": "CD",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "39",
    "quantityRequired": 2,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "69",
    "name": "Computer Depot Pacific",
    "vendor": {
      "text": "Computer Depot Pacific",
      "value": "965"
    },
    "url": "http://www.cdp.com",
    "email": "payables@cdp.com",
    "initials": "CD",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "100940",
    "quantityRequired": 1,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "156",
    "name": "Computer Depot Pacific",
    "vendor": {
      "text": "Computer Depot Pacific",
      "value": "965"
    },
    "url": "http://www.cdp.com",
    "email": "payables@cdp.com",
    "initials": "CD",
    "workorder": {
      "text": "SLS00000621_WRKORDR001",
      "value": "32"
    },
    "event": "100739",
    "quantityRequired": 5,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "AAA",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "70",
    "name": "Haworth, Inc.",
    "vendor": {
      "text": "Haworth, Inc.",
      "value": "1664"
    },
    "url": "",
    "email": "login+cbi2@erpsuccesspartners.com",
    "initials": "HI",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "event": "100940",
    "quantityRequired": 0,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "163",
    "name": "Haworth, Inc.",
    "vendor": {
      "text": "Haworth, Inc.",
      "value": "1664"
    },
    "url": "",
    "email": "login+cbi2@erpsuccesspartners.com",
    "initials": "HI",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "100939",
    "quantityRequired": 0,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "150",
    "name": "Haworth, Inc.",
    "vendor": {
      "text": "Haworth, Inc.",
      "value": "1664"
    },
    "url": "",
    "email": "login+cbi2@erpsuccesspartners.com",
    "initials": "HI",
    "workorder": {
      "text": "",
      "value": ""
    },
    "event": "39",
    "quantityRequired": 0,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  },
  {
    "id": "18",
    "name": "TEST VENDOR",
    "vendor": {
      "text": "Template - Sales Person",
      "value": "1"
    },
    "url": "",
    "email": "",
    "initials": "TS",
    "workorder": {
      "text": "Work Order Test 4",
      "value": "79"
    },
    "event": "",
    "quantityRequired": 0,
    "quantityAvailable": 0,
    "purchaseOrder": {
      "text": " ",
      "value": ""
    },
    "amount": 0,
    "active": false,
    "woVendor": true,
    "memo": "",
    "time": {
      "start": "",
      "end": ""
    }
  }
];

export const fetchWOVendors = async (woId: string, eventId: string): Promise<WOVendor[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock woVendor data for local development');
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockWOVendors), 500);
    });
  }

  try {
    console.log('WOVendor: Starting to fetch work order vendors');
    
    let allData: WOVendor[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&mode=getWorkOrderVendors&woId=${woId}&eventId=${eventId}&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`WOVendor service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch work order vendors chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`WOVendor service RESULT chunk ${i + 1}:`, chunkData);
      
      if (!chunkData || chunkData.length === 0) {
        hasMoreData = false;
      } else {
        const processedChunk: WOVendor[] = chunkData.map((item: any) => {
          return {
            id: item.id || '',
            name: item.name || '',
            vendor: {
              text: item.vendor?.text || '',
              value: item.vendor?.value || ''
            },
            url: item.url || '',
            email: item.email || '',
            initials: item.initials,
            workorder: {
              text: item.workorder?.text || '',
              value: item.workorder?.value || ''
            },
            event: item.event || '',
            quantityRequired: Number(item.quantityRequired) || 0,
            quantityAvailable: Number(item.quantityAvailable) || 0,
            purchaseOrder: {
              text: item.purchaseOrder?.text || '',
              value: item.purchaseOrder?.value || ''
            },
            amount: Number(item.amount) || 0,
            active: Boolean(item.active),
            woVendor: true,
            memo: item.memo || '',
            time: {
              start: '',
              end: ''
            }
          };
        });

        allData = [...allData, ...processedChunk];

        if (chunkData.length < chunkSize) {
          hasMoreData = false;
        }
      }
      
      i++;
    }
    
    console.log(`Finished chunked fetch. Total work order vendor records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no work order vendor data across all chunks");
      throw new Error("No work order vendor data returned from API");
    }

    return allData;

  } catch (error) {
    console.error('WOVendor: Error fetching work order vendors:', error);
    throw error;
  }
};
