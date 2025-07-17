
import { suiteletUrl } from '@/lib/constants';
import { isLocalDevelopment } from '@/lib/helpers';
import { type WorkOrder } from "@/api/workOrder";

export interface Event {
  id: string;
  title?: string;
  workorder?: {
    text: string;
    value: string;
  };
  location?: string;
  status?: {
    text: string;
    value: string;
    code?: string;
  };
  date?: {
    recurrence: string;
    dates: string[] | null;
    start: string;
    end: string;
  };
  time?: {
    start: string;
    end: string;
  };
  priority?: {
    text: string;
    value: string;
    code?: string;
  };
  note?: string;
  url?: string;
  color?: string;
  woRef?: WorkOrder;
  resources?: any[];
  vendors?: any[];
  assets?: any[];
  items?: any[];
  unassigned?: boolean;
  contacts?: any[];
  // addresses?: any[];
  address?: {
    text: string;
    value: string;
  };
  organizer?: {
    text: string;
    value: string;
  };
  projectInsight?: {
    text: string;
    value: string;
  };
  assetMaintenance?: boolean;
  routingGroup?: {
    text: string;
    value: string;
  };
  salesorder?: {
    text: string;
    value: string;
  }
}

const getMockEvents = (): Event[] => {
  return [{
      "id": "101153",
      "title": "TEST",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 6/2/2025",
        "dates": [
          "6/2/2025"
        ],
        "start": "2025-06-02",
        "end": "2025-06-02"
      },
      "time": {
        "start": "09:00",
        "end": "10:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101153&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Stanislav Bondarenko",
        "value": "1649"
      },
      "projectInsight": {
        "text": "PI414",
        "value": "414"
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "101152",
      "title": "Forklift Maintenance",
      "workorder": {
        "text": "Furniture Installation and Pickup",
        "value": "101"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/10/2024 until 11/12/2024",
        "dates": [
          "11/10/2024",
          "11/12/2024"
        ],
        "start": "2024-11-10",
        "end": "2024-11-12"
      },
      "time": {
        "start": "08:00",
        "end": "10:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101152&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "PI235",
        "value": "235"
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000713",
        "value": "19372"
      }
    },
    {
      "id": "101151",
      "title": "TEST555",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 3/26/2025",
        "dates": [
          "3/26/2025"
        ],
        "start": "2025-03-26",
        "end": "2025-03-26"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101151&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "101150",
      "title": "Lobby Installation - FOP User Guide",
      "workorder": {
        "text": "Lobby Area - Product Test",
        "value": "139"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 3/25/2025 until 3/27/2025",
        "dates": [
          "3/25/2025",
          "3/27/2025"
        ],
        "start": "2025-03-25",
        "end": "2025-03-27"
      },
      "time": {
        "start": "08:00",
        "end": "12:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Lobby Installation - FOP User Guide",
      "url": "/app/crm/calendar/event.nl?id=101150&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "PI362",
        "value": "362"
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000836",
        "value": "24428"
      }
    },
    {
      "id": "101149",
      "title": "Test Event",
      "workorder": {
        "text": "Lobby Area - Product Test",
        "value": "139"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "one time event on 3/25/2025",
        "dates": [
          "3/25/2025"
        ],
        "start": "2025-03-25",
        "end": "2025-03-25"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event",
      "url": "/app/crm/calendar/event.nl?id=101149&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "PI362",
        "value": "362"
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000836",
        "value": "24428"
      }
    },
    {
      "id": "101147",
      "title": "12345",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 3/18/2025",
        "dates": [
          "3/18/2025"
        ],
        "start": "2025-03-18",
        "end": "2025-03-18"
      },
      "time": {
        "start": "07:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101147&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "101146",
      "title": "Office Area 1",
      "workorder": {
        "text": "Product Core Testing - 2",
        "value": "140"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 3/18/2025 until 3/20/2025",
        "dates": [
          "3/18/2025",
          "3/20/2025"
        ],
        "start": "2025-03-18",
        "end": "2025-03-20"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Office Area 1",
      "url": "/app/crm/calendar/event.nl?id=101146&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "PI366",
        "value": "366"
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000837",
        "value": "24432"
      }
    },
    {
      "id": "101144",
      "title": "HVAC Maintenance",
      "workorder": {
        "text": "HVAC Maintenance",
        "value": "141"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 3/17/2025",
        "dates": [
          "3/17/2025"
        ],
        "start": "2025-03-17",
        "end": "2025-03-17"
      },
      "time": {
        "start": "19:00",
        "end": "23:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "TEST12345",
      "url": "/app/crm/calendar/event.nl?id=101144&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000848",
        "value": "25472"
      }
    },
    {
      "id": "101140",
      "title": "HVAC Maintenance",
      "workorder": {
        "text": "HVAC Maintenance",
        "value": "141"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 3/13/2025",
        "dates": [
          "3/13/2025"
        ],
        "start": "2025-03-13",
        "end": "2025-03-13"
      },
      "time": {
        "start": "00:00",
        "end": "08:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101140&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000848",
        "value": "25472"
      }
    },
    {
      "id": "101139",
      "title": "Event Dry Run 14 March",
      "workorder": {
        "text": "Android Full Dryrun",
        "value": "137"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 3/18/2025",
        "dates": [
          "3/18/2025"
        ],
        "start": "2025-03-18",
        "end": "2025-03-18"
      },
      "time": {
        "start": "16:00",
        "end": "20:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101139&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000826",
        "value": "23471"
      }
    },
    {
      "id": "101138",
      "title": "HVAC Maintenance",
      "workorder": {
        "text": "HVAC Maintenance",
        "value": "141"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "occurs every day from 3/14/2025 until 3/17/2025",
        "dates": [
          "3/14/2025",
          "3/17/2025"
        ],
        "start": "2025-03-14",
        "end": "2025-03-17"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Inspect and clean air filters.\nCheck the refrigerant levels and refill if necessary.\nInspect electrical connections and tighten any loose ones.\nTest the system for correct operation.",
      "url": "/app/crm/calendar/event.nl?id=101138&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000848",
        "value": "25472"
      }
    },
    {
      "id": "101135",
      "title": "Maintenance TEST",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 3/11/2025",
        "dates": [
          "3/11/2025"
        ],
        "start": "2025-03-11",
        "end": "2025-03-11"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "1\n2\n3",
      "url": "/app/crm/calendar/event.nl?id=101135&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": true,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "101134",
      "title": "Lobby Area - 2",
      "workorder": {
        "text": "Product Core Testing - 2",
        "value": "140"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "occurs every day from 3/11/2025 until 3/13/2025",
        "dates": [
          "3/11/2025",
          "3/13/2025"
        ],
        "start": "2025-03-11",
        "end": "2025-03-13"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Lobby Area - 2",
      "url": "/app/crm/calendar/event.nl?id=101134&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "PI366",
        "value": "366"
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000837",
        "value": "24432"
      }
    },
    {
      "id": "101133",
      "title": "Lobby Area - Product Test 3 4 5 6",
      "workorder": {
        "text": "Lobby Area - Product Test",
        "value": "139"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 3/11/2025 until 3/12/2025",
        "dates": [
          "3/11/2025",
          "3/12/2025"
        ],
        "start": "2025-03-11",
        "end": "2025-03-12"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Lobby Area - Product Test",
      "url": "/app/crm/calendar/event.nl?id=101133&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "PI362",
        "value": "362"
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000836",
        "value": "24428"
      }
    },
    {
      "id": "101132",
      "title": "Lobby Area - Product Core Dryrun",
      "workorder": {
        "text": "Lobby Area - Product Core Dryrun",
        "value": "138"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "one time event on 3/10/2025",
        "dates": [
          "3/10/2025"
        ],
        "start": "2025-03-10",
        "end": "2025-03-10"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "TEST123",
      "url": "/app/crm/calendar/event.nl?id=101132&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "World Bank | 12 Carlton Av",
        "value": "228"
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "PI361",
        "value": "361"
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000835",
        "value": "24427"
      }
    },
    {
      "id": "101127",
      "title": "TEST XYZ",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "occurs every day from 3/6/2025 until 3/7/2025",
        "dates": [
          "3/6/2025",
          "3/7/2025"
        ],
        "start": "2025-03-06",
        "end": "2025-03-07"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "123\n456",
      "url": "/app/crm/calendar/event.nl?id=101127&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": true,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "101126",
      "title": "Asset Management - 44545",
      "workorder": {
        "text": "Android Full Dryrun",
        "value": "137"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 3/6/2025 until 3/7/2025",
        "dates": [
          "3/6/2025",
          "3/7/2025"
        ],
        "start": "2025-03-06",
        "end": "2025-03-07"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Asset Management - 4",
      "url": "/app/crm/calendar/event.nl?id=101126&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "PI351",
        "value": "351"
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000826",
        "value": "23471"
      }
    },
    {
      "id": "101124",
      "title": "Asset Management - 3",
      "workorder": {
        "text": "Android Full Dryrun",
        "value": "137"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 3/6/2025 until 3/7/2025",
        "dates": [
          "3/6/2025",
          "3/7/2025"
        ],
        "start": "2025-03-06",
        "end": "2025-03-07"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Asset Management - 3",
      "url": "/app/crm/calendar/event.nl?id=101124&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "PI351",
        "value": "351"
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000826",
        "value": "23471"
      }
    },
    {
      "id": "101123",
      "title": "Asset Management - 2",
      "workorder": {
        "text": "Android Full Dryrun",
        "value": "137"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 3/6/2025 until 3/7/2025",
        "dates": [
          "3/6/2025",
          "3/7/2025"
        ],
        "start": "2025-03-06",
        "end": "2025-03-07"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Asset Management - 2",
      "url": "/app/crm/calendar/event.nl?id=101123&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "PI351",
        "value": "351"
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000826",
        "value": "23471"
      }
    },
    {
      "id": "101122",
      "title": "Android Full Dryrun",
      "workorder": {
        "text": "Android Full Dryrun",
        "value": "137"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "occurs every day from 3/5/2025 until 3/6/2025",
        "dates": [
          "3/5/2025",
          "3/6/2025"
        ],
        "start": "2025-03-05",
        "end": "2025-03-06"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "TEST\r\nXYZ",
      "url": "/app/crm/calendar/event.nl?id=101122&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "World Bank | 931 Zetta Wells",
        "value": "225"
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000826",
        "value": "23471"
      }
    },
    {
      "id": "101121",
      "title": "Android Full Dryrun",
      "workorder": {
        "text": "Android Full Dryrun",
        "value": "137"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "one time event on 3/5/2025",
        "dates": [
          "3/5/2025"
        ],
        "start": "2025-03-05",
        "end": "2025-03-05"
      },
      "time": {
        "start": "16:00",
        "end": "20:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101121&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": true,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000826",
        "value": "23471"
      }
    },
    {
      "id": "101120",
      "title": "Asset Management Test",
      "workorder": {
        "text": "Android Full Dryrun",
        "value": "137"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 3/3/2025 until 3/5/2025",
        "dates": [
          "3/3/2025",
          "3/5/2025"
        ],
        "start": "2025-03-03",
        "end": "2025-03-05"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Asset Management Test",
      "url": "/app/crm/calendar/event.nl?id=101120&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "PI351",
        "value": "351"
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000826",
        "value": "23471"
      }
    },
    {
      "id": "101119",
      "title": "TEST12345",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "one time event on 3/1/2025",
        "dates": [
          "3/1/2025"
        ],
        "start": "2025-03-01",
        "end": "2025-03-01"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "12\n345",
      "url": "/app/crm/calendar/event.nl?id=101119&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": true,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "101102",
      "title": "TEST ABC",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 2/26/2025",
        "dates": [
          "2/26/2025"
        ],
        "start": "2025-02-26",
        "end": "2025-02-26"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "123\n456",
      "url": "/app/crm/calendar/event.nl?id=101102&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "101099",
      "title": "Office Area E",
      "workorder": {
        "text": "Office Area 1",
        "value": "132"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 1/20/2025 until 1/21/2025",
        "dates": [
          "1/20/2025",
          "1/21/2025"
        ],
        "start": "2025-01-20",
        "end": "2025-01-21"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Office Area E",
      "url": "/app/crm/calendar/event.nl?id=101099&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000810",
        "value": "22901"
      }
    },
    {
      "id": "101098",
      "title": "Office Area D",
      "workorder": {
        "text": "Office Area 1",
        "value": "132"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 1/20/2025 until 1/21/2025",
        "dates": [
          "1/20/2025",
          "1/21/2025"
        ],
        "start": "2025-01-20",
        "end": "2025-01-21"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Urgent",
        "value": "4",
        "code": "#9a2407"
      },
      "note": "Office Area D",
      "url": "/app/crm/calendar/event.nl?id=101098&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000810",
        "value": "22901"
      }
    },
    {
      "id": "101097",
      "title": "Office Area ABC",
      "workorder": {
        "text": "Office Area 1",
        "value": "132"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 1/20/2025 until 1/21/2025",
        "dates": [
          "1/20/2025",
          "1/21/2025"
        ],
        "start": "2025-01-20",
        "end": "2025-01-21"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Office Area ABC",
      "url": "/app/crm/calendar/event.nl?id=101097&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000810",
        "value": "22901"
      }
    },
    {
      "id": "101096",
      "title": "Office Area 2",
      "workorder": {
        "text": "Lobby Area",
        "value": "134"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "occurs every day from 1/20/2025 until 1/24/2025",
        "dates": [
          "1/20/2025",
          "1/24/2025"
        ],
        "start": "2025-01-20",
        "end": "2025-01-24"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Urgent",
        "value": "4",
        "code": "#9a2407"
      },
      "note": "Office Area 2",
      "url": "/app/crm/calendar/event.nl?id=101096&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000811",
        "value": "22902"
      }
    },
    {
      "id": "101095",
      "title": "Creation of New Work Order",
      "workorder": {
        "text": "Creation of New Work Order",
        "value": "135"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 2/16/2025",
        "dates": [
          "2/16/2025"
        ],
        "start": "2025-02-16",
        "end": "2025-02-16"
      },
      "time": {
        "start": "08:00",
        "end": "12:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "123\n456",
      "url": "/app/crm/calendar/event.nl?id=101095&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "219",
        "value": "219"
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000811",
        "value": "22902"
      }
    },
    {
      "id": "101088",
      "title": "Office Area 1",
      "workorder": {
        "text": "Office Area 1",
        "value": "132"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 1/21/2025 until 1/23/2025",
        "dates": [
          "1/21/2025",
          "1/23/2025"
        ],
        "start": "2025-01-21",
        "end": "2025-01-23"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "aaab",
      "url": "/app/crm/calendar/event.nl?id=101088&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "216",
        "value": "216"
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000810",
        "value": "22901"
      }
    },
    {
      "id": "101087",
      "title": "Office Area 1",
      "workorder": {
        "text": "Office Area 1",
        "value": "132"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 1/21/2025 until 1/22/2025",
        "dates": [
          "1/21/2025",
          "1/22/2025"
        ],
        "start": "2025-01-21",
        "end": "2025-01-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "test",
      "url": "/app/crm/calendar/event.nl?id=101087&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "216",
        "value": "216"
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000810",
        "value": "22901"
      }
    },
    {
      "id": "101086",
      "title": "Office Room 2",
      "workorder": {
        "text": "Office Room 2",
        "value": "133"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 1/18/2025",
        "dates": [
          "1/18/2025"
        ],
        "start": "2025-01-18",
        "end": "2025-01-18"
      },
      "time": {
        "start": "08:00",
        "end": "09:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101086&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "217",
        "value": "217"
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000810",
        "value": "22901"
      }
    },
    {
      "id": "101085",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Lobby Area",
        "value": "125"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 1/20/2025 until 1/21/2025",
        "dates": [
          "1/20/2025",
          "1/21/2025"
        ],
        "start": "2025-01-20",
        "end": "2025-01-21"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Furniture Installation",
      "url": "/app/crm/calendar/event.nl?id=101085&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000807",
        "value": "22898"
      }
    },
    {
      "id": "101084",
      "title": "AC Installation - 8",
      "workorder": {
        "text": "Test Work Order - AC Installation",
        "value": "123"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "one time event on 1/17/2025",
        "dates": [
          "1/17/2025"
        ],
        "start": "2025-01-17",
        "end": "2025-01-17"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "AC Installation - 8",
      "url": "/app/crm/calendar/event.nl?id=101084&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000803",
        "value": "22468"
      }
    },
    {
      "id": "101083",
      "title": "AC Installation - 7",
      "workorder": {
        "text": "Test Work Order - AC Installation",
        "value": "123"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 1/17/2025",
        "dates": [
          "1/17/2025"
        ],
        "start": "2025-01-17",
        "end": "2025-01-17"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Urgent",
        "value": "4",
        "code": "#9a2407"
      },
      "note": "AC Installation - 7",
      "url": "/app/crm/calendar/event.nl?id=101083&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Mei Matriano",
        "value": "1647"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000803",
        "value": "22468"
      }
    },
    {
      "id": "101082",
      "title": "AC Installation - 6",
      "workorder": {
        "text": "Test Work Order - AC Installation",
        "value": "123"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 1/17/2025",
        "dates": [
          "1/17/2025"
        ],
        "start": "2025-01-17",
        "end": "2025-01-17"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "AC Installation - 6",
      "url": "/app/crm/calendar/event.nl?id=101082&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Mei Matriano",
        "value": "1647"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000803",
        "value": "22468"
      }
    },
    {
      "id": "101080",
      "title": "AC Installation - 4",
      "workorder": {
        "text": "Test Work Order - AC Installation",
        "value": "123"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 1/16/2025 until 1/17/2025",
        "dates": [
          "1/16/2025",
          "1/17/2025"
        ],
        "start": "2025-01-16",
        "end": "2025-01-17"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "AC Installation - 4",
      "url": "/app/crm/calendar/event.nl?id=101080&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Mei Matriano",
        "value": "1647"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000803",
        "value": "22468"
      }
    },
    {
      "id": "101079",
      "title": "AC Installation - 3 - Test Search",
      "workorder": {
        "text": "Test Work Order - AC Installation",
        "value": "123"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 1/17/2025",
        "dates": [
          "1/17/2025"
        ],
        "start": "2025-01-17",
        "end": "2025-01-17"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "AC Installation - 3",
      "url": "/app/crm/calendar/event.nl?id=101079&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Mei Matriano",
        "value": "1647"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000803",
        "value": "22468"
      }
    },
    {
      "id": "101078",
      "title": "AC Installation 2",
      "workorder": {
        "text": "Test Work Order - AC Installation",
        "value": "123"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 1/16/2025",
        "dates": [
          "1/16/2025"
        ],
        "start": "2025-01-16",
        "end": "2025-01-16"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "AC Installation 2",
      "url": "/app/crm/calendar/event.nl?id=101078&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Mei Matriano",
        "value": "1647"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000803",
        "value": "22468"
      }
    },
    {
      "id": "101077",
      "title": "AC Installation",
      "workorder": {
        "text": "Test Work Order - AC Installation",
        "value": "123"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 1/16/2025",
        "dates": [
          "1/16/2025"
        ],
        "start": "2025-01-16",
        "end": "2025-01-16"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "AC Installation",
      "url": "/app/crm/calendar/event.nl?id=101077&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Mei Matriano",
        "value": "1647"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000803",
        "value": "22468"
      }
    },
    {
      "id": "101076",
      "title": "Test Work Order",
      "workorder": {
        "text": "Test Work Order - AC Installation",
        "value": "123"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 1/15/2025",
        "dates": [
          "1/15/2025"
        ],
        "start": "2025-01-15",
        "end": "2025-01-15"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101076&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "207",
        "value": "207"
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000803",
        "value": "22468"
      }
    },
    {
      "id": "101075",
      "title": "Test Work Order",
      "workorder": {
        "text": "Test Work Order - AC Installation",
        "value": "123"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 1/12/2025",
        "dates": [
          "1/12/2025"
        ],
        "start": "2025-01-12",
        "end": "2025-01-12"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "X\nY\nZ",
      "url": "/app/crm/calendar/event.nl?id=101075&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "207",
        "value": "207"
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000803",
        "value": "22468"
      }
    },
    {
      "id": "101072",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "121"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 1/10/2025 until 1/11/2025",
        "dates": [
          "1/10/2025",
          "1/11/2025"
        ],
        "start": "2025-01-10",
        "end": "2025-01-11"
      },
      "time": {
        "start": "10:00",
        "end": "15:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "123",
      "url": "/app/crm/calendar/event.nl?id=101072&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "201",
        "value": "201"
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000786",
        "value": "20919"
      }
    },
    {
      "id": "101064",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "121"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 1/9/2025",
        "dates": [
          "1/9/2025"
        ],
        "start": "2025-01-09",
        "end": "2025-01-09"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101064&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "201",
        "value": "201"
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000786",
        "value": "20919"
      }
    },
    {
      "id": "101063",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "121"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 12/24/2024",
        "dates": [
          "12/24/2024"
        ],
        "start": "2024-12-24",
        "end": "2024-12-24"
      },
      "time": {
        "start": "08:00",
        "end": "21:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101063&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "201",
        "value": "201"
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000786",
        "value": "20919"
      }
    },
    {
      "id": "101061",
      "title": "AV Installation",
      "workorder": {
        "text": "AV Installation",
        "value": "112"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "occurs every day from 12/23/2024 until 12/24/2024",
        "dates": [
          "12/23/2024",
          "12/24/2024"
        ],
        "start": "2024-12-23",
        "end": "2024-12-24"
      },
      "time": {
        "start": "05:09",
        "end": "17:09"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101061&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "175",
        "value": "175"
      },
      "organizer": {
        "text": "Youssef Ezz",
        "value": "1656"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000778",
        "value": "20907"
      }
    },
    {
      "id": "101060",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "119"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 12/10/2024 until 12/13/2024",
        "dates": [
          "12/10/2024",
          "12/13/2024"
        ],
        "start": "2024-12-10",
        "end": "2024-12-13"
      },
      "time": {
        "start": "08:00",
        "end": "21:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101060&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "198",
        "value": "198"
      },
      "organizer": {
        "text": "Raymund Dejasco",
        "value": "1651"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000785",
        "value": "20917"
      }
    },
    {
      "id": "101058",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "121"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 12/4/2024 until 12/5/2024",
        "dates": [
          "12/4/2024",
          "12/5/2024"
        ],
        "start": "2024-12-04",
        "end": "2024-12-05"
      },
      "time": {
        "start": "00:00",
        "end": "04:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101058&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Mei Matriano",
        "value": "1647"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000786",
        "value": "20919"
      }
    },
    {
      "id": "101057",
      "title": "AV Installation",
      "workorder": {
        "text": "AV Installation",
        "value": "118"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "one time event on 12/2/2024",
        "dates": [
          "12/2/2024"
        ],
        "start": "2024-12-02",
        "end": "2024-12-02"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "test\n123",
      "url": "/app/crm/calendar/event.nl?id=101057&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000786",
        "value": "20919"
      }
    },
    {
      "id": "101056",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "119"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/27/2024 until 11/28/2024",
        "dates": [
          "11/27/2024",
          "11/28/2024"
        ],
        "start": "2024-11-27",
        "end": "2024-11-28"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101056&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000785",
        "value": "20917"
      }
    },
    {
      "id": "101055",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "121"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 11/28/2024",
        "dates": [
          "11/28/2024"
        ],
        "start": "2024-11-28",
        "end": "2024-11-28"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Urgent",
        "value": "4",
        "code": "#9a2407"
      },
      "note": "Furniture Installation and Pick up of all existing materials Part 1 (Part 2 will be in another Event)",
      "url": "/app/crm/calendar/event.nl?id=101055&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000786",
        "value": "20919"
      }
    },
    {
      "id": "101054",
      "title": "Furniture Installation in 2nd Floor",
      "workorder": {
        "text": "Installation of Furnitures",
        "value": "120"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/27/2024 until 11/29/2024",
        "dates": [
          "11/27/2024",
          "11/29/2024"
        ],
        "start": "2024-11-27",
        "end": "2024-11-29"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Furniture Installation in 1st Floor",
      "url": "/app/crm/calendar/event.nl?id=101054&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000785",
        "value": "20917"
      }
    },
    {
      "id": "101052",
      "title": "Furniture Installation - Punch",
      "workorder": {
        "text": "Furniture Installation",
        "value": "119"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 11/13/2024",
        "dates": [
          "11/13/2024"
        ],
        "start": "2024-11-13",
        "end": "2024-11-13"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Furniture Installation",
      "url": "/app/crm/calendar/event.nl?id=101052&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000785",
        "value": "20917"
      }
    },
    {
      "id": "101051",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "117"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "one time event on 11/13/2024",
        "dates": [
          "11/13/2024"
        ],
        "start": "2024-11-13",
        "end": "2024-11-13"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Furniture Installation",
      "url": "/app/crm/calendar/event.nl?id=101051&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000783",
        "value": "20915"
      }
    },
    {
      "id": "101050",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "115"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/14/2024 until 11/16/2024",
        "dates": [
          "11/14/2024",
          "11/16/2024"
        ],
        "start": "2024-11-14",
        "end": "2024-11-16"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101050&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000781",
        "value": "20911"
      }
    },
    {
      "id": "101049",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "115"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 11/13/2024",
        "dates": [
          "11/13/2024"
        ],
        "start": "2024-11-13",
        "end": "2024-11-13"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Furniture Installation",
      "url": "/app/crm/calendar/event.nl?id=101049&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000781",
        "value": "20911"
      }
    },
    {
      "id": "101048",
      "title": "AC Installation",
      "workorder": {
        "text": "Lobby Room",
        "value": "114"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 11/13/2024",
        "dates": [
          "11/13/2024"
        ],
        "start": "2024-11-13",
        "end": "2024-11-13"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "AC Installation",
      "url": "/app/crm/calendar/event.nl?id=101048&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000780",
        "value": "20910"
      }
    },
    {
      "id": "101045",
      "title": "Delivery Event",
      "workorder": {
        "text": "Furniture Delivery",
        "value": "113"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/14/2024 until 11/15/2024",
        "dates": [
          "11/14/2024",
          "11/15/2024"
        ],
        "start": "2024-11-14",
        "end": "2024-11-15"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Delivery Event",
      "url": "/app/crm/calendar/event.nl?id=101045&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000779",
        "value": "20908"
      }
    },
    {
      "id": "101044",
      "title": "AV Installation",
      "workorder": {
        "text": "AV Installation",
        "value": "112"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/11/2024 until 11/13/2024",
        "dates": [
          "11/11/2024",
          "11/13/2024"
        ],
        "start": "2024-11-11",
        "end": "2024-11-13"
      },
      "time": {
        "start": "10:00",
        "end": "17:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101044&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000778",
        "value": "20907"
      }
    },
    {
      "id": "101043",
      "title": "AV Installation",
      "workorder": {
        "text": "AV Installation",
        "value": "112"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "one time event on 11/11/2024",
        "dates": [
          "11/11/2024"
        ],
        "start": "2024-11-11",
        "end": "2024-11-11"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "AV Installation",
      "url": "/app/crm/calendar/event.nl?id=101043&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000778",
        "value": "20907"
      }
    },
    {
      "id": "101042",
      "title": "Furniture Installation - Dryrun",
      "workorder": {
        "text": "Furniture Installation",
        "value": "105"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/13/2024 until 11/15/2024",
        "dates": [
          "11/13/2024",
          "11/15/2024"
        ],
        "start": "2024-11-13",
        "end": "2024-11-15"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Furniture Installation - Dryrun",
      "url": "/app/crm/calendar/event.nl?id=101042&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000770",
        "value": "20899"
      }
    },
    {
      "id": "101041",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "111"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 11/11/2024",
        "dates": [
          "11/11/2024"
        ],
        "start": "2024-11-11",
        "end": "2024-11-11"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Furniture Installation",
      "url": "/app/crm/calendar/event.nl?id=101041&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000777",
        "value": "20906"
      }
    },
    {
      "id": "101040",
      "title": "Post Install Checks",
      "workorder": {
        "text": "Install AC",
        "value": "110"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 11/14/2024",
        "dates": [
          "11/14/2024"
        ],
        "start": "2024-11-14",
        "end": "2024-11-14"
      },
      "time": {
        "start": "09:00",
        "end": "17:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101040&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000776",
        "value": "20905"
      }
    },
    {
      "id": "101039",
      "title": "Install AC",
      "workorder": {
        "text": "Install AC",
        "value": "110"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/13/2024 until 11/14/2024",
        "dates": [
          "11/13/2024",
          "11/14/2024"
        ],
        "start": "2024-11-13",
        "end": "2024-11-14"
      },
      "time": {
        "start": "09:00",
        "end": "17:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101039&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000776",
        "value": "20905"
      }
    },
    {
      "id": "101038",
      "title": "Deliver Materials",
      "workorder": {
        "text": "Install AC",
        "value": "110"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 11/12/2024",
        "dates": [
          "11/12/2024"
        ],
        "start": "2024-11-12",
        "end": "2024-11-12"
      },
      "time": {
        "start": "09:00",
        "end": "17:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101038&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000776",
        "value": "20905"
      }
    },
    {
      "id": "101037",
      "title": "Setup Tables",
      "workorder": {
        "text": "Install Office Furniture",
        "value": "109"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/13/2024 until 11/14/2024",
        "dates": [
          "11/13/2024",
          "11/14/2024"
        ],
        "start": "2024-11-13",
        "end": "2024-11-14"
      },
      "time": {
        "start": "09:00",
        "end": "17:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101037&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000774",
        "value": "20903"
      }
    },
    {
      "id": "101036",
      "title": "Install Cabinets",
      "workorder": {
        "text": "Install Office Furniture",
        "value": "109"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/13/2024 until 11/14/2024",
        "dates": [
          "11/13/2024",
          "11/14/2024"
        ],
        "start": "2024-11-13",
        "end": "2024-11-14"
      },
      "time": {
        "start": "09:00",
        "end": "17:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101036&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000774",
        "value": "20903"
      }
    },
    {
      "id": "101035",
      "title": "Deliver Materials",
      "workorder": {
        "text": "Install Office Furniture",
        "value": "109"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 11/12/2024",
        "dates": [
          "11/12/2024"
        ],
        "start": "2024-11-12",
        "end": "2024-11-12"
      },
      "time": {
        "start": "09:00",
        "end": "12:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101035&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000774",
        "value": "20903"
      }
    },
    {
      "id": "101034",
      "title": "Deliver Materials",
      "workorder": {
        "text": "Install Cove Lights",
        "value": "106"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/11/2024 until 11/13/2024",
        "dates": [
          "11/11/2024",
          "11/13/2024"
        ],
        "start": "2024-11-11",
        "end": "2024-11-13"
      },
      "time": {
        "start": "09:00",
        "end": "15:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101034&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000771",
        "value": "20900"
      }
    },
    {
      "id": "101033",
      "title": "Install Light Switches",
      "workorder": {
        "text": "Install Cove Lights",
        "value": "106"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/11/2024 until 11/15/2024",
        "dates": [
          "11/11/2024",
          "11/15/2024"
        ],
        "start": "2024-11-11",
        "end": "2024-11-15"
      },
      "time": {
        "start": "09:00",
        "end": "17:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101033&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000771",
        "value": "20900"
      }
    },
    {
      "id": "101032",
      "title": "Install LED Light Strips",
      "workorder": {
        "text": "Install Cove Lights",
        "value": "106"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/11/2024 until 11/15/2024",
        "dates": [
          "11/11/2024",
          "11/15/2024"
        ],
        "start": "2024-11-11",
        "end": "2024-11-15"
      },
      "time": {
        "start": "09:00",
        "end": "17:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101032&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000771",
        "value": "20900"
      }
    },
    {
      "id": "101031",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "105"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 11/13/2024",
        "dates": [
          "11/13/2024"
        ],
        "start": "2024-11-13",
        "end": "2024-11-13"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Furniture Installation and site clean up",
      "url": "/app/crm/calendar/event.nl?id=101031&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000770",
        "value": "20899"
      }
    },
    {
      "id": "101030",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "103"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/11/2024 until 11/13/2024",
        "dates": [
          "11/11/2024",
          "11/13/2024"
        ],
        "start": "2024-11-11",
        "end": "2024-11-13"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101030&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000769",
        "value": "20898"
      }
    },
    {
      "id": "101029",
      "title": "AV Installation Only",
      "workorder": {
        "text": "AV Installation Only",
        "value": "104"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 11/12/2024",
        "dates": [
          "11/12/2024"
        ],
        "start": "2024-11-12",
        "end": "2024-11-12"
      },
      "time": {
        "start": "09:00",
        "end": "17:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "AV Installation Only",
      "url": "/app/crm/calendar/event.nl?id=101029&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000770",
        "value": "20899"
      }
    },
    {
      "id": "101028",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "103"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 11/22/2024",
        "dates": [
          "11/22/2024"
        ],
        "start": "2024-11-22",
        "end": "2024-11-22"
      },
      "time": {
        "start": "10:00",
        "end": "17:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Furniture Installation only and post-install cleaning",
      "url": "/app/crm/calendar/event.nl?id=101028&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000769",
        "value": "20898"
      }
    },
    {
      "id": "101018",
      "title": "Furniture Installation and Pickup (1)",
      "workorder": {
        "text": "Furniture Installation and Pickup",
        "value": "101"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/11/2024 until 11/13/2024",
        "dates": [
          "11/11/2024",
          "11/13/2024"
        ],
        "start": "2024-11-11",
        "end": "2024-11-13"
      },
      "time": {
        "start": "10:00",
        "end": "20:30"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101018&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000713",
        "value": "19372"
      }
    },
    {
      "id": "101017",
      "title": "Furniture Installation and Pickup",
      "workorder": {
        "text": "Furniture Installation and Pickup",
        "value": "101"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "occurs every day from 11/11/2024 until 11/12/2024",
        "dates": [
          "11/11/2024",
          "11/12/2024"
        ],
        "start": "2024-11-11",
        "end": "2024-11-12"
      },
      "time": {
        "start": "10:00",
        "end": "12:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101017&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000713",
        "value": "19372"
      }
    },
    {
      "id": "101016",
      "title": "Work Order Dry Run - Nov 8",
      "workorder": {
        "text": "Work Order Dry Run - Nov 8",
        "value": "100"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 12/3/2024 until 12/16/2024",
        "dates": [
          "12/3/2024",
          "12/16/2024"
        ],
        "start": "2024-12-03",
        "end": "2024-12-16"
      },
      "time": {
        "start": "04:00",
        "end": "22:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=101016&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000766",
        "value": "20892"
      }
    },
    {
      "id": "101015",
      "title": "Test Work Order Event - Nov 8 Dryrun",
      "workorder": {
        "text": "Work Order Dry Run - Nov 8",
        "value": "100"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/11/2024 until 11/14/2024",
        "dates": [
          "11/11/2024",
          "11/14/2024"
        ],
        "start": "2024-11-11",
        "end": "2024-11-14"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Work Order Event - Nov 8 Dryrun",
      "url": "/app/crm/calendar/event.nl?id=101015&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000766",
        "value": "20892"
      }
    },
    {
      "id": "101012",
      "title": "Test Event 1",
      "workorder": {
        "text": "Work Order for Testing Nov 5",
        "value": "96"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/11/2024 until 11/14/2024",
        "dates": [
          "11/11/2024",
          "11/14/2024"
        ],
        "start": "2024-11-11",
        "end": "2024-11-14"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 1",
      "url": "/app/crm/calendar/event.nl?id=101012&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Bea Quilinguin",
        "value": "1767"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000755",
        "value": "20872"
      }
    },
    {
      "id": "101011",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Test Work Order - Nov 4",
        "value": "94"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/19/2024 until 11/21/2024",
        "dates": [
          "11/19/2024",
          "11/21/2024"
        ],
        "start": "2024-11-19",
        "end": "2024-11-21"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Nov 4 - Test Event",
      "url": "/app/crm/calendar/event.nl?id=101011&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000750",
        "value": "20867"
      }
    },
    {
      "id": "101010",
      "title": "Work Order Event - Nov 4 Dry run",
      "workorder": {
        "text": "Work Order - Nov 4 Dry run",
        "value": "95"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every day from 11/19/2024 until 11/21/2024",
        "dates": [
          "11/19/2024",
          "11/21/2024"
        ],
        "start": "2024-11-19",
        "end": "2024-11-21"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Work Order Event - Nov 4 Dry run",
      "url": "/app/crm/calendar/event.nl?id=101010&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000751",
        "value": "20868"
      }
    },
    {
      "id": "101008",
      "title": "Test Event 2",
      "workorder": {
        "text": "Work Order - Oct 31 - Test 1",
        "value": "92"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every day from 11/5/2024 until 11/6/2024",
        "dates": [
          "11/5/2024",
          "11/6/2024"
        ],
        "start": "2024-11-05",
        "end": "2024-11-06"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event 2",
      "url": "/app/crm/calendar/event.nl?id=101008&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000748",
        "value": "20852"
      }
    },
    {
      "id": "101007",
      "title": "Test Event 1",
      "workorder": {
        "text": "Work Order - Oct 31 - Test 1",
        "value": "92"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every day from 11/12/2024 until 11/13/2024",
        "dates": [
          "11/12/2024",
          "11/13/2024"
        ],
        "start": "2024-11-12",
        "end": "2024-11-13"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event 1",
      "url": "/app/crm/calendar/event.nl?id=101007&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000748",
        "value": "20852"
      }
    },
    {
      "id": "101006",
      "title": "Test Event Lead Installer",
      "workorder": {
        "text": "Work Order - Oct 31 - Test 1",
        "value": "92"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every day from 11/5/2024 until 11/7/2024",
        "dates": [
          "11/5/2024",
          "11/7/2024"
        ],
        "start": "2024-11-05",
        "end": "2024-11-07"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event Lead Installer",
      "url": "/app/crm/calendar/event.nl?id=101006&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000748",
        "value": "20852"
      }
    },
    {
      "id": "101005",
      "title": "TEST111",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 11/9/2024 until 11/10/2024",
        "dates": [
          "11/9/2024",
          "11/10/2024"
        ],
        "start": "2024-11-09",
        "end": "2024-11-10"
      },
      "time": {
        "start": "00:00",
        "end": "14:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "1\n23\n4\n5\n6",
      "url": "/app/crm/calendar/event.nl?id=101005&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "101004",
      "title": "123456",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 11/3/2024",
        "dates": [
          "11/3/2024"
        ],
        "start": "2024-11-03",
        "end": "2024-11-03"
      },
      "time": {
        "start": "08:00",
        "end": "22:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "1\n2\n3",
      "url": "/app/crm/calendar/event.nl?id=101004&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "101003",
      "title": "Test Work Order - Mei",
      "workorder": {
        "text": "Furniture Installation",
        "value": "86"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 11/3/2024",
        "dates": [
          "11/3/2024"
        ],
        "start": "2024-11-03",
        "end": "2024-11-03"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "AAA\nBBB",
      "url": "/app/crm/calendar/event.nl?id=101003&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000739",
        "value": "19521"
      }
    },
    {
      "id": "100971",
      "title": "Test Work Order - Mei",
      "workorder": {
        "text": "Furniture Installation",
        "value": "86"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 11/2/2024",
        "dates": [
          "11/2/2024"
        ],
        "start": "2024-11-02",
        "end": "2024-11-02"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "TEST\n123",
      "url": "/app/crm/calendar/event.nl?id=100971&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000739",
        "value": "19521"
      }
    },
    {
      "id": "100970",
      "title": "Test Work Order - Mei",
      "workorder": {
        "text": "Furniture Installation",
        "value": "86"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 11/2/2024",
        "dates": [
          "11/2/2024"
        ],
        "start": "2024-11-02",
        "end": "2024-11-02"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "AAA",
      "url": "/app/crm/calendar/event.nl?id=100970&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000739",
        "value": "19521"
      }
    },
    {
      "id": "100969",
      "title": "TEST123",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 11/1/2024",
        "dates": [
          "11/1/2024"
        ],
        "start": "2024-11-01",
        "end": "2024-11-01"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "ASD\nQWE",
      "url": "/app/crm/calendar/event.nl?id=100969&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100968",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "66"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/6/2024",
        "dates": [
          "9/6/2024"
        ],
        "start": "2024-09-06",
        "end": "2024-09-06"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Furniture Installation",
      "url": "/app/crm/calendar/event.nl?id=100968&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000713",
        "value": "19372"
      }
    },
    {
      "id": "100965",
      "title": "Test Event 2",
      "workorder": {
        "text": "Work Order - Oct 31 - Test 1",
        "value": "92"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every day from 11/4/2024 until 11/6/2024",
        "dates": [
          "11/4/2024",
          "11/6/2024"
        ],
        "start": "2024-11-04",
        "end": "2024-11-06"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 2",
      "url": "/app/crm/calendar/event.nl?id=100965&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000748",
        "value": "20852"
      }
    },
    {
      "id": "100964",
      "title": "Flooring Installation",
      "workorder": {
        "text": "Work Order - Oct 31 - Test 1",
        "value": "92"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every day from 11/4/2024 until 11/7/2024",
        "dates": [
          "11/4/2024",
          "11/7/2024"
        ],
        "start": "2024-11-04",
        "end": "2024-11-07"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 1",
      "url": "/app/crm/calendar/event.nl?id=100964&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000748",
        "value": "20852"
      }
    },
    {
      "id": "100963",
      "title": "Test 2",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/31/2024",
        "dates": [
          "10/31/2024"
        ],
        "start": "2024-10-31",
        "end": "2024-10-31"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100963&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Bea Quilinguin",
        "value": "1767"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100962",
      "title": "Test 1 ",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/31/2024",
        "dates": [
          "10/31/2024"
        ],
        "start": "2024-10-31",
        "end": "2024-10-31"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100962&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Bea Quilinguin",
        "value": "1767"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100961",
      "title": "Flooring Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "66"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/6/2024",
        "dates": [
          "9/6/2024"
        ],
        "start": "2024-09-06",
        "end": "2024-09-06"
      },
      "time": {
        "start": "03:00",
        "end": "12:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Furniture Installation",
      "url": "/app/crm/calendar/event.nl?id=100961&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000713",
        "value": "19372"
      }
    },
    {
      "id": "100960",
      "title": "Punch Survey",
      "workorder": {
        "text": "Furniture Installation",
        "value": "66"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 11/1/2024",
        "dates": [
          "11/1/2024"
        ],
        "start": "2024-11-01",
        "end": "2024-11-01"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "TEST\r\n123",
      "url": "/app/crm/calendar/event.nl?id=100960&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000713",
        "value": "19372"
      }
    },
    {
      "id": "100959",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Test Dry Run Oct 31",
        "value": "88"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every day from 11/4/2024 until 11/8/2024",
        "dates": [
          "11/4/2024",
          "11/8/2024"
        ],
        "start": "2024-11-04",
        "end": "2024-11-08"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Event for Dry Run Oct 31",
      "url": "/app/crm/calendar/event.nl?id=100959&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000746",
        "value": "20845"
      }
    },
    {
      "id": "100956",
      "title": "Flooring Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "83"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 10/31/2024",
        "dates": [
          "10/31/2024"
        ],
        "start": "2024-10-31",
        "end": "2024-10-31"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100956&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000736",
        "value": "19418"
      }
    },
    {
      "id": "100955",
      "title": "Test Work Order - Mei",
      "workorder": {
        "text": "Furniture Installation",
        "value": "86"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 10/31/2024",
        "dates": [
          "10/31/2024"
        ],
        "start": "2024-10-31",
        "end": "2024-10-31"
      },
      "time": {
        "start": "04:00",
        "end": "14:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "TEST\n123",
      "url": "/app/crm/calendar/event.nl?id=100955&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000739",
        "value": "19521"
      }
    },
    {
      "id": "100954",
      "title": "This is an Event 2",
      "workorder": {
        "text": "Furniture Installation",
        "value": "87"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every day from 10/31/2024 until 11/5/2024",
        "dates": [
          "10/31/2024",
          "11/5/2024"
        ],
        "start": "2024-10-31",
        "end": "2024-11-05"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "This is an Event 2",
      "url": "/app/crm/calendar/event.nl?id=100954&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000740",
        "value": "20024"
      }
    },
    {
      "id": "100953",
      "title": "This is an Event",
      "workorder": {
        "text": "Furniture Installation",
        "value": "87"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every day from 10/31/2024 until 11/6/2024",
        "dates": [
          "10/31/2024",
          "11/6/2024"
        ],
        "start": "2024-10-31",
        "end": "2024-11-06"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "This is an Event",
      "url": "/app/crm/calendar/event.nl?id=100953&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000740",
        "value": "20024"
      }
    },
    {
      "id": "100952",
      "title": "This is an Event",
      "workorder": {
        "text": "Furniture Installation",
        "value": "87"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/31/2024",
        "dates": [
          "10/31/2024"
        ],
        "start": "2024-10-31",
        "end": "2024-10-31"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "This is an Event",
      "url": "/app/crm/calendar/event.nl?id=100952&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000740",
        "value": "20024"
      }
    },
    {
      "id": "100951",
      "title": "TEST 123",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 10/30/2024",
        "dates": [
          "10/30/2024"
        ],
        "start": "2024-10-30",
        "end": "2024-10-30"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "1\n2\n3\n4\n5",
      "url": "/app/crm/calendar/event.nl?id=100951&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100950",
      "title": "Test Event 1234",
      "workorder": {
        "text": "Furniture Installation",
        "value": "87"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/2/2024",
        "dates": [
          "10/2/2024"
        ],
        "start": "2024-10-02",
        "end": "2024-10-02"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 1234",
      "url": "/app/crm/calendar/event.nl?id=100950&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000740",
        "value": "20024"
      }
    },
    {
      "id": "100947",
      "title": "Test Work Order - Mei",
      "workorder": {
        "text": "Furniture Installation",
        "value": "86"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 10/25/2024",
        "dates": [
          "10/25/2024"
        ],
        "start": "2024-10-25",
        "end": "2024-10-25"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "BBBBB\nCCCC",
      "url": "/app/crm/calendar/event.nl?id=100947&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000739",
        "value": "19521"
      }
    },
    {
      "id": "100946",
      "title": "Test Work Order - Mei",
      "workorder": {
        "text": "Furniture Installation",
        "value": "86"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/25/2024",
        "dates": [
          "10/25/2024"
        ],
        "start": "2024-10-25",
        "end": "2024-10-25"
      },
      "time": {
        "start": "12:00",
        "end": "22:47"
      },
      "priority": {
        "text": "Urgent",
        "value": "4",
        "code": "#9a2407"
      },
      "note": "BB\nCCCC\nDDD",
      "url": "/app/crm/calendar/event.nl?id=100946&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000739",
        "value": "19521"
      }
    },
    {
      "id": "100945",
      "title": "AAA",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/25/2024",
        "dates": [
          "10/25/2024"
        ],
        "start": "2024-10-25",
        "end": "2024-10-25"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "AAA\nBBB",
      "url": "/app/crm/calendar/event.nl?id=100945&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100942",
      "title": "Test Work Order - Mei",
      "workorder": {
        "text": "Furniture Installation",
        "value": "86"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 10/25/2024",
        "dates": [
          "10/25/2024"
        ],
        "start": "2024-10-25",
        "end": "2024-10-25"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "1\n2\n3124",
      "url": "/app/crm/calendar/event.nl?id=100942&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000739",
        "value": "19521"
      }
    },
    {
      "id": "100941",
      "title": "TEST12345",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 10/25/2024",
        "dates": [
          "10/25/2024"
        ],
        "start": "2024-10-25",
        "end": "2024-10-25"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "AAA\nBBBB",
      "url": "/app/crm/calendar/event.nl?id=100941&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100940",
      "title": "Test Work Order - Mei",
      "workorder": {
        "text": "Furniture Installation",
        "value": "86"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 10/25/2024",
        "dates": [
          "10/25/2024"
        ],
        "start": "2024-10-25",
        "end": "2024-10-25"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "AAA\nBBB",
      "url": "/app/crm/calendar/event.nl?id=100940&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000739",
        "value": "19521"
      }
    },
    {
      "id": "100939",
      "title": "TEST111",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 10/24/2024 until 10/25/2024",
        "dates": [
          "10/24/2024",
          "10/25/2024"
        ],
        "start": "2024-10-24",
        "end": "2024-10-25"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "AAABBB\nCCC",
      "url": "/app/crm/calendar/event.nl?id=100939&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100938",
      "title": "Test Work Order - Mei 122",
      "workorder": {
        "text": "Furniture Installation",
        "value": "86"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 10/24/2024",
        "dates": [
          "10/24/2024"
        ],
        "start": "2024-10-24",
        "end": "2024-10-24"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "123\n444",
      "url": "/app/crm/calendar/event.nl?id=100938&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000739",
        "value": "19521"
      }
    },
    {
      "id": "100937",
      "title": "Test Work Order - Mei 111222",
      "workorder": {
        "text": "Furniture Installation",
        "value": "86"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 10/24/2024",
        "dates": [
          "10/24/2024"
        ],
        "start": "2024-10-24",
        "end": "2024-10-24"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "111\n223123123",
      "url": "/app/crm/calendar/event.nl?id=100937&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000739",
        "value": "19521"
      }
    },
    {
      "id": "100936",
      "title": "Test Work Order - Mei 111",
      "workorder": {
        "text": "Furniture Installation",
        "value": "86"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 10/24/2024",
        "dates": [
          "10/24/2024"
        ],
        "start": "2024-10-24",
        "end": "2024-10-24"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "TEST\n111",
      "url": "/app/crm/calendar/event.nl?id=100936&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000739",
        "value": "19521"
      }
    },
    {
      "id": "100934",
      "title": "Test Work Order - Mei",
      "workorder": {
        "text": "Furniture Installation",
        "value": "86"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 10/23/2024",
        "dates": [
          "10/23/2024"
        ],
        "start": "2024-10-23",
        "end": "2024-10-23"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "TEST\n12345",
      "url": "/app/crm/calendar/event.nl?id=100934&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000739",
        "value": "19521"
      }
    },
    {
      "id": "100933",
      "title": "Flooring Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "87"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/28/2024",
        "dates": [
          "10/28/2024"
        ],
        "start": "2024-10-28",
        "end": "2024-10-28"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event - Mei 123",
      "url": "/app/crm/calendar/event.nl?id=100933&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000740",
        "value": "20024"
      }
    },
    {
      "id": "100932",
      "title": "Test Event 2 for Dry run",
      "workorder": {
        "text": "Furniture Installation",
        "value": "87"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/29/2024",
        "dates": [
          "10/29/2024"
        ],
        "start": "2024-10-29",
        "end": "2024-10-29"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 2 for Dry run",
      "url": "/app/crm/calendar/event.nl?id=100932&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000740",
        "value": "20024"
      }
    },
    {
      "id": "100931",
      "title": "Furniture Installation and Drop Off",
      "workorder": {
        "text": "Furniture Installation",
        "value": "87"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/29/2024",
        "dates": [
          "10/29/2024"
        ],
        "start": "2024-10-29",
        "end": "2024-10-29"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "FOP Dry Run Oct 2",
      "url": "/app/crm/calendar/event.nl?id=100931&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000740",
        "value": "20024"
      }
    },
    {
      "id": "100930",
      "title": "Furniture Installation",
      "workorder": {
        "text": "1 Oct Test Work Order",
        "value": "72"
      },
      "location": "New York",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "16:30",
        "end": "17:30"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100930&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000721",
        "value": "19394"
      }
    },
    {
      "id": "100927",
      "title": "Test Event 12345",
      "workorder": {
        "text": "Furniture Installation",
        "value": "86"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/21/2024",
        "dates": [
          "10/21/2024"
        ],
        "start": "2024-10-21",
        "end": "2024-10-21"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 123",
      "url": "/app/crm/calendar/event.nl?id=100927&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000739",
        "value": "19521"
      }
    },
    {
      "id": "100924",
      "title": "Test Event 3",
      "workorder": {
        "text": "Furniture Installation",
        "value": "85"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/21/2024",
        "dates": [
          "10/21/2024"
        ],
        "start": "2024-10-21",
        "end": "2024-10-21"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 3",
      "url": "/app/crm/calendar/event.nl?id=100924&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000739",
        "value": "19521"
      }
    },
    {
      "id": "100923",
      "title": "Test Event 2",
      "workorder": {
        "text": "Furniture Installation",
        "value": "85"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/21/2024",
        "dates": [
          "10/21/2024"
        ],
        "start": "2024-10-21",
        "end": "2024-10-21"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Test Event 2",
      "url": "/app/crm/calendar/event.nl?id=100923&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000739",
        "value": "19521"
      }
    },
    {
      "id": "100922",
      "title": "Flooring Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "85"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/21/2024",
        "dates": [
          "10/21/2024"
        ],
        "start": "2024-10-21",
        "end": "2024-10-21"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Test Event 1",
      "url": "/app/crm/calendar/event.nl?id=100922&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000739",
        "value": "19521"
      }
    },
    {
      "id": "100921",
      "title": "Work Order Test 41111",
      "workorder": {
        "text": "Work Order Test 4",
        "value": "79"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 10/18/2024",
        "dates": [
          "10/18/2024"
        ],
        "start": "2024-10-18",
        "end": "2024-10-18"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "TEST111",
      "url": "/app/crm/calendar/event.nl?id=100921&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000726",
        "value": "19400"
      }
    },
    {
      "id": "100916",
      "title": "Test Event 4",
      "workorder": {
        "text": "Furniture Installation",
        "value": "83"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 4",
      "url": "/app/crm/calendar/event.nl?id=100916&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000736",
        "value": "19418"
      }
    },
    {
      "id": "100915",
      "title": "Test Event 3",
      "workorder": {
        "text": "Furniture Installation",
        "value": "83"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 3",
      "url": "/app/crm/calendar/event.nl?id=100915&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000736",
        "value": "19418"
      }
    },
    {
      "id": "100913",
      "title": "Test Event 2",
      "workorder": {
        "text": "Furniture Installation",
        "value": "83"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 2",
      "url": "/app/crm/calendar/event.nl?id=100913&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000736",
        "value": "19418"
      }
    },
    {
      "id": "100912",
      "title": "Flooring Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "83"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event 123",
      "url": "/app/crm/calendar/event.nl?id=100912&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000736",
        "value": "19418"
      }
    },
    {
      "id": "100908",
      "title": "Work Order Test 4555555",
      "workorder": {
        "text": "Work Order Test 4",
        "value": "79"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 10/17/2024",
        "dates": [
          "10/17/2024"
        ],
        "start": "2024-10-17",
        "end": "2024-10-17"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100908&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000726",
        "value": "19400"
      }
    },
    {
      "id": "100907",
      "title": "Work Order Test 45555",
      "workorder": {
        "text": "Work Order Test 4",
        "value": "79"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 10/18/2024",
        "dates": [
          "10/18/2024"
        ],
        "start": "2024-10-18",
        "end": "2024-10-18"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "1\r\n2\r\n3\r\n444",
      "url": "/app/crm/calendar/event.nl?id=100907&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000726",
        "value": "19400"
      }
    },
    {
      "id": "100906",
      "title": "Test Event 17",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 17",
      "url": "/app/crm/calendar/event.nl?id=100906&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100905",
      "title": "Test Event 16",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 16",
      "url": "/app/crm/calendar/event.nl?id=100905&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100904",
      "title": "Test Event 15",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 15",
      "url": "/app/crm/calendar/event.nl?id=100904&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100903",
      "title": "Test Event 14",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 14",
      "url": "/app/crm/calendar/event.nl?id=100903&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100902",
      "title": "Test Event 13",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 13",
      "url": "/app/crm/calendar/event.nl?id=100902&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100901",
      "title": "Test Event 12",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/23/2024",
        "dates": [
          "10/23/2024"
        ],
        "start": "2024-10-23",
        "end": "2024-10-23"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 12",
      "url": "/app/crm/calendar/event.nl?id=100901&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100900",
      "title": "Test Event 11",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 11",
      "url": "/app/crm/calendar/event.nl?id=100900&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100899",
      "title": "Test Event 10",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 10...",
      "url": "/app/crm/calendar/event.nl?id=100899&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100898",
      "title": "Work Order Test 4222222",
      "workorder": {
        "text": "Work Order Test 4",
        "value": "79"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 10/17/2024",
        "dates": [
          "10/17/2024"
        ],
        "start": "2024-10-17",
        "end": "2024-10-17"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "123245\r\n67",
      "url": "/app/crm/calendar/event.nl?id=100898&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000726",
        "value": "19400"
      }
    },
    {
      "id": "100891",
      "title": "Test Event 9",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 9",
      "url": "/app/crm/calendar/event.nl?id=100891&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100890",
      "title": "Test Event 8",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 8",
      "url": "/app/crm/calendar/event.nl?id=100890&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100889",
      "title": "Test Event 7",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 7",
      "url": "/app/crm/calendar/event.nl?id=100889&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100888",
      "title": "Test Event 6",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 6",
      "url": "/app/crm/calendar/event.nl?id=100888&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100887",
      "title": "Test Event 6",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 6",
      "url": "/app/crm/calendar/event.nl?id=100887&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100886",
      "title": "Test Event 4",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 4",
      "url": "/app/crm/calendar/event.nl?id=100886&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100885",
      "title": "Test Event 3",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 3",
      "url": "/app/crm/calendar/event.nl?id=100885&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100884",
      "title": "Test Event 3",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 3",
      "url": "/app/crm/calendar/event.nl?id=100884&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100883",
      "title": "Test Event 4",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 4",
      "url": "/app/crm/calendar/event.nl?id=100883&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100882",
      "title": "Test Event 3",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/23/2024",
        "dates": [
          "10/23/2024"
        ],
        "start": "2024-10-23",
        "end": "2024-10-23"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 3",
      "url": "/app/crm/calendar/event.nl?id=100882&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100881",
      "title": "Test Event 2",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/22/2024",
        "dates": [
          "10/22/2024"
        ],
        "start": "2024-10-22",
        "end": "2024-10-22"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 2",
      "url": "/app/crm/calendar/event.nl?id=100881&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100880",
      "title": "Flooring Installation",
      "workorder": {
        "text": "Work Order Test **Do not use** - Mei",
        "value": "82"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/21/2024",
        "dates": [
          "10/21/2024"
        ],
        "start": "2024-10-21",
        "end": "2024-10-21"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 1",
      "url": "/app/crm/calendar/event.nl?id=100880&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000734",
        "value": "19414"
      }
    },
    {
      "id": "100879",
      "title": "Test Event 33",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/16/2024",
        "dates": [
          "10/16/2024"
        ],
        "start": "2024-10-16",
        "end": "2024-10-16"
      },
      "time": {
        "start": "11:00",
        "end": "12:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 33",
      "url": "/app/crm/calendar/event.nl?id=100879&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100878",
      "title": "Test Event 32",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/16/2024",
        "dates": [
          "10/16/2024"
        ],
        "start": "2024-10-16",
        "end": "2024-10-16"
      },
      "time": {
        "start": "11:00",
        "end": "12:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 32",
      "url": "/app/crm/calendar/event.nl?id=100878&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100877",
      "title": "Test Event 31",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/16/2024",
        "dates": [
          "10/16/2024"
        ],
        "start": "2024-10-16",
        "end": "2024-10-16"
      },
      "time": {
        "start": "10:00",
        "end": "11:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Test Event 31",
      "url": "/app/crm/calendar/event.nl?id=100877&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100876",
      "title": "Test Event 30",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/14/2024",
        "dates": [
          "10/14/2024"
        ],
        "start": "2024-10-14",
        "end": "2024-10-14"
      },
      "time": {
        "start": "09:00",
        "end": "10:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 30",
      "url": "/app/crm/calendar/event.nl?id=100876&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100875",
      "title": "Office Reconfiguration",
      "workorder": {
        "text": "FOP User Guide TEST",
        "value": "81"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/14/2024",
        "dates": [
          "10/14/2024"
        ],
        "start": "2024-10-14",
        "end": "2024-10-14"
      },
      "time": {
        "start": "04:00",
        "end": "05:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "FOP User guide",
      "url": "/app/crm/calendar/event.nl?id=100875&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000733",
        "value": "19413"
      }
    },
    {
      "id": "100874",
      "title": "Office Reconfiguration",
      "workorder": {
        "text": "FOP User Guide ",
        "value": "80"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/14/2024",
        "dates": [
          "10/14/2024"
        ],
        "start": "2024-10-14",
        "end": "2024-10-14"
      },
      "time": {
        "start": "04:00",
        "end": "05:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "FOP User Guide",
      "url": "/app/crm/calendar/event.nl?id=100874&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000733",
        "value": "19413"
      }
    },
    {
      "id": "100872",
      "title": "Test FOP Dry Run Part 2",
      "workorder": {
        "text": "Test Fop Dry Run Part 2",
        "value": "75"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/7/2024",
        "dates": [
          "10/7/2024"
        ],
        "start": "2024-10-07",
        "end": "2024-10-07"
      },
      "time": {
        "start": "06:00",
        "end": "07:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test FOP Dry Run Part 2",
      "url": "/app/crm/calendar/event.nl?id=100872&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000725",
        "value": "19399"
      }
    },
    {
      "id": "100871",
      "title": "Test Event 29",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/7/2024",
        "dates": [
          "10/7/2024"
        ],
        "start": "2024-10-07",
        "end": "2024-10-07"
      },
      "time": {
        "start": "04:00",
        "end": "05:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event 29",
      "url": "/app/crm/calendar/event.nl?id=100871&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100870",
      "title": "Test Event 28",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/4/2024",
        "dates": [
          "10/4/2024"
        ],
        "start": "2024-10-04",
        "end": "2024-10-04"
      },
      "time": {
        "start": "09:00",
        "end": "10:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event 28",
      "url": "/app/crm/calendar/event.nl?id=100870&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100869",
      "title": "Test Event 27",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/4/2024",
        "dates": [
          "10/4/2024"
        ],
        "start": "2024-10-04",
        "end": "2024-10-04"
      },
      "time": {
        "start": "09:00",
        "end": "10:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event 27",
      "url": "/app/crm/calendar/event.nl?id=100869&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100868",
      "title": "Test Event 26",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/4/2024",
        "dates": [
          "10/4/2024"
        ],
        "start": "2024-10-04",
        "end": "2024-10-04"
      },
      "time": {
        "start": "09:00",
        "end": "10:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 26",
      "url": "/app/crm/calendar/event.nl?id=100868&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100867",
      "title": "Test Event 25",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/4/2024",
        "dates": [
          "10/4/2024"
        ],
        "start": "2024-10-04",
        "end": "2024-10-04"
      },
      "time": {
        "start": "07:00",
        "end": "08:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Test Event 25",
      "url": "/app/crm/calendar/event.nl?id=100867&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100866",
      "title": "Test Event 24",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/4/2024",
        "dates": [
          "10/4/2024"
        ],
        "start": "2024-10-04",
        "end": "2024-10-04"
      },
      "time": {
        "start": "05:00",
        "end": "06:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event 24",
      "url": "/app/crm/calendar/event.nl?id=100866&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100865",
      "title": "Test Event 23",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/4/2024",
        "dates": [
          "10/4/2024"
        ],
        "start": "2024-10-04",
        "end": "2024-10-04"
      },
      "time": {
        "start": "05:00",
        "end": "06:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event 23",
      "url": "/app/crm/calendar/event.nl?id=100865&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100864",
      "title": "Test Event 22",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/3/2024",
        "dates": [
          "10/3/2024"
        ],
        "start": "2024-10-03",
        "end": "2024-10-03"
      },
      "time": {
        "start": "09:00",
        "end": "10:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event 22",
      "url": "/app/crm/calendar/event.nl?id=100864&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100863",
      "title": "Test Event 21",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/3/2024",
        "dates": [
          "10/3/2024"
        ],
        "start": "2024-10-03",
        "end": "2024-10-03"
      },
      "time": {
        "start": "09:00",
        "end": "10:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event 21",
      "url": "/app/crm/calendar/event.nl?id=100863&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100862",
      "title": "Test Event 20",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/3/2024",
        "dates": [
          "10/3/2024"
        ],
        "start": "2024-10-03",
        "end": "2024-10-03"
      },
      "time": {
        "start": "09:00",
        "end": "10:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event 20",
      "url": "/app/crm/calendar/event.nl?id=100862&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100861",
      "title": "Test Event 19",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/3/2024",
        "dates": [
          "10/3/2024"
        ],
        "start": "2024-10-03",
        "end": "2024-10-03"
      },
      "time": {
        "start": "09:00",
        "end": "10:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 19",
      "url": "/app/crm/calendar/event.nl?id=100861&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100860",
      "title": "Test Event 18",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/3/2024",
        "dates": [
          "10/3/2024"
        ],
        "start": "2024-10-03",
        "end": "2024-10-03"
      },
      "time": {
        "start": "07:00",
        "end": "08:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event 18",
      "url": "/app/crm/calendar/event.nl?id=100860&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100859",
      "title": "Test Event 17",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/3/2024",
        "dates": [
          "10/3/2024"
        ],
        "start": "2024-10-03",
        "end": "2024-10-03"
      },
      "time": {
        "start": "05:00",
        "end": "06:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event 17",
      "url": "/app/crm/calendar/event.nl?id=100859&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100858",
      "title": "Test Event 16",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/2/2024",
        "dates": [
          "10/2/2024"
        ],
        "start": "2024-10-02",
        "end": "2024-10-02"
      },
      "time": {
        "start": "07:00",
        "end": "08:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 16",
      "url": "/app/crm/calendar/event.nl?id=100858&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100857",
      "title": "Test Event 15",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/2/2024",
        "dates": [
          "10/2/2024"
        ],
        "start": "2024-10-02",
        "end": "2024-10-02"
      },
      "time": {
        "start": "06:00",
        "end": "07:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 15",
      "url": "/app/crm/calendar/event.nl?id=100857&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100856",
      "title": "Test Event 14",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/2/2024",
        "dates": [
          "10/2/2024"
        ],
        "start": "2024-10-02",
        "end": "2024-10-02"
      },
      "time": {
        "start": "06:00",
        "end": "07:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 14",
      "url": "/app/crm/calendar/event.nl?id=100856&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100855",
      "title": "Test Event 15",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/2/2024",
        "dates": [
          "10/2/2024"
        ],
        "start": "2024-10-02",
        "end": "2024-10-02"
      },
      "time": {
        "start": "04:00",
        "end": "05:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event 15",
      "url": "/app/crm/calendar/event.nl?id=100855&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100854",
      "title": "Test Event 14",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/2/2024",
        "dates": [
          "10/2/2024"
        ],
        "start": "2024-10-02",
        "end": "2024-10-02"
      },
      "time": {
        "start": "04:00",
        "end": "05:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event 14",
      "url": "/app/crm/calendar/event.nl?id=100854&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100853",
      "title": "Test Event 13",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/2/2024",
        "dates": [
          "10/2/2024"
        ],
        "start": "2024-10-02",
        "end": "2024-10-02"
      },
      "time": {
        "start": "04:00",
        "end": "05:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 13",
      "url": "/app/crm/calendar/event.nl?id=100853&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100852",
      "title": "Test Event 12",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/2/2024",
        "dates": [
          "10/2/2024"
        ],
        "start": "2024-10-02",
        "end": "2024-10-02"
      },
      "time": {
        "start": "04:00",
        "end": "05:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event 12",
      "url": "/app/crm/calendar/event.nl?id=100852&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100851",
      "title": "Test Event 10",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/2/2024",
        "dates": [
          "10/2/2024"
        ],
        "start": "2024-10-02",
        "end": "2024-10-02"
      },
      "time": {
        "start": "03:00",
        "end": "04:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 10",
      "url": "/app/crm/calendar/event.nl?id=100851&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100850",
      "title": "Test Event 10",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/2/2024",
        "dates": [
          "10/2/2024"
        ],
        "start": "2024-10-02",
        "end": "2024-10-02"
      },
      "time": {
        "start": "03:00",
        "end": "04:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 10",
      "url": "/app/crm/calendar/event.nl?id=100850&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100849",
      "title": "Test Event 8",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/2/2024",
        "dates": [
          "10/2/2024"
        ],
        "start": "2024-10-02",
        "end": "2024-10-02"
      },
      "time": {
        "start": "03:00",
        "end": "04:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 8",
      "url": "/app/crm/calendar/event.nl?id=100849&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100847",
      "title": "Test FOP Dry Run 2",
      "workorder": {
        "text": "Test FOP Dry Run2",
        "value": "73"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 10/1/2024",
        "dates": [
          "10/1/2024"
        ],
        "start": "2024-10-01",
        "end": "2024-10-01"
      },
      "time": {
        "start": "09:00",
        "end": "10:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test FOP Dry Run 2",
      "url": "/app/crm/calendar/event.nl?id=100847&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000718",
        "value": "19391"
      }
    },
    {
      "id": "100846",
      "title": "Test Event 8",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/1/2024",
        "dates": [
          "10/1/2024"
        ],
        "start": "2024-10-01",
        "end": "2024-10-01"
      },
      "time": {
        "start": "05:00",
        "end": "06:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event 8",
      "url": "/app/crm/calendar/event.nl?id=100846&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100845",
      "title": "Test Event 8",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/1/2024",
        "dates": [
          "10/1/2024"
        ],
        "start": "2024-10-01",
        "end": "2024-10-01"
      },
      "time": {
        "start": "05:00",
        "end": "06:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 8",
      "url": "/app/crm/calendar/event.nl?id=100845&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100844",
      "title": "Test Event 7",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/1/2024",
        "dates": [
          "10/1/2024"
        ],
        "start": "2024-10-01",
        "end": "2024-10-01"
      },
      "time": {
        "start": "05:00",
        "end": "06:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 7",
      "url": "/app/crm/calendar/event.nl?id=100844&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100843",
      "title": "Test Event 6",
      "workorder": {
        "text": "Furniture Installation",
        "value": "67"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/30/2024",
        "dates": [
          "9/30/2024"
        ],
        "start": "2024-09-30",
        "end": "2024-09-30"
      },
      "time": {
        "start": "10:00",
        "end": "11:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event 6",
      "url": "/app/crm/calendar/event.nl?id=100843&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000715",
        "value": "19388"
      }
    },
    {
      "id": "100834",
      "title": "123",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 9/27/2024 until 9/28/2024",
        "dates": [
          "9/27/2024",
          "9/28/2024"
        ],
        "start": "2024-09-27",
        "end": "2024-09-28"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100834&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100833",
      "title": "123",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 9/27/2024 until 9/28/2024",
        "dates": [
          "9/27/2024",
          "9/28/2024"
        ],
        "start": "2024-09-27",
        "end": "2024-09-28"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100833&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100829",
      "title": "123",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every day from 9/1/2024 until 9/7/2024",
        "dates": [
          "9/1/2024",
          "9/7/2024"
        ],
        "start": "2024-09-01",
        "end": "2024-09-07"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Urgent",
        "value": "4",
        "code": "#9a2407"
      },
      "note": "123\n456",
      "url": "/app/crm/calendar/event.nl?id=100829&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100825",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Flooring Installation",
        "value": "48"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 9/24/2024 until 9/26/2024",
        "dates": [
          "9/24/2024",
          "9/26/2024"
        ],
        "start": "2024-09-24",
        "end": "2024-09-26"
      },
      "time": {
        "start": "04:00",
        "end": "17:00"
      },
      "priority": {
        "text": "Urgent",
        "value": "4",
        "code": "#9a2407"
      },
      "note": "TEST\r\n12345\r\n777\r\n888",
      "url": "/app/crm/calendar/event.nl?id=100825&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000654",
        "value": "16211"
      }
    },
    {
      "id": "100823",
      "title": "Test Event 3",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/25/2024",
        "dates": [
          "9/25/2024"
        ],
        "start": "2024-09-25",
        "end": "2024-09-25"
      },
      "time": {
        "start": "18:00",
        "end": "19:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100823&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Rowe Riomalos",
        "value": "1766"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100822",
      "title": "Flooring Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "61"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/24/2024",
        "dates": [
          "9/24/2024"
        ],
        "start": "2024-09-24",
        "end": "2024-09-24"
      },
      "time": {
        "start": "10:00",
        "end": "11:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event - Mei",
      "url": "/app/crm/calendar/event.nl?id=100822&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000686",
        "value": "17729"
      }
    },
    {
      "id": "100821",
      "title": "Flooring Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "61"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/24/2024",
        "dates": [
          "9/24/2024"
        ],
        "start": "2024-09-24",
        "end": "2024-09-24"
      },
      "time": {
        "start": "10:00",
        "end": "11:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event - Mei",
      "url": "/app/crm/calendar/event.nl?id=100821&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000686",
        "value": "17729"
      }
    },
    {
      "id": "100820",
      "title": "Flooring Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "61"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/24/2024",
        "dates": [
          "9/24/2024"
        ],
        "start": "2024-09-24",
        "end": "2024-09-24"
      },
      "time": {
        "start": "10:00",
        "end": "11:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event - Mei",
      "url": "/app/crm/calendar/event.nl?id=100820&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000686",
        "value": "17729"
      }
    },
    {
      "id": "100819",
      "title": "Flooring Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "61"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/24/2024",
        "dates": [
          "9/24/2024"
        ],
        "start": "2024-09-24",
        "end": "2024-09-24"
      },
      "time": {
        "start": "10:00",
        "end": "11:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event - Mei",
      "url": "/app/crm/calendar/event.nl?id=100819&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000686",
        "value": "17729"
      }
    },
    {
      "id": "100818",
      "title": "Test Event for WO 61 - Mei",
      "workorder": {
        "text": "Furniture Installation",
        "value": "61"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/24/2024",
        "dates": [
          "9/24/2024"
        ],
        "start": "2024-09-24",
        "end": "2024-09-24"
      },
      "time": {
        "start": "10:00",
        "end": "11:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event for WO 61 - Mei",
      "url": "/app/crm/calendar/event.nl?id=100818&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000686",
        "value": "17729"
      }
    },
    {
      "id": "100817",
      "title": "Test Event for WO 61 - Mei",
      "workorder": {
        "text": "Furniture Installation",
        "value": "61"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/24/2024",
        "dates": [
          "9/24/2024"
        ],
        "start": "2024-09-24",
        "end": "2024-09-24"
      },
      "time": {
        "start": "10:00",
        "end": "11:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event for WO 61 - Mei",
      "url": "/app/crm/calendar/event.nl?id=100817&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000686",
        "value": "17729"
      }
    },
    {
      "id": "100816",
      "title": "Crates Pick Up",
      "workorder": {
        "text": "Crates Pick up",
        "value": "4"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/24/2024",
        "dates": [
          "9/24/2024"
        ],
        "start": "2024-09-24",
        "end": "2024-09-24"
      },
      "time": {
        "start": "23:00",
        "end": "23:59"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100816&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100815",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "45"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 9/25/2024",
        "dates": [
          "9/25/2024"
        ],
        "start": "2024-09-25",
        "end": "2024-09-25"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "test",
      "url": "/app/crm/calendar/event.nl?id=100815&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000654",
        "value": "16211"
      }
    },
    {
      "id": "100814",
      "title": "Time Tracking Showcase Event",
      "workorder": {
        "text": "Testing Work Order - Ipad",
        "value": "64"
      },
      "location": "New York",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every day from 9/19/2024 until 9/20/2024",
        "dates": [
          "9/19/2024",
          "9/20/2024"
        ],
        "start": "2024-09-19",
        "end": "2024-09-20"
      },
      "time": {
        "start": "08:00",
        "end": "09:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100814&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100813",
      "title": "Punch Survey",
      "workorder": {
        "text": "Furniture Installation",
        "value": "61"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 9/18/2024 until 9/19/2024",
        "dates": [
          "9/18/2024",
          "9/19/2024"
        ],
        "start": "2024-09-18",
        "end": "2024-09-19"
      },
      "time": {
        "start": "04:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "TEST 123456",
      "url": "/app/crm/calendar/event.nl?id=100813&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000686",
        "value": "17729"
      }
    },
    {
      "id": "100812",
      "title": "Test Sample Event Submission 5",
      "workorder": {
        "text": "Furniture Installation",
        "value": "61"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/17/2024",
        "dates": [
          "9/17/2024"
        ],
        "start": "2024-09-17",
        "end": "2024-09-17"
      },
      "time": {
        "start": "09:00",
        "end": "10:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Sample Event Submission 5",
      "url": "/app/crm/calendar/event.nl?id=100812&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000686",
        "value": "17729"
      }
    },
    {
      "id": "100811",
      "title": "Test Event Submission 4",
      "workorder": {
        "text": "Furniture Installation",
        "value": "61"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/17/2024",
        "dates": [
          "9/17/2024"
        ],
        "start": "2024-09-17",
        "end": "2024-09-17"
      },
      "time": {
        "start": "09:00",
        "end": "10:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Event Submission 5",
      "url": "/app/crm/calendar/event.nl?id=100811&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000686",
        "value": "17729"
      }
    },
    {
      "id": "100810",
      "title": "Design Survey",
      "workorder": {
        "text": "Furniture Installation",
        "value": "61"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/17/2024",
        "dates": [
          "9/17/2024"
        ],
        "start": "2024-09-17",
        "end": "2024-09-17"
      },
      "time": {
        "start": "09:00",
        "end": "10:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Sample Event Submission 4",
      "url": "/app/crm/calendar/event.nl?id=100810&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000686",
        "value": "17729"
      }
    },
    {
      "id": "100809",
      "title": "Test Event Submission 3",
      "workorder": {
        "text": "Furniture Installation",
        "value": "61"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/17/2024",
        "dates": [
          "9/17/2024"
        ],
        "start": "2024-09-17",
        "end": "2024-09-17"
      },
      "time": {
        "start": "08:00",
        "end": "09:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event Submission 3",
      "url": "/app/crm/calendar/event.nl?id=100809&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000686",
        "value": "17729"
      }
    },
    {
      "id": "100808",
      "title": "Test Submit Event 2",
      "workorder": {
        "text": "Furniture Installation",
        "value": "61"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/17/2024",
        "dates": [
          "9/17/2024"
        ],
        "start": "2024-09-17",
        "end": "2024-09-17"
      },
      "time": {
        "start": "08:00",
        "end": "09:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "Test Submit Event 2",
      "url": "/app/crm/calendar/event.nl?id=100808&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000686",
        "value": "17729"
      }
    },
    {
      "id": "100807",
      "title": "Flooring Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "61"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/17/2024",
        "dates": [
          "9/17/2024"
        ],
        "start": "2024-09-17",
        "end": "2024-09-17"
      },
      "time": {
        "start": "05:00",
        "end": "06:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event",
      "url": "/app/crm/calendar/event.nl?id=100807&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000686",
        "value": "17729"
      }
    },
    {
      "id": "100806",
      "title": "Flooring Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "61"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/17/2024",
        "dates": [
          "9/17/2024"
        ],
        "start": "2024-09-17",
        "end": "2024-09-17"
      },
      "time": {
        "start": "05:00",
        "end": "06:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event",
      "url": "/app/crm/calendar/event.nl?id=100806&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000686",
        "value": "17729"
      }
    },
    {
      "id": "100805",
      "title": "Snag List Review",
      "workorder": {
        "text": "Furniture Installation",
        "value": "61"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/17/2024",
        "dates": [
          "9/17/2024"
        ],
        "start": "2024-09-17",
        "end": "2024-09-17"
      },
      "time": {
        "start": "05:00",
        "end": "06:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Test Event",
      "url": "/app/crm/calendar/event.nl?id=100805&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000686",
        "value": "17729"
      }
    },
    {
      "id": "100804",
      "title": "Test Event 17 Sep",
      "workorder": {
        "text": "Test Work Order 12 Sep",
        "value": "51"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/17/2024",
        "dates": [
          "9/17/2024"
        ],
        "start": "2024-09-17",
        "end": "2024-09-17"
      },
      "time": {
        "start": "07:00",
        "end": "08:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100804&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100803",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "59"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "occurs every day from 9/14/2024 until 9/15/2024",
        "dates": [
          "9/14/2024",
          "9/15/2024"
        ],
        "start": "2024-09-14",
        "end": "2024-09-15"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "TEST21345",
      "url": "/app/crm/calendar/event.nl?id=100803&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000686",
        "value": "17729"
      }
    },
    {
      "id": "100801",
      "title": "Punch Survey",
      "workorder": {
        "text": "Work Order Test - Sept 12 - Mei",
        "value": "49"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/13/2024",
        "dates": [
          "9/13/2024"
        ],
        "start": "2024-09-13",
        "end": "2024-09-13"
      },
      "time": {
        "start": "11:00",
        "end": "12:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100801&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000654",
        "value": "16211"
      }
    },
    {
      "id": "100800",
      "title": "Site Survey",
      "workorder": {
        "text": "Work Order Test - Sept 12 - Mei",
        "value": "49"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/12/2024",
        "dates": [
          "9/12/2024"
        ],
        "start": "2024-09-12",
        "end": "2024-09-12"
      },
      "time": {
        "start": "13:00",
        "end": "14:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Sample Event",
      "url": "/app/crm/calendar/event.nl?id=100800&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000654",
        "value": "16211"
      }
    },
    {
      "id": "100799",
      "title": "Test Event 12 Sep",
      "workorder": {
        "text": "Test Work Order 12 Sep",
        "value": "51"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/12/2024",
        "dates": [
          "9/12/2024"
        ],
        "start": "2024-09-12",
        "end": "2024-09-12"
      },
      "time": {
        "start": "09:00",
        "end": "10:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100799&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100798",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "1"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "occurs every day from 9/12/2024 until 9/13/2024",
        "dates": [
          "9/12/2024",
          "9/13/2024"
        ],
        "start": "2024-09-12",
        "end": "2024-09-13"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "TEST ABCD",
      "url": "/app/crm/calendar/event.nl?id=100798&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100796",
      "title": "Site Cleaning",
      "workorder": {
        "text": "Furniture Installation",
        "value": "1"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 9/11/2024 until 9/12/2024",
        "dates": [
          "9/11/2024",
          "9/12/2024"
        ],
        "start": "2024-09-11",
        "end": "2024-09-12"
      },
      "time": {
        "start": "08:00",
        "end": "19:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "XYZ\r\n123",
      "url": "/app/crm/calendar/event.nl?id=100796&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100795",
      "title": "Office Remodelling",
      "workorder": {
        "text": "Furniture Installation",
        "value": "46"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "one time event on 9/11/2024",
        "dates": [
          "9/11/2024"
        ],
        "start": "2024-09-11",
        "end": "2024-09-11"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "TEST1234",
      "url": "/app/crm/calendar/event.nl?id=100795&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100792",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "1"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 9/11/2024",
        "dates": [
          "9/11/2024"
        ],
        "start": "2024-09-11",
        "end": "2024-09-11"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "AAA\r\nBBB",
      "url": "/app/crm/calendar/event.nl?id=100792&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100787",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "44"
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every day from 8/30/2024 until 8/30/2024",
        "dates": [
          "8/30/2024",
          "8/30/2024"
        ],
        "start": "2024-08-30",
        "end": "2024-08-30"
      },
      "time": {
        "start": "11:00",
        "end": "21:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "TEST\r\nAAAA\r\nCCC",
      "url": "/app/crm/calendar/event.nl?id=100787&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100786",
      "title": "AV Installation",
      "workorder": {
        "text": "Furniture and Flooring Installation",
        "value": "34"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "occurs every day from 9/6/2024 until 9/24/2024",
        "dates": [
          "9/6/2024",
          "9/24/2024"
        ],
        "start": "2024-09-06",
        "end": "2024-09-24"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "AV Installation",
      "url": "/app/crm/calendar/event.nl?id=100786&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000600",
        "value": "11712"
      }
    },
    {
      "id": "100783",
      "title": "XYZ",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every day from 9/4/2024 until 9/10/2024",
        "dates": [
          "9/4/2024",
          "9/10/2024"
        ],
        "start": "2024-09-04",
        "end": "2024-09-10"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "AAAAA",
      "url": "/app/crm/calendar/event.nl?id=100783&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100782",
      "title": "Work Order Test - ^_^",
      "workorder": {
        "text": "Work Order Test - Sept 12 - Mei",
        "value": "49"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every day from 9/4/2024 until 9/29/2024",
        "dates": [
          "9/4/2024",
          "9/29/2024"
        ],
        "start": "2024-09-04",
        "end": "2024-09-29"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Urgent",
        "value": "4",
        "code": "#9a2407"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100782&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100781",
      "title": "Work Order Test 123123123123",
      "workorder": {
        "text": "Work Order Test - Sept 12 - Mei",
        "value": "49"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "occurs every day from 9/4/2024 until 9/9/2024",
        "dates": [
          "9/4/2024",
          "9/9/2024"
        ],
        "start": "2024-09-04",
        "end": "2024-09-09"
      },
      "time": {
        "start": "08:00",
        "end": "23:05"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "XYZ\r\nABC",
      "url": "/app/crm/calendar/event.nl?id=100781&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100778",
      "title": "Crate Pickup",
      "workorder": {
        "text": "Furniture Installation",
        "value": "46"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/4/2024",
        "dates": [
          "9/4/2024"
        ],
        "start": "2024-09-04",
        "end": "2024-09-04"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Urgent",
        "value": "4",
        "code": "#9a2407"
      },
      "note": "FF\r\n\r\n\r\n123",
      "url": "/app/crm/calendar/event.nl?id=100778&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100777",
      "title": "Walls Installation",
      "workorder": {
        "text": "Flooring Installation",
        "value": "48"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/4/2024",
        "dates": [
          "9/4/2024"
        ],
        "start": "2024-09-04",
        "end": "2024-09-04"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "ASDASDASADASDBBB\r\nBBBBBB",
      "url": "/app/crm/calendar/event.nl?id=100777&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100773",
      "title": "TEST12345",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/4/2024",
        "dates": [
          "9/4/2024"
        ],
        "start": "2024-09-04",
        "end": "2024-09-04"
      },
      "time": {
        "start": "08:00",
        "end": "18:05"
      },
      "priority": {
        "text": "Urgent",
        "value": "4",
        "code": "#9a2407"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100773&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100772",
      "title": "12345",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/4/2024",
        "dates": [
          "9/4/2024"
        ],
        "start": "2024-09-04",
        "end": "2024-09-04"
      },
      "time": {
        "start": "08:00",
        "end": "18:03"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "qwert",
      "url": "/app/crm/calendar/event.nl?id=100772&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100771",
      "title": "TEST12345",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/4/2024",
        "dates": [
          "9/4/2024"
        ],
        "start": "2024-09-04",
        "end": "2024-09-04"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "ASD\nASD",
      "url": "/app/crm/calendar/event.nl?id=100771&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100770",
      "title": "TEST XYZ",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/5/2024",
        "dates": [
          "9/5/2024"
        ],
        "start": "2024-09-05",
        "end": "2024-09-05"
      },
      "time": {
        "start": "09:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "TEST",
      "url": "/app/crm/calendar/event.nl?id=100770&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Lean Cendaña",
        "value": "1765"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100769",
      "title": "Furniture Installation",
      "workorder": {
        "text": "AV Installation",
        "value": "47"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/3/2024",
        "dates": [
          "9/3/2024"
        ],
        "start": "2024-09-03",
        "end": "2024-09-03"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "AAA\r\nBBB",
      "url": "/app/crm/calendar/event.nl?id=100769&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100768",
      "title": "AV Installation",
      "workorder": {
        "text": "Furniture and Flooring Installation",
        "value": "34"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 8/2/2024",
        "dates": [
          "8/2/2024"
        ],
        "start": "2024-08-02",
        "end": "2024-08-02"
      },
      "time": {
        "start": "06:42",
        "end": "17:45"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "AV Installation",
      "url": "/app/crm/calendar/event.nl?id=100768&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000500",
        "value": "4588"
      }
    },
    {
      "id": "100767",
      "title": "Furniture and Flooring Installation",
      "workorder": {
        "text": "Furniture and Flooring Installation",
        "value": "34"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 8/2/2024",
        "dates": [
          "8/2/2024"
        ],
        "start": "2024-08-02",
        "end": "2024-08-02"
      },
      "time": {
        "start": "10:00",
        "end": "19:00"
      },
      "priority": {
        "text": "Urgent",
        "value": "4",
        "code": "#9a2407"
      },
      "note": "ASDFGH",
      "url": "/app/crm/calendar/event.nl?id=100767&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000727",
        "value": "19403"
      }
    },
    {
      "id": "100762",
      "title": "AV Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "46"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/3/2024",
        "dates": [
          "9/3/2024"
        ],
        "start": "2024-09-03",
        "end": "2024-09-03"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "AAAAXXX",
      "url": "/app/crm/calendar/event.nl?id=100762&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100760",
      "title": "Furniture and AV Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "45"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/3/2024",
        "dates": [
          "9/3/2024"
        ],
        "start": "2024-09-03",
        "end": "2024-09-03"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "AAA\r\nBBBB",
      "url": "/app/crm/calendar/event.nl?id=100760&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100758",
      "title": "Flooring Installation",
      "workorder": {
        "text": "AV Installation",
        "value": "47"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 8/31/2024",
        "dates": [
          "8/31/2024"
        ],
        "start": "2024-08-31",
        "end": "2024-08-31"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "TEST12345",
      "url": "/app/crm/calendar/event.nl?id=100758&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100756",
      "title": "Furniture Installation",
      "workorder": {
        "text": "AV Installation",
        "value": "47"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 8/31/2024",
        "dates": [
          "8/31/2024"
        ],
        "start": "2024-08-31",
        "end": "2024-08-31"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "TEST12345",
      "url": "/app/crm/calendar/event.nl?id=100756&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100753",
      "title": "Drop Off",
      "workorder": {
        "text": "AV Installation",
        "value": "47"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 8/31/2024",
        "dates": [
          "8/31/2024"
        ],
        "start": "2024-08-31",
        "end": "2024-08-31"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "TEST12345",
      "url": "/app/crm/calendar/event.nl?id=100753&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100752",
      "title": "Testing",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 8/20/2024",
        "dates": [
          "8/20/2024"
        ],
        "start": "2024-08-20",
        "end": "2024-08-20"
      },
      "time": {
        "start": "18:00",
        "end": "19:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100752&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Youssef Ezz",
        "value": "1656"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100751",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "1"
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 8/12/2024",
        "dates": [
          "8/12/2024"
        ],
        "start": "2024-08-12",
        "end": "2024-08-12"
      },
      "time": {
        "start": "15:00",
        "end": "16:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100751&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100750",
      "title": "Crates Pick Up",
      "workorder": {
        "text": "Crates Pick up",
        "value": "4"
      },
      "location": "Engineering",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 11/30/2024",
        "dates": [
          "11/30/2024"
        ],
        "start": "2024-11-30",
        "end": "2024-11-30"
      },
      "time": {
        "start": "22:00",
        "end": "23:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "Pickup Only",
      "url": "/app/crm/calendar/event.nl?id=100750&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000500",
        "value": "4588"
      }
    },
    {
      "id": "100749",
      "title": "Flooring Installation",
      "workorder": {
        "text": "Flooring Installation",
        "value": "31"
      },
      "location": "01: San Francisco",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 11/10/2025",
        "dates": [
          "11/10/2025"
        ],
        "start": "2025-11-10",
        "end": "2025-11-10"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "1\r\n2\r\n3",
      "url": "/app/crm/calendar/event.nl?id=100749&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000600",
        "value": "11712"
      }
    },
    {
      "id": "100740",
      "title": "AV Installation",
      "workorder": {
        "text": "AV Installation",
        "value": "33"
      },
      "location": "01: San Francisco",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 11/10/2024",
        "dates": [
          "11/10/2024"
        ],
        "start": "2024-11-10",
        "end": "2024-11-10"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Urgent",
        "value": "4",
        "code": "#9a2407"
      },
      "note": "123\r\n456",
      "url": "/app/crm/calendar/event.nl?id=100740&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000600",
        "value": "11712"
      }
    },
    {
      "id": "100739",
      "title": "Punch Survey",
      "workorder": {
        "text": "SLS00000621_WRKORDR001",
        "value": "32"
      },
      "location": "01: San Francisco",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 7/23/2024",
        "dates": [
          "7/23/2024"
        ],
        "start": "2024-07-23",
        "end": "2024-07-23"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "123\r\n444",
      "url": "/app/crm/calendar/event.nl?id=100739&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100724",
      "title": "Pick Up",
      "workorder": {
        "text": "Flooring Installation",
        "value": "31"
      },
      "location": "01: San Francisco",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "one time event on 7/8/2024",
        "dates": [
          "7/8/2024"
        ],
        "start": "2024-07-08",
        "end": "2024-07-08"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Low",
        "value": "1",
        "code": "#026adf"
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100724&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000600",
        "value": "11712"
      }
    },
    {
      "id": "100723",
      "title": "Flooring Installation",
      "workorder": {
        "text": "Flooring Installation",
        "value": "31"
      },
      "location": "01: San Francisco",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "one time event on 7/8/2024",
        "dates": [
          "7/8/2024"
        ],
        "start": "2024-07-08",
        "end": "2024-07-08"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "Urgent",
        "value": "4",
        "code": "#9a2407"
      },
      "note": "TEST123",
      "url": "/app/crm/calendar/event.nl?id=100723&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000609",
        "value": "11722"
      }
    },
    {
      "id": "100721",
      "title": "Drop Off",
      "workorder": {
        "text": "Drop off and Walls Installation",
        "value": "15"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "one time event on 7/8/2024",
        "dates": [
          "7/8/2024"
        ],
        "start": "2024-07-08",
        "end": "2024-07-08"
      },
      "time": {
        "start": "13:00",
        "end": "14:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "Sample Event for Work Order",
      "url": "/app/crm/calendar/event.nl?id=100721&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100718",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "1"
      },
      "location": "01: San Francisco",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "one time event on 7/9/2024",
        "dates": [
          "7/9/2024"
        ],
        "start": "2024-07-09",
        "end": "2024-07-09"
      },
      "time": {
        "start": "07:00",
        "end": "21:00"
      },
      "priority": {
        "text": "Medium",
        "value": "2",
        "code": "#dfcf02"
      },
      "note": "XXX\r\nYYY\r\nZZZ",
      "url": "/app/crm/calendar/event.nl?id=100718&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000609",
        "value": "11722"
      }
    },
    {
      "id": "100686",
      "title": "Walls Installation - Group 1",
      "workorder": {
        "text": "Drop off and Walls Installation",
        "value": "15"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "one time event on 7/8/2024",
        "dates": [
          "7/8/2024"
        ],
        "start": "2024-07-08",
        "end": "2024-07-08"
      },
      "time": {
        "start": "08:00",
        "end": "09:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.",
      "url": "/app/crm/calendar/event.nl?id=100686&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000609",
        "value": "11722"
      }
    },
    {
      "id": "100684",
      "title": "Walls Installation - Group 2",
      "workorder": {
        "text": "Drop off and Walls Installation",
        "value": "15"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "one time event on 7/8/2024",
        "dates": [
          "7/8/2024"
        ],
        "start": "2024-07-08",
        "end": "2024-07-08"
      },
      "time": {
        "start": "05:00",
        "end": "06:00"
      },
      "priority": {
        "text": "Urgent",
        "value": "4",
        "code": "#9a2407"
      },
      "note": "General Walls Installation Only",
      "url": "/app/crm/calendar/event.nl?id=100684&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "SLS00000609",
        "value": "11722"
      }
    },
    {
      "id": "100682",
      "title": "Furniture Installation",
      "workorder": {
        "text": "Furniture Installation",
        "value": "1"
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "one time event on 7/4/2024",
        "dates": [
          "7/4/2024"
        ],
        "start": "2024-07-04",
        "end": "2024-07-04"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "High",
        "value": "3",
        "code": "#ca6621"
      },
      "note": "TEST12345678-Test",
      "url": "/app/crm/calendar/event.nl?id=100682&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "11-0092",
        "value": "4356"
      }
    },
    {
      "id": "100681",
      "title": "AV Installation and Pickup",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every day from 10/2/2024 until 10/2/2024",
        "dates": [
          "10/2/2024",
          "10/2/2024"
        ],
        "start": "2024-10-02",
        "end": "2024-10-02"
      },
      "time": {
        "start": "02:00",
        "end": "03:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100681&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100449",
      "title": "AV Installation and Pickup",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every week day starting on 6/7/2024",
        "dates": [
          "6/7/2024"
        ],
        "start": "2024-06-07",
        "end": "2024-06-07"
      },
      "time": {
        "start": "15:30",
        "end": "16:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100449&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100448",
      "title": "Furniture Installation",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "St. Francis Yacht Club",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every week day starting on 6/20/2024",
        "dates": [
          "6/20/2024"
        ],
        "start": "2024-06-20",
        "end": "2024-06-20"
      },
      "time": {
        "start": "09:00",
        "end": "10:30"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100448&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100288",
      "title": "Punch List Site Visit",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 4/25/2024",
        "dates": [
          "4/25/2024"
        ],
        "start": "2024-04-25",
        "end": "2024-04-25"
      },
      "time": {
        "start": "13:00",
        "end": "16:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100288&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100258",
      "title": "Friday Work Schedule",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every Friday starting on 2/10/2012",
        "dates": [
          "2/10/2012"
        ],
        "start": "2012-02-10",
        "end": "2012-02-10"
      },
      "time": {
        "start": "10:00",
        "end": "19:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100258&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Miles Grey",
        "value": "911"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100257",
      "title": "Wednesday Work Schedule",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every Wednesday starting on 2/8/2012",
        "dates": [
          "2/8/2012"
        ],
        "start": "2012-02-08",
        "end": "2012-02-08"
      },
      "time": {
        "start": "13:00",
        "end": "20:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100257&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Miles Grey",
        "value": "911"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100246",
      "title": "Saturday Work Schedule",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every Saturday starting on 1/21/2012",
        "dates": [
          "1/21/2012"
        ],
        "start": "2012-01-21",
        "end": "2012-01-21"
      },
      "time": {
        "start": "14:00",
        "end": "20:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100246&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Miles Grey",
        "value": "911"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100245",
      "title": "Thursday Work Schedule",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every Thursday starting on 2/9/2012",
        "dates": [
          "2/9/2012"
        ],
        "start": "2012-02-09",
        "end": "2012-02-09"
      },
      "time": {
        "start": "09:00",
        "end": "10:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100245&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Miles Grey",
        "value": "911"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100244",
      "title": "Tuesday Work Schedule",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every Tuesday starting on 2/7/2012",
        "dates": [
          "2/7/2012"
        ],
        "start": "2012-02-07",
        "end": "2012-02-07"
      },
      "time": {
        "start": "16:00",
        "end": "21:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100244&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Miles Grey",
        "value": "911"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100243",
      "title": "Monday Work Schedule",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every Sunday starting on 2/5/2012",
        "dates": [
          "2/5/2012"
        ],
        "start": "2012-02-05",
        "end": "2012-02-05"
      },
      "time": {
        "start": "10:00",
        "end": "16:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100243&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Miles Grey",
        "value": "911"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100206",
      "title": "Punch List Site Visit",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 1/28/2024",
        "dates": [
          "1/28/2024"
        ],
        "start": "2024-01-28",
        "end": "2024-01-28"
      },
      "time": {
        "start": "14:00",
        "end": "15:30"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100206&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Amy Nguyen",
        "value": "25"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100158",
      "title": "New Features Review",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 12/16/2009",
        "dates": [
          "12/16/2009"
        ],
        "start": "2009-12-16",
        "end": "2009-12-16"
      },
      "time": {
        "start": "13:00",
        "end": "14:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100158&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "AL Systems Ltd",
        "value": "1305"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100145",
      "title": "Delivery ",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 1/15/2024",
        "dates": [
          "1/15/2024"
        ],
        "start": "2024-01-15",
        "end": "2024-01-15"
      },
      "time": {
        "start": "18:00",
        "end": "21:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100145&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100136",
      "title": "start contract discussion",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 3/16/2010",
        "dates": [
          "3/16/2010"
        ],
        "start": "2010-03-16",
        "end": "2010-03-16"
      },
      "time": {
        "start": "23:00",
        "end": "23:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100136&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Mary Redding",
        "value": "1008"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100133",
      "title": "contract Negotiation",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 3/26/2010",
        "dates": [
          "3/26/2010"
        ],
        "start": "2010-03-26",
        "end": "2010-03-26"
      },
      "time": {
        "start": "22:00",
        "end": "23:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100133&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Mary Redding",
        "value": "1008"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100131",
      "title": "contract Negotiation",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 2/26/2010",
        "dates": [
          "2/26/2010"
        ],
        "start": "2010-02-26",
        "end": "2010-02-26"
      },
      "time": {
        "start": "11:00",
        "end": "12:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100131&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Mary Redding",
        "value": "1008"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100129",
      "title": "Meeting w/Amy",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "Front Conference Room",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 3/8/2010",
        "dates": [
          "3/8/2010"
        ],
        "start": "2010-03-08",
        "end": "2010-03-08"
      },
      "time": {
        "start": "21:00",
        "end": "22:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100129&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Jill Muscat",
        "value": "1032"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100119",
      "title": "Meeting with Victor",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 2/17/2010",
        "dates": [
          "2/17/2010"
        ],
        "start": "2010-02-17",
        "end": "2010-02-17"
      },
      "time": {
        "start": "13:00",
        "end": "14:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100119&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Mary Redding",
        "value": "1008"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100115",
      "title": "Meeting to discuss pricing",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 9/27/2021",
        "dates": [
          "9/27/2021"
        ],
        "start": "2021-09-27",
        "end": "2021-09-27"
      },
      "time": {
        "start": "12:00",
        "end": "13:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100115&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Mary Redding",
        "value": "1008"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100112",
      "title": "Meeting at Smith Office Showroom",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 2/19/2010",
        "dates": [
          "2/19/2010"
        ],
        "start": "2010-02-19",
        "end": "2010-02-19"
      },
      "time": {
        "start": "09:00",
        "end": "10:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100112&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Joanne Miller",
        "value": "1022"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100107",
      "title": "Discovery Meeting",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 2/9/2010",
        "dates": [
          "2/9/2010"
        ],
        "start": "2010-02-09",
        "end": "2010-02-09"
      },
      "time": {
        "start": "12:00",
        "end": "13:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100107&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Phil Kneafsey",
        "value": "1031"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100106",
      "title": "Follow-up Meeting",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 2/10/2010",
        "dates": [
          "2/10/2010"
        ],
        "start": "2010-02-10",
        "end": "2010-02-10"
      },
      "time": {
        "start": "14:00",
        "end": "15:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100106&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Phil Kneafsey",
        "value": "1031"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100101",
      "title": "Meet to Review Order",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 2/24/2010",
        "dates": [
          "2/24/2010"
        ],
        "start": "2010-02-24",
        "end": "2010-02-24"
      },
      "time": {
        "start": "16:00",
        "end": "17:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100101&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Joanne Miller",
        "value": "1022"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100099",
      "title": "Dinner at Terra",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "St. Helena",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 2/12/2010",
        "dates": [
          "2/12/2010"
        ],
        "start": "2010-02-12",
        "end": "2010-02-12"
      },
      "time": {
        "start": "19:00",
        "end": "20:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100099&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Joanne Miller",
        "value": "1022"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100093",
      "title": "Meeting at a Trade Show",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 4/13/2022",
        "dates": [
          "4/13/2022"
        ],
        "start": "2022-04-13",
        "end": "2022-04-13"
      },
      "time": {
        "start": "09:30",
        "end": "10:30"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100093&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Walter Reagan",
        "value": "918"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100087",
      "title": "Bausch meeting",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "Office",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 2/4/2010",
        "dates": [
          "2/4/2010"
        ],
        "start": "2010-02-04",
        "end": "2010-02-04"
      },
      "time": {
        "start": "09:00",
        "end": "10:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100087&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Tim Wong",
        "value": "915"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100082",
      "title": "Yellow Label Inquiry",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 1/29/2010",
        "dates": [
          "1/29/2010"
        ],
        "start": "2010-01-29",
        "end": "2010-01-29"
      },
      "time": {
        "start": "07:00",
        "end": "08:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100082&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Tim Wong",
        "value": "915"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100069",
      "title": "AV Installation and Pickup",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "Support Conference Room",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every Saturday starting on 1/6/2024",
        "dates": [
          "1/6/2024"
        ],
        "start": "2024-01-06",
        "end": "2024-01-06"
      },
      "time": {
        "start": "00:00",
        "end": "01:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100069&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100068",
      "title": "AV Installation and Pickup",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 1/6/2024",
        "dates": [
          "1/6/2024"
        ],
        "start": "2024-01-06",
        "end": "2024-01-06"
      },
      "time": {
        "start": "00:00",
        "end": "01:30"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100068&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100067",
      "title": "AV Installation and Pickup",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "Cotterman Office",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 1/6/2024",
        "dates": [
          "1/6/2024"
        ],
        "start": "2024-01-06",
        "end": "2024-01-06"
      },
      "time": {
        "start": "00:00",
        "end": "01:30"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100067&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100061",
      "title": "AV Installation and Pickup",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 1/3/2024",
        "dates": [
          "1/3/2024"
        ],
        "start": "2024-01-03",
        "end": "2024-01-03"
      },
      "time": {
        "start": "00:00",
        "end": "01:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100061&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100060",
      "title": "AV Installation and Pickup",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 2/28/2024",
        "dates": [
          "2/28/2024"
        ],
        "start": "2024-02-28",
        "end": "2024-02-28"
      },
      "time": {
        "start": "00:00",
        "end": "01:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100060&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100050",
      "title": "AV Installation and Pickup",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "B-Sharp West Side Store",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 8/23/2024",
        "dates": [
          "8/23/2024"
        ],
        "start": "2024-08-23",
        "end": "2024-08-23"
      },
      "time": {
        "start": "00:00",
        "end": "01:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100050&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100044",
      "title": "PC Expo Show",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/30/2015",
        "dates": [
          "9/30/2015"
        ],
        "start": "2015-09-30",
        "end": "2015-09-30"
      },
      "time": {
        "start": "00:00",
        "end": "00:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100044&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Evan Ziccarelli",
        "value": "217"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100043",
      "title": "Lunch with Suzanne",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "Cipriani",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/21/2015",
        "dates": [
          "9/21/2015"
        ],
        "start": "2015-09-21",
        "end": "2015-09-21"
      },
      "time": {
        "start": "00:00",
        "end": "00:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100043&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Evan Ziccarelli",
        "value": "217"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100039",
      "title": "Staff Meeting",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/8/2015",
        "dates": [
          "9/8/2015"
        ],
        "start": "2015-09-08",
        "end": "2015-09-08"
      },
      "time": {
        "start": "00:00",
        "end": "00:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100039&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Evan Ziccarelli",
        "value": "217"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100038",
      "title": "DCI CRM Show",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/8/2015",
        "dates": [
          "9/8/2015"
        ],
        "start": "2015-09-08",
        "end": "2015-09-08"
      },
      "time": {
        "start": "00:00",
        "end": "00:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100038&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Evan Ziccarelli",
        "value": "217"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100035",
      "title": "DCI CRM Event",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "NYC",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/8/2015",
        "dates": [
          "9/8/2015"
        ],
        "start": "2015-09-08",
        "end": "2015-09-08"
      },
      "time": {
        "start": "00:00",
        "end": "00:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100035&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Jennifer Beattie",
        "value": "216"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100033",
      "title": "AV Installation and Pickup",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 8/2/2024",
        "dates": [
          "8/2/2024"
        ],
        "start": "2024-08-02",
        "end": "2024-08-02"
      },
      "time": {
        "start": "00:00",
        "end": "01:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100033&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100028",
      "title": "Walls Installation",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "Blue Conference Room",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 3/18/2024",
        "dates": [
          "3/18/2024"
        ],
        "start": "2024-03-18",
        "end": "2024-03-18"
      },
      "time": {
        "start": "00:00",
        "end": "01:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100028&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Andy Andrews",
        "value": "21"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100027",
      "title": "conference call",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 10/16/2014",
        "dates": [
          "10/16/2014"
        ],
        "start": "2014-10-16",
        "end": "2014-10-16"
      },
      "time": {
        "start": "00:00",
        "end": "00:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100027&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Andy Andrews",
        "value": "21"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100021",
      "title": "Walls Installation",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 3/4/2024",
        "dates": [
          "3/4/2024"
        ],
        "start": "2024-03-04",
        "end": "2024-03-04"
      },
      "time": {
        "start": "00:00",
        "end": "01:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100021&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100020",
      "title": "Walls Installation",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 7/18/2024",
        "dates": [
          "7/18/2024"
        ],
        "start": "2024-07-18",
        "end": "2024-07-18"
      },
      "time": {
        "start": "00:00",
        "end": "01:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100020&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100017",
      "title": "Walls Installation",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 8/4/2024",
        "dates": [
          "8/4/2024"
        ],
        "start": "2024-08-04",
        "end": "2024-08-04"
      },
      "time": {
        "start": "00:00",
        "end": "01:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100017&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100015",
      "title": "Walls Installation",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "My Office",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 7/4/2024",
        "dates": [
          "7/4/2024"
        ],
        "start": "2024-07-04",
        "end": "2024-07-04"
      },
      "time": {
        "start": "08:00",
        "end": "18:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=100015&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "39",
      "title": "Furniture Installation and Pickup",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "Sales Conference Room",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every Wednesday from 1/15/2014 until 1/15/2014",
        "dates": [
          "1/15/2014",
          "1/15/2014"
        ],
        "start": "2014-01-15",
        "end": "2014-01-15"
      },
      "time": {
        "start": "00:00",
        "end": "01:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=39&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "36",
      "title": "Anderson Boughton Service Appt.",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "Service Dept.",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "one time event on 3/6/2014",
        "dates": [
          "3/6/2014"
        ],
        "start": "2014-03-06",
        "end": "2014-03-06"
      },
      "time": {
        "start": "00:00",
        "end": "00:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=36&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "33",
      "title": "Furniture Installation",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Completed",
        "value": "COMPLETED",
        "code": "#28a745"
      },
      "date": {
        "recurrence": "occurs every Wednesday starting on 1/22/2014",
        "dates": [
          "1/22/2014"
        ],
        "start": "2014-01-22",
        "end": "2014-01-22"
      },
      "time": {
        "start": "00:00",
        "end": "01:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=33&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Alex Wolfe",
        "value": "-5"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "26",
      "title": "Strategic planning",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every day from 1/14/2014 until 1/14/2014",
        "dates": [
          "1/14/2014",
          "1/14/2014"
        ],
        "start": "2014-01-14",
        "end": "2014-01-14"
      },
      "time": {
        "start": "00:00",
        "end": "00:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=26&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Brian K Harris",
        "value": "31"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "23",
      "title": "In-store Demonstration",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every second week starting on 1/28/2014",
        "dates": [
          "1/28/2014"
        ],
        "start": "2014-01-28",
        "end": "2014-01-28"
      },
      "time": {
        "start": "00:00",
        "end": "00:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=23&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Mark Grogans",
        "value": "19"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "22",
      "title": "In-store Demonstration",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every Tuesday of every second week starting on 6/23/2020",
        "dates": [
          "6/23/2020"
        ],
        "start": "2020-06-23",
        "end": "2020-06-23"
      },
      "time": {
        "start": "00:00",
        "end": "00:30"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=22&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Mark Grogans",
        "value": "19"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "21",
      "title": "In-store Demonstration",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every Thursday of every second week starting on 6/25/2020",
        "dates": [
          "6/25/2020"
        ],
        "start": "2020-06-25",
        "end": "2020-06-25"
      },
      "time": {
        "start": "00:00",
        "end": "00:30"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=21&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Mark Grogans",
        "value": "19"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "20",
      "title": "In-store Demonstration",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Tentative",
        "value": "TENTATIVE",
        "code": "#6c757d"
      },
      "date": {
        "recurrence": "occurs every Thursday of every second week starting on 6/18/2020",
        "dates": [
          "6/18/2020"
        ],
        "start": "2020-06-18",
        "end": "2020-06-18"
      },
      "time": {
        "start": "00:00",
        "end": "00:30"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=20&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Mark Grogans",
        "value": "19"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "19",
      "title": "Catch up meeting",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 3/4/2014",
        "dates": [
          "3/4/2014"
        ],
        "start": "2014-03-04",
        "end": "2014-03-04"
      },
      "time": {
        "start": "00:00",
        "end": "00:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=19&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Brian K Harris",
        "value": "31"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "18",
      "title": "Vacation",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every day from 2/18/2014 until 2/18/2014",
        "dates": [
          "2/18/2014",
          "2/18/2014"
        ],
        "start": "2014-02-18",
        "end": "2014-02-18"
      },
      "time": {
        "start": "00:00",
        "end": "00:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=18&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Brian K Harris",
        "value": "31"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "14",
      "title": "Monthly Staff Meeting",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 9/13/2010",
        "dates": [
          "9/13/2010"
        ],
        "start": "2010-09-13",
        "end": "2010-09-13"
      },
      "time": {
        "start": "01:00",
        "end": "03:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=14&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Brian K Harris",
        "value": "31"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "12",
      "title": "Setup/Training session",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "Mark's Sporting Goods",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 4/8/2014",
        "dates": [
          "4/8/2014"
        ],
        "start": "2014-04-08",
        "end": "2014-04-08"
      },
      "time": {
        "start": "00:00",
        "end": "00:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=12&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Brad M Sparling",
        "value": "27"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "8",
      "title": "Service appointment",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 2/4/2014",
        "dates": [
          "2/4/2014"
        ],
        "start": "2014-02-04",
        "end": "2014-02-04"
      },
      "time": {
        "start": "00:00",
        "end": "00:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=8&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Brad M Sparling",
        "value": "27"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "7",
      "title": "Lunch",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "Big Burgers",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 1/21/2014",
        "dates": [
          "1/21/2014"
        ],
        "start": "2014-01-21",
        "end": "2014-01-21"
      },
      "time": {
        "start": "00:00",
        "end": "00:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=7&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Brad M Sparling",
        "value": "27"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "6",
      "title": "Service Team Meeting",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "one time event on 4/7/2014",
        "dates": [
          "4/7/2014"
        ],
        "start": "2014-04-07",
        "end": "2014-04-07"
      },
      "time": {
        "start": "00:00",
        "end": "00:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=6&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Brad M Sparling",
        "value": "27"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "5",
      "title": "Sales Team Meeting",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every week from 1/15/2014 until 1/15/2014",
        "dates": [
          "1/15/2014",
          "1/15/2014"
        ],
        "start": "2014-01-15",
        "end": "2014-01-15"
      },
      "time": {
        "start": "00:00",
        "end": "00:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=5&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Mark Grogans",
        "value": "19"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "3",
      "title": "Service Team Meeting",
      "workorder": {
        "text": "",
        "value": ""
      },
      "location": "",
      "status": {
        "text": "Confirmed",
        "value": "CONFIRMED",
        "code": "#026adf"
      },
      "date": {
        "recurrence": "occurs every week from 1/20/2014 until 1/20/2014",
        "dates": [
          "1/20/2014",
          "1/20/2014"
        ],
        "start": "2014-01-20",
        "end": "2014-01-20"
      },
      "time": {
        "start": "00:00",
        "end": "00:00"
      },
      "priority": {
        "text": "",
        "value": ""
      },
      "note": "",
      "url": "/app/crm/calendar/event.nl?id=3&compid=TSTDRV2617106",
      "color": "#1a6756",
      "woRef": {},
      "resources": [],
      "vendors": [],
      "assets": [],
      "items": [],
      "unassigned": true,
      "address": {
        "text": "",
        "value": ""
      },
      "organizer": {
        "text": "Brad M Sparling",
        "value": "27"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      },
      "assetMaintenance": false,
      "routingGroup": {
        "text": "",
        "value": ""
      },
      "salesorder": {
        "text": "",
        "value": ""
      }
    }
  ];
};

export const fetchEvents = async (): Promise<Event[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock event data for local development');
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMockEvents()), 500);
    });
  }

  try {
    let allData: Event[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&mode=getEvents&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`Event service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch events chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`Event service RESULT chunk ${i + 1}:`, chunkData);
      
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
    
    console.log(`Finished chunked fetch. Total event records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no event data across all chunks");
      throw new Error("No event data returned from API");
    }

    return allData;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const updateEvent = async (eventId: string, updates: Partial<Event>): Promise<Event> => {
  if (isLocalDevelopment()) {
    console.log('Mock updating event:', eventId, updates);
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockEvent = getMockEvents().find(e => e.id === eventId);
        if (mockEvent) {
          resolve({ ...mockEvent, ...updates });
        } else {
          throw new Error('Event not found');
        }
      }, 300);
    });
  }

  try {
    const url = `${suiteletUrl}&mode=updateEvent`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId,
        updates
      })
    });

    console.log('Update event RESPONSE:', response);

    if (!response.ok) {
      throw new Error(`Failed to update event: ${response.status}`);
    }

    const updatedEvent = await response.json();
    console.log('Update event RESULT:', updatedEvent);

    return updatedEvent;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};
