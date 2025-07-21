
import { suiteletUrl } from '@/lib/constants';
import { isLocalDevelopment } from '@/lib/helpers';

export interface Location {
  id: string;
  name: string;
}

export const getMockLocations = (): Location[] => {
  return [{
    "name": "Location A",
    "id": "1"
  }, {
    "name": "Location B",
    "id": "2"
  }, {
    "name": "Location C",
    "id": "3"
  }, {
    "name": "Location D",
    "id": "4"
  } , /*{
    "name": "Location E",
    "id": "5"
  }, {
    "name": "Location F",
    "id": "6"
  }, {
    "name": "Location G",
    "id": "7"
  }, {
    "name": "Location H",
    "id": "8"
  }, {
    "name": "Location I",
    "id": "9"
  }, {
    "name": "Location J",
    "id": "10"
  }, {
    "name": "Location K",
    "id": "11"
  }, */{
    "name": "Atlanta",
    "id": "888"
  }, {
    "name": "02: Boston",
    "id": "9999"
  }]
};

export const fetchLocations = async (): Promise<Location[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock Location data for local development');
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMockLocations()), 500);
    });
  }

  try {
    let allData: Location[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&mode=getLocations&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`Location service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Locations chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`Location service RESULT chunk ${i + 1}:`, chunkData);
      
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
    
    console.log(`Finished chunked fetch. Total Location records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no Location data across all chunks");
      throw new Error("No Location data returned from API");
    }

    return allData;
  } catch (error) {
    console.error('Error fetching Locations:', error);
    throw error;
  }
};
