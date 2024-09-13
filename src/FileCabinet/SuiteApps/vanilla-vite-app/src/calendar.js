import './calendar.css';

document.querySelector('#app div#container div#tabSections').innerHTML += `<div class="tab-pane fade" id="calendarSection" role="tabpanel" aria-labelledby="calendar-tab">
  <div id="calendar"></div>
</div>`;

initCalendarIO();

function initCalendarIO() {
    const events = [{
        "id": "100740",
        "title": "Work Order Sample July 22",
        "start": "2024-08-24T08:00",
        "end": "2024-08-24T18:00",
        "url": "/app/crm/calendar/event.nl?id=100740&compid=TSTDRV2617106&selectedtab=custom337",
        "color": "#6a95df",
        "className": "event-class-style-name",
        "extendedProps": {
          "id": "33",
          "name": "Work Order Sample July 22",
          "title": "Work Order Sample July 22",
          "project": {
            "text": "AB&I Holdings : Parking Lot Construction",
            "value": "1515"
          },
          "date": "7/29/2024",
          "status": {
            "text": "Not Started",
            "value": "4"
          },
          "type": {
            "text": "Moves",
            "value": "3"
          },
          "memo": "<p><strong>Work Order Sample July 22</strong></p>",
          "salesorder": {
            "text": "Sales Order #SLS00000609",
            "value": "11722"
          },
          "customer": {
            "text": "AB&I Holdings",
            "value": "1249"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": {},
          "items": [{
              "id": "28",
              "workorder": {
                "text": "Work Order Sample July 22",
                "value": "33"
              },
              "event": {
                "text": "Work Order Sample July 22",
                "value": "100740"
              },
              "uuid": "11722_1",
              "line": "1",
              "item": {
                "text": "4321GR",
                "value": "1015"
              },
              "description": "11 POCKET MAGAZINE RACK",
              "quantity": 2,
              "note": ""
            },
            {
              "id": "29",
              "workorder": {
                "text": "Work Order Sample July 22",
                "value": "33"
              },
              "event": {
                "text": "Work Order Sample July 22",
                "value": "100740"
              },
              "uuid": "11722_2",
              "line": "2",
              "item": {
                "text": "7031-0501",
                "value": "1047"
              },
              "description": "Friction Pad, Non-Carpeted Surfaces, Svc",
              "quantity": 3,
              "note": ""
            }
          ],
          "addresses": [{
            "id": "27",
            "workorder": {
              "text": "Work Order Sample July 22",
              "value": "33"
            },
            "customer": {
              "text": "AB&I Holdings",
              "value": "1249"
            },
            "event": {
              "text": "Work Order Sample July 22",
              "value": "100740"
            },
            "address": {
              "text": "1701 Rollins Road",
              "value": "244878"
            },
            "addressDetails": "Chad Bass\nAB&I Holdings\n1701 Rollins Road\nSacramento CA 94207\nUnited States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
          }],
          "contacts": [{
            "id": "14",
            "workorder": {
              "text": "Work Order Sample July 22",
              "value": "33"
            },
            "event": {
              "text": "Work Order Sample July 22",
              "value": "100740"
            },
            "contact": {
              "text": "AB&I Holdings : Chad Bass",
              "value": "1382"
            },
            "name": "Chad Bass",
            "email": "cbass@sbi.com",
            "jobTitle": "President",
            "mobilePhone": "",
            "phone": "",
            "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
          }],
          "events": [{
            "id": "100740",
            "title": "Work Order Sample July 22",
            "workorder": {
              "text": "Work Order Sample July 22",
              "value": "33"
            },
            "project": {
              "text": "AB&I Holdings : Parking Lot Construction",
              "value": "1515"
            },
            "location": "01: San Francisco",
            "status": {
              "text": "Confirmed",
              "value": "CONFIRMED",
              "code": "bg-success"
            },
            "date": {
              "start": "7/24/2024",
              "end": "7/24/2024"
            },
            "time": {
              "start": "8:00 am",
              "end": "6:00 pm"
            },
            "priority": {
              "text": "Urgent",
              "value": "4",
              "code": "bg-danger"
            },
            "url": "/app/crm/calendar/event.nl?id=100740&compid=TSTDRV2617106&selectedtab=custom337",
            "color": "#1a6756"
          }],
          "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=33&compid=TSTDRV2617106"
        }
      },
      {
        "id": "100739",
        "title": "SLS00000621_WRKORDR001",
        "start": "2024-08-23T08:00",
        "end": "2024-08-23T18:00",
        "url": "/app/crm/calendar/event.nl?id=100739&compid=TSTDRV2617106&selectedtab=custom337",
        "color": "#bcdf87",
        "className": "event-class-style-name",
        "extendedProps": {
          "id": "32",
          "name": "SLS00000621_WRKORDR001",
          "title": "SLS00000621_WRKORDR001",
          "project": {
            "text": "Test Test : Test Project",
            "value": "1774"
          },
          "date": "7/19/2024",
          "status": {
            "text": "Hold",
            "value": "7"
          },
          "type": {
            "text": "Standard",
            "value": "5"
          },
          "memo": "<p><strong style=\"color: rgb(232, 230, 227); --darkreader-inline-color: #d8d4cf;\" data-darkreader-inline-color=\"\">Work Order Instructions QA Test</strong></p>",
          "salesorder": {
            "text": "Sales Order #SLS00000621",
            "value": "13089"
          },
          "customer": {
            "text": "Test Test",
            "value": "1493"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": {},
          "items": [{
              "id": "26",
              "workorder": {
                "text": "SLS00000621_WRKORDR001",
                "value": "32"
              },
              "event": {
                "text": "SLS00000621_WRKORDR001",
                "value": "100739"
              },
              "uuid": "13089_1",
              "line": "1",
              "item": {
                "text": "VZCC-0054-HSS1",
                "value": "2031"
              },
              "description": "Compose,Top Trim 54In​【137 cm】.W,Stl, Pnl Frame",
              "quantity": 1,
              "note": ""
            },
            {
              "id": "27",
              "workorder": {
                "text": "SLS00000621_WRKORDR001",
                "value": "32"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "13089_2",
              "line": "2",
              "item": {
                "text": "VZCE-7400-HS1",
                "value": "2032"
              },
              "description": "Compose,Panel Trim,End-Of-Run 74In​【188 cm】.H, Steel",
              "quantity": 3,
              "note": ""
            }
          ],
          "addresses": [{
            "id": "26",
            "workorder": {
              "text": "SLS00000621_WRKORDR001",
              "value": "32"
            },
            "customer": {
              "text": "Test Test",
              "value": "1493"
            },
            "event": {
              "text": "SLS00000621_WRKORDR001",
              "value": "100739"
            },
            "address": {
              "text": "",
              "value": ""
            },
            "addressDetails": "",
            "customerUrl": "/app/common/entity/custjob.nl?id=1493&compid=TSTDRV2617106"
          }],
          "contacts": [],
          "events": [{
            "id": "100739",
            "title": "SLS00000621_WRKORDR001",
            "workorder": {
              "text": "SLS00000621_WRKORDR001",
              "value": "32"
            },
            "project": {
              "text": "Test Test : Test Project",
              "value": "1774"
            },
            "location": "01: San Francisco",
            "status": {
              "text": "Tentative",
              "value": "TENTATIVE",
              "code": "bg-secondary"
            },
            "date": {
              "start": "7/23/2024",
              "end": "7/23/2024"
            },
            "time": {
              "start": "8:00 am",
              "end": "6:00 pm"
            },
            "priority": {
              "text": "Medium",
              "value": "2",
              "code": "bg-warning"
            },
            "url": "/app/crm/calendar/event.nl?id=100739&compid=TSTDRV2617106&selectedtab=custom337",
            "color": "#1a6756"
          }],
          "projectUrl": "/app/accounting/project/project.nl?id=1774&compid=TSTDRV2617106",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=32&compid=TSTDRV2617106"
        }
      },
      {
        "id": "100749",
        "title": "Test",
        "start": "2024-08-25T08:00",
        "end": "2024-08-25T18:00",
        "url": "/app/crm/calendar/event.nl?id=100749&compid=TSTDRV2617106&selectedtab=custom337",
        "color": "#99042c",
        "className": "event-class-style-name",
        "extendedProps": {
          "id": "31",
          "name": "Test",
          "title": "Test",
          "project": {
            "text": "AB&I Holdings : Parking Lot Construction",
            "value": "1515"
          },
          "date": "7/19/2024",
          "status": {
            "text": "Closed",
            "value": "3"
          },
          "type": {
            "text": "Walls",
            "value": "6"
          },
          "memo": "<p>Test</p>",
          "salesorder": {
            "text": "Sales Order #SLS00000609",
            "value": "11722"
          },
          "customer": {
            "text": "AB&I Holdings",
            "value": "1249"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": {},
          "items": [{
              "id": "24",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "Test",
                "value": "100738"
              },
              "uuid": "11722_1",
              "line": "1",
              "item": {
                "text": "4321GR",
                "value": "1015"
              },
              "description": "11 POCKET MAGAZINE RACK",
              "quantity": 2,
              "note": ""
            },
            {
              "id": "25",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "Test",
                "value": "100738"
              },
              "uuid": "11722_2",
              "line": "2",
              "item": {
                "text": "7031-0501",
                "value": "1047"
              },
              "description": "Friction Pad, Non-Carpeted Surfaces, Svc",
              "quantity": 4,
              "note": ""
            },
            {
              "id": "30",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_1",
              "line": "1",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "11 POCKET MAGAZINE RACK",
              "quantity": 2,
              "note": ""
            },
            {
              "id": "31",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_2",
              "line": "2",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "Friction Pad, Non-Carpeted Surfaces, Svc",
              "quantity": 4,
              "note": ""
            },
            {
              "id": "32",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_1",
              "line": "1",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "11 POCKET MAGAZINE RACK",
              "quantity": 2,
              "note": ""
            },
            {
              "id": "33",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_2",
              "line": "2",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "Friction Pad, Non-Carpeted Surfaces, Svc",
              "quantity": 4,
              "note": ""
            },
            {
              "id": "34",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_1",
              "line": "1",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "11 POCKET MAGAZINE RACK",
              "quantity": 2,
              "note": ""
            },
            {
              "id": "35",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_2",
              "line": "2",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "Friction Pad, Non-Carpeted Surfaces, Svc",
              "quantity": 4,
              "note": ""
            }
          ],
          "addresses": [{
            "id": "24",
            "workorder": {
              "text": "Test",
              "value": "31"
            },
            "customer": {
              "text": "AB&I Holdings",
              "value": "1249"
            },
            "event": {
              "text": "",
              "value": ""
            },
            "address": {
              "text": "1701 Rollins Road",
              "value": "244878"
            },
            "addressDetails": "Chad Bass\nAB&I Holdings\n1701 Rollins Road\nSacramento CA 94207\nUnited States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
          }],
          "contacts": [{
            "id": "13",
            "workorder": {
              "text": "Test",
              "value": "31"
            },
            "event": {
              "text": "",
              "value": ""
            },
            "contact": {
              "text": "AB&I Holdings : Chad Bass",
              "value": "1382"
            },
            "name": "Chad Bass",
            "email": "cbass@sbi.com",
            "jobTitle": "President",
            "mobilePhone": "",
            "phone": "",
            "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
          }],
          "events": [{
              "id": "100749",
              "title": "Test",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "project": {
                "text": "AB&I Holdings : Parking Lot Construction",
                "value": "1515"
              },
              "location": "01: San Francisco",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "start": "7/25/2024",
                "end": "7/25/2024"
              },
              "time": {
                "start": "8:00 am",
                "end": "6:00 pm"
              },
              "priority": {
                "text": "Low",
                "value": "1",
                "code": "bg-secondary"
              },
              "url": "/app/crm/calendar/event.nl?id=100749&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            },
            {
              "id": "100738",
              "title": "Test",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "project": {
                "text": "AB&I Holdings : Parking Lot Construction",
                "value": "1515"
              },
              "location": "01: San Francisco",
              "status": {
                "text": "Confirmed",
                "value": "CONFIRMED",
                "code": "bg-success"
              },
              "date": {
                "start": "7/23/2024",
                "end": "7/23/2024"
              },
              "time": {
                "start": "8:00 am",
                "end": "6:00 pm"
              },
              "priority": {
                "text": "Urgent",
                "value": "4",
                "code": "bg-danger"
              },
              "url": "/app/crm/calendar/event.nl?id=100738&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            },
            {
              "id": "100723",
              "title": "Test",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "project": {
                "text": "AB&I Holdings : Parking Lot Construction",
                "value": "1515"
              },
              "location": "01: San Francisco",
              "status": {
                "text": "Confirmed",
                "value": "CONFIRMED",
                "code": "bg-success"
              },
              "date": {
                "start": "7/8/2024",
                "end": "7/8/2024"
              },
              "time": {
                "start": "8:00 am",
                "end": "6:00 pm"
              },
              "priority": {
                "text": "Urgent",
                "value": "4",
                "code": "bg-danger"
              },
              "url": "/app/crm/calendar/event.nl?id=100723&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=31&compid=TSTDRV2617106"
        }
      },
      {
        "id": "100738",
        "title": "Test",
        "start": "2024-08-23T08:00",
        "end": "2024-08-23T18:00",
        "url": "/app/crm/calendar/event.nl?id=100738&compid=TSTDRV2617106&selectedtab=custom337",
        "color": "#7c9d0",
        "className": "event-class-style-name",
        "extendedProps": {
          "id": "31",
          "name": "Test",
          "title": "Test",
          "project": {
            "text": "AB&I Holdings : Parking Lot Construction",
            "value": "1515"
          },
          "date": "7/19/2024",
          "status": {
            "text": "Closed",
            "value": "3"
          },
          "type": {
            "text": "Walls",
            "value": "6"
          },
          "memo": "<p>Test</p>",
          "salesorder": {
            "text": "Sales Order #SLS00000609",
            "value": "11722"
          },
          "customer": {
            "text": "AB&I Holdings",
            "value": "1249"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": {},
          "items": [{
              "id": "24",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "Test",
                "value": "100738"
              },
              "uuid": "11722_1",
              "line": "1",
              "item": {
                "text": "4321GR",
                "value": "1015"
              },
              "description": "11 POCKET MAGAZINE RACK",
              "quantity": 2,
              "note": ""
            },
            {
              "id": "25",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "Test",
                "value": "100738"
              },
              "uuid": "11722_2",
              "line": "2",
              "item": {
                "text": "7031-0501",
                "value": "1047"
              },
              "description": "Friction Pad, Non-Carpeted Surfaces, Svc",
              "quantity": 4,
              "note": ""
            },
            {
              "id": "30",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_1",
              "line": "1",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "11 POCKET MAGAZINE RACK",
              "quantity": 2,
              "note": ""
            },
            {
              "id": "31",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_2",
              "line": "2",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "Friction Pad, Non-Carpeted Surfaces, Svc",
              "quantity": 4,
              "note": ""
            },
            {
              "id": "32",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_1",
              "line": "1",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "11 POCKET MAGAZINE RACK",
              "quantity": 2,
              "note": ""
            },
            {
              "id": "33",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_2",
              "line": "2",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "Friction Pad, Non-Carpeted Surfaces, Svc",
              "quantity": 4,
              "note": ""
            },
            {
              "id": "34",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_1",
              "line": "1",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "11 POCKET MAGAZINE RACK",
              "quantity": 2,
              "note": ""
            },
            {
              "id": "35",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_2",
              "line": "2",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "Friction Pad, Non-Carpeted Surfaces, Svc",
              "quantity": 4,
              "note": ""
            }
          ],
          "addresses": [{
            "id": "24",
            "workorder": {
              "text": "Test",
              "value": "31"
            },
            "customer": {
              "text": "AB&I Holdings",
              "value": "1249"
            },
            "event": {
              "text": "",
              "value": ""
            },
            "address": {
              "text": "1701 Rollins Road",
              "value": "244878"
            },
            "addressDetails": "Chad Bass\nAB&I Holdings\n1701 Rollins Road\nSacramento CA 94207\nUnited States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
          }],
          "contacts": [{
            "id": "13",
            "workorder": {
              "text": "Test",
              "value": "31"
            },
            "event": {
              "text": "",
              "value": ""
            },
            "contact": {
              "text": "AB&I Holdings : Chad Bass",
              "value": "1382"
            },
            "name": "Chad Bass",
            "email": "cbass@sbi.com",
            "jobTitle": "President",
            "mobilePhone": "",
            "phone": "",
            "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
          }],
          "events": [{
              "id": "100749",
              "title": "Test",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "project": {
                "text": "AB&I Holdings : Parking Lot Construction",
                "value": "1515"
              },
              "location": "01: San Francisco",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "start": "7/25/2024",
                "end": "7/25/2024"
              },
              "time": {
                "start": "8:00 am",
                "end": "6:00 pm"
              },
              "priority": {
                "text": "Low",
                "value": "1",
                "code": "bg-secondary"
              },
              "url": "/app/crm/calendar/event.nl?id=100749&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            },
            {
              "id": "100738",
              "title": "Test",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "project": {
                "text": "AB&I Holdings : Parking Lot Construction",
                "value": "1515"
              },
              "location": "01: San Francisco",
              "status": {
                "text": "Confirmed",
                "value": "CONFIRMED",
                "code": "bg-success"
              },
              "date": {
                "start": "7/23/2024",
                "end": "7/23/2024"
              },
              "time": {
                "start": "8:00 am",
                "end": "6:00 pm"
              },
              "priority": {
                "text": "Urgent",
                "value": "4",
                "code": "bg-danger"
              },
              "url": "/app/crm/calendar/event.nl?id=100738&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            },
            {
              "id": "100723",
              "title": "Test",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "project": {
                "text": "AB&I Holdings : Parking Lot Construction",
                "value": "1515"
              },
              "location": "01: San Francisco",
              "status": {
                "text": "Confirmed",
                "value": "CONFIRMED",
                "code": "bg-success"
              },
              "date": {
                "start": "7/8/2024",
                "end": "7/8/2024"
              },
              "time": {
                "start": "8:00 am",
                "end": "6:00 pm"
              },
              "priority": {
                "text": "Urgent",
                "value": "4",
                "code": "bg-danger"
              },
              "url": "/app/crm/calendar/event.nl?id=100723&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=31&compid=TSTDRV2617106"
        }
      },
      {
        "id": "100723",
        "title": "Test",
        "start": "2024-08-08T08:00",
        "end": "2024-08-08T18:00",
        "url": "/app/crm/calendar/event.nl?id=100723&compid=TSTDRV2617106&selectedtab=custom337",
        "color": "#2f516f",
        "className": "event-class-style-name",
        "extendedProps": {
          "id": "31",
          "name": "Test",
          "title": "Test",
          "project": {
            "text": "AB&I Holdings : Parking Lot Construction",
            "value": "1515"
          },
          "date": "7/19/2024",
          "status": {
            "text": "Closed",
            "value": "3"
          },
          "type": {
            "text": "Walls",
            "value": "6"
          },
          "memo": "<p>Test</p>",
          "salesorder": {
            "text": "Sales Order #SLS00000609",
            "value": "11722"
          },
          "customer": {
            "text": "AB&I Holdings",
            "value": "1249"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": {},
          "items": [{
              "id": "24",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "Test",
                "value": "100738"
              },
              "uuid": "11722_1",
              "line": "1",
              "item": {
                "text": "4321GR",
                "value": "1015"
              },
              "description": "11 POCKET MAGAZINE RACK",
              "quantity": 2,
              "note": ""
            },
            {
              "id": "25",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "Test",
                "value": "100738"
              },
              "uuid": "11722_2",
              "line": "2",
              "item": {
                "text": "7031-0501",
                "value": "1047"
              },
              "description": "Friction Pad, Non-Carpeted Surfaces, Svc",
              "quantity": 4,
              "note": ""
            },
            {
              "id": "30",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_1",
              "line": "1",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "11 POCKET MAGAZINE RACK",
              "quantity": 2,
              "note": ""
            },
            {
              "id": "31",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_2",
              "line": "2",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "Friction Pad, Non-Carpeted Surfaces, Svc",
              "quantity": 4,
              "note": ""
            },
            {
              "id": "32",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_1",
              "line": "1",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "11 POCKET MAGAZINE RACK",
              "quantity": 2,
              "note": ""
            },
            {
              "id": "33",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_2",
              "line": "2",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "Friction Pad, Non-Carpeted Surfaces, Svc",
              "quantity": 4,
              "note": ""
            },
            {
              "id": "34",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_1",
              "line": "1",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "11 POCKET MAGAZINE RACK",
              "quantity": 2,
              "note": ""
            },
            {
              "id": "35",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "event": {
                "text": "",
                "value": ""
              },
              "uuid": "11722_2",
              "line": "2",
              "item": {
                "text": "",
                "value": ""
              },
              "description": "Friction Pad, Non-Carpeted Surfaces, Svc",
              "quantity": 4,
              "note": ""
            }
          ],
          "addresses": [{
            "id": "24",
            "workorder": {
              "text": "Test",
              "value": "31"
            },
            "customer": {
              "text": "AB&I Holdings",
              "value": "1249"
            },
            "event": {
              "text": "",
              "value": ""
            },
            "address": {
              "text": "1701 Rollins Road",
              "value": "244878"
            },
            "addressDetails": "Chad Bass\nAB&I Holdings\n1701 Rollins Road\nSacramento CA 94207\nUnited States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
          }],
          "contacts": [{
            "id": "13",
            "workorder": {
              "text": "Test",
              "value": "31"
            },
            "event": {
              "text": "",
              "value": ""
            },
            "contact": {
              "text": "AB&I Holdings : Chad Bass",
              "value": "1382"
            },
            "name": "Chad Bass",
            "email": "cbass@sbi.com",
            "jobTitle": "President",
            "mobilePhone": "",
            "phone": "",
            "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
          }],
          "events": [{
              "id": "100749",
              "title": "Test",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "project": {
                "text": "AB&I Holdings : Parking Lot Construction",
                "value": "1515"
              },
              "location": "01: San Francisco",
              "status": {
                "text": "Tentative",
                "value": "TENTATIVE",
                "code": "bg-secondary"
              },
              "date": {
                "start": "7/25/2024",
                "end": "7/25/2024"
              },
              "time": {
                "start": "8:00 am",
                "end": "6:00 pm"
              },
              "priority": {
                "text": "Low",
                "value": "1",
                "code": "bg-secondary"
              },
              "url": "/app/crm/calendar/event.nl?id=100749&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            },
            {
              "id": "100738",
              "title": "Test",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "project": {
                "text": "AB&I Holdings : Parking Lot Construction",
                "value": "1515"
              },
              "location": "01: San Francisco",
              "status": {
                "text": "Confirmed",
                "value": "CONFIRMED",
                "code": "bg-success"
              },
              "date": {
                "start": "7/23/2024",
                "end": "7/23/2024"
              },
              "time": {
                "start": "8:00 am",
                "end": "6:00 pm"
              },
              "priority": {
                "text": "Urgent",
                "value": "4",
                "code": "bg-danger"
              },
              "url": "/app/crm/calendar/event.nl?id=100738&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            },
            {
              "id": "100723",
              "title": "Test",
              "workorder": {
                "text": "Test",
                "value": "31"
              },
              "project": {
                "text": "AB&I Holdings : Parking Lot Construction",
                "value": "1515"
              },
              "location": "01: San Francisco",
              "status": {
                "text": "Confirmed",
                "value": "CONFIRMED",
                "code": "bg-success"
              },
              "date": {
                "start": "7/8/2024",
                "end": "7/8/2024"
              },
              "time": {
                "start": "8:00 am",
                "end": "6:00 pm"
              },
              "priority": {
                "text": "Urgent",
                "value": "4",
                "code": "bg-danger"
              },
              "url": "/app/crm/calendar/event.nl?id=100723&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=31&compid=TSTDRV2617106"
        }
      },
      {
        "id": "100729",
        "title": "Install Furniture",
        "start": "2024-08-23T08:00",
        "end": "2024-08-23T18:00",
        "url": "/app/crm/calendar/event.nl?id=100729&compid=TSTDRV2617106&selectedtab=custom337",
        "color": "#f98a2a",
        "className": "event-class-style-name",
        "extendedProps": {
          "id": "1",
          "name": "Install Furniture",
          "title": "Install Furniture",
          "project": {
            "text": "AB&I Holdings : Parking Lot Construction",
            "value": "1515"
          },
          "date": "7/5/2024",
          "status": {
            "text": "In Progress",
            "value": "1"
          },
          "type": {
            "text": "Demo",
            "value": "1"
          },
          "memo": "<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor. </span></p><p></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim. </span></p><p></p><p><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
          "salesorder": {
            "text": "Sales Order #SLS00000609",
            "value": "11722"
          },
          "customer": {
            "text": "AB&I Holdings",
            "value": "1249"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": {},
          "items": [{
              "id": "1",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "event": {
                "text": "Install Furniture",
                "value": "100729"
              },
              "uuid": "11722_1",
              "line": "1",
              "item": {
                "text": "4321GR",
                "value": "1015"
              },
              "description": "11 POCKET MAGAZINE RACK",
              "quantity": 2,
              "note": ""
            },
            {
              "id": "2",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "event": {
                "text": "Install Furniture",
                "value": "100729"
              },
              "uuid": "11722_3",
              "line": "3",
              "item": {
                "text": "BAG00002",
                "value": "837"
              },
              "description": "Sling Laptop Bag",
              "quantity": 10,
              "note": ""
            }
          ],
          "addresses": [{
            "id": "1",
            "workorder": {
              "text": "Install Furniture",
              "value": "1"
            },
            "customer": {
              "text": "AB&I Holdings",
              "value": "1249"
            },
            "event": {
              "text": "Install Furniture",
              "value": "100729"
            },
            "address": {
              "text": "1701 Rollins Road",
              "value": "244878"
            },
            "addressDetails": "Chad Bass\nAB&I Holdings\n1701 Rollins Road\nSacramento CA 94207\nUnited States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
          }],
          "contacts": [{
              "id": "1",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "event": {
                "text": "Install Furniture",
                "value": "100729"
              },
              "contact": {
                "text": "AB&I Holdings : Chad Bass",
                "value": "1382"
              },
              "name": "Chad Bass",
              "email": "cbass@sbi.com",
              "jobTitle": "President",
              "mobilePhone": "",
              "phone": "",
              "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
            },
            {
              "id": "15",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "event": {
                "text": "Vacation",
                "value": "18"
              },
              "contact": {
                "text": "Pravallika Desetty",
                "value": "1648"
              },
              "name": "Pravallika Desetty",
              "email": "pravallika@erpsuccesspartners.com",
              "jobTitle": "",
              "mobilePhone": "",
              "phone": "",
              "url": "/app/common/entity/contact.nl?id=1648&compid=TSTDRV2617106"
            }
          ],
          "events": [{
              "id": "100729",
              "title": "Install Furniture",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "project": {
                "text": "AB&I Holdings : Parking Lot Construction",
                "value": "1515"
              },
              "location": "01: San Francisco",
              "status": {
                "text": "Confirmed",
                "value": "CONFIRMED",
                "code": "bg-success"
              },
              "date": {
                "start": "7/23/2024",
                "end": "7/23/2024"
              },
              "time": {
                "start": "8:00 am",
                "end": "6:00 pm"
              },
              "priority": {
                "text": "Low",
                "value": "1",
                "code": "bg-secondary"
              },
              "url": "/app/crm/calendar/event.nl?id=100729&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            },
            {
              "id": "100718",
              "title": "Install Furniture",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "project": {
                "text": "AB&I Holdings : Parking Lot Construction",
                "value": "1515"
              },
              "location": "01: San Francisco",
              "status": {
                "text": "Confirmed",
                "value": "CONFIRMED",
                "code": "bg-success"
              },
              "date": {
                "start": "7/9/2024",
                "end": "7/9/2024"
              },
              "time": {
                "start": "7:00 am",
                "end": "9:00 pm"
              },
              "priority": {
                "text": "Medium",
                "value": "2",
                "code": "bg-warning"
              },
              "url": "/app/crm/calendar/event.nl?id=100718&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            },
            {
              "id": "100682",
              "title": "TEST EVENT",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "project": {
                "text": "AB&I Holdings : Lobby Remodel",
                "value": "1514"
              },
              "location": "",
              "status": {
                "text": "Confirmed",
                "value": "CONFIRMED",
                "code": "bg-success"
              },
              "date": {
                "start": "7/4/2024",
                "end": "7/4/2024"
              },
              "time": {
                "start": "10:00 pm",
                "end": "11:00 pm"
              },
              "priority": {
                "text": "Medium",
                "value": "2",
                "code": "bg-warning"
              },
              "url": "/app/crm/calendar/event.nl?id=100682&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=1&compid=TSTDRV2617106"
        }
      },
      {
        "id": "100718",
        "title": "Install Furniture",
        "start": "2024-08-09T07:00",
        "end": "2024-08-09T21:00",
        "url": "/app/crm/calendar/event.nl?id=100718&compid=TSTDRV2617106&selectedtab=custom337",
        "color": "#f6bb51",
        "className": "event-class-style-name",
        "extendedProps": {
          "id": "1",
          "name": "Install Furniture",
          "title": "Install Furniture",
          "project": {
            "text": "AB&I Holdings : Parking Lot Construction",
            "value": "1515"
          },
          "date": "7/5/2024",
          "status": {
            "text": "In Progress",
            "value": "1"
          },
          "type": {
            "text": "Demo",
            "value": "1"
          },
          "memo": "<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor. </span></p><p></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim. </span></p><p></p><p><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
          "salesorder": {
            "text": "Sales Order #SLS00000609",
            "value": "11722"
          },
          "customer": {
            "text": "AB&I Holdings",
            "value": "1249"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": {},
          "items": [{
              "id": "1",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "event": {
                "text": "Install Furniture",
                "value": "100729"
              },
              "uuid": "11722_1",
              "line": "1",
              "item": {
                "text": "4321GR",
                "value": "1015"
              },
              "description": "11 POCKET MAGAZINE RACK",
              "quantity": 2,
              "note": ""
            },
            {
              "id": "2",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "event": {
                "text": "Install Furniture",
                "value": "100729"
              },
              "uuid": "11722_3",
              "line": "3",
              "item": {
                "text": "BAG00002",
                "value": "837"
              },
              "description": "Sling Laptop Bag",
              "quantity": 10,
              "note": ""
            }
          ],
          "addresses": [{
            "id": "1",
            "workorder": {
              "text": "Install Furniture",
              "value": "1"
            },
            "customer": {
              "text": "AB&I Holdings",
              "value": "1249"
            },
            "event": {
              "text": "Install Furniture",
              "value": "100729"
            },
            "address": {
              "text": "1701 Rollins Road",
              "value": "244878"
            },
            "addressDetails": "Chad Bass\nAB&I Holdings\n1701 Rollins Road\nSacramento CA 94207\nUnited States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
          }],
          "contacts": [{
              "id": "1",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "event": {
                "text": "Install Furniture",
                "value": "100729"
              },
              "contact": {
                "text": "AB&I Holdings : Chad Bass",
                "value": "1382"
              },
              "name": "Chad Bass",
              "email": "cbass@sbi.com",
              "jobTitle": "President",
              "mobilePhone": "",
              "phone": "",
              "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
            },
            {
              "id": "15",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "event": {
                "text": "Vacation",
                "value": "18"
              },
              "contact": {
                "text": "Pravallika Desetty",
                "value": "1648"
              },
              "name": "Pravallika Desetty",
              "email": "pravallika@erpsuccesspartners.com",
              "jobTitle": "",
              "mobilePhone": "",
              "phone": "",
              "url": "/app/common/entity/contact.nl?id=1648&compid=TSTDRV2617106"
            }
          ],
          "events": [{
              "id": "100729",
              "title": "Install Furniture",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "project": {
                "text": "AB&I Holdings : Parking Lot Construction",
                "value": "1515"
              },
              "location": "01: San Francisco",
              "status": {
                "text": "Confirmed",
                "value": "CONFIRMED",
                "code": "bg-success"
              },
              "date": {
                "start": "7/23/2024",
                "end": "7/23/2024"
              },
              "time": {
                "start": "8:00 am",
                "end": "6:00 pm"
              },
              "priority": {
                "text": "Low",
                "value": "1",
                "code": "bg-secondary"
              },
              "url": "/app/crm/calendar/event.nl?id=100729&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            },
            {
              "id": "100718",
              "title": "Install Furniture",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "project": {
                "text": "AB&I Holdings : Parking Lot Construction",
                "value": "1515"
              },
              "location": "01: San Francisco",
              "status": {
                "text": "Confirmed",
                "value": "CONFIRMED",
                "code": "bg-success"
              },
              "date": {
                "start": "7/9/2024",
                "end": "7/9/2024"
              },
              "time": {
                "start": "7:00 am",
                "end": "9:00 pm"
              },
              "priority": {
                "text": "Medium",
                "value": "2",
                "code": "bg-warning"
              },
              "url": "/app/crm/calendar/event.nl?id=100718&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            },
            {
              "id": "100682",
              "title": "TEST EVENT",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "project": {
                "text": "AB&I Holdings : Lobby Remodel",
                "value": "1514"
              },
              "location": "",
              "status": {
                "text": "Confirmed",
                "value": "CONFIRMED",
                "code": "bg-success"
              },
              "date": {
                "start": "7/4/2024",
                "end": "7/4/2024"
              },
              "time": {
                "start": "10:00 pm",
                "end": "11:00 pm"
              },
              "priority": {
                "text": "Medium",
                "value": "2",
                "code": "bg-warning"
              },
              "url": "/app/crm/calendar/event.nl?id=100682&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=1&compid=TSTDRV2617106"
        }
      },
      {
        "id": "100682",
        "title": "TEST EVENT",
        "start": "2024-08-04T22:00",
        "end": "2024-08-04T23:00",
        "url": "/app/crm/calendar/event.nl?id=100682&compid=TSTDRV2617106&selectedtab=custom337",
        "color": "#7e0eb8",
        "className": "event-class-style-name",
        "extendedProps": {
          "id": "1",
          "name": "Install Furniture",
          "title": "Install Furniture",
          "project": {
            "text": "AB&I Holdings : Parking Lot Construction",
            "value": "1515"
          },
          "date": "7/5/2024",
          "status": {
            "text": "In Progress",
            "value": "1"
          },
          "type": {
            "text": "Demo",
            "value": "1"
          },
          "memo": "<p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id malesuada enim, sed fringilla turpis. Nullam sed viverra risus. Fusce maximus sapien et neque elementum, et feugiat orci efficitur. Suspendisse faucibus lacus id justo tempus tempor. </span></p><p></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Vestibulum vehicula, libero sed interdum lobortis, nisi dolor tincidunt leo, vel accumsan erat mi et justo. Proin consectetur felis semper varius viverra. Nam neque nulla, feugiat ac tempor in, aliquet sed enim. </span></p><p></p><p><strong style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">Fusce mattis, diam non tempus lacinia, diam eros semper mauris, a egestas lacus libero eget sapien. Donec convallis sit amet velit non euismod.</strong></p>",
          "salesorder": {
            "text": "Sales Order #SLS00000609",
            "value": "11722"
          },
          "customer": {
            "text": "AB&I Holdings",
            "value": "1249"
          },
          "resourceGroup": {
            "text": "",
            "value": ""
          },
          "priority": "",
          "resources": {},
          "items": [{
              "id": "1",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "event": {
                "text": "Install Furniture",
                "value": "100729"
              },
              "uuid": "11722_1",
              "line": "1",
              "item": {
                "text": "4321GR",
                "value": "1015"
              },
              "description": "11 POCKET MAGAZINE RACK",
              "quantity": 2,
              "note": ""
            },
            {
              "id": "2",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "event": {
                "text": "Install Furniture",
                "value": "100729"
              },
              "uuid": "11722_3",
              "line": "3",
              "item": {
                "text": "BAG00002",
                "value": "837"
              },
              "description": "Sling Laptop Bag",
              "quantity": 10,
              "note": ""
            }
          ],
          "addresses": [{
            "id": "1",
            "workorder": {
              "text": "Install Furniture",
              "value": "1"
            },
            "customer": {
              "text": "AB&I Holdings",
              "value": "1249"
            },
            "event": {
              "text": "Install Furniture",
              "value": "100729"
            },
            "address": {
              "text": "1701 Rollins Road",
              "value": "244878"
            },
            "addressDetails": "Chad Bass\nAB&I Holdings\n1701 Rollins Road\nSacramento CA 94207\nUnited States",
            "customerUrl": "/app/common/entity/custjob.nl?id=1249&compid=TSTDRV2617106"
          }],
          "contacts": [{
              "id": "1",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "event": {
                "text": "Install Furniture",
                "value": "100729"
              },
              "contact": {
                "text": "AB&I Holdings : Chad Bass",
                "value": "1382"
              },
              "name": "Chad Bass",
              "email": "cbass@sbi.com",
              "jobTitle": "President",
              "mobilePhone": "",
              "phone": "",
              "url": "/app/common/entity/contact.nl?id=1382&compid=TSTDRV2617106"
            },
            {
              "id": "15",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "event": {
                "text": "Vacation",
                "value": "18"
              },
              "contact": {
                "text": "Pravallika Desetty",
                "value": "1648"
              },
              "name": "Pravallika Desetty",
              "email": "pravallika@erpsuccesspartners.com",
              "jobTitle": "",
              "mobilePhone": "",
              "phone": "",
              "url": "/app/common/entity/contact.nl?id=1648&compid=TSTDRV2617106"
            }
          ],
          "events": [{
              "id": "100729",
              "title": "Install Furniture",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "project": {
                "text": "AB&I Holdings : Parking Lot Construction",
                "value": "1515"
              },
              "location": "01: San Francisco",
              "status": {
                "text": "Confirmed",
                "value": "CONFIRMED",
                "code": "bg-success"
              },
              "date": {
                "start": "7/23/2024",
                "end": "7/23/2024"
              },
              "time": {
                "start": "8:00 am",
                "end": "6:00 pm"
              },
              "priority": {
                "text": "Low",
                "value": "1",
                "code": "bg-secondary"
              },
              "url": "/app/crm/calendar/event.nl?id=100729&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            },
            {
              "id": "100718",
              "title": "Install Furniture",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "project": {
                "text": "AB&I Holdings : Parking Lot Construction",
                "value": "1515"
              },
              "location": "01: San Francisco",
              "status": {
                "text": "Confirmed",
                "value": "CONFIRMED",
                "code": "bg-success"
              },
              "date": {
                "start": "7/9/2024",
                "end": "7/9/2024"
              },
              "time": {
                "start": "7:00 am",
                "end": "9:00 pm"
              },
              "priority": {
                "text": "Medium",
                "value": "2",
                "code": "bg-warning"
              },
              "url": "/app/crm/calendar/event.nl?id=100718&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            },
            {
              "id": "100682",
              "title": "TEST EVENT",
              "workorder": {
                "text": "Install Furniture",
                "value": "1"
              },
              "project": {
                "text": "AB&I Holdings : Lobby Remodel",
                "value": "1514"
              },
              "location": "",
              "status": {
                "text": "Confirmed",
                "value": "CONFIRMED",
                "code": "bg-success"
              },
              "date": {
                "start": "7/4/2024",
                "end": "7/4/2024"
              },
              "time": {
                "start": "10:00 pm",
                "end": "11:00 pm"
              },
              "priority": {
                "text": "Medium",
                "value": "2",
                "code": "bg-warning"
              },
              "url": "/app/crm/calendar/event.nl?id=100682&compid=TSTDRV2617106&selectedtab=custom337",
              "color": "#1a6756"
            }
          ],
          "projectUrl": "/app/accounting/project/project.nl?id=1515&compid=TSTDRV2617106",
          "woUrl": "/app/common/custom/custrecordentry.nl?rectype=838&id=1&compid=TSTDRV2617106"
        }
      }
    ]
    /* for (let wo of globalVar.workOrders) {
      for (let event of wo.events) {
        events.push({
          id: event.id,
          title: event.title,
          start: moment(`${event.date.start} ${event.time.start}`).format('YYYY-MM-DDTHH:mm'),
          end: moment(`${event.date.end} ${event.time.end}`).format('YYYY-MM-DDTHH:mm'),
          url: event.url,
          color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
          class: 'event-class-style-name',
          extendedProps: wo
        })
      }
    } */
    
    // Initialize the external events
    // -----------------------------------------------------------------
    // const Draggable = FullCalendar.Draggable;
    // const containerEl = document.getElementById('rightSidebar');
    const calendarEl = document.getElementById('calendar');
  
    // new Draggable(containerEl, {
    //   itemSelector: '.card-item',
    //   eventData: (eventEl) => {
    //     // globalVar.temp_woId = eventEl.getAttribute('woId');
    //     return {
    //       title: eventEl.innerText,
    //       // woId: eventEl.getAttribute('woId')
    //     };
    //   }
    // });
    const globalVar = {};
    // Initialize the calendar
    // -----------------------------------------------------------------
    globalVar.calendar = new FullCalendar.Calendar(calendarEl, {
      // plugins: ['bootstrap'],
      // height: 650,
      height: '100%',
      themeSystem: 'bootstrap5',
      businessHours: true, // display business hours
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'today,dayGridMonth,timeGridWeek,timeGridDay,listMonth createEventBtn'
        // right: 'resourceTimelineDay,dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      initialView: 'timeGridWeek',
      editable: true,
      droppable: true, // this allows things to be dropped onto the calendar
      drop: (info) => {
        // is the "remove after drop" checkbox checked?
        console.log('drop', info);
        // if (checkbox.checked) {
        //   // if so, remove the element from the "Draggable Events" list
        //   info.draggedEl.parentNode.removeChild(info.draggedEl);
        // }
      },
  
      customButtons: {
        createEventBtn: {
          text: 'New Event',
          click: () => {
            // toggleEventModal();
            addEvent();
            // alert('test');
            // parent.window.location = '/app/crm/calendar/event.nl?bool=T&selectedtab=rstatus';
          }
        }
      },
      // dayMaxEvents: true, // when too many events in a day, show the popover
      events,
      // color: '#'+Math.floor(Math.random()*16777215).toString(16),
      // class: 'event-class-style-name',
      views: {
        resourceTimelineDay: {
          buttonText: 'Resources',
          slotDuration: '00:15'
        },
        resourceTimelineTenDay: {
          type: 'resourceTimeline',
          duration: { days: 10 },
          buttonText: '10 days'
        }
      },
      // ,eventColor: '#378006'
      // eventDidMount: (info) => {
      //   alert('TEST')
      //   // const tooltip = new Tooltip(info.el, {
      //   //   title: info.event.extendedProps.custfield + '&nbsp;<br>&nbsp;',
      //   //   content: 'dsad',
      //   //   placement: 'top',
      //   //   trigger: 'hover',
      //   //   container: 'body'
      //   // })
      // },
      eventMouseEnter: (info) => {
        // console.log(info);
        // const tis = info.el;
        // const event = info.event;
        // let desc = `<strong>Project:</strong> <i>Project XYZ</i><br/><br/>`;
        // desc += '<strong>Schedule Details:<br/></strong>';
        // desc += `Start: <i>${moment(event.start).format('YYYY-MM-DD hh:mma')}</i><br/>End: <i>${moment(event.end).format('YYYY-MM-DD hh:mma')}</i><br/><br/>`;
        // desc += `<strong>Duration:</strong> <i>-- days -- hours -- mins</i>`
        // showToolTip(info.el, event.title, desc);
      },
      eventMouseLeave: (info) => {
        // $('.tooltipevent').remove();
      },
      // resourceAreaHeaderContent: 'Resources',
      // resourceOrder: '-type2,type1',
      // resources: [
      //   {
      //     id: 'A',
      //     title: 'Resource A',
      //     type1: 10,
      //     type2: 55
      //   },
      //   {
      //     id: 'B',
      //     title: 'Resource B',
      //     type1: 12,
      //     type2: 60
      //   },
      //   {
      //     id: 'C',
      //     title: 'Resource C',
      //     type1: 12,
      //     type2: 50,
      //     children: [{
      //       id: "d1",
      //       title: "Room D1"
      //     }, {
      //       id: "d2",
      //       title: "Room D2"
      //     }]
      //   }
      // ],
      eventClick: (event) => {
        console.log('eventClick', event);
        if (event.event.url) {
          event.jsEvent.preventDefault();
          window.open(event.event.url, "_blank");
        }
      },
      eventReceive: (info) => {
        // $('#modalTitle').html(event.title);
        //       $('#modalBody').html(event.description);
        //       $('#eventUrl').attr('href',event.url);
        // const woId = info.event.extendedProps.woId;
        console.log('eventReceive', info);
        globalVar.draggedItem = info;
        const defId = info.event._def.defId;
        globalVar.temp_eventId = defId;
        // info.event.setProp('id', defId);
        // console.log('Event Receive', info);
        // $('#event-modal').attr('woId', woId);
        // $('#event-modal').attr('event-id', defId);
        // toggleEventModal();
        addEvent();
        // info.event.remove();
        // return confirm('TEST?');
        // if (draggedEvent.id === '999') {
        //   return dropInfo.start < new Date(2016, 0, 1); // a boolean
        // }
        // else {
        //   return true;
        // }
      },
      windowResize: function(arg) {
        // alert('The calendar has adjusted to a window resize. Current view: ' + arg.view.type);
      }
    });
    // calendar.setOption('height', 700);
    globalVar.calendar.render();
  
    const filterResourceSelect = `<div style="margin-left: 5px">
    <select class="selectpicker mx-auto multiple-resource-field" title="Filter by Name" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
      <option value="1">XYZ</option>
      <option value="1">XYZ</option>
      <option value="1">XYZ</option>
      <option value="1">XYZ</option>
      <option value="1">XYZ</option>
    </select></div>`;
    const filterResourceGrpSelect = `<div style="margin-left: 5px">
    <select class="selectpicker mx-auto multiple-resource-group-field" title="Filter by Group" id="" data-live-search="true" data-selected-text-format="count>2" data-style="" data-style-base="form-control" data-actions-box="true" multiple>
      <option value="2">XYZ GROUP</option>
      <option value="2">XYZ GROUP</option>
      <option value="2">XYZ GROUP</option>
    </select></div>`;
    $(filterResourceSelect+filterResourceGrpSelect).insertAfter('.fc-next-button');
  }