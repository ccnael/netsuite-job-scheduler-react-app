import { suiteletUrl } from '@/lib/constants';
import { isLocalDevelopment } from '@/lib/helpers';

export interface WorkOrder {
  id?: string;
  name?: string;
  title?: string;
  description?: string;
  memo?: string;
  status?: {
    text: string;
    value: string;
    code?: string;
  };
  type?: {
    text: string;
    value: string;
  };
  date?: string;
  customer?: {
    text: string;
    value: string;
  };
  project?: {
    text: string;
    value: string;
  };
  salesorder?: {
    text: string;
    value: string;
  };
  location?: {
    text: string;
    value: string;
  };
  projectInsight?: {
    text: string;
    value: string;
  }
  esthours?: string | number;  // or number if you plan to normalize
  woUrl?: string;
  soUrl?: string;
  projectUrl?: string;
  receiptStatus?: {
    text: string;
    value: string;
    code?: string;
    display?: string;
  };
}


const getMockWorkOrders = (): WorkOrder[] => {
  return [{
      "id": "141",
      "name": "HVAC Maintenance",
      "title": "HVAC Maintenance",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "3/14/2025",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": {
        "text": "Maintenance",
        "value": "25"
      },
      "memo": "<h4>Tasks:</h4><ol><li>Inspect and clean air filters.</li><li>Check the refrigerant levels and refill if necessary.</li><li>Inspect electrical connections and tighten any loose ones.</li><li>Test the system for correct operation.</li></ol>",
      "salesorder": {
        "text": "Sales Order #SLS00000848",
        "value": "25472"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=141&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=25472&compid=TSTDRV2617106",
      "esthours": "2000",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "Partially Received",
        "value": "2",
        "code": "#FF5733",
        "display": "Partial Received"
      },
      "projectInsight": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "140",
      "name": "Product Core Testing - 2",
      "title": "Product Core Testing - 2",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "3/11/2025",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": {
        "text": "Maintenance",
        "value": "25"
      },
      "memo": "<p><strong>Product Core Testing - 2</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000837",
        "value": "24432"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=140&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=24432&compid=TSTDRV2617106",
      "esthours": "10000",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "Partially Received",
        "value": "2",
        "code": "#FF5733",
        "display": "Partial Received"
      },
      "projectInsight": {
        "text": "PI366",
        "value": "366"
      }
    },
    {
      "id": "139",
      "name": "Lobby Area - Product Test",
      "title": "Lobby Area - Product Test",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "3/11/2025",
      "status": {
        "text": "Not Started",
        "value": "8",
        "code": "#026adf"
      },
      "type": {
        "text": "Moves",
        "value": "3"
      },
      "memo": "<p><strong>Lobby Area - Product Test</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000836",
        "value": "24428"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=139&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=24428&compid=TSTDRV2617106",
      "esthours": "5000",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "Partially Received",
        "value": "2",
        "code": "#FF5733",
        "display": "Partial Received"
      },
      "projectInsight": {
        "text": "PI362",
        "value": "362"
      }
    },
    {
      "id": "138",
      "name": "Lobby Area - Product Core Dryrun",
      "title": "Lobby Area - Product Core Dryrun",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "3/10/2025",
      "status": {
        "text": "Not Started",
        "value": "8",
        "code": "#026adf"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Lobby Area - Product Core Dryrun</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000835",
        "value": "24427"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=138&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=24427&compid=TSTDRV2617106",
      "esthours": "1000",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "Not Received",
        "value": "1"
      },
      "projectInsight": {
        "text": "PI361",
        "value": "361"
      }
    },
    {
      "id": "137",
      "name": "Android Full Dryrun",
      "title": "Android Full Dryrun",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "2/27/2025",
      "status": {
        "text": "Not Started",
        "value": "8",
        "code": "#026adf"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<h4><strong>Scope of Work:</strong></h4><p>Install and assemble office furniture in the new Greenfield Solutions office space. The layout includes individual workstations, conference room tables, and lounge area furniture.</p><h4><strong>Items to be Installed:</strong></h4><ol><li><strong>Workstations</strong>:<ul><li><strong>Quantity</strong>: 15 cubicle workstations with desks and chairs</li><li><strong>Model</strong>: ErgoFit Sit-Stand Desk</li><li><strong>Assembly Instructions</strong>: Ensure the height adjustment mechanisms are functioning correctly. Chairs should be at the lowest height when delivered.</li><li><strong>Placement</strong>: As per the office layout, positioned in rows of 3 along the north wall.</li></ul></li><li><strong>Conference Room Table</strong>:<ul><li><strong>Quantity</strong>: 1 large rectangular table with 10 chairs</li><li><strong>Model</strong>: ModernBoard Conference Series</li><li><strong>Assembly Instructions</strong>: Attach legs securely to the table top and ensure all chairs are adjusted to equal height.</li><li><strong>Placement</strong>: Conference Room A, center of the room.</li></ul></li><li><strong>Lounge Furniture</strong>:<ul><li><strong>Quantity</strong>: 2 sectional couches, 1 coffee table, 4 lounge chairs</li><li><strong>Model</strong>: Relaxio Lounge Set</li><li><strong>Assembly Instructions</strong>: Assemble sectional couches by connecting parts A and B, and ensure cushions are evenly placed.</li><li><strong>Placement</strong>: Lounge area, next to the large windows, as per the attached floor plan.</li></ul></li></ol><h4><strong>Special Instructions:</strong></h4><ul><li><strong>Wall Mounting</strong>: Two whiteboards (4x6 ft) should be mounted in Conference Room A. Please verify with Jane Doe for precise positioning before drilling.</li><li><strong>Cable Management</strong>: Install cable trays beneath workstations to organize power and data cables.</li><li><strong>Final Check</strong>: Ensure all furniture is level, and check that no screws or components are loose after assembly.</li><li><strong>Clean-Up</strong>: All packaging materials should be disposed of or neatly stacked in the loading area. Ensure the office space is clean and ready for use after installation.</li></ul>",
      "salesorder": {
        "text": "Sales Order #SLS00000826",
        "value": "23471"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=137&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=23471&compid=TSTDRV2617106",
      "esthours": "500",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "Partially Received",
        "value": "2",
        "code": "#FF5733",
        "display": "Partial Received"
      },
      "projectInsight": {
        "text": "PI351",
        "value": "351"
      }
    },
    {
      "id": "136",
      "name": "Lobby Area 1",
      "title": "Lobby Area 1",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "2/19/2025",
      "status": {
        "text": "Not Started",
        "value": "8",
        "code": "#026adf"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<h4><strong style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">1. Pre-Installation Preparation</strong></h4><ul><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Review work order details, verify furniture type and quantities.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Gather necessary tools (screwdrivers, drills, level, etc.) and protective gear.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Inspect furniture for damages and ensure all hardware is included.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Confirm access to the installation site (keys, security clearance, etc.).</span></li></ul><h4><strong style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">2. On-Site Installation</strong></h4><ul><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Confirm furniture placement with the client, referencing layout plans.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Unpack items carefully and organize packaging to maintain a clean area.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Assemble furniture according to manufacturer’s instructions.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Ensure proper leveling and alignment using a level.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Begin with larger furniture pieces, then move to smaller items.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">For wall-mounted items, locate studs and use proper anchors.</span></li></ul><h4><strong style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">3. Post-Installation Checklist</strong></h4><ul><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Inspect all furniture for stability, alignment, and quality.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Verify furniture is placed according to client’s specifications.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Remove all packaging, debris, and clean furniture surfaces.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Walk the client through the installation and address any concerns.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Obtain client’s sign-off on completed work.</span></li></ul><h4><strong style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">4. Additional Notes</strong></h4><ul><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Report damaged or missing items to the project manager immediately.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Log start/end times and report any delays or issues.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Follow special project instructions as necessary.</span></li></ul>",
      "salesorder": {
        "text": "Sales Order #SLS00000818",
        "value": "22934"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=136&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22934&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "Partially Received",
        "value": "2",
        "code": "#FF5733",
        "display": "Partial Received"
      },
      "projectInsight": {
        "text": "PI345",
        "value": "345"
      }
    },
    {
      "id": "135",
      "name": "Creation of New Work Order",
      "title": "Creation of New Work Order",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "1/21/2025",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Maintenance",
        "value": "25"
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000811",
        "value": "22902"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=135&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22902&compid=TSTDRV2617106",
      "esthours": "0",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI335",
        "value": "335"
      }
    },
    {
      "id": "134",
      "name": "Lobby Area",
      "title": "Lobby Area",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "1/20/2025",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<h4><strong>1. Pre-Installation Preparation</strong></h4><ul><li>Review work order details, verify furniture type and quantities.</li><li>Gather necessary tools (screwdrivers, drills, level, etc.) and protective gear.</li><li>Inspect furniture for damages and ensure all hardware is included.</li><li>Confirm access to the installation site (keys, security clearance, etc.).</li></ul><h4><strong>2. On-Site Installation</strong></h4><ul><li>Confirm furniture placement with the client, referencing layout plans.</li><li>Unpack items carefully and organize packaging to maintain a clean area.</li><li>Assemble furniture according to manufacturer’s instructions.</li><li>Ensure proper leveling and alignment using a level.</li><li>Begin with larger furniture pieces, then move to smaller items.</li><li>For wall-mounted items, locate studs and use proper anchors.</li></ul><h4><strong>3. Post-Installation Checklist</strong></h4><ul><li>Inspect all furniture for stability, alignment, and quality.</li><li>Verify furniture is placed according to client’s specifications.</li><li>Remove all packaging, debris, and clean furniture surfaces.</li><li>Walk the client through the installation and address any concerns.</li><li>Obtain client’s sign-off on completed work.</li></ul><h4><strong>4. Additional Notes</strong></h4><ul><li>Report damaged or missing items to the project manager immediately.</li><li>Log start/end times and report any delays or issues.</li><li>Follow special project instructions as necessary.</li></ul><p></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000811",
        "value": "22902"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=134&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22902&compid=TSTDRV2617106",
      "esthours": "100",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI335",
        "value": "335"
      }
    },
    {
      "id": "133",
      "name": "Office Room 2",
      "title": "Office Room 2",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "1/20/2025",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Test</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000810",
        "value": "22901"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=133&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22901&compid=TSTDRV2617106",
      "esthours": "50",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI334",
        "value": "334"
      }
    },
    {
      "id": "132",
      "name": "Office Area 1",
      "title": "Office Area 1",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "1/20/2025",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Office Area 1</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000810",
        "value": "22901"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=132&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22901&compid=TSTDRV2617106",
      "esthours": "0",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "Not Received",
        "value": "1"
      },
      "projectInsight": {
        "text": "PI334",
        "value": "334"
      }
    },
    {
      "id": "131",
      "name": "Lobby Area",
      "title": "Lobby Area",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "1/20/2025",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Lobby Area</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000810",
        "value": "22901"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=131&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22901&compid=TSTDRV2617106",
      "esthours": "50",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI334",
        "value": "334"
      }
    },
    {
      "id": "130",
      "name": "Office Room A",
      "title": "Office Room A",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "1/20/2025",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<h4><strong>1. Pre-Installation Preparation</strong></h4><ul><li>Review work order details, verify furniture type and quantities.</li><li>Gather necessary tools (screwdrivers, drills, level, etc.) and protective gear.</li><li>Inspect furniture for damages and ensure all hardware is included.</li><li>Confirm access to the installation site (keys, security clearance, etc.).</li></ul><h4><strong>2. On-Site Installation</strong></h4><ul><li>Confirm furniture placement with the client, referencing layout plans.</li><li>Unpack items carefully and organize packaging to maintain a clean area.</li><li>Assemble furniture according to manufacturer’s instructions.</li><li>Ensure proper leveling and alignment using a level.</li><li>Begin with larger furniture pieces, then move to smaller items.</li><li>For wall-mounted items, locate studs and use proper anchors.</li></ul><h4><strong>3. Post-Installation Checklist</strong></h4><ul><li>Inspect all furniture for stability, alignment, and quality.</li><li>Verify furniture is placed according to client’s specifications.</li><li>Remove all packaging, debris, and clean furniture surfaces.</li><li>Walk the client through the installation and address any concerns.</li><li>Obtain client’s sign-off on completed work.</li></ul><h4><strong>4. Additional Notes</strong></h4><ul><li>Report damaged or missing items to the project manager immediately.</li><li>Log start/end times and report any delays or issues.</li><li>Follow special project instructions as necessary.</li></ul>",
      "salesorder": {
        "text": "Sales Order #SLS00000809",
        "value": "22900"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=130&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22900&compid=TSTDRV2617106",
      "esthours": "10",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI333",
        "value": "333"
      }
    },
    {
      "id": "129",
      "name": "Lobby Area",
      "title": "Lobby Area",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "1/17/2025",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Lobby Area</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000809",
        "value": "22900"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=129&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22900&compid=TSTDRV2617106",
      "esthours": "80",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI333",
        "value": "333"
      }
    },
    {
      "id": "128",
      "name": "Lobby Area",
      "title": "Lobby Area",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "1/20/2025",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Lobby Area</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000808",
        "value": "22899"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=128&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22899&compid=TSTDRV2617106",
      "esthours": "0",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI332",
        "value": "332"
      }
    },
    {
      "id": "127",
      "name": "Office Room B",
      "title": "Office Room B",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "1/20/2025",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p>Office Room B</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000807",
        "value": "22898"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=127&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22898&compid=TSTDRV2617106",
      "esthours": "500",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI331",
        "value": "331"
      }
    },
    {
      "id": "126",
      "name": "Office Room A",
      "title": "Office Room A",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "1/20/2025",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Office Room A</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000807",
        "value": "22898"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=126&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22898&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI331",
        "value": "331"
      }
    },
    {
      "id": "125",
      "name": "Lobby Area",
      "title": "Lobby Area",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "1/20/2025",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Lobby Area</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000807",
        "value": "22898"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=125&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22898&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI331",
        "value": "331"
      }
    },
    {
      "id": "124",
      "name": "Testing with Lean",
      "title": "Testing with Lean",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "1/16/2025",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Demo",
        "value": "5"
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000803",
        "value": "22468"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=124&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22468&compid=TSTDRV2617106",
      "esthours": "0",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI328",
        "value": "328"
      }
    },
    {
      "id": "123",
      "name": "Test Work Order - AC Installation",
      "title": "Test Work Order - AC Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "1/8/2025",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000803",
        "value": "22468"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=123&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22468&compid=TSTDRV2617106",
      "esthours": "100",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI328",
        "value": "328"
      }
    },
    {
      "id": "122",
      "name": "World Bank_WRKORDR0001",
      "title": "World Bank_WRKORDR0001",
      "project": {
        "text": "World Bank : Window Installation",
        "value": "2049"
      },
      "date": "12/18/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Demo",
        "value": "5"
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000795",
        "value": "22459"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=2049&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=122&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22459&compid=TSTDRV2617106",
      "esthours": "40",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI320",
        "value": "320"
      }
    },
    {
      "id": "121",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "11/26/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</p><p>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</p><p>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</p><p>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</p><p>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</p><p>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</p><p>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</p><p>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</p><p>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</p><p>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000786",
        "value": "20919"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=121&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20919&compid=TSTDRV2617106",
      "esthours": "2000",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI310",
        "value": "310"
      }
    },
    {
      "id": "120",
      "name": "Installation of Furnitures",
      "title": "Installation of Furnitures",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "11/26/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000785",
        "value": "20917"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=120&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20917&compid=TSTDRV2617106",
      "esthours": "50",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI309",
        "value": "309"
      }
    },
    {
      "id": "119",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "11/12/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<ol><li>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</li><li>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</li><li>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</li><li>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</li><li>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</li><li>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</li><li>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</li><li>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</li><li>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</li><li>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</li></ol>",
      "salesorder": {
        "text": "Sales Order #SLS00000785",
        "value": "20917"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=119&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20917&compid=TSTDRV2617106",
      "esthours": "10",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI309",
        "value": "309"
      }
    },
    {
      "id": "118",
      "name": "AV Installation",
      "title": "AV Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "11/12/2024",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": {
        "text": "Demo",
        "value": "5"
      },
      "memo": "<p>-AV Install</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000786",
        "value": "20919"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=118&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20919&compid=TSTDRV2617106",
      "esthours": "10",
      "location": {
        "text": "02: Boston",
        "value": "123123123213"
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI310",
        "value": "310"
      }
    },
    {
      "id": "117",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "11/12/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</p><p>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</p><p>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</p><p>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</p><p>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</p><p>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</p><p>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</p><p>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</p><p>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</p><p>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000783",
        "value": "20915"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=117&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20915&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "Atlanta",
        "value": "99999999"
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI307",
        "value": "307"
      }
    },
    {
      "id": "116",
      "name": "Window Placement Planning",
      "title": "Window Placement Planning",
      "project": {
        "text": "World Bank : Window Installation",
        "value": "2049"
      },
      "date": "11/13/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000782",
        "value": "20914"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=2049&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=116&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20914&compid=TSTDRV2617106",
      "esthours": "40",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI306",
        "value": "306"
      }
    },
    {
      "id": "115",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "11/12/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<ol><li>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</li><li>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</li><li>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</li><li>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</li><li>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</li><li>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</li><li>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</li><li>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</li><li>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</li><li>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</li></ol>",
      "salesorder": {
        "text": "Sales Order #SLS00000781",
        "value": "20911"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=115&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20911&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI304",
        "value": "304"
      }
    },
    {
      "id": "114",
      "name": "Lobby Room",
      "title": "Lobby Room",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "11/12/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Lobby Room</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000780",
        "value": "20910"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=114&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20910&compid=TSTDRV2617106",
      "esthours": "100",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI303",
        "value": "303"
      }
    },
    {
      "id": "113",
      "name": "Furniture Delivery",
      "title": "Furniture Delivery",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "11/12/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Furniture Delivery</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000779",
        "value": "20908"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=113&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20908&compid=TSTDRV2617106",
      "esthours": "20",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI302",
        "value": "302"
      }
    },
    {
      "id": "112",
      "name": "AV Installation",
      "title": "AV Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "11/11/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<ol><li>Pick up the products</li><li>Verify installation kit on the box</li><li>Etc..</li></ol>",
      "salesorder": {
        "text": "Sales Order #SLS00000778",
        "value": "20907"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=112&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20907&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI301",
        "value": "301"
      }
    },
    {
      "id": "111",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "11/11/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<ol><li>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</li><li>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</li><li>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</li><li>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</li><li>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</li><li>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</li><li>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</li><li>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</li><li>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</li><li>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</li></ol>",
      "salesorder": {
        "text": "Sales Order #SLS00000777",
        "value": "20906"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=111&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20906&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI300",
        "value": "300"
      }
    },
    {
      "id": "110",
      "name": "Install AC",
      "title": "Install AC",
      "project": {
        "text": "World Bank : World Bank AC Installation",
        "value": "2045"
      },
      "date": "11/12/2024",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000776",
        "value": "20905"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=2045&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=110&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20905&compid=TSTDRV2617106",
      "esthours": "30",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "Not Received",
        "value": "1"
      },
      "projectInsight": {
        "text": "PI299",
        "value": "299"
      }
    },
    {
      "id": "109",
      "name": "Install Office Furniture",
      "title": "Install Office Furniture",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "11/12/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000774",
        "value": "20903"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=109&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20903&compid=TSTDRV2617106",
      "esthours": "30",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI297",
        "value": "297"
      }
    },
    {
      "id": "108",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "11/11/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</p><p>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</p><p>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</p><p>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</p><p>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</p><p>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</p><p>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</p><p>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</p><p>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</p><p>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000772",
        "value": "20901"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=108&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20901&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI295",
        "value": "295"
      }
    },
    {
      "id": "107",
      "name": "Install Cove Lights - Follow Up",
      "title": "Install Cove Lights - Follow Up",
      "project": {
        "text": "3M : Light Fixtures Installation",
        "value": "2042"
      },
      "date": "11/11/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000771",
        "value": "20900"
      },
      "customer": {
        "text": "3M",
        "value": "1397"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=2042&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=107&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20900&compid=TSTDRV2617106",
      "esthours": "40",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI294",
        "value": "294"
      }
    },
    {
      "id": "106",
      "name": "Install Cove Lights",
      "title": "Install Cove Lights",
      "project": {
        "text": "3M : Light Fixtures Installation",
        "value": "2042"
      },
      "date": "11/11/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000771",
        "value": "20900"
      },
      "customer": {
        "text": "3M",
        "value": "1397"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=2042&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=106&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20900&compid=TSTDRV2617106",
      "esthours": "40",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI294",
        "value": "294"
      }
    },
    {
      "id": "105",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "11/10/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<ol><li>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</li><li>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</li><li>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</li><li>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</li><li>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</li><li>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</li><li>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</li><li>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</li><li>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</li><li>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</li></ol>",
      "salesorder": {
        "text": "Sales Order #SLS00000770",
        "value": "20899"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=105&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20899&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI293",
        "value": "293"
      }
    },
    {
      "id": "104",
      "name": "AV Installation Only",
      "title": "AV Installation Only",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "11/10/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<ol><li>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</li><li>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</li><li>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</li><li>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</li><li>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</li><li>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</li><li>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</li><li>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</li><li>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</li><li>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</li></ol>",
      "salesorder": {
        "text": "Sales Order #SLS00000770",
        "value": "20899"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=104&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20899&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI293",
        "value": "293"
      }
    },
    {
      "id": "103",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "11/10/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<ol><li>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</li><li>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</li><li>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</li><li>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</li><li>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</li><li>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</li><li>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</li><li>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</li><li>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</li><li>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</li></ol>",
      "salesorder": {
        "text": "Sales Order #SLS00000769",
        "value": "20898"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=103&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20898&compid=TSTDRV2617106",
      "esthours": "100",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI292",
        "value": "292"
      }
    },
    {
      "id": "102",
      "name": "Furniture Installation and Pickup - Mei",
      "title": "Furniture Installation and Pickup - Mei",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "11/11/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Demo",
        "value": "5"
      },
      "memo": "<p>Furniture Installation and Pickup - Mei</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000768",
        "value": "20897"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=102&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20897&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI291",
        "value": "291"
      }
    },
    {
      "id": "101",
      "name": "Furniture Installation and Pickup",
      "title": "Furniture Installation and Pickup",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "11/10/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "Demo",
        "value": "5"
      },
      "memo": "<p>Furniture Installation and Pickup</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000713",
        "value": "19372"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=101&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19372&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI235",
        "value": "235"
      }
    },
    {
      "id": "100",
      "name": "Work Order Dry Run - Nov 8",
      "title": "Work Order Dry Run - Nov 8",
      "project": {
        "text": "World Bank : Design, Furniture and Flooring Project",
        "value": "1612"
      },
      "date": "11/8/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Work Order Dry Run - Nov 8</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000766",
        "value": "20892"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=100&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20892&compid=TSTDRV2617106",
      "esthours": "1000",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI289",
        "value": "289"
      }
    },
    {
      "id": "99",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "11/7/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "Demo",
        "value": "5"
      },
      "memo": "<p>Please assign a team to [describe task, e.g., &quot;repair the leaking faucet in the second-floor bathroom&quot;]. This work is needed to address [reason or issue, e.g., &quot;water damage and ensure functionality for occupants&quot;]. Ideally, the work should begin by [preferred start date, e.g., &quot;next week&quot;] and be completed by [completion date, if any]. Required materials include [list any specific materials needed, if known, e.g., &quot;sealant, replacement parts&quot;]. Please provide an update on the estimated timeline and any potential challenges. Thank you for prioritizing this request to ensure safe and efficient operation.</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000740",
        "value": "20024"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=99&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20024&compid=TSTDRV2617106",
      "esthours": "400",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI262",
        "value": "262"
      }
    },
    {
      "id": "98",
      "name": "Work Order for Testing Nov 5 -3",
      "title": "Work Order for Testing Nov 5 -3",
      "project": {
        "text": "World Bank : Design, Furniture and Flooring Project",
        "value": "1612"
      },
      "date": "11/6/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Mockup",
        "value": "6"
      },
      "memo": "<p><strong>Work Order for Testing Nov 5 -3</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000755",
        "value": "20872"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=98&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20872&compid=TSTDRV2617106",
      "esthours": "100",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI278",
        "value": "278"
      }
    },
    {
      "id": "97",
      "name": "Work Order for Testing Nov 5 - 2",
      "title": "Work Order for Testing Nov 5 - 2",
      "project": {
        "text": "World Bank : Design, Furniture and Flooring Project",
        "value": "1612"
      },
      "date": "12/1/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Work Order for Testing Nov 5 - 2</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000755",
        "value": "20872"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=97&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20872&compid=TSTDRV2617106",
      "esthours": "1000",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI278",
        "value": "278"
      }
    },
    {
      "id": "96",
      "name": "Work Order for Testing Nov 5",
      "title": "Work Order for Testing Nov 5",
      "project": {
        "text": "World Bank : Design, Furniture and Flooring Project",
        "value": "1612"
      },
      "date": "11/5/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Work Order for Testing Nov 5</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000755",
        "value": "20872"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=96&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20872&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI278",
        "value": "278"
      }
    },
    {
      "id": "95",
      "name": "Work Order - Nov 4 Dry run",
      "title": "Work Order - Nov 4 Dry run",
      "project": {
        "text": "World Bank : Design, Furniture and Flooring Project",
        "value": "1612"
      },
      "date": "11/11/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Walls",
        "value": "4"
      },
      "memo": "<p><strong>Work Order - Nov 4 Dry run</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000751",
        "value": "20868"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=95&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20868&compid=TSTDRV2617106",
      "esthours": "2000",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI274",
        "value": "274"
      }
    },
    {
      "id": "94",
      "name": "Test Work Order - Nov 4",
      "title": "Test Work Order - Nov 4",
      "project": {
        "text": "World Bank : Design, Furniture and Flooring Project",
        "value": "1612"
      },
      "date": "11/18/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Walls",
        "value": "4"
      },
      "memo": "<p><strong>Test Work Order - Nov 4</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000750",
        "value": "20867"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=94&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20867&compid=TSTDRV2617106",
      "esthours": "1000",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI273",
        "value": "273"
      }
    },
    {
      "id": "93",
      "name": "Work Order Nov 4 - Test only",
      "title": "Work Order Nov 4 - Test only",
      "project": {
        "text": "World Bank : Design, Furniture and Flooring Project",
        "value": "1612"
      },
      "date": "11/18/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Moves",
        "value": "3"
      },
      "memo": "<p><strong>Work Order Nov 4 - Test only</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000748",
        "value": "20852"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=93&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20852&compid=TSTDRV2617106",
      "esthours": "500",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI271",
        "value": "271"
      }
    },
    {
      "id": "92",
      "name": "Work Order - Oct 31 - Test 1",
      "title": "Work Order - Oct 31 - Test 1",
      "project": {
        "text": "World Bank : Design, Furniture and Flooring Project",
        "value": "1612"
      },
      "date": "11/1/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Work Order - Oct 31 - Test 1</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000748",
        "value": "20852"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=92&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20852&compid=TSTDRV2617106",
      "esthours": "2000",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI271",
        "value": "271"
      }
    },
    {
      "id": "91",
      "name": "Work Order - Oct 31",
      "title": "Work Order - Oct 31",
      "project": {
        "text": "World Bank : Design, Furniture and Flooring Project",
        "value": "1612"
      },
      "date": "11/1/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Walls",
        "value": "4"
      },
      "memo": "<p><strong>Work Order - Oct 31</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000747",
        "value": "20851"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=91&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20851&compid=TSTDRV2617106",
      "esthours": "2000",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI270",
        "value": "270"
      }
    },
    {
      "id": "90",
      "name": "Test WO",
      "title": "Test WO",
      "project": {
        "text": "World Bank : Design, Furniture and Flooring Project",
        "value": "1612"
      },
      "date": "11/1/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p>Test WO</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000746",
        "value": "20845"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=90&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20845&compid=TSTDRV2617106",
      "esthours": "500",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI269",
        "value": "269"
      }
    },
    {
      "id": "89",
      "name": "Work Order Oct 31 - Mei",
      "title": "Work Order Oct 31 - Mei",
      "project": {
        "text": "World Bank : Design, Furniture and Flooring Project",
        "value": "1612"
      },
      "date": "11/1/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Work Order Oct 31 - Mei</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000746",
        "value": "20845"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=89&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20845&compid=TSTDRV2617106",
      "esthours": "500",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI269",
        "value": "269"
      }
    },
    {
      "id": "88",
      "name": "Test Dry Run Oct 31",
      "title": "Test Dry Run Oct 31",
      "project": {
        "text": "World Bank : Design, Furniture and Flooring Project",
        "value": "1612"
      },
      "date": "11/1/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Test Dry Run Oct 31</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000746",
        "value": "20845"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=88&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20845&compid=TSTDRV2617106",
      "esthours": "1000",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI269",
        "value": "269"
      }
    },
    {
      "id": "87",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/30/2024",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p>Furniture Installation</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000740",
        "value": "20024"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=87&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20024&compid=TSTDRV2617106",
      "esthours": "1000",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI262",
        "value": "262"
      }
    },
    {
      "id": "86",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "10/21/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p><strong>Test Work Order - Mei</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000739",
        "value": "19521"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=86&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19521&compid=TSTDRV2617106",
      "esthours": "100",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI261",
        "value": "261"
      }
    },
    {
      "id": "85",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "10/21/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Furniture Installation</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000739",
        "value": "19521"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=85&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19521&compid=TSTDRV2617106",
      "esthours": "100",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI261",
        "value": "261"
      }
    },
    {
      "id": "84",
      "name": "Test Work order",
      "title": "Test Work order",
      "project": {
        "text": "Deloitte New York : Design, Furniture and Flooring Installation",
        "value": "2026"
      },
      "date": "10/18/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000733",
        "value": "19413"
      },
      "customer": {
        "text": "Deloitte New York",
        "value": "2024"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=2026&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=84&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19413&compid=TSTDRV2617106",
      "esthours": "1",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI255",
        "value": "255"
      }
    },
    {
      "id": "83",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "10/21/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p><strong>Test Work Order - Mei</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000736",
        "value": "19418"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=83&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19418&compid=TSTDRV2617106",
      "esthours": "500",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI259",
        "value": "259"
      }
    },
    {
      "id": "82",
      "name": "Work Order Test **Do not use** - Mei",
      "title": "Work Order Test **Do not use** - Mei",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "10/21/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p><strong>Work Order Test **Do not use** - Mei</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000734",
        "value": "19414"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=82&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19414&compid=TSTDRV2617106",
      "esthours": "500",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI256",
        "value": "256"
      }
    },
    {
      "id": "81",
      "name": "FOP User Guide TEST",
      "title": "FOP User Guide TEST",
      "project": {
        "text": "Deloitte New York : Design, Furniture and Flooring Installation",
        "value": "2026"
      },
      "date": "10/14/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000733",
        "value": "19413"
      },
      "customer": {
        "text": "Deloitte New York",
        "value": "2024"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=2026&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=81&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19413&compid=TSTDRV2617106",
      "esthours": "1",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI255",
        "value": "255"
      }
    },
    {
      "id": "80",
      "name": "FOP User Guide ",
      "title": "FOP User Guide",
      "project": {
        "text": "Deloitte New York : Design, Furniture and Flooring Installation",
        "value": "2026"
      },
      "date": "10/14/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000733",
        "value": "19413"
      },
      "customer": {
        "text": "Deloitte New York",
        "value": "2024"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=2026&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=80&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19413&compid=TSTDRV2617106",
      "esthours": "1",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI255",
        "value": "255"
      }
    },
    {
      "id": "79",
      "name": "Work Order Test 4",
      "title": "Work Order Test 4",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "10/14/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000726",
        "value": "19400"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=79&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19400&compid=TSTDRV2617106",
      "esthours": "5",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI250",
        "value": "250"
      }
    },
    {
      "id": "78",
      "name": "Test Work Order 3",
      "title": "Test Work Order 3",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "10/7/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000726",
        "value": "19400"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=78&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19400&compid=TSTDRV2617106",
      "esthours": "5",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI250",
        "value": "250"
      }
    },
    {
      "id": "77",
      "name": "Test Work Order 2",
      "title": "Test Work Order 2",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "10/7/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000726",
        "value": "19400"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=77&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19400&compid=TSTDRV2617106",
      "esthours": "5",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI250",
        "value": "250"
      }
    },
    {
      "id": "76",
      "name": "AV Installation",
      "title": "AV Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "10/7/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "Repair",
        "value": "26"
      },
      "memo": "<p>Furniture Installation</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000726",
        "value": "19400"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=76&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19400&compid=TSTDRV2617106",
      "esthours": "50",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI250",
        "value": "250"
      }
    },
    {
      "id": "75",
      "name": "Test Fop Dry Run Part 2",
      "title": "Test Fop Dry Run Part 2",
      "project": {
        "text": "Deloitte New York : Design, Furniture and Flooring Installation",
        "value": "2026"
      },
      "date": "10/7/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000725",
        "value": "19399"
      },
      "customer": {
        "text": "Deloitte New York",
        "value": "2024"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=2026&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=75&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19399&compid=TSTDRV2617106",
      "esthours": "",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI249",
        "value": "249"
      }
    },
    {
      "id": "74",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "10/8/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Furniture Installation</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000715",
        "value": "19388"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=74&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19388&compid=TSTDRV2617106",
      "esthours": "50",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI237",
        "value": "237"
      }
    },
    {
      "id": "73",
      "name": "Test FOP Dry Run2",
      "title": "Test FOP Dry Run2",
      "project": {
        "text": "Deloitte New York : Design, Furniture and Flooring Installation",
        "value": "2026"
      },
      "date": "9/26/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000718",
        "value": "19391"
      },
      "customer": {
        "text": "Deloitte New York",
        "value": "2024"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=2026&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=73&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19391&compid=TSTDRV2617106",
      "esthours": "",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI240",
        "value": "240"
      }
    },
    {
      "id": "72",
      "name": "1 Oct Test Work Order",
      "title": "1 Oct Test Work Order",
      "project": {
        "text": "White House Administration : Furniture Installation",
        "value": "1903"
      },
      "date": "9/30/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000721",
        "value": "19394"
      },
      "customer": {
        "text": "White House Administration",
        "value": "1387"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1903&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=72&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19394&compid=TSTDRV2617106",
      "esthours": "100",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI243",
        "value": "243"
      }
    },
    {
      "id": "71",
      "name": "Test",
      "title": "Test",
      "project": {
        "text": "Deloitte New York : Design, Furniture and Flooring Installation",
        "value": "2026"
      },
      "date": "9/30/2024",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000718",
        "value": "19391"
      },
      "customer": {
        "text": "Deloitte New York",
        "value": "2024"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=2026&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=71&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19391&compid=TSTDRV2617106",
      "esthours": "",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI240",
        "value": "240"
      }
    },
    {
      "id": "70",
      "name": "Test FOP Dry Run",
      "title": "Test FOP Dry Run",
      "project": {
        "text": "Deloitte New York : Design, Furniture and Flooring Installation",
        "value": "2026"
      },
      "date": "9/30/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000718",
        "value": "19391"
      },
      "customer": {
        "text": "Deloitte New York",
        "value": "2024"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=2026&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=70&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19391&compid=TSTDRV2617106",
      "esthours": "",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI240",
        "value": "240"
      }
    },
    {
      "id": "69",
      "name": "Test customer center",
      "title": "Test customer center",
      "project": {
        "text": "Deloitte New York : Design, Furniture and Flooring Installation",
        "value": "2026"
      },
      "date": "9/30/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000717",
        "value": "19390"
      },
      "customer": {
        "text": "Deloitte New York",
        "value": "2024"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=2026&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=69&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19390&compid=TSTDRV2617106",
      "esthours": "",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI239",
        "value": "239"
      }
    },
    {
      "id": "67",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/26/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Repair",
        "value": "26"
      },
      "memo": "<p><strong>Furniture Installation</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000715",
        "value": "19388"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=67&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19388&compid=TSTDRV2617106",
      "esthours": "100",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI237",
        "value": "237"
      }
    },
    {
      "id": "66",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "9/26/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000713",
        "value": "19372"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=66&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19372&compid=TSTDRV2617106",
      "esthours": "99",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI235",
        "value": "235"
      }
    },
    {
      "id": "65",
      "name": "TEST XYZ",
      "title": "TEST XYZ",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "9/26/2024",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000672",
        "value": "17379"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=65&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17379&compid=TSTDRV2617106",
      "esthours": "99",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI181",
        "value": "181"
      }
    },
    {
      "id": "63",
      "name": "test site test",
      "title": "test site test",
      "project": {
        "text": "Pravallika : Furniture and Walls Installation",
        "value": "2010"
      },
      "date": "9/23/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000688",
        "value": "17739"
      },
      "customer": {
        "text": "Pravallika",
        "value": "2008"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=2010&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=63&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17739&compid=TSTDRV2617106",
      "esthours": "",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI210",
        "value": "210"
      }
    },
    {
      "id": "62",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/5/2024",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": {
        "text": "Repair",
        "value": "26"
      },
      "memo": "<p>Furniture Installation</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=62&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "esthours": "2",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI157",
        "value": "157"
      }
    },
    {
      "id": "61",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/23/2024",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Furniture Installation</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000686",
        "value": "17729"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=61&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17729&compid=TSTDRV2617106",
      "esthours": "40",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI208",
        "value": "208"
      }
    },
    {
      "id": "60",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/23/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Sample Work Order - Mei - DO NOT USE</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000686",
        "value": "17729"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=60&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17729&compid=TSTDRV2617106",
      "esthours": "50",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI208",
        "value": "208"
      }
    },
    {
      "id": "59",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/23/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Moves",
        "value": "3"
      },
      "memo": "<p><strong>Furniture Installation</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000686",
        "value": "17729"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=59&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17729&compid=TSTDRV2617106",
      "esthours": "50",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI208",
        "value": "208"
      }
    },
    {
      "id": "58",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/23/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Walls",
        "value": "4"
      },
      "memo": "<p><strong>Furniture Installation</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000686",
        "value": "17729"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=58&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17729&compid=TSTDRV2617106",
      "esthours": "50",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI208",
        "value": "208"
      }
    },
    {
      "id": "57",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/23/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Furniture Installation</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000686",
        "value": "17729"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=57&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17729&compid=TSTDRV2617106",
      "esthours": "50",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI208",
        "value": "208"
      }
    },
    {
      "id": "56",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/23/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p>Furniture Installation</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000686",
        "value": "17729"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=56&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17729&compid=TSTDRV2617106",
      "esthours": "10",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI208",
        "value": "208"
      }
    },
    {
      "id": "55",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/23/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>Furniture Installation</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000686",
        "value": "17729"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=55&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17729&compid=TSTDRV2617106",
      "esthours": "20",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI208",
        "value": "208"
      }
    },
    {
      "id": "54",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/23/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Maintenance",
        "value": "25"
      },
      "memo": "<p>Furniture Installation</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000686",
        "value": "17729"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=54&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17729&compid=TSTDRV2617106",
      "esthours": "5",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI208",
        "value": "208"
      }
    },
    {
      "id": "50",
      "name": "test site test",
      "title": "test site test",
      "project": {
        "text": "Test site test : AV and Security Camera Installation",
        "value": "1900"
      },
      "date": "9/11/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000681",
        "value": "17705"
      },
      "customer": {
        "text": "Test site test",
        "value": "1898"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1900&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=50&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17705&compid=TSTDRV2617106",
      "esthours": "2",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI192",
        "value": "192"
      }
    },
    {
      "id": "49",
      "name": "Work Order Test - Sept 12 - Mei",
      "title": "Work Order Test - Sept 12 - Mei",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/9/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p class=\"ql-align-justify\"><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam est, tempus vel eleifend sit amet, vehicula sed diam. Maecenas porta mollis sem in aliquam. Suspendisse imperdiet suscipit accumsan. Vivamus lacinia interdum sagittis. Mauris vitae nisl vitae magna lacinia aliquam. Proin lacinia, erat at aliquet bibendum, justo nunc faucibus velit, et fringilla lorem libero non ligula. Vivamus id mattis sem. Cras sagittis nunc est, vitae vestibulum erat sollicitudin eu. Aenean purus dui, dignissim sed molestie quis, feugiat vel velit.</strong></p><p class=\"ql-align-justify\"></p><p class=\"ql-align-justify\"><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Nulla pretium accumsan laoreet. Duis diam augue, maximus et venenatis vel,</span><em style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"> sagittis quis lectus. Pellentesque vestibulum tortor eget eleifend sodales. </em><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Morbi a ultrices velit, in sollicitudin tortor. Fusce imperdiet posuere arcu, nec porta leo fermentum id. Aliquam consectetur consectetur erat ut ultricies. Donec eu erat metus. Aliquam bibendum quis velit in tempor. Praesent id augue vestibulum, euismod odio vel, rutrum diam. Praesent dignissim, arcu et gravida suscipit, sapien ex eleifend dolor, non ultrices nunc metus id enim. Aliquam maximus lectus eu neque blandit, malesuada egestas libero maximus. Nunc finibus laoreet eros, et efficitur nibh tincidunt id. Integer fringilla arcu eu dolor varius, sit amet mattis nunc tincidunt.</span></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=49&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "esthours": "100",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI157",
        "value": "157"
      }
    },
    {
      "id": "48",
      "name": "Flooring Installation",
      "title": "Flooring Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/5/2024",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p><strong>Flooring Installation</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=48&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "esthours": "50",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI157",
        "value": "157"
      }
    },
    {
      "id": "47",
      "name": "AV Installation",
      "title": "AV Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/5/2024",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p>AV Installation</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=47&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "esthours": "10",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI157",
        "value": "157"
      }
    },
    {
      "id": "46",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/5/2024",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</p><p>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</p><p>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</p><p>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</p><p>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</p><p>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</p><p>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</p><p>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</p><p>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</p><p>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=46&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "esthours": "100",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI157",
        "value": "157"
      }
    },
    {
      "id": "45",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/3/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p>Sample 3</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=45&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "esthours": "10",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI157",
        "value": "157"
      }
    },
    {
      "id": "44",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/5/2024",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p>Furniture Installation</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=44&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "esthours": "5",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI157",
        "value": "157"
      }
    },
    {
      "id": "43",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/3/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p>Furniture Installation</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=43&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI157",
        "value": "157"
      }
    },
    {
      "id": "42",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : Furniture and AV Installation",
        "value": "1883"
      },
      "date": "9/2/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Repair",
        "value": "26"
      },
      "memo": "<p><strong>Furniture Installation</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=42&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI157",
        "value": "157"
      }
    },
    {
      "id": "41",
      "name": "TESTED FOR ROLE",
      "title": "TESTED FOR ROLE",
      "project": {
        "text": "3M : Security Camera Installation",
        "value": "1893"
      },
      "date": "8/1/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000657",
        "value": "16214"
      },
      "customer": {
        "text": "3M",
        "value": "1397"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1893&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=41&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16214&compid=TSTDRV2617106",
      "esthours": "",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI161",
        "value": "161"
      }
    },
    {
      "id": "40",
      "name": "TESTED FOR ROLE",
      "title": "TESTED FOR ROLE",
      "project": {
        "text": "3M : Security Camera Installation",
        "value": "1893"
      },
      "date": "8/2/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000657",
        "value": "16214"
      },
      "customer": {
        "text": "3M",
        "value": "1397"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1893&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=40&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16214&compid=TSTDRV2617106",
      "esthours": "",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI161",
        "value": "161"
      }
    },
    {
      "id": "39",
      "name": "Test Site Checklist",
      "title": "Test Site Checklist",
      "project": {
        "text": "Test For site checklist : AV Replacement",
        "value": "1890"
      },
      "date": "8/1/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000655",
        "value": "16212"
      },
      "customer": {
        "text": "Test For site checklist",
        "value": "1888"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1890&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=39&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16212&compid=TSTDRV2617106",
      "esthours": "",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI158",
        "value": "158"
      }
    },
    {
      "id": "38",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "Test For site checklist : AV Replacement",
        "value": "1890"
      },
      "date": "8/1/2024",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000655",
        "value": "16212"
      },
      "customer": {
        "text": "Test For site checklist",
        "value": "1888"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1890&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=38&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16212&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI158",
        "value": "158"
      }
    },
    {
      "id": "37",
      "name": "Work Order aug 1 test",
      "title": "Work Order aug 1 test",
      "project": {
        "text": "Test For site checklist : AV Replacement",
        "value": "1890"
      },
      "date": "8/1/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000655",
        "value": "16212"
      },
      "customer": {
        "text": "Test For site checklist",
        "value": "1888"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1890&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=37&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16212&compid=TSTDRV2617106",
      "esthours": "",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI158",
        "value": "158"
      }
    },
    {
      "id": "36",
      "name": "Work Order aug 1 test",
      "title": "Work Order aug 1 test",
      "project": {
        "text": "Test For site checklist : AV Replacement",
        "value": "1890"
      },
      "date": "8/1/2024",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000655",
        "value": "16212"
      },
      "customer": {
        "text": "Test For site checklist",
        "value": "1888"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1890&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=36&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16212&compid=TSTDRV2617106",
      "esthours": "",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI158",
        "value": "158"
      }
    },
    {
      "id": "35",
      "name": "Work Order Sample aug1",
      "title": "Work Order Sample July 31",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "8/2/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p><strong>Work Order Sample July 31</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000651",
        "value": "15100"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=35&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=15100&compid=TSTDRV2617106",
      "esthours": "8",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI154",
        "value": "154"
      }
    },
    {
      "id": "34",
      "name": "Furniture and Flooring Installation",
      "title": "Furniture and Flooring Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "8/2/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Walls",
        "value": "4"
      },
      "memo": "<p><strong>Furniture and Flooring Installation</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000651",
        "value": "15100"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=34&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=15100&compid=TSTDRV2617106",
      "esthours": "8",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI154",
        "value": "154"
      }
    },
    {
      "id": "33",
      "name": "AV Installation",
      "title": "AV Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/29/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><strong>AV Installation</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=33&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "32",
      "name": "SLS00000621_WRKORDR001",
      "title": "SLS00000621_WRKORDR001",
      "project": {
        "text": "California Airport : Furniture Installation",
        "value": "1774"
      },
      "date": "7/19/2024",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p><strong style=\"color: rgb(232, 230, 227); --darkreader-inline-color: #d8d4cf;\" data-darkreader-inline-color=\"\">Work Order Instructions QA Test</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000621",
        "value": "13089"
      },
      "customer": {
        "text": "California Airport",
        "value": "1493"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1774&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=32&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=13089&compid=TSTDRV2617106",
      "esthours": "",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI122",
        "value": "122"
      }
    },
    {
      "id": "31",
      "name": "Flooring Installation",
      "title": "Flooring Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/19/2024",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p>Test</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=31&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "20",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "30",
      "name": "Flooring Installation ",
      "title": "Flooring Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/12/2024",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=30&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "20",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "29",
      "name": "Security Camera Installation",
      "title": "Security Camera Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/12/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Security Camera Installation</span></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=29&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "16",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "28",
      "name": "Conference Table Delivery",
      "title": "Conference Table Delivery",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/12/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Moves",
        "value": "3"
      },
      "memo": "<p>Test</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=28&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "2",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "27",
      "name": "Test Work Order",
      "title": "Test Work Order",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/12/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p><strong>Test Work Order</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=27&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "2",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "26",
      "name": "Test Work Order",
      "title": "Test Work Order",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/12/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p>Test Work Order</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=26&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "2",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "25",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/15/2024",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p><p></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim.</span></p><p></p><p><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=25&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "24",
      "name": "Test Work Order",
      "title": "Test Work Order",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/17/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p>Test Work Order</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=24&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "10",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "23",
      "name": "Test Work Order",
      "title": "Test Work Order",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/11/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p>Test Work Order</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=23&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "5",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "22",
      "name": "Test Work Order",
      "title": "Test Work Order",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/10/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p>Test Work Order</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=22&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "21",
      "name": "Maintenance Survey",
      "title": "Maintenance Survey",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/10/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Maintenance",
        "value": "25"
      },
      "memo": "<p>Test Work Order</p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=21&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "20",
      "name": "Desks Installation",
      "title": "Desks Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/15/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Mockup",
        "value": "6"
      },
      "memo": "<p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p><p></p><p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim.</span></p><p></p><p><strong style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=20&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "19",
      "name": "Walls Installation Only",
      "title": "Walls Installation Only",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/8/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<ol><li>- **Review Wall Layout Plans**: Begin by carefully reviewing the wall layout plans to confirm measurements and placements.</li><li>- **Mark the Floor for Wall Positioning**: Use a chalk line or tape measure to mark the exact placement of the walls on the floor.</li><li>- **Install Base Track**: Position the base track along the marked line and secure it to the floor using appropriate anchors (e.g., screws, bolts) for the surface type.</li><li>- **Place and Secure Vertical Studs**: Insert vertical studs into the base track, spacing them according to the layout plans (typically 16 or 24 inches apart). Ensure each stud is plumb and level, then secure it to the base track.</li><li>- **Install Top Track**: Attach the top track to the ceiling, aligning it with the base track, and secure the studs to the top track.</li><li>- **Add Insulation or In-Wall Elements**: Insert insulation, wiring, or any other in-wall components as specified in the project requirements.</li><li>- **Attach Drywall or Paneling**: Secure drywall or paneling to the studs using drywall screws, ensuring each panel is flush and properly aligned.</li><li>- **Finish Seams and Screws**: Apply joint compound to seams and screw holes, then smooth out using a taping knife. Apply additional coats if necessary.</li><li>- **Sand for a Smooth Finish**: Once the compound is dry, sand the seams and any patched areas until smooth and ready for painting or finishing.</li><li>- **Final Inspection**: Verify that walls are plumb, level, secure, and meet all specified quality and safety standards before considering the installation complete.</li></ol>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=19&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "300",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "18",
      "name": "Install Walls",
      "title": "Install Walls",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/8/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p><p></p><p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim.</span></p><p></p><p><strong style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=18&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "300",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "17",
      "name": "Walls Installation",
      "title": "Walls Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/8/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<ol><li>- **Review Wall Layout Plans**: Begin by carefully reviewing the wall layout plans to confirm measurements and placements.</li><li>- **Mark the Floor for Wall Positioning**: Use a chalk line or tape measure to mark the exact placement of the walls on the floor.</li><li>- **Install Base Track**: Position the base track along the marked line and secure it to the floor using appropriate anchors (e.g., screws, bolts) for the surface type.</li><li>- **Place and Secure Vertical Studs**: Insert vertical studs into the base track, spacing them according to the layout plans (typically 16 or 24 inches apart). Ensure each stud is plumb and level, then secure it to the base track.</li><li>- **Install Top Track**: Attach the top track to the ceiling, aligning it with the base track, and secure the studs to the top track.</li><li>- **Add Insulation or In-Wall Elements**: Insert insulation, wiring, or any other in-wall components as specified in the project requirements.</li><li>- **Attach Drywall or Paneling**: Secure drywall or paneling to the studs using drywall screws, ensuring each panel is flush and properly aligned.</li><li>- **Finish Seams and Screws**: Apply joint compound to seams and screw holes, then smooth out using a taping knife. Apply additional coats if necessary.</li><li>- **Sand for a Smooth Finish**: Once the compound is dry, sand the seams and any patched areas until smooth and ready for painting or finishing.</li><li>- **Final Inspection**: Verify that walls are plumb, level, secure, and meet all specified quality and safety standards before considering the installation complete.</li></ol>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=17&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "300",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "16",
      "name": "Install Walls",
      "title": "Install Walls",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/8/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p><p></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim.</span></p><p></p><p><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=16&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "300",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "15",
      "name": "Drop off and Walls Installation",
      "title": "Drop off and Walls Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/8/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<ol><li>- Unload all materials at the designated worksite and organize for efficient access.</li><li>- Verify wall layout plans, marking the floor to ensure precise alignment.</li><li>- Position and secure the base track with appropriate anchors, ensuring it is level.</li><li>- Attach vertical studs to the base track, spacing them according to project specifications.</li><li>- Install insulation or in-wall elements as needed.</li><li>- Attach drywall or paneling to studs with screws.</li><li>- Apply joint compound to seams, then sand for a smooth finish in preparation for painting, if required.</li><li>- Perform a final inspection to ensure all walls are aligned, secure, and meet safety and quality standards.</li></ol>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=15&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "300",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "14",
      "name": "Install Walls",
      "title": "Install Walls",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/8/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=14&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "300",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "13",
      "name": "Walls Installation",
      "title": "Walls Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/8/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<ol><li>- **Review Wall Layout Plans**: Begin by carefully reviewing the wall layout plans to confirm measurements and placements.</li><li>- **Mark the Floor for Wall Positioning**: Use a chalk line or tape measure to mark the exact placement of the walls on the floor.</li><li>- **Install Base Track**: Position the base track along the marked line and secure it to the floor using appropriate anchors (e.g., screws, bolts) for the surface type.</li><li>- **Place and Secure Vertical Studs**: Insert vertical studs into the base track, spacing them according to the layout plans (typically 16 or 24 inches apart). Ensure each stud is plumb and level, then secure it to the base track.</li><li>- **Install Top Track**: Attach the top track to the ceiling, aligning it with the base track, and secure the studs to the top track.</li><li>- **Add Insulation or In-Wall Elements**: Insert insulation, wiring, or any other in-wall components as specified in the project requirements.</li><li>- **Attach Drywall or Paneling**: Secure drywall or paneling to the studs using drywall screws, ensuring each panel is flush and properly aligned.</li><li>- **Finish Seams and Screws**: Apply joint compound to seams and screw holes, then smooth out using a taping knife. Apply additional coats if necessary.</li><li>- **Sand for a Smooth Finish**: Once the compound is dry, sand the seams and any patched areas until smooth and ready for painting or finishing.</li><li>- **Final Inspection**: Verify that walls are plumb, level, secure, and meet all specified quality and safety standards before considering the installation complete.</li></ol><p></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=13&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "300",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "12",
      "name": "Install Walls",
      "title": "Install Walls",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/8/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=12&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "300",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "11",
      "name": "Walls Installation Only",
      "title": "Walls Installation Only",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/8/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<ol><li>- **Review Wall Layout Plans**: Begin by carefully reviewing the wall layout plans to confirm measurements and placements.</li><li>- **Mark the Floor for Wall Positioning**: Use a chalk line or tape measure to mark the exact placement of the walls on the floor.</li><li>- **Install Base Track**: Position the base track along the marked line and secure it to the floor using appropriate anchors (e.g., screws, bolts) for the surface type.</li><li>- **Place and Secure Vertical Studs**: Insert vertical studs into the base track, spacing them according to the layout plans (typically 16 or 24 inches apart). Ensure each stud is plumb and level, then secure it to the base track.</li><li>- **Install Top Track**: Attach the top track to the ceiling, aligning it with the base track, and secure the studs to the top track.</li><li>- **Add Insulation or In-Wall Elements**: Insert insulation, wiring, or any other in-wall components as specified in the project requirements.</li><li>- **Attach Drywall or Paneling**: Secure drywall or paneling to the studs using drywall screws, ensuring each panel is flush and properly aligned.</li><li>- **Finish Seams and Screws**: Apply joint compound to seams and screw holes, then smooth out using a taping knife. Apply additional coats if necessary.</li><li>- **Sand for a Smooth Finish**: Once the compound is dry, sand the seams and any patched areas until smooth and ready for painting or finishing.</li><li>- **Final Inspection**: Verify that walls are plumb, level, secure, and meet all specified quality and safety standards before considering the installation complete.</li></ol><p></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=11&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "300",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "10",
      "name": "Install Walls",
      "title": "Install Walls",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/8/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=10&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "300",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "9",
      "name": "Install Walls",
      "title": "Install Walls",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/15/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p><p> </p><p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim.</span></p><p> </p><p><strong style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=9&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "8",
      "name": "Walls Installation",
      "title": "Walls Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/15/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<ol><li>- **Review Wall Layout Plans**: Begin by carefully reviewing the wall layout plans to confirm measurements and placements.</li><li>- **Mark the Floor for Wall Positioning**: Use a chalk line or tape measure to mark the exact placement of the walls on the floor.</li><li>- **Install Base Track**: Position the base track along the marked line and secure it to the floor using appropriate anchors (e.g., screws, bolts) for the surface type.</li><li>- **Place and Secure Vertical Studs**: Insert vertical studs into the base track, spacing them according to the layout plans (typically 16 or 24 inches apart). Ensure each stud is plumb and level, then secure it to the base track.</li><li>- **Install Top Track**: Attach the top track to the ceiling, aligning it with the base track, and secure the studs to the top track.</li><li>- **Add Insulation or In-Wall Elements**: Insert insulation, wiring, or any other in-wall components as specified in the project requirements.</li><li>- **Attach Drywall or Paneling**: Secure drywall or paneling to the studs using drywall screws, ensuring each panel is flush and properly aligned</li><li>- **Finish Seams and Screws**: Apply joint compound to seams and screw holes, then smooth out using a taping knife. Apply additional coats if necessary</li><li>- **Sand for a Smooth Finish**: Once the compound is dry, sand the seams and any patched areas until smooth and ready for painting or finishing.</li><li>- **Final Inspection**: Verify that walls are plumb, level, secure, and meet all specified quality and safety standards before considering the installation complete.</li></ol>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=8&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "7",
      "name": "Install Walls",
      "title": "Install Walls",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/5/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p><p></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim.</span></p><p></p><p><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=7&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "200",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "6",
      "name": "Work Order Sample",
      "title": "Movement of furniture",
      "project": {
        "text": "Rogers Communication : Office Remodel",
        "value": "1509"
      },
      "date": "7/3/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p><span style=\"background-color:rgb(255,255,255);color:rgb(0,0,0);\">Work order instructions for work order sample</span></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000610",
        "value": "11727"
      },
      "customer": {
        "text": "Anonymous Customer HQ",
        "value": "1599"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1509&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=6&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11727&compid=TSTDRV2617106",
      "esthours": "",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI108",
        "value": "108"
      }
    },
    {
      "id": "5",
      "name": "Installation of chairs",
      "title": "Installation of chairs",
      "project": {
        "text": "",
        "value": ""
      },
      "date": "7/19/2024",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000604",
        "value": "11716"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=5&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11716&compid=TSTDRV2617106",
      "esthours": "",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI102",
        "value": "102"
      }
    },
    {
      "id": "4",
      "name": "Crates Pick up",
      "title": "Crates Pick up",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/29/2024",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": {
        "text": "Moves",
        "value": "3"
      },
      "memo": "",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=4&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "10",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "3",
      "name": "Installation of Furnitures",
      "title": "Installation of Furnitures",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/5/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p><p></p><p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim.</span></p><p></p><p><strong style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=3&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "20",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "2",
      "name": "Installation of Furnitures",
      "title": "Installation of Furnitures",
      "project": {
        "text": "",
        "value": ""
      },
      "date": "7/5/2024",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": {
        "text": "",
        "value": ""
      },
      "memo": "<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p><p></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim.</span></p><p></p><p><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=2&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "20",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    },
    {
      "id": "1",
      "name": "Furniture Installation",
      "title": "Furniture Installation",
      "project": {
        "text": "World Bank : World Bank Office Furniture Installation",
        "value": "1515"
      },
      "date": "7/5/2024",
      "status": {
        "text": "Pending",
        "value": "1"
      },
      "type": {
        "text": "Service",
        "value": "2"
      },
      "memo": "<ol><li>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</li><li>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</li><li>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</li><li>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</li><li>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</li><li>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</li><li>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</li><li>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</li><li>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</li><li>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</li></ol>",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      },
      "customer": {
        "text": "World Bank",
        "value": "1249"
      },
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=1&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "esthours": "10",
      "location": {
        "text": "",
        "value": ""
      },
      "receiptStatus": {
        "text": "",
        "value": ""
      },
      "projectInsight": {
        "text": "PI106",
        "value": "106"
      }
    }
  ];
};

export const fetchWorkOrders = async (): Promise<WorkOrder[]> => {
  if (isLocalDevelopment()) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMockWorkOrders()), 500);
    });
  }

  try {
    let allData: WorkOrder[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&mode=getWorkOrders&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`Work Order service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch work orders chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`Work Order service RESULT chunk ${i + 1}:`, chunkData);
      
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
    
    console.log(`Finished chunked fetch. Total work order records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no work order data across all chunks");
      throw new Error("No work order data returned from API");
    }

    return allData;
  } catch (error) {
    console.error('Error fetching work orders:', error);
    throw error;
  }
};
