
import { suiteletUrl } from '@/lib/constants';
import { isLocalDevelopment } from '@/lib/helpers';

export interface WOContact {
  id: string;
  workorder: {
    text: string;
    value: string;
  };
  events: string[];
  event: string;
  contact: {
    text: string;
    value: string;
  };
  name: string;
  email: string;
  jobTitle: string;
  mobilePhone: string;
  phone: string;
  primary: boolean;
  url: string;
}

// Mockup data for local development
const mockWOContacts: WOContact[] = [{
    "id": "233",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [
      "101211"
    ],
    "event": "101211",
    "contact": {
      "text": "World Bank : Harry Osborn",
      "value": "2064"
    },
    "name": "Harry Osborn",
    "email": "hosborn@email.com",
    "jobTitle": "VP",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2064&compid=TSTDRV2617106"
  },
  {
    "id": "234",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [
      "101211"
    ],
    "event": "101211",
    "contact": {
      "text": "World Bank : Jane Doe",
      "value": "2054"
    },
    "name": "Jane Doe",
    "email": "janedoe@email.com",
    "jobTitle": "Purchasing Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2054&compid=TSTDRV2617106"
  },
  {
    "id": "235",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [
      "101211"
    ],
    "event": "101211",
    "contact": {
      "text": "World Bank : Harry Osborn",
      "value": "2064"
    },
    "name": "Harry Osborn",
    "email": "hosborn@email.com",
    "jobTitle": "VP",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2064&compid=TSTDRV2617106"
  },
  {
    "id": "236",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [
      "101211"
    ],
    "event": "101211",
    "contact": {
      "text": "World Bank : Jane Doe",
      "value": "2054"
    },
    "name": "Jane Doe",
    "email": "janedoe@email.com",
    "jobTitle": "Purchasing Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2054&compid=TSTDRV2617106"
  },
  {
    "id": "237",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [
      "101212"
    ],
    "event": "101212",
    "contact": {
      "text": "World Bank : Harry Osborn",
      "value": "2064"
    },
    "name": "Harry Osborn",
    "email": "hosborn@email.com",
    "jobTitle": "VP",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2064&compid=TSTDRV2617106"
  },
  {
    "id": "238",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [
      "101212"
    ],
    "event": "101212",
    "contact": {
      "text": "World Bank : Jane Doe",
      "value": "2054"
    },
    "name": "Jane Doe",
    "email": "janedoe@email.com",
    "jobTitle": "Purchasing Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2054&compid=TSTDRV2617106"
  },
  {
    "id": "259",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [
      "101227"
    ],
    "event": "101227",
    "contact": {
      "text": "World Bank : Harry Osborn",
      "value": "2064"
    },
    "name": "Harry Osborn",
    "email": "hosborn@email.com",
    "jobTitle": "VP",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2064&compid=TSTDRV2617106"
  },
  {
    "id": "260",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [
      "101227"
    ],
    "event": "101227",
    "contact": {
      "text": "World Bank : Jane Doe",
      "value": "2054"
    },
    "name": "Jane Doe",
    "email": "janedoe@email.com",
    "jobTitle": "Purchasing Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2054&compid=TSTDRV2617106"
  },
  {
    "id": "263",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [
      "101229"
    ],
    "event": "101229",
    "contact": {
      "text": "World Bank : Harry Osborn",
      "value": "2064"
    },
    "name": "Harry Osborn",
    "email": "hosborn@email.com",
    "jobTitle": "VP",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2064&compid=TSTDRV2617106"
  },
  {
    "id": "265",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [
      "101229"
    ],
    "event": "101229",
    "contact": {
      "text": "World Bank : Jane Doe",
      "value": "2054"
    },
    "name": "Jane Doe",
    "email": "janedoe@email.com",
    "jobTitle": "Purchasing Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2054&compid=TSTDRV2617106"
  },
  {
    "id": "268",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [
      "101235"
    ],
    "event": "101235",
    "contact": {
      "text": "World Bank : Harry Osborn",
      "value": "2064"
    },
    "name": "Harry Osborn",
    "email": "hosborn@email.com",
    "jobTitle": "VP",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2064&compid=TSTDRV2617106"
  },
  {
    "id": "269",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [
      "101235"
    ],
    "event": "101235",
    "contact": {
      "text": "World Bank : Jane Doe",
      "value": "2054"
    },
    "name": "Jane Doe",
    "email": "janedoe@email.com",
    "jobTitle": "Purchasing Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2054&compid=TSTDRV2617106"
  },
  {
    "id": "270",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [
      "101236"
    ],
    "event": "101236",
    "contact": {
      "text": "World Bank : Harry Osborn",
      "value": "2064"
    },
    "name": "Harry Osborn",
    "email": "hosborn@email.com",
    "jobTitle": "VP",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2064&compid=TSTDRV2617106"
  },
  {
    "id": "271",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [
      "101236"
    ],
    "event": "101236",
    "contact": {
      "text": "World Bank : Jane Doe",
      "value": "2054"
    },
    "name": "Jane Doe",
    "email": "janedoe@email.com",
    "jobTitle": "Purchasing Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2054&compid=TSTDRV2617106"
  },
  {
    "id": "1",
    "workorder": {
      "text": "Furniture Installation",
      "value": "1"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "2",
    "workorder": {
      "text": "Installation of Furnitures",
      "value": "2"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "3",
    "workorder": {
      "text": "Installation of Furnitures",
      "value": "3"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "4",
    "workorder": {
      "text": "Crates Pick up",
      "value": "4"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "5",
    "workorder": {
      "text": "Install Walls",
      "value": "7"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "6",
    "workorder": {
      "text": "Install Walls",
      "value": "12"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "7",
    "workorder": {
      "text": "Walls Installation",
      "value": "13"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "8",
    "workorder": {
      "text": "Install Walls",
      "value": "14"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "9",
    "workorder": {
      "text": "Drop off and Walls Installation",
      "value": "15"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "10",
    "workorder": {
      "text": "Conference Table Delivery",
      "value": "28"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "11",
    "workorder": {
      "text": "Security Camera Installation",
      "value": "29"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "12",
    "workorder": {
      "text": "Flooring Installation ",
      "value": "30"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "13",
    "workorder": {
      "text": "Flooring Installation",
      "value": "31"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "14",
    "workorder": {
      "text": "AV Installation",
      "value": "33"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "15",
    "workorder": {
      "text": "Furniture Installation",
      "value": "1"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "Pravallika Desetty",
      "value": "1648"
    },
    "name": "Pravallika Desetty",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1648&compid=TSTDRV2617106"
  },
  {
    "id": "16",
    "workorder": {
      "text": "Furniture and Flooring Installation",
      "value": "34"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "18",
    "workorder": {
      "text": "Work Order Sample aug1",
      "value": "35"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "",
      "value": ""
    },
    "name": "Test",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "Developer",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?compid=TSTDRV2617106"
  },
  {
    "id": "19",
    "workorder": {
      "text": "Work Order Sample aug1",
      "value": "35"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "21",
    "workorder": {
      "text": "Work Order aug 1 test",
      "value": "37"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "Test For site checklist : Test WO Contact",
      "value": "1889"
    },
    "name": "Test WO Contact",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "Developer",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1889&compid=TSTDRV2617106"
  },
  {
    "id": "23",
    "workorder": {
      "text": "TESTED FOR ROLE",
      "value": "40"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "3M : James Smith",
      "value": "1559"
    },
    "name": "James Smith",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1559&compid=TSTDRV2617106"
  },
  {
    "id": "25",
    "workorder": {
      "text": "Furniture Installation",
      "value": "43"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "26",
    "workorder": {
      "text": "Furniture Installation",
      "value": "44"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "27",
    "workorder": {
      "text": "Furniture Installation",
      "value": "45"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "28",
    "workorder": {
      "text": "Furniture Installation",
      "value": "46"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "29",
    "workorder": {
      "text": "AV Installation",
      "value": "47"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "30",
    "workorder": {
      "text": "Flooring Installation",
      "value": "48"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "33",
    "workorder": {
      "text": "Work Order Test - Sept 12 - Mei",
      "value": "49"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "37",
    "workorder": {
      "text": "Test Site Checklist",
      "value": "39"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "Test For site checklist : Test WO Contact",
      "value": "1889"
    },
    "name": "Test WO Contact",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "Developer",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1889&compid=TSTDRV2617106"
  },
  {
    "id": "40",
    "workorder": {
      "text": "Furniture Installation",
      "value": "57"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "41",
    "workorder": {
      "text": "Furniture Installation",
      "value": "58"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "42",
    "workorder": {
      "text": "Furniture Installation",
      "value": "59"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "43",
    "workorder": {
      "text": "Furniture Installation",
      "value": "60"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "44",
    "workorder": {
      "text": "Furniture Installation",
      "value": "61"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "45",
    "workorder": {
      "text": "test site test",
      "value": "63"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "pravallika",
      "value": "2009"
    },
    "name": "pravallika",
    "email": "prava3334@gmail.com",
    "jobTitle": "developer",
    "mobilePhone": "",
    "phone": "9502123363",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2009&compid=TSTDRV2617106"
  },
  {
    "id": "46",
    "workorder": {
      "text": "TEST XYZ",
      "value": "65"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "47",
    "workorder": {
      "text": "TEST XYZ",
      "value": "65"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "48",
    "workorder": {
      "text": "Furniture Installation",
      "value": "66"
    },
    "events": [
      "100960"
    ],
    "event": "100960",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "49",
    "workorder": {
      "text": "Furniture Installation",
      "value": "66"
    },
    "events": [
      "100960"
    ],
    "event": "100960",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "50",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
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
    "event": "100853",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "51",
    "workorder": {
      "text": "",
      "value": ""
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "pravallika",
      "value": "2009"
    },
    "name": "pravallika",
    "email": "pravallismart@gmail.com",
    "jobTitle": "developer",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2009&compid=TSTDRV2617106"
  },
  {
    "id": "53",
    "workorder": {
      "text": "Test customer center",
      "value": "69"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "Deloitte New York : Pravallika Kumari",
      "value": "2025"
    },
    "name": "Pravallika Kumari",
    "email": "desettipravallika@gmail.com",
    "jobTitle": "Developer",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2025&compid=TSTDRV2617106"
  },
  {
    "id": "55",
    "workorder": {
      "text": "Crates Pick up",
      "value": "4"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "56",
    "workorder": {
      "text": "Crates Pick up",
      "value": "4"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "57",
    "workorder": {
      "text": "Crates Pick up",
      "value": "4"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "58",
    "workorder": {
      "text": "Crates Pick up",
      "value": "4"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "63",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "64",
    "workorder": {
      "text": "Test Fop Dry Run Part 2",
      "value": "75"
    },
    "events": [
      "100872"
    ],
    "event": "100872",
    "contact": {
      "text": "Deloitte New York : Pravallika Kumari",
      "value": "2025"
    },
    "name": "Pravallika Kumari",
    "email": "beatrice.q@erpsuccesspartners.com",
    "jobTitle": "Developer",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2025&compid=TSTDRV2617106"
  },
  {
    "id": "65",
    "workorder": {
      "text": "Test Work Order 3",
      "value": "78"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "66",
    "workorder": {
      "text": "",
      "value": ""
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "67",
    "workorder": {
      "text": "Work Order Test 4",
      "value": "79"
    },
    "events": [
      "100898",
      "100921"
    ],
    "event": "100898",
    "contact": {
      "text": "Lean Cendaña",
      "value": "1765"
    },
    "name": "Lean  cendana",
    "email": "lean.c@erpsuccesspartners.com",
    "jobTitle": "",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1765&compid=TSTDRV2617106"
  },
  {
    "id": "68",
    "workorder": {
      "text": "FOP User Guide ",
      "value": "80"
    },
    "events": [
      "100874"
    ],
    "event": "100874",
    "contact": {
      "text": "Deloitte New York : Pravallika Kumari",
      "value": "2025"
    },
    "name": "Pravallika Kumari",
    "email": "beatrice.q@erpsuccesspartners.com",
    "jobTitle": "Developer",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2025&compid=TSTDRV2617106"
  },
  {
    "id": "69",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "events": [
      "100875"
    ],
    "event": "100875",
    "contact": {
      "text": "Deloitte New York : Pravallika Kumari",
      "value": "2025"
    },
    "name": "Pravallika Kumari",
    "email": "beatrice.q@erpsuccesspartners.com",
    "jobTitle": "Developer",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2025&compid=TSTDRV2617106"
  },
  {
    "id": "70",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "events": [
      "100903",
      "100906"
    ],
    "event": "100903",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "71",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "events": [
      "100912",
      "100956"
    ],
    "event": "100912",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "72",
    "workorder": {
      "text": "Test Work order",
      "value": "84"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "Deloitte New York : Pravallika Kumari",
      "value": "2025"
    },
    "name": "Pravallika Kumari",
    "email": "beatrice.q@erpsuccesspartners.com",
    "jobTitle": "Developer",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=2025&compid=TSTDRV2617106"
  },
  {
    "id": "73",
    "workorder": {
      "text": "Test Work order",
      "value": "84"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "Deloitte New York : Pravallika Kumari",
      "value": "2025"
    },
    "name": "Pravallika Kumari",
    "email": "beatrice.q@erpsuccesspartners.com",
    "jobTitle": "Developer",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=2025&compid=TSTDRV2617106"
  },
  {
    "id": "74",
    "workorder": {
      "text": "Furniture Installation",
      "value": "85"
    },
    "events": [
      "100922",
      "100923",
      "100924"
    ],
    "event": "100922",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "75",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "events": [
      "100927"
    ],
    "event": "100927",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "76",
    "workorder": {
      "text": "1 Oct Test Work Order",
      "value": "72"
    },
    "events": [
      "100930"
    ],
    "event": "100930",
    "contact": {
      "text": "Arun Sharma",
      "value": "1770"
    },
    "name": "Arun Sharma",
    "email": "aruns.unlock2go@gmail.com",
    "jobTitle": "",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1770&compid=TSTDRV2617106"
  },
  {
    "id": "77",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "events": [
      "100931",
      "100932",
      "100933",
      "100950",
      "100952",
      "100953"
    ],
    "event": "100931",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "79",
    "workorder": {
      "text": "FOP User Guide ",
      "value": "80"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "Deloitte New York : Pravallika Kumari",
      "value": "2025"
    },
    "name": "Pravallika Kumari",
    "email": "beatrice.q@erpsuccesspartners.com",
    "jobTitle": "Developer",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=2025&compid=TSTDRV2617106"
  },
  {
    "id": "80",
    "workorder": {
      "text": "FOP User Guide ",
      "value": "80"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "Deloitte New York : Pravallika Kumari",
      "value": "2025"
    },
    "name": "Pravallika Kumari",
    "email": "beatrice.q@erpsuccesspartners.com",
    "jobTitle": "Developer",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=2025&compid=TSTDRV2617106"
  },
  {
    "id": "81",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "82",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "83",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "84",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "85",
    "workorder": {
      "text": "Test Dry Run Oct 31",
      "value": "88"
    },
    "events": [
      "100959"
    ],
    "event": "100959",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "88",
    "workorder": {
      "text": "Test WO",
      "value": "90"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "94",
    "workorder": {
      "text": "Work Order - Oct 31 - Test 1",
      "value": "92"
    },
    "events": [
      "101006",
      "101007"
    ],
    "event": "101006",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "95",
    "workorder": {
      "text": "Work Order - Oct 31 - Test 1",
      "value": "92"
    },
    "events": [
      "101008"
    ],
    "event": "101008",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "96",
    "workorder": {
      "text": "Work Order Nov 4 - Test only",
      "value": "93"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "97",
    "workorder": {
      "text": "Work Order Nov 4 - Test only",
      "value": "93"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "98",
    "workorder": {
      "text": "Test Work Order - Nov 4",
      "value": "94"
    },
    "events": [
      "101011"
    ],
    "event": "101011",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "99",
    "workorder": {
      "text": "Test Work Order - Nov 4",
      "value": "94"
    },
    "events": [
      "101011"
    ],
    "event": "101011",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "100",
    "workorder": {
      "text": "Work Order - Nov 4 Dry run",
      "value": "95"
    },
    "events": [
      "100682"
    ],
    "event": "100682",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "101",
    "workorder": {
      "text": "Work Order - Nov 4 Dry run",
      "value": "95"
    },
    "events": [
      "101010"
    ],
    "event": "101010",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "102",
    "workorder": {
      "text": "Work Order for Testing Nov 5",
      "value": "96"
    },
    "events": [
      "101012"
    ],
    "event": "101012",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "103",
    "workorder": {
      "text": "Work Order for Testing Nov 5",
      "value": "96"
    },
    "events": [
      "101012"
    ],
    "event": "101012",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "104",
    "workorder": {
      "text": "Work Order for Testing Nov 5 - 2",
      "value": "97"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "105",
    "workorder": {
      "text": "Work Order for Testing Nov 5 - 2",
      "value": "97"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "106",
    "workorder": {
      "text": "Work Order for Testing Nov 5 -3",
      "value": "98"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "107",
    "workorder": {
      "text": "Work Order for Testing Nov 5 -3",
      "value": "98"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "108",
    "workorder": {
      "text": "Furniture Installation",
      "value": "99"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "109",
    "workorder": {
      "text": "Furniture Installation",
      "value": "99"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "110",
    "workorder": {
      "text": "Work Order Dry Run - Nov 8",
      "value": "100"
    },
    "events": [
      "101015",
      "101016"
    ],
    "event": "101015",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "111",
    "workorder": {
      "text": "Work Order Dry Run - Nov 8",
      "value": "100"
    },
    "events": [
      "101015",
      "101016"
    ],
    "event": "101015",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "112",
    "workorder": {
      "text": "Furniture Installation and Pickup",
      "value": "101"
    },
    "events": [
      "101017",
      "101018",
      "101152"
    ],
    "event": "101017",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "113",
    "workorder": {
      "text": "Furniture Installation and Pickup",
      "value": "101"
    },
    "events": [
      "101017",
      "101018"
    ],
    "event": "101017",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "114",
    "workorder": {
      "text": "Furniture Installation and Pickup - Mei",
      "value": "102"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "115",
    "workorder": {
      "text": "Furniture Installation and Pickup - Mei",
      "value": "102"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "116",
    "workorder": {
      "text": "Desks Installation",
      "value": "20"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@sbi.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "117",
    "workorder": {
      "text": "Desks Installation",
      "value": "20"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "Test Prav",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "QA",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "118",
    "workorder": {
      "text": "Furniture Installation",
      "value": "38"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "Test For site checklist : Test WO Contact",
      "value": "1889"
    },
    "name": "Test WO Contact",
    "email": "pravallika@erpsuccesspartners.com",
    "jobTitle": "Developer",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1889&compid=TSTDRV2617106"
  },
  {
    "id": "119",
    "workorder": {
      "text": "Furniture Installation",
      "value": "103"
    },
    "events": [
      "101028",
      "101030"
    ],
    "event": "101028",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "120",
    "workorder": {
      "text": "Furniture Installation",
      "value": "103"
    },
    "events": [
      "101028",
      "101030"
    ],
    "event": "101028",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "121",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "122",
    "workorder": {
      "text": "Furniture Installation",
      "value": "44"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "123",
    "workorder": {
      "text": "AV Installation Only",
      "value": "104"
    },
    "events": [
      "101029"
    ],
    "event": "101029",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "124",
    "workorder": {
      "text": "AV Installation Only",
      "value": "104"
    },
    "events": [
      "101029"
    ],
    "event": "101029",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "125",
    "workorder": {
      "text": "AV Installation Only",
      "value": "104"
    },
    "events": [
      "101029"
    ],
    "event": "101029",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "126",
    "workorder": {
      "text": "Furniture Installation",
      "value": "105"
    },
    "events": [
      "101031",
      "101042"
    ],
    "event": "101031",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "127",
    "workorder": {
      "text": "Furniture Installation",
      "value": "105"
    },
    "events": [
      "101031",
      "101042"
    ],
    "event": "101031",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "128",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "events": [
      "101032",
      "101033",
      "101034"
    ],
    "event": "101032",
    "contact": {
      "text": "3M : Astra Gully",
      "value": "2043"
    },
    "name": "Astra Gully",
    "email": "3m@3m.com",
    "jobTitle": "Senior Applications Director",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2043&compid=TSTDRV2617106"
  },
  {
    "id": "129",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "events": [
      "101032",
      "101033",
      "101034"
    ],
    "event": "101032",
    "contact": {
      "text": "3M : Kaelea Peel",
      "value": "2044"
    },
    "name": "Kaelea Peel",
    "email": "",
    "jobTitle": "Dynamic Configuration Liason",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2044&compid=TSTDRV2617106"
  },
  {
    "id": "130",
    "workorder": {
      "text": "Install Cove Lights - Follow Up",
      "value": "107"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "3M : Astra Gully",
      "value": "2043"
    },
    "name": "Astra Gully",
    "email": "3m@3m.com",
    "jobTitle": "Senior Applications Director",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2043&compid=TSTDRV2617106"
  },
  {
    "id": "131",
    "workorder": {
      "text": "Install Cove Lights - Follow Up",
      "value": "107"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "3M : Kaelea Peel",
      "value": "2044"
    },
    "name": "Kaelea Peel",
    "email": "",
    "jobTitle": "Dynamic Configuration Liason",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2044&compid=TSTDRV2617106"
  },
  {
    "id": "132",
    "workorder": {
      "text": "Furniture Installation",
      "value": "108"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "133",
    "workorder": {
      "text": "Furniture Installation",
      "value": "108"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "134",
    "workorder": {
      "text": "Furniture Installation",
      "value": "108"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "135",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "events": [
      "101035",
      "101036",
      "101037"
    ],
    "event": "101035",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jc@erpsuccesspartners.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "136",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "events": [
      "101039",
      "101040"
    ],
    "event": "101039",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "137",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "events": [
      "101038",
      "101039",
      "101040"
    ],
    "event": "101038",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "138",
    "workorder": {
      "text": "Furniture Installation",
      "value": "111"
    },
    "events": [
      "101041"
    ],
    "event": "101041",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "139",
    "workorder": {
      "text": "Furniture Installation",
      "value": "111"
    },
    "events": [
      "101041"
    ],
    "event": "101041",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "140",
    "workorder": {
      "text": "Furniture Installation",
      "value": "111"
    },
    "events": [
      "101041"
    ],
    "event": "101041",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jsmith@worldbank.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "141",
    "workorder": {
      "text": "AV Installation",
      "value": "112"
    },
    "events": [
      "101043",
      "101061"
    ],
    "event": "101043",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "142",
    "workorder": {
      "text": "AV Installation",
      "value": "112"
    },
    "events": [
      "101043",
      "101061"
    ],
    "event": "101043",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "143",
    "workorder": {
      "text": "AV Installation",
      "value": "112"
    },
    "events": [
      "101043",
      "101061"
    ],
    "event": "101043",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jc@erpsuccesspartners.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "144",
    "workorder": {
      "text": "Furniture Delivery",
      "value": "113"
    },
    "events": [
      "101045"
    ],
    "event": "101045",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "145",
    "workorder": {
      "text": "Furniture Delivery",
      "value": "113"
    },
    "events": [
      "101045"
    ],
    "event": "101045",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jc@erpsuccesspartners.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "146",
    "workorder": {
      "text": "Lobby Room",
      "value": "114"
    },
    "events": [
      "101048"
    ],
    "event": "101048",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jc@erpsuccesspartners.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "147",
    "workorder": {
      "text": "Furniture Installation",
      "value": "115"
    },
    "events": [
      "101049",
      "101050"
    ],
    "event": "101049",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "148",
    "workorder": {
      "text": "Furniture Installation",
      "value": "115"
    },
    "events": [
      "101049",
      "101050"
    ],
    "event": "101049",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "149",
    "workorder": {
      "text": "Furniture Installation",
      "value": "115"
    },
    "events": [
      "101049",
      "101050"
    ],
    "event": "101049",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jc@erpsuccesspartners.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "150",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "151",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "152",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jc@erpsuccesspartners.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "153",
    "workorder": {
      "text": "Furniture Installation",
      "value": "117"
    },
    "events": [
      "101051"
    ],
    "event": "101051",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "154",
    "workorder": {
      "text": "Furniture Installation",
      "value": "117"
    },
    "events": [
      "101051"
    ],
    "event": "101051",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "155",
    "workorder": {
      "text": "Furniture Installation",
      "value": "117"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jc@erpsuccesspartners.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "156",
    "workorder": {
      "text": "AV Installation",
      "value": "118"
    },
    "events": [
      "101057"
    ],
    "event": "101057",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "157",
    "workorder": {
      "text": "AV Installation",
      "value": "118"
    },
    "events": [
      "101057"
    ],
    "event": "101057",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "158",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "events": [
      "101052",
      "101060"
    ],
    "event": "101052",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "159",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "events": [
      "101052",
      "101060"
    ],
    "event": "101052",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "160",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "events": [
      "101052",
      "101060"
    ],
    "event": "101052",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jc@erpsuccesspartners.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "161",
    "workorder": {
      "text": "Installation of Furnitures",
      "value": "120"
    },
    "events": [
      "101054"
    ],
    "event": "101054",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jc@erpsuccesspartners.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "162",
    "workorder": {
      "text": "Furniture Installation",
      "value": "121"
    },
    "events": [
      "101055",
      "101072"
    ],
    "event": "101055",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "163",
    "workorder": {
      "text": "Furniture Installation",
      "value": "121"
    },
    "events": [
      "101055",
      "101072"
    ],
    "event": "101055",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "164",
    "workorder": {
      "text": "Furniture Installation",
      "value": "121"
    },
    "events": [
      "101055",
      "101072"
    ],
    "event": "101055",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jc@erpsuccesspartners.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "165",
    "workorder": {
      "text": "World Bank_WRKORDR0001",
      "value": "122"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "166",
    "workorder": {
      "text": "World Bank_WRKORDR0001",
      "value": "122"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "167",
    "workorder": {
      "text": "World Bank_WRKORDR0001",
      "value": "122"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jc@erpsuccesspartners.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "168",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "events": [
      "101062",
      "101077",
      "101078",
      "101080",
      "101084"
    ],
    "event": "101062",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "169",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "events": [
      "101075",
      "101079"
    ],
    "event": "101075",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "170",
    "workorder": {
      "text": "Testing with Lean",
      "value": "124"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Angelina Jolie",
      "value": "2056"
    },
    "name": "Angelina Jolie",
    "email": "ajolie@email.com",
    "jobTitle": "Vice President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2056&compid=TSTDRV2617106"
  },
  {
    "id": "171",
    "workorder": {
      "text": "Lobby Area",
      "value": "125"
    },
    "events": [
      "101085"
    ],
    "event": "101085",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jc@erpsuccesspartners.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "172",
    "workorder": {
      "text": "Lobby Area",
      "value": "125"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Tom Holland",
      "value": "2057"
    },
    "name": "Tom Holland",
    "email": "tholland@email.com",
    "jobTitle": "Purchasing Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2057&compid=TSTDRV2617106"
  },
  {
    "id": "173",
    "workorder": {
      "text": "Office Room A",
      "value": "126"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Brad Pitt",
      "value": "2060"
    },
    "name": "Brad Pitt",
    "email": "bpitt@email.com",
    "jobTitle": "Designer",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2060&compid=TSTDRV2617106"
  },
  {
    "id": "174",
    "workorder": {
      "text": "Office Room A",
      "value": "126"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "175",
    "workorder": {
      "text": "Office Room B",
      "value": "127"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Jane Doe",
      "value": "2054"
    },
    "name": "Jane Doe",
    "email": "janedoe@email.com",
    "jobTitle": "Purchasing Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2054&compid=TSTDRV2617106"
  },
  {
    "id": "176",
    "workorder": {
      "text": "Office Room B",
      "value": "127"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "177",
    "workorder": {
      "text": "Lobby Area",
      "value": "128"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Jane Doe",
      "value": "2054"
    },
    "name": "Jane Doe",
    "email": "janedoe@email.com",
    "jobTitle": "Purchasing Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2054&compid=TSTDRV2617106"
  },
  {
    "id": "178",
    "workorder": {
      "text": "Lobby Area",
      "value": "128"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "179",
    "workorder": {
      "text": "Lobby Area",
      "value": "129"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Chad Bass",
      "value": "1382"
    },
    "name": "Chad Bass",
    "email": "cbass@worldbank.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
  },
  {
    "id": "180",
    "workorder": {
      "text": "Lobby Area",
      "value": "129"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Jane Doe",
      "value": "2054"
    },
    "name": "Jane Doe",
    "email": "janedoe@email.com",
    "jobTitle": "Purchasing Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2054&compid=TSTDRV2617106"
  },
  {
    "id": "181",
    "workorder": {
      "text": "Office Room A",
      "value": "130"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Smith",
      "value": "1892"
    },
    "name": "John Smith",
    "email": "jc@erpsuccesspartners.com",
    "jobTitle": "Logistics",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=1892&compid=TSTDRV2617106"
  },
  {
    "id": "182",
    "workorder": {
      "text": "Office Room A",
      "value": "130"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Tom Hanks",
      "value": "2059"
    },
    "name": "Tom Hanks",
    "email": "tomhanks@email.com",
    "jobTitle": "VP of Purchasing",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=2059&compid=TSTDRV2617106"
  },
  {
    "id": "183",
    "workorder": {
      "text": "Lobby Area",
      "value": "131"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Angelina Jolie",
      "value": "2056"
    },
    "name": "Angelina Jolie",
    "email": "ajolie@email.com",
    "jobTitle": "Vice President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2056&compid=TSTDRV2617106"
  },
  {
    "id": "184",
    "workorder": {
      "text": "Lobby Area",
      "value": "131"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Brad Pitt",
      "value": "2060"
    },
    "name": "Brad Pitt",
    "email": "bpitt@email.com",
    "jobTitle": "Designer",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2060&compid=TSTDRV2617106"
  },
  {
    "id": "185",
    "workorder": {
      "text": "Office Area 1",
      "value": "132"
    },
    "events": [
      "101087",
      "101097",
      "101098",
      "101099"
    ],
    "event": "101087",
    "contact": {
      "text": "World Bank : Angelina Jolie",
      "value": "2056"
    },
    "name": "Angelina Jolie",
    "email": "ajolie@email.com",
    "jobTitle": "Vice President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2056&compid=TSTDRV2617106"
  },
  {
    "id": "186",
    "workorder": {
      "text": "Office Room 2",
      "value": "133"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "187",
    "workorder": {
      "text": "Office Room 2",
      "value": "133"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : John Doe",
      "value": "2052"
    },
    "name": "John Doe",
    "email": "jdoe@email.com",
    "jobTitle": "Purchasing Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2052&compid=TSTDRV2617106"
  },
  {
    "id": "188",
    "workorder": {
      "text": "Lobby Area",
      "value": "134"
    },
    "events": [
      "101096"
    ],
    "event": "101096",
    "contact": {
      "text": "World Bank : Angelina Jolie",
      "value": "2056"
    },
    "name": "Angelina Jolie",
    "email": "ajolie@email.com",
    "jobTitle": "Vice President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2056&compid=TSTDRV2617106"
  },
  {
    "id": "189",
    "workorder": {
      "text": "Lobby Area",
      "value": "134"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Brad Pitt",
      "value": "2060"
    },
    "name": "Brad Pitt",
    "email": "bpitt@email.com",
    "jobTitle": "Designer",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2060&compid=TSTDRV2617106"
  },
  {
    "id": "190",
    "workorder": {
      "text": "Office Room 2",
      "value": "133"
    },
    "events": [
      "101086"
    ],
    "event": "101086",
    "contact": {
      "text": "World Bank : Jim Carrey",
      "value": "2041"
    },
    "name": "Jim Carrey",
    "email": "jcarrery@worldbank.com",
    "jobTitle": "Administrative Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2041&compid=TSTDRV2617106"
  },
  {
    "id": "191",
    "workorder": {
      "text": "Office Room 2",
      "value": "133"
    },
    "events": [
      "101086"
    ],
    "event": "101086",
    "contact": {
      "text": "World Bank : John Doe",
      "value": "2052"
    },
    "name": "John Doe",
    "email": "jdoe@email.com",
    "jobTitle": "Purchasing Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2052&compid=TSTDRV2617106"
  },
  {
    "id": "192",
    "workorder": {
      "text": "Office Area 1",
      "value": "132"
    },
    "events": [
      "101087"
    ],
    "event": "101087",
    "contact": {
      "text": "World Bank : Angelina Jolie",
      "value": "2056"
    },
    "name": "Angelina Jolie",
    "email": "ajolie@email.com",
    "jobTitle": "Vice President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2056&compid=TSTDRV2617106"
  },
  {
    "id": "193",
    "workorder": {
      "text": "Office Area 1",
      "value": "132"
    },
    "events": [
      "101088"
    ],
    "event": "101088",
    "contact": {
      "text": "World Bank : Angelina Jolie",
      "value": "2056"
    },
    "name": "Angelina Jolie",
    "email": "ajolie@email.com",
    "jobTitle": "Vice President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2056&compid=TSTDRV2617106"
  },
  {
    "id": "194",
    "workorder": {
      "text": "Creation of New Work Order",
      "value": "135"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Brad Pitt",
      "value": "2060"
    },
    "name": "Brad Pitt",
    "email": "bpitt@email.com",
    "jobTitle": "Designer",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2060&compid=TSTDRV2617106"
  },
  {
    "id": "197",
    "workorder": {
      "text": "Creation of New Work Order",
      "value": "135"
    },
    "events": [
      "101095"
    ],
    "event": "101095",
    "contact": {
      "text": "World Bank : Brad Pitt",
      "value": "2060"
    },
    "name": "Brad Pitt",
    "email": "bpitt@email.com",
    "jobTitle": "Designer",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2060&compid=TSTDRV2617106"
  },
  {
    "id": "206",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "events": [
      "101123",
      "101124",
      "101126"
    ],
    "event": "101123",
    "contact": {
      "text": "World Bank : Gwen Stacy",
      "value": "2067"
    },
    "name": "Gwen Stacy",
    "email": "g.stacy@email.com",
    "jobTitle": "Consultant",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2067&compid=TSTDRV2617106"
  },
  {
    "id": "209",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "events": [
      "101122"
    ],
    "event": "101122",
    "contact": {
      "text": "World Bank : Gwen Stacy",
      "value": "2067"
    },
    "name": "Gwen Stacy",
    "email": "g.stacy@email.com",
    "jobTitle": "Consultant",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2067&compid=TSTDRV2617106"
  },
  {
    "id": "213",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Harry Osborn",
      "value": "2064"
    },
    "name": "Harry Osborn",
    "email": "hosborn@email.com",
    "jobTitle": "VP",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2064&compid=TSTDRV2617106"
  },
  {
    "id": "214",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Jane Doe",
      "value": "2054"
    },
    "name": "Jane Doe",
    "email": "janedoe@email.com",
    "jobTitle": "Purchasing Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2054&compid=TSTDRV2617106"
  },
  {
    "id": "215",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [
      "101132"
    ],
    "event": "101132",
    "contact": {
      "text": "World Bank : Harry Osborn",
      "value": "2064"
    },
    "name": "Harry Osborn",
    "email": "hosborn@email.com",
    "jobTitle": "VP",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2064&compid=TSTDRV2617106"
  },
  {
    "id": "216",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "events": [
      "101132"
    ],
    "event": "101132",
    "contact": {
      "text": "World Bank : Jane Doe",
      "value": "2054"
    },
    "name": "Jane Doe",
    "email": "janedoe@email.com",
    "jobTitle": "Purchasing Manager",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2054&compid=TSTDRV2617106"
  },
  {
    "id": "217",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "events": [
      "101149",
      "101150"
    ],
    "event": "101149",
    "contact": {
      "text": "World Bank : Bruce Wayne",
      "value": "2068"
    },
    "name": "Bruce Wayne",
    "email": "bwayne@email.com",
    "jobTitle": "President",
    "mobilePhone": "",
    "phone": "",
    "primary": true,
    "url": "/app/common/entity/contact.nl?id=2068&compid=TSTDRV2617106"
  },
  {
    "id": "218",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "events": [
      "101133"
    ],
    "event": "101133",
    "contact": {
      "text": "World Bank : Eren Yaeger",
      "value": "2072"
    },
    "name": "Eren Yaeger",
    "email": "e.yaeger@email.com",
    "jobTitle": "Architect",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2072&compid=TSTDRV2617106"
  },
  {
    "id": "219",
    "workorder": {
      "text": "Product Core Testing - 2",
      "value": "140"
    },
    "events": [
      "101134",
      "101146"
    ],
    "event": "101134",
    "contact": {
      "text": "World Bank : Angelina Jolie",
      "value": "2056"
    },
    "name": "Angelina Jolie",
    "email": "ajolie@email.com",
    "jobTitle": "Vice President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2056&compid=TSTDRV2617106"
  },
  {
    "id": "220",
    "workorder": {
      "text": "Product Core Testing - 2",
      "value": "140"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Brad Pitt",
      "value": "2060"
    },
    "name": "Brad Pitt",
    "email": "bpitt@email.com",
    "jobTitle": "Designer",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2060&compid=TSTDRV2617106"
  },
  {
    "id": "221",
    "workorder": {
      "text": "Product Core Testing - 2",
      "value": "140"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Eren Yaeger",
      "value": "2072"
    },
    "name": "Eren Yaeger",
    "email": "e.yaeger@email.com",
    "jobTitle": "Architect",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2072&compid=TSTDRV2617106"
  },
  {
    "id": "224",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "events": [
      "101138"
    ],
    "event": "101138",
    "contact": {
      "text": "World Bank : Angelina Jolie",
      "value": "2056"
    },
    "name": "Angelina Jolie",
    "email": "ajolie@email.com",
    "jobTitle": "Vice President",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2056&compid=TSTDRV2617106"
  },
  {
    "id": "225",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "events": [
      "101138"
    ],
    "event": "101138",
    "contact": {
      "text": "World Bank : Brad Pitt",
      "value": "2060"
    },
    "name": "Brad Pitt",
    "email": "bpitt@email.com",
    "jobTitle": "Designer",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2060&compid=TSTDRV2617106"
  },
  {
    "id": "226",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Eren Yaeger",
      "value": "2072"
    },
    "name": "Eren Yaeger",
    "email": "e.yaeger@email.com",
    "jobTitle": "Architect",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2072&compid=TSTDRV2617106"
  },
  {
    "id": "227",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "events": [],
    "event": "",
    "contact": {
      "text": "World Bank : Gwen Stacy",
      "value": "2067"
    },
    "name": "Gwen Stacy",
    "email": "g.stacy@email.com",
    "jobTitle": "Consultant",
    "mobilePhone": "",
    "phone": "",
    "primary": false,
    "url": "/app/common/entity/contact.nl?id=2067&compid=TSTDRV2617106"
  }
];

export const fetchWOContacts = async (woId: string, eventId: string): Promise<WOContact[]> => {
  if (isLocalDevelopment()) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(woId ? mockWOContacts.filter(x => x.workorder.value == woId) : mockWOContacts), 500);
    });
  }

  try {
    console.log('WOContact: Starting to fetch work order contacts');
    
    let allData: WOContact[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&mode=getWorkOrderContacts&woId=${woId}&eventId=${eventId}&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`WOContact service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch work order contacts chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`WOContact service RESULT chunk ${i + 1}:`, chunkData);
      
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
    
    console.log(`Finished chunked fetch. Total work order contact records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no work order contact data across all chunks");
      throw new Error("No work order contact data returned from API");
    }

    return allData;

  } catch (error) {
    console.error('WOContact: Error fetching work order contacts:', error);
    throw error;
  }
};
