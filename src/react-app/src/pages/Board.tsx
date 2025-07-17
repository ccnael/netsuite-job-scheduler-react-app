import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '../components/Card';
import { Resources } from '../components/Resources';
import { fetchEvents, type Event } from '@/api/event';
import { fetchEmployees, type Employee } from '@/api/employee';
import { fetchVendors, type Vendor } from '@/api/vendor';
import { fetchAssets, type Asset } from '@/api/asset';
import { fetchWOResources, type WOResource } from '@/api/woResource';
import { fetchWOVendors, type WOVendor } from '@/api/woVendor';
import { fetchWOAssets, type WOAsset } from '@/api/woAsset';
import { fetchWorkOrders, type WorkOrder } from '@/api/workOrder';
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
import { MultiSelect } from '../components/MultiSelect';
import MultiSelectFilter from '../components/forms/MultiSelectFilter';
import { ChevronRight, Filter, Bot, ClipboardCheck, Calendar, Plus, Search, Users, X } from "lucide-react";
import DateRangeFilter from '../components/forms/DateRangeFilter';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Stars } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateEvent } from '../components/forms/CreateEvent';
import { UpdateEvent } from '../components/forms/UpdateEvent';
import { CompleteEvent } from '../components/forms/CompleteEvent';
import { Tooltip } from 'react-tooltip';

interface FilterState {
  titles: string[];
  descriptions: string[];
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
  project: string;
  salesOrder: string;
  estHours: number;
  woUrl?: string;
  soUrl?: string;
  projectUrl?: string;
  customerUrl?: string;
  workOrder?: WorkOrder;
  receiptStatus: ReceiptStatus;
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
  manpower: number;
  notes: string;
}

interface SelectedAsset {
  id: string;
  name: string;
  quantity: number;
  startTime: string;
  endTime: string;
}

interface SelectedWOItem {
  id: string;
  name: string;
  quantity: number;
}

interface SelectedWOContact {
  id: string;
  name: string;
}

interface SelectedWOAddress {
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
  selectedWOItems: SelectedWOItem[];
  selectedWOContacts: SelectedWOContact[];
  selectedWOAddress: SelectedWOAddress | null;
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
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setIsLoading(true);

        const [
          eventData,
          employeeData,
          vendorData,
          assetData,
          woResourceData,
          woVendorData,
          woAssetData,
          workOrderData,
        ] = await Promise.all([
          fetchEvents().catch(() => []),
          fetchEmployees().catch(() => []),
          fetchVendors().catch(() => []),
          fetchAssets().catch(() => []),
          fetchWOResources('', '').catch(() => []),
          fetchWOVendors('', '').catch(() => []),
          fetchWOAssets('', '').catch(() => []),
          fetchWorkOrders().catch(() => []),
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
          project: wo.project.text,
          salesOrder: wo.salesorder.text,
          estHours: +wo.esthours,
          woUrl: wo.woUrl,
          soUrl: wo.soUrl,
          projectUrl: wo.projectUrl,
          workOrder: wo,
          receiptStatus: wo.receiptStatus || { text: '', value: '' }
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
        console.error('Calendar: Failed to load data:', error);
        toast.error('Failed to load calendar data');
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, []);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCompleteEventModalOpen, setIsCompleteEventModalOpen] = useState(false);
  const [selectedEventForUpdate, setSelectedEventForUpdate] = useState<Event | null>(null);
  const [selectedEventForComplete, setSelectedEventForComplete] = useState<Event | null>(null);

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
        setEvents(events.filter(e => e.id !== cardId));
        toast.info(`${cardTitle} removed from events`);
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
  
  const [resourcesFilter, setResourcesFilter] = useState<FilterState>({
    titles: [],
    descriptions: [],
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
  });
  const [availableJobsFilter, setAvailableJobsFilter] = useState<FilterState>({
    titles: [],
    descriptions: [],
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
  });

  const uniqueTitles = Array.from(new Set(jobs?.map(job => job.title) ?? []));
  const uniqueDescriptions = Array.from(new Set(jobs?.map(job => job.description) ?? []));
  const uniqueStatuses = Array.from(new Set(jobs?.map(job => job.status.text) ?? []));
  /* const uniqueEventStatuses = Array.from(new Set(events?.map(event => event.status?.text || '') ?? [])).filter(Boolean).map(status => ({
    value: status,
    label: status
  })); */
  const uniqueEventStatuses = [
    {
      value: 'Tentative',
      label: 'Tentative'
    },
    {
      value: 'Confirmed',
      label: 'Confirmed'
    },
    {
      value: 'Completed',
      label: 'Completed'
    }
  ];

  /* const uniqueEventPriorities = Array.from(new Set(events?.map(event => event.priority?.text || '') ?? [])).filter(Boolean).map(priority => ({
    value: priority,
    label: priority
  })); */
  const uniqueEventPriorities = [
    {
      value: 'Low',
      label: 'Low'
    },
    {
      value: 'Medium',
      label: 'Medium'
    },
    {
      value: 'High',
      label: 'High'
    },
    {
      value: 'Urgent',
      label: 'Urgent'
    }
  ];

  const uniqueEventTypes = [
    {
      value: 'General Event',
      label: 'General Event'
    },
    {
      value: 'Non General Event',
      label: 'Non General Event'
    },
    {
      value: 'Unassigned Event',
      label: 'Unassigned Event'
    }
  ];
  
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

  // Get unique receipt statuses (hardcoded)
  const uniqueReceiptStatuses = [
    { value: 'Not Received', label: 'Not Received' },
    { value: 'Partially Received', label: 'Partially Received' },
    { value: 'Fully Received', label: 'Fully Received' }
  ];

  const handleResourceDragStart = (resourceId: string, resourceType: 'employee' | 'vendor' | 'asset') => {
    console.log('Resource drag started:', { resourceId, resourceType });
    setDraggedResource({ id: resourceId, type: resourceType });
  };

  const handleResourceDragEnd = () => {
    console.log('Resource drag ended');
    setDraggedResource(null);
  };

  const handleResourceClick = (resourceName: string) => {
    setResourcesFilter(prev => {
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
        toast.error(`${draggedResource.type.charAt(0).toUpperCase() + draggedResource.type.slice(1)} is already assigned to this event`);
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
                      manpower: 1,
                      notes: ''
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

  const handleSubmit = useCallback((submittedFormData: EventFormData) => {
    if (!submittedFormData.eventTitle || !submittedFormData.startDate || !submittedFormData.endDate || (!submittedFormData.allDay && (!submittedFormData.startTime || !submittedFormData.endTime))) {
      console.log('Form Data', submittedFormData);
      toast.error("Please fill in all required fields", {
        position: "top-right",
        className: "!bg-red-100 !text-red-800 !border !border-red-300",
      });
      return;
    }

    const newEvent: Event = {
      id: '',
      title: submittedFormData.eventTitle,
      note: submittedFormData.notes,
      date: {
        recurrence: submittedFormData.startDate,
        dates: [submittedFormData.startDate],
        start: submittedFormData.startDate,
        end: submittedFormData.endDate
      },
      time: submittedFormData.allDay ? undefined : {
        start: submittedFormData.startTime,
        end: submittedFormData.endTime
      },
      status: {
        text: submittedFormData.status,
        value: submittedFormData.status.toUpperCase(),
      },
      priority: {
        text: submittedFormData.priority === '1' ? 'Low' : submittedFormData.priority === '2' ? 'Mid' : submittedFormData.priority === '3' ? 'High' : 'Urgent',
        value: submittedFormData.priority,
      },
      resources: submittedFormData.selectedResources,
      vendors: submittedFormData.selectedVendors,
      assets: submittedFormData.selectedAssets,
      items: submittedFormData?.selectedWOItems,
      contacts: submittedFormData?.selectedWOContacts,
      address: {
        value: submittedFormData?.selectedWOAddress.id,
        text: submittedFormData?.selectedWOAddress.name
      }
    };
    
    setEvents([...events, newEvent]);
    console.log('NEW EVENT', { newEvent, events });
    setIsCreateModalOpen(false);

    if (selectedJob) {
      setSelectedJob(null);
    }
  }, [selectedJob, events]);

  const handleUpdateEvent = useCallback((submittedFormData: EventFormData) => {
    console.log('selectedEventForUpdate', selectedEventForUpdate);
    if (!selectedEventForUpdate) return;
    
    if (!submittedFormData.eventTitle || !submittedFormData.startDate || !submittedFormData.endDate || (!submittedFormData.allDay && (!submittedFormData.startTime || !submittedFormData.endTime))) {
      console.log('Form Data', submittedFormData);
      toast.error("Please fill in all required fields", {
        position: "top-right",
        className: "!bg-red-100 !text-red-800 !border !border-red-300",
      });
      return;
    }

    const updatedEvent: Event = {
      id: selectedEventForUpdate.id,
      title: submittedFormData.eventTitle,
      note: submittedFormData.notes,
      date: {
        recurrence: submittedFormData.startDate,
        dates: [submittedFormData.startDate],
        start: submittedFormData.startDate,
        end: submittedFormData.endDate
      },
      time: submittedFormData.allDay ? undefined : {
        start: submittedFormData.startTime,
        end: submittedFormData.endTime
      },
      status: {
        text: submittedFormData.status,
        value: submittedFormData.status.toUpperCase()
      },
      priority: {
        text: submittedFormData.priority === '1' ? 'Low' : submittedFormData.priority === '2' ? 'Mid' : submittedFormData.priority === '3' ? 'High' : 'Urgent',
        value: submittedFormData.priority
      },
      resources: submittedFormData.selectedResources,
      vendors: submittedFormData.selectedVendors,
      assets: submittedFormData.selectedAssets,
      items: submittedFormData?.selectedWOItems,
      contacts: submittedFormData?.selectedWOContacts,
      address: {
        value: submittedFormData?.selectedWOAddress?.id || '',
        text: submittedFormData?.selectedWOAddress?.name || ''
      }
    };
    
    console.log('UPDATED EVENT', { updatedEvent });
    setIsUpdateModalOpen(false);
    setSelectedJob(null);
  }, [selectedEventForUpdate/* , events */]);

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

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<'jobs' | 'events'>('jobs');

  const handleOpenFilter = (type: 'jobs' | 'events') => {
    setFilterType(type);
    setIsFilterModalOpen(true);
  };

  const getActiveFiltersCount = (filter: FilterState) => {
    return filter.titles.length + filter.descriptions.length + filter.statuses.length + 
           (filter.eventId ? 1 : 0) + filter.resourceNames.length + filter.resourceGroups.length +
           filter.priorities.length + filter.eventTypes.length + 
           (filter.dateFrom ? 1 : 0) + (filter.dateTo ? 1 : 0);
  };

  const filteredJobs = jobs.filter(job => 
    (availableJobsFilter.titles.length === 0 || availableJobsFilter.titles.includes(job.title)) &&
    (availableJobsFilter.descriptions.length === 0 || availableJobsFilter.descriptions.includes(job.description)) &&
    (availableJobsFilter.statuses.length === 0 || availableJobsFilter.statuses.includes(job.status.text))
  );

  const filteredEvents = events.filter(event => {
    // Filter by event ID
    if (resourcesFilter.eventId && !event.id.includes(resourcesFilter.eventId)) {
      return false;
    }
    
    // Filter by resource names  
    if (resourcesFilter.resourceNames.length > 0) {
      const eventResourceNames = [
        ...(event.resources || []).map(r => r.employee?.text || ''),
        ...(event.vendors || []).map(v => v.vendor?.text || ''),
        ...(event.assets || []).map(a => a.asset?.text || '')
      ].filter(Boolean);
      
      const hasMatchingResource = eventResourceNames.some(resourceName => 
        resourcesFilter.resourceNames.some(filterName => 
          resourceName.toLowerCase().includes(filterName.toLowerCase())
        )
      );
      
      if (!hasMatchingResource) {
        return false;
      }
    }
    
    // Filter by resource groups
    if (resourcesFilter.resourceGroups.length > 0) {
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
        resourcesFilter.resourceGroups.some(filterGroup => 
          groupName.toLowerCase().includes(filterGroup.toLowerCase())
        )
      );
      
      if (!hasMatchingResourceGroup) {
        return false;
      }
    }
    
    // Filter by event types
    if (resourcesFilter.eventTypes.length > 0) {
      const hasWorkOrder = event.workorder && event.workorder.value;
      const hasResources = (event.resources || []).length > 0;
      const hasVendors = (event.vendors || []).length > 0;
      const hasAssets = (event.assets || []).length > 0;
      
      const eventType = !hasWorkOrder 
        ? 'General Event'
        : (hasResources || hasVendors || hasAssets)
        ? 'Non General Event'
        : 'Unassigned Event';
      
      if (!resourcesFilter.eventTypes.includes(eventType)) {
        return false;
      }
    }
    
    // Filter by date range
    if (resourcesFilter.dateFrom || resourcesFilter.dateTo) {
      const eventStartDate = new Date(event.date?.start || '');
      const eventEndDate = new Date(event.date?.end || '');
      
      if (resourcesFilter.dateFrom) {
        const fromDate = new Date(resourcesFilter.dateFrom);
        if (eventEndDate < fromDate) {
          return false;
        }
      }
      
      if (resourcesFilter.dateTo) {
        const toDate = new Date(resourcesFilter.dateTo);
        if (eventStartDate > toDate) {
          return false;
        }
      }
    }
    
    // Filter by organizers
    if (resourcesFilter.organizers.length > 0) {
      const eventOrganizer = event.organizer?.text || '';
      if (!resourcesFilter.organizers.includes(eventOrganizer)) {
        return false;
      }
    }
    
    // Filter by receipt statuses
    if (resourcesFilter.receiptStatuses.length > 0) {
      const eventReceiptStatus = getReceiptStatusForEvent(event);
      const receiptStatusText = eventReceiptStatus?.text || '';
      if (!resourcesFilter.receiptStatuses.includes(receiptStatusText)) {
        return false;
      }
    }
    
    // Filter by titles, descriptions, statuses, and priorities
    return (resourcesFilter.titles.length === 0 || resourcesFilter.titles.includes(event.title || '')) &&
           (resourcesFilter.descriptions.length === 0 || resourcesFilter.descriptions.includes(event.note || '')) &&
           (resourcesFilter.statuses.length === 0 || resourcesFilter.statuses.includes(event.status?.text || '')) &&
           (resourcesFilter.priorities.length === 0 || resourcesFilter.priorities.includes(event.priority?.text || ''));
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
      <div className="p-6 h-screen bg-gray-50">
        <div className="flex rounded-lg border relative overflow-hidden h-full">
          <div className="w-[250px] min-w-[250px] h-full bg-white p-4 border-r">
            <div className="space-y-2 h-full flex flex-col">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-1 flex-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 bg-white p-4 h-full">
            <div className="space-y-4 h-full flex flex-col border-r relative">
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-white p-4 h-full">
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
    <div className="p-6 h-screen bg-gray-50">
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
            <CollapsibleContent className="w-[250px] min-w-[250px] h-full bg-white p-4 border-r">
              <div className="h-full flex flex-col">
                <Resources 
                  events={events} 
                  employees={employees}
                  vendors={vendors}
                  assets={assets}
                  isLoading={isLoading}
                  selectedResources={resourcesFilter.resourceNames}
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
            <div className="h-full bg-white p-4">
              <div className="space-y-4 h-full flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4 text-gray-900" strokeWidth={2.5} />
                    <h2 className="text-lg font-medium text-gray-700">Available Jobs</h2>
                    <Badge variant="secondary" className="text-[9px] px-1 py-0 h-3 min-w-[12px]">
                      {filteredJobs.length}
                    </Badge>
                  </div>
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleOpenFilter('jobs')}
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                    {getActiveFiltersCount(availableJobsFilter) > 0 && (
                      <Badge 
                        variant="secondary"
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
                      >
                        {getActiveFiltersCount(availableJobsFilter)}
                      </Badge>
                    )}
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
              className={`h-full bg-white p-4 ${
                draggedCard ? 'border-[5px] border-dashed' : ''
              }`}
              style={draggedCard ? { borderColor: '#26CC4E' } : undefined}
              onDragOver={handleDragOver}
              onDrop={handleJobDrop}
            >
              <div className="space-y-4 h-full flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-900" strokeWidth={2.5} />
                     <h2 className="text-lg font-medium text-gray-700">Events</h2>
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
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleOpenFilter('events')}
                      >
                        <Filter className="h-4 w-4" />
                      </Button>
                      {getActiveFiltersCount(resourcesFilter) > 0 && (
                        <Badge 
                          variant="secondary"
                          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
                        >
                          {getActiveFiltersCount(resourcesFilter)}
                        </Badge>
                      )}
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
        selectedJob={selectedJob ? {
          id: selectedJob.id,
          title: selectedJob.title,
          description: selectedJob.description,
          woUrl: selectedJob.woUrl || '',
          project: selectedJob.project,
          projectUrl: selectedJob.projectUrl || ''
        } : undefined}
        onSubmit={handleSubmit}
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
        selectedEvent={selectedEventForUpdate}
        onSubmit={handleUpdateEvent}
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

      <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[15px] tracking-tight font-semibold">Filter {filterType === 'jobs' ? 'Available Jobs' : 'Events'}</DialogTitle>
            <DialogDescription>
              <span className="tracking-tight text-[12px]">Select your filter criteria below</span>
            </DialogDescription>
          </DialogHeader>
          {filterType === 'events' ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <Input
                  placeholder="Enter Event ID"
                  value={resourcesFilter.eventId}
                  onChange={(e) =>
                    setResourcesFilter((prev) => ({ ...prev, eventId: e.target.value }))
                  }
                  className="h-8 text-sm !text-[12px] placeholder:text-[12px] pl-7 pr-8 outline-none focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:ring-transparent focus:shadow-none"
                />
                {resourcesFilter.eventId && (
                  <button
                    onClick={() => setResourcesFilter((prev) => ({ ...prev, eventId: '' }))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 flex items-center justify-center"
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
                  selected={resourcesFilter.resourceNames}
                  onChange={(value) =>
                    setResourcesFilter((prev) => ({ ...prev, resourceNames: value }))
                  }
                  placeholder="Filter by Resource Name"
                  className="w-full text-sm !text-[12px] placeholder:text-[12px] w-full"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="-mt-[5px]">
                <MultiSelectFilter
                  id="resourceGroup"
                  label=""
                  options={uniqueResourceGroups}
                  selected={resourcesFilter.resourceGroups}
                  onChange={(value) =>
                    setResourcesFilter((prev) => ({ ...prev, resourceGroups: value }))
                  }
                  placeholder="Filter by Resource Group"
                  className="w-full text-sm !text-[12px] placeholder:text-[12px] w-full"
                />
              </div>
              
              <div className="-mt-[5px]">
                <MultiSelectFilter
                  id="eventStatus"
                  label=""
                  options={uniqueEventStatuses}
                  selected={resourcesFilter.statuses}
                  onChange={(value) =>
                    setResourcesFilter((prev) => ({ ...prev, statuses: value }))
                  }
                  placeholder="Filter by Status"
                  className="w-full text-sm !text-[12px] placeholder:text-[12px] w-full"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="-mt-[5px]">
                <MultiSelectFilter
                  id="eventPriority"
                  label=""
                  options={uniqueEventPriorities}
                  selected={resourcesFilter.priorities}
                  onChange={(value) =>
                    setResourcesFilter((prev) => ({ ...prev, priorities: value }))
                  }
                  placeholder="Filter by Priority"
                  className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                />
              </div>
              
              <div className="-mt-[5px]">
                <MultiSelectFilter
                  id="eventType"
                  label=""
                  options={uniqueEventTypes}
                  selected={resourcesFilter.eventTypes}
                  onChange={(value) =>
                    setResourcesFilter((prev) => ({ ...prev, eventTypes: value }))
                  }
                  placeholder="Filter by Event Type"
                  className="w-full text-sm !text-[12px] placeholder:text-[12px] w-full"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="-mt-[5px]">
                <DateRangeFilter
                  id="dateFrom"
                  label=""
                  value={resourcesFilter.dateFrom}
                  onChange={(value) =>
                    setResourcesFilter((prev) => ({ ...prev, dateFrom: value }))
                  }
                  placeholder="Date From"
                />
              </div>
              
              <div className="-mt-[5px]">
                <DateRangeFilter
                  id="dateTo"
                  label=""
                  value={resourcesFilter.dateTo}
                  onChange={(value) =>
                    setResourcesFilter((prev) => ({ ...prev, dateTo: value }))
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
                  selected={resourcesFilter.organizers}
                  onChange={(value) =>
                    setResourcesFilter((prev) => ({ ...prev, organizers: value }))
                  }
                  placeholder="Filter by Organizer"
                  className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                />
              </div>
              
              <div className="-mt-[5px]">
                <MultiSelectFilter
                  id="receiptStatus"
                  label=""
                  options={uniqueReceiptStatuses}
                  selected={resourcesFilter.receiptStatuses}
                  onChange={(value) =>
                    setResourcesFilter((prev) => ({ ...prev, receiptStatuses: value }))
                  }
                  placeholder="Filter by Receipt Status"
                  className="w-full text-sm !text-[12px] placeholder:text-[12px]"
                />
              </div>
            </div>
          </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <MultiSelect
                  options={uniqueTitles}
                  selected={availableJobsFilter.titles}
                  onChange={(value) => setAvailableJobsFilter(prev => ({ ...prev, titles: value }))}
                  placeholder="Filter by title"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <MultiSelect
                  options={uniqueDescriptions}
                  selected={availableJobsFilter.descriptions}
                  onChange={(value) => setAvailableJobsFilter(prev => ({ ...prev, descriptions: value }))}
                  placeholder="Filter by description"
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <MultiSelect
                  options={uniqueStatuses}
                  selected={availableJobsFilter.statuses}
                  onChange={(value) => setAvailableJobsFilter(prev => ({ ...prev, statuses: value }))}
                  placeholder="Filter by status"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => {
              alert('TBD');
              // setIsFilterModalOpen(false);
            }} className="text-[12px] h-8 px-3 tracking-tight">Select Fields</Button>
            <Button variant="outline" onClick={() => {
              setResourcesFilter({
                titles: [],
                descriptions: [],
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
              });
              setAvailableJobsFilter({
                titles: [],
                descriptions: [],
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
              });
            }} className="text-[12px] h-8 px-3 tracking-tight">
              Clear All
            </Button>
          </DialogFooter>
         </DialogContent>
       </Dialog>
       
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
     </div>
   );
 };
 
 export default Board;
