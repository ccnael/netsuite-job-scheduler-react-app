import { suiteletUrl } from '@/lib/constants';

export interface Employee {
  employee: {
    text: string;
    value: string;
  };
  initials: string;
  email: string;
  phone: string;
  location: {
    text: string;
    value: string;
  };
  active: boolean;
  resourceGroups: Array<{
    text: string;
    value: string;
  }>;
  types: Array<{
    text: string;
    value: string;
  }>;
  color: string;
  url: string;
  events: string[];
}

const getMockEmployees = (): Employee[] => {
  return [
    {
      "employee": {
        "text": "Arun Sharma",
        "value": "1770"
      },
      "initials": "AS",
      "email": "aruns.unlock2go@gmail.com",
      "phone": "",
      "location": {
        "text": "",
        "value": ""
      },
      "active": true,
      "resourceGroups": [
        {
          "text": "Designers",
          "value": "2"
        },
        {
          "text": "Drivers",
          "value": "3"
        },
        {
          "text": "Installers",
          "value": "1"
        }
      ],
      "types": [
        {
          "text": "Delivery Driver",
          "value": "2"
        },
        {
          "text": "Designer",
          "value": "3"
        },
        {
          "text": "Installer",
          "value": "1"
        }
      ],
      "color": "#abb933",
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fcompid%3DTSTDRV2617106%26selectedtab%3Dcustom336",
      "events": []
    },
    {
      "employee": {
        "text": "Bea Dashboards",
        "value": "1767"
      },
      "initials": "BD",
      "email": "beatrice.q@erpsuccesspartners.com",
      "phone": "",
      "location": {
        "text": "01: San Francisco",
        "value": "2"
      },
      "active": true,
      "resourceGroups": [
        {
          "text": "Designers",
          "value": "2"
        },
        {
          "text": "Drivers",
          "value": "3"
        },
        {
          "text": "Installers",
          "value": "1"
        }
      ],
      "types": [
        {
          "text": "Delivery Driver",
          "value": "2"
        },
        {
          "text": "Designer",
          "value": "3"
        },
        {
          "text": "Installer",
          "value": "1"
        }
      ],
      "color": "#daade3",
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fcompid%3DTSTDRV2617106%26selectedtab%3Dcustom336",
      "events": [
        "100921"
      ]
    },
    {
      "employee": {
        "text": "Gary Grant",
        "value": "1312"
      },
      "initials": "GG",
      "email": "garygrant@ramsey.com",
      "phone": "(873) 775-6114",
      "location": {
        "text": "02: Boston",
        "value": "1"
      },
      "active": true,
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
      "color": "#ae9500",
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fcompid%3DTSTDRV2617106%26selectedtab%3Dcustom336",
      "events": []
    },
    {
      "employee": {
        "text": "Mei Matriano",
        "value": "1647"
      },
      "initials": "MM",
      "email": "mei@erpsuccesspartners.com",
      "phone": "",
      "location": {
        "text": "",
        "value": ""
      },
      "active": true,
      "resourceGroups": [
        {
          "text": "Designers",
          "value": "2"
        }
      ],
      "types": [
        {
          "text": "Installer",
          "value": "1"
        }
      ],
      "color": "#54c5ca",
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fcompid%3DTSTDRV2617106%26selectedtab%3Dcustom336",
      "events": [
        "100847",
        "100875"
      ]
    },
    {
      "employee": {
        "text": "Youssef Ezz",
        "value": "1656"
      },
      "initials": "YE",
      "email": "yk@erpsuccesspartners.com",
      "phone": "",
      "location": {
        "text": "",
        "value": ""
      },
      "active": true,
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
      "color": "#844c53",
      "url": "%2Fapp%2Fcommon%2Fentity%2Femployee.nl%3Fcompid%3DTSTDRV2617106%26selectedtab%3Dcustom336",
      "events": [
        "100921"
      ]
    }
  ];
};

const isLocalDevelopment = (): boolean => {
  return import.meta.env.DEV || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
};

export const fetchEmployees = async (): Promise<Employee[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock employee data for local development');
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMockEmployees()), 500);
    });
  }

  try {
    let allData: Employee[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&mode=getEmployees&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`Employee service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch employees chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`Employee service RESULT chunk ${i + 1}:`, chunkData);
      
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
    
    console.log(`Finished chunked fetch. Total employee records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no employee data across all chunks");
      throw new Error("No employee data returned from API");
    }

    return allData;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};
