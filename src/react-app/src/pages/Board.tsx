import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../components/Card';
import { Resources } from '../components/Resources';
import { fetchEvents, removeEvent, type Event } from '@/api/event';
import { fetchEmployees, type Employee } from '@/api/employee';
import { fetchVendors, type Vendor } from '@/api/vendor';
import { fetchAssets, type Asset } from '@/api/asset';
import { fetchWOResources, type WOResource } from '@/api/woResource';
import { fetchWOVendors, type WOVendor } from '@/api/woVendor';
import { fetchWOAssets, type WOAsset } from '@/api/woAsset';
import { fetchWorkOrders, type WorkOrder } from '@/api/workOrder';
import { fetchWOItems } from "@/api/woItem";
import { fetchWOContacts } from "@/api/woContact";
import { fetchWOAddresses } from "@/api/woAddress";
import { fetchRoutingGroups, type RoutingGroup } from '@/api/routingGroup';
import { fetchCustomers, type Customer } from "@/api/customer";
import { fetchLocations, type Location } from "@/api/location";
import { toast } from "sonner";
import { format, parse } from "date-fns";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import MultiSelectFilter from '../components/forms/MultiSelectFilter';
import { Option } from '@/components/ui-custom/MultiSelect';
import { ChevronRight, Filter, Bot, ClipboardCheck, Calendar, Plus, Search, Users, X } from "lucide-react";
import DateRangeFilter from '../components/forms/DateRangeFilter';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Stars } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateEvent } from '../components/forms/CreateEvent';
import { UpdateEvent } from '../components/forms/UpdateEvent';
import { CompleteEvent } from '../components/forms/CompleteEvent';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader, Loader2, CheckCircle } from "lucide-react";
import { Tooltip } from 'react-tooltip';
import { receiptStatuses, eventStatuses, eventPriorities, eventTypes } from "@/lib/constants";

interface EventFilterState {
  statuses: string[];
  eventId: string;
  resourceNames: string[];
  resourceGroups: string[];
  priorities: string[];
  eventTypes: string[];
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  organizers: string[];
  receiptStatuses: string[];
  routingGroups: string[];
}

interface JobFilterState {
  statuses: string[];
  woId: string;
  title: string;
  resourceNames: string[];
  resourceGroups: string[];
  priorities: string[];
  eventTypes: string[];
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  organizers: string[];
  receiptStatuses: string[];
  routingGroups: string[];
  customers: string[];
  locations: string[];
}

export interface Status {
  text:  string;
  value: string;
  code:  string;
}

export interface ReceiptStatus {
  text: string;
  value: string;
  code?: string;
  display?: string; // Keep display optional
}

interface Job {
  id: string;
  title: string;
  description: string;
  memo: string;
  status: Status;
  type: string;
  date: string;
  customer: string;
  location: string;
  project: string;
  salesOrder: string;
  estHours: number;
  woUrl?: string;
  soUrl?: string;
  projectUrl?: string;
  customerUrl?: string;
  workOrder?: WorkOrder;
  receiptStatus: ReceiptStatus;
  projectInsight: {
    text: string;
    value: string;
  }
}

interface SelectedResource {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  woResourceId?: string;
}

interface SelectedVendor {
  id: string;
  name: string;
  quantityRequired: number;
  memo: string;
  woVendorId?: string;
}

interface SelectedAsset {
  id: string;
  name: string;
  quantity: number;
  startTime: string;
  endTime: string;
}

interface SelectedItem {
  id: string;
  name: string;
  quantity: number;
}

interface SelectedContact {
  id: string;
  name: string;
}

interface SelectedAddress {
  id: string;
  name: string;
}

interface EventFormData {
  eventTitle: string;
  notes: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status: string;
  priority: string;
  allDay: boolean;
  routingGroup: string;
  selectedResources: SelectedResource[];
  selectedVendors: SelectedVendor[];
  selectedAssets: SelectedAsset[];
  selectedItems: SelectedItem[];
  selectedContacts: SelectedContact[];
  selectedAddress: SelectedAddress | null;
}

const Board = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [woResources, setWoResources] = useState<WOResource[]>([]);
  const [woVendors, setWoVendors] = useState<WOVendor[]>([]);
  const [woAssets, setWoAssets] = useState<WOAsset[]>([]);
  const [routingGroups, setRoutingGroups] = useState<RoutingGroup[]>([]);
  const [routingGroupsLoaded, setRoutingGroupsLoaded] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersLoaded, setCustomersLoaded] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationsLoaded, setLocationsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  const loadAllData = useCallback(async () => {
    try {
      setIsLoading(true);

      const [
        eventData,
        workOrderData,
        employeeData,
        vendorData,
        assetData,
        woResourceData,
        woVendorData,
        woAssetData,
        woItemData,
        woContactData,
        woAddressData
      ] = await Promise.all([
        fetchEvents().catch(() => []),
        fetchWorkOrders().catch(() => []),
        fetchEmployees().catch(() => []),
        fetchVendors().catch(() => []),
        fetchAssets().catch(() => []),
        fetchWOResources('', '').catch(() => []),
        fetchWOVendors('', '').catch(() => []),
        fetchWOAssets('', '').catch(() => []),
        fetchWOItems('', '').catch(() => []),
        fetchWOContacts('', '').catch(() => []),
        fetchWOAddresses('', '').catch(() => [])
      ]);

        for (const resource of woResourceData) {
          const event = eventData.find(e => e.id === resource.event);
          if (event) {
            event.resources = event.resources || [];
            event.resources.push({
              ...resource
            });
          }
        }

        for (const vendor of woVendorData) {
          const event = eventData.find(e => e.id === vendor.event);
          if (event) {
            event.vendors = event.vendors || [];
            event.vendors.push({
              ...vendor
            });
          }
        }

        for (const asset of woAssetData) {
          const event = eventData.find(e => e.id === asset.event);
          if (event) {
            event.assets = event.assets || [];
            event.assets.push({
              ...asset
            });
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
            event.addresses.push({
              ...address
            });
          }
        }

        const jobsData = (workOrderData || []).map((wo: WorkOrder): Job => ({
          id: wo.id,
          title: wo.title || 'Untitled Work Order',
          description: wo.description || 'No description',
          memo: wo.memo,
          status: {
            text: wo.status?.text ?? '',
            value: wo.status?.value ?? '',
            code: wo.status?.code ?? ''
          },
          type: wo.type.text || '',
          date: wo.date || new Date().toLocaleDateString(),
          customer: wo.customer.text,
          location: wo.location.text,
          project: wo.project.text,
          salesOrder: wo.salesorder.text,
          estHours: +wo.esthours,
          woUrl: wo.woUrl,
          soUrl: wo.soUrl,
          projectUrl: wo.projectUrl,
          workOrder: wo,
          receiptStatus: wo.receiptStatus || { text: '', value: '' },
          projectInsight: wo.projectInsight
        }));

        setEvents(eventData);
        setEmployees(employeeData);
        setVendors(vendorData);
        setAssets(assetData);
        setJobs(jobsData);
        setWoResources(woResourceData);
        setWoVendors(woVendorData);
        setWoAssets(woAssetData);
      } catch (error) {
        console.error('Board: Failed to load data:', error);
        toast.error('Failed to load board data', {
          position: "top-right",
          className: "!bg-red-100 !text-red-800 !border !border-red-300",
        });
      } finally {
        setIsLoading(false);
      }
    }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCompleteEventModalOpen, setIsCompleteEventModalOpen] = useState(false);
  const [selectedEventForUpdate, setSelectedEventForUpdate] = useState<Event | null>(null);
  const [selectedEventForComplete, setSelectedEventForComplete] = useState<Event | null>(null);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [selectedEventForRemove, setSelectedEventForRemove] = useState<Event | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveEvent = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default AlertDialogAction behavior
    
    if (!selectedEventForRemove) return;

    try {
      setIsRemoving(true);
      await removeEvent(selectedEventForRemove);
      
      // Reload events like in CreateEvent
      await loadAllData();
      
      toast.custom((id) => (
        <div
          data-sonner-rounded-toast
          className="flex items-start gap-3 w-full max-w-xl bg-green-100 text-green-800 border border-green-300 px-4 py-3 rounded-md"
        >
          <CheckCircle className="h-5 w-5 mt-0.5 text-green-700 shrink-0" />
          <div className="flex-1 text-sm font-medium">
            Event "{selectedEventForRemove.title}" removed successfully!
          </div>
          <button
            onClick={() => toast.dismiss(id)}
            className="ml-3 text-green-800 hover:text-red-500 p-1"
          >
            <X size={16} />
          </button>
        </div>
      ), {
        unstyled: true,
        duration: 5000,
        position: "top-right",
      });
      
      // Manually close the dialog after successful removal
      setIsRemoveDialogOpen(false);
      setSelectedEventForRemove(null);
    } catch (error) {
      console.error('Failed to remove event:', error);
      toast.error('Failed to remove event', {
        position: "top-right",
        className: "!bg-red-100 !text-red-800 !border !border-red-300",
      });
    } finally {
      setIsRemoving(false);
    }
  };

  const handleCardAction = (cardId: string, action: string, isEvent: boolean = false) => {
    const cardList = isEvent ? events : jobs;
    const card = isEvent ? events.find(e => e.id === cardId) : jobs.find(j => j.id === cardId);
    
    if (!card) return;

    const cardTitle = isEvent ? (card as Event).title || 'Event' : (card as Job).title;

    switch (action) {
      case 'print':
        toast.success(`Printing ${cardTitle}`, {
          position: "top-right",
          className: "!bg-green-100 !text-green-800 !border !border-green-300",
        });
        break;
      case 'hold':
        // Update job status to ON_HOLD
        if (!isEvent) {
          setJobs(jobs.map(job => 
            job.id === cardId 
              ? { 
                  ...job, 
                  status: { text: 'On Hold', value: 'ON_HOLD', code: 'ON_HOLD' } 
                }
              : job
          ));
        }
        toast.info(`${cardTitle} put on hold`);
        break;
      case 'close':
        // Update job status to COMPLETED
        if (!isEvent) {
          setJobs(jobs.map(job => 
            job.id === cardId 
              ? { 
                  ...job, 
                  status: { text: 'Completed', value: 'COMPLETED', code: 'COMPLETED' } 
                }
              : job
          ));
        }
        toast.success(`${cardTitle} closed`, {
          position: "top-right",
          className: "!bg-green-100 !text-green-800 !border !border-green-300",
        });
        break;
      case 'update':
        if (isEvent) {
          setSelectedEventForUpdate(card as Event);
          setIsUpdateModalOpen(true);
        }
        break;
      case 'complete':
        if (isEvent) {
          setSelectedEventForComplete(card as Event);
          setIsCompleteEventModalOpen(true);
        } else {
          setEvents(events.filter(e => e.id !== cardId));
          toast.success(`${cardTitle} completed`, {
            position: "top-right",
            className: "!bg-green-100 !text-green-800 !border !border-green-300",
          });
        }
        break;
      case 'remove':
        if (isEvent) {
          setSelectedEventForRemove(card as Event);
          setIsRemoveDialogOpen(true);
        }
        break;
    }
  };

  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [draggedResource, setDraggedResource] = useState<{
    id: string;
    type: 'employee' | 'vendor' | 'asset';
  } | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const [eventsFilter, setEventsFilter] = useState<EventFilterState>({
    statuses: [],
    eventId: '',
    resourceNames: [],
    resourceGroups: [],
    priorities: [],
    eventTypes: [],
    dateFrom: undefined,
    dateTo: undefined,
    organizers: [],
    receiptStatuses: [],
    routingGroups: []
  });
  const [jobsFilter, setJobsFilter] = useState<JobFilterState>({
    statuses: [],
    woId: '',
    title: '',
    resourceNames: [],
    resourceGroups: [],
    priorities: [],
    eventTypes: [],
    dateFrom: undefined,
    dateTo: undefined,
    organizers: [],
    receiptStatuses: [],
    routingGroups: [],
    customers: [],
    locations: []
  });
  
  // Get unique resource names from all events
  const allResourceNames = events.flatMap(event => [
    ...(event.resources || []).map(r => r.employee?.text || ''),
    ...(event.vendors || []).map(v => v.vendor?.text || ''),
    ...(event.assets || []).map(a => a.asset?.text || '')
  ]).filter(Boolean);
  const uniqueResourceNames = Array.from(new Set(allResourceNames)).map(name => ({
    value: name,
    label: name
  }));

  // Get unique resource groups from employees and vendors, plus default groups
  const allResourceGroups = [
    ...(employees || []).flatMap(emp => (emp.resourceGroups || []).map(group => group.text)),
    ...(vendors || []).flatMap(vendor => (vendor.resourceGroups || []).map(group => group.text)),
    'Vendors', // Default group for vendors
    'Assets'   // Default group for assets
  ].filter(Boolean);
  const uniqueResourceGroups = Array.from(new Set(allResourceGroups)).map(group => ({
    value: group,
    label: group
  }));

  // Get unique organizers from events
  const uniqueOrganizers = Array.from(new Set(events.map(event => event.organizer?.text || '').filter(Boolean))).map(organizer => ({
    value: organizer,
    label: organizer
  }));

  const getReceiptStatusForEvent = (event: Event) => {
    if (event.workorder?.text && event.workorder.text.trim() && event.workorder.value) {
      const matchingJob = jobs.find(job => job.id === event.workorder?.value);
      if (matchingJob && matchingJob.receiptStatus) {
        return {
          ...matchingJob.receiptStatus,
          display: matchingJob.receiptStatus.display || matchingJob.receiptStatus.text
        };
      }
    }
    return undefined;
  };

  const getActiveJobFiltersCount = (filter: JobFilterState) => {
    return filter.customers.length + filter.locations.length + 
    (filter.woId ? 1 : 0)+ (filter.title ? 1 : 0) +
    (filter.dateFrom ? 1 : 0) + (filter.dateTo ? 1 : 0);
  };

  // Function to fetch routing groups when filter is clicked
  const fetchRoutingGroupsOnDemand = async (): Promise<Option[]> => {
    if (!routingGroupsLoaded) {
      try {
        console.log('Fetching routing groups on demand...');
        const routingGroupData = await fetchRoutingGroups();
        console.log('Fetched routing groups:', routingGroupData);
        setRoutingGroups(routingGroupData);
        setRoutingGroupsLoaded(true);
        return routingGroupData.map(group => ({
          value: group.name,
          label: group.name
        }));
      } catch (error) {
        console.error('Failed to fetch routing groups:', error);
        toast.error('Failed to load routing groups', {
          position: "top-right",
          className: "!bg-red-100 !text-red-800 !border !border-red-300",
        });
        return [];
      }
    }
    return routingGroups.map(group => ({
      value: group.name,
      label: group.name
    }));
  };

  const fetchCustomersOnDemand = async (): Promise<Option[]> => {
    if (!customersLoaded) {
      try {
        console.log('Fetching customers on demand...');
        const customerData = await fetchCustomers();
        console.log('Fetched customers:', customerData);
        setCustomers(customerData);
        setCustomersLoaded(true);
        return customerData.map(cust => ({
          value: cust.name,
          label: cust.name
        }));
      } catch (error) {
        console.error('Failed to fetch customers:', error);
        toast.error('Failed to load customers', {
          position: "top-right",
          className: "!bg-red-100 !text-red-800 !border !border-red-300",
        });
        return [];
      }
    }
    return customers.map(cust => ({
      value: cust.name,
      label: cust.name
    }));
  }

  const fetchLocationsOnDemand = async (): Promise<Option[]> => {
    if (!locationsLoaded) {
      try {
        console.log('Fetching locations on demand...');
        const locationData = await fetchLocations();
        console.log('Fetched locations:', locationData);
        setLocations(locationData);
        setLocationsLoaded(true);
        return locationData.map(loc => ({
          value: loc.name,
          label: loc.name
        }));
      } catch (error) {
        console.error('Failed to fetch locations:', error);
        toast.error('Failed to load locations', {
          position: "top-right",
          className: "!bg-red-100 !text-red-800 !border !border-red-300",
        });
        return [];
      }
    }
    return locations.map(loc => ({
      value: loc.name,
      label: loc.name
    }));
  }

  // Get unique routing groups for MultiSelect options
  const uniqueRoutingGroups = routingGroups.map(group => ({
    value: group.name,
    label: group.name
  }));

  const uniqueCustomers = customers.map(cust => ({
    value: cust.name,
    label: cust.name
  }));

  const uniqueLocations = locations.map(loc => ({
    value: loc.name,
    label: loc.name
  }));

  const handleResourceDragStart = (resourceId: string, resourceType: 'employee' | 'vendor' | 'asset') => {
    console.log('Resource drag started:', { resourceId, resourceType });
    setDraggedResource({ id: resourceId, type: resourceType });
  };

  const handleResourceDragEnd = () => {
    console.log('Resource drag ended');
    setDraggedResource(null);
  };

  const handleResourceClick = (resourceName: string) => {
    setEventsFilter(prev => {
      const isAlreadySelected = prev.resourceNames.includes(resourceName);
      
      if (isAlreadySelected) {
        // Remove from selection
        return {
          ...prev,
          resourceNames: prev.resourceNames.filter(name => name !== resourceName)
        };
      } else {
        // Add to selection
        return {
          ...prev,
          resourceNames: [...prev.resourceNames, resourceName]
        };
      }
    });
  };

  const handleDragStart = (cardId: string) => {
    setDraggedCard(cardId);
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleJobDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedCard) {
      const card = jobs.find(c => c.id === draggedCard);
      if (card) {
        setSelectedJob(card);
        setIsCreateModalOpen(true);
      }
    }
  };

  const handleResourceDrop = (e: React.DragEvent, eventId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedResource) {
      const event = events.find(e => e.id === eventId);
      if (!event) return;

      let isAlreadyAssigned = false;
      
      if (draggedResource.type === 'employee') {
        isAlreadyAssigned = (event.resources || []).some(resource => 
          resource.employee?.value === draggedResource.id
        );
      } else if (draggedResource.type === 'vendor') {
        isAlreadyAssigned = (event.vendors || []).some(vendor => 
          vendor.vendor?.value === draggedResource.id
        );
      } else if (draggedResource.type === 'asset') {
        isAlreadyAssigned = (event.assets || []).some(asset => 
          asset.asset?.value === draggedResource.id
        );
      }

      if (isAlreadyAssigned) {
        toast.error(`${draggedResource.type.charAt(0).toUpperCase() + draggedResource.type.slice(1)} is already assigned to this event`, {
          position: "top-right",
          className: "!bg-red-100 !text-red-800 !border !border-red-300",
        });
        return;
      }

      let resourceDetails = null;
      if (draggedResource.type === 'employee') {
        resourceDetails = employees.find(emp => emp.employee?.value === draggedResource.id);
      } else if (draggedResource.type === 'vendor') {
        resourceDetails = vendors.find(vendor => vendor.vendor?.value === draggedResource.id);
      } else if (draggedResource.type === 'asset') {
        resourceDetails = assets.find(asset => asset.asset?.value === draggedResource.id);
      }

      if (resourceDetails) {
        const updatedEvents = events.map(e => 
          e.id === eventId 
            ? {
                ...e,
                ...(draggedResource.type === 'employee' && {
                  resources: [
                    ...(e.resources || []),
                    {
                      id: '', // This would typically be generated by the backend
                      employee: resourceDetails.employee,
                      startTime: '',
                      endTime: '',
                      woResourceId: ''
                    }
                  ]
                }),
                ...(draggedResource.type === 'vendor' && {
                  vendors: [
                    ...(e.vendors || []),
                    {
                      id: '', // This would typically be generated by the backend
                      vendor: resourceDetails.vendor,
                      quantityRequired: 1,
                      memo: ''
                    }
                  ]
                }),
                ...(draggedResource.type === 'asset' && {
                  assets: [
                    ...(e.assets || []),
                    {
                      id: '', // This would typically be generated by the backend
                      asset: resourceDetails.asset,
                      quantity: 1,
                      startTime: '',
                      endTime: ''
                    }
                  ]
                })
              }
            : e
        );
        
        setEvents(updatedEvents);
        toast.success(`${draggedResource.type.charAt(0).toUpperCase() + draggedResource.type.slice(1)} assigned to event`, {
          position: "top-right",
          className: "!bg-green-100 !text-green-800 !border !border-green-300",
        });
      }
    }
  };

  const isResourceAssignedToEvent = (eventId: string, resourceId: string, resourceType: 'employee' | 'vendor' | 'asset') => {
    const event = events.find(e => e.id === eventId);
    if (!event) return false;
    
    if (resourceType === 'employee') {
      return (event.resources || []).some(resource => 
        resource.employee?.value === resourceId
      );
    } else if (resourceType === 'vendor') {
      return (event.vendors || []).some(vendor => 
        vendor.vendor?.value === resourceId
      );
    } else if (resourceType === 'asset') {
      return (event.assets || []).some(asset => 
        asset.asset?.value === resourceId
      );
    }
    
    return false;
  };

  const shouldShowDropZone = (eventId: string) => {
    if (!draggedResource) {
      // console.log('No dragged resource, not showing drop zone');
      return false;
    }
    const isAssigned = isResourceAssignedToEvent(eventId, draggedResource.id, draggedResource.type);
    console.log('Should show drop zone for event', eventId, ':', !isAssigned);
    return !isAssigned;
  };

  const handleCompleteEvent = useCallback((submittedFormData: any) => {
    console.log('Complete event form data:', submittedFormData);

    const updatedEvents = events.map(event => 
      event.id === selectedEventForComplete?.id 
        ? { 
            ...event, 
            status: { text: 'Completed', value: 'COMPLETED', code: 'COMPLETED' } 
          }
        : event
    );
    
    setEvents(updatedEvents);
    setIsCompleteEventModalOpen(false);
    setSelectedEventForComplete(null);
    
    toast.success(`Event completed successfully`, {
      position: "top-right",
      className: "!bg-green-100 !text-green-800 !border !border-green-300",
    });
  }, [events, selectedEventForComplete]);

  const getActiveEventFiltersCount = (filter: EventFilterState) => {
    return filter.statuses.length + 
           (filter.eventId ? 1 : 0) + filter.resourceNames.length + filter.resourceGroups.length +
           filter.priorities.length + filter.eventTypes.length + 
           (filter.dateFrom ? 1 : 0) + (filter.dateTo ? 1 : 0) +
           filter.organizers.length + filter.receiptStatuses.length + 
           filter.routingGroups.length;
  };

  const filteredJobs = jobs.filter(job => {
    // Filter by job ID
    if (jobsFilter.woId && !job.id.includes(jobsFilter.woId)) {
      return false;
    }

    // Filter by job title
    if (jobsFilter.title && !job.title.toLowerCase().includes(jobsFilter.title.toLowerCase())) {
      return false;
    }

    // Filter by date range
    if (jobsFilter.dateFrom || jobsFilter.dateTo) {
      const jobDate = new Date(job.date || '');
      
      if (jobsFilter.dateFrom) {
        const fromDate = new Date(jobsFilter.dateFrom);
        if (jobDate < fromDate) {
          return false;
        }
      }
      
      if (jobsFilter.dateTo) {
        const toDate = new Date(jobsFilter.dateTo);
        if (jobDate > toDate) {
          return false;
        }
      }
    }

    return (jobsFilter.customers.length === 0 || jobsFilter.customers.includes(job.customer)) &&
          (jobsFilter.locations.length === 0 || jobsFilter.locations.includes(job.location));
  });

  const filteredEvents = events.filter(event => {
    // Filter by event ID
    if (eventsFilter.eventId && !event.id.includes(eventsFilter.eventId)) {
      return false;
    }
    
    // Filter by resource names  
    if (eventsFilter.resourceNames.length > 0) {
      const eventResourceNames = [
        ...(event.resources || []).map(r => r.employee?.text || ''),
        ...(event.vendors || []).map(v => v.vendor?.text || ''),
        ...(event.assets || []).map(a => a.asset?.text || '')
      ].filter(Boolean);
      
      const hasMatchingResource = eventResourceNames.some(resourceName => 
        eventsFilter.resourceNames.some(filterName => 
          resourceName.toLowerCase().includes(filterName.toLowerCase())
        )
      );
      
      if (!hasMatchingResource) {
        return false;
      }
    }
    
    // Filter by resource groups
    if (eventsFilter.resourceGroups.length > 0) {
      const eventResourceGroups = [
        ...(event.resources || []).flatMap(r => {
          const employeeId = r.employee?.value;
          const employee = employees.find(emp => emp.employee?.value === employeeId);
          return (employee?.resourceGroups || []).map(group => group.text);
        }),
        ...(event.vendors || []).flatMap(v => {
          const vendorId = v.vendor?.value;
          const vendor = vendors.find(vend => vend.vendor?.value === vendorId);
          return (vendor?.resourceGroups || []).map(group => group.text);
        })
      ].filter(Boolean);
      
      // Add default groups if resources exist
      if ((event.vendors || []).length > 0) {
        eventResourceGroups.push('Vendors');
      }
      if ((event.assets || []).length > 0) {
        eventResourceGroups.push('Assets');
      }
      
      const hasMatchingResourceGroup = eventResourceGroups.some(groupName => 
        eventsFilter.resourceGroups.some(filterGroup => 
          groupName.toLowerCase().includes(filterGroup.toLowerCase())
        )
      );
      
      if (!hasMatchingResourceGroup) {
        return false;
      }
    }
    
    // Filter by event types
    if (eventsFilter.eventTypes.length > 0) {
      const hasWorkOrder = event.workorder && event.workorder.value;
      const hasResources = (event.resources || []).length > 0;
      const hasVendors = (event.vendors || []).length > 0;
      const hasAssets = (event.assets || []).length > 0;
      
      const eventType = !hasWorkOrder 
        ? 'General Event'
        : (hasResources || hasVendors || hasAssets)
        ? 'Non General Event'
        : 'Unassigned Event';
      
      if (!eventsFilter.eventTypes.includes(eventType)) {
        return false;
      }
    }
    
    // Filter by date range
    if (eventsFilter.dateFrom || eventsFilter.dateTo) {
      const eventStartDate = new Date(event.date?.start || '');
      const eventEndDate = new Date(event.date?.end || '');
      
      if (eventsFilter.dateFrom) {
        const fromDate = new Date(eventsFilter.dateFrom);
        if (eventEndDate < fromDate) {
          return false;
        }
      }
      
      if (eventsFilter.dateTo) {
        const toDate = new Date(eventsFilter.dateTo);
        if (eventStartDate > toDate) {
          return false;
        }
      }
    }
    
    // Filter by organizers
    if (eventsFilter.organizers.length > 0) {
      const eventOrganizer = event.organizer?.text || '';
      if (!eventsFilter.organizers.includes(eventOrganizer)) {
        return false;
      }
    }
    
    // Filter by receipt statuses
    if (eventsFilter.receiptStatuses.length > 0) {
      const eventReceiptStatus = getReceiptStatusForEvent(event);
      const receiptStatusText = eventReceiptStatus?.text || '';
      if (!eventsFilter.receiptStatuses.includes(receiptStatusText)) {
        return false;
      }
    }
    
    // Filter by routing groups
    if (eventsFilter.routingGroups.length > 0) {
      const eventRoutingGroup = event.routingGroup?.text || '';
      if (!eventsFilter.routingGroups.includes(eventRoutingGroup)) {
        return false;
      }
    }
    
    // Filter by statuses, and priorities
    return (eventsFilter.statuses.length === 0 || eventsFilter.statuses.includes(event.status?.text || '')) &&
           (eventsFilter.priorities.length === 0 || eventsFilter.priorities.includes(event.priority?.text || ''));
  });

  const getWorkOrderUrl = (event: Event) => {
    if (event.workorder?.value && jobs.length > 0) {
      const matchingJob = jobs.find(job => job.id === event.workorder?.value);
      return matchingJob?.woUrl;
    }
    return undefined;
  };

  const handleCreateNewEvent = () => {
    setIsCreateModalOpen(true);
    setSelectedJob(null);
  };

  if (isLoading) {
    return (
      <div className="p-6 h-screen bg-background">
        <div className="flex rounded-lg border relative overflow-hidden h-full">
          <div className="w-[250px] min-w-[250px] h-full bg-background p-4 border-r">
            <div className="space-y-2 h-full flex flex-col">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-1 flex-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 bg-background p-4 h-full">
            <div className="space-y-4 h-full flex flex-col border-r relative">
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-background p-4 h-full">
            <div className="space-y-4 h-full flex flex-col relative">
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log('selectedEventForComplete', selectedEventForComplete);

  return (
    <div className="p-6 h-screen bg-background">
      {loadingError && (
        <div className="bg-yellow-50 p-2 mb-4 border border-yellow-200 rounded text-yellow-800 text-sm">
          {loadingError}
        </div>
      )}
      <div className="flex rounded-lg border relative overflow-hidden h-full">
        <Collapsible
          open={!isCollapsed}
          onOpenChange={(open) => setIsCollapsed(!open)}
          className="relative"
        >
          <div className="flex h-full">
            <CollapsibleContent className="w-[250px] min-w-[250px] h-full bg-background p-4 border-r">
              <div className="h-full flex flex-col">
                <Resources 
                  events={events} 
                  employees={employees}
                  vendors={vendors}
                  assets={assets}
                  isLoading={isLoading}
                  selectedResources={eventsFilter.resourceNames}
                  onResourceDragStart={handleResourceDragStart}
                  onResourceDragEnd={handleResourceDragEnd}
                  onResourceClick={handleResourceClick}
                />
              </div>
            </CollapsibleContent>

            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="absolute z-10 -right-6 top-1/2 -translate-y-1/2"
              >
                <ChevronRight className={`h-4 w-4 transition-transform ${!isCollapsed ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
          </div>
        </Collapsible>

        <ResizablePanelGroup direction="horizontal" className="flex-1 h-full">
          <ResizablePanel defaultSize={50}>
            <div className="h-full bg-background p-4">
              <div className="space-y-4 h-full flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4 text-foreground" strokeWidth={2.5} />
                    <h2 className="text-lg font-medium text-foreground">Available Jobs</h2>
                    <Badge variant="secondary" className="text-[9px] px-1 py-0 h-3 min-w-[12px]">
                      {filteredJobs.length}
                    </Badge>
                  </div>
                  <div className="relative">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          // onClick={() => setFilterType('jobs')}
                        >
                          <Filter className="h-3 w-3" />
                        </Button>
                      </PopoverTrigger>
                      {getActiveJobFiltersCount(jobsFilter) > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[9px] min-w-[16px]"
                        >
                          {getActiveJobFiltersCount(jobsFilter)}
                        </Badge>
                      )}
                      <PopoverContent className="w-[500px] p-4" align="center">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-md font-medium">Filter Available Jobs</h3>
                              <p className="tracking-tight text-[12px] text-muted-foreground">Select your filter criteria below</p>
                            </div>
                            <Button 
                              variant="outline" 
                              className="text-[12px] h-8 px-3 tracking-tight"
                              onClick={() => {
                                setJobsFilter({
                                  statuses: [],
                                  woId: '',
                                  title: '',
                                  resourceNames: [],
                                  resourceGroups: [],
                                  priorities: [],
                                  eventTypes: [],
                                  dateFrom: undefined,
                                  dateTo: undefined,
                                  organizers: [],
                                  receiptStatuses: [],
                                  routingGroups: [],
                                  customers: [],
                                  locations: []
                                });
                              }}
                            >
                              Clear All
                            </Button>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="-mt-[5px]">
                                <MultiSelectFilter
                                  id="customer"
                                  label=""
                                  options={uniqueCustomers}
                                  selected={jobsFilter.customers}
                                  onChange={(value) =>
                                    setJobsFilter((prev) => ({ ...prev, customers: value }))
                                  }
                                  placeholder="Filter by Customer"
                                  className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                                  fetchOptionsOnOpen={fetchCustomersOnDemand}
                                />
                              </div>
                              <div className="-mt-[5px]">
                                <MultiSelectFilter
                                  id="location"
                                  label=""
                                  options={uniqueLocations}
                                  selected={jobsFilter.locations}
                                  onChange={(value) =>
                                    setJobsFilter((prev) => ({ ...prev, locations: value }))
                                  }
                                  placeholder="Filter by Location"
                                  className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                                  fetchOptionsOnOpen={fetchLocationsOnDemand}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="relative">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                                <Input
                                  placeholder="Enter Work Order ID"
                                  value={jobsFilter.woId}
                                  onChange={(e) =>
                                    setJobsFilter((prev) => ({ ...prev, woId: e.target.value }))
                                  }
                                  className="h-8 text-sm !text-[12px] !placeholder:text-[12px] pl-7 pr-8 outline-none focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:ring-transparent focus:shadow-none"
                                />
                                {jobsFilter.woId && (
                                  <button
                                    onClick={() => setJobsFilter((prev) => ({ ...prev, woId: '' }))}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground flex items-center justify-center"
                                  >
                                    <X className="!h-3 !w-3" />
                                  </button>
                                )}
                              </div>
                              <div className="relative">
                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                                <Input
                                  placeholder="Enter Work Order Title"
                                  value={jobsFilter.title}
                                  onChange={(e) =>
                                    setJobsFilter((prev) => ({ ...prev, title: e.target.value }))
                                  }
                                  className="h-8 text-sm !text-[12px] !placeholder:text-[12px] pl-7 pr-8 outline-none focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:ring-transparent focus:shadow-none"
                                />
                                {jobsFilter.title && (
                                  <button
                                    onClick={() => setJobsFilter((prev) => ({ ...prev, title: '' }))}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground flex items-center justify-center"
                                  >
                                    <X className="!h-3 !w-3" />
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div className="-mt-[5px]">
                                <DateRangeFilter
                                  id="dateFrom"
                                  label=""
                                  value={jobsFilter.dateFrom}
                                  onChange={(value) =>
                                    setJobsFilter((prev) => ({ ...prev, dateFrom: value }))
                                  }
                                  placeholder="Date From"
                                />
                              </div>
                              
                              <div className="-mt-[5px]">
                                <DateRangeFilter
                                  id="dateTo"
                                  label=""
                                  value={jobsFilter.dateTo}
                                  onChange={(value) =>
                                    setJobsFilter((prev) => ({ ...prev, dateTo: value }))
                                  }
                                  placeholder="Date To"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <ScrollArea className="flex-1 h-full">
                  <div className="grid auto-rows-max gap-0 justify-items-center h-full"
                       style={{
                         gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                         width: '100%'
                       }}>
                     {filteredJobs.map((job) => (
                       <div 
                         key={job.id} 
                         className="w-full max-w-[170px] p-0.5"
                         data-tooltip-id="job-tooltip"
                         data-tooltip-content={job.title}
                       >
                         <Card
                          id={parseInt(job.id)}
                          title={job.title}
                          description={job.description}
                          customer={job.customer}
                          date={job.date}
                          salesOrder={job.salesOrder}
                          project={job.project}
                          estHours={job.estHours}
                          woUrl={job.woUrl}
                          soUrl={job.soUrl}
                          projectUrl={job.projectUrl}
                          status={job.status}
                          draggable
                          onDragStart={() => handleDragStart(job.id)}
                          onDragEnd={handleDragEnd}
                          isDragging={draggedCard === job.id}
                          onAction={(action) => handleCardAction(job.id, action)}
                          compact
                        />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={50}>
            <div 
              className={`h-full bg-background p-4 ${
                draggedCard ? 'border-[5px] border-dashed' : ''
              }`}
              style={draggedCard ? { borderColor: '#26CC4E' } : undefined}
              onDragOver={handleDragOver}
              onDrop={handleJobDrop}
            >
              <div className="space-y-4 h-full flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-foreground" strokeWidth={2.5} />
                     <h2 className="text-lg font-medium text-foreground">Events</h2>
                     <Badge variant="secondary" className="text-[9px] px-1 py-0 h-3 min-w-[12px]">
                       {filteredEvents.length}
                     </Badge>
                  </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleCreateNewEvent}
                        title="Create new event"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <div className="relative">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              // onClick={() => setFilterType('events')}
                            >
                              <Filter className="h-3 w-3" />
                            </Button>
                          </PopoverTrigger>
                          {getActiveEventFiltersCount(eventsFilter) > 0 && (
                            <Badge 
                              variant="destructive" 
                              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[9px] min-w-[16px]"
                            >
                              {getActiveEventFiltersCount(eventsFilter)}
                            </Badge>
                          )}
                          <PopoverContent className="w-[500px] p-4" align="center">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="text-md font-medium">Filter Events</h3>
                                  <p className="tracking-tight text-[12px] text-muted-foreground">Select your filter criteria below</p>
                                </div>
                                <Button 
                                  variant="outline" 
                                  className="text-[12px] h-8 px-3 tracking-tight"
                                  onClick={() => {
                                    setEventsFilter({
                                      statuses: [],
                                      eventId: '',
                                      resourceNames: [],
                                      resourceGroups: [],
                                      priorities: [],
                                      eventTypes: [],
                                      dateFrom: undefined,
                                      dateTo: undefined,
                                      organizers: [],
                                      receiptStatuses: [],
                                      routingGroups: [],
                                    });
                                  }}
                                >
                                  Clear All
                                </Button>
                              </div>
                              
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="relative">
                                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                                    <Input
                                      placeholder="Enter Event ID"
                                      value={eventsFilter.eventId}
                                      onChange={(e) =>
                                        setEventsFilter((prev) => ({ ...prev, eventId: e.target.value }))
                                      }
                                      className="h-8 text-sm !text-[12px] !placeholder:text-[12px] pl-7 pr-8 outline-none focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:ring-transparent focus:shadow-none"
                                    />
                                    {eventsFilter.eventId && (
                                      <button
                                        onClick={() => setEventsFilter((prev) => ({ ...prev, eventId: '' }))}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground flex items-center justify-center"
                                      >
                                        <X className="!h-3 !w-3" />
                                      </button>
                                    )}
                                  </div>

                                  <div className="-mt-[5px]">
                                    <MultiSelectFilter
                                      id="resourceName"
                                      label=""
                                      options={uniqueResourceNames}
                                      selected={eventsFilter.resourceNames}
                                      onChange={(value) =>
                                        setEventsFilter((prev) => ({ ...prev, resourceNames: value }))
                                      }
                                      placeholder="Filter by Resource Name"
                                      className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                                    />
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="-mt-[5px]">
                                    <MultiSelectFilter
                                      id="resourceGroup"
                                      label=""
                                      options={uniqueResourceGroups}
                                      selected={eventsFilter.resourceGroups}
                                      onChange={(value) =>
                                        setEventsFilter((prev) => ({ ...prev, resourceGroups: value }))
                                      }
                                      placeholder="Filter by Resource Group"
                                      className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                                    />
                                  </div>
                                  
                                  <div className="-mt-[5px]">
                                    <MultiSelectFilter
                                      id="eventStatus"
                                      label=""
                                      options={eventStatuses}
                                      selected={eventsFilter.statuses}
                                      onChange={(value) =>
                                        setEventsFilter((prev) => ({ ...prev, statuses: value }))
                                      }
                                      placeholder="Filter by Status"
                                      className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                                    />
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="-mt-[5px]">
                                    <MultiSelectFilter
                                      id="eventPriority"
                                      label=""
                                      options={eventPriorities}
                                      selected={eventsFilter.priorities}
                                      onChange={(value) =>
                                        setEventsFilter((prev) => ({ ...prev, priorities: value }))
                                      }
                                      placeholder="Filter by Priority"
                                      className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                                    />
                                  </div>
                                  
                                  <div className="-mt-[5px]">
                                    <MultiSelectFilter
                                      id="eventType"
                                      label=""
                                      options={eventTypes}
                                      selected={eventsFilter.eventTypes}
                                      onChange={(value) =>
                                        setEventsFilter((prev) => ({ ...prev, eventTypes: value }))
                                      }
                                      placeholder="Filter by Event Type"
                                      className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                                    />
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="-mt-[5px]">
                                    <DateRangeFilter
                                      id="dateFrom"
                                      label=""
                                      value={eventsFilter.dateFrom}
                                      onChange={(value) =>
                                        setEventsFilter((prev) => ({ ...prev, dateFrom: value }))
                                      }
                                      placeholder="Date From"
                                    />
                                  </div>
                                  
                                  <div className="-mt-[5px]">
                                    <DateRangeFilter
                                      id="dateTo"
                                      label=""
                                      value={eventsFilter.dateTo}
                                      onChange={(value) =>
                                        setEventsFilter((prev) => ({ ...prev, dateTo: value }))
                                      }
                                      placeholder="Date To"
                                    />
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="-mt-[5px]">
                                    <MultiSelectFilter
                                      id="organizer"
                                      label=""
                                      options={uniqueOrganizers}
                                      selected={eventsFilter.organizers}
                                      onChange={(value) =>
                                        setEventsFilter((prev) => ({ ...prev, organizers: value }))
                                      }
                                      placeholder="Filter by Organizer"
                                      className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                                    />
                                  </div>
                                  
                                  <div className="-mt-[5px]">
                                    <MultiSelectFilter
                                      id="receiptStatus"
                                      label=""
                                      options={receiptStatuses}
                                      selected={eventsFilter.receiptStatuses}
                                      onChange={(value) =>
                                        setEventsFilter((prev) => ({ ...prev, receiptStatuses: value }))
                                      }
                                      placeholder="Filter by Receipt Status"
                                      className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                                    />
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="-mt-[5px]">
                                    <MultiSelectFilter
                                      id="routingGroup"
                                      label=""
                                      options={uniqueRoutingGroups}
                                      selected={eventsFilter.routingGroups}
                                      onChange={(value) =>
                                        setEventsFilter((prev) => ({ ...prev, routingGroups: value }))
                                      }
                                      placeholder="Filter by Routing Group"
                                      className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                                      fetchOptionsOnOpen={fetchRoutingGroupsOnDemand}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                </div>
                <ScrollArea className="flex-1 h-full">
                  <div className="grid auto-rows-max gap-0 justify-items-center h-full"
                       style={{
                         gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                         width: '100%'
                       }}>
                     {filteredEvents.map((event) => {
                       const canAcceptDrop = shouldShowDropZone(event.id);
                       const isAlreadyAssigned = draggedResource && isResourceAssignedToEvent(event.id, draggedResource.id, draggedResource.type);
                       
                      //  console.log('Event', event.id, 'canAcceptDrop:', canAcceptDrop, 'isAlreadyAssigned:', isAlreadyAssigned);
                       
                          // Format tooltip content with title, date, time, resources, vendors, and assets
                          const formatDateSafe = (dateStr: string) => {
                            try {
                              return format(new Date(dateStr), 'M/d/yyyy');
                            } catch {
                              return dateStr;
                            }
                          };

                          const formatTimeSafe = (timeStr: string) => {
                            try {
                              return format(parse(timeStr, 'HH:mm', new Date()), 'h:mm a');
                            } catch {
                              return timeStr;
                            }
                          };

                          const tooltipContent = [
                            `<strong>${event.title || 'Untitled Event'}</strong>`,
                            event.date ? `${formatDateSafe(event.date.start)} - ${formatDateSafe(event.date.end)}` : '',
                            event.time ? `${formatTimeSafe(event.time.start)} - ${formatTimeSafe(event.time.end)}` : '',
                          event.resources?.length > 0 ? `Resources: ${event.resources.map(r => r.employee?.text || r.name || 'Unknown').join(', ')}` : '',
                          event.vendors?.length > 0 ? `Vendors: ${event.vendors.map(v => v.vendor?.text || v.name || 'Unknown').join(', ')}` : '',
                          event.assets?.length > 0 ? `Assets: ${event.assets.map(a => a.asset?.text || a.name || 'Unknown').join(', ')}` : ''
                        ].filter(Boolean).join('<br>');
                       
                       return (
                         <div 
                           key={event.id} 
                           className="w-full max-w-[170px] p-0.5"
                           data-tooltip-id="event-tooltip"
                           data-tooltip-html={tooltipContent}
                         >
                          <div
                            className={`${
                              canAcceptDrop
                                ? 'border-[3px] border-dashed border-green-500 rounded-lg p-1 bg-green-50'
                                : isAlreadyAssigned
                                ? 'opacity-50 cursor-not-allowed'
                                : ''
                            }`}
                            onDragOver={canAcceptDrop ? handleDragOver : undefined}
                            onDrop={canAcceptDrop ? (e) => handleResourceDrop(e, event.id) : undefined}
                            style={isAlreadyAssigned ? { pointerEvents: 'none' } : undefined}
                          >
                            <Card
                              id={parseInt(event.id)}
                              title={event.title || 'Untitled Event'}
                              description={event.note || 'No description'}
                              isEvent
                              onAction={(action) => handleCardAction(event.id, action, true)}
                              compact
                              status={event.status ? {
                                text: event.status.text,
                                value: event.status.value,
                                code: event.status.code || event.status.value || ''
                              } : undefined}
                              eventData={{
                                workorder: event.workorder,
                                url: event.url || '',
                                date: event.date ? {
                                  start: event.date.start,
                                  end: event.date.end
                                } : undefined,
                                time: event.time,
                                organizer: event.organizer,
                                priority: event.priority,
                                receiptStatus: getReceiptStatusForEvent(event),
                                woUrl: getWorkOrderUrl(event)
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="fixed bottom-6 right-6">
        <Button
          size="icon"
          className="h-9 w-9 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          onClick={() => toast.info("AI Assistant coming soon!", { 
            duration: 500,
            className: "!bg-blue-100 !text-blue-800 !border !border-blue-300"
          })}
        >
          <Stars className="h-8 w-8" />
        </Button>
      </div>

      <CreateEvent
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onEventCreated={loadAllData}
        selectedJob={selectedJob ? {
          id: selectedJob.id,
          title: selectedJob.title,
          description: selectedJob.description,
          woUrl: selectedJob.woUrl || '',
          project: selectedJob.project,
          projectUrl: selectedJob.projectUrl || ''
        } : undefined}
        employees={employees}
        vendors={vendors}
        assets={assets}
        woResources={selectedJob ? 
          woResources.filter(x => 
            x.workorder.value == selectedJob.id
            && !x.event
          ) : 
          []
        }
        woVendors={selectedJob ? 
          woVendors.filter(x => 
            x.workorder.value == selectedJob.id
            && !x.event
          ) : 
          []
        }
        woAssets={selectedJob ? 
          woAssets.filter(x => 
            x.workorder.value == selectedJob.id
            && !x.event
          ) : 
          []
        }
      />

      <UpdateEvent
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onEventUpdated={loadAllData}
        selectedEvent={selectedEventForUpdate}
        employees={employees}
        vendors={vendors}
        assets={assets}
        woResources={selectedEventForUpdate ? 
          woResources.filter(x => x.event == selectedEventForUpdate.id) : 
          []
        }
        woVendors={selectedEventForUpdate ? 
          woVendors.filter(x => x.event == selectedEventForUpdate.id) : 
          []
        }
        woAssets={selectedEventForUpdate ? 
          woAssets.filter(x => x.event == selectedEventForUpdate.id) : 
          []
        }
      />

      {selectedEventForComplete && (
        <CompleteEvent 
          selectedEvent={selectedEventForComplete} 
          isOpen={isCompleteEventModalOpen}
          onClose={() => setIsCompleteEventModalOpen(false)}
          onSubmit={handleCompleteEvent}
        />
      )}

      {/* <Popover>
        <PopoverTrigger asChild>
          <span className="hidden">Filter Trigger</span>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] p-4" align="center">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-md font-medium">Filter {filterType === 'jobs' ? 'Available Jobs' : 'Events'}</h3>
                <p className="tracking-tight text-[12px] text-muted-foreground">Select your filter criteria below</p>
              </div>
              <Button 
                variant="outline" 
                className="text-[12px] h-8 px-3 tracking-tight"
                onClick={() => {
                  if (filterType === 'events') {
                    setEventsFilter({
                      statuses: [],
                      eventId: '',
                      resourceNames: [],
                      resourceGroups: [],
                      priorities: [],
                      eventTypes: [],
                      dateFrom: undefined,
                      dateTo: undefined,
                      organizers: [],
                      receiptStatuses: [],
                      routingGroups: [],
                    });
                  } else {
                    setJobsFilter({
                      statuses: [],
                      woId: '',
                      title: '',
                      resourceNames: [],
                      resourceGroups: [],
                      priorities: [],
                      eventTypes: [],
                      dateFrom: undefined,
                      dateTo: undefined,
                      organizers: [],
                      receiptStatuses: [],
                      routingGroups: [],
                      customers: [],
                      locations: []
                    });
                  }
                }}
              >
                Clear All
              </Button>
            </div>
            
            {filterType === 'events' ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Enter Event ID"
                    value={eventsFilter.eventId}
                    onChange={(e) =>
                      setEventsFilter((prev) => ({ ...prev, eventId: e.target.value }))
                    }
                    className="h-8 text-sm !text-[12px] !placeholder:text-[12px] pl-7 pr-8 outline-none focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:ring-transparent focus:shadow-none"
                  />
                  {eventsFilter.eventId && (
                    <button
                      onClick={() => setEventsFilter((prev) => ({ ...prev, eventId: '' }))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground flex items-center justify-center"
                    >
                      <X className="!h-3 !w-3" />
                    </button>
                  )}
                </div>

                <div className="-mt-[5px]">
                  <MultiSelectFilter
                    id="resourceName"
                    label=""
                    options={uniqueResourceNames}
                    selected={eventsFilter.resourceNames}
                    onChange={(value) =>
                      setEventsFilter((prev) => ({ ...prev, resourceNames: value }))
                    }
                    placeholder="Filter by Resource Name"
                    className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="-mt-[5px]">
                  <MultiSelectFilter
                    id="resourceGroup"
                    label=""
                    options={uniqueResourceGroups}
                    selected={eventsFilter.resourceGroups}
                    onChange={(value) =>
                      setEventsFilter((prev) => ({ ...prev, resourceGroups: value }))
                    }
                    placeholder="Filter by Resource Group"
                    className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                  />
                </div>
                
                <div className="-mt-[5px]">
                  <MultiSelectFilter
                    id="eventStatus"
                    label=""
                    options={eventStatuses}
                    selected={eventsFilter.statuses}
                    onChange={(value) =>
                      setEventsFilter((prev) => ({ ...prev, statuses: value }))
                    }
                    placeholder="Filter by Status"
                    className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="-mt-[5px]">
                  <MultiSelectFilter
                    id="eventPriority"
                    label=""
                    options={eventPriorities}
                    selected={eventsFilter.priorities}
                    onChange={(value) =>
                      setEventsFilter((prev) => ({ ...prev, priorities: value }))
                    }
                    placeholder="Filter by Priority"
                    className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                  />
                </div>
                
                <div className="-mt-[5px]">
                  <MultiSelectFilter
                    id="eventType"
                    label=""
                    options={eventTypes}
                    selected={eventsFilter.eventTypes}
                    onChange={(value) =>
                      setEventsFilter((prev) => ({ ...prev, eventTypes: value }))
                    }
                    placeholder="Filter by Event Type"
                    className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="-mt-[5px]">
                  <DateRangeFilter
                    id="dateFrom"
                    label=""
                    value={eventsFilter.dateFrom}
                    onChange={(value) =>
                      setEventsFilter((prev) => ({ ...prev, dateFrom: value }))
                    }
                    placeholder="Date From"
                  />
                </div>
                
                <div className="-mt-[5px]">
                  <DateRangeFilter
                    id="dateTo"
                    label=""
                    value={eventsFilter.dateTo}
                    onChange={(value) =>
                      setEventsFilter((prev) => ({ ...prev, dateTo: value }))
                    }
                    placeholder="Date To"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="-mt-[5px]">
                  <MultiSelectFilter
                    id="organizer"
                    label=""
                    options={uniqueOrganizers}
                    selected={eventsFilter.organizers}
                    onChange={(value) =>
                      setEventsFilter((prev) => ({ ...prev, organizers: value }))
                    }
                    placeholder="Filter by Organizer"
                    className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                  />
                </div>
                
                <div className="-mt-[5px]">
                  <MultiSelectFilter
                    id="receiptStatus"
                    label=""
                    options={receiptStatuses}
                    selected={eventsFilter.receiptStatuses}
                    onChange={(value) =>
                      setEventsFilter((prev) => ({ ...prev, receiptStatuses: value }))
                    }
                    placeholder="Filter by Receipt Status"
                    className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="-mt-[5px]">
                  <MultiSelectFilter
                    id="routingGroup"
                    label=""
                    options={uniqueRoutingGroups}
                    selected={eventsFilter.routingGroups}
                    onChange={(value) =>
                      setEventsFilter((prev) => ({ ...prev, routingGroups: value }))
                    }
                    placeholder="Filter by Routing Group"
                    className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                    fetchOptionsOnOpen={fetchRoutingGroupsOnDemand}
                  />
                </div>
              </div>
            </div>
            ) : (
            <div className="space-y-3">
              
              <div className="grid grid-cols-2 gap-2">
                <div className="-mt-[5px]">
                  <MultiSelectFilter
                    id="customer"
                    label=""
                    options={uniqueCustomers}
                    selected={jobsFilter.customers}
                    onChange={(value) =>
                      setJobsFilter((prev) => ({ ...prev, customers: value }))
                    }
                    placeholder="Filter by Customer"
                    className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                    fetchOptionsOnOpen={fetchCustomersOnDemand}
                  />
                </div>
                <div className="-mt-[5px]">
                  <MultiSelectFilter
                    id="location"
                    label=""
                    options={uniqueLocations}
                    selected={jobsFilter.locations}
                    onChange={(value) =>
                      setJobsFilter((prev) => ({ ...prev, locations: value }))
                    }
                    placeholder="Filter by Location"
                    className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                    fetchOptionsOnOpen={fetchLocationsOnDemand}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Enter Work Order ID"
                    value={jobsFilter.woId}
                    onChange={(e) =>
                      setJobsFilter((prev) => ({ ...prev, woId: e.target.value }))
                    }
                    className="h-8 text-sm !text-[12px] !placeholder:text-[12px] pl-7 pr-8 outline-none focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:ring-transparent focus:shadow-none"
                  />
                  {jobsFilter.woId && (
                    <button
                      onClick={() => setJobsFilter((prev) => ({ ...prev, woId: '' }))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground flex items-center justify-center"
                    >
                      <X className="!h-3 !w-3" />
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Enter Work Order Title"
                    value={jobsFilter.title}
                    onChange={(e) =>
                      setJobsFilter((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="h-8 text-sm !text-[12px] !placeholder:text-[12px] pl-7 pr-8 outline-none focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:ring-transparent focus:shadow-none"
                  />
                  {jobsFilter.title && (
                    <button
                      onClick={() => setJobsFilter((prev) => ({ ...prev, title: '' }))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground flex items-center justify-center"
                    >
                      <X className="!h-3 !w-3" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="-mt-[5px]">
                  <DateRangeFilter
                    id="dateFrom"
                    label=""
                    value={jobsFilter.dateFrom}
                    onChange={(value) =>
                      setJobsFilter((prev) => ({ ...prev, dateFrom: value }))
                    }
                    placeholder="Date From"
                  />
                </div>
                
                <div className="-mt-[5px]">
                  <DateRangeFilter
                    id="dateTo"
                    label=""
                    value={jobsFilter.dateTo}
                    onChange={(value) =>
                      setJobsFilter((prev) => ({ ...prev, dateTo: value }))
                    }
                    placeholder="Date To"
                  />
                </div>
              </div>
            </div>
            )}
          </div>
        </PopoverContent>
      </Popover> */}
       
       <Tooltip 
         id="job-tooltip"
         style={{ 
           backgroundColor: '#1f2937',
           color: 'white',
           fontSize: '12px',
           padding: '8px 12px',
           borderRadius: '6px',
           maxWidth: '300px',
           zIndex: 9999,
           boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
         }}
       />
       
       <Tooltip 
         id="event-tooltip"
         style={{ 
           backgroundColor: '#1f2937',
           color: 'white',
           fontSize: '12px',
           padding: '8px 12px',
           borderRadius: '6px',
           maxWidth: '300px',
           zIndex: 9999,
           boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
         }}
        />

        {/* Remove Event Dialog */}
        <AlertDialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Event</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove "{selectedEventForRemove?.title || 'this event'}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isRemoving}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleRemoveEvent}
                disabled={isRemoving}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isRemoving ? (
                  <>
                    {/* <Loader2 className="mr-2 h-4 w-4 animate-spin" /> */}
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Removing...
                  </>
                ) : (
                  'Remove Event'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  };
  
  export default Board;
