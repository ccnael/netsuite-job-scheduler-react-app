
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
  },
  {
    "id": "112",
    "workorder": {
      "text": "Work Order Nov 4 - Test only",
      "value": "93"
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
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "113",
    "workorder": {
      "text": "Work Order Nov 4 - Test only",
      "value": "93"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "114",
    "workorder": {
      "text": "Work Order Nov 4 - Test only",
      "value": "93"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "234 Carlaw",
      "value": "245140"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "115",
    "workorder": {
      "text": "Work Order Nov 4 - Test only",
      "value": "93"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "22 Dundas",
      "value": "245145"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "116",
    "workorder": {
      "text": "Test Work Order - Nov 4",
      "value": "94"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101011"
    ],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "117",
    "workorder": {
      "text": "Test Work Order - Nov 4",
      "value": "94"
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
  },
  {
    "id": "118",
    "workorder": {
      "text": "Test Work Order - Nov 4",
      "value": "94"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "343 York",
      "value": "245154"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "119",
    "workorder": {
      "text": "Test Work Order - Nov 4",
      "value": "94"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "234 Carlaw",
      "value": "245140"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "12",
    "workorder": {
      "text": "Walls Installation Only",
      "value": "19"
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
    "id": "120",
    "workorder": {
      "text": "Work Order - Nov 4 Dry run",
      "value": "95"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101010"
    ],
    "address": {
      "text": "54 Tale",
      "value": "245152"
    },
    "addressDetails": "Test Details",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "121",
    "workorder": {
      "text": "Work Order - Nov 4 Dry run",
      "value": "95"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "43 Carlo",
      "value": "245153"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "122",
    "workorder": {
      "text": "Work Order - Nov 4 Dry run",
      "value": "95"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "234 Carlaw",
      "value": "245140"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "123",
    "workorder": {
      "text": "Work Order - Nov 4 Dry run",
      "value": "95"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "22 Dundas",
      "value": "245145"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "124",
    "workorder": {
      "text": "Work Order for Testing Nov 5",
      "value": "96"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101012"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "Test Address 1<br/>Test Address 1<br/>Test Address 1<br/>Test Address 1<br/>Test Address 1<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "125",
    "workorder": {
      "text": "Work Order for Testing Nov 5",
      "value": "96"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "Address 1<br/>Address 1<br/>Address 1<br/>Address 1<br/>Address 1<br/>San Francisco California 1241<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "126",
    "workorder": {
      "text": "Work Order for Testing Nov 5",
      "value": "96"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "343 York",
      "value": "245154"
    },
    "addressDetails": "Test Address 4<br/>Test Address 4<br/>Test Address 4<br/>Test Address 4<br/>Test Address 4<br/>Test Address 4 NY 121312<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "127",
    "workorder": {
      "text": "Work Order for Testing Nov 5",
      "value": "96"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "22 Dundas",
      "value": "245145"
    },
    "addressDetails": "Test Address 222<br/>Test Address 222<br/>Test Address 222<br/>Test Address 222<br/>Test Address 222<br/>Los Angeles California 211123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "128",
    "workorder": {
      "text": "Work Order for Testing Nov 5",
      "value": "96"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "234 Kristen AV",
      "value": "245146"
    },
    "addressDetails": "Test New Address<br/>Test New Address<br/>Test New Address<br/>Test New Address<br/>Test New Address<br/>Las Vegas Nevada 123131<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "129",
    "workorder": {
      "text": "Work Order for Testing Nov 5 - 2",
      "value": "97"
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
  },
  {
    "id": "13",
    "workorder": {
      "text": "Desks Installation",
      "value": "20"
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
    "id": "130",
    "workorder": {
      "text": "Work Order for Testing Nov 5 - 2",
      "value": "97"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "43 Carlo",
      "value": "245153"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "131",
    "workorder": {
      "text": "Work Order for Testing Nov 5 - 2",
      "value": "97"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "234 Kristen AV",
      "value": "245146"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "132",
    "workorder": {
      "text": "Work Order for Testing Nov 5 -3",
      "value": "98"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "343 York",
      "value": "245154"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "133",
    "workorder": {
      "text": "Furniture Installation",
      "value": "99"
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
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "134",
    "workorder": {
      "text": "Work Order Dry Run - Nov 8",
      "value": "100"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101015",
      "101016"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "135",
    "workorder": {
      "text": "Work Order Dry Run - Nov 8",
      "value": "100"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101016"
    ],
    "address": {
      "text": "54 Tale",
      "value": "245152"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "136",
    "workorder": {
      "text": "Work Order Dry Run - Nov 8",
      "value": "100"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101016"
    ],
    "address": {
      "text": "343 York",
      "value": "245154"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "137",
    "workorder": {
      "text": "Work Order Dry Run - Nov 8",
      "value": "100"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101016"
    ],
    "address": {
      "text": "234 Kristen AV",
      "value": "245146"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "138",
    "workorder": {
      "text": "Furniture Installation and Pickup",
      "value": "101"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101017",
      "101018",
      "101152"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "Test Address 1<br/>Test Address 1<br/>Test Address 1<br/>Test Address 1<br/>Test Address 1<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "139",
    "workorder": {
      "text": "Furniture Installation and Pickup - Mei",
      "value": "102"
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
    "id": "14",
    "workorder": {
      "text": "Maintenance Survey",
      "value": "21"
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
    "id": "140",
    "workorder": {
      "text": "Furniture Installation",
      "value": "103"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101028",
      "101030"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "141",
    "workorder": {
      "text": "Furniture Installation",
      "value": "103"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101030"
    ],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "12 Carlton Ave<br/>San Francisco CA 1241<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "142",
    "workorder": {
      "text": "Furniture Installation",
      "value": "103"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101030"
    ],
    "address": {
      "text": "54 Tale",
      "value": "245152"
    },
    "addressDetails": "54 Tale AV<br/>Akron OH 123123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "143",
    "workorder": {
      "text": "AV Installation Only",
      "value": "104"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101029"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "144",
    "workorder": {
      "text": "Furniture Installation",
      "value": "105"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101031",
      "101042"
    ],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "12 Carlton Ave<br/>San Francisco CA 1241<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "145",
    "workorder": {
      "text": "AV Installation",
      "value": "47"
    },
    "customer": {
      "text": "World Bank Office Furniture Installation",
      "value": "1515"
    },
    "events": [
      "100682"
    ],
    "address": {
      "text": "1701 Rollins Road",
      "value": "244931"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1515&compid=TSTDRV2617106"
  },
  {
    "id": "146",
    "workorder": {
      "text": "Install Cove Lights - Follow Up",
      "value": "107"
    },
    "customer": {
      "text": "3M",
      "value": "1397"
    },
    "events": [],
    "address": {
      "text": "4966 Hilltop Street",
      "value": "245162"
    },
    "addressDetails": "Amaya Randell<br/>3M<br/>4966 Hilltop Street<br/>Northadams MA 01247<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1397&compid=TSTDRV2617106"
  },
  {
    "id": "147",
    "workorder": {
      "text": "Furniture Installation",
      "value": "108"
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
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "148",
    "workorder": {
      "text": "Furniture Installation",
      "value": "108"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "12 Carlton Ave<br/>San Francisco CA 1241<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "149",
    "workorder": {
      "text": "Furniture Installation",
      "value": "108"
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
    "addressDetails": "54 Tale AV<br/>Akron OH 123123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "15",
    "workorder": {
      "text": "Test Work Order",
      "value": "22"
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
    "id": "150",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "customer": {
      "text": "3M",
      "value": "1397"
    },
    "events": [
      "101032",
      "101033",
      "101034"
    ],
    "address": {
      "text": "4966 Hilltop Street",
      "value": "245162"
    },
    "addressDetails": "Amaya Randell<br/>3M<br/>4966 Hilltop Street<br/>Northadams MA 01247<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1397&compid=TSTDRV2617106"
  },
  {
    "id": "151",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
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
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "152",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101035",
      "101036",
      "101037"
    ],
    "address": {
      "text": "54 Tale",
      "value": "245152"
    },
    "addressDetails": "54 Tale AV<br/>Akron OH 123123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "153",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "343 York",
      "value": "245154"
    },
    "addressDetails": "343 York AV<br/>NY 121312<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "154",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "22 Dundas",
      "value": "245145"
    },
    "addressDetails": "22 Dundas East<br/>New York  211123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "155",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "490 Richmond",
      "value": "245149"
    },
    "addressDetails": "490 Richmond Lane<br/>San Francisco CA 12311<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "16",
    "workorder": {
      "text": "Test Work Order",
      "value": "23"
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
    "id": "163",
    "workorder": {
      "text": "Install AC",
      "value": "110"
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
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "164",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "12 Carlton Ave<br/>San Francisco CA 1241<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "165",
    "workorder": {
      "text": "Install AC",
      "value": "110"
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
    "addressDetails": "54 Tale AV<br/>Akron OH 123123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "166",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "43 Carlo",
      "value": "245153"
    },
    "addressDetails": "432 Carlo AV<br/>Vegas NV 111111<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "167",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "343 York",
      "value": "245154"
    },
    "addressDetails": "343 York AV<br/>NY 121312<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "168",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "234 Carlaw",
      "value": "245140"
    },
    "addressDetails": "234 Carlaw LN<br/>Los Angeles NY 12414<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "169",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "22 Dundas",
      "value": "245145"
    },
    "addressDetails": "22 Dundas East<br/>New York  211123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "17",
    "workorder": {
      "text": "Test Work Order",
      "value": "24"
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
    "id": "170",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "234 Kristen AV",
      "value": "245146"
    },
    "addressDetails": "234 Kristen Av<br/>Las Vegas NV 123131<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "171",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "490 Richmond",
      "value": "245149"
    },
    "addressDetails": "490 Richmond Lane<br/>San Francisco CA 12311<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "172",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101038"
    ],
    "address": {
      "text": "44 Clinton",
      "value": "245150"
    },
    "addressDetails": "44 Clinton East<br/>Tempe AZ 12311<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "173",
    "workorder": {
      "text": "Furniture Installation",
      "value": "111"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101041"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "174",
    "workorder": {
      "text": "Furniture Installation",
      "value": "111"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "12 Carlton Ave<br/>San Francisco CA 1241<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "175",
    "workorder": {
      "text": "AV Installation",
      "value": "112"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101043",
      "101061"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "176",
    "workorder": {
      "text": "AV Installation",
      "value": "112"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101044",
      "101061"
    ],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "12 Carlton Ave<br/>San Francisco CA 1241<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "177",
    "workorder": {
      "text": "AV Installation",
      "value": "112"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101044",
      "101061"
    ],
    "address": {
      "text": "54 Tale",
      "value": "245152"
    },
    "addressDetails": "54 Tale AV<br/>Akron OH 123123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "178",
    "workorder": {
      "text": "Furniture Delivery",
      "value": "113"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101045"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "179",
    "workorder": {
      "text": "Lobby Room",
      "value": "114"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101048"
    ],
    "address": {
      "text": "54 Tale",
      "value": "245152"
    },
    "addressDetails": "54 Tale AV<br/>Akron OH 123123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "18",
    "workorder": {
      "text": "Furniture Installation",
      "value": "25"
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
    "id": "180",
    "workorder": {
      "text": "Furniture Installation",
      "value": "115"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101049",
      "101050"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "181",
    "workorder": {
      "text": "Furniture Installation",
      "value": "115"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101050"
    ],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "12 Carlton Ave<br/>San Francisco CA 1241<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "182",
    "workorder": {
      "text": "Furniture Installation",
      "value": "115"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101050"
    ],
    "address": {
      "text": "54 Tale",
      "value": "245152"
    },
    "addressDetails": "54 Tale AV<br/>Akron OH 123123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "183",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
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
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "184",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "12 Carlton Ave<br/>San Francisco CA 1241<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "185",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
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
    "addressDetails": "54 Tale AV<br/>Akron OH 123123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "186",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "43 Carlo",
      "value": "245153"
    },
    "addressDetails": "432 Carlo AV<br/>Vegas NV 111111<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "187",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "343 York",
      "value": "245154"
    },
    "addressDetails": "343 York AV<br/>NY 121312<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "188",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "234 Carlaw",
      "value": "245140"
    },
    "addressDetails": "234 Carlaw LN<br/>Los Angeles NY 12414<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "189",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "22 Dundas",
      "value": "245145"
    },
    "addressDetails": "22 Dundas East<br/>New York  211123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "19",
    "workorder": {
      "text": "Test Work Order",
      "value": "26"
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
    "id": "190",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "234 Kristen AV",
      "value": "245146"
    },
    "addressDetails": "234 Kristen Av<br/>Las Vegas NV 123131<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "191",
    "workorder": {
      "text": "Furniture Installation",
      "value": "117"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101051"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "192",
    "workorder": {
      "text": "Furniture Installation",
      "value": "117"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "12 Carlton Ave<br/>San Francisco CA 1241<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "193",
    "workorder": {
      "text": "Furniture Installation",
      "value": "117"
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
    "addressDetails": "54 Tale AV<br/>Akron OH 123123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "194",
    "workorder": {
      "text": "AV Installation",
      "value": "118"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101057"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "195",
    "workorder": {
      "text": "AV Installation",
      "value": "118"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101057"
    ],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "12 Carlton Ave<br/>San Francisco CA 1241<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "196",
    "workorder": {
      "text": "AV Installation",
      "value": "118"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101057"
    ],
    "address": {
      "text": "54 Tale",
      "value": "245152"
    },
    "addressDetails": "54 Tale AV<br/>Akron OH 123123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "197",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101052",
      "101060"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "198",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101056",
      "101060"
    ],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "12 Carlton Ave<br/>San Francisco CA 1241<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "199",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101056",
      "101060"
    ],
    "address": {
      "text": "54 Tale",
      "value": "245152"
    },
    "addressDetails": "54 Tale AV<br/>Akron OH 123123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "2",
    "workorder": {
      "text": "Installation of Furnitures",
      "value": "2"
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
    "id": "20",
    "workorder": {
      "text": "Test Work Order",
      "value": "27"
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
    "id": "200",
    "workorder": {
      "text": "Installation of Furnitures",
      "value": "120"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101054"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "201",
    "workorder": {
      "text": "Furniture Installation",
      "value": "121"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101055",
      "101072"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "202",
    "workorder": {
      "text": "World Bank_WRKORDR0001",
      "value": "122"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "12 Carlton Ave<br/>San Francisco CA 1241<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "203",
    "workorder": {
      "text": "World Bank_WRKORDR0001",
      "value": "122"
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
    "addressDetails": "54 Tale AV<br/>Akron OH 123123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "204",
    "workorder": {
      "text": "World Bank_WRKORDR0001",
      "value": "122"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "343 York",
      "value": "245154"
    },
    "addressDetails": "343 York AV<br/>NY 121312<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "205",
    "workorder": {
      "text": "World Bank_WRKORDR0001",
      "value": "122"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "22 Dundas",
      "value": "245145"
    },
    "addressDetails": "22 Dundas East<br/>New York  211123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "206",
    "workorder": {
      "text": "World Bank_WRKORDR0001",
      "value": "122"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "490 Richmond",
      "value": "245149"
    },
    "addressDetails": "490 Richmond Lane<br/>San Francisco CA 12311<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "207",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101062",
      "101076",
      "101077",
      "101078",
      "101079",
      "101080",
      "101084"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "208",
    "workorder": {
      "text": "Testing with Lean",
      "value": "124"
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
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "209",
    "workorder": {
      "text": "Lobby Area",
      "value": "125"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101085"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "21",
    "workorder": {
      "text": "Conference Table Delivery",
      "value": "28"
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
    "id": "210",
    "workorder": {
      "text": "Office Room A",
      "value": "126"
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
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "211",
    "workorder": {
      "text": "Office Room B",
      "value": "127"
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
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "212",
    "workorder": {
      "text": "Lobby Area",
      "value": "128"
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
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "213",
    "workorder": {
      "text": "Lobby Area",
      "value": "129"
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
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "214",
    "workorder": {
      "text": "Office Room A",
      "value": "130"
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
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "215",
    "workorder": {
      "text": "Lobby Area",
      "value": "131"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "12 Carlton Ave<br/>San Francisco CA 1241<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "216",
    "workorder": {
      "text": "Office Area 1",
      "value": "132"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101087"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "217",
    "workorder": {
      "text": "Office Room 2",
      "value": "133"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101086"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "218",
    "workorder": {
      "text": "Lobby Area",
      "value": "134"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "343 York",
      "value": "245154"
    },
    "addressDetails": "343 York AV<br/>NY 121312<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "219",
    "workorder": {
      "text": "Creation of New Work Order",
      "value": "135"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101095"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "22",
    "workorder": {
      "text": "Security Camera Installation",
      "value": "29"
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
    "id": "220",
    "workorder": {
      "text": "Lobby Area",
      "value": "134"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101096"
    ],
    "address": {
      "text": "343 York",
      "value": "245154"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "221",
    "workorder": {
      "text": "Lobby Area 1",
      "value": "136"
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
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "222",
    "workorder": {
      "text": "Lobby Area 1",
      "value": "136"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "931 Zetta Wells",
      "value": "245201"
    },
    "addressDetails": "World Bank<br/>931 Zetta Wells<br/>Hintzshire Colorado 25027<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "223",
    "workorder": {
      "text": "Lobby Area 1",
      "value": "136"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "95143 Roderick Brooks Apt. 545",
      "value": "245204"
    },
    "addressDetails": "World Bank<br/>95143 Roderick Brooks Apt. 545<br/>Humbertomouth Georgia 69565<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "224",
    "workorder": {
      "text": "Lobby Area 1",
      "value": "136"
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
    "addressDetails": "54 Tale AV<br/>Akron OH 123123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "23",
    "workorder": {
      "text": "Flooring Installation ",
      "value": "30"
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
    "id": "24",
    "workorder": {
      "text": "Flooring Installation",
      "value": "31"
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
    "id": "25",
    "workorder": {
      "text": "Installation of chairs",
      "value": "5"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "",
      "value": ""
    },
    "addressDetails": "United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "26",
    "workorder": {
      "text": "SLS00000621_WRKORDR001",
      "value": "32"
    },
    "customer": {
      "text": "California Airport",
      "value": "1493"
    },
    "events": [
      "100739"
    ],
    "address": {
      "text": "",
      "value": ""
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1493&compid=TSTDRV2617106"
  },
  {
    "id": "27",
    "workorder": {
      "text": "AV Installation",
      "value": "33"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100740"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "28",
    "workorder": {
      "text": "Furniture and Flooring Installation",
      "value": "34"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100767",
      "100786"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "29",
    "workorder": {
      "text": "Work Order aug 1 test",
      "value": "36"
    },
    "customer": {
      "text": "Test For site checklist",
      "value": "1888"
    },
    "events": [],
    "address": {
      "text": "",
      "value": ""
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1888&compid=TSTDRV2617106"
  },
  {
    "id": "3",
    "workorder": {
      "text": "Installation of Furnitures",
      "value": "3"
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
    "id": "30",
    "workorder": {
      "text": "Work Order aug 1 test",
      "value": "37"
    },
    "customer": {
      "text": "Test For site checklist",
      "value": "1888"
    },
    "events": [],
    "address": {
      "text": "",
      "value": ""
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1888&compid=TSTDRV2617106"
  },
  {
    "id": "31",
    "workorder": {
      "text": "Furniture Installation",
      "value": "38"
    },
    "customer": {
      "text": "Test For site checklist",
      "value": "1888"
    },
    "events": [],
    "address": {
      "text": "",
      "value": ""
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1888&compid=TSTDRV2617106"
  },
  {
    "id": "32",
    "workorder": {
      "text": "Test Site Checklist",
      "value": "39"
    },
    "customer": {
      "text": "Test For site checklist",
      "value": "1888"
    },
    "events": [],
    "address": {
      "text": "",
      "value": ""
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1888&compid=TSTDRV2617106"
  },
  {
    "id": "33",
    "workorder": {
      "text": "TESTED FOR ROLE",
      "value": "40"
    },
    "customer": {
      "text": "3M",
      "value": "1397"
    },
    "events": [],
    "address": {
      "text": "Some st.",
      "value": "244887"
    },
    "addressDetails": "3M<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1397&compid=TSTDRV2617106"
  },
  {
    "id": "34",
    "workorder": {
      "text": "TESTED FOR ROLE",
      "value": "41"
    },
    "customer": {
      "text": "3M",
      "value": "1397"
    },
    "events": [],
    "address": {
      "text": "Some st.",
      "value": "244887"
    },
    "addressDetails": "3M<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1397&compid=TSTDRV2617106"
  },
  {
    "id": "35",
    "workorder": {
      "text": "Furniture Installation",
      "value": "43"
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
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "36",
    "workorder": {
      "text": "Furniture Installation",
      "value": "44"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100787"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "37",
    "workorder": {
      "text": "Furniture Installation",
      "value": "45"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100815"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "38",
    "workorder": {
      "text": "Furniture Installation",
      "value": "46"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100778",
      "100795"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "39",
    "workorder": {
      "text": "AV Installation",
      "value": "47"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100769"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "4",
    "workorder": {
      "text": "Crates Pick up",
      "value": "4"
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
    "id": "40",
    "workorder": {
      "text": "Flooring Installation",
      "value": "48"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100777"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "41",
    "workorder": {
      "text": "Work Order Test - Sept 12 - Mei",
      "value": "49"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100782"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "Chad Bass<br/>AB&I Holdings<br/>1701 Rollins Road<br/>Sacramento CA 94207<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "42",
    "workorder": {
      "text": "Furniture Installation",
      "value": "58"
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
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "43",
    "workorder": {
      "text": "Furniture Installation",
      "value": "59"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100803"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "44",
    "workorder": {
      "text": "Furniture Installation",
      "value": "60"
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
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "45",
    "workorder": {
      "text": "Furniture Installation",
      "value": "61"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100813"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "46",
    "workorder": {
      "text": "test site test",
      "value": "63"
    },
    "customer": {
      "text": "Pravallika",
      "value": "2008"
    },
    "events": [],
    "address": {
      "text": "",
      "value": ""
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=2008&compid=TSTDRV2617106"
  },
  {
    "id": "48",
    "workorder": {
      "text": "",
      "value": ""
    },
    "customer": {
      "text": "",
      "value": ""
    },
    "events": [],
    "address": {
      "text": "",
      "value": ""
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?stage=CUSTOMER&compid=TSTDRV2617106"
  },
  {
    "id": "49",
    "workorder": {
      "text": "TEST XYZ",
      "value": "65"
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
    "id": "5",
    "workorder": {
      "text": "Install Walls",
      "value": "7"
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
    "id": "50",
    "workorder": {
      "text": "Furniture Installation",
      "value": "66"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100960"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "51",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100853",
      "100855",
      "100860",
      "100861",
      "100862",
      "100863",
      "100864",
      "100865",
      "100866",
      "100867",
      "100868",
      "100869",
      "100870",
      "100871",
      "100876"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "56",
    "workorder": {
      "text": "Test Work Order 3",
      "value": "78"
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
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "57",
    "workorder": {
      "text": "FOP User Guide ",
      "value": "80"
    },
    "customer": {
      "text": "Deloitte New York",
      "value": "2024"
    },
    "events": [
      "100874"
    ],
    "address": {
      "text": "MSN Street",
      "value": "245137"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=2024&compid=TSTDRV2617106"
  },
  {
    "id": "58",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "customer": {
      "text": "Deloitte New York",
      "value": "2024"
    },
    "events": [
      "100875"
    ],
    "address": {
      "text": "MSN Street",
      "value": "245137"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=2024&compid=TSTDRV2617106"
  },
  {
    "id": "59",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100903",
      "100906"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "6",
    "workorder": {
      "text": "Walls Installation",
      "value": "13"
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
    "id": "60",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100912",
      "100956"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "61",
    "workorder": {
      "text": "Test Work order",
      "value": "84"
    },
    "customer": {
      "text": "Deloitte New York",
      "value": "2024"
    },
    "events": [],
    "address": {
      "text": "MSN Street",
      "value": "245137"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=2024&compid=TSTDRV2617106"
  },
  {
    "id": "62",
    "workorder": {
      "text": "Furniture Installation",
      "value": "85"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100922",
      "100923",
      "100924"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "63",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100927"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "64",
    "workorder": {
      "text": "1 Oct Test Work Order",
      "value": "72"
    },
    "customer": {
      "text": "",
      "value": ""
    },
    "events": [
      "100930"
    ],
    "address": {
      "text": "",
      "value": ""
    },
    "addressDetails": "H-112 New York",
    "customerUrl": "/app/common/entity/custjob.nl?stage=CUSTOMER&compid=TSTDRV2617106"
  },
  {
    "id": "7",
    "workorder": {
      "text": "Install Walls",
      "value": "14"
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
    "id": "75",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
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
    "addressDetails": "434 Carlaw Road<br/>Los Angeles NY 12412<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "76",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
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
    "addressDetails": "54 Tale AV<br/>Akron OH 123123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "77",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "43 Carlo",
      "value": "245153"
    },
    "addressDetails": "432 Carlo AV<br/>Vegas NV 111111<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "78",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "234 Kristen AV",
      "value": "245146"
    },
    "addressDetails": "234 Kristen Av<br/>Las Vegas NV 123131<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "79",
    "workorder": {
      "text": "Test Dry Run Oct 31",
      "value": "88"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "100959"
    ],
    "address": {
      "text": "434 Carlaw",
      "value": "244878"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "8",
    "workorder": {
      "text": "Drop off and Walls Installation",
      "value": "15"
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
    "id": "80",
    "workorder": {
      "text": "Test Dry Run Oct 31",
      "value": "88"
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
  },
  {
    "id": "81",
    "workorder": {
      "text": "Test Dry Run Oct 31",
      "value": "88"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "43 Carlo",
      "value": "245153"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "87",
    "workorder": {
      "text": "Test WO",
      "value": "90"
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
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "88",
    "workorder": {
      "text": "Test WO",
      "value": "90"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "9",
    "workorder": {
      "text": "Install Walls",
      "value": "16"
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
    "id": "95",
    "workorder": {
      "text": "Work Order - Oct 31",
      "value": "91"
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
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "96",
    "workorder": {
      "text": "Work Order - Oct 31",
      "value": "91"
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
  },
  {
    "id": "97",
    "workorder": {
      "text": "Work Order - Oct 31",
      "value": "91"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "43 Carlo",
      "value": "245153"
    },
    "addressDetails": "",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "235",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101236"
    ],
    "address": {
      "text": "22 Dundas",
      "value": "245145"
    },
    "addressDetails": "12 Carlton Ave\r<br/>San Francisco CA 1241\r<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "228",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101132",
      "101229"
    ],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "12 Carlton Ave<br/>San Francisco CA 1241<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "231",
    "workorder": {
      "text": "Product Core Testing - 2",
      "value": "140"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101134",
      "101146"
    ],
    "address": {
      "text": "12 Carlton Av",
      "value": "245148"
    },
    "addressDetails": "12 Carlton Ave<br/>San Francisco CA 1241<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "230",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101149",
      "101150"
    ],
    "address": {
      "text": "22 Rave",
      "value": "245141"
    },
    "addressDetails": "22 Rave Lane<br/>Los Angeles NY 12414<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "229",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101133"
    ],
    "address": {
      "text": "2928 Elna Throughway",
      "value": "245197"
    },
    "addressDetails": "World Bank<br/>2928 Elna Throughway<br/>Port Austynburgh ND 58542<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "234",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101138"
    ],
    "address": {
      "text": "343 York",
      "value": "245154"
    },
    "addressDetails": "343 York AV<br/>NY 121312<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "227",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101121",
      "101122",
      "101123",
      "101124"
    ],
    "address": {
      "text": "43 Carlo",
      "value": "245153"
    },
    "addressDetails": "432 Carlo AV<br/>Vegas NV 111111<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "233",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101140"
    ],
    "address": {
      "text": "54 Tale",
      "value": "245152"
    },
    "addressDetails": "54 Tale AV<br/>Akron OH 123123<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "226",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101121",
      "101122"
    ],
    "address": {
      "text": "8190 Sandra Corner Suite 134",
      "value": "245202"
    },
    "addressDetails": "World Bank<br/>8190 Sandra Corner Suite 134<br/>New Deontemouth Colorado 94326<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "225",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [
      "101121",
      "101122",
      "101126"
    ],
    "address": {
      "text": "931 Zetta Wells",
      "value": "245201"
    },
    "addressDetails": "World Bank<br/>931 Zetta Wells<br/>Hintzshire Colorado 25027<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  },
  {
    "id": "232",
    "workorder": {
      "text": "Product Core Testing - 2",
      "value": "140"
    },
    "customer": {
      "text": "World Bank",
      "value": "1249"
    },
    "events": [],
    "address": {
      "text": "95143 Roderick Brooks Apt. 545",
      "value": "245204"
    },
    "addressDetails": "World Bank<br/>95143 Roderick Brooks Apt. 545<br/>Humbertomouth Georgia 69565<br/>United States",
    "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
  }
];

export const fetchWOAddresses = async (woId: string, eventId: string): Promise<WOAddress[]> => {
  if (isLocalDevelopment()) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(woId ? mockWOAddresses.filter(x => x.workorder.value == woId) : mockWOAddresses), 500);
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
