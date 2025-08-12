
import { suiteletUrl } from '@/lib/constants';
import { isLocalDevelopment } from '@/lib/helpers';

export interface Customer {
  id: string;
  name: string;
}

export const getMockCustomers = (): Customer[] => {
  return [{
    "name": "Customer A",
    "id": "1"
  }, {
    "name": "Customer B",
    "id": "2"
  }, {
    "name": "Customer C",
    "id": "3"
  }, {
    "name": "Customer D",
    "id": "4"
  },/* , {
    "name": "Customer E",
    "id": "5"
  }, {
    "name": "Customer F",
    "id": "6"
  }, {
    "name": "Customer G",
    "id": "7"
  }, {
    "name": "Customer H",
    "id": "8"
  }, {
    "name": "Customer I",
    "id": "9"
  }, {
    "name": "Customer J",
    "id": "10"
  }, {
    "name": "Customer K",
    "id": "11"
  } */{
    "name": "World Bank",
    "id": "999"
  }]
};

export const fetchCustomers = async (): Promise<Customer[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock customer data for local development');
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMockCustomers()), 500);
    });
  }

  try {
    let allData: Customer[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&mode=getCustomers&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`Customer service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch Customers chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`Customer service RESULT chunk ${i + 1}:`, chunkData);
      
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
    
    console.log(`Finished chunked fetch. Total Customer records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no Customer data across all chunks");
      throw new Error("No Customer data returned from API");
    }

    return allData;
  } catch (error) {
    console.error('Error fetching Customers:', error);
    throw error;
  }
};
