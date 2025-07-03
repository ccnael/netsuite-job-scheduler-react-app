
import { suiteletUrl } from '@/lib/constants';
import { isLocalDevelopment } from '@/lib/helpers';

export interface RoutingGroup {
  id: string;
  name: string;
}

export const getMockRoutingGroups = (): RoutingGroup[] => {
  return [{
    "name": "Group A",
    "id": "1"
  }, {
    "name": "Group B",
    "id": "2"
  }, {
    "name": "Group C",
    "id": "3"
  }, {
    "name": "Group D",
    "id": "4"
  }/* , {
    "name": "Group E",
    "id": "5"
  }, {
    "name": "Group F",
    "id": "6"
  }, {
    "name": "Group G",
    "id": "7"
  }, {
    "name": "Group H",
    "id": "8"
  }, {
    "name": "Group I",
    "id": "9"
  }, {
    "name": "Group J",
    "id": "10"
  }, {
    "name": "Group K",
    "id": "11"
  } */]
};

export const fetchRoutingGroups = async (): Promise<RoutingGroup[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock routing group data for local development');
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMockRoutingGroups()), 500);
    });
  }

  try {
    let allData: RoutingGroup[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&mode=getRoutingGroups&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`Routing Group service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch routing groups chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`Routing Group service RESULT chunk ${i + 1}:`, chunkData);
      
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
    
    console.log(`Finished chunked fetch. Total routing group records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no employee data across all chunks");
      throw new Error("No routing group data returned from API");
    }

    return allData;
  } catch (error) {
    console.error('Error fetching routing groups:', error);
    throw error;
  }
};
