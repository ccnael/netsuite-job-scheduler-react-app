
import { suiteletUrl } from '@/lib/constants';
import { isLocalDevelopment } from '@/lib/helpers';
import { type Event } from "@/api/event";

export interface PunchItem {
  status: {
    text: string;
    value: string | number;
  };
  reason: string;
  description: string;
  resolution: string;
  dateCreated: string;
  enteredBy: string;
  salesorder: {
    text: string;
    value: string | number;
  }
}

export const getMockPunchItems = (): PunchItem[] => {
  return [{
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "Damaged Product",
      "description": "",
      "resolution": "Product\r\n12345",
      "dateCreated": "8/6/2024 6:12 am",
      "enteredBy": "Lean Cendaña",
      "salesorder": {
        "text": "Sales Order #SLS00000655",
        "value": "16212"
      }
    },
    {
      "status": {
        "text": "Resolved",
        "value": "6"
      },
      "reason": "Wrong Product",
      "description": "Item\r\nABC",
      "resolution": "Test\r\nXYZ",
      "dateCreated": "8/6/2024 6:38 am",
      "enteredBy": "Lean Cendaña",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Resolved",
        "value": "6"
      },
      "reason": "Not Installed",
      "description": "Description ABC",
      "resolution": "Resolution 1\r\nResolution 2",
      "dateCreated": "8/6/2024 6:39 am",
      "enteredBy": "Lean Cendaña",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Resolved",
        "value": "6"
      },
      "reason": "Missing Product",
      "description": "",
      "resolution": "IDK",
      "dateCreated": "9/26/2024 8:51 am",
      "enteredBy": "Lean Cendaña",
      "salesorder": {
        "text": "Sales Order #SLS00000713",
        "value": "19372"
      }
    },
    {
      "status": {
        "text": "Resolved",
        "value": "6"
      },
      "reason": "Wrong Product",
      "description": "TEST",
      "resolution": "TEST",
      "dateCreated": "10/30/2024 4:36 am",
      "enteredBy": "Lean Cendaña",
      "salesorder": {
        "text": "Sales Order #SLS00000739",
        "value": "19521"
      }
    },
    {
      "status": {
        "text": "In Process",
        "value": "3"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/6/2024 7:49 am",
      "enteredBy": "Mei Matriano",
      "salesorder": {
        "text": "Sales Order #SLS00000755",
        "value": "20872"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/6/2024 8:13 am",
      "enteredBy": "Mei Matriano",
      "salesorder": {
        "text": "Sales Order #SLS00000755",
        "value": "20872"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/6/2024 8:16 am",
      "enteredBy": "Mei Matriano",
      "salesorder": {
        "text": "Sales Order #SLS00000755",
        "value": "20872"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/7/2024 4:14 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": " ",
        "value": ""
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/7/2024 12:48 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": " ",
        "value": ""
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/7/2024 12:52 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": " ",
        "value": ""
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/10/2024 11:43 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": " ",
        "value": ""
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/10/2024 11:43 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": " ",
        "value": ""
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/11/2024 12:10 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/11/2024 5:30 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/11/2024 5:54 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/11/2024 5:54 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/11/2024 5:43 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/11/2024 5:43 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/11/2024 6:00 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/11/2024 6:00 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/11/2024 7:48 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/11/2024 7:48 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/11/2024 8:49 am",
      "enteredBy": "Mei Matriano",
      "salesorder": {
        "text": "Sales Order #SLS00000770",
        "value": "20899"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/11/2024 9:42 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/11/2024 9:42 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/11/2024 9:42 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/11/2024 12:54 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000778",
        "value": "20907"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/11/2024 11:09 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/12/2024 4:07 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000781",
        "value": "20911"
      }
    },
    {
      "status": {
        "text": "Resolved",
        "value": "6"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/12/2024 6:52 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000783",
        "value": "20915"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/12/2024 1:21 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000785",
        "value": "20917"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 2:17 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 2:17 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 2:17 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 3:02 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 6:00 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 6:00 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 6:00 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 6:11 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 6:11 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 6:11 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 8:37 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000785",
        "value": "20917"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 10:08 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 10:08 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 10:26 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 10:26 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 10:49 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 10:49 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 10:57 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 10:57 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 11:32 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/13/2024 11:32 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/14/2024 12:00 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/14/2024 12:00 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/14/2024 12:06 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/14/2024 12:06 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/14/2024 12:11 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/14/2024 12:11 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/14/2024 1:50 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/14/2024 1:50 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000654",
        "value": "16211"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/14/2024 2:22 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/14/2024 2:22 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/14/2024 2:22 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/14/2024 2:22 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "11/14/2024 2:22 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "12/2/2024 10:37 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "12/2/2024 10:37 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "1/14/2025 2:36 am",
      "enteredBy": "Lean Cendaña",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "1/14/2025 2:38 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "1/14/2025 5:04 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/5/2025 3:05 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/5/2025 3:05 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/5/2025 4:00 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/5/2025 4:00 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/7/2025 4:03 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/7/2025 4:42 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/7/2025 4:42 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/7/2025 4:16 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/7/2025 4:22 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/7/2025 4:35 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/7/2025 4:47 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/10/2025 8:11 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/12/2025 5:42 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/12/2025 5:44 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/12/2025 7:12 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/12/2025 7:14 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/12/2025 11:27 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/12/2025 11:28 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Resolved",
        "value": "6"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/27/2025 5:56 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000826",
        "value": "23471"
      }
    },
    {
      "status": {
        "text": "Resolved",
        "value": "6"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "2/27/2025 5:56 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000826",
        "value": "23471"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "3/3/2025 2:38 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "3/3/2025 2:38 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "3/5/2025 3:02 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "3/5/2025 6:35 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000826",
        "value": "23471"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "3/5/2025 6:38 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000826",
        "value": "23471"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "3/10/2025 12:12 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "3/10/2025 12:12 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "3/10/2025 12:14 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "3/10/2025 8:53 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "3/10/2025 8:59 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "3/10/2025 8:59 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "3/10/2025 11:26 pm",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "3/14/2025 3:29 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "3/17/2025 5:51 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "3/17/2025 9:00 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "3/24/2025 3:09 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "4/4/2025 7:43 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "",
      "description": "",
      "resolution": "",
      "dateCreated": "4/4/2025 7:45 am",
      "enteredBy": "Arun Sharma",
      "salesorder": {
        "text": "Sales Order #SLS00000609",
        "value": "11722"
      }
    },
    {
      "status": {
        "text": "In Process",
        "value": "3"
      },
      "reason": "Missing Product",
      "description": "TEST\r\nXYZ",
      "resolution": "Find the product\r\nFind the item",
      "dateCreated": "7/8/2025 11:21 am",
      "enteredBy": "Lean Cendaña",
      "salesorder": {
        "text": "Sales Order #SLS00000836",
        "value": "24428"
      }
    },
    {
      "status": {
        "text": "Not Started",
        "value": "2"
      },
      "reason": "Wrong Product",
      "description": "Wrong product\r\nWrong product",
      "resolution": "Wrong product\r\nWrong product",
      "dateCreated": "7/8/2025 11:22 am",
      "enteredBy": "Lean Cendaña",
      "salesorder": {
        "text": "Sales Order #SLS00000836",
        "value": "24428"
      }
    },
    {
      "status": {
        "text": "Resolved",
        "value": "6"
      },
      "reason": "Damaged Product",
      "description": "123\r\n123",
      "resolution": "XXXXXXX\r\nXXXXXXX",
      "dateCreated": "7/8/2025 11:23 am",
      "enteredBy": "Lean Cendaña",
      "salesorder": {
        "text": "Sales Order #SLS00000836",
        "value": "24428"
      }
    }
  ];
};

export const fetchPunchItems = async (soId: string): Promise<PunchItem[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock punch item data for local development');
    return new Promise((resolve) => {
      setTimeout(() => resolve(soId ? getMockPunchItems().filter(x => x.salesorder.value == soId) : getMockPunchItems()), 500);
    });
  }

  try {
    const url = `${suiteletUrl}&mode=getPunchItems&soId=${soId}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch punch items: ${response.status}`);
    }

    const items = await response.json();
    console.log(`Finished chunked fetch. Total punch item records collected: ${items.length}`);
    
    if (items.length === 0) {
      console.error("API returned no punch item data across all chunks");
      throw new Error("No punch item data returned from API");
    }

    return items;
  } catch (error) {
    console.error('Error fetching punch items:', error);
    throw error;
  }
};

export const completeEvent = async (eventData: Event, timeSheets: any, items: any, ): Promise<Event> => {
  if (isLocalDevelopment()) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockEvent = eventData;
        if (mockEvent) {
          resolve({ ...mockEvent });
        } else {
          throw new Error('Event not found');
        }
      }, 300);
    });
  }

  try {
    const url = `${suiteletUrl}&mode=completeEvent`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventData,
        timeSheets,
        items,
      })
    });

    console.log('Complete event RESPONSE:', response);

    if (!response.ok) {
      throw new Error(`Failed to complete event: ${response.status}`);
    }

    const completedEvent = await response.json();
    console.log('Complete event RESULT:', completedEvent);

    return completedEvent;
  } catch (error) {
    console.error('Error completing event:', error);
    throw error;
  }
};