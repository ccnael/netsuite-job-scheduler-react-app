
import { useState, useEffect } from 'react';
import { Board } from "@/components/Board";
import { fetchEmployees, type Employee } from '@/api/employee';
import { fetchVendors, type Vendor } from '@/api/vendor';
import { fetchAssets, type Asset } from '@/api/asset';
import { toast } from "sonner";

const Index = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        setIsLoading(true);
        const [employeeData, vendorData, assetData] = await Promise.all([
          fetchEmployees(),
          fetchVendors(),
          fetchAssets()
        ]);

        setEmployees(employeeData || []);
        setVendors(vendorData || []);
        setAssets(assetData || []);
        console.log('Index: Loaded employees:', employeeData);
        console.log('Index: Loaded vendors:', vendorData);
        console.log('Index: Loaded assets:', assetData);
      } catch (error) {
        console.error('Index: Failed to load resources:', error);
        toast.error('Failed to load resource data');
        setEmployees([]);
        setVendors([]);
        setAssets([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadResources();
  }, []);

  return (
    <Board 
      employees={employees}
      vendors={vendors}
      assets={assets}
      isResourcesLoading={isLoading}
    />
  );
};

export default Index;
