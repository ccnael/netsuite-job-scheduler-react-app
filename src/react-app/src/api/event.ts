
import { suiteletUrl } from '@/lib/constants';

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
  woRef?: any;
  resources?: any[];
  vendors?: any[];
  assets?: any[];
  items?: any[];
  unassigned?: boolean;
  contacts?: any[];
  addresses?: any[];
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
}

const getMockEvents = (): Event[] => {
  return [
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
              "6/19/2025"
          ],
          "start": "2025-06-19",
          "end": "2025-06-19"
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
      "contacts": [],
      "addresses": [],
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
      "assetMaintenance": false
    }
  ];
};

const isLocalDevelopment = (): boolean => {
  return import.meta.env.DEV || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
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
