import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchEvents, type Event } from '@/api/event';
import { fetchEmployees, type Employee } from '@/api/employee';
import { fetchVendors, type Vendor } from '@/api/vendor';
import { fetchAssets, type Asset } from '@/api/asset';
import { fetchWOResources, type WOResource } from '@/api/woResource';
import { fetchWOVendors, type WOVendor } from '@/api/woVendor';
import { fetchWOAssets, type WOAsset } from '@/api/woAsset';
import { fetchWorkOrders, type WorkOrder } from '@/api/workOrder';
import { fetchWOItems, type WOItem } from '@/api/woItem';
import { fetchWOContacts, type WOContact } from '@/api/woContact';
import { fetchWOAddresses, type WOAddress } from '@/api/woAddress';

interface DataContextType {
  events: Event[];
  employees: Employee[];
  vendors: Vendor[];
  assets: Asset[];
  workOrders: WorkOrder[];
  woResources: WOResource[];
  woVendors: WOVendor[];
  woAssets: WOAsset[];
  woItems: WOItem[];
  woContacts: WOContact[];
  woAddresses: WOAddress[];
  isLoading: boolean;
  loadingError: string | null;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [woResources, setWoResources] = useState<WOResource[]>([]);
  const [woVendors, setWoVendors] = useState<WOVendor[]>([]);
  const [woAssets, setWoAssets] = useState<WOAsset[]>([]);
  const [woItems, setWoItems] = useState<WOItem[]>([]);
  const [woContacts, setWoContacts] = useState<WOContact[]>([]);
  const [woAddresses, setWoAddresses] = useState<WOAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setLoadingError(null);

      const [
        eventData,
        employeeData,
        vendorData,
        assetData,
        workOrderData,
        woResourceData,
        woVendorData,
        woAssetData,
        woItemData,
        woContactData,
        woAddressData
      ] = await Promise.all([
        fetchEvents().catch(() => []),
        fetchEmployees().catch(() => []),
        fetchVendors().catch(() => []),
        fetchAssets().catch(() => []),
        fetchWorkOrders().catch(() => []),
        fetchWOResources('', '').catch(() => []),
        fetchWOVendors('', '').catch(() => []),
        fetchWOAssets('', '').catch(() => []),
        fetchWOItems('', '').catch(() => []),
        fetchWOContacts('', '').catch(() => []),
        fetchWOAddresses('', '').catch(() => [])
      ]);

      // Process relationships between data
      for (const resource of woResourceData) {
        const event = eventData.find(e => e.id === resource.event);
        if (event) {
          event.resources = event.resources || [];
          event.resources.push({ ...resource });
        }
      }

      for (const vendor of woVendorData) {
        const event = eventData.find(e => e.id === vendor.event);
        if (event) {
          event.vendors = event.vendors || [];
          event.vendors.push({ ...vendor });
        }
      }

      for (const asset of woAssetData) {
        const event = eventData.find(e => e.id === asset.event);
        if (event) {
          event.assets = event.assets || [];
          event.assets.push({ ...asset });
        }
      }

      for (const event of eventData) {
        const wo = workOrderData.find(e => e.id === event.workorder.value);
        if (wo) {
          event.woRef = { ...wo };
        }
      }

      for (const item of woItemData) {
        const event = eventData.find(e => e.id === item.event);
        if (event) {
          event.items.push({ ...item });
        }
      }

      for (const contact of woContactData) {
        const event = eventData.find(e => contact.event.includes(e.id));
        if (event) {
          event.contacts.push({ ...contact });
        }
      }

      for (const address of woAddressData) {
        const event = eventData.find(e => address.events.includes(e.id));
        if (event) {
          event.address = {
            value: address.id,
            text: address.customer.text
          };
          event.addresses = event.addresses || [];
          event.addresses.push({ ...address });
        }
      }

      setEvents(eventData);
      setEmployees(employeeData);
      setVendors(vendorData);
      setAssets(assetData);
      setWorkOrders(workOrderData);
      setWoResources(woResourceData);
      setWoVendors(woVendorData);
      setWoAssets(woAssetData);
      setWoItems(woItemData);
      setWoContacts(woContactData);
      setWoAddresses(woAddressData);
    } catch (error) {
      console.error('Failed to load data:', error);
      setLoadingError('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshData = async () => {
    await loadData();
  };

  const value: DataContextType = {
    events,
    employees,
    vendors,
    assets,
    workOrders,
    woResources,
    woVendors,
    woAssets,
    woItems,
    woContacts,
    woAddresses,
    isLoading,
    loadingError,
    refreshData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};