const mockup = {
    "userId": 2111,
    "suiteletUrl": "/app/site/hosting/scriptlet.nl?script=1328&deploy=1&compid=TD2952265",
    "workOrders": [
      {
        "id": "5",
        "name": "Work Order Test",
        "title": "Work Order Test",
        "project": {
          "text": "World Bank : World Bank Furniture Installation",
          "value": "2122"
        },
        "date": "12/4/2024",
        "status": {
          "text": "Not Started",
          "value": "4",
          "code": "#026adf"
        },
        "type": {
          "text": "Service",
          "value": "2"
        },
        "memo": "<p><strong>Work Order Test</strong></p>",
        "salesorder": {
          "text": "Sales Order #SO3277",
          "value": "32090"
        },
        "customer": {
          "text": "World Bank",
          "value": "1233"
        },
        "resourceGroup": {
          "text": "",
          "value": ""
        },
        "priority": "",
        "resources": [
          
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          {
            "id": "27",
            "workorder": {
              "text": "Work Order Test",
              "value": "5"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "504",
            "uuid": "32090_7",
            "line": "7",
            "item": {
              "text": "JCTB-24S1",
              "value": "509"
            },
            "description": "X Series,Pedestal,Cushion Top Kit, 24\"D",
            "quantity": 1,
            "availableQty": 1,
            "note": ""
          },
          {
            "id": "25",
            "workorder": {
              "text": "Work Order Test",
              "value": "5"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "",
            "uuid": "32090_7",
            "line": "7",
            "item": {
              "text": "JCTB-24S1",
              "value": "509"
            },
            "description": "X Series,Pedestal,Cushion Top Kit, 24\"D",
            "quantity": 3,
            "availableQty": 3,
            "note": ""
          },
          {
            "id": "26",
            "workorder": {
              "text": "Work Order Test",
              "value": "5"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "",
            "uuid": "32090_8",
            "line": "8",
            "item": {
              "text": "JPMA-24-S1CS1",
              "value": "510"
            },
            "description": "X Series,Pedestal,Mobile,B/F,24\"D,PtdDrwFrt, Stl Lkrl,Ellipse Pull,Cstr,No Top",
            "quantity": 3,
            "availableQty": 3,
            "note": ""
          }
        ],
        "addresses": [
          {
            "id": "5",
            "workorder": {
              "text": "Work Order Test",
              "value": "5"
            },
            "customer": {
              "text": "World Bank",
              "value": "1233"
            },
            "events": [
              "504",
              "516"
            ],
            "address": {
              "text": "3105  Doctors Drive",
              "value": "8402"
            },
            "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
          }
        ],
        "contacts": [
          {
            "id": "5",
            "workorder": {
              "text": "Work Order Test",
              "value": "5"
            },
            "events": [
              "504",
              "516"
            ],
            "contact": {
              "text": "World Bank : Mei Matriano",
              "value": "2123"
            },
            "name": "Mei Matriano",
            "email": "mei@erpsuccesspartners.com",
            "jobTitle": "",
            "mobilePhone": "",
            "phone": "",
            "primary": true,
            "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
          }
        ],
        "events": [
          {
            "id": "504",
            "title": "Work Order Event Test",
            "workorder": {
              "text": "Work Order Test",
              "value": "5"
            },
            "location": "",
            "status": {
              "text": "Tentative",
              "value": "TENTATIVE",
              "code": "bg-secondary"
            },
            "date": {
              "recurrence": "occurs every day from 12/5/2024 until 12/6/2024",
              "dates": [
                "12/5/2024",
                "12/6/2024"
              ],
              "start": "2024-12-05",
              "end": "2024-12-06"
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
            "note": "Work Order Event Test",
            "url": "/app/crm/calendar/event.nl?id=504&compid=TD2952265&selectedtab=custom337",
            "color": "#1a6756",
            "woRef": {
              
            },
            "resources": [
              
            ],
            "vendors": [
              
            ],
            "assets": [
              
            ],
            "items": [
              
            ],
            "contacts": [
              
            ],
            "addresses": [
              
            ],
            "contact": {
              "text": "",
              "value": ""
            },
            "address": {
              "text": "",
              "value": ""
            },
            "organizer": {
              "text": "Abby Kwan",
              "value": "148"
            }
          },
          {
            "id": "516",
            "title": "Work Order Test",
            "workorder": {
              "text": "Work Order Test",
              "value": "5"
            },
            "location": "",
            "status": {
              "text": "Tentative",
              "value": "TENTATIVE",
              "code": "bg-secondary"
            },
            "date": {
              "recurrence": "one time event on 12/10/2024",
              "dates": [
                "12/10/2024"
              ],
              "start": "2024-12-10",
              "end": "2024-12-10"
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
            "note": "test123",
            "url": "/app/crm/calendar/event.nl?id=516&compid=TD2952265&selectedtab=custom337",
            "color": "#1a6756",
            "woRef": {
              
            },
            "resources": [
              
            ],
            "vendors": [
              
            ],
            "assets": [
              
            ],
            "items": [
              
            ],
            "contacts": [
              
            ],
            "addresses": [
              
            ],
            "contact": {
              "text": "5",
              "value": "5"
            },
            "address": {
              "text": "5",
              "value": "5"
            },
            "organizer": {
              "text": "Kat Glass",
              "value": "2111"
            }
          }
        ],
        "projectUrl": "/app/accounting/project/project.nl?id=2122&compid=TD2952265",
        "woUrl": "/app/common/custom/custrecordentry.nl?rectype=1089&id=5&compid=TD2952265",
        "soUrl": "/app/accounting/transactions/salesord.nl?id=32090&compid=TD2952265",
        "esthours": "50"
      },
      {
        "id": "4",
        "name": "Furniture Installation",
        "title": "Furniture Installation",
        "project": {
          "text": "World Bank : World Bank Flooring Installation",
          "value": "2126"
        },
        "date": "12/4/2024",
        "status": {
          "text": "In Progress",
          "value": "1",
          "code": "#026adf"
        },
        "type": {
          "text": "Service",
          "value": "2"
        },
        "memo": "<p>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</p><p>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</p><p>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</p><p>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</p><p>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</p><p>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</p><p>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</p><p>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</p><p>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</p><p>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</p>",
        "salesorder": {
          "text": "Sales Order #SO3278",
          "value": "32092"
        },
        "customer": {
          "text": "World Bank",
          "value": "1233"
        },
        "resourceGroup": {
          "text": "",
          "value": ""
        },
        "priority": "",
        "resources": [
          
        ],
        "vendors": [
          {
            "id": "2",
            "name": "2",
            "vendor": {
              "text": "Bedline",
              "value": "1133"
            },
            "url": "http://www.@Bedline.com",
            "email": "info@Bedline.com",
            "initials": "B",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "event": "502",
            "quantityRequired": 1,
            "quantityAvailable": 50,
            "purchaseOrder": {
              "text": " ",
              "value": ""
            },
            "amount": 0,
            "active": true,
            "woVendor": true,
            "memo": ""
          },
          {
            "id": "3",
            "name": "3",
            "vendor": {
              "text": "Betty Black, Inc.",
              "value": "1137"
            },
            "url": "http://www.@BettyBlack,Inc.com",
            "email": "info@BettyBlackInc.com",
            "initials": "BB",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "event": "502",
            "quantityRequired": 1,
            "quantityAvailable": 40,
            "purchaseOrder": {
              "text": " ",
              "value": ""
            },
            "amount": 0,
            "active": true,
            "woVendor": true,
            "memo": ""
          }
        ],
        "assets": [
          
        ],
        "items": [
          {
            "id": "22",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "salesorder": {
              "text": "Sales Order #SO3278",
              "value": "32092"
            },
            "event": "502",
            "uuid": "32091_1",
            "line": "1",
            "item": {
              "text": "VZCC-0054-HS",
              "value": "803"
            },
            "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
            "quantity": 1,
            "availableQty": 1,
            "note": ""
          },
          {
            "id": "23",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "salesorder": {
              "text": "Sales Order #SO3278",
              "value": "32092"
            },
            "event": "502",
            "uuid": "32091_2",
            "line": "2",
            "item": {
              "text": "VZCE-7400-H-E",
              "value": "906"
            },
            "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
            "quantity": 2,
            "availableQty": 2,
            "note": ""
          },
          {
            "id": "24",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "salesorder": {
              "text": "Sales Order #SO3278",
              "value": "32092"
            },
            "event": "502",
            "uuid": "32091_3",
            "line": "3",
            "item": {
              "text": "VZCW-0000-P-E",
              "value": "907"
            },
            "description": "Compose,Wall Mount,Fits All Heights",
            "quantity": 2,
            "availableQty": 2,
            "note": ""
          },
          {
            "id": "15",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "salesorder": {
              "text": "Sales Order #SO3278",
              "value": "32092"
            },
            "event": "",
            "uuid": "32091_1",
            "line": "1",
            "item": {
              "text": "VZCC-0054-HS",
              "value": "803"
            },
            "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
            "quantity": 1,
            "availableQty": 1,
            "note": ""
          },
          {
            "id": "16",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "salesorder": {
              "text": "Sales Order #SO3278",
              "value": "32092"
            },
            "event": "",
            "uuid": "32091_2",
            "line": "2",
            "item": {
              "text": "VZCE-7400-H-E",
              "value": "906"
            },
            "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
            "quantity": 3,
            "availableQty": 3,
            "note": ""
          },
          {
            "id": "17",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "salesorder": {
              "text": "Sales Order #SO3278",
              "value": "32092"
            },
            "event": "",
            "uuid": "32091_3",
            "line": "3",
            "item": {
              "text": "VZCW-0000-P-E",
              "value": "907"
            },
            "description": "Compose,Wall Mount,Fits All Heights",
            "quantity": 3,
            "availableQty": 3,
            "note": ""
          },
          {
            "id": "19",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "salesorder": {
              "text": "Sales Order #SO3278",
              "value": "32092"
            },
            "event": "",
            "uuid": "32091_5",
            "line": "5",
            "item": {
              "text": "VZFS-1654-R-E",
              "value": "908"
            },
            "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
            "quantity": 6,
            "availableQty": 6,
            "note": ""
          },
          {
            "id": "18",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "salesorder": {
              "text": "Sales Order #SO3278",
              "value": "32092"
            },
            "event": "",
            "uuid": "32091_4",
            "line": "4",
            "item": {
              "text": "VZFS-1654-R-E",
              "value": "908"
            },
            "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
            "quantity": 6,
            "availableQty": 6,
            "note": ""
          },
          {
            "id": "20",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "salesorder": {
              "text": "Sales Order #SO3278",
              "value": "32092"
            },
            "event": "",
            "uuid": "32091_6",
            "line": "6",
            "item": {
              "text": "VZFS-1654-R-E234",
              "value": "1008"
            },
            "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
            "quantity": 6,
            "availableQty": 6,
            "note": ""
          },
          {
            "id": "21",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "salesorder": {
              "text": "Sales Order #SO3278",
              "value": "32092"
            },
            "event": "",
            "uuid": "32091_7",
            "line": "7",
            "item": {
              "text": "VZTI-1654-FNN-E123",
              "value": "1009"
            },
            "description": "Compose,Single Tile,16In.HX54In.W,Fabric/Tackable,Std Core,No Tech",
            "quantity": 12,
            "availableQty": 12,
            "note": ""
          }
        ],
        "addresses": [
          {
            "id": "4",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "customer": {
              "text": "World Bank",
              "value": "1233"
            },
            "events": [
              "502",
              "507"
            ],
            "address": {
              "text": "3105  Doctors Drive",
              "value": "8402"
            },
            "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
          }
        ],
        "contacts": [
          {
            "id": "4",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "events": [
              "502",
              "507"
            ],
            "contact": {
              "text": "World Bank : Mei Matriano",
              "value": "2123"
            },
            "name": "Mei Matriano",
            "email": "mei@erpsuccesspartners.com",
            "jobTitle": "",
            "mobilePhone": "",
            "phone": "",
            "primary": true,
            "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
          }
        ],
        "events": [
          {
            "id": "506",
            "title": "Furniture Installation",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "location": "",
            "status": {
              "text": "Tentative",
              "value": "TENTATIVE",
              "code": "bg-secondary"
            },
            "date": {
              "recurrence": "occurs every day from 12/2/2024 until 12/5/2024",
              "dates": [
                "12/2/2024",
                "12/5/2024"
              ],
              "start": "2024-12-02",
              "end": "2024-12-05"
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
            "url": "/app/crm/calendar/event.nl?id=506&compid=TD2952265&selectedtab=custom337",
            "color": "#1a6756",
            "woRef": {
              
            },
            "resources": [
              
            ],
            "vendors": [
              
            ],
            "assets": [
              
            ],
            "items": [
              
            ],
            "contacts": [
              
            ],
            "addresses": [
              
            ],
            "contact": {
              "text": "4",
              "value": "4"
            },
            "address": {
              "text": "4",
              "value": "4"
            },
            "organizer": {
              "text": "Kathryn Glass",
              "value": "-5"
            }
          },
          {
            "id": "507",
            "title": "Furniture Installation",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "location": "",
            "status": {
              "text": "Tentative",
              "value": "TENTATIVE",
              "code": "bg-secondary"
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
            "note": "",
            "url": "/app/crm/calendar/event.nl?id=507&compid=TD2952265&selectedtab=custom337",
            "color": "#1a6756",
            "woRef": {
              
            },
            "resources": [
              
            ],
            "vendors": [
              
            ],
            "assets": [
              
            ],
            "items": [
              
            ],
            "contacts": [
              
            ],
            "addresses": [
              
            ],
            "contact": {
              "text": "4",
              "value": "4"
            },
            "address": {
              "text": "4",
              "value": "4"
            },
            "organizer": {
              "text": "Kathryn Glass",
              "value": "-5"
            }
          },
          {
            "id": "503",
            "title": "Furniture Installation",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "location": "",
            "status": {
              "text": "Tentative",
              "value": "TENTATIVE",
              "code": "bg-secondary"
            },
            "date": {
              "recurrence": "occurs every day from 12/4/2024 until 12/6/2024",
              "dates": [
                "12/4/2024",
                "12/6/2024"
              ],
              "start": "2024-12-04",
              "end": "2024-12-06"
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
            "url": "/app/crm/calendar/event.nl?id=503&compid=TD2952265&selectedtab=custom337",
            "color": "#1a6756",
            "woRef": {
              
            },
            "resources": [
              
            ],
            "vendors": [
              
            ],
            "assets": [
              
            ],
            "items": [
              
            ],
            "contacts": [
              
            ],
            "addresses": [
              
            ],
            "contact": {
              "text": "4",
              "value": "4"
            },
            "address": {
              "text": "4",
              "value": "4"
            },
            "organizer": {
              "text": "Kathryn Glass",
              "value": "-5"
            }
          },
          {
            "id": "502",
            "title": "Furniture Installation",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "location": "",
            "status": {
              "text": "Tentative",
              "value": "TENTATIVE",
              "code": "bg-secondary"
            },
            "date": {
              "recurrence": "occurs every day from 12/16/2024 until 12/18/2024",
              "dates": [
                "12/16/2024",
                "12/18/2024"
              ],
              "start": "2024-12-16",
              "end": "2024-12-18"
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
            "url": "/app/crm/calendar/event.nl?id=502&compid=TD2952265&selectedtab=custom337",
            "color": "#1a6756",
            "woRef": {
              
            },
            "resources": [
              
            ],
            "vendors": [
              
            ],
            "assets": [
              
            ],
            "items": [
              
            ],
            "contacts": [
              
            ],
            "addresses": [
              
            ],
            "contact": {
              "text": "",
              "value": ""
            },
            "address": {
              "text": "",
              "value": ""
            },
            "organizer": {
              "text": "Ann Traynor",
              "value": "141"
            }
          }
        ],
        "projectUrl": "/app/accounting/project/project.nl?id=2126&compid=TD2952265",
        "woUrl": "/app/common/custom/custrecordentry.nl?rectype=1089&id=4&compid=TD2952265",
        "soUrl": "/app/accounting/transactions/salesord.nl?id=32092&compid=TD2952265",
        "esthours": "200"
      },
      {
        "id": "3",
        "name": "Furniture Installation 1st Floor",
        "title": "Furniture Installation 1st Floor",
        "project": {
          "text": "World Bank : World Bank Furniture Installation",
          "value": "2122"
        },
        "date": "12/4/2024",
        "status": {
          "text": "Not Started",
          "value": "4",
          "code": "#026adf"
        },
        "type": {
          "text": "Service",
          "value": "2"
        },
        "memo": "",
        "salesorder": {
          "text": "Sales Order #SO3277",
          "value": "32090"
        },
        "customer": {
          "text": "World Bank",
          "value": "1233"
        },
        "resourceGroup": {
          "text": "",
          "value": ""
        },
        "priority": "",
        "resources": [
          
        ],
        "vendors": [
          {
            "id": "1",
            "name": "1",
            "vendor": {
              "text": "Bedline",
              "value": "1133"
            },
            "url": "http://www.@Bedline.com",
            "email": "info@Bedline.com",
            "initials": "B",
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "event": "501",
            "quantityRequired": 2,
            "quantityAvailable": 50,
            "purchaseOrder": {
              "text": " ",
              "value": ""
            },
            "amount": 0,
            "active": true,
            "woVendor": true,
            "memo": ""
          }
        ],
        "assets": [
          
        ],
        "items": [
          {
            "id": "13",
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "501",
            "uuid": "32090_9",
            "line": "9",
            "item": {
              "text": "TA0M-1396-FPS1",
              "value": "511"
            },
            "description": "Planes,Modesty Panel, 13InX96In,Fab,Pwr",
            "quantity": 3,
            "availableQty": 3,
            "note": ""
          },
          {
            "id": "14",
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "501",
            "uuid": "32090_10",
            "line": "10",
            "item": {
              "text": "VZCC-0060-HSS1",
              "value": "512"
            },
            "description": "Compose,Top Trim 60In.W,Stl, Pnl Frame",
            "quantity": 3,
            "availableQty": 3,
            "note": ""
          },
          {
            "id": "11",
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "",
            "uuid": "32090_9",
            "line": "9",
            "item": {
              "text": "TA0M-1396-FPS1",
              "value": "511"
            },
            "description": "Planes,Modesty Panel, 13InX96In,Fab,Pwr",
            "quantity": 3,
            "availableQty": 3,
            "note": ""
          },
          {
            "id": "12",
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "",
            "uuid": "32090_10",
            "line": "10",
            "item": {
              "text": "VZCC-0060-HSS1",
              "value": "512"
            },
            "description": "Compose,Top Trim 60In.W,Stl, Pnl Frame",
            "quantity": 3,
            "availableQty": 3,
            "note": ""
          }
        ],
        "addresses": [
          {
            "id": "3",
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "customer": {
              "text": "World Bank",
              "value": "1233"
            },
            "events": [
              "501",
              "505"
            ],
            "address": {
              "text": "3105  Doctors Drive",
              "value": "8402"
            },
            "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
          }
        ],
        "contacts": [
          {
            "id": "3",
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "events": [
              "501",
              "505"
            ],
            "contact": {
              "text": "World Bank : Mei Matriano",
              "value": "2123"
            },
            "name": "Mei Matriano",
            "email": "mei@erpsuccesspartners.com",
            "jobTitle": "",
            "mobilePhone": "",
            "phone": "",
            "primary": true,
            "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
          }
        ],
        "events": [
          {
            "id": "505",
            "title": "Furniture Installation",
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "location": "",
            "status": {
              "text": "Tentative",
              "value": "TENTATIVE",
              "code": "bg-secondary"
            },
            "date": {
              "recurrence": "occurs every day from 12/2/2024 until 12/5/2024",
              "dates": [
                "12/2/2024",
                "12/5/2024"
              ],
              "start": "2024-12-02",
              "end": "2024-12-05"
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
            "url": "/app/crm/calendar/event.nl?id=505&compid=TD2952265&selectedtab=custom337",
            "color": "#1a6756",
            "woRef": {
              
            },
            "resources": [
              
            ],
            "vendors": [
              
            ],
            "assets": [
              
            ],
            "items": [
              
            ],
            "contacts": [
              
            ],
            "addresses": [
              
            ],
            "contact": {
              "text": "3",
              "value": "3"
            },
            "address": {
              "text": "3",
              "value": "3"
            },
            "organizer": {
              "text": "Kathryn Glass",
              "value": "-5"
            }
          },
          {
            "id": "501",
            "title": "Install Furniture",
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "location": "",
            "status": {
              "text": "Tentative",
              "value": "TENTATIVE",
              "code": "bg-secondary"
            },
            "date": {
              "recurrence": "occurs every day from 12/5/2024 until 12/9/2024",
              "dates": [
                "12/5/2024",
                "12/9/2024"
              ],
              "start": "2024-12-05",
              "end": "2024-12-09"
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
            "note": "Install Furniture",
            "url": "/app/crm/calendar/event.nl?id=501&compid=TD2952265&selectedtab=custom337",
            "color": "#1a6756",
            "woRef": {
              
            },
            "resources": [
              
            ],
            "vendors": [
              
            ],
            "assets": [
              
            ],
            "items": [
              
            ],
            "contacts": [
              
            ],
            "addresses": [
              
            ],
            "contact": {
              "text": "",
              "value": ""
            },
            "address": {
              "text": "",
              "value": ""
            },
            "organizer": {
              "text": "Mei Matriano",
              "value": "2124"
            }
          }
        ],
        "projectUrl": "/app/accounting/project/project.nl?id=2122&compid=TD2952265",
        "woUrl": "/app/common/custom/custrecordentry.nl?rectype=1089&id=3&compid=TD2952265",
        "soUrl": "/app/accounting/transactions/salesord.nl?id=32090&compid=TD2952265",
        "esthours": "200"
      },
      {
        "id": "2",
        "name": "Furniture Installation",
        "title": "Furniture Installation",
        "project": {
          "text": "World Bank : World Bank Furniture Installation",
          "value": "2122"
        },
        "date": "12/3/2024",
        "status": {
          "text": "Not Started",
          "value": "4",
          "code": "#026adf"
        },
        "type": {
          "text": "Service",
          "value": "2"
        },
        "memo": "<p>Furniture Installation</p>",
        "salesorder": {
          "text": "Sales Order #SO3277",
          "value": "32090"
        },
        "customer": {
          "text": "World Bank",
          "value": "1233"
        },
        "resourceGroup": {
          "text": "",
          "value": ""
        },
        "priority": "",
        "resources": [
          
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          {
            "id": "10",
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "499",
            "uuid": "32090_4",
            "line": "4",
            "item": {
              "text": "VZFS-1654-RS1",
              "value": "506"
            },
            "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
            "quantity": 2,
            "availableQty": 2,
            "note": ""
          },
          {
            "id": "9",
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "499",
            "uuid": "32090_6",
            "line": "6",
            "item": {
              "text": "J2HB-5124-SS1RS1",
              "value": "508"
            },
            "description": "X Series PST,HngdDr,51.5Hx24Wx24D,B/B/F,Valet,RH,PtdDwr,Ptd/StlDr,Ellipse Pull,Reg Top,Glide",
            "quantity": 2,
            "availableQty": 2,
            "note": ""
          },
          {
            "id": "8",
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "",
            "uuid": "32090_6",
            "line": "6",
            "item": {
              "text": "J2HB-5124-SS1RS1",
              "value": "508"
            },
            "description": "X Series PST,HngdDr,51.5Hx24Wx24D,B/B/F,Valet,RH,PtdDwr,Ptd/StlDr,Ellipse Pull,Reg Top,Glide",
            "quantity": 3,
            "availableQty": 3,
            "note": ""
          },
          {
            "id": "6",
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "",
            "uuid": "32090_4",
            "line": "4",
            "item": {
              "text": "VZFS-1654-RS1",
              "value": "506"
            },
            "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
            "quantity": 6,
            "availableQty": 6,
            "note": ""
          },
          {
            "id": "7",
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "",
            "uuid": "32090_5",
            "line": "5",
            "item": {
              "text": "VZTI-1654-FNNS1",
              "value": "507"
            },
            "description": "Compose,Single Tile,16In.HX54In.W,Fabric/Tackable,Std Core,No Tech",
            "quantity": 12,
            "availableQty": 12,
            "note": ""
          }
        ],
        "addresses": [
          {
            "id": "2",
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "customer": {
              "text": "World Bank",
              "value": "1233"
            },
            "events": [
              "499",
              "500"
            ],
            "address": {
              "text": "3105  Doctors Drive",
              "value": "8402"
            },
            "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
          }
        ],
        "contacts": [
          {
            "id": "2",
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "events": [
              "499",
              "500"
            ],
            "contact": {
              "text": "World Bank : Mei Matriano",
              "value": "2123"
            },
            "name": "Mei Matriano",
            "email": "mei@erpsuccesspartners.com",
            "jobTitle": "",
            "mobilePhone": "",
            "phone": "",
            "primary": true,
            "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
          }
        ],
        "events": [
          {
            "id": "500",
            "title": "Furniture Installation",
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "location": "",
            "status": {
              "text": "Tentative",
              "value": "TENTATIVE",
              "code": "bg-secondary"
            },
            "date": {
              "recurrence": "one time event on 12/1/2024",
              "dates": [
                "12/1/2024"
              ],
              "start": "2024-12-01",
              "end": "2024-12-01"
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
            "url": "/app/crm/calendar/event.nl?id=500&compid=TD2952265&selectedtab=custom337",
            "color": "#1a6756",
            "woRef": {
              
            },
            "resources": [
              
            ],
            "vendors": [
              
            ],
            "assets": [
              
            ],
            "items": [
              
            ],
            "contacts": [
              
            ],
            "addresses": [
              
            ],
            "contact": {
              "text": "2",
              "value": "2"
            },
            "address": {
              "text": "2",
              "value": "2"
            },
            "organizer": {
              "text": "Kathryn Glass",
              "value": "-5"
            }
          },
          {
            "id": "499",
            "title": "Furniture Installation",
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "location": "",
            "status": {
              "text": "Tentative",
              "value": "TENTATIVE",
              "code": "bg-secondary"
            },
            "date": {
              "recurrence": "occurs every day from 12/3/2024 until 12/31/2024",
              "dates": [
                "12/3/2024",
                "12/31/2024"
              ],
              "start": "2024-12-03",
              "end": "2024-12-31"
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
            "url": "/app/crm/calendar/event.nl?id=499&compid=TD2952265&selectedtab=custom337",
            "color": "#1a6756",
            "woRef": {
              
            },
            "resources": [
              
            ],
            "vendors": [
              
            ],
            "assets": [
              
            ],
            "items": [
              
            ],
            "contacts": [
              
            ],
            "addresses": [
              
            ],
            "contact": {
              "text": "",
              "value": ""
            },
            "address": {
              "text": "",
              "value": ""
            },
            "organizer": {
              "text": "Ann Traynor",
              "value": "141"
            }
          }
        ],
        "projectUrl": "/app/accounting/project/project.nl?id=2122&compid=TD2952265",
        "woUrl": "/app/common/custom/custrecordentry.nl?rectype=1089&id=2&compid=TD2952265",
        "soUrl": "/app/accounting/transactions/salesord.nl?id=32090&compid=TD2952265",
        "esthours": "200"
      },
      {
        "id": "1",
        "name": "Furniture Installation",
        "title": "Furniture Installation",
        "project": {
          "text": "World Bank : World Bank Furniture Installation",
          "value": "2122"
        },
        "date": "12/3/2024",
        "status": {
          "text": "Not Started",
          "value": "4",
          "code": "#026adf"
        },
        "type": {
          "text": "Service",
          "value": "2"
        },
        "memo": "<p><strong>Furniture Installation</strong></p>",
        "salesorder": {
          "text": "Sales Order #SO3277",
          "value": "32090"
        },
        "customer": {
          "text": "World Bank",
          "value": "1233"
        },
        "resourceGroup": {
          "text": "",
          "value": ""
        },
        "priority": "",
        "resources": [
          
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          {
            "id": "4",
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "497",
            "uuid": "32090_1",
            "line": "1",
            "item": {
              "text": "VZCC-0054-HSS1",
              "value": "503"
            },
            "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
            "quantity": 1,
            "availableQty": 1,
            "note": ""
          },
          {
            "id": "1",
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "",
            "uuid": "32090_1",
            "line": "1",
            "item": {
              "text": "VZCC-0054-HSS1",
              "value": "503"
            },
            "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
            "quantity": 1,
            "availableQty": 1,
            "note": ""
          },
          {
            "id": "5",
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "498",
            "uuid": "32090_1",
            "line": "1",
            "item": {
              "text": "VZCC-0054-HSS1",
              "value": "503"
            },
            "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
            "quantity": 1,
            "availableQty": 1,
            "note": ""
          },
          {
            "id": "2",
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "",
            "uuid": "32090_2",
            "line": "2",
            "item": {
              "text": "VZCE-7400-HS1",
              "value": "504"
            },
            "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
            "quantity": 3,
            "availableQty": 3,
            "note": ""
          },
          {
            "id": "3",
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "",
            "uuid": "32090_3",
            "line": "3",
            "item": {
              "text": "VZCW-0000-PS1S1",
              "value": "505"
            },
            "description": "Compose,Wall Mount,Fits All Heights",
            "quantity": 3,
            "availableQty": 3,
            "note": ""
          }
        ],
        "addresses": [
          {
            "id": "1",
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "customer": {
              "text": "World Bank",
              "value": "1233"
            },
            "events": [
              "497",
              "498"
            ],
            "address": {
              "text": "3105  Doctors Drive",
              "value": "8402"
            },
            "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
          }
        ],
        "contacts": [
          {
            "id": "1",
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "events": [
              "497",
              "498"
            ],
            "contact": {
              "text": "World Bank : Mei Matriano",
              "value": "2123"
            },
            "name": "Mei Matriano",
            "email": "mei@erpsuccesspartners.com",
            "jobTitle": "",
            "mobilePhone": "",
            "phone": "",
            "primary": true,
            "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
          }
        ],
        "events": [
          {
            "id": "498",
            "title": "Furniture Installation",
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "location": "",
            "status": {
              "text": "Tentative",
              "value": "TENTATIVE",
              "code": "bg-secondary"
            },
            "date": {
              "recurrence": "one time event on 12/3/2024",
              "dates": [
                "12/3/2024"
              ],
              "start": "2024-12-03",
              "end": "2024-12-03"
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
            "note": "TEST\n111",
            "url": "/app/crm/calendar/event.nl?id=498&compid=TD2952265&selectedtab=custom337",
            "color": "#1a6756",
            "woRef": {
              
            },
            "resources": [
              
            ],
            "vendors": [
              
            ],
            "assets": [
              
            ],
            "items": [
              
            ],
            "contacts": [
              
            ],
            "addresses": [
              
            ],
            "contact": {
              "text": "1",
              "value": "1"
            },
            "address": {
              "text": "1",
              "value": "1"
            },
            "organizer": {
              "text": "Kathryn Glass",
              "value": "-5"
            }
          },
          {
            "id": "497",
            "title": "Deliver Chairs",
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "location": "",
            "status": {
              "text": "Confirmed",
              "value": "CONFIRMED",
              "code": "bg-success"
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
              "start": "08:00",
              "end": "18:00"
            },
            "priority": {
              "text": "High",
              "value": "3",
              "code": "#ca6621"
            },
            "note": "Deliver Chairs",
            "url": "/app/crm/calendar/event.nl?id=497&compid=TD2952265&selectedtab=custom337",
            "color": "#1a6756",
            "woRef": {
              
            },
            "resources": [
              
            ],
            "vendors": [
              
            ],
            "assets": [
              
            ],
            "items": [
              
            ],
            "contacts": [
              
            ],
            "addresses": [
              
            ],
            "contact": {
              "text": "",
              "value": ""
            },
            "address": {
              "text": "",
              "value": ""
            },
            "organizer": {
              "text": "Carol Morgan",
              "value": "149"
            }
          }
        ],
        "projectUrl": "/app/accounting/project/project.nl?id=2122&compid=TD2952265",
        "woUrl": "/app/common/custom/custrecordentry.nl?rectype=1089&id=1&compid=TD2952265",
        "soUrl": "/app/accounting/transactions/salesord.nl?id=32090&compid=TD2952265",
        "esthours": "80"
      }
    ],
    "customers": [
      {
        "text": "World Bank",
        "value": "1233"
      }
    ],
    "resources": [
      {
        "id": "148",
        "name": "Abby Kwan",
        "initials": "AK",
        "email": "demo+emblm1@erpsuccesspartners.com",
        "phone": "(650) 823-8637",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "employee": {
          "text": "Abby Kwan",
          "value": "148"
        },
        "resourceGroups": [
          {
            "text": "Designer",
            "value": "3"
          }
        ],
        "types": [
          {
            "text": "Installer",
            "value": "1"
          }
        ],
        "subTypes": [
          
        ],
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
        "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D148%26compid%3DTD2952265%26selectedtab%3Dcustom336",
        "events": [
          "500",
          "503"
        ],
        "labRates": [
          
        ]
      },
      {
        "id": "141",
        "name": "Ann Traynor",
        "initials": "AT",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 229-3342",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "employee": {
          "text": "Ann Traynor",
          "value": "141"
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
        "subTypes": [
          
        ],
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
        "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D141%26compid%3DTD2952265%26selectedtab%3Dcustom336",
        "events": [
          "500",
          "498",
          "503",
          "501"
        ],
        "labRates": [
          
        ]
      },
      {
        "id": "149",
        "name": "Carol Morgan",
        "initials": "CM",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 316-3424",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "employee": {
          "text": "Carol Morgan",
          "value": "149"
        },
        "resourceGroups": [
          {
            "text": "Driver",
            "value": "2"
          },
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
        "subTypes": [
          
        ],
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
        "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D149%26compid%3DTD2952265%26selectedtab%3Dcustom336",
        "events": [
          "503"
        ],
        "labRates": [
          
        ]
      },
      {
        "id": "142",
        "name": "Conner Avery",
        "initials": "CA",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 740-4045",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "employee": {
          "text": "Conner Avery",
          "value": "142"
        },
        "resourceGroups": [
          {
            "text": "Installers",
            "value": "1"
          }
        ],
        "types": [
          {
            "text": "Foreman",
            "value": "4"
          }
        ],
        "subTypes": [
          
        ],
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
        "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D142%26compid%3DTD2952265%26selectedtab%3Dcustom336",
        "events": [
          "499",
          "497",
          "501",
          "502"
        ],
        "labRates": [
          
        ]
      },
      {
        "id": "150",
        "name": "Dean Nolan",
        "initials": "DN",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 357-4845",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "employee": {
          "text": "Dean Nolan",
          "value": "150"
        },
        "resourceGroups": [
          {
            "text": "Designer",
            "value": "3"
          },
          {
            "text": "Driver",
            "value": "2"
          },
          {
            "text": "Installers",
            "value": "1"
          }
        ],
        "types": [
          
        ],
        "subTypes": [
          
        ],
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
          "text": "",
          "value": ""
        },
        "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D150%26compid%3DTD2952265%26selectedtab%3Dcustom336",
        "events": [
          "503"
        ],
        "labRates": [
          
        ]
      },
      {
        "id": "143",
        "name": "Emma Richards",
        "initials": "ER",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 016-5314",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "employee": {
          "text": "Emma Richards",
          "value": "143"
        },
        "resourceGroups": [
          {
            "text": "Designer",
            "value": "3"
          },
          {
            "text": "Driver",
            "value": "2"
          }
        ],
        "types": [
          
        ],
        "subTypes": [
          
        ],
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
          "text": "",
          "value": ""
        },
        "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D143%26compid%3DTD2952265%26selectedtab%3Dcustom336",
        "events": [
          "516"
        ],
        "labRates": [
          
        ]
      },
      {
        "id": "147",
        "name": "Frank Davenport",
        "initials": "FD",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 833-3545",
        "location": {
          "text": "",
          "value": ""
        },
        "active": false,
        "employee": {
          "text": "Frank Davenport",
          "value": "147"
        },
        "resourceGroups": [
          {
            "text": "Designer",
            "value": "3"
          }
        ],
        "types": [
          
        ],
        "subTypes": [
          
        ],
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
          "text": "",
          "value": ""
        },
        "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D147%26compid%3DTD2952265%26selectedtab%3Dcustom336",
        "events": [
          
        ],
        "labRates": [
          
        ]
      },
      {
        "id": "157",
        "name": "Joel Williams",
        "initials": "JW",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 464-4606",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "employee": {
          "text": "Joel Williams",
          "value": "157"
        },
        "resourceGroups": [
          {
            "text": "Driver",
            "value": "2"
          }
        ],
        "types": [
          {
            "text": "Delivery Driver",
            "value": "2"
          }
        ],
        "subTypes": [
          
        ],
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
        "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D157%26compid%3DTD2952265%26selectedtab%3Dcustom336",
        "events": [
          "499",
          "504",
          "501",
          "502"
        ],
        "labRates": [
          
        ]
      },
      {
        "id": "2124",
        "name": "Mei Matriano",
        "initials": "MM",
        "email": "mei@erpsuccesspartners.com",
        "phone": "",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "employee": {
          "text": "Mei Matriano",
          "value": "2124"
        },
        "resourceGroups": [
          {
            "text": "Designer",
            "value": "3"
          },
          {
            "text": "Installers",
            "value": "1"
          }
        ],
        "types": [
          {
            "text": "Designer",
            "value": "3"
          },
          {
            "text": "Installer",
            "value": "1"
          }
        ],
        "subTypes": [
          
        ],
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
        "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D2124%26compid%3DTD2952265%26selectedtab%3Dcustom336",
        "events": [
          
        ],
        "labRates": [
          
        ]
      },
      {
        "id": "158",
        "name": "Will Clark",
        "initials": "WC",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 003-5347",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "employee": {
          "text": "Will Clark",
          "value": "158"
        },
        "resourceGroups": [
          {
            "text": "Driver",
            "value": "2"
          }
        ],
        "types": [
          {
            "text": "Delivery Driver",
            "value": "2"
          }
        ],
        "subTypes": [
          
        ],
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
        "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D158%26compid%3DTD2952265%26selectedtab%3Dcustom336",
        "events": [
          "499",
          "497",
          "504",
          "501",
          "502"
        ],
        "labRates": [
          
        ]
      }
    ],
    "resourceGroups": [
      {
        "text": "Installers",
        "value": "1",
        "resources": [
          {
            "id": "141",
            "name": "Ann Traynor",
            "initials": "AT",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 229-3342",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "employee": {
              "text": "Ann Traynor",
              "value": "141"
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
            "subTypes": [
              
            ],
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
            "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D141%26compid%3DTD2952265%26selectedtab%3Dcustom336",
            "events": [
              "500",
              "498",
              "503",
              "501"
            ],
            "labRates": [
              
            ]
          },
          {
            "id": "149",
            "name": "Carol Morgan",
            "initials": "CM",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 316-3424",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "employee": {
              "text": "Carol Morgan",
              "value": "149"
            },
            "resourceGroups": [
              {
                "text": "Driver",
                "value": "2"
              },
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
            "subTypes": [
              
            ],
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
            "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D149%26compid%3DTD2952265%26selectedtab%3Dcustom336",
            "events": [
              "503"
            ],
            "labRates": [
              
            ]
          },
          {
            "id": "142",
            "name": "Conner Avery",
            "initials": "CA",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 740-4045",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "employee": {
              "text": "Conner Avery",
              "value": "142"
            },
            "resourceGroups": [
              {
                "text": "Installers",
                "value": "1"
              }
            ],
            "types": [
              {
                "text": "Foreman",
                "value": "4"
              }
            ],
            "subTypes": [
              
            ],
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
            "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D142%26compid%3DTD2952265%26selectedtab%3Dcustom336",
            "events": [
              "499",
              "497",
              "501",
              "502"
            ],
            "labRates": [
              
            ]
          },
          {
            "id": "150",
            "name": "Dean Nolan",
            "initials": "DN",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 357-4845",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "employee": {
              "text": "Dean Nolan",
              "value": "150"
            },
            "resourceGroups": [
              {
                "text": "Designer",
                "value": "3"
              },
              {
                "text": "Driver",
                "value": "2"
              },
              {
                "text": "Installers",
                "value": "1"
              }
            ],
            "types": [
              
            ],
            "subTypes": [
              
            ],
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
              "text": "",
              "value": ""
            },
            "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D150%26compid%3DTD2952265%26selectedtab%3Dcustom336",
            "events": [
              "503"
            ],
            "labRates": [
              
            ]
          },
          {
            "id": "2124",
            "name": "Mei Matriano",
            "initials": "MM",
            "email": "mei@erpsuccesspartners.com",
            "phone": "",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "employee": {
              "text": "Mei Matriano",
              "value": "2124"
            },
            "resourceGroups": [
              {
                "text": "Designer",
                "value": "3"
              },
              {
                "text": "Installers",
                "value": "1"
              }
            ],
            "types": [
              {
                "text": "Designer",
                "value": "3"
              },
              {
                "text": "Installer",
                "value": "1"
              }
            ],
            "subTypes": [
              
            ],
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
            "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D2124%26compid%3DTD2952265%26selectedtab%3Dcustom336",
            "events": [
              
            ],
            "labRates": [
              
            ]
          }
        ],
        "resourceCount": 5
      },
      {
        "text": "Driver",
        "value": "2",
        "resources": [
          {
            "id": "149",
            "name": "Carol Morgan",
            "initials": "CM",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 316-3424",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "employee": {
              "text": "Carol Morgan",
              "value": "149"
            },
            "resourceGroups": [
              {
                "text": "Driver",
                "value": "2"
              },
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
            "subTypes": [
              
            ],
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
            "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D149%26compid%3DTD2952265%26selectedtab%3Dcustom336",
            "events": [
              "503"
            ],
            "labRates": [
              
            ]
          },
          {
            "id": "150",
            "name": "Dean Nolan",
            "initials": "DN",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 357-4845",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "employee": {
              "text": "Dean Nolan",
              "value": "150"
            },
            "resourceGroups": [
              {
                "text": "Designer",
                "value": "3"
              },
              {
                "text": "Driver",
                "value": "2"
              },
              {
                "text": "Installers",
                "value": "1"
              }
            ],
            "types": [
              
            ],
            "subTypes": [
              
            ],
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
              "text": "",
              "value": ""
            },
            "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D150%26compid%3DTD2952265%26selectedtab%3Dcustom336",
            "events": [
              "503"
            ],
            "labRates": [
              
            ]
          },
          {
            "id": "143",
            "name": "Emma Richards",
            "initials": "ER",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 016-5314",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "employee": {
              "text": "Emma Richards",
              "value": "143"
            },
            "resourceGroups": [
              {
                "text": "Designer",
                "value": "3"
              },
              {
                "text": "Driver",
                "value": "2"
              }
            ],
            "types": [
              
            ],
            "subTypes": [
              
            ],
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
              "text": "",
              "value": ""
            },
            "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D143%26compid%3DTD2952265%26selectedtab%3Dcustom336",
            "events": [
              "516"
            ],
            "labRates": [
              
            ]
          },
          {
            "id": "157",
            "name": "Joel Williams",
            "initials": "JW",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 464-4606",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "employee": {
              "text": "Joel Williams",
              "value": "157"
            },
            "resourceGroups": [
              {
                "text": "Driver",
                "value": "2"
              }
            ],
            "types": [
              {
                "text": "Delivery Driver",
                "value": "2"
              }
            ],
            "subTypes": [
              
            ],
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
            "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D157%26compid%3DTD2952265%26selectedtab%3Dcustom336",
            "events": [
              "499",
              "504",
              "501",
              "502"
            ],
            "labRates": [
              
            ]
          },
          {
            "id": "158",
            "name": "Will Clark",
            "initials": "WC",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 003-5347",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "employee": {
              "text": "Will Clark",
              "value": "158"
            },
            "resourceGroups": [
              {
                "text": "Driver",
                "value": "2"
              }
            ],
            "types": [
              {
                "text": "Delivery Driver",
                "value": "2"
              }
            ],
            "subTypes": [
              
            ],
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
            "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D158%26compid%3DTD2952265%26selectedtab%3Dcustom336",
            "events": [
              "499",
              "497",
              "504",
              "501",
              "502"
            ],
            "labRates": [
              
            ]
          }
        ],
        "resourceCount": 5
      },
      {
        "text": "Designer",
        "value": "3",
        "resources": [
          {
            "id": "148",
            "name": "Abby Kwan",
            "initials": "AK",
            "email": "demo+emblm1@erpsuccesspartners.com",
            "phone": "(650) 823-8637",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "employee": {
              "text": "Abby Kwan",
              "value": "148"
            },
            "resourceGroups": [
              {
                "text": "Designer",
                "value": "3"
              }
            ],
            "types": [
              {
                "text": "Installer",
                "value": "1"
              }
            ],
            "subTypes": [
              
            ],
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
            "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D148%26compid%3DTD2952265%26selectedtab%3Dcustom336",
            "events": [
              "500",
              "503"
            ],
            "labRates": [
              
            ]
          },
          {
            "id": "150",
            "name": "Dean Nolan",
            "initials": "DN",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 357-4845",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "employee": {
              "text": "Dean Nolan",
              "value": "150"
            },
            "resourceGroups": [
              {
                "text": "Designer",
                "value": "3"
              },
              {
                "text": "Driver",
                "value": "2"
              },
              {
                "text": "Installers",
                "value": "1"
              }
            ],
            "types": [
              
            ],
            "subTypes": [
              
            ],
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
              "text": "",
              "value": ""
            },
            "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D150%26compid%3DTD2952265%26selectedtab%3Dcustom336",
            "events": [
              "503"
            ],
            "labRates": [
              
            ]
          },
          {
            "id": "143",
            "name": "Emma Richards",
            "initials": "ER",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 016-5314",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "employee": {
              "text": "Emma Richards",
              "value": "143"
            },
            "resourceGroups": [
              {
                "text": "Designer",
                "value": "3"
              },
              {
                "text": "Driver",
                "value": "2"
              }
            ],
            "types": [
              
            ],
            "subTypes": [
              
            ],
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
              "text": "",
              "value": ""
            },
            "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D143%26compid%3DTD2952265%26selectedtab%3Dcustom336",
            "events": [
              "516"
            ],
            "labRates": [
              
            ]
          },
          {
            "id": "147",
            "name": "Frank Davenport",
            "initials": "FD",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 833-3545",
            "location": {
              "text": "",
              "value": ""
            },
            "active": false,
            "employee": {
              "text": "Frank Davenport",
              "value": "147"
            },
            "resourceGroups": [
              {
                "text": "Designer",
                "value": "3"
              }
            ],
            "types": [
              
            ],
            "subTypes": [
              
            ],
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
              "text": "",
              "value": ""
            },
            "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D147%26compid%3DTD2952265%26selectedtab%3Dcustom336",
            "events": [
              
            ],
            "labRates": [
              
            ]
          },
          {
            "id": "2124",
            "name": "Mei Matriano",
            "initials": "MM",
            "email": "mei@erpsuccesspartners.com",
            "phone": "",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "employee": {
              "text": "Mei Matriano",
              "value": "2124"
            },
            "resourceGroups": [
              {
                "text": "Designer",
                "value": "3"
              },
              {
                "text": "Installers",
                "value": "1"
              }
            ],
            "types": [
              {
                "text": "Designer",
                "value": "3"
              },
              {
                "text": "Installer",
                "value": "1"
              }
            ],
            "subTypes": [
              
            ],
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
            "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fid%3D2124%26compid%3DTD2952265%26selectedtab%3Dcustom336",
            "events": [
              
            ],
            "labRates": [
              
            ]
          }
        ],
        "resourceCount": 5
      }
    ],
    "woResources": [
      {
        "id": "1",
        "name": "Will Clark",
        "initials": "WC",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 003-5347",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation",
          "value": "1"
        },
        "events": [
          "497"
        ],
        "employee": {
          "text": "Will Clark",
          "value": "158"
        },
        "resourceGroups": [
          {
            "text": "Driver",
            "value": "2"
          }
        ],
        "types": [
          {
            "text": "Delivery Driver",
            "value": "2"
          }
        ],
        "subTypes": [
          
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
        }
      },
      {
        "id": "2",
        "name": "Conner Avery",
        "initials": "CA",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 740-4045",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation",
          "value": "1"
        },
        "events": [
          "497"
        ],
        "employee": {
          "text": "Conner Avery",
          "value": "142"
        },
        "resourceGroups": [
          {
            "text": "Installers",
            "value": "1"
          }
        ],
        "types": [
          {
            "text": "Foreman",
            "value": "4"
          }
        ],
        "subTypes": [
          
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
          "text": "Crew Enhancement",
          "value": "3"
        }
      },
      {
        "id": "3",
        "name": "Ann Traynor",
        "initials": "AT",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 229-3342",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation",
          "value": "1"
        },
        "events": [
          "498"
        ],
        "employee": {
          "text": "Ann Traynor",
          "value": "141"
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
        "subTypes": [
          
        ],
        "rate": 50,
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
        }
      },
      {
        "id": "4",
        "name": "Will Clark",
        "initials": "WC",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 003-5347",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation",
          "value": "2"
        },
        "events": [
          "499"
        ],
        "employee": {
          "text": "Will Clark",
          "value": "158"
        },
        "resourceGroups": [
          {
            "text": "Driver",
            "value": "2"
          }
        ],
        "types": [
          {
            "text": "Delivery Driver",
            "value": "2"
          }
        ],
        "subTypes": [
          
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
        }
      },
      {
        "id": "5",
        "name": "Conner Avery",
        "initials": "CA",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 740-4045",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation",
          "value": "2"
        },
        "events": [
          "499"
        ],
        "employee": {
          "text": "Conner Avery",
          "value": "142"
        },
        "resourceGroups": [
          {
            "text": "Installers",
            "value": "1"
          }
        ],
        "types": [
          {
            "text": "Foreman",
            "value": "4"
          }
        ],
        "subTypes": [
          
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
          "text": "Crew Enhancement",
          "value": "3"
        }
      },
      {
        "id": "6",
        "name": "Joel Williams",
        "initials": "JW",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 464-4606",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation",
          "value": "2"
        },
        "events": [
          "499"
        ],
        "employee": {
          "text": "Joel Williams",
          "value": "157"
        },
        "resourceGroups": [
          {
            "text": "Driver",
            "value": "2"
          }
        ],
        "types": [
          {
            "text": "Delivery Driver",
            "value": "2"
          }
        ],
        "subTypes": [
          
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
          "text": "Crew Enhancement",
          "value": "3"
        }
      },
      {
        "id": "7",
        "name": "Abby Kwan",
        "initials": "AK",
        "email": "demo+emblm1@erpsuccesspartners.com",
        "phone": "(650) 823-8637",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation",
          "value": "2"
        },
        "events": [
          "500"
        ],
        "employee": {
          "text": "Abby Kwan",
          "value": "148"
        },
        "resourceGroups": [
          {
            "text": "Designer",
            "value": "3"
          }
        ],
        "types": [
          
        ],
        "subTypes": [
          
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
        }
      },
      {
        "id": "8",
        "name": "Ann Traynor",
        "initials": "AT",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 229-3342",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation",
          "value": "2"
        },
        "events": [
          "500"
        ],
        "employee": {
          "text": "Ann Traynor",
          "value": "141"
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
        "subTypes": [
          
        ],
        "rate": 50,
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
        }
      },
      {
        "id": "9",
        "name": "Will Clark",
        "initials": "WC",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 003-5347",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation 1st Floor",
          "value": "3"
        },
        "events": [
          "501"
        ],
        "employee": {
          "text": "Will Clark",
          "value": "158"
        },
        "resourceGroups": [
          {
            "text": "Driver",
            "value": "2"
          }
        ],
        "types": [
          {
            "text": "Delivery Driver",
            "value": "2"
          }
        ],
        "subTypes": [
          
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
        }
      },
      {
        "id": "10",
        "name": "Conner Avery",
        "initials": "CA",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 740-4045",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation 1st Floor",
          "value": "3"
        },
        "events": [
          "501"
        ],
        "employee": {
          "text": "Conner Avery",
          "value": "142"
        },
        "resourceGroups": [
          {
            "text": "Installers",
            "value": "1"
          }
        ],
        "types": [
          {
            "text": "Foreman",
            "value": "4"
          }
        ],
        "subTypes": [
          
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
          "text": "Crew Enhancement",
          "value": "3"
        }
      },
      {
        "id": "11",
        "name": "Joel Williams",
        "initials": "JW",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 464-4606",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation 1st Floor",
          "value": "3"
        },
        "events": [
          "501"
        ],
        "employee": {
          "text": "Joel Williams",
          "value": "157"
        },
        "resourceGroups": [
          {
            "text": "Driver",
            "value": "2"
          }
        ],
        "types": [
          {
            "text": "Delivery Driver",
            "value": "2"
          }
        ],
        "subTypes": [
          
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
          "text": "Crew Enhancement",
          "value": "3"
        }
      },
      {
        "id": "12",
        "name": "Will Clark",
        "initials": "WC",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 003-5347",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation",
          "value": "4"
        },
        "events": [
          "502"
        ],
        "employee": {
          "text": "Will Clark",
          "value": "158"
        },
        "resourceGroups": [
          {
            "text": "Driver",
            "value": "2"
          }
        ],
        "types": [
          {
            "text": "Delivery Driver",
            "value": "2"
          }
        ],
        "subTypes": [
          
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
        }
      },
      {
        "id": "13",
        "name": "Conner Avery",
        "initials": "CA",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 740-4045",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation",
          "value": "4"
        },
        "events": [
          "502"
        ],
        "employee": {
          "text": "Conner Avery",
          "value": "142"
        },
        "resourceGroups": [
          {
            "text": "Installers",
            "value": "1"
          }
        ],
        "types": [
          {
            "text": "Foreman",
            "value": "4"
          }
        ],
        "subTypes": [
          
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
          "text": "Crew Enhancement",
          "value": "3"
        }
      },
      {
        "id": "14",
        "name": "Joel Williams",
        "initials": "JW",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 464-4606",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation",
          "value": "4"
        },
        "events": [
          "502"
        ],
        "employee": {
          "text": "Joel Williams",
          "value": "157"
        },
        "resourceGroups": [
          {
            "text": "Driver",
            "value": "2"
          }
        ],
        "types": [
          {
            "text": "Delivery Driver",
            "value": "2"
          }
        ],
        "subTypes": [
          
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
          "text": "Crew Enhancement",
          "value": "3"
        }
      },
      {
        "id": "15",
        "name": "Ann Traynor",
        "initials": "AT",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 229-3342",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation 1st Floor",
          "value": "3"
        },
        "events": [
          "501"
        ],
        "employee": {
          "text": "Ann Traynor",
          "value": "141"
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
        "subTypes": [
          
        ],
        "rate": 50,
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
        }
      },
      {
        "id": "16",
        "name": "Abby Kwan",
        "initials": "AK",
        "email": "demo+emblm1@erpsuccesspartners.com",
        "phone": "(650) 823-8637",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation",
          "value": "4"
        },
        "events": [
          "503"
        ],
        "employee": {
          "text": "Abby Kwan",
          "value": "148"
        },
        "resourceGroups": [
          {
            "text": "Designer",
            "value": "3"
          }
        ],
        "types": [
          
        ],
        "subTypes": [
          
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
        }
      },
      {
        "id": "17",
        "name": "Ann Traynor",
        "initials": "AT",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 229-3342",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation",
          "value": "4"
        },
        "events": [
          "503"
        ],
        "employee": {
          "text": "Ann Traynor",
          "value": "141"
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
        "subTypes": [
          
        ],
        "rate": 50,
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
        }
      },
      {
        "id": "18",
        "name": "Carol Morgan",
        "initials": "CM",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 316-3424",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation",
          "value": "4"
        },
        "events": [
          "503"
        ],
        "employee": {
          "text": "Carol Morgan",
          "value": "149"
        },
        "resourceGroups": [
          {
            "text": "Driver",
            "value": "2"
          },
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
        "subTypes": [
          
        ],
        "rate": 50,
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
        }
      },
      {
        "id": "19",
        "name": "Dean Nolan",
        "initials": "DN",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 357-4845",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Furniture Installation",
          "value": "4"
        },
        "events": [
          "503"
        ],
        "employee": {
          "text": "Dean Nolan",
          "value": "150"
        },
        "resourceGroups": [
          {
            "text": "Designer",
            "value": "3"
          },
          {
            "text": "Driver",
            "value": "2"
          },
          {
            "text": "Installers",
            "value": "1"
          }
        ],
        "types": [
          
        ],
        "subTypes": [
          
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
        }
      },
      {
        "id": "20",
        "name": "Will Clark",
        "initials": "WC",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 003-5347",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Work Order Test",
          "value": "5"
        },
        "events": [
          "504"
        ],
        "employee": {
          "text": "Will Clark",
          "value": "158"
        },
        "resourceGroups": [
          {
            "text": "Driver",
            "value": "2"
          }
        ],
        "types": [
          {
            "text": "Delivery Driver",
            "value": "2"
          }
        ],
        "subTypes": [
          
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
        }
      },
      {
        "id": "21",
        "name": "Joel Williams",
        "initials": "JW",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 464-4606",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Work Order Test",
          "value": "5"
        },
        "events": [
          "504"
        ],
        "employee": {
          "text": "Joel Williams",
          "value": "157"
        },
        "resourceGroups": [
          {
            "text": "Driver",
            "value": "2"
          }
        ],
        "types": [
          {
            "text": "Delivery Driver",
            "value": "2"
          }
        ],
        "subTypes": [
          
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
          "text": "Crew Enhancement",
          "value": "3"
        }
      },
      {
        "id": "22",
        "name": "Ann Traynor",
        "initials": "AT",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 229-3342",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Work Order Test",
          "value": "5"
        },
        "events": [
          
        ],
        "employee": {
          "text": "Ann Traynor",
          "value": "141"
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
        "subTypes": [
          
        ],
        "rate": 50,
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
        }
      },
      {
        "id": "23",
        "name": "Emma Richards",
        "initials": "ER",
        "email": "demo+emblm@erpsuccesspartners.com",
        "phone": "(650) 016-5314",
        "location": {
          "text": "",
          "value": ""
        },
        "active": true,
        "workorder": {
          "text": "Work Order Test",
          "value": "5"
        },
        "events": [
          "516"
        ],
        "employee": {
          "text": "Emma Richards",
          "value": "143"
        },
        "resourceGroups": [
          {
            "text": "Designer",
            "value": "3"
          },
          {
            "text": "Driver",
            "value": "2"
          }
        ],
        "types": [
          
        ],
        "subTypes": [
          
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
        }
      }
    ],
    "vendors": [
      {
        "id": "1133",
        "name": "Bedline",
        "vendor": {
          "text": "Bedline",
          "value": "1133"
        },
        "url": "http://www.@Bedline.com",
        "email": "info@Bedline.com",
        "initials": "B",
        "quantityRequired": 0,
        "quantityAvailable": 50,
        "active": true,
        "purchaseOrder": {
          "text": "",
          "value": ""
        },
        "woVendor": false,
        "events": [
          "501",
          "502"
        ],
        "memo": ""
      },
      {
        "id": "1137",
        "name": "Betty Black, Inc.",
        "vendor": {
          "text": "Betty Black, Inc.",
          "value": "1137"
        },
        "url": "http://www.@BettyBlack,Inc.com",
        "email": "info@BettyBlackInc.com",
        "initials": "BB",
        "quantityRequired": 0,
        "quantityAvailable": 40,
        "active": true,
        "purchaseOrder": {
          "text": "",
          "value": ""
        },
        "woVendor": false,
        "events": [
          "502"
        ],
        "memo": ""
      },
      {
        "id": "353",
        "name": "Brocade Communications Systems",
        "vendor": {
          "text": "Brocade Communications Systems",
          "value": "353"
        },
        "url": "http://www.@BrocadeCommunicationsSystems.com",
        "email": "info@BrocadeCommunicationsSystems.com",
        "initials": "BC",
        "quantityRequired": 0,
        "quantityAvailable": 30,
        "active": true,
        "purchaseOrder": {
          "text": "",
          "value": ""
        },
        "woVendor": false,
        "events": [
          
        ],
        "memo": ""
      }
    ],
    "assets": [
      
    ],
    "events": [
      {
        "id": "8",
        "title": "Delivery ",
        "workorder": {
          "text": "",
          "value": ""
        },
        "location": "Conference Room - 2nd Floor",
        "status": {
          "text": "Confirmed",
          "value": "CONFIRMED",
          "code": "bg-success"
        },
        "date": {
          "recurrence": "occurs every Thursday from 11/1/2018 until 11/30/2018",
          "dates": [
            "11/1/2018",
            "11/30/2018"
          ],
          "start": "2018-11-01",
          "end": "2018-11-30"
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
        "url": "/app/crm/calendar/event.nl?id=8&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          
        },
        "resources": [
          
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          
        ],
        "contacts": [
          
        ],
        "addresses": [
          
        ],
        "contact": {
          "text": "",
          "value": ""
        },
        "address": {
          "text": "",
          "value": ""
        },
        "organizer": {
          "text": "Joel Williams",
          "value": "157"
        }
      },
      {
        "id": "5",
        "title": "Finance - All Hands",
        "workorder": {
          "text": "",
          "value": ""
        },
        "location": "Finance Conference Room",
        "status": {
          "text": "Confirmed",
          "value": "CONFIRMED",
          "code": "bg-success"
        },
        "date": {
          "recurrence": "occurs every Thursday from 11/1/2018 until 11/30/2018",
          "dates": [
            "11/1/2018",
            "11/30/2018"
          ],
          "start": "2018-11-01",
          "end": "2018-11-30"
        },
        "time": {
          "start": "04:00",
          "end": "05:00"
        },
        "priority": {
          "text": "",
          "value": ""
        },
        "note": "",
        "url": "/app/crm/calendar/event.nl?id=5&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          
        },
        "resources": [
          
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          
        ],
        "contacts": [
          
        ],
        "addresses": [
          
        ],
        "contact": {
          "text": "",
          "value": ""
        },
        "address": {
          "text": "",
          "value": ""
        },
        "organizer": {
          "text": "Frank Davenport",
          "value": "147"
        }
      },
      {
        "id": "4",
        "title": "Managers Meeting",
        "workorder": {
          "text": "",
          "value": ""
        },
        "location": "Main Conference Room",
        "status": {
          "text": "Confirmed",
          "value": "CONFIRMED",
          "code": "bg-success"
        },
        "date": {
          "recurrence": "occurs every Thursday from 11/1/2018 until 11/30/2018",
          "dates": [
            "11/1/2018",
            "11/30/2018"
          ],
          "start": "2018-11-01",
          "end": "2018-11-30"
        },
        "time": {
          "start": "06:00",
          "end": "07:00"
        },
        "priority": {
          "text": "",
          "value": ""
        },
        "note": "",
        "url": "/app/crm/calendar/event.nl?id=4&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          
        },
        "resources": [
          
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          
        ],
        "contacts": [
          
        ],
        "addresses": [
          
        ],
        "contact": {
          "text": "",
          "value": ""
        },
        "address": {
          "text": "",
          "value": ""
        },
        "organizer": {
          "text": "Kathryn Glass",
          "value": "-5"
        }
      },
      {
        "id": "9",
        "title": "Services Team Meeting",
        "workorder": {
          "text": "",
          "value": ""
        },
        "location": "Main Conference Room",
        "status": {
          "text": "Confirmed",
          "value": "CONFIRMED",
          "code": "bg-success"
        },
        "date": {
          "recurrence": "occurs every Thursday from 11/1/2018 until 11/30/2018",
          "dates": [
            "11/1/2018",
            "11/30/2018"
          ],
          "start": "2018-11-01",
          "end": "2018-11-30"
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
        "url": "/app/crm/calendar/event.nl?id=9&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          
        },
        "resources": [
          
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          
        ],
        "contacts": [
          
        ],
        "addresses": [
          
        ],
        "contact": {
          "text": "",
          "value": ""
        },
        "address": {
          "text": "",
          "value": ""
        },
        "organizer": {
          "text": "John Bailey",
          "value": "389"
        }
      },
      {
        "id": "7",
        "title": "Mfg and Production Meeting",
        "workorder": {
          "text": "",
          "value": ""
        },
        "location": "Main Conference Room",
        "status": {
          "text": "Confirmed",
          "value": "CONFIRMED",
          "code": "bg-success"
        },
        "date": {
          "recurrence": "occurs every Friday from 11/2/2018 until 11/30/2018",
          "dates": [
            "11/2/2018",
            "11/30/2018"
          ],
          "start": "2018-11-02",
          "end": "2018-11-30"
        },
        "time": {
          "start": "06:00",
          "end": "07:00"
        },
        "priority": {
          "text": "",
          "value": ""
        },
        "note": "",
        "url": "/app/crm/calendar/event.nl?id=7&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          
        },
        "resources": [
          
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          
        ],
        "contacts": [
          
        ],
        "addresses": [
          
        ],
        "contact": {
          "text": "",
          "value": ""
        },
        "address": {
          "text": "",
          "value": ""
        },
        "organizer": {
          "text": "Larry Nelson",
          "value": "151"
        }
      },
      {
        "id": "2",
        "title": "All Hands Meeting",
        "workorder": {
          "text": "",
          "value": ""
        },
        "location": "Main Conference Room",
        "status": {
          "text": "Confirmed",
          "value": "CONFIRMED",
          "code": "bg-success"
        },
        "date": {
          "recurrence": "occurs every Tuesday from 11/6/2018 until 11/30/2018",
          "dates": [
            "11/6/2018",
            "11/30/2018"
          ],
          "start": "2018-11-06",
          "end": "2018-11-30"
        },
        "time": {
          "start": "04:00",
          "end": "05:00"
        },
        "priority": {
          "text": "",
          "value": ""
        },
        "note": "",
        "url": "/app/crm/calendar/event.nl?id=2&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          
        },
        "resources": [
          
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          
        ],
        "contacts": [
          
        ],
        "addresses": [
          
        ],
        "contact": {
          "text": "",
          "value": ""
        },
        "address": {
          "text": "",
          "value": ""
        },
        "organizer": {
          "text": "Kathryn Glass",
          "value": "-5"
        }
      },
      {
        "id": "3",
        "title": "Lunch & Learn",
        "workorder": {
          "text": "",
          "value": ""
        },
        "location": "Conference Room - 2nd Floor",
        "status": {
          "text": "Confirmed",
          "value": "CONFIRMED",
          "code": "bg-success"
        },
        "date": {
          "recurrence": "occurs every Wednesday from 11/7/2018 until 11/30/2018",
          "dates": [
            "11/7/2018",
            "11/30/2018"
          ],
          "start": "2018-11-07",
          "end": "2018-11-30"
        },
        "time": {
          "start": "04:00",
          "end": "05:00"
        },
        "priority": {
          "text": "",
          "value": ""
        },
        "note": "",
        "url": "/app/crm/calendar/event.nl?id=3&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          
        },
        "resources": [
          
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          
        ],
        "contacts": [
          
        ],
        "addresses": [
          
        ],
        "contact": {
          "text": "",
          "value": ""
        },
        "address": {
          "text": "",
          "value": ""
        },
        "organizer": {
          "text": "Kathryn Glass",
          "value": "-5"
        }
      },
      {
        "id": "493",
        "title": "On Site Event",
        "workorder": {
          "text": "",
          "value": ""
        },
        "location": "",
        "status": {
          "text": "Confirmed",
          "value": "CONFIRMED",
          "code": "bg-success"
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
          "start": "02:00",
          "end": "03:00"
        },
        "priority": {
          "text": "",
          "value": ""
        },
        "note": "",
        "url": "/app/crm/calendar/event.nl?id=493&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          
        },
        "resources": [
          
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          
        ],
        "contacts": [
          
        ],
        "addresses": [
          
        ],
        "contact": {
          "text": "",
          "value": ""
        },
        "address": {
          "text": "",
          "value": ""
        },
        "organizer": {
          "text": "Kathryn Glass",
          "value": "-5"
        }
      },
      {
        "id": "500",
        "title": "Furniture Installation",
        "workorder": {
          "text": "Furniture Installation",
          "value": "2"
        },
        "location": "",
        "status": {
          "text": "Tentative",
          "value": "TENTATIVE",
          "code": "bg-secondary"
        },
        "date": {
          "recurrence": "one time event on 12/1/2024",
          "dates": [
            "12/1/2024"
          ],
          "start": "2024-12-01",
          "end": "2024-12-01"
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
        "url": "/app/crm/calendar/event.nl?id=500&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          "id": "2",
          "name": "Furniture Installation",
          "title": "Furniture Installation",
          "project": {
            "text": "World Bank : World Bank Furniture Installation",
            "value": "2122"
          },
          "date": "12/3/2024",
          "status": {
            "text": "Not Started",
            "value": "4",
            "code": "#026adf"
          },
          "type": {
            "text": "Service",
            "value": "2"
          },
          "memo": "<p>Furniture Installation</p>",
          "salesorder": {
            "text": "Sales Order #SO3277",
            "value": "32090"
          },
          "customer": {
            "text": "World Bank",
            "value": "1233"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": [
            
          ],
          "vendors": [
            
          ],
          "assets": [
            
          ],
          "items": [
            {
              "id": "10",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "499",
              "uuid": "32090_4",
              "line": "4",
              "item": {
                "text": "VZFS-1654-RS1",
                "value": "506"
              },
              "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
              "quantity": 2,
              "availableQty": 2,
              "note": ""
            },
            {
              "id": "9",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "499",
              "uuid": "32090_6",
              "line": "6",
              "item": {
                "text": "J2HB-5124-SS1RS1",
                "value": "508"
              },
              "description": "X Series PST,HngdDr,51.5Hx24Wx24D,B/B/F,Valet,RH,PtdDwr,Ptd/StlDr,Ellipse Pull,Reg Top,Glide",
              "quantity": 2,
              "availableQty": 2,
              "note": ""
            },
            {
              "id": "8",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_6",
              "line": "6",
              "item": {
                "text": "J2HB-5124-SS1RS1",
                "value": "508"
              },
              "description": "X Series PST,HngdDr,51.5Hx24Wx24D,B/B/F,Valet,RH,PtdDwr,Ptd/StlDr,Ellipse Pull,Reg Top,Glide",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "6",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_4",
              "line": "4",
              "item": {
                "text": "VZFS-1654-RS1",
                "value": "506"
              },
              "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
              "quantity": 6,
              "availableQty": 6,
              "note": ""
            },
            {
              "id": "7",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_5",
              "line": "5",
              "item": {
                "text": "VZTI-1654-FNNS1",
                "value": "507"
              },
              "description": "Compose,Single Tile,16In.HX54In.W,Fabric/Tackable,Std Core,No Tech",
              "quantity": 12,
              "availableQty": 12,
              "note": ""
            }
          ],
          "addresses": [
            {
              "id": "2",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "customer": {
                "text": "World Bank",
                "value": "1233"
              },
              "events": [
                "499",
                "500"
              ],
              "address": {
                "text": "3105  Doctors Drive",
                "value": "8402"
              },
              "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
              "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
            }
          ],
          "contacts": [
            {
              "id": "2",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "events": [
                "499",
                "500"
              ],
              "contact": {
                "text": "World Bank : Mei Matriano",
                "value": "2123"
              },
              "name": "Mei Matriano",
              "email": "mei@erpsuccesspartners.com",
              "jobTitle": "",
              "mobilePhone": "",
              "phone": "",
              "primary": true,
              "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
            }
          ],
          "events": [
            {
              "id": "500",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "one time event on 12/1/2024",
                "dates": [
                  "12/1/2024"
                ],
                "start": "2024-12-01",
                "end": "2024-12-01"
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
              "url": "/app/crm/calendar/event.nl?id=500&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "2",
                "value": "2"
              },
              "address": {
                "text": "2",
                "value": "2"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "499",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/3/2024 until 12/31/2024",
                "dates": [
                  "12/3/2024",
                  "12/31/2024"
                ],
                "start": "2024-12-03",
                "end": "2024-12-31"
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
              "url": "/app/crm/calendar/event.nl?id=499&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "",
                "value": ""
              },
              "address": {
                "text": "",
                "value": ""
              },
              "organizer": {
                "text": "Ann Traynor",
                "value": "141"
              }
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=2122&compid=TD2952265",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=1089&id=2&compid=TD2952265",
          "soUrl": "/app/accounting/transactions/salesord.nl?id=32090&compid=TD2952265",
          "esthours": "200"
        },
        "resources": [
          {
            "id": "7",
            "name": "Abby Kwan",
            "initials": "AK",
            "email": "demo+emblm1@erpsuccesspartners.com",
            "phone": "(650) 823-8637",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "events": [
              "500"
            ],
            "employee": {
              "text": "Abby Kwan",
              "value": "148"
            },
            "resourceGroups": [
              {
                "text": "Designer",
                "value": "3"
              }
            ],
            "types": [
              
            ],
            "subTypes": [
              
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
            "selected": true
          },
          {
            "id": "8",
            "name": "Ann Traynor",
            "initials": "AT",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 229-3342",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "events": [
              "500"
            ],
            "employee": {
              "text": "Ann Traynor",
              "value": "141"
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
            "subTypes": [
              
            ],
            "rate": 50,
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
            "selected": true
          }
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          
        ],
        "contacts": [
          {
            "id": "2",
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "events": [
              "499",
              "500"
            ],
            "contact": {
              "text": "World Bank : Mei Matriano",
              "value": "2123"
            },
            "name": "Mei Matriano",
            "email": "mei@erpsuccesspartners.com",
            "jobTitle": "",
            "mobilePhone": "",
            "phone": "",
            "primary": true,
            "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265",
            "selected": true
          }
        ],
        "addresses": [
          {
            "id": "2",
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "customer": {
              "text": "World Bank",
              "value": "1233"
            },
            "events": [
              "499",
              "500"
            ],
            "address": {
              "text": "3105  Doctors Drive",
              "value": "8402"
            },
            "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265",
            "selected": true
          }
        ],
        "contact": {
          "text": "2",
          "value": "2"
        },
        "address": {
          "text": "2",
          "value": "2"
        },
        "organizer": {
          "text": "Kathryn Glass",
          "value": "-5"
        }
      },
      {
        "id": "494",
        "title": "Furniture Installation",
        "workorder": {
          "text": "",
          "value": ""
        },
        "location": "",
        "status": {
          "text": "Confirmed",
          "value": "CONFIRMED",
          "code": "bg-success"
        },
        "date": {
          "recurrence": "one time event on 11/4/2024",
          "dates": [
            "11/4/2024"
          ],
          "start": "2024-11-04",
          "end": "2024-11-04"
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
        "url": "/app/crm/calendar/event.nl?id=494&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          
        },
        "resources": [
          
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          
        ],
        "contacts": [
          
        ],
        "addresses": [
          
        ],
        "contact": {
          "text": "",
          "value": ""
        },
        "address": {
          "text": "",
          "value": ""
        },
        "organizer": {
          "text": "Kathryn Glass",
          "value": "-5"
        }
      },
      {
        "id": "505",
        "title": "Furniture Installation",
        "workorder": {
          "text": "Furniture Installation 1st Floor",
          "value": "3"
        },
        "location": "",
        "status": {
          "text": "Tentative",
          "value": "TENTATIVE",
          "code": "bg-secondary"
        },
        "date": {
          "recurrence": "occurs every day from 12/2/2024 until 12/5/2024",
          "dates": [
            "12/2/2024",
            "12/5/2024"
          ],
          "start": "2024-12-02",
          "end": "2024-12-05"
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
        "url": "/app/crm/calendar/event.nl?id=505&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          "id": "3",
          "name": "Furniture Installation 1st Floor",
          "title": "Furniture Installation 1st Floor",
          "project": {
            "text": "World Bank : World Bank Furniture Installation",
            "value": "2122"
          },
          "date": "12/4/2024",
          "status": {
            "text": "Not Started",
            "value": "4",
            "code": "#026adf"
          },
          "type": {
            "text": "Service",
            "value": "2"
          },
          "memo": "",
          "salesorder": {
            "text": "Sales Order #SO3277",
            "value": "32090"
          },
          "customer": {
            "text": "World Bank",
            "value": "1233"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": [
            
          ],
          "vendors": [
            {
              "id": "1",
              "name": "1",
              "vendor": {
                "text": "Bedline",
                "value": "1133"
              },
              "url": "http://www.@Bedline.com",
              "email": "info@Bedline.com",
              "initials": "B",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "event": "501",
              "quantityRequired": 2,
              "quantityAvailable": 50,
              "purchaseOrder": {
                "text": " ",
                "value": ""
              },
              "amount": 0,
              "active": true,
              "woVendor": true,
              "memo": ""
            }
          ],
          "assets": [
            
          ],
          "items": [
            {
              "id": "13",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "501",
              "uuid": "32090_9",
              "line": "9",
              "item": {
                "text": "TA0M-1396-FPS1",
                "value": "511"
              },
              "description": "Planes,Modesty Panel, 13InX96In,Fab,Pwr",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "14",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "501",
              "uuid": "32090_10",
              "line": "10",
              "item": {
                "text": "VZCC-0060-HSS1",
                "value": "512"
              },
              "description": "Compose,Top Trim 60In.W,Stl, Pnl Frame",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "11",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_9",
              "line": "9",
              "item": {
                "text": "TA0M-1396-FPS1",
                "value": "511"
              },
              "description": "Planes,Modesty Panel, 13InX96In,Fab,Pwr",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "12",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_10",
              "line": "10",
              "item": {
                "text": "VZCC-0060-HSS1",
                "value": "512"
              },
              "description": "Compose,Top Trim 60In.W,Stl, Pnl Frame",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            }
          ],
          "addresses": [
            {
              "id": "3",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "customer": {
                "text": "World Bank",
                "value": "1233"
              },
              "events": [
                "501",
                "505"
              ],
              "address": {
                "text": "3105  Doctors Drive",
                "value": "8402"
              },
              "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
              "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
            }
          ],
          "contacts": [
            {
              "id": "3",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "events": [
                "501",
                "505"
              ],
              "contact": {
                "text": "World Bank : Mei Matriano",
                "value": "2123"
              },
              "name": "Mei Matriano",
              "email": "mei@erpsuccesspartners.com",
              "jobTitle": "",
              "mobilePhone": "",
              "phone": "",
              "primary": true,
              "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
            }
          ],
          "events": [
            {
              "id": "505",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/2/2024 until 12/5/2024",
                "dates": [
                  "12/2/2024",
                  "12/5/2024"
                ],
                "start": "2024-12-02",
                "end": "2024-12-05"
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
              "url": "/app/crm/calendar/event.nl?id=505&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "3",
                "value": "3"
              },
              "address": {
                "text": "3",
                "value": "3"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "501",
              "title": "Install Furniture",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/5/2024 until 12/9/2024",
                "dates": [
                  "12/5/2024",
                  "12/9/2024"
                ],
                "start": "2024-12-05",
                "end": "2024-12-09"
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
              "note": "Install Furniture",
              "url": "/app/crm/calendar/event.nl?id=501&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "",
                "value": ""
              },
              "address": {
                "text": "",
                "value": ""
              },
              "organizer": {
                "text": "Mei Matriano",
                "value": "2124"
              }
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=2122&compid=TD2952265",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=1089&id=3&compid=TD2952265",
          "soUrl": "/app/accounting/transactions/salesord.nl?id=32090&compid=TD2952265",
          "esthours": "200"
        },
        "resources": [
          
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          
        ],
        "contacts": [
          {
            "id": "3",
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "events": [
              "501",
              "505"
            ],
            "contact": {
              "text": "World Bank : Mei Matriano",
              "value": "2123"
            },
            "name": "Mei Matriano",
            "email": "mei@erpsuccesspartners.com",
            "jobTitle": "",
            "mobilePhone": "",
            "phone": "",
            "primary": true,
            "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265",
            "selected": true
          }
        ],
        "addresses": [
          {
            "id": "3",
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "customer": {
              "text": "World Bank",
              "value": "1233"
            },
            "events": [
              "501",
              "505"
            ],
            "address": {
              "text": "3105  Doctors Drive",
              "value": "8402"
            },
            "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265",
            "selected": true
          }
        ],
        "contact": {
          "text": "3",
          "value": "3"
        },
        "address": {
          "text": "3",
          "value": "3"
        },
        "organizer": {
          "text": "Kathryn Glass",
          "value": "-5"
        }
      },
      {
        "id": "506",
        "title": "Furniture Installation",
        "workorder": {
          "text": "Furniture Installation",
          "value": "4"
        },
        "location": "",
        "status": {
          "text": "Tentative",
          "value": "TENTATIVE",
          "code": "bg-secondary"
        },
        "date": {
          "recurrence": "occurs every day from 12/2/2024 until 12/5/2024",
          "dates": [
            "12/2/2024",
            "12/5/2024"
          ],
          "start": "2024-12-02",
          "end": "2024-12-05"
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
        "url": "/app/crm/calendar/event.nl?id=506&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          "id": "4",
          "name": "Furniture Installation",
          "title": "Furniture Installation",
          "project": {
            "text": "World Bank : World Bank Flooring Installation",
            "value": "2126"
          },
          "date": "12/4/2024",
          "status": {
            "text": "In Progress",
            "value": "1",
            "code": "#026adf"
          },
          "type": {
            "text": "Service",
            "value": "2"
          },
          "memo": "<p>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</p><p>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</p><p>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</p><p>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</p><p>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</p><p>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</p><p>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</p><p>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</p><p>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</p><p>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</p>",
          "salesorder": {
            "text": "Sales Order #SO3278",
            "value": "32092"
          },
          "customer": {
            "text": "World Bank",
            "value": "1233"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": [
            
          ],
          "vendors": [
            {
              "id": "2",
              "name": "2",
              "vendor": {
                "text": "Bedline",
                "value": "1133"
              },
              "url": "http://www.@Bedline.com",
              "email": "info@Bedline.com",
              "initials": "B",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "event": "502",
              "quantityRequired": 1,
              "quantityAvailable": 50,
              "purchaseOrder": {
                "text": " ",
                "value": ""
              },
              "amount": 0,
              "active": true,
              "woVendor": true,
              "memo": ""
            },
            {
              "id": "3",
              "name": "3",
              "vendor": {
                "text": "Betty Black, Inc.",
                "value": "1137"
              },
              "url": "http://www.@BettyBlack,Inc.com",
              "email": "info@BettyBlackInc.com",
              "initials": "BB",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "event": "502",
              "quantityRequired": 1,
              "quantityAvailable": 40,
              "purchaseOrder": {
                "text": " ",
                "value": ""
              },
              "amount": 0,
              "active": true,
              "woVendor": true,
              "memo": ""
            }
          ],
          "assets": [
            
          ],
          "items": [
            {
              "id": "22",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "502",
              "uuid": "32091_1",
              "line": "1",
              "item": {
                "text": "VZCC-0054-HS",
                "value": "803"
              },
              "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
              "quantity": 1,
              "availableQty": 1,
              "note": ""
            },
            {
              "id": "23",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "502",
              "uuid": "32091_2",
              "line": "2",
              "item": {
                "text": "VZCE-7400-H-E",
                "value": "906"
              },
              "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
              "quantity": 2,
              "availableQty": 2,
              "note": ""
            },
            {
              "id": "24",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "502",
              "uuid": "32091_3",
              "line": "3",
              "item": {
                "text": "VZCW-0000-P-E",
                "value": "907"
              },
              "description": "Compose,Wall Mount,Fits All Heights",
              "quantity": 2,
              "availableQty": 2,
              "note": ""
            },
            {
              "id": "15",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_1",
              "line": "1",
              "item": {
                "text": "VZCC-0054-HS",
                "value": "803"
              },
              "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
              "quantity": 1,
              "availableQty": 1,
              "note": ""
            },
            {
              "id": "16",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_2",
              "line": "2",
              "item": {
                "text": "VZCE-7400-H-E",
                "value": "906"
              },
              "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "17",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_3",
              "line": "3",
              "item": {
                "text": "VZCW-0000-P-E",
                "value": "907"
              },
              "description": "Compose,Wall Mount,Fits All Heights",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "19",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_5",
              "line": "5",
              "item": {
                "text": "VZFS-1654-R-E",
                "value": "908"
              },
              "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
              "quantity": 6,
              "availableQty": 6,
              "note": ""
            },
            {
              "id": "18",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_4",
              "line": "4",
              "item": {
                "text": "VZFS-1654-R-E",
                "value": "908"
              },
              "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
              "quantity": 6,
              "availableQty": 6,
              "note": ""
            },
            {
              "id": "20",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_6",
              "line": "6",
              "item": {
                "text": "VZFS-1654-R-E234",
                "value": "1008"
              },
              "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
              "quantity": 6,
              "availableQty": 6,
              "note": ""
            },
            {
              "id": "21",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_7",
              "line": "7",
              "item": {
                "text": "VZTI-1654-FNN-E123",
                "value": "1009"
              },
              "description": "Compose,Single Tile,16In.HX54In.W,Fabric/Tackable,Std Core,No Tech",
              "quantity": 12,
              "availableQty": 12,
              "note": ""
            }
          ],
          "addresses": [
            {
              "id": "4",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "customer": {
                "text": "World Bank",
                "value": "1233"
              },
              "events": [
                "502",
                "507"
              ],
              "address": {
                "text": "3105  Doctors Drive",
                "value": "8402"
              },
              "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
              "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
            }
          ],
          "contacts": [
            {
              "id": "4",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "events": [
                "502",
                "507"
              ],
              "contact": {
                "text": "World Bank : Mei Matriano",
                "value": "2123"
              },
              "name": "Mei Matriano",
              "email": "mei@erpsuccesspartners.com",
              "jobTitle": "",
              "mobilePhone": "",
              "phone": "",
              "primary": true,
              "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
            }
          ],
          "events": [
            {
              "id": "506",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/2/2024 until 12/5/2024",
                "dates": [
                  "12/2/2024",
                  "12/5/2024"
                ],
                "start": "2024-12-02",
                "end": "2024-12-05"
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
              "url": "/app/crm/calendar/event.nl?id=506&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "4",
                "value": "4"
              },
              "address": {
                "text": "4",
                "value": "4"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "507",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
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
              "note": "",
              "url": "/app/crm/calendar/event.nl?id=507&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "4",
                "value": "4"
              },
              "address": {
                "text": "4",
                "value": "4"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "503",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/4/2024 until 12/6/2024",
                "dates": [
                  "12/4/2024",
                  "12/6/2024"
                ],
                "start": "2024-12-04",
                "end": "2024-12-06"
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
              "url": "/app/crm/calendar/event.nl?id=503&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "4",
                "value": "4"
              },
              "address": {
                "text": "4",
                "value": "4"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "502",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/16/2024 until 12/18/2024",
                "dates": [
                  "12/16/2024",
                  "12/18/2024"
                ],
                "start": "2024-12-16",
                "end": "2024-12-18"
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
              "url": "/app/crm/calendar/event.nl?id=502&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "",
                "value": ""
              },
              "address": {
                "text": "",
                "value": ""
              },
              "organizer": {
                "text": "Ann Traynor",
                "value": "141"
              }
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=2126&compid=TD2952265",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=1089&id=4&compid=TD2952265",
          "soUrl": "/app/accounting/transactions/salesord.nl?id=32092&compid=TD2952265",
          "esthours": "200"
        },
        "resources": [
          
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          
        ],
        "contacts": [
          
        ],
        "addresses": [
          
        ],
        "contact": {
          "text": "4",
          "value": "4"
        },
        "address": {
          "text": "4",
          "value": "4"
        },
        "organizer": {
          "text": "Kathryn Glass",
          "value": "-5"
        }
      },
      {
        "id": "507",
        "title": "Furniture Installation",
        "workorder": {
          "text": "Furniture Installation",
          "value": "4"
        },
        "location": "",
        "status": {
          "text": "Tentative",
          "value": "TENTATIVE",
          "code": "bg-secondary"
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
        "note": "",
        "url": "/app/crm/calendar/event.nl?id=507&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          "id": "4",
          "name": "Furniture Installation",
          "title": "Furniture Installation",
          "project": {
            "text": "World Bank : World Bank Flooring Installation",
            "value": "2126"
          },
          "date": "12/4/2024",
          "status": {
            "text": "In Progress",
            "value": "1",
            "code": "#026adf"
          },
          "type": {
            "text": "Service",
            "value": "2"
          },
          "memo": "<p>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</p><p>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</p><p>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</p><p>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</p><p>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</p><p>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</p><p>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</p><p>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</p><p>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</p><p>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</p>",
          "salesorder": {
            "text": "Sales Order #SO3278",
            "value": "32092"
          },
          "customer": {
            "text": "World Bank",
            "value": "1233"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": [
            
          ],
          "vendors": [
            {
              "id": "2",
              "name": "2",
              "vendor": {
                "text": "Bedline",
                "value": "1133"
              },
              "url": "http://www.@Bedline.com",
              "email": "info@Bedline.com",
              "initials": "B",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "event": "502",
              "quantityRequired": 1,
              "quantityAvailable": 50,
              "purchaseOrder": {
                "text": " ",
                "value": ""
              },
              "amount": 0,
              "active": true,
              "woVendor": true,
              "memo": ""
            },
            {
              "id": "3",
              "name": "3",
              "vendor": {
                "text": "Betty Black, Inc.",
                "value": "1137"
              },
              "url": "http://www.@BettyBlack,Inc.com",
              "email": "info@BettyBlackInc.com",
              "initials": "BB",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "event": "502",
              "quantityRequired": 1,
              "quantityAvailable": 40,
              "purchaseOrder": {
                "text": " ",
                "value": ""
              },
              "amount": 0,
              "active": true,
              "woVendor": true,
              "memo": ""
            }
          ],
          "assets": [
            
          ],
          "items": [
            {
              "id": "22",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "502",
              "uuid": "32091_1",
              "line": "1",
              "item": {
                "text": "VZCC-0054-HS",
                "value": "803"
              },
              "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
              "quantity": 1,
              "availableQty": 1,
              "note": ""
            },
            {
              "id": "23",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "502",
              "uuid": "32091_2",
              "line": "2",
              "item": {
                "text": "VZCE-7400-H-E",
                "value": "906"
              },
              "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
              "quantity": 2,
              "availableQty": 2,
              "note": ""
            },
            {
              "id": "24",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "502",
              "uuid": "32091_3",
              "line": "3",
              "item": {
                "text": "VZCW-0000-P-E",
                "value": "907"
              },
              "description": "Compose,Wall Mount,Fits All Heights",
              "quantity": 2,
              "availableQty": 2,
              "note": ""
            },
            {
              "id": "15",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_1",
              "line": "1",
              "item": {
                "text": "VZCC-0054-HS",
                "value": "803"
              },
              "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
              "quantity": 1,
              "availableQty": 1,
              "note": ""
            },
            {
              "id": "16",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_2",
              "line": "2",
              "item": {
                "text": "VZCE-7400-H-E",
                "value": "906"
              },
              "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "17",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_3",
              "line": "3",
              "item": {
                "text": "VZCW-0000-P-E",
                "value": "907"
              },
              "description": "Compose,Wall Mount,Fits All Heights",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "19",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_5",
              "line": "5",
              "item": {
                "text": "VZFS-1654-R-E",
                "value": "908"
              },
              "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
              "quantity": 6,
              "availableQty": 6,
              "note": ""
            },
            {
              "id": "18",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_4",
              "line": "4",
              "item": {
                "text": "VZFS-1654-R-E",
                "value": "908"
              },
              "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
              "quantity": 6,
              "availableQty": 6,
              "note": ""
            },
            {
              "id": "20",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_6",
              "line": "6",
              "item": {
                "text": "VZFS-1654-R-E234",
                "value": "1008"
              },
              "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
              "quantity": 6,
              "availableQty": 6,
              "note": ""
            },
            {
              "id": "21",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_7",
              "line": "7",
              "item": {
                "text": "VZTI-1654-FNN-E123",
                "value": "1009"
              },
              "description": "Compose,Single Tile,16In.HX54In.W,Fabric/Tackable,Std Core,No Tech",
              "quantity": 12,
              "availableQty": 12,
              "note": ""
            }
          ],
          "addresses": [
            {
              "id": "4",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "customer": {
                "text": "World Bank",
                "value": "1233"
              },
              "events": [
                "502",
                "507"
              ],
              "address": {
                "text": "3105  Doctors Drive",
                "value": "8402"
              },
              "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
              "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
            }
          ],
          "contacts": [
            {
              "id": "4",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "events": [
                "502",
                "507"
              ],
              "contact": {
                "text": "World Bank : Mei Matriano",
                "value": "2123"
              },
              "name": "Mei Matriano",
              "email": "mei@erpsuccesspartners.com",
              "jobTitle": "",
              "mobilePhone": "",
              "phone": "",
              "primary": true,
              "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
            }
          ],
          "events": [
            {
              "id": "506",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/2/2024 until 12/5/2024",
                "dates": [
                  "12/2/2024",
                  "12/5/2024"
                ],
                "start": "2024-12-02",
                "end": "2024-12-05"
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
              "url": "/app/crm/calendar/event.nl?id=506&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "4",
                "value": "4"
              },
              "address": {
                "text": "4",
                "value": "4"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "507",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
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
              "note": "",
              "url": "/app/crm/calendar/event.nl?id=507&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "4",
                "value": "4"
              },
              "address": {
                "text": "4",
                "value": "4"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "503",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/4/2024 until 12/6/2024",
                "dates": [
                  "12/4/2024",
                  "12/6/2024"
                ],
                "start": "2024-12-04",
                "end": "2024-12-06"
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
              "url": "/app/crm/calendar/event.nl?id=503&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "4",
                "value": "4"
              },
              "address": {
                "text": "4",
                "value": "4"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "502",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/16/2024 until 12/18/2024",
                "dates": [
                  "12/16/2024",
                  "12/18/2024"
                ],
                "start": "2024-12-16",
                "end": "2024-12-18"
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
              "url": "/app/crm/calendar/event.nl?id=502&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "",
                "value": ""
              },
              "address": {
                "text": "",
                "value": ""
              },
              "organizer": {
                "text": "Ann Traynor",
                "value": "141"
              }
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=2126&compid=TD2952265",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=1089&id=4&compid=TD2952265",
          "soUrl": "/app/accounting/transactions/salesord.nl?id=32092&compid=TD2952265",
          "esthours": "200"
        },
        "resources": [
          
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          
        ],
        "contacts": [
          {
            "id": "4",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "events": [
              "502",
              "507"
            ],
            "contact": {
              "text": "World Bank : Mei Matriano",
              "value": "2123"
            },
            "name": "Mei Matriano",
            "email": "mei@erpsuccesspartners.com",
            "jobTitle": "",
            "mobilePhone": "",
            "phone": "",
            "primary": true,
            "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265",
            "selected": true
          }
        ],
        "addresses": [
          {
            "id": "4",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "customer": {
              "text": "World Bank",
              "value": "1233"
            },
            "events": [
              "502",
              "507"
            ],
            "address": {
              "text": "3105  Doctors Drive",
              "value": "8402"
            },
            "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265",
            "selected": true
          }
        ],
        "contact": {
          "text": "4",
          "value": "4"
        },
        "address": {
          "text": "4",
          "value": "4"
        },
        "organizer": {
          "text": "Kathryn Glass",
          "value": "-5"
        }
      },
      {
        "id": "498",
        "title": "Furniture Installation",
        "workorder": {
          "text": "Furniture Installation",
          "value": "1"
        },
        "location": "",
        "status": {
          "text": "Tentative",
          "value": "TENTATIVE",
          "code": "bg-secondary"
        },
        "date": {
          "recurrence": "one time event on 12/3/2024",
          "dates": [
            "12/3/2024"
          ],
          "start": "2024-12-03",
          "end": "2024-12-03"
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
        "note": "TEST\n111",
        "url": "/app/crm/calendar/event.nl?id=498&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          "id": "1",
          "name": "Furniture Installation",
          "title": "Furniture Installation",
          "project": {
            "text": "World Bank : World Bank Furniture Installation",
            "value": "2122"
          },
          "date": "12/3/2024",
          "status": {
            "text": "Not Started",
            "value": "4",
            "code": "#026adf"
          },
          "type": {
            "text": "Service",
            "value": "2"
          },
          "memo": "<p><strong>Furniture Installation</strong></p>",
          "salesorder": {
            "text": "Sales Order #SO3277",
            "value": "32090"
          },
          "customer": {
            "text": "World Bank",
            "value": "1233"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": [
            
          ],
          "vendors": [
            
          ],
          "assets": [
            
          ],
          "items": [
            {
              "id": "4",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "497",
              "uuid": "32090_1",
              "line": "1",
              "item": {
                "text": "VZCC-0054-HSS1",
                "value": "503"
              },
              "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
              "quantity": 1,
              "availableQty": 1,
              "note": ""
            },
            {
              "id": "1",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_1",
              "line": "1",
              "item": {
                "text": "VZCC-0054-HSS1",
                "value": "503"
              },
              "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
              "quantity": 1,
              "availableQty": 1,
              "note": ""
            },
            {
              "id": "5",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "498",
              "uuid": "32090_1",
              "line": "1",
              "item": {
                "text": "VZCC-0054-HSS1",
                "value": "503"
              },
              "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
              "quantity": 1,
              "availableQty": 1,
              "note": ""
            },
            {
              "id": "2",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_2",
              "line": "2",
              "item": {
                "text": "VZCE-7400-HS1",
                "value": "504"
              },
              "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "3",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_3",
              "line": "3",
              "item": {
                "text": "VZCW-0000-PS1S1",
                "value": "505"
              },
              "description": "Compose,Wall Mount,Fits All Heights",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            }
          ],
          "addresses": [
            {
              "id": "1",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "customer": {
                "text": "World Bank",
                "value": "1233"
              },
              "events": [
                "497",
                "498"
              ],
              "address": {
                "text": "3105  Doctors Drive",
                "value": "8402"
              },
              "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
              "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
            }
          ],
          "contacts": [
            {
              "id": "1",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "events": [
                "497",
                "498"
              ],
              "contact": {
                "text": "World Bank : Mei Matriano",
                "value": "2123"
              },
              "name": "Mei Matriano",
              "email": "mei@erpsuccesspartners.com",
              "jobTitle": "",
              "mobilePhone": "",
              "phone": "",
              "primary": true,
              "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
            }
          ],
          "events": [
            {
              "id": "498",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "one time event on 12/3/2024",
                "dates": [
                  "12/3/2024"
                ],
                "start": "2024-12-03",
                "end": "2024-12-03"
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
              "note": "TEST\n111",
              "url": "/app/crm/calendar/event.nl?id=498&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "1",
                "value": "1"
              },
              "address": {
                "text": "1",
                "value": "1"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "497",
              "title": "Deliver Chairs",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "location": "",
              "status": {
                "text": "Confirmed",
                "value": "CONFIRMED",
                "code": "bg-success"
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
                "start": "08:00",
                "end": "18:00"
              },
              "priority": {
                "text": "High",
                "value": "3",
                "code": "#ca6621"
              },
              "note": "Deliver Chairs",
              "url": "/app/crm/calendar/event.nl?id=497&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "",
                "value": ""
              },
              "address": {
                "text": "",
                "value": ""
              },
              "organizer": {
                "text": "Carol Morgan",
                "value": "149"
              }
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=2122&compid=TD2952265",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=1089&id=1&compid=TD2952265",
          "soUrl": "/app/accounting/transactions/salesord.nl?id=32090&compid=TD2952265",
          "esthours": "80"
        },
        "resources": [
          {
            "id": "3",
            "name": "Ann Traynor",
            "initials": "AT",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 229-3342",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "events": [
              "498"
            ],
            "employee": {
              "text": "Ann Traynor",
              "value": "141"
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
            "subTypes": [
              
            ],
            "rate": 50,
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
            "selected": true
          }
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          {
            "id": "5",
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "498",
            "uuid": "32090_1",
            "line": "1",
            "item": {
              "text": "VZCC-0054-HSS1",
              "value": "503"
            },
            "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
            "quantity": 1,
            "availableQty": 1,
            "note": "",
            "selected": true
          }
        ],
        "contacts": [
          {
            "id": "1",
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "events": [
              "497",
              "498"
            ],
            "contact": {
              "text": "World Bank : Mei Matriano",
              "value": "2123"
            },
            "name": "Mei Matriano",
            "email": "mei@erpsuccesspartners.com",
            "jobTitle": "",
            "mobilePhone": "",
            "phone": "",
            "primary": true,
            "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265",
            "selected": true
          }
        ],
        "addresses": [
          {
            "id": "1",
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "customer": {
              "text": "World Bank",
              "value": "1233"
            },
            "events": [
              "497",
              "498"
            ],
            "address": {
              "text": "3105  Doctors Drive",
              "value": "8402"
            },
            "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265",
            "selected": true
          }
        ],
        "contact": {
          "text": "1",
          "value": "1"
        },
        "address": {
          "text": "1",
          "value": "1"
        },
        "organizer": {
          "text": "Kathryn Glass",
          "value": "-5"
        }
      },
      {
        "id": "499",
        "title": "Furniture Installation",
        "workorder": {
          "text": "Furniture Installation",
          "value": "2"
        },
        "location": "",
        "status": {
          "text": "Tentative",
          "value": "TENTATIVE",
          "code": "bg-secondary"
        },
        "date": {
          "recurrence": "occurs every day from 12/3/2024 until 12/31/2024",
          "dates": [
            "12/3/2024",
            "12/31/2024"
          ],
          "start": "2024-12-03",
          "end": "2024-12-31"
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
        "url": "/app/crm/calendar/event.nl?id=499&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          "id": "2",
          "name": "Furniture Installation",
          "title": "Furniture Installation",
          "project": {
            "text": "World Bank : World Bank Furniture Installation",
            "value": "2122"
          },
          "date": "12/3/2024",
          "status": {
            "text": "Not Started",
            "value": "4",
            "code": "#026adf"
          },
          "type": {
            "text": "Service",
            "value": "2"
          },
          "memo": "<p>Furniture Installation</p>",
          "salesorder": {
            "text": "Sales Order #SO3277",
            "value": "32090"
          },
          "customer": {
            "text": "World Bank",
            "value": "1233"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": [
            
          ],
          "vendors": [
            
          ],
          "assets": [
            
          ],
          "items": [
            {
              "id": "10",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "499",
              "uuid": "32090_4",
              "line": "4",
              "item": {
                "text": "VZFS-1654-RS1",
                "value": "506"
              },
              "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
              "quantity": 2,
              "availableQty": 2,
              "note": ""
            },
            {
              "id": "9",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "499",
              "uuid": "32090_6",
              "line": "6",
              "item": {
                "text": "J2HB-5124-SS1RS1",
                "value": "508"
              },
              "description": "X Series PST,HngdDr,51.5Hx24Wx24D,B/B/F,Valet,RH,PtdDwr,Ptd/StlDr,Ellipse Pull,Reg Top,Glide",
              "quantity": 2,
              "availableQty": 2,
              "note": ""
            },
            {
              "id": "8",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_6",
              "line": "6",
              "item": {
                "text": "J2HB-5124-SS1RS1",
                "value": "508"
              },
              "description": "X Series PST,HngdDr,51.5Hx24Wx24D,B/B/F,Valet,RH,PtdDwr,Ptd/StlDr,Ellipse Pull,Reg Top,Glide",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "6",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_4",
              "line": "4",
              "item": {
                "text": "VZFS-1654-RS1",
                "value": "506"
              },
              "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
              "quantity": 6,
              "availableQty": 6,
              "note": ""
            },
            {
              "id": "7",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_5",
              "line": "5",
              "item": {
                "text": "VZTI-1654-FNNS1",
                "value": "507"
              },
              "description": "Compose,Single Tile,16In.HX54In.W,Fabric/Tackable,Std Core,No Tech",
              "quantity": 12,
              "availableQty": 12,
              "note": ""
            }
          ],
          "addresses": [
            {
              "id": "2",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "customer": {
                "text": "World Bank",
                "value": "1233"
              },
              "events": [
                "499",
                "500"
              ],
              "address": {
                "text": "3105  Doctors Drive",
                "value": "8402"
              },
              "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
              "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
            }
          ],
          "contacts": [
            {
              "id": "2",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "events": [
                "499",
                "500"
              ],
              "contact": {
                "text": "World Bank : Mei Matriano",
                "value": "2123"
              },
              "name": "Mei Matriano",
              "email": "mei@erpsuccesspartners.com",
              "jobTitle": "",
              "mobilePhone": "",
              "phone": "",
              "primary": true,
              "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
            }
          ],
          "events": [
            {
              "id": "500",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "one time event on 12/1/2024",
                "dates": [
                  "12/1/2024"
                ],
                "start": "2024-12-01",
                "end": "2024-12-01"
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
              "url": "/app/crm/calendar/event.nl?id=500&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "2",
                "value": "2"
              },
              "address": {
                "text": "2",
                "value": "2"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "499",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "2"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/3/2024 until 12/31/2024",
                "dates": [
                  "12/3/2024",
                  "12/31/2024"
                ],
                "start": "2024-12-03",
                "end": "2024-12-31"
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
              "url": "/app/crm/calendar/event.nl?id=499&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "",
                "value": ""
              },
              "address": {
                "text": "",
                "value": ""
              },
              "organizer": {
                "text": "Ann Traynor",
                "value": "141"
              }
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=2122&compid=TD2952265",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=1089&id=2&compid=TD2952265",
          "soUrl": "/app/accounting/transactions/salesord.nl?id=32090&compid=TD2952265",
          "esthours": "200"
        },
        "resources": [
          {
            "id": "4",
            "name": "Will Clark",
            "initials": "WC",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 003-5347",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "events": [
              "499"
            ],
            "employee": {
              "text": "Will Clark",
              "value": "158"
            },
            "resourceGroups": [
              {
                "text": "Driver",
                "value": "2"
              }
            ],
            "types": [
              {
                "text": "Delivery Driver",
                "value": "2"
              }
            ],
            "subTypes": [
              
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
            "selected": true
          },
          {
            "id": "5",
            "name": "Conner Avery",
            "initials": "CA",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 740-4045",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "events": [
              "499"
            ],
            "employee": {
              "text": "Conner Avery",
              "value": "142"
            },
            "resourceGroups": [
              {
                "text": "Installers",
                "value": "1"
              }
            ],
            "types": [
              {
                "text": "Foreman",
                "value": "4"
              }
            ],
            "subTypes": [
              
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
              "text": "Crew Enhancement",
              "value": "3"
            },
            "selected": true
          },
          {
            "id": "6",
            "name": "Joel Williams",
            "initials": "JW",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 464-4606",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "events": [
              "499"
            ],
            "employee": {
              "text": "Joel Williams",
              "value": "157"
            },
            "resourceGroups": [
              {
                "text": "Driver",
                "value": "2"
              }
            ],
            "types": [
              {
                "text": "Delivery Driver",
                "value": "2"
              }
            ],
            "subTypes": [
              
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
              "text": "Crew Enhancement",
              "value": "3"
            },
            "selected": true
          }
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          {
            "id": "10",
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "499",
            "uuid": "32090_4",
            "line": "4",
            "item": {
              "text": "VZFS-1654-RS1",
              "value": "506"
            },
            "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
            "quantity": 2,
            "availableQty": 2,
            "note": "",
            "selected": true
          },
          {
            "id": "9",
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "499",
            "uuid": "32090_6",
            "line": "6",
            "item": {
              "text": "J2HB-5124-SS1RS1",
              "value": "508"
            },
            "description": "X Series PST,HngdDr,51.5Hx24Wx24D,B/B/F,Valet,RH,PtdDwr,Ptd/StlDr,Ellipse Pull,Reg Top,Glide",
            "quantity": 2,
            "availableQty": 2,
            "note": "",
            "selected": true
          }
        ],
        "contacts": [
          {
            "id": "2",
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "events": [
              "499",
              "500"
            ],
            "contact": {
              "text": "World Bank : Mei Matriano",
              "value": "2123"
            },
            "name": "Mei Matriano",
            "email": "mei@erpsuccesspartners.com",
            "jobTitle": "",
            "mobilePhone": "",
            "phone": "",
            "primary": true,
            "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265",
            "selected": true
          }
        ],
        "addresses": [
          {
            "id": "2",
            "workorder": {
              "text": "Furniture Installation",
              "value": "2"
            },
            "customer": {
              "text": "World Bank",
              "value": "1233"
            },
            "events": [
              "499",
              "500"
            ],
            "address": {
              "text": "3105  Doctors Drive",
              "value": "8402"
            },
            "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265",
            "selected": true
          }
        ],
        "contact": {
          "text": "",
          "value": ""
        },
        "address": {
          "text": "",
          "value": ""
        },
        "organizer": {
          "text": "Ann Traynor",
          "value": "141"
        }
      },
      {
        "id": "503",
        "title": "Furniture Installation",
        "workorder": {
          "text": "Furniture Installation",
          "value": "4"
        },
        "location": "",
        "status": {
          "text": "Tentative",
          "value": "TENTATIVE",
          "code": "bg-secondary"
        },
        "date": {
          "recurrence": "occurs every day from 12/4/2024 until 12/6/2024",
          "dates": [
            "12/4/2024",
            "12/6/2024"
          ],
          "start": "2024-12-04",
          "end": "2024-12-06"
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
        "url": "/app/crm/calendar/event.nl?id=503&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          "id": "4",
          "name": "Furniture Installation",
          "title": "Furniture Installation",
          "project": {
            "text": "World Bank : World Bank Flooring Installation",
            "value": "2126"
          },
          "date": "12/4/2024",
          "status": {
            "text": "In Progress",
            "value": "1",
            "code": "#026adf"
          },
          "type": {
            "text": "Service",
            "value": "2"
          },
          "memo": "<p>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</p><p>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</p><p>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</p><p>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</p><p>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</p><p>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</p><p>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</p><p>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</p><p>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</p><p>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</p>",
          "salesorder": {
            "text": "Sales Order #SO3278",
            "value": "32092"
          },
          "customer": {
            "text": "World Bank",
            "value": "1233"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": [
            
          ],
          "vendors": [
            {
              "id": "2",
              "name": "2",
              "vendor": {
                "text": "Bedline",
                "value": "1133"
              },
              "url": "http://www.@Bedline.com",
              "email": "info@Bedline.com",
              "initials": "B",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "event": "502",
              "quantityRequired": 1,
              "quantityAvailable": 50,
              "purchaseOrder": {
                "text": " ",
                "value": ""
              },
              "amount": 0,
              "active": true,
              "woVendor": true,
              "memo": ""
            },
            {
              "id": "3",
              "name": "3",
              "vendor": {
                "text": "Betty Black, Inc.",
                "value": "1137"
              },
              "url": "http://www.@BettyBlack,Inc.com",
              "email": "info@BettyBlackInc.com",
              "initials": "BB",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "event": "502",
              "quantityRequired": 1,
              "quantityAvailable": 40,
              "purchaseOrder": {
                "text": " ",
                "value": ""
              },
              "amount": 0,
              "active": true,
              "woVendor": true,
              "memo": ""
            }
          ],
          "assets": [
            
          ],
          "items": [
            {
              "id": "22",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "502",
              "uuid": "32091_1",
              "line": "1",
              "item": {
                "text": "VZCC-0054-HS",
                "value": "803"
              },
              "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
              "quantity": 1,
              "availableQty": 1,
              "note": ""
            },
            {
              "id": "23",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "502",
              "uuid": "32091_2",
              "line": "2",
              "item": {
                "text": "VZCE-7400-H-E",
                "value": "906"
              },
              "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
              "quantity": 2,
              "availableQty": 2,
              "note": ""
            },
            {
              "id": "24",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "502",
              "uuid": "32091_3",
              "line": "3",
              "item": {
                "text": "VZCW-0000-P-E",
                "value": "907"
              },
              "description": "Compose,Wall Mount,Fits All Heights",
              "quantity": 2,
              "availableQty": 2,
              "note": ""
            },
            {
              "id": "15",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_1",
              "line": "1",
              "item": {
                "text": "VZCC-0054-HS",
                "value": "803"
              },
              "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
              "quantity": 1,
              "availableQty": 1,
              "note": ""
            },
            {
              "id": "16",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_2",
              "line": "2",
              "item": {
                "text": "VZCE-7400-H-E",
                "value": "906"
              },
              "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "17",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_3",
              "line": "3",
              "item": {
                "text": "VZCW-0000-P-E",
                "value": "907"
              },
              "description": "Compose,Wall Mount,Fits All Heights",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "19",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_5",
              "line": "5",
              "item": {
                "text": "VZFS-1654-R-E",
                "value": "908"
              },
              "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
              "quantity": 6,
              "availableQty": 6,
              "note": ""
            },
            {
              "id": "18",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_4",
              "line": "4",
              "item": {
                "text": "VZFS-1654-R-E",
                "value": "908"
              },
              "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
              "quantity": 6,
              "availableQty": 6,
              "note": ""
            },
            {
              "id": "20",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_6",
              "line": "6",
              "item": {
                "text": "VZFS-1654-R-E234",
                "value": "1008"
              },
              "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
              "quantity": 6,
              "availableQty": 6,
              "note": ""
            },
            {
              "id": "21",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_7",
              "line": "7",
              "item": {
                "text": "VZTI-1654-FNN-E123",
                "value": "1009"
              },
              "description": "Compose,Single Tile,16In.HX54In.W,Fabric/Tackable,Std Core,No Tech",
              "quantity": 12,
              "availableQty": 12,
              "note": ""
            }
          ],
          "addresses": [
            {
              "id": "4",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "customer": {
                "text": "World Bank",
                "value": "1233"
              },
              "events": [
                "502",
                "507"
              ],
              "address": {
                "text": "3105  Doctors Drive",
                "value": "8402"
              },
              "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
              "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
            }
          ],
          "contacts": [
            {
              "id": "4",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "events": [
                "502",
                "507"
              ],
              "contact": {
                "text": "World Bank : Mei Matriano",
                "value": "2123"
              },
              "name": "Mei Matriano",
              "email": "mei@erpsuccesspartners.com",
              "jobTitle": "",
              "mobilePhone": "",
              "phone": "",
              "primary": true,
              "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
            }
          ],
          "events": [
            {
              "id": "506",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/2/2024 until 12/5/2024",
                "dates": [
                  "12/2/2024",
                  "12/5/2024"
                ],
                "start": "2024-12-02",
                "end": "2024-12-05"
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
              "url": "/app/crm/calendar/event.nl?id=506&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "4",
                "value": "4"
              },
              "address": {
                "text": "4",
                "value": "4"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "507",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
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
              "note": "",
              "url": "/app/crm/calendar/event.nl?id=507&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "4",
                "value": "4"
              },
              "address": {
                "text": "4",
                "value": "4"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "503",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/4/2024 until 12/6/2024",
                "dates": [
                  "12/4/2024",
                  "12/6/2024"
                ],
                "start": "2024-12-04",
                "end": "2024-12-06"
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
              "url": "/app/crm/calendar/event.nl?id=503&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "4",
                "value": "4"
              },
              "address": {
                "text": "4",
                "value": "4"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "502",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/16/2024 until 12/18/2024",
                "dates": [
                  "12/16/2024",
                  "12/18/2024"
                ],
                "start": "2024-12-16",
                "end": "2024-12-18"
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
              "url": "/app/crm/calendar/event.nl?id=502&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "",
                "value": ""
              },
              "address": {
                "text": "",
                "value": ""
              },
              "organizer": {
                "text": "Ann Traynor",
                "value": "141"
              }
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=2126&compid=TD2952265",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=1089&id=4&compid=TD2952265",
          "soUrl": "/app/accounting/transactions/salesord.nl?id=32092&compid=TD2952265",
          "esthours": "200"
        },
        "resources": [
          {
            "id": "16",
            "name": "Abby Kwan",
            "initials": "AK",
            "email": "demo+emblm1@erpsuccesspartners.com",
            "phone": "(650) 823-8637",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "events": [
              "503"
            ],
            "employee": {
              "text": "Abby Kwan",
              "value": "148"
            },
            "resourceGroups": [
              {
                "text": "Designer",
                "value": "3"
              }
            ],
            "types": [
              
            ],
            "subTypes": [
              
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
            "selected": true
          },
          {
            "id": "17",
            "name": "Ann Traynor",
            "initials": "AT",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 229-3342",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "events": [
              "503"
            ],
            "employee": {
              "text": "Ann Traynor",
              "value": "141"
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
            "subTypes": [
              
            ],
            "rate": 50,
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
            "selected": true
          },
          {
            "id": "18",
            "name": "Carol Morgan",
            "initials": "CM",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 316-3424",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "events": [
              "503"
            ],
            "employee": {
              "text": "Carol Morgan",
              "value": "149"
            },
            "resourceGroups": [
              {
                "text": "Driver",
                "value": "2"
              },
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
            "subTypes": [
              
            ],
            "rate": 50,
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
            "selected": true
          },
          {
            "id": "19",
            "name": "Dean Nolan",
            "initials": "DN",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 357-4845",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "events": [
              "503"
            ],
            "employee": {
              "text": "Dean Nolan",
              "value": "150"
            },
            "resourceGroups": [
              {
                "text": "Designer",
                "value": "3"
              },
              {
                "text": "Driver",
                "value": "2"
              },
              {
                "text": "Installers",
                "value": "1"
              }
            ],
            "types": [
              
            ],
            "subTypes": [
              
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
            "selected": true
          }
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          
        ],
        "contacts": [
          
        ],
        "addresses": [
          
        ],
        "contact": {
          "text": "4",
          "value": "4"
        },
        "address": {
          "text": "4",
          "value": "4"
        },
        "organizer": {
          "text": "Kathryn Glass",
          "value": "-5"
        }
      },
      {
        "id": "497",
        "title": "Deliver Chairs",
        "workorder": {
          "text": "Furniture Installation",
          "value": "1"
        },
        "location": "",
        "status": {
          "text": "Confirmed",
          "value": "CONFIRMED",
          "code": "bg-success"
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
          "start": "08:00",
          "end": "18:00"
        },
        "priority": {
          "text": "High",
          "value": "3",
          "code": "#ca6621"
        },
        "note": "Deliver Chairs",
        "url": "/app/crm/calendar/event.nl?id=497&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          "id": "1",
          "name": "Furniture Installation",
          "title": "Furniture Installation",
          "project": {
            "text": "World Bank : World Bank Furniture Installation",
            "value": "2122"
          },
          "date": "12/3/2024",
          "status": {
            "text": "Not Started",
            "value": "4",
            "code": "#026adf"
          },
          "type": {
            "text": "Service",
            "value": "2"
          },
          "memo": "<p><strong>Furniture Installation</strong></p>",
          "salesorder": {
            "text": "Sales Order #SO3277",
            "value": "32090"
          },
          "customer": {
            "text": "World Bank",
            "value": "1233"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": [
            
          ],
          "vendors": [
            
          ],
          "assets": [
            
          ],
          "items": [
            {
              "id": "4",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "497",
              "uuid": "32090_1",
              "line": "1",
              "item": {
                "text": "VZCC-0054-HSS1",
                "value": "503"
              },
              "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
              "quantity": 1,
              "availableQty": 1,
              "note": ""
            },
            {
              "id": "1",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_1",
              "line": "1",
              "item": {
                "text": "VZCC-0054-HSS1",
                "value": "503"
              },
              "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
              "quantity": 1,
              "availableQty": 1,
              "note": ""
            },
            {
              "id": "5",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "498",
              "uuid": "32090_1",
              "line": "1",
              "item": {
                "text": "VZCC-0054-HSS1",
                "value": "503"
              },
              "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
              "quantity": 1,
              "availableQty": 1,
              "note": ""
            },
            {
              "id": "2",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_2",
              "line": "2",
              "item": {
                "text": "VZCE-7400-HS1",
                "value": "504"
              },
              "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "3",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_3",
              "line": "3",
              "item": {
                "text": "VZCW-0000-PS1S1",
                "value": "505"
              },
              "description": "Compose,Wall Mount,Fits All Heights",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            }
          ],
          "addresses": [
            {
              "id": "1",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "customer": {
                "text": "World Bank",
                "value": "1233"
              },
              "events": [
                "497",
                "498"
              ],
              "address": {
                "text": "3105  Doctors Drive",
                "value": "8402"
              },
              "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
              "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
            }
          ],
          "contacts": [
            {
              "id": "1",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "events": [
                "497",
                "498"
              ],
              "contact": {
                "text": "World Bank : Mei Matriano",
                "value": "2123"
              },
              "name": "Mei Matriano",
              "email": "mei@erpsuccesspartners.com",
              "jobTitle": "",
              "mobilePhone": "",
              "phone": "",
              "primary": true,
              "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
            }
          ],
          "events": [
            {
              "id": "498",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "one time event on 12/3/2024",
                "dates": [
                  "12/3/2024"
                ],
                "start": "2024-12-03",
                "end": "2024-12-03"
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
              "note": "TEST\n111",
              "url": "/app/crm/calendar/event.nl?id=498&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "1",
                "value": "1"
              },
              "address": {
                "text": "1",
                "value": "1"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "497",
              "title": "Deliver Chairs",
              "workorder": {
                "text": "Furniture Installation",
                "value": "1"
              },
              "location": "",
              "status": {
                "text": "Confirmed",
                "value": "CONFIRMED",
                "code": "bg-success"
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
                "start": "08:00",
                "end": "18:00"
              },
              "priority": {
                "text": "High",
                "value": "3",
                "code": "#ca6621"
              },
              "note": "Deliver Chairs",
              "url": "/app/crm/calendar/event.nl?id=497&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "",
                "value": ""
              },
              "address": {
                "text": "",
                "value": ""
              },
              "organizer": {
                "text": "Carol Morgan",
                "value": "149"
              }
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=2122&compid=TD2952265",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=1089&id=1&compid=TD2952265",
          "soUrl": "/app/accounting/transactions/salesord.nl?id=32090&compid=TD2952265",
          "esthours": "80"
        },
        "resources": [
          {
            "id": "1",
            "name": "Will Clark",
            "initials": "WC",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 003-5347",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "events": [
              "497"
            ],
            "employee": {
              "text": "Will Clark",
              "value": "158"
            },
            "resourceGroups": [
              {
                "text": "Driver",
                "value": "2"
              }
            ],
            "types": [
              {
                "text": "Delivery Driver",
                "value": "2"
              }
            ],
            "subTypes": [
              
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
            "selected": true
          },
          {
            "id": "2",
            "name": "Conner Avery",
            "initials": "CA",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 740-4045",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "events": [
              "497"
            ],
            "employee": {
              "text": "Conner Avery",
              "value": "142"
            },
            "resourceGroups": [
              {
                "text": "Installers",
                "value": "1"
              }
            ],
            "types": [
              {
                "text": "Foreman",
                "value": "4"
              }
            ],
            "subTypes": [
              
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
              "text": "Crew Enhancement",
              "value": "3"
            },
            "selected": true
          }
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          {
            "id": "4",
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "497",
            "uuid": "32090_1",
            "line": "1",
            "item": {
              "text": "VZCC-0054-HSS1",
              "value": "503"
            },
            "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
            "quantity": 1,
            "availableQty": 1,
            "note": "",
            "selected": true
          }
        ],
        "contacts": [
          {
            "id": "1",
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "events": [
              "497",
              "498"
            ],
            "contact": {
              "text": "World Bank : Mei Matriano",
              "value": "2123"
            },
            "name": "Mei Matriano",
            "email": "mei@erpsuccesspartners.com",
            "jobTitle": "",
            "mobilePhone": "",
            "phone": "",
            "primary": true,
            "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265",
            "selected": true
          }
        ],
        "addresses": [
          {
            "id": "1",
            "workorder": {
              "text": "Furniture Installation",
              "value": "1"
            },
            "customer": {
              "text": "World Bank",
              "value": "1233"
            },
            "events": [
              "497",
              "498"
            ],
            "address": {
              "text": "3105  Doctors Drive",
              "value": "8402"
            },
            "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265",
            "selected": true
          }
        ],
        "contact": {
          "text": "",
          "value": ""
        },
        "address": {
          "text": "",
          "value": ""
        },
        "organizer": {
          "text": "Carol Morgan",
          "value": "149"
        }
      },
      {
        "id": "504",
        "title": "Work Order Event Test",
        "workorder": {
          "text": "Work Order Test",
          "value": "5"
        },
        "location": "",
        "status": {
          "text": "Tentative",
          "value": "TENTATIVE",
          "code": "bg-secondary"
        },
        "date": {
          "recurrence": "occurs every day from 12/5/2024 until 12/6/2024",
          "dates": [
            "12/5/2024",
            "12/6/2024"
          ],
          "start": "2024-12-05",
          "end": "2024-12-06"
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
        "note": "Work Order Event Test",
        "url": "/app/crm/calendar/event.nl?id=504&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          "id": "5",
          "name": "Work Order Test",
          "title": "Work Order Test",
          "project": {
            "text": "World Bank : World Bank Furniture Installation",
            "value": "2122"
          },
          "date": "12/4/2024",
          "status": {
            "text": "Not Started",
            "value": "4",
            "code": "#026adf"
          },
          "type": {
            "text": "Service",
            "value": "2"
          },
          "memo": "<p><strong>Work Order Test</strong></p>",
          "salesorder": {
            "text": "Sales Order #SO3277",
            "value": "32090"
          },
          "customer": {
            "text": "World Bank",
            "value": "1233"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": [
            
          ],
          "vendors": [
            
          ],
          "assets": [
            
          ],
          "items": [
            {
              "id": "27",
              "workorder": {
                "text": "Work Order Test",
                "value": "5"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "504",
              "uuid": "32090_7",
              "line": "7",
              "item": {
                "text": "JCTB-24S1",
                "value": "509"
              },
              "description": "X Series,Pedestal,Cushion Top Kit, 24\"D",
              "quantity": 1,
              "availableQty": 1,
              "note": ""
            },
            {
              "id": "25",
              "workorder": {
                "text": "Work Order Test",
                "value": "5"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_7",
              "line": "7",
              "item": {
                "text": "JCTB-24S1",
                "value": "509"
              },
              "description": "X Series,Pedestal,Cushion Top Kit, 24\"D",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "26",
              "workorder": {
                "text": "Work Order Test",
                "value": "5"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_8",
              "line": "8",
              "item": {
                "text": "JPMA-24-S1CS1",
                "value": "510"
              },
              "description": "X Series,Pedestal,Mobile,B/F,24\"D,PtdDrwFrt, Stl Lkrl,Ellipse Pull,Cstr,No Top",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            }
          ],
          "addresses": [
            {
              "id": "5",
              "workorder": {
                "text": "Work Order Test",
                "value": "5"
              },
              "customer": {
                "text": "World Bank",
                "value": "1233"
              },
              "events": [
                "504",
                "516"
              ],
              "address": {
                "text": "3105  Doctors Drive",
                "value": "8402"
              },
              "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
              "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
            }
          ],
          "contacts": [
            {
              "id": "5",
              "workorder": {
                "text": "Work Order Test",
                "value": "5"
              },
              "events": [
                "504",
                "516"
              ],
              "contact": {
                "text": "World Bank : Mei Matriano",
                "value": "2123"
              },
              "name": "Mei Matriano",
              "email": "mei@erpsuccesspartners.com",
              "jobTitle": "",
              "mobilePhone": "",
              "phone": "",
              "primary": true,
              "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
            }
          ],
          "events": [
            {
              "id": "504",
              "title": "Work Order Event Test",
              "workorder": {
                "text": "Work Order Test",
                "value": "5"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/5/2024 until 12/6/2024",
                "dates": [
                  "12/5/2024",
                  "12/6/2024"
                ],
                "start": "2024-12-05",
                "end": "2024-12-06"
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
              "note": "Work Order Event Test",
              "url": "/app/crm/calendar/event.nl?id=504&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "",
                "value": ""
              },
              "address": {
                "text": "",
                "value": ""
              },
              "organizer": {
                "text": "Abby Kwan",
                "value": "148"
              }
            },
            {
              "id": "516",
              "title": "Work Order Test",
              "workorder": {
                "text": "Work Order Test",
                "value": "5"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "one time event on 12/10/2024",
                "dates": [
                  "12/10/2024"
                ],
                "start": "2024-12-10",
                "end": "2024-12-10"
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
              "note": "test123",
              "url": "/app/crm/calendar/event.nl?id=516&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "5",
                "value": "5"
              },
              "address": {
                "text": "5",
                "value": "5"
              },
              "organizer": {
                "text": "Kat Glass",
                "value": "2111"
              }
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=2122&compid=TD2952265",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=1089&id=5&compid=TD2952265",
          "soUrl": "/app/accounting/transactions/salesord.nl?id=32090&compid=TD2952265",
          "esthours": "50"
        },
        "resources": [
          {
            "id": "20",
            "name": "Will Clark",
            "initials": "WC",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 003-5347",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Work Order Test",
              "value": "5"
            },
            "events": [
              "504"
            ],
            "employee": {
              "text": "Will Clark",
              "value": "158"
            },
            "resourceGroups": [
              {
                "text": "Driver",
                "value": "2"
              }
            ],
            "types": [
              {
                "text": "Delivery Driver",
                "value": "2"
              }
            ],
            "subTypes": [
              
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
            "selected": true
          },
          {
            "id": "21",
            "name": "Joel Williams",
            "initials": "JW",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 464-4606",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Work Order Test",
              "value": "5"
            },
            "events": [
              "504"
            ],
            "employee": {
              "text": "Joel Williams",
              "value": "157"
            },
            "resourceGroups": [
              {
                "text": "Driver",
                "value": "2"
              }
            ],
            "types": [
              {
                "text": "Delivery Driver",
                "value": "2"
              }
            ],
            "subTypes": [
              
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
              "text": "Crew Enhancement",
              "value": "3"
            },
            "selected": true
          }
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          {
            "id": "27",
            "workorder": {
              "text": "Work Order Test",
              "value": "5"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "504",
            "uuid": "32090_7",
            "line": "7",
            "item": {
              "text": "JCTB-24S1",
              "value": "509"
            },
            "description": "X Series,Pedestal,Cushion Top Kit, 24\"D",
            "quantity": 1,
            "availableQty": 1,
            "note": "",
            "selected": true
          }
        ],
        "contacts": [
          {
            "id": "5",
            "workorder": {
              "text": "Work Order Test",
              "value": "5"
            },
            "events": [
              "504",
              "516"
            ],
            "contact": {
              "text": "World Bank : Mei Matriano",
              "value": "2123"
            },
            "name": "Mei Matriano",
            "email": "mei@erpsuccesspartners.com",
            "jobTitle": "",
            "mobilePhone": "",
            "phone": "",
            "primary": true,
            "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265",
            "selected": true
          }
        ],
        "addresses": [
          {
            "id": "5",
            "workorder": {
              "text": "Work Order Test",
              "value": "5"
            },
            "customer": {
              "text": "World Bank",
              "value": "1233"
            },
            "events": [
              "504",
              "516"
            ],
            "address": {
              "text": "3105  Doctors Drive",
              "value": "8402"
            },
            "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265",
            "selected": true
          }
        ],
        "contact": {
          "text": "",
          "value": ""
        },
        "address": {
          "text": "",
          "value": ""
        },
        "organizer": {
          "text": "Abby Kwan",
          "value": "148"
        }
      },
      {
        "id": "501",
        "title": "Install Furniture",
        "workorder": {
          "text": "Furniture Installation 1st Floor",
          "value": "3"
        },
        "location": "",
        "status": {
          "text": "Tentative",
          "value": "TENTATIVE",
          "code": "bg-secondary"
        },
        "date": {
          "recurrence": "occurs every day from 12/5/2024 until 12/9/2024",
          "dates": [
            "12/5/2024",
            "12/9/2024"
          ],
          "start": "2024-12-05",
          "end": "2024-12-09"
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
        "note": "Install Furniture",
        "url": "/app/crm/calendar/event.nl?id=501&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          "id": "3",
          "name": "Furniture Installation 1st Floor",
          "title": "Furniture Installation 1st Floor",
          "project": {
            "text": "World Bank : World Bank Furniture Installation",
            "value": "2122"
          },
          "date": "12/4/2024",
          "status": {
            "text": "Not Started",
            "value": "4",
            "code": "#026adf"
          },
          "type": {
            "text": "Service",
            "value": "2"
          },
          "memo": "",
          "salesorder": {
            "text": "Sales Order #SO3277",
            "value": "32090"
          },
          "customer": {
            "text": "World Bank",
            "value": "1233"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": [
            
          ],
          "vendors": [
            {
              "id": "1",
              "name": "1",
              "vendor": {
                "text": "Bedline",
                "value": "1133"
              },
              "url": "http://www.@Bedline.com",
              "email": "info@Bedline.com",
              "initials": "B",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "event": "501",
              "quantityRequired": 2,
              "quantityAvailable": 50,
              "purchaseOrder": {
                "text": " ",
                "value": ""
              },
              "amount": 0,
              "active": true,
              "woVendor": true,
              "memo": ""
            }
          ],
          "assets": [
            
          ],
          "items": [
            {
              "id": "13",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "501",
              "uuid": "32090_9",
              "line": "9",
              "item": {
                "text": "TA0M-1396-FPS1",
                "value": "511"
              },
              "description": "Planes,Modesty Panel, 13InX96In,Fab,Pwr",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "14",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "501",
              "uuid": "32090_10",
              "line": "10",
              "item": {
                "text": "VZCC-0060-HSS1",
                "value": "512"
              },
              "description": "Compose,Top Trim 60In.W,Stl, Pnl Frame",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "11",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_9",
              "line": "9",
              "item": {
                "text": "TA0M-1396-FPS1",
                "value": "511"
              },
              "description": "Planes,Modesty Panel, 13InX96In,Fab,Pwr",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "12",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_10",
              "line": "10",
              "item": {
                "text": "VZCC-0060-HSS1",
                "value": "512"
              },
              "description": "Compose,Top Trim 60In.W,Stl, Pnl Frame",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            }
          ],
          "addresses": [
            {
              "id": "3",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "customer": {
                "text": "World Bank",
                "value": "1233"
              },
              "events": [
                "501",
                "505"
              ],
              "address": {
                "text": "3105  Doctors Drive",
                "value": "8402"
              },
              "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
              "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
            }
          ],
          "contacts": [
            {
              "id": "3",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "events": [
                "501",
                "505"
              ],
              "contact": {
                "text": "World Bank : Mei Matriano",
                "value": "2123"
              },
              "name": "Mei Matriano",
              "email": "mei@erpsuccesspartners.com",
              "jobTitle": "",
              "mobilePhone": "",
              "phone": "",
              "primary": true,
              "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
            }
          ],
          "events": [
            {
              "id": "505",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/2/2024 until 12/5/2024",
                "dates": [
                  "12/2/2024",
                  "12/5/2024"
                ],
                "start": "2024-12-02",
                "end": "2024-12-05"
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
              "url": "/app/crm/calendar/event.nl?id=505&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "3",
                "value": "3"
              },
              "address": {
                "text": "3",
                "value": "3"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "501",
              "title": "Install Furniture",
              "workorder": {
                "text": "Furniture Installation 1st Floor",
                "value": "3"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/5/2024 until 12/9/2024",
                "dates": [
                  "12/5/2024",
                  "12/9/2024"
                ],
                "start": "2024-12-05",
                "end": "2024-12-09"
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
              "note": "Install Furniture",
              "url": "/app/crm/calendar/event.nl?id=501&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "",
                "value": ""
              },
              "address": {
                "text": "",
                "value": ""
              },
              "organizer": {
                "text": "Mei Matriano",
                "value": "2124"
              }
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=2122&compid=TD2952265",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=1089&id=3&compid=TD2952265",
          "soUrl": "/app/accounting/transactions/salesord.nl?id=32090&compid=TD2952265",
          "esthours": "200"
        },
        "resources": [
          {
            "id": "9",
            "name": "Will Clark",
            "initials": "WC",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 003-5347",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "events": [
              "501"
            ],
            "employee": {
              "text": "Will Clark",
              "value": "158"
            },
            "resourceGroups": [
              {
                "text": "Driver",
                "value": "2"
              }
            ],
            "types": [
              {
                "text": "Delivery Driver",
                "value": "2"
              }
            ],
            "subTypes": [
              
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
            "selected": true
          },
          {
            "id": "10",
            "name": "Conner Avery",
            "initials": "CA",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 740-4045",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "events": [
              "501"
            ],
            "employee": {
              "text": "Conner Avery",
              "value": "142"
            },
            "resourceGroups": [
              {
                "text": "Installers",
                "value": "1"
              }
            ],
            "types": [
              {
                "text": "Foreman",
                "value": "4"
              }
            ],
            "subTypes": [
              
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
              "text": "Crew Enhancement",
              "value": "3"
            },
            "selected": true
          },
          {
            "id": "11",
            "name": "Joel Williams",
            "initials": "JW",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 464-4606",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "events": [
              "501"
            ],
            "employee": {
              "text": "Joel Williams",
              "value": "157"
            },
            "resourceGroups": [
              {
                "text": "Driver",
                "value": "2"
              }
            ],
            "types": [
              {
                "text": "Delivery Driver",
                "value": "2"
              }
            ],
            "subTypes": [
              
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
              "text": "Crew Enhancement",
              "value": "3"
            },
            "selected": true
          },
          {
            "id": "15",
            "name": "Ann Traynor",
            "initials": "AT",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 229-3342",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "events": [
              "501"
            ],
            "employee": {
              "text": "Ann Traynor",
              "value": "141"
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
            "subTypes": [
              
            ],
            "rate": 50,
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
            "selected": true
          }
        ],
        "vendors": [
          {
            "id": "1",
            "name": "1",
            "vendor": {
              "text": "Bedline",
              "value": "1133"
            },
            "url": "http://www.@Bedline.com",
            "email": "info@Bedline.com",
            "initials": "B",
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "event": "501",
            "quantityRequired": 2,
            "quantityAvailable": 50,
            "purchaseOrder": {
              "text": " ",
              "value": ""
            },
            "amount": 0,
            "active": true,
            "woVendor": true,
            "memo": "",
            "selected": true
          }
        ],
        "assets": [
          
        ],
        "items": [
          {
            "id": "13",
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "501",
            "uuid": "32090_9",
            "line": "9",
            "item": {
              "text": "TA0M-1396-FPS1",
              "value": "511"
            },
            "description": "Planes,Modesty Panel, 13InX96In,Fab,Pwr",
            "quantity": 3,
            "availableQty": 3,
            "note": "",
            "selected": true
          },
          {
            "id": "14",
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "salesorder": {
              "text": "Sales Order #SO3277",
              "value": "32090"
            },
            "event": "501",
            "uuid": "32090_10",
            "line": "10",
            "item": {
              "text": "VZCC-0060-HSS1",
              "value": "512"
            },
            "description": "Compose,Top Trim 60In.W,Stl, Pnl Frame",
            "quantity": 3,
            "availableQty": 3,
            "note": "",
            "selected": true
          }
        ],
        "contacts": [
          {
            "id": "3",
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "events": [
              "501",
              "505"
            ],
            "contact": {
              "text": "World Bank : Mei Matriano",
              "value": "2123"
            },
            "name": "Mei Matriano",
            "email": "mei@erpsuccesspartners.com",
            "jobTitle": "",
            "mobilePhone": "",
            "phone": "",
            "primary": true,
            "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265",
            "selected": true
          }
        ],
        "addresses": [
          {
            "id": "3",
            "workorder": {
              "text": "Furniture Installation 1st Floor",
              "value": "3"
            },
            "customer": {
              "text": "World Bank",
              "value": "1233"
            },
            "events": [
              "501",
              "505"
            ],
            "address": {
              "text": "3105  Doctors Drive",
              "value": "8402"
            },
            "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265",
            "selected": true
          }
        ],
        "contact": {
          "text": "",
          "value": ""
        },
        "address": {
          "text": "",
          "value": ""
        },
        "organizer": {
          "text": "Mei Matriano",
          "value": "2124"
        }
      },
      {
        "id": "516",
        "title": "Work Order Test",
        "workorder": {
          "text": "Work Order Test",
          "value": "5"
        },
        "location": "",
        "status": {
          "text": "Tentative",
          "value": "TENTATIVE",
          "code": "bg-secondary"
        },
        "date": {
          "recurrence": "one time event on 12/10/2024",
          "dates": [
            "12/10/2024"
          ],
          "start": "2024-12-10",
          "end": "2024-12-10"
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
        "note": "test123",
        "url": "/app/crm/calendar/event.nl?id=516&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          "id": "5",
          "name": "Work Order Test",
          "title": "Work Order Test",
          "project": {
            "text": "World Bank : World Bank Furniture Installation",
            "value": "2122"
          },
          "date": "12/4/2024",
          "status": {
            "text": "Not Started",
            "value": "4",
            "code": "#026adf"
          },
          "type": {
            "text": "Service",
            "value": "2"
          },
          "memo": "<p><strong>Work Order Test</strong></p>",
          "salesorder": {
            "text": "Sales Order #SO3277",
            "value": "32090"
          },
          "customer": {
            "text": "World Bank",
            "value": "1233"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": [
            
          ],
          "vendors": [
            
          ],
          "assets": [
            
          ],
          "items": [
            {
              "id": "27",
              "workorder": {
                "text": "Work Order Test",
                "value": "5"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "504",
              "uuid": "32090_7",
              "line": "7",
              "item": {
                "text": "JCTB-24S1",
                "value": "509"
              },
              "description": "X Series,Pedestal,Cushion Top Kit, 24\"D",
              "quantity": 1,
              "availableQty": 1,
              "note": ""
            },
            {
              "id": "25",
              "workorder": {
                "text": "Work Order Test",
                "value": "5"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_7",
              "line": "7",
              "item": {
                "text": "JCTB-24S1",
                "value": "509"
              },
              "description": "X Series,Pedestal,Cushion Top Kit, 24\"D",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "26",
              "workorder": {
                "text": "Work Order Test",
                "value": "5"
              },
              "salesorder": {
                "text": "Sales Order #SO3277",
                "value": "32090"
              },
              "event": "",
              "uuid": "32090_8",
              "line": "8",
              "item": {
                "text": "JPMA-24-S1CS1",
                "value": "510"
              },
              "description": "X Series,Pedestal,Mobile,B/F,24\"D,PtdDrwFrt, Stl Lkrl,Ellipse Pull,Cstr,No Top",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            }
          ],
          "addresses": [
            {
              "id": "5",
              "workorder": {
                "text": "Work Order Test",
                "value": "5"
              },
              "customer": {
                "text": "World Bank",
                "value": "1233"
              },
              "events": [
                "504",
                "516"
              ],
              "address": {
                "text": "3105  Doctors Drive",
                "value": "8402"
              },
              "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
              "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
            }
          ],
          "contacts": [
            {
              "id": "5",
              "workorder": {
                "text": "Work Order Test",
                "value": "5"
              },
              "events": [
                "504",
                "516"
              ],
              "contact": {
                "text": "World Bank : Mei Matriano",
                "value": "2123"
              },
              "name": "Mei Matriano",
              "email": "mei@erpsuccesspartners.com",
              "jobTitle": "",
              "mobilePhone": "",
              "phone": "",
              "primary": true,
              "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
            }
          ],
          "events": [
            {
              "id": "504",
              "title": "Work Order Event Test",
              "workorder": {
                "text": "Work Order Test",
                "value": "5"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/5/2024 until 12/6/2024",
                "dates": [
                  "12/5/2024",
                  "12/6/2024"
                ],
                "start": "2024-12-05",
                "end": "2024-12-06"
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
              "note": "Work Order Event Test",
              "url": "/app/crm/calendar/event.nl?id=504&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "",
                "value": ""
              },
              "address": {
                "text": "",
                "value": ""
              },
              "organizer": {
                "text": "Abby Kwan",
                "value": "148"
              }
            },
            {
              "id": "516",
              "title": "Work Order Test",
              "workorder": {
                "text": "Work Order Test",
                "value": "5"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "one time event on 12/10/2024",
                "dates": [
                  "12/10/2024"
                ],
                "start": "2024-12-10",
                "end": "2024-12-10"
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
              "note": "test123",
              "url": "/app/crm/calendar/event.nl?id=516&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "5",
                "value": "5"
              },
              "address": {
                "text": "5",
                "value": "5"
              },
              "organizer": {
                "text": "Kat Glass",
                "value": "2111"
              }
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=2122&compid=TD2952265",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=1089&id=5&compid=TD2952265",
          "soUrl": "/app/accounting/transactions/salesord.nl?id=32090&compid=TD2952265",
          "esthours": "50"
        },
        "resources": [
          {
            "id": "23",
            "name": "Emma Richards",
            "initials": "ER",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 016-5314",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Work Order Test",
              "value": "5"
            },
            "events": [
              "516"
            ],
            "employee": {
              "text": "Emma Richards",
              "value": "143"
            },
            "resourceGroups": [
              {
                "text": "Designer",
                "value": "3"
              },
              {
                "text": "Driver",
                "value": "2"
              }
            ],
            "types": [
              
            ],
            "subTypes": [
              
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
            "selected": true
          }
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          
        ],
        "contacts": [
          {
            "id": "5",
            "workorder": {
              "text": "Work Order Test",
              "value": "5"
            },
            "events": [
              "504",
              "516"
            ],
            "contact": {
              "text": "World Bank : Mei Matriano",
              "value": "2123"
            },
            "name": "Mei Matriano",
            "email": "mei@erpsuccesspartners.com",
            "jobTitle": "",
            "mobilePhone": "",
            "phone": "",
            "primary": true,
            "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265",
            "selected": true
          }
        ],
        "addresses": [
          {
            "id": "5",
            "workorder": {
              "text": "Work Order Test",
              "value": "5"
            },
            "customer": {
              "text": "World Bank",
              "value": "1233"
            },
            "events": [
              "504",
              "516"
            ],
            "address": {
              "text": "3105  Doctors Drive",
              "value": "8402"
            },
            "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265",
            "selected": true
          }
        ],
        "contact": {
          "text": "5",
          "value": "5"
        },
        "address": {
          "text": "5",
          "value": "5"
        },
        "organizer": {
          "text": "Kat Glass",
          "value": "2111"
        }
      },
      {
        "id": "492",
        "title": "Furniture Installation",
        "workorder": {
          "text": "",
          "value": ""
        },
        "location": "",
        "status": {
          "text": "Confirmed",
          "value": "CONFIRMED",
          "code": "bg-success"
        },
        "date": {
          "recurrence": "one time event on 11/15/2024",
          "dates": [
            "11/15/2024"
          ],
          "start": "2024-11-15",
          "end": "2024-11-15"
        },
        "time": {
          "start": "03:00",
          "end": "04:00"
        },
        "priority": {
          "text": "",
          "value": ""
        },
        "note": "",
        "url": "/app/crm/calendar/event.nl?id=492&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          
        },
        "resources": [
          
        ],
        "vendors": [
          
        ],
        "assets": [
          
        ],
        "items": [
          
        ],
        "contacts": [
          
        ],
        "addresses": [
          
        ],
        "contact": {
          "text": "",
          "value": ""
        },
        "address": {
          "text": "",
          "value": ""
        },
        "organizer": {
          "text": "Kat Glass",
          "value": "2111"
        }
      },
      {
        "id": "502",
        "title": "Furniture Installation",
        "workorder": {
          "text": "Furniture Installation",
          "value": "4"
        },
        "location": "",
        "status": {
          "text": "Tentative",
          "value": "TENTATIVE",
          "code": "bg-secondary"
        },
        "date": {
          "recurrence": "occurs every day from 12/16/2024 until 12/18/2024",
          "dates": [
            "12/16/2024",
            "12/18/2024"
          ],
          "start": "2024-12-16",
          "end": "2024-12-18"
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
        "url": "/app/crm/calendar/event.nl?id=502&compid=TD2952265&selectedtab=custom337",
        "color": "#1a6756",
        "woRef": {
          "id": "4",
          "name": "Furniture Installation",
          "title": "Furniture Installation",
          "project": {
            "text": "World Bank : World Bank Flooring Installation",
            "value": "2126"
          },
          "date": "12/4/2024",
          "status": {
            "text": "In Progress",
            "value": "1",
            "code": "#026adf"
          },
          "type": {
            "text": "Service",
            "value": "2"
          },
          "memo": "<p>- **Review Furniture Layout Plans**: Confirm placement and orientation according to layout plans before beginning installation.</p><p>- **Unpack and Inventory Parts**: Carefully unpack each item and inventory all parts and hardware to ensure nothing is missing.</p><p>- **Organize Tools and Hardware**: Set up necessary tools (e.g., screwdriver, drill, wrench) and organize hardware for easy access during installation.</p><p>- **Assemble Base Components First**: Start by assembling the base or foundational components, such as legs or frames, ensuring they are stable and level.</p><p>- **Secure Structural Pieces**: Attach any primary structural pieces (e.g., tabletops, seat bases) to the base, following manufacturer instructions closely.</p><p>- **Install Secondary Components**: Add any secondary components, such as drawers, shelves, or panels, making sure they are properly aligned and secure.</p><p>- **Tighten All Screws and Bolts**: Go over all screws, bolts, and connectors to ensure everything is tightly secured and stable.</p><p>- **Check for Stability and Leveling**: Test the furniture for stability and make any necessary adjustments to ensure it is level.</p><p>- **Attach Accessories or Finishing Pieces**: Add finishing touches like knobs, covers, or cushions according to specifications.</p><p>- **Final Inspection**: Conduct a final inspection to ensure that all parts are securely assembled, aligned, and free of damage. Clean the area and remove any debris or packaging.</p>",
          "salesorder": {
            "text": "Sales Order #SO3278",
            "value": "32092"
          },
          "customer": {
            "text": "World Bank",
            "value": "1233"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": [
            
          ],
          "vendors": [
            {
              "id": "2",
              "name": "2",
              "vendor": {
                "text": "Bedline",
                "value": "1133"
              },
              "url": "http://www.@Bedline.com",
              "email": "info@Bedline.com",
              "initials": "B",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "event": "502",
              "quantityRequired": 1,
              "quantityAvailable": 50,
              "purchaseOrder": {
                "text": " ",
                "value": ""
              },
              "amount": 0,
              "active": true,
              "woVendor": true,
              "memo": ""
            },
            {
              "id": "3",
              "name": "3",
              "vendor": {
                "text": "Betty Black, Inc.",
                "value": "1137"
              },
              "url": "http://www.@BettyBlack,Inc.com",
              "email": "info@BettyBlackInc.com",
              "initials": "BB",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "event": "502",
              "quantityRequired": 1,
              "quantityAvailable": 40,
              "purchaseOrder": {
                "text": " ",
                "value": ""
              },
              "amount": 0,
              "active": true,
              "woVendor": true,
              "memo": ""
            }
          ],
          "assets": [
            
          ],
          "items": [
            {
              "id": "22",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "502",
              "uuid": "32091_1",
              "line": "1",
              "item": {
                "text": "VZCC-0054-HS",
                "value": "803"
              },
              "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
              "quantity": 1,
              "availableQty": 1,
              "note": ""
            },
            {
              "id": "23",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "502",
              "uuid": "32091_2",
              "line": "2",
              "item": {
                "text": "VZCE-7400-H-E",
                "value": "906"
              },
              "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
              "quantity": 2,
              "availableQty": 2,
              "note": ""
            },
            {
              "id": "24",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "502",
              "uuid": "32091_3",
              "line": "3",
              "item": {
                "text": "VZCW-0000-P-E",
                "value": "907"
              },
              "description": "Compose,Wall Mount,Fits All Heights",
              "quantity": 2,
              "availableQty": 2,
              "note": ""
            },
            {
              "id": "15",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_1",
              "line": "1",
              "item": {
                "text": "VZCC-0054-HS",
                "value": "803"
              },
              "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
              "quantity": 1,
              "availableQty": 1,
              "note": ""
            },
            {
              "id": "16",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_2",
              "line": "2",
              "item": {
                "text": "VZCE-7400-H-E",
                "value": "906"
              },
              "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "17",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_3",
              "line": "3",
              "item": {
                "text": "VZCW-0000-P-E",
                "value": "907"
              },
              "description": "Compose,Wall Mount,Fits All Heights",
              "quantity": 3,
              "availableQty": 3,
              "note": ""
            },
            {
              "id": "19",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_5",
              "line": "5",
              "item": {
                "text": "VZFS-1654-R-E",
                "value": "908"
              },
              "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
              "quantity": 6,
              "availableQty": 6,
              "note": ""
            },
            {
              "id": "18",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_4",
              "line": "4",
              "item": {
                "text": "VZFS-1654-R-E",
                "value": "908"
              },
              "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
              "quantity": 6,
              "availableQty": 6,
              "note": ""
            },
            {
              "id": "20",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_6",
              "line": "6",
              "item": {
                "text": "VZFS-1654-R-E234",
                "value": "1008"
              },
              "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
              "quantity": 6,
              "availableQty": 6,
              "note": ""
            },
            {
              "id": "21",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "salesorder": {
                "text": "Sales Order #SO3278",
                "value": "32092"
              },
              "event": "",
              "uuid": "32091_7",
              "line": "7",
              "item": {
                "text": "VZTI-1654-FNN-E123",
                "value": "1009"
              },
              "description": "Compose,Single Tile,16In.HX54In.W,Fabric/Tackable,Std Core,No Tech",
              "quantity": 12,
              "availableQty": 12,
              "note": ""
            }
          ],
          "addresses": [
            {
              "id": "4",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "customer": {
                "text": "World Bank",
                "value": "1233"
              },
              "events": [
                "502",
                "507"
              ],
              "address": {
                "text": "3105  Doctors Drive",
                "value": "8402"
              },
              "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
              "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
            }
          ],
          "contacts": [
            {
              "id": "4",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "events": [
                "502",
                "507"
              ],
              "contact": {
                "text": "World Bank : Mei Matriano",
                "value": "2123"
              },
              "name": "Mei Matriano",
              "email": "mei@erpsuccesspartners.com",
              "jobTitle": "",
              "mobilePhone": "",
              "phone": "",
              "primary": true,
              "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
            }
          ],
          "events": [
            {
              "id": "506",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/2/2024 until 12/5/2024",
                "dates": [
                  "12/2/2024",
                  "12/5/2024"
                ],
                "start": "2024-12-02",
                "end": "2024-12-05"
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
              "url": "/app/crm/calendar/event.nl?id=506&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "4",
                "value": "4"
              },
              "address": {
                "text": "4",
                "value": "4"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "507",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
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
              "note": "",
              "url": "/app/crm/calendar/event.nl?id=507&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "4",
                "value": "4"
              },
              "address": {
                "text": "4",
                "value": "4"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "503",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/4/2024 until 12/6/2024",
                "dates": [
                  "12/4/2024",
                  "12/6/2024"
                ],
                "start": "2024-12-04",
                "end": "2024-12-06"
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
              "url": "/app/crm/calendar/event.nl?id=503&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "4",
                "value": "4"
              },
              "address": {
                "text": "4",
                "value": "4"
              },
              "organizer": {
                "text": "Kathryn Glass",
                "value": "-5"
              }
            },
            {
              "id": "502",
              "title": "Furniture Installation",
              "workorder": {
                "text": "Furniture Installation",
                "value": "4"
              },
              "location": "",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "recurrence": "occurs every day from 12/16/2024 until 12/18/2024",
                "dates": [
                  "12/16/2024",
                  "12/18/2024"
                ],
                "start": "2024-12-16",
                "end": "2024-12-18"
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
              "url": "/app/crm/calendar/event.nl?id=502&compid=TD2952265&selectedtab=custom337",
              "color": "#1a6756",
              "woRef": {
                
              },
              "resources": [
                
              ],
              "vendors": [
                
              ],
              "assets": [
                
              ],
              "items": [
                
              ],
              "contacts": [
                
              ],
              "addresses": [
                
              ],
              "contact": {
                "text": "",
                "value": ""
              },
              "address": {
                "text": "",
                "value": ""
              },
              "organizer": {
                "text": "Ann Traynor",
                "value": "141"
              }
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=2126&compid=TD2952265",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=1089&id=4&compid=TD2952265",
          "soUrl": "/app/accounting/transactions/salesord.nl?id=32092&compid=TD2952265",
          "esthours": "200"
        },
        "resources": [
          {
            "id": "12",
            "name": "Will Clark",
            "initials": "WC",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 003-5347",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "events": [
              "502"
            ],
            "employee": {
              "text": "Will Clark",
              "value": "158"
            },
            "resourceGroups": [
              {
                "text": "Driver",
                "value": "2"
              }
            ],
            "types": [
              {
                "text": "Delivery Driver",
                "value": "2"
              }
            ],
            "subTypes": [
              
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
            "selected": true
          },
          {
            "id": "13",
            "name": "Conner Avery",
            "initials": "CA",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 740-4045",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "events": [
              "502"
            ],
            "employee": {
              "text": "Conner Avery",
              "value": "142"
            },
            "resourceGroups": [
              {
                "text": "Installers",
                "value": "1"
              }
            ],
            "types": [
              {
                "text": "Foreman",
                "value": "4"
              }
            ],
            "subTypes": [
              
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
              "text": "Crew Enhancement",
              "value": "3"
            },
            "selected": true
          },
          {
            "id": "14",
            "name": "Joel Williams",
            "initials": "JW",
            "email": "demo+emblm@erpsuccesspartners.com",
            "phone": "(650) 464-4606",
            "location": {
              "text": "",
              "value": ""
            },
            "active": true,
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "events": [
              "502"
            ],
            "employee": {
              "text": "Joel Williams",
              "value": "157"
            },
            "resourceGroups": [
              {
                "text": "Driver",
                "value": "2"
              }
            ],
            "types": [
              {
                "text": "Delivery Driver",
                "value": "2"
              }
            ],
            "subTypes": [
              
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
              "text": "Crew Enhancement",
              "value": "3"
            },
            "selected": true
          }
        ],
        "vendors": [
          {
            "id": "2",
            "name": "2",
            "vendor": {
              "text": "Bedline",
              "value": "1133"
            },
            "url": "http://www.@Bedline.com",
            "email": "info@Bedline.com",
            "initials": "B",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "event": "502",
            "quantityRequired": 1,
            "quantityAvailable": 50,
            "purchaseOrder": {
              "text": " ",
              "value": ""
            },
            "amount": 0,
            "active": true,
            "woVendor": true,
            "memo": "",
            "selected": true
          },
          {
            "id": "3",
            "name": "3",
            "vendor": {
              "text": "Betty Black, Inc.",
              "value": "1137"
            },
            "url": "http://www.@BettyBlack,Inc.com",
            "email": "info@BettyBlackInc.com",
            "initials": "BB",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "event": "502",
            "quantityRequired": 1,
            "quantityAvailable": 40,
            "purchaseOrder": {
              "text": " ",
              "value": ""
            },
            "amount": 0,
            "active": true,
            "woVendor": true,
            "memo": "",
            "selected": true
          }
        ],
        "assets": [
          
        ],
        "items": [
          {
            "id": "22",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "salesorder": {
              "text": "Sales Order #SO3278",
              "value": "32092"
            },
            "event": "502",
            "uuid": "32091_1",
            "line": "1",
            "item": {
              "text": "VZCC-0054-HS",
              "value": "803"
            },
            "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
            "quantity": 1,
            "availableQty": 1,
            "note": "",
            "selected": true
          },
          {
            "id": "23",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "salesorder": {
              "text": "Sales Order #SO3278",
              "value": "32092"
            },
            "event": "502",
            "uuid": "32091_2",
            "line": "2",
            "item": {
              "text": "VZCE-7400-H-E",
              "value": "906"
            },
            "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
            "quantity": 2,
            "availableQty": 2,
            "note": "",
            "selected": true
          },
          {
            "id": "24",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "salesorder": {
              "text": "Sales Order #SO3278",
              "value": "32092"
            },
            "event": "502",
            "uuid": "32091_3",
            "line": "3",
            "item": {
              "text": "VZCW-0000-P-E",
              "value": "907"
            },
            "description": "Compose,Wall Mount,Fits All Heights",
            "quantity": 2,
            "availableQty": 2,
            "note": "",
            "selected": true
          }
        ],
        "contacts": [
          {
            "id": "4",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "events": [
              "502",
              "507"
            ],
            "contact": {
              "text": "World Bank : Mei Matriano",
              "value": "2123"
            },
            "name": "Mei Matriano",
            "email": "mei@erpsuccesspartners.com",
            "jobTitle": "",
            "mobilePhone": "",
            "phone": "",
            "primary": true,
            "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265",
            "selected": true
          }
        ],
        "addresses": [
          {
            "id": "4",
            "workorder": {
              "text": "Furniture Installation",
              "value": "4"
            },
            "customer": {
              "text": "World Bank",
              "value": "1233"
            },
            "events": [
              "502",
              "507"
            ],
            "address": {
              "text": "3105  Doctors Drive",
              "value": "8402"
            },
            "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265",
            "selected": true
          }
        ],
        "contact": {
          "text": "",
          "value": ""
        },
        "address": {
          "text": "",
          "value": ""
        },
        "organizer": {
          "text": "Ann Traynor",
          "value": "141"
        }
      }
    ],
    "woContacts": [
      {
        "id": "1",
        "workorder": {
          "text": "Furniture Installation",
          "value": "1"
        },
        "events": [
          "497",
          "498"
        ],
        "contact": {
          "text": "World Bank : Mei Matriano",
          "value": "2123"
        },
        "name": "Mei Matriano",
        "email": "mei@erpsuccesspartners.com",
        "jobTitle": "",
        "mobilePhone": "",
        "phone": "",
        "primary": true,
        "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
      },
      {
        "id": "2",
        "workorder": {
          "text": "Furniture Installation",
          "value": "2"
        },
        "events": [
          "499",
          "500"
        ],
        "contact": {
          "text": "World Bank : Mei Matriano",
          "value": "2123"
        },
        "name": "Mei Matriano",
        "email": "mei@erpsuccesspartners.com",
        "jobTitle": "",
        "mobilePhone": "",
        "phone": "",
        "primary": true,
        "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
      },
      {
        "id": "3",
        "workorder": {
          "text": "Furniture Installation 1st Floor",
          "value": "3"
        },
        "events": [
          "501",
          "505"
        ],
        "contact": {
          "text": "World Bank : Mei Matriano",
          "value": "2123"
        },
        "name": "Mei Matriano",
        "email": "mei@erpsuccesspartners.com",
        "jobTitle": "",
        "mobilePhone": "",
        "phone": "",
        "primary": true,
        "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
      },
      {
        "id": "4",
        "workorder": {
          "text": "Furniture Installation",
          "value": "4"
        },
        "events": [
          "502",
          "507"
        ],
        "contact": {
          "text": "World Bank : Mei Matriano",
          "value": "2123"
        },
        "name": "Mei Matriano",
        "email": "mei@erpsuccesspartners.com",
        "jobTitle": "",
        "mobilePhone": "",
        "phone": "",
        "primary": true,
        "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
      },
      {
        "id": "5",
        "workorder": {
          "text": "Work Order Test",
          "value": "5"
        },
        "events": [
          "504",
          "516"
        ],
        "contact": {
          "text": "World Bank : Mei Matriano",
          "value": "2123"
        },
        "name": "Mei Matriano",
        "email": "mei@erpsuccesspartners.com",
        "jobTitle": "",
        "mobilePhone": "",
        "phone": "",
        "primary": true,
        "url": "/app/common/entity/contact.nl?id=2123&compid=TD2952265"
      }
    ],
    "woAddresses": [
      {
        "id": "1",
        "workorder": {
          "text": "Furniture Installation",
          "value": "1"
        },
        "customer": {
          "text": "World Bank",
          "value": "1233"
        },
        "events": [
          "497",
          "498"
        ],
        "address": {
          "text": "3105  Doctors Drive",
          "value": "8402"
        },
        "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
        "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
      },
      {
        "id": "2",
        "workorder": {
          "text": "Furniture Installation",
          "value": "2"
        },
        "customer": {
          "text": "World Bank",
          "value": "1233"
        },
        "events": [
          "499",
          "500"
        ],
        "address": {
          "text": "3105  Doctors Drive",
          "value": "8402"
        },
        "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
        "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
      },
      {
        "id": "3",
        "workorder": {
          "text": "Furniture Installation 1st Floor",
          "value": "3"
        },
        "customer": {
          "text": "World Bank",
          "value": "1233"
        },
        "events": [
          "501",
          "505"
        ],
        "address": {
          "text": "3105  Doctors Drive",
          "value": "8402"
        },
        "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
        "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
      },
      {
        "id": "4",
        "workorder": {
          "text": "Furniture Installation",
          "value": "4"
        },
        "customer": {
          "text": "World Bank",
          "value": "1233"
        },
        "events": [
          "502",
          "507"
        ],
        "address": {
          "text": "3105  Doctors Drive",
          "value": "8402"
        },
        "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
        "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
      },
      {
        "id": "5",
        "workorder": {
          "text": "Work Order Test",
          "value": "5"
        },
        "customer": {
          "text": "World Bank",
          "value": "1233"
        },
        "events": [
          "504",
          "516"
        ],
        "address": {
          "text": "3105  Doctors Drive",
          "value": "8402"
        },
        "addressDetails": "World Bank<br/>3105  Doctors Drive<br/>Los Angeles CA 90017<br/>United States",
        "customerUrl": "/app/common/entity/custjob.nl?id=1233&compid=TD2952265"
      }
    ],
    "organizers": [
      {
        "text": "Joel Williams",
        "value": "157"
      },
      {
        "text": "Frank Davenport",
        "value": "147"
      },
      {
        "text": "Kathryn Glass",
        "value": "-5"
      },
      {
        "text": "John Bailey",
        "value": "389"
      },
      {
        "text": "Larry Nelson",
        "value": "151"
      },
      {
        "text": "Ann Traynor",
        "value": "141"
      },
      {
        "text": "Carol Morgan",
        "value": "149"
      },
      {
        "text": "Abby Kwan",
        "value": "148"
      },
      {
        "text": "Mei Matriano",
        "value": "2124"
      },
      {
        "text": "Kat Glass",
        "value": "2111"
      }
    ]
  }

export default mockup;