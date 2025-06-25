import { suiteletUrl } from '@/lib/constants';
import { isLocalDevelopment } from '@/lib/helpers';

export interface WorkOrder {
  id: string;
  title: string;
  description?: string;
  status?: {
    text: string;
    value: string;
    code?: string;
  };
  type?: string;
  date?: string;
  customer?: string;
  project?: string;
  salesOrder?: string;
  estHours?: string;  // or number if you plan to normalize
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
      "title": "HVAC Maintenance",
      "description": "<h4>Tasks:</h4><ol><li>Inspect and clean air filters.</li><li>Check the refrigerant levels and refill if necessary.</li><li>Inspect electrical connections and tighten any loose ones.</li><li>Test the system for correct operation.</li></ol>",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": "Maintenance",
      "date": "3/14/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000848",
      "estHours": "2000",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=141&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=25472&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "Partially Received",
        "value": "2",
        "code": "#FF5733",
        "display": "Partial Received"
      }
    },
    {
      "id": "140",
      "title": "Product Core Testing - 2",
      "description": "<p><strong>Product Core Testing - 2</strong></p>",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": "Maintenance",
      "date": "3/11/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000837",
      "estHours": "10000",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=140&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=24432&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "Partially Received",
        "value": "2",
        "code": "#FF5733",
        "display": "Partial Received"
      }
    },
    {
      "id": "139",
      "title": "Lobby Area - Product Test",
      "description": "<p><strong>Lobby Area - Product Test</strong></p>",
      "status": {
        "text": "Not Started",
        "value": "8",
        "code": "#026adf"
      },
      "type": "Moves",
      "date": "3/11/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000836",
      "estHours": "5000",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=139&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=24428&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "Partially Received",
        "value": "2",
        "code": "#FF5733",
        "display": "Partial Received"
      }
    },
    {
      "id": "138",
      "title": "Lobby Area - Product Core Dryrun",
      "description": "<p><strong>Lobby Area - Product Core Dryrun</strong></p>",
      "status": {
        "text": "Not Started",
        "value": "8",
        "code": "#026adf"
      },
      "type": "Service",
      "date": "3/10/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000835",
      "estHours": "1000",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=138&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=24427&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "Not Received",
        "value": "1"
      }
    },
    {
      "id": "137",
      "title": "Android Full Dryrun",
      "description": "<h4><strong>Scope of Work:</strong></h4><p>Install and assemble office furniture in the new Greenfield Solutions office space. The layout includes individual workstations, conference room tables, and lounge area furniture.</p><h4><strong>Items to be Installed:</strong></h4><ol><li><strong>Workstations</strong>:<ul><li><strong>Quantity</strong>: 15 cubicle workstations with desks and chairs</li><li><strong>Model</strong>: ErgoFit Sit-Stand Desk</li><li><strong>Assembly Instructions</strong>: Ensure the height adjustment mechanisms are functioning correctly. Chairs should be at the lowest height when delivered.</li><li><strong>Placement</strong>: As per the office layout, positioned in rows of 3 along the north wall.</li></ul></li><li><strong>Conference Room Table</strong>:<ul><li><strong>Quantity</strong>: 1 large rectangular table with 10 chairs</li><li><strong>Model</strong>: ModernBoard Conference Series</li><li><strong>Assembly Instructions</strong>: Attach legs securely to the table top and ensure all chairs are adjusted to equal height.</li><li><strong>Placement</strong>: Conference Room A, center of the room.</li></ul></li><li><strong>Lounge Furniture</strong>:<ul><li><strong>Quantity</strong>: 2 sectional couches, 1 coffee table, 4 lounge chairs</li><li><strong>Model</strong>: Relaxio Lounge Set</li><li><strong>Assembly Instructions</strong>: Assemble sectional couches by connecting parts A and B, and ensure cushions are evenly placed.</li><li><strong>Placement</strong>: Lounge area, next to the large windows, as per the attached floor plan.</li></ul></li></ol><h4><strong>Special Instructions:</strong></h4><ul><li><strong>Wall Mounting</strong>: Two whiteboards (4x6 ft) should be mounted in Conference Room A. Please verify with Jane Doe for precise positioning before drilling.</li><li><strong>Cable Management</strong>: Install cable trays beneath workstations to organize power and data cables.</li><li><strong>Final Check</strong>: Ensure all furniture is level, and check that no screws or components are loose after assembly.</li><li><strong>Clean-Up</strong>: All packaging materials should be disposed of or neatly stacked in the loading area. Ensure the office space is clean and ready for use after installation.</li></ul>",
      "status": {
        "text": "Not Started",
        "value": "8",
        "code": "#026adf"
      },
      "type": "Service",
      "date": "2/27/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000826",
      "estHours": "500",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=137&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=23471&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "Partially Received",
        "value": "2",
        "code": "#FF5733",
        "display": "Partial Received"
      }
    },
    {
      "id": "136",
      "title": "Lobby Area 1",
      "description": "<h4><strong style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">1. Pre-Installation Preparation</strong></h4><ul><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Review work order details, verify furniture type and quantities.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Gather necessary tools (screwdrivers, drills, level, etc.) and protective gear.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Inspect furniture for damages and ensure all hardware is included.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Confirm access to the installation site (keys, security clearance, etc.).</span></li></ul><h4><strong style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">2. On-Site Installation</strong></h4><ul><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Confirm furniture placement with the client, referencing layout plans.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Unpack items carefully and organize packaging to maintain a clean area.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Assemble furniture according to manufacturer’s instructions.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Ensure proper leveling and alignment using a level.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Begin with larger furniture pieces, then move to smaller items.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">For wall-mounted items, locate studs and use proper anchors.</span></li></ul><h4><strong style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">3. Post-Installation Checklist</strong></h4><ul><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Inspect all furniture for stability, alignment, and quality.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Verify furniture is placed according to client’s specifications.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Remove all packaging, debris, and clean furniture surfaces.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Walk the client through the installation and address any concerns.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Obtain client’s sign-off on completed work.</span></li></ul><h4><strong style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">4. Additional Notes</strong></h4><ul><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Report damaged or missing items to the project manager immediately.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Log start/end times and report any delays or issues.</span></li><li><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Follow special project instructions as necessary.</span></li></ul>",
      "status": {
        "text": "Not Started",
        "value": "8",
        "code": "#026adf"
      },
      "type": "Service",
      "date": "2/19/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000818",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=136&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22934&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "Partially Received",
        "value": "2",
        "code": "#FF5733",
        "display": "Partial Received"
      }
    },
    {
      "id": "135",
      "title": "Creation of New Work Order",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Maintenance",
      "date": "1/21/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000811",
      "estHours": "0",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=135&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22902&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "134",
      "title": "Lobby Area",
      "description": "<h4><strong>1. Pre-Installation Preparation</strong></h4><ul><li>Review work order details, verify furniture type and quantities.</li><li>Gather necessary tools (screwdrivers, drills, level, etc.) and protective gear.</li><li>Inspect furniture for damages and ensure all hardware is included.</li><li>Confirm access to the installation site (keys, security clearance, etc.).</li></ul><h4><strong>2. On-Site Installation</strong></h4><ul><li>Confirm furniture placement with the client, referencing layout plans.</li><li>Unpack items carefully and organize packaging to maintain a clean area.</li><li>Assemble furniture according to manufacturer’s instructions.</li><li>Ensure proper leveling and alignment using a level.</li><li>Begin with larger furniture pieces, then move to smaller items.</li><li>For wall-mounted items, locate studs and use proper anchors.</li></ul><h4><strong>3. Post-Installation Checklist</strong></h4><ul><li>Inspect all furniture for stability, alignment, and quality.</li><li>Verify furniture is placed according to client’s specifications.</li><li>Remove all packaging, debris, and clean furniture surfaces.</li><li>Walk the client through the installation and address any concerns.</li><li>Obtain client’s sign-off on completed work.</li></ul><h4><strong>4. Additional Notes</strong></h4><ul><li>Report damaged or missing items to the project manager immediately.</li><li>Log start/end times and report any delays or issues.</li><li>Follow special project instructions as necessary.</li></ul><p></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "1/20/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000811",
      "estHours": "100",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=134&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22902&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "133",
      "title": "Office Room 2",
      "description": "<p><strong>Test</strong></p>",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": "Service",
      "date": "1/20/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000810",
      "estHours": "50",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=133&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22901&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "132",
      "title": "Office Area 1",
      "description": "<p><strong>Office Area 1</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "1/20/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000810",
      "estHours": "0",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=132&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22901&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "Not Received",
        "value": "1"
      }
    },
    {
      "id": "131",
      "title": "Lobby Area",
      "description": "<p><strong>Lobby Area</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "1/20/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000810",
      "estHours": "50",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=131&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22901&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "130",
      "title": "Office Room A",
      "description": "<h4><strong>1. Pre-Installation Preparation</strong></h4><ul><li>Review work order details, verify furniture type and quantities.</li><li>Gather necessary tools (screwdrivers, drills, level, etc.) and protective gear.</li><li>Inspect furniture for damages and ensure all hardware is included.</li><li>Confirm access to the installation site (keys, security clearance, etc.).</li></ul><h4><strong>2. On-Site Installation</strong></h4><ul><li>Confirm furniture placement with the client, referencing layout plans.</li><li>Unpack items carefully and organize packaging to maintain a clean area.</li><li>Assemble furniture according to manufacturer’s instructions.</li><li>Ensure proper leveling and alignment using a level.</li><li>Begin with larger furniture pieces, then move to smaller items.</li><li>For wall-mounted items, locate studs and use proper anchors.</li></ul><h4><strong>3. Post-Installation Checklist</strong></h4><ul><li>Inspect all furniture for stability, alignment, and quality.</li><li>Verify furniture is placed according to client’s specifications.</li><li>Remove all packaging, debris, and clean furniture surfaces.</li><li>Walk the client through the installation and address any concerns.</li><li>Obtain client’s sign-off on completed work.</li></ul><h4><strong>4. Additional Notes</strong></h4><ul><li>Report damaged or missing items to the project manager immediately.</li><li>Log start/end times and report any delays or issues.</li><li>Follow special project instructions as necessary.</li></ul>",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": "Service",
      "date": "1/20/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000809",
      "estHours": "10",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=130&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22900&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "129",
      "title": "Lobby Area",
      "description": "<p><strong>Lobby Area</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "1/17/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000809",
      "estHours": "80",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=129&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22900&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "128",
      "title": "Lobby Area",
      "description": "<p><strong>Lobby Area</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "1/20/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000808",
      "estHours": "0",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=128&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22899&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "127",
      "title": "Office Room B",
      "description": "<p>Office Room B</p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "1/20/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000807",
      "estHours": "500",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=127&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22898&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "126",
      "title": "Office Room A",
      "description": "<p><strong>Office Room A</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "1/20/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000807",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=126&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22898&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "125",
      "title": "Lobby Area",
      "description": "<p><strong>Lobby Area</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "1/20/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000807",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=125&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22898&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "124",
      "title": "Testing with Lean",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Demo",
      "date": "1/16/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000803",
      "estHours": "0",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=124&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22468&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "123",
      "title": "Test Work Order - AC Installation",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "1/8/2025",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000803",
      "estHours": "100",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=123&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22468&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "122",
      "title": "World Bank_WRKORDR0001",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Demo",
      "date": "12/18/2024",
      "customer": "World Bank",
      "project": "World Bank : Window Installation",
      "salesOrder": "Sales Order #SLS00000795",
      "estHours": "40",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=122&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=22459&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=2049&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "121",
      "title": "Furniture Installation",
      "description": "<p>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</p><p>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</p><p>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</p><p>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</p><p>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</p><p>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</p><p>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</p><p>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</p><p>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</p><p>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/26/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000786",
      "estHours": "2000",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=121&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20919&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "120",
      "title": "Installation of Furnitures",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/26/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000785",
      "estHours": "50",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=120&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20917&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "119",
      "title": "Furniture Installation",
      "description": "<ol><li>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</li><li>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</li><li>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</li><li>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</li><li>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</li><li>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</li><li>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</li><li>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</li><li>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</li><li>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</li></ol>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/12/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000785",
      "estHours": "10",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=119&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20917&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "118",
      "title": "AV Installation",
      "description": "<p>-AV Install</p>",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": "Demo",
      "date": "11/12/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000786",
      "estHours": "10",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=118&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20919&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "117",
      "title": "Furniture Installation",
      "description": "<p>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</p><p>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</p><p>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</p><p>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</p><p>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</p><p>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</p><p>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</p><p>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</p><p>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</p><p>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</p>",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Service",
      "date": "11/12/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000783",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=117&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20915&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "116",
      "title": "Window Placement Planning",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/13/2024",
      "customer": "World Bank",
      "project": "World Bank : Window Installation",
      "salesOrder": "Sales Order #SLS00000782",
      "estHours": "40",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=116&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20914&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=2049&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "115",
      "title": "Furniture Installation",
      "description": "<ol><li>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</li><li>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</li><li>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</li><li>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</li><li>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</li><li>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</li><li>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</li><li>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</li><li>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</li><li>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</li></ol>",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Service",
      "date": "11/12/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000781",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=115&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20911&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "114",
      "title": "Lobby Room",
      "description": "<p><strong>Lobby Room</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/12/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000780",
      "estHours": "100",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=114&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20910&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "113",
      "title": "Furniture Delivery",
      "description": "<p><strong>Furniture Delivery</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/12/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000779",
      "estHours": "20",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=113&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20908&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "112",
      "title": "AV Installation",
      "description": "<ol><li>Pick up the products</li><li>Verify installation kit on the box</li><li>Etc..</li></ol>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/11/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000778",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=112&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20907&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "111",
      "title": "Furniture Installation",
      "description": "<ol><li>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</li><li>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</li><li>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</li><li>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</li><li>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</li><li>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</li><li>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</li><li>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</li><li>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</li><li>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</li></ol>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/11/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000777",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=111&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20906&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "110",
      "title": "Install AC",
      "description": "No description",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": "Service",
      "date": "11/12/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank AC Installation",
      "salesOrder": "Sales Order #SLS00000776",
      "estHours": "30",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=110&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20905&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=2045&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "Not Received",
        "value": "1"
      }
    },
    {
      "id": "109",
      "title": "Install Office Furniture",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/12/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000774",
      "estHours": "30",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=109&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20903&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "108",
      "title": "Furniture Installation",
      "description": "<p>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</p><p>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</p><p>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</p><p>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</p><p>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</p><p>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</p><p>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</p><p>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</p><p>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</p><p>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</p>",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Service",
      "date": "11/11/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000772",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=108&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20901&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "107",
      "title": "Install Cove Lights - Follow Up",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/11/2024",
      "customer": "3M",
      "project": "3M : Light Fixtures Installation",
      "salesOrder": "Sales Order #SLS00000771",
      "estHours": "40",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=107&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20900&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=2042&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "106",
      "title": "Install Cove Lights",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/11/2024",
      "customer": "3M",
      "project": "3M : Light Fixtures Installation",
      "salesOrder": "Sales Order #SLS00000771",
      "estHours": "40",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=106&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20900&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=2042&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "105",
      "title": "Furniture Installation",
      "description": "<ol><li>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</li><li>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</li><li>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</li><li>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</li><li>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</li><li>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</li><li>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</li><li>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</li><li>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</li><li>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</li></ol>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/10/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000770",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=105&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20899&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "104",
      "title": "AV Installation Only",
      "description": "<ol><li>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</li><li>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</li><li>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</li><li>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</li><li>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</li><li>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</li><li>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</li><li>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</li><li>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</li><li>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</li></ol>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/10/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000770",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=104&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20899&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "103",
      "title": "Furniture Installation",
      "description": "<ol><li>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</li><li>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</li><li>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</li><li>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</li><li>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</li><li>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</li><li>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</li><li>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</li><li>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</li><li>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</li></ol>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/10/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000769",
      "estHours": "100",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=103&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20898&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "102",
      "title": "Furniture Installation and Pickup - Mei",
      "description": "<p>Furniture Installation and Pickup - Mei</p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Demo",
      "date": "11/11/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000768",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=102&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20897&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "101",
      "title": "Furniture Installation and Pickup",
      "description": "<p>Furniture Installation and Pickup</p>",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Demo",
      "date": "11/10/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000713",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=101&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19372&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "100",
      "title": "Work Order Dry Run - Nov 8",
      "description": "<p><strong>Work Order Dry Run - Nov 8</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/8/2024",
      "customer": "World Bank",
      "project": "World Bank : Design, Furniture and Flooring Project",
      "salesOrder": "Sales Order #SLS00000766",
      "estHours": "1000",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=100&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20892&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "99",
      "title": "Furniture Installation",
      "description": "<p>Please assign a team to [describe task, e.g., &quot;repair the leaking faucet in the second-floor bathroom&quot;]. This work is needed to address [reason or issue, e.g., &quot;water damage and ensure functionality for occupants&quot;]. Ideally, the work should begin by [preferred start date, e.g., &quot;next week&quot;] and be completed by [completion date, if any]. Required materials include [list any specific materials needed, if known, e.g., &quot;sealant, replacement parts&quot;]. Please provide an update on the estimated timeline and any potential challenges. Thank you for prioritizing this request to ensure safe and efficient operation.</p>",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Demo",
      "date": "11/7/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000740",
      "estHours": "400",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=99&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20024&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "98",
      "title": "Work Order for Testing Nov 5 -3",
      "description": "<p><strong>Work Order for Testing Nov 5 -3</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Mockup",
      "date": "11/6/2024",
      "customer": "World Bank",
      "project": "World Bank : Design, Furniture and Flooring Project",
      "salesOrder": "Sales Order #SLS00000755",
      "estHours": "100",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=98&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20872&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "97",
      "title": "Work Order for Testing Nov 5 - 2",
      "description": "<p><strong>Work Order for Testing Nov 5 - 2</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "12/1/2024",
      "customer": "World Bank",
      "project": "World Bank : Design, Furniture and Flooring Project",
      "salesOrder": "Sales Order #SLS00000755",
      "estHours": "1000",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=97&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20872&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "96",
      "title": "Work Order for Testing Nov 5",
      "description": "<p><strong>Work Order for Testing Nov 5</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/5/2024",
      "customer": "World Bank",
      "project": "World Bank : Design, Furniture and Flooring Project",
      "salesOrder": "Sales Order #SLS00000755",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=96&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20872&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "95",
      "title": "Work Order - Nov 4 Dry run",
      "description": "<p><strong>Work Order - Nov 4 Dry run</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Walls",
      "date": "11/11/2024",
      "customer": "World Bank",
      "project": "World Bank : Design, Furniture and Flooring Project",
      "salesOrder": "Sales Order #SLS00000751",
      "estHours": "2000",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=95&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20868&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "94",
      "title": "Test Work Order - Nov 4",
      "description": "<p><strong>Test Work Order - Nov 4</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Walls",
      "date": "11/18/2024",
      "customer": "World Bank",
      "project": "World Bank : Design, Furniture and Flooring Project",
      "salesOrder": "Sales Order #SLS00000750",
      "estHours": "1000",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=94&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20867&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "93",
      "title": "Work Order Nov 4 - Test only",
      "description": "<p><strong>Work Order Nov 4 - Test only</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Moves",
      "date": "11/18/2024",
      "customer": "World Bank",
      "project": "World Bank : Design, Furniture and Flooring Project",
      "salesOrder": "Sales Order #SLS00000748",
      "estHours": "500",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=93&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20852&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "92",
      "title": "Work Order - Oct 31 - Test 1",
      "description": "<p><strong>Work Order - Oct 31 - Test 1</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/1/2024",
      "customer": "World Bank",
      "project": "World Bank : Design, Furniture and Flooring Project",
      "salesOrder": "Sales Order #SLS00000748",
      "estHours": "2000",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=92&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20852&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "91",
      "title": "Work Order - Oct 31",
      "description": "<p><strong>Work Order - Oct 31</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Walls",
      "date": "11/1/2024",
      "customer": "World Bank",
      "project": "World Bank : Design, Furniture and Flooring Project",
      "salesOrder": "Sales Order #SLS00000747",
      "estHours": "2000",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=91&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20851&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "90",
      "title": "Test WO",
      "description": "<p>Test WO</p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/1/2024",
      "customer": "World Bank",
      "project": "World Bank : Design, Furniture and Flooring Project",
      "salesOrder": "Sales Order #SLS00000746",
      "estHours": "500",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=90&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20845&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "89",
      "title": "Work Order Oct 31 - Mei",
      "description": "<p><strong>Work Order Oct 31 - Mei</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/1/2024",
      "customer": "World Bank",
      "project": "World Bank : Design, Furniture and Flooring Project",
      "salesOrder": "Sales Order #SLS00000746",
      "estHours": "500",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=89&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20845&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "88",
      "title": "Test Dry Run Oct 31",
      "description": "<p><strong>Test Dry Run Oct 31</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "11/1/2024",
      "customer": "World Bank",
      "project": "World Bank : Design, Furniture and Flooring Project",
      "salesOrder": "Sales Order #SLS00000746",
      "estHours": "1000",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=88&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20845&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1612&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "87",
      "title": "Furniture Installation",
      "description": "<p>Furniture Installation</p>",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": "Service",
      "date": "9/30/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000740",
      "estHours": "1000",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=87&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=20024&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "86",
      "title": "Furniture Installation",
      "description": "<p><strong>Test Work Order - Mei</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "10/21/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000739",
      "estHours": "100",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=86&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19521&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "85",
      "title": "Furniture Installation",
      "description": "<p><strong>Furniture Installation</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "10/21/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000739",
      "estHours": "100",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=85&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19521&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "84",
      "title": "Test Work order",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "10/18/2024",
      "customer": "Deloitte New York",
      "project": "Deloitte New York : Design, Furniture and Flooring Installation",
      "salesOrder": "Sales Order #SLS00000733",
      "estHours": "1",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=84&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19413&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=2026&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "83",
      "title": "Furniture Installation",
      "description": "<p><strong>Test Work Order - Mei</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "10/21/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000736",
      "estHours": "500",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=83&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19418&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "82",
      "title": "Work Order Test **Do not use** - Mei",
      "description": "<p><strong>Work Order Test **Do not use** - Mei</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "10/21/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000734",
      "estHours": "500",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=82&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19414&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "81",
      "title": "FOP User Guide TEST",
      "description": "No description",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Standard",
      "date": "10/14/2024",
      "customer": "Deloitte New York",
      "project": "Deloitte New York : Design, Furniture and Flooring Installation",
      "salesOrder": "Sales Order #SLS00000733",
      "estHours": "1",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=81&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19413&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=2026&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "80",
      "title": "FOP User Guide",
      "description": "No description",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Standard",
      "date": "10/14/2024",
      "customer": "Deloitte New York",
      "project": "Deloitte New York : Design, Furniture and Flooring Installation",
      "salesOrder": "Sales Order #SLS00000733",
      "estHours": "1",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=80&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19413&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=2026&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "79",
      "title": "Work Order Test 4",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "10/14/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000726",
      "estHours": "5",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=79&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19400&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "78",
      "title": "Test Work Order 3",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "10/7/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000726",
      "estHours": "5",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=78&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19400&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "77",
      "title": "Test Work Order 2",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "10/7/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000726",
      "estHours": "5",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=77&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19400&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "76",
      "title": "AV Installation",
      "description": "<p>Furniture Installation</p>",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Repair",
      "date": "10/7/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000726",
      "estHours": "50",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=76&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19400&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "75",
      "title": "Test Fop Dry Run Part 2",
      "description": "No description",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Standard",
      "date": "10/7/2024",
      "customer": "Deloitte New York",
      "project": "Deloitte New York : Design, Furniture and Flooring Installation",
      "salesOrder": "Sales Order #SLS00000725",
      "estHours": 0,
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=75&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19399&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=2026&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "74",
      "title": "Furniture Installation",
      "description": "<p><strong>Furniture Installation</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "10/8/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000715",
      "estHours": "50",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=74&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19388&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "73",
      "title": "Test FOP Dry Run2",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "9/26/2024",
      "customer": "Deloitte New York",
      "project": "Deloitte New York : Design, Furniture and Flooring Installation",
      "salesOrder": "Sales Order #SLS00000718",
      "estHours": 0,
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=73&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19391&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=2026&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "72",
      "title": "1 Oct Test Work Order",
      "description": "No description",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Standard",
      "date": "9/30/2024",
      "customer": "White House Administration",
      "project": "White House Administration : Furniture Installation",
      "salesOrder": "Sales Order #SLS00000721",
      "estHours": "100",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=72&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19394&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1903&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "71",
      "title": "Test",
      "description": "No description",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": "Standard",
      "date": "9/30/2024",
      "customer": "Deloitte New York",
      "project": "Deloitte New York : Design, Furniture and Flooring Installation",
      "salesOrder": "Sales Order #SLS00000718",
      "estHours": 0,
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=71&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19391&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=2026&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "70",
      "title": "Test FOP Dry Run",
      "description": "No description",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Standard",
      "date": "9/30/2024",
      "customer": "Deloitte New York",
      "project": "Deloitte New York : Design, Furniture and Flooring Installation",
      "salesOrder": "Sales Order #SLS00000718",
      "estHours": 0,
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=70&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19391&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=2026&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "69",
      "title": "Test customer center",
      "description": "No description",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Standard",
      "date": "9/30/2024",
      "customer": "Deloitte New York",
      "project": "Deloitte New York : Design, Furniture and Flooring Installation",
      "salesOrder": "Sales Order #SLS00000717",
      "estHours": 0,
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=69&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19390&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=2026&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "67",
      "title": "Furniture Installation",
      "description": "<p><strong>Furniture Installation</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Repair",
      "date": "9/26/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000715",
      "estHours": "100",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=67&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19388&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "66",
      "title": "Furniture Installation",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "9/26/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000713",
      "estHours": "99",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=66&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=19372&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "65",
      "title": "TEST XYZ",
      "description": "No description",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": "Standard",
      "date": "9/26/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000672",
      "estHours": "99",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=65&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17379&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "63",
      "title": "test site test",
      "description": "No description",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Standard",
      "date": "9/23/2024",
      "customer": "Pravallika",
      "project": "Pravallika : Furniture and Walls Installation",
      "salesOrder": "Sales Order #SLS00000688",
      "estHours": 0,
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=63&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17739&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=2010&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "62",
      "title": "Furniture Installation",
      "description": "<p>Furniture Installation</p>",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": "Repair",
      "date": "9/5/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000654",
      "estHours": "2",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=62&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "61",
      "title": "Furniture Installation",
      "description": "<p><strong>Furniture Installation</strong></p>",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": "Service",
      "date": "9/23/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000686",
      "estHours": "40",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=61&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17729&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "60",
      "title": "Furniture Installation",
      "description": "<p><strong>Sample Work Order - Mei - DO NOT USE</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "9/23/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000686",
      "estHours": "50",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=60&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17729&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "59",
      "title": "Furniture Installation",
      "description": "<p><strong>Furniture Installation</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Moves",
      "date": "9/23/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000686",
      "estHours": "50",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=59&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17729&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "58",
      "title": "Furniture Installation",
      "description": "<p><strong>Furniture Installation</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Walls",
      "date": "9/23/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000686",
      "estHours": "50",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=58&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17729&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "57",
      "title": "Furniture Installation",
      "description": "<p><strong>Furniture Installation</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "9/23/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000686",
      "estHours": "50",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=57&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17729&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "56",
      "title": "Furniture Installation",
      "description": "<p>Furniture Installation</p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "9/23/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000686",
      "estHours": "10",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=56&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17729&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "55",
      "title": "Furniture Installation",
      "description": "<p><strong>Furniture Installation</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "9/23/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000686",
      "estHours": "20",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=55&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17729&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "54",
      "title": "Furniture Installation",
      "description": "<p>Furniture Installation</p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Maintenance",
      "date": "9/23/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000686",
      "estHours": "5",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=54&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17729&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "50",
      "title": "test site test",
      "description": "No description",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Standard",
      "date": "9/11/2024",
      "customer": "Test site test",
      "project": "Test site test : AV and Security Camera Installation",
      "salesOrder": "Sales Order #SLS00000681",
      "estHours": "2",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=50&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=17705&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1900&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "49",
      "title": "Work Order Test - Sept 12 - Mei",
      "description": "<p class=\"ql-align-justify\"><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam est, tempus vel eleifend sit amet, vehicula sed diam. Maecenas porta mollis sem in aliquam. Suspendisse imperdiet suscipit accumsan. Vivamus lacinia interdum sagittis. Mauris vitae nisl vitae magna lacinia aliquam. Proin lacinia, erat at aliquet bibendum, justo nunc faucibus velit, et fringilla lorem libero non ligula. Vivamus id mattis sem. Cras sagittis nunc est, vitae vestibulum erat sollicitudin eu. Aenean purus dui, dignissim sed molestie quis, feugiat vel velit.</strong></p><p class=\"ql-align-justify\"></p><p class=\"ql-align-justify\"><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Nulla pretium accumsan laoreet. Duis diam augue, maximus et venenatis vel,</span><em style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\"> sagittis quis lectus. Pellentesque vestibulum tortor eget eleifend sodales. </em><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Morbi a ultrices velit, in sollicitudin tortor. Fusce imperdiet posuere arcu, nec porta leo fermentum id. Aliquam consectetur consectetur erat ut ultricies. Donec eu erat metus. Aliquam bibendum quis velit in tempor. Praesent id augue vestibulum, euismod odio vel, rutrum diam. Praesent dignissim, arcu et gravida suscipit, sapien ex eleifend dolor, non ultrices nunc metus id enim. Aliquam maximus lectus eu neque blandit, malesuada egestas libero maximus. Nunc finibus laoreet eros, et efficitur nibh tincidunt id. Integer fringilla arcu eu dolor varius, sit amet mattis nunc tincidunt.</span></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "9/9/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000654",
      "estHours": "100",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=49&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "48",
      "title": "Flooring Installation",
      "description": "<p><strong>Flooring Installation</strong></p>",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": "Standard",
      "date": "9/5/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000654",
      "estHours": "50",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=48&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "47",
      "title": "AV Installation",
      "description": "<p>AV Installation</p>",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": "Service",
      "date": "9/5/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000654",
      "estHours": "10",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=47&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "46",
      "title": "Furniture Installation",
      "description": "<p>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</p><p>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</p><p>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</p><p>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</p><p>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</p><p>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</p><p>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</p><p>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</p><p>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</p><p>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</p>",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": "Service",
      "date": "9/5/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000654",
      "estHours": "100",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=46&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "45",
      "title": "Furniture Installation",
      "description": "<p>Sample 3</p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "9/3/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000654",
      "estHours": "10",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=45&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "44",
      "title": "Furniture Installation",
      "description": "<p>Furniture Installation</p>",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": "Service",
      "date": "9/5/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000654",
      "estHours": "5",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=44&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "43",
      "title": "Furniture Installation",
      "description": "<p>Furniture Installation</p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "9/3/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000654",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=43&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "42",
      "title": "Furniture Installation",
      "description": "<p><strong>Furniture Installation</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Repair",
      "date": "9/2/2024",
      "customer": "World Bank",
      "project": "World Bank : Furniture and AV Installation",
      "salesOrder": "Sales Order #SLS00000654",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=42&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16211&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1883&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "41",
      "title": "TESTED FOR ROLE",
      "description": "No description",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Standard",
      "date": "8/1/2024",
      "customer": "3M",
      "project": "3M : Security Camera Installation",
      "salesOrder": "Sales Order #SLS00000657",
      "estHours": 0,
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=41&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16214&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1893&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "40",
      "title": "TESTED FOR ROLE",
      "description": "No description",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Standard",
      "date": "8/2/2024",
      "customer": "3M",
      "project": "3M : Security Camera Installation",
      "salesOrder": "Sales Order #SLS00000657",
      "estHours": 0,
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=40&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16214&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1893&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "39",
      "title": "Test Site Checklist",
      "description": "No description",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Standard",
      "date": "8/1/2024",
      "customer": "Test For site checklist",
      "project": "Test For site checklist : AV Replacement",
      "salesOrder": "Sales Order #SLS00000655",
      "estHours": 0,
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=39&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16212&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1890&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "38",
      "title": "Furniture Installation",
      "description": "No description",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": "Service",
      "date": "8/1/2024",
      "customer": "Test For site checklist",
      "project": "Test For site checklist : AV Replacement",
      "salesOrder": "Sales Order #SLS00000655",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=38&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16212&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1890&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "37",
      "title": "Work Order aug 1 test",
      "description": "No description",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Standard",
      "date": "8/1/2024",
      "customer": "Test For site checklist",
      "project": "Test For site checklist : AV Replacement",
      "salesOrder": "Sales Order #SLS00000655",
      "estHours": 0,
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=37&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16212&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1890&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "36",
      "title": "Work Order aug 1 test",
      "description": "No description",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": "Standard",
      "date": "8/1/2024",
      "customer": "Test For site checklist",
      "project": "Test For site checklist : AV Replacement",
      "salesOrder": "Sales Order #SLS00000655",
      "estHours": 0,
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=36&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=16212&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1890&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "35",
      "title": "Work Order Sample July 31",
      "description": "<p><strong>Work Order Sample July 31</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "8/2/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000651",
      "estHours": "8",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=35&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=15100&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "34",
      "title": "Furniture and Flooring Installation",
      "description": "<p><strong>Furniture and Flooring Installation</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Walls",
      "date": "8/2/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000651",
      "estHours": "8",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=34&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=15100&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "33",
      "title": "AV Installation",
      "description": "<p><strong>AV Installation</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "7/29/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=33&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "32",
      "title": "SLS00000621_WRKORDR001",
      "description": "<p><strong style=\"color: rgb(232, 230, 227); --darkreader-inline-color: #d8d4cf;\" data-darkreader-inline-color=\"\">Work Order Instructions QA Test</strong></p>",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": "Standard",
      "date": "7/19/2024",
      "customer": "California Airport",
      "project": "California Airport : Furniture Installation",
      "salesOrder": "Sales Order #SLS00000621",
      "estHours": 0,
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=32&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=13089&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1774&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "31",
      "title": "Flooring Installation",
      "description": "<p>Test</p>",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": "Service",
      "date": "7/19/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "20",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=31&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "30",
      "title": "Flooring Installation",
      "description": "No description",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": "Service",
      "date": "7/12/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "20",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=30&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "29",
      "title": "Security Camera Installation",
      "description": "<p><span style=\"color: rgb(38, 38, 38); background-color: rgb(255, 255, 255);\">Security Camera Installation</span></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "7/12/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "16",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=29&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "28",
      "title": "Conference Table Delivery",
      "description": "<p>Test</p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Moves",
      "date": "7/12/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "2",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=28&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "27",
      "title": "Test Work Order",
      "description": "<p><strong>Test Work Order</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "7/12/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "2",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=27&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "26",
      "title": "Test Work Order",
      "description": "<p>Test Work Order</p>",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Standard",
      "date": "7/12/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "2",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=26&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "25",
      "title": "Furniture Installation",
      "description": "<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p><p></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim.</span></p><p></p><p><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
      "status": {
        "text": "Hold",
        "value": "7",
        "code": "#6c757d"
      },
      "type": "Service",
      "date": "7/15/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=25&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "24",
      "title": "Test Work Order",
      "description": "<p>Test Work Order</p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "7/17/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "10",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=24&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "23",
      "title": "Test Work Order",
      "description": "<p>Test Work Order</p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "7/11/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "5",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=23&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "22",
      "title": "Test Work Order",
      "description": "<p>Test Work Order</p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "7/10/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=22&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "21",
      "title": "Maintenance Survey",
      "description": "<p>Test Work Order</p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Maintenance",
      "date": "7/10/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=21&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "20",
      "title": "Desks Installation",
      "description": "<p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p><p></p><p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim.</span></p><p></p><p><strong style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Mockup",
      "date": "7/15/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=20&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "19",
      "title": "Walls Installation Only",
      "description": "<ol><li>- **Review Wall Layout Plans**: Begin by carefully reviewing the wall layout plans to confirm measurements and placements.</li><li>- **Mark the Floor for Wall Positioning**: Use a chalk line or tape measure to mark the exact placement of the walls on the floor.</li><li>- **Install Base Track**: Position the base track along the marked line and secure it to the floor using appropriate anchors (e.g., screws, bolts) for the surface type.</li><li>- **Place and Secure Vertical Studs**: Insert vertical studs into the base track, spacing them according to the layout plans (typically 16 or 24 inches apart). Ensure each stud is plumb and level, then secure it to the base track.</li><li>- **Install Top Track**: Attach the top track to the ceiling, aligning it with the base track, and secure the studs to the top track.</li><li>- **Add Insulation or In-Wall Elements**: Insert insulation, wiring, or any other in-wall components as specified in the project requirements.</li><li>- **Attach Drywall or Paneling**: Secure drywall or paneling to the studs using drywall screws, ensuring each panel is flush and properly aligned.</li><li>- **Finish Seams and Screws**: Apply joint compound to seams and screw holes, then smooth out using a taping knife. Apply additional coats if necessary.</li><li>- **Sand for a Smooth Finish**: Once the compound is dry, sand the seams and any patched areas until smooth and ready for painting or finishing.</li><li>- **Final Inspection**: Verify that walls are plumb, level, secure, and meet all specified quality and safety standards before considering the installation complete.</li></ol>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "7/8/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "300",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=19&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "18",
      "title": "Install Walls",
      "description": "<p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p><p></p><p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim.</span></p><p></p><p><strong style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "7/8/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "300",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=18&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "17",
      "title": "Walls Installation",
      "description": "<ol><li>- **Review Wall Layout Plans**: Begin by carefully reviewing the wall layout plans to confirm measurements and placements.</li><li>- **Mark the Floor for Wall Positioning**: Use a chalk line or tape measure to mark the exact placement of the walls on the floor.</li><li>- **Install Base Track**: Position the base track along the marked line and secure it to the floor using appropriate anchors (e.g., screws, bolts) for the surface type.</li><li>- **Place and Secure Vertical Studs**: Insert vertical studs into the base track, spacing them according to the layout plans (typically 16 or 24 inches apart). Ensure each stud is plumb and level, then secure it to the base track.</li><li>- **Install Top Track**: Attach the top track to the ceiling, aligning it with the base track, and secure the studs to the top track.</li><li>- **Add Insulation or In-Wall Elements**: Insert insulation, wiring, or any other in-wall components as specified in the project requirements.</li><li>- **Attach Drywall or Paneling**: Secure drywall or paneling to the studs using drywall screws, ensuring each panel is flush and properly aligned.</li><li>- **Finish Seams and Screws**: Apply joint compound to seams and screw holes, then smooth out using a taping knife. Apply additional coats if necessary.</li><li>- **Sand for a Smooth Finish**: Once the compound is dry, sand the seams and any patched areas until smooth and ready for painting or finishing.</li><li>- **Final Inspection**: Verify that walls are plumb, level, secure, and meet all specified quality and safety standards before considering the installation complete.</li></ol>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "7/8/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "300",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=17&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "16",
      "title": "Install Walls",
      "description": "<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p><p></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim.</span></p><p></p><p><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "7/8/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "300",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=16&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "15",
      "title": "Drop off and Walls Installation",
      "description": "<ol><li>- Unload all materials at the designated worksite and organize for efficient access.</li><li>- Verify wall layout plans, marking the floor to ensure precise alignment.</li><li>- Position and secure the base track with appropriate anchors, ensuring it is level.</li><li>- Attach vertical studs to the base track, spacing them according to project specifications.</li><li>- Install insulation or in-wall elements as needed.</li><li>- Attach drywall or paneling to studs with screws.</li><li>- Apply joint compound to seams, then sand for a smooth finish in preparation for painting, if required.</li><li>- Perform a final inspection to ensure all walls are aligned, secure, and meet safety and quality standards.</li></ol>",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Service",
      "date": "7/8/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "300",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=15&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "14",
      "title": "Install Walls",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "7/8/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "300",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=14&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "13",
      "title": "Walls Installation",
      "description": "<ol><li>- **Review Wall Layout Plans**: Begin by carefully reviewing the wall layout plans to confirm measurements and placements.</li><li>- **Mark the Floor for Wall Positioning**: Use a chalk line or tape measure to mark the exact placement of the walls on the floor.</li><li>- **Install Base Track**: Position the base track along the marked line and secure it to the floor using appropriate anchors (e.g., screws, bolts) for the surface type.</li><li>- **Place and Secure Vertical Studs**: Insert vertical studs into the base track, spacing them according to the layout plans (typically 16 or 24 inches apart). Ensure each stud is plumb and level, then secure it to the base track.</li><li>- **Install Top Track**: Attach the top track to the ceiling, aligning it with the base track, and secure the studs to the top track.</li><li>- **Add Insulation or In-Wall Elements**: Insert insulation, wiring, or any other in-wall components as specified in the project requirements.</li><li>- **Attach Drywall or Paneling**: Secure drywall or paneling to the studs using drywall screws, ensuring each panel is flush and properly aligned.</li><li>- **Finish Seams and Screws**: Apply joint compound to seams and screw holes, then smooth out using a taping knife. Apply additional coats if necessary.</li><li>- **Sand for a Smooth Finish**: Once the compound is dry, sand the seams and any patched areas until smooth and ready for painting or finishing.</li><li>- **Final Inspection**: Verify that walls are plumb, level, secure, and meet all specified quality and safety standards before considering the installation complete.</li></ol><p></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "7/8/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "300",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=13&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "12",
      "title": "Install Walls",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "7/8/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "300",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=12&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "11",
      "title": "Walls Installation Only",
      "description": "<ol><li>- **Review Wall Layout Plans**: Begin by carefully reviewing the wall layout plans to confirm measurements and placements.</li><li>- **Mark the Floor for Wall Positioning**: Use a chalk line or tape measure to mark the exact placement of the walls on the floor.</li><li>- **Install Base Track**: Position the base track along the marked line and secure it to the floor using appropriate anchors (e.g., screws, bolts) for the surface type.</li><li>- **Place and Secure Vertical Studs**: Insert vertical studs into the base track, spacing them according to the layout plans (typically 16 or 24 inches apart). Ensure each stud is plumb and level, then secure it to the base track.</li><li>- **Install Top Track**: Attach the top track to the ceiling, aligning it with the base track, and secure the studs to the top track.</li><li>- **Add Insulation or In-Wall Elements**: Insert insulation, wiring, or any other in-wall components as specified in the project requirements.</li><li>- **Attach Drywall or Paneling**: Secure drywall or paneling to the studs using drywall screws, ensuring each panel is flush and properly aligned.</li><li>- **Finish Seams and Screws**: Apply joint compound to seams and screw holes, then smooth out using a taping knife. Apply additional coats if necessary.</li><li>- **Sand for a Smooth Finish**: Once the compound is dry, sand the seams and any patched areas until smooth and ready for painting or finishing.</li><li>- **Final Inspection**: Verify that walls are plumb, level, secure, and meet all specified quality and safety standards before considering the installation complete.</li></ol><p></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "7/8/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "300",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=11&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "10",
      "title": "Install Walls",
      "description": "No description",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "7/8/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "300",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=10&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "9",
      "title": "Install Walls",
      "description": "<p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p><p> </p><p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim.</span></p><p> </p><p><strong style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "7/15/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=9&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "8",
      "title": "Walls Installation",
      "description": "<ol><li>- **Review Wall Layout Plans**: Begin by carefully reviewing the wall layout plans to confirm measurements and placements.</li><li>- **Mark the Floor for Wall Positioning**: Use a chalk line or tape measure to mark the exact placement of the walls on the floor.</li><li>- **Install Base Track**: Position the base track along the marked line and secure it to the floor using appropriate anchors (e.g., screws, bolts) for the surface type.</li><li>- **Place and Secure Vertical Studs**: Insert vertical studs into the base track, spacing them according to the layout plans (typically 16 or 24 inches apart). Ensure each stud is plumb and level, then secure it to the base track.</li><li>- **Install Top Track**: Attach the top track to the ceiling, aligning it with the base track, and secure the studs to the top track.</li><li>- **Add Insulation or In-Wall Elements**: Insert insulation, wiring, or any other in-wall components as specified in the project requirements.</li><li>- **Attach Drywall or Paneling**: Secure drywall or paneling to the studs using drywall screws, ensuring each panel is flush and properly aligned</li><li>- **Finish Seams and Screws**: Apply joint compound to seams and screw holes, then smooth out using a taping knife. Apply additional coats if necessary</li><li>- **Sand for a Smooth Finish**: Once the compound is dry, sand the seams and any patched areas until smooth and ready for painting or finishing.</li><li>- **Final Inspection**: Verify that walls are plumb, level, secure, and meet all specified quality and safety standards before considering the installation complete.</li></ol>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "7/15/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=8&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "7",
      "title": "Install Walls",
      "description": "<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p><p></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim.</span></p><p></p><p><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "7/5/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "200",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=7&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "6",
      "title": "Movement of furniture",
      "description": "<p><span style=\"background-color:rgb(255,255,255);color:rgb(0,0,0);\">Work order instructions for work order sample</span></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "7/3/2024",
      "customer": "Anonymous Customer HQ",
      "project": "Rogers Communication : Office Remodel",
      "salesOrder": "Sales Order #SLS00000610",
      "estHours": 0,
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=6&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11727&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1509&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "5",
      "title": "Installation of chairs",
      "description": "<p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p>",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": "Standard",
      "date": "7/19/2024",
      "customer": "World Bank",
      "project": "No Project",
      "salesOrder": "Sales Order #SLS00000604",
      "estHours": 0,
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=5&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11716&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "4",
      "title": "Crates Pick up",
      "description": "No description",
      "status": {
        "text": "Closed",
        "value": "3",
        "code": "#6c757d"
      },
      "type": "Moves",
      "date": "7/29/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "10",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=4&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "3",
      "title": "Installation of Furnitures",
      "description": "<p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p><p></p><p><span style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim.</span></p><p></p><p><strong style=\"color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Service",
      "date": "7/5/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "20",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=3&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "2",
      "title": "Installation of Furnitures",
      "description": "<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor.</span></p><p></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim.</span></p><p></p><p><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
      "status": {
        "text": "Completed",
        "value": "4",
        "code": "#28a745"
      },
      "type": "Standard",
      "date": "7/5/2024",
      "customer": "World Bank",
      "project": "No Project",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "20",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=2&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    },
    {
      "id": "1",
      "title": "Furniture Installation",
      "description": "<ol><li>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</li><li>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</li><li>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</li><li>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</li><li>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</li><li>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</li><li>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</li><li>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</li><li>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</li><li>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</li></ol>",
      "status": {
        "text": "Pending",
        "value": "1",
        "code": "1"
      },
      "type": "Service",
      "date": "7/5/2024",
      "customer": "World Bank",
      "project": "World Bank : World Bank Office Furniture Installation",
      "salesOrder": "Sales Order #SLS00000609",
      "estHours": "10",
      "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=1&compid=TSTDRV2617106",
      "soUrl": "/app/accounting/transactions/salesord.nl?id=11722&compid=TSTDRV2617106",
      "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
      "receiptStatus": {
        "text": "",
        "value": ""
      }
    }
  ];
};

export const fetchWorkOrders = async (): Promise<WorkOrder[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock work order data for local development');
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
