import { useState, useEffect, useCallback, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Draggable } from '@fullcalendar/interaction';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { fetchEvents, type Event } from '@/api/event';
import { format, parse } from "date-fns";
import { fetchEmployees, type Employee } from '@/api/employee';
import { fetchVendors, type Vendor } from '@/api/vendor';
import { fetchAssets, type Asset } from '@/api/asset';
import { fetchWOResources, type WOResource } from '@/api/woResource';
import { fetchWOVendors, type WOVendor } from '@/api/woVendor';
import { fetchWOAssets, type WOAsset } from '@/api/woAsset';
import { fetchWorkOrders, type WorkOrder } from '@/api/workOrder';
import { fetchRoutingGroups, type RoutingGroup } from '@/api/routingGroup';
import { fetchWOItems, type WOItem } from '@/api/woItem';
import { fetchWOContacts, type WOContact } from '@/api/woContact';
import { fetchWOAddresses, type WOAddress } from '@/api/woAddress';
import { fetchCustomers, type Customer } from "@/api/customer";
import { fetchLocations, type Location } from "@/api/location";
import { toast } from "sonner";
import { Card } from '../components/Card';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { ClipboardCheck, Users, Stars, Filter, Search } from "lucide-react";
import { Stars, ChevronRight, Filter, Bot, ClipboardCheck, Plus, Search, Users, X, MoreVertical } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Tooltip } from 'react-tooltip';
import { CreateEvent } from '../components/forms/CreateEvent';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MultiSelectFilter from '../components/forms/MultiSelectFilter';
import { Option } from '@/components/ui-custom/MultiSelect';
import DateRangeFilter from '../components/forms/DateRangeFilter';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { receiptStatuses, eventStatuses, eventPriorities, eventTypes } from "@/lib/constants";
import { formatDate, formatTime } from "@/lib/helpers";

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

interface Job {
  id: string;
  title: string;
  description: string;
  memo: string;
  status: {
    text: string;
    value: string;
    code: string;
  };
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
  receiptStatus: {
    text: string;
    value: string;
    code?: string;
    display?: string;
  };
}

const Calendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [routingGroups, setRoutingGroups] = useState<RoutingGroup[]>([]);
  const [routingGroupsLoaded, setRoutingGroupsLoaded] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersLoaded, setCustomersLoaded] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [locationsLoaded, setLocationsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [draggedJob, setDraggedJob] = useState<Job | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [prefilledResourceId, setPrefilledResourceId] = useState<string | undefined>(undefined);
  const [prefilledStartDate, setPrefilledStartDate] = useState<string | undefined>(undefined);
  const [prefilledEndDate, setPrefilledEndDate] = useState<string | undefined>(undefined);
  const [prefilledStartTime, setPrefilledStartTime] = useState<string | undefined>(undefined);
  const [prefilledEndTime, setPrefilledEndTime] = useState<string | undefined>(undefined);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmDialogData, setConfirmDialogData] = useState<{
    type: 'move' | 'resize';
    id: string;
    title: string;
    oldStart: string;
    oldEnd: string;
    newStart: string;
    newEnd: string;
    oldResource?: string;
    newResource?: string;
    onConfirm: () => void;
    onCancel: () => void;
  } | null>(null);
  const [currentViewStart, setCurrentViewStart] = useState<Date | null>(null);
  const [currentViewEnd, setCurrentViewEnd] = useState<Date | null>(null);
  const [currentViewType, setCurrentViewType] = useState<string | null>(null);
  
  // Filter state
  const [isEventsFilterOpen, setIsEventsFilterOpen] = useState(false);

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
    routingGroups: [],
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
  
  const calendarRef = useRef<FullCalendar | null>(null);


  const getActiveEventFiltersCount = (filter: EventFilterState) => {
    return filter.statuses.length + 
           (filter.eventId ? 1 : 0) + filter.resourceNames.length + filter.resourceGroups.length +
           filter.priorities.length + filter.eventTypes.length + 
           (filter.dateFrom ? 1 : 0) + (filter.dateTo ? 1 : 0) + 
           filter.organizers.length + filter.receiptStatuses.length + 
           filter.routingGroups.length;
  };

  // Update badge when filter changes
  useEffect(() => {
    if ((window as any).updateEventFilterBadge) {
      const activeCount = getActiveEventFiltersCount(eventsFilter);
      (window as any).updateEventFilterBadge(activeCount);
    }
  }, [eventsFilter]);

  // Function to count events in current view date range
  const getEventsInCurrentView = () => {
    /* console.log('getEventsInCurrentView called:', { 
      currentViewStart, 
      currentViewEnd, 
      filteredEventsLength: filteredEvents.length 
    }); */
    
    if (!currentViewStart || !currentViewEnd) {
      // console.log('No view dates set, returning 0');
      return 0;
    }
    
    const eventsInView = filteredEvents.filter(event => {
      const eventStart = new Date(event.date?.start || '');
      const eventEnd = new Date(event.date?.end || '');
      
      /* if (event.id == '101153') {
        console.log('Checking event:', { 
          eventId: event.id, 
          eventStart: eventStart.toISOString(), 
          eventEnd: eventEnd.toISOString(),
          viewStart: currentViewStart.toISOString(),
          viewEnd: currentViewEnd.toISOString()
        });
      } */
      
      // Check if event overlaps with current view range
      const overlaps = eventStart <= currentViewEnd && eventEnd >= currentViewStart;
      /* if (event.id == '101153') {
        console.log('Event overlaps:', overlaps);
      } */
      return overlaps;
    });
    
    console.log('Events in current view:', eventsInView.length);
    return eventsInView.length;
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

  // Update events count badge when filters change
  useEffect(() => {
    if ((window as any).updateEventCountBadge) {
      (window as any).updateEventCountBadge(filteredEvents);
    }
  }, [eventsFilter, events, filteredEvents]);


  const loadAllData = useCallback(async () => {
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
        woItemData,
        woContactData,
        woAddressData
      ] = await Promise.all([
        fetchEvents().catch(() => []),
        fetchEmployees().catch(() => []),
        fetchVendors().catch(() => []),
        fetchAssets().catch(() => []),
        fetchWOResources('', '').catch(() => []),
        fetchWOVendors('', '').catch(() => []),
        fetchWOAssets('', '').catch(() => []),
        fetchWorkOrders().catch(() => []),
        fetchWOItems('', '').catch(() => []),
        fetchWOContacts('', '').catch(() => []),
        fetchWOAddresses('', '').catch(() => []),
      ]);

        // Hydrate event data with WO resource links
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
            event.address = { ...address.address };
            event.addresses = event.addresses || [];
            event.addresses.push({
              ...address
            });
          }
        }

        // Transform work orders to jobs
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
          receiptStatus: wo.receiptStatus || { text: '', value: '' }
        }));

        // Set all the updated data
        setEvents(eventData);
        setEmployees(employeeData);
        setVendors(vendorData);
        setAssets(assetData);
        setJobs(jobsData);
      } catch (error) {
        console.error('Calendar: Failed to load data:', error);
        toast.error('Failed to load calendar data');
      } finally {
        setIsLoading(false);
      }
    }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // console.log('eventData', events.find(x => x.id == '101211'));

  const calendarEvents = [];

  events.forEach(event => {
     //  WO Resources
    event.resources.forEach(resource => {
      resource.resourceGroups.forEach(resourceGroup => {             
          const tooltipContent = [
            `<strong>${event.title || 'Untitled Event'}</strong>`,
            `ID ${event.id}`,
            '',
            `<strong>${resource.employee?.text || 'Unknown Resource'}</strong>`,
            resource.date ? `${formatDate(resource.date.start)} - ${formatDate(resource.date.end)}` : (event.date ? `${formatDate(event.date.start)} - ${formatDate(event.date.end)}` : ''),
            resource.time ? `${formatTime(resource.time.start)} - ${formatTime(resource.time.end)}` : (event.time ? `${formatTime(event.time.start)} - ${formatTime(event.time.end)}` : '')
          ].filter(Boolean).join('<br>');
        
        calendarEvents.push({
          id: `resource-${resourceGroup.value}-${resource.employee?.value}-${event.id}`,
          title: event.title || 'Untitled Event',
          start: new Date(`${event.date.start}T${resource.time.start}`),
          end: new Date(`${event.date.end}T${resource.time.end}`),
          resourceIds: [`${resourceGroup.value}-${resource.employee?.value}`],
          description: event.note || '',
          color: event.status.code,
          extendedProps: {
            ...event,
            resourceType: 'employee',
            woResourceId: resource.id,
            originalEventId: event.id,
            calendarResourceId: `${resourceGroup.value}-${resource.employee?.value}`,
            tooltipContent
          }
        });
      });
    });

     // WO Vendors
    event.vendors.forEach(vendor => {
      const tooltipContent = [
        `<strong>${event.title || 'Untitled Event'}</strong>`,
        `ID ${event.id}`,
        '',
        `<strong>${vendor.vendor?.text || 'Unknown Vendor'}</strong>`,
        event.date ? `${formatDate(event.date.start)} - ${formatDate(event.date.end)}` : '',
        event.time ? `${formatTime(event.time.start)} - ${formatTime(event.time.end)}` : ''
      ].filter(Boolean).join('<br>');

      calendarEvents.push({
        id: `vendor-${vendor.vendor.value}-${event.id}`,
        title: event.title || 'Untitled Event',
        start: new Date(`${event.date.start}T${event.time.start}:00`),
        end: new Date(`${event.date.end}T${event.time.end}:00`),
        resourceIds: [`vendor-${vendor.vendor.value}`],
        description: event.note || '',
        color: event.status.code,
        extendedProps: {
          ...event,
          resourceType: 'vendor',
          woVendorId: vendor.id,
          originalEventId: event.id,
          calendarResourceId: `vendor-${vendor.vendor.value}`,
          tooltipContent
        }
      });
    });

     // WO Assets
    event.assets.forEach(asset => {
       const tooltipContent = [
         `<strong>${event.title || 'Untitled Event'}</strong>`,
         `ID ${event.id}`,
         '',
         `<strong>${asset.asset?.text || 'Unknown Asset'}</strong>`,
         asset.date ? `${formatDate(asset.date.start)} - ${formatDate(asset.date.end)}` : (event.date ? `${formatDate(event.date.start)} - ${formatDate(event.date.end)}` : ''),
         asset.time ? `${formatTime(asset.time.start)} - ${formatTime(asset.time.end)}` : (event.time ? `${formatTime(event.time.start)} - ${formatTime(event.time.end)}` : '')
       ].filter(Boolean).join('<br>');

       calendarEvents.push({
         id: `asset-${asset.asset.value}-${event.id}`,
         title: event.title || 'Untitled Event',
         start: new Date(`${event.date.start}T${asset.time?.start || event.time.start}:00`),
         end: new Date(`${event.date.end}T${asset.time?.end || event.time.end}:00`),
         resourceIds: [`asset-${asset.asset.value}`],
         description: event.note || '',
         color: event.status.code,
         extendedProps: {
          ...event,
          resourceType: 'asset',
          woAssetId: asset.id,
          originalEventId: event.id,
          calendarResourceId: `asset-${asset.asset.value}`,
          tooltipContent
         }
       });
    });

    if (!event.resources.length && !event.vendors.length && !event.assets.length) {         
      const tooltipContent = [
        `<strong>${event.title || 'Untitled Event'}</strong>`,
        `ID ${event.id}`,
        '',
        event.date ? `${formatDate(event.date.start)} - ${formatDate(event.date.end)}` : '',
        event.time ? `${formatTime(event.time.start)} - ${formatTime(event.time.end)}` : ''
      ].filter(Boolean).join('<br>');

      calendarEvents.push({
        id: event.id,
        title: event.title || 'Untitled Event',
        start: new Date(`${event.date.start}T${event.time.start}:00`),
        end: new Date(`${event.date.end}T${event.time.end}:00`),
        resourceId: 'z-unassigned',
        color: event.status.code,
        extendedProps: {
          ...event,
          originalEventId: event.id,
          calendarResourceId: 'z-unassigned',
          tooltipContent
        }
      });
    }
  });

  console.log('Processed Events', calendarEvents);
  // console.log('calendarEvents.find(x => x.id == 101211)', calendarEvents.find(x => x.id == '101211'));

  const handleCreateNewEvent = () => {
    setIsCreateModalOpen(true);
    setSelectedJob(null);
    setPrefilledResourceId(undefined);
    setPrefilledStartDate(undefined);
    setPrefilledEndDate(undefined);
    setPrefilledStartTime(undefined);
    setPrefilledEndTime(undefined);
  };

  useEffect(() => {
    const containerEl = document.getElementById('external-jobs');

    if (containerEl) {
      new Draggable(containerEl, {
        itemSelector: '.card-item',
        eventData: function (el) {
          return {
            title: el.getAttribute('data-title') || '',
            extendedProps: {
              woId: el.getAttribute('data-wo-id')
            },
            duration: '04:00' // Optional default duration
          };
        }
      });
    }
  }, [jobs]);

  const handleCardAction = (cardId: string, action: string) => {
    const card = jobs.find(j => j.id === cardId);
    if (!card) return;

    switch (action) {
      case 'print':
        toast.success(`Printing ${card.title}`, {
          className: "!bg-green-100 !text-green-800 !border !border-green-300",
        });
        break;
      case 'hold':
        setJobs(jobs.map(job => 
          job.id === cardId 
            ? { 
                ...job, 
                status: { text: 'On Hold', value: 'ON_HOLD', code: 'ON_HOLD' } 
              }
            : job
        ));
        toast.info(`${card.title} put on hold`);
        break;
      case 'close':
        setJobs(jobs.map(job => 
          job.id === cardId 
            ? { 
                ...job, 
                status: { text: 'Completed', value: 'COMPLETED', code: 'COMPLETED' } 
              }
            : job
        ));
        toast.success(`${card.title} closed`, {
          className: "!bg-green-100 !text-green-800 !border !border-green-300",
        });
        break;
    }
  };

  const handleJobDragStart = (job: Job) => {
    setDraggedJob(job);
  };

  const handleJobDragEnd = () => {
    setDraggedJob(null);
  };

  const handleCalendarDrop = (info: any) => {
    console.log('handleCalendarDrop:', info);
    if (!draggedJob) return;

    // Open CreateEvent modal with the dropped job
    setSelectedJob(draggedJob);
    setIsCreateModalOpen(true);
    setDraggedJob(null);
  };
  
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
        toast.error('Failed to load routing groups');
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

  // Update calendarEvents to use filteredEvents instead of events
  const filteredCalendarEvents = calendarEvents.filter(calEvent => 
    filteredEvents.some(event => event.id === calEvent.extendedProps.originalEventId)
  );

  const resourceGroups = [];

  employees.forEach(emp => {
    emp.resourceGroups.forEach(group => {
      const found = resourceGroups.find(x => x.value == group.value);
      if (found) {
        found.resources.push({ ...emp });
      } else {
        resourceGroups.push({
          ...group,
          resources: [{ ...emp }],
          get resourceCount () {
            return this.resources.length;
          }
        })
      }
    })
  })

  // Generate unassigned events as resources
  const unassignedEvents = filteredEvents.filter(event =>
    !event.resources.length && !event.vendors.length && !event.assets.length
  );

  const combinedResourceGroups = [
    ...resourceGroups,
    {
      text: 'Vendor',
      value: 'vendor',
      resources: vendors,
      resourceCount: vendors.length,
    },
    {
      text: 'Assets',
      value: 'asset',
      resources: assets,
      resourceCount: assets.length,
    }
  ];

  const calendarResources = combinedResourceGroups.map(resourceGroup => {    
    return {
      id: resourceGroup.value,
      title: resourceGroup.text,
      children: resourceGroup.resources
        .map(resource => {
          return {
            id: `${resourceGroup.value}-${resource.id}`,
            // title: resource.name,
            customTitleHtml: `<span class="text-[11px] font-normal text-foreground">${resource.name}</span>`,
            extendedProps: resource
          };
        }),
    extendedProps: {
      ...resourceGroup,
      customTitleHtml: `
        <span class="text-[12px] font-semibold text-foreground">${resourceGroup.text}</span>
        <span class="inline-flex items-center rounded-full border border-transparent bg-secondary text-secondary-foreground px-1 py-0 text-[9px] font-semibold h-3 min-w-[12px] justify-center ml-1">${resourceGroup.resources.length}</span>
      `
    }
  };
  });

  // Add single Unassigned resource
  if (unassignedEvents.length > 0) {
    calendarResources.push({
      id: 'z-unassigned',
      title: 'Unassigned',
      children: [],
      extendedProps: {
        customTitleHtml: `<span class="text-[12px] font-bold text-foreground">Unassigned</span>`
      }
    });
  }

  console.log('Calendar Resources', calendarResources);

  const getResourceName = (resourceId: string) => {
    if (!resourceId) return 'Unassigned';
    
    if (resourceId === 'z-unassigned') return 'Unassigned';
    // console.log('getResourceName', resourceId);
    // Find the resource in calendarResources
    for (const group of calendarResources) {
      if (group.children) {
        const resource = group.children.find(child => child.id === resourceId);
        if (resource) {
          return resource.extendedProps?.name || resource.title || 'Unknown';
        }
      }
    }
    
    return 'Unknown';
  };

  const handleDateClick = (arg: any) => {
    toast.info(`Date clicked: ${arg.dateStr}`);
  };

   const handleEventClick = (arg: any) => {
    //  toast.info(`Event clicked: ${arg.event.title}`);
    console.log('Event. clicked', arg);
    window.open(arg.event.extendedProps.url);
    arg.jsEvent.preventDefault();
   };

   const handleEventAction = (action: string, eventId: string) => {
     const event = events.find(e => e.id === eventId);
     if (!event) return;

     switch (action) {
       case 'update':
         toast.info(`IN PROGRESS...`);
         break;
       case 'complete':
         toast.info(`IN PROGRESS...`);
         break;
       case 'remove':
         toast.info(`IN PROGRESS...`);
         break;
     }
   };

   const handleEventMouseEnter = (arg: any) => {
     const eventElement = arg.el;
     const tooltipContent = arg.event.extendedProps.tooltipContent;
     
     if (tooltipContent) {
       eventElement.setAttribute('data-tooltip-id', 'event-tooltip');
       eventElement.setAttribute('data-tooltip-html', tooltipContent);
     }
   };

   const handleEventMouseLeave = (arg: any) => {
     const eventElement = arg.el;
     eventElement.removeAttribute('data-tooltip-id');
     eventElement.removeAttribute('data-tooltip-html');
   };

  
  const handleDatesSet = (dateInfo: any) => {
    // console.log('handleDatesSet called with:', dateInfo);
    
    // Update current view date range
    if (dateInfo.start && dateInfo.end) {
      setCurrentViewStart(dateInfo.start);
      setCurrentViewEnd(dateInfo.end);
      
      /* console.log('Updated view dates:', {
        start: dateInfo.start.toISOString(),
        end: dateInfo.end.toISOString()
      }); */

      if ((window as any).updateEventCountBadge) {
        (window as any).updateEventCountBadge();
      }
    }
  };

  const handleViewDidMount = (viewInfo: any) => {
    // console.log('handleViewDidMount called with:', viewInfo);
    // console.log('View activeStart:', viewInfo.view?.activeStart);
    // console.log('View activeEnd:', viewInfo.view?.activeEnd);
    
    // Check if view type changed (only update event count badge on view type change)
    const newViewType = viewInfo.view?.type;
    const isViewTypeChange = currentViewType !== null && currentViewType !== newViewType;
    const isInitialLoad = currentViewType === null;
    
    setCurrentViewType(newViewType);
    
    // Update current view date range
    if (viewInfo.view?.activeStart && viewInfo.view?.activeEnd) {
      setCurrentViewStart(viewInfo.view.activeStart);
      setCurrentViewEnd(viewInfo.view.activeEnd);
      console.log('Updated view dates:', {
        start: viewInfo.view.activeStart.toISOString(),
        end: viewInfo.view.activeEnd.toISOString()
      });
      
      // Only update event count badge on page load or view type change
      if (isInitialLoad || isViewTypeChange) {
        console.log('Updating event count badge - reason:', isInitialLoad ? 'initial load' : 'view type change');
        // Use a slight delay to ensure DOM is ready and state is updated
        setTimeout(() => {
          if ((window as any).updateEventCountBadge) {
            (window as any).updateEventCountBadge();
          }
        }, 200);
      }
    }
    
    const titleEl = document.querySelector('h2.fc-toolbar-title');

    if (titleEl && !document.querySelector('.fc-shadcn-filter-button')) {
      const button = document.createElement('button');
      button.type = 'button';
      button.disabled = false;
      button.className = `
        fc-shadcn-filter-button ml-2 inline-flex items-center justify-center rounded-md border border-input 
        bg-background px-2 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent 
        hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
        focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8
      `.replace(/\s+/g, ' ').trim();

      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-filter h-4 w-4">
          <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
        </svg>
      `;
      button.onclick = () => setIsEventsFilterOpen(!isEventsFilterOpen);

      // Create button wrapper for badge positioning
      const buttonWrapper = document.createElement('div');
      buttonWrapper.className = 'relative';
      buttonWrapper.appendChild(button);

      // Add badge for active filters count
      const updateBadge = (activeCount: number) => {
        const existingBadge = buttonWrapper.querySelector('.filter-badge');
        if (existingBadge) {
          existingBadge.remove();
        }
        
        if (activeCount > 0) {
          const badge = document.createElement('div');
          badge.className = 'filter-badge absolute -top-2 -right-2 mt-[7px] h-4 w-4 flex items-center justify-center p-0 text-[9px] font-semibold border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2';
          badge.textContent = activeCount.toString();
          buttonWrapper.appendChild(badge);
        }
      };

      // Update badge initially with current filter count
      const currentActiveCount = getActiveEventFiltersCount(eventsFilter);
      updateBadge(currentActiveCount);
      
      // Store reference to update function for later use
      (window as any).updateEventFilterBadge = updateBadge;

      const flexWrapper = document.createElement('div');
      flexWrapper.className = 'flex items-center space-x-2';
      
      // Create event count badge
      const eventCountBadge = document.createElement('div');
      eventCountBadge.className = 'inline-flex items-center rounded-full border border-transparent bg-secondary px-2 py-0 text-[11px] font-semibold text-secondary-foreground h-5 min-w-[20px] justify-center';
      eventCountBadge.id = 'event-count-badge';
      
      titleEl.replaceWith(flexWrapper);
      flexWrapper.appendChild(titleEl);
      flexWrapper.appendChild(eventCountBadge);
      flexWrapper.appendChild(buttonWrapper);
      
      // Update event count badge function
      const updateEventCountBadge = (currentFilteredEvents = filteredEvents) => {
        // Use the most current view dates from the calendar itself
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
          const currentView = calendarApi.view;
          const viewStart = currentView.activeStart;
          const viewEnd = currentView.activeEnd;
          
          /* console.log('Badge update - using view dates:', {
            start: viewStart.toISOString(),
            end: viewEnd.toISOString(),
            filteredEventsLength: currentFilteredEvents.length
          }); */
          
          const eventsInView = currentFilteredEvents.filter(event => {
            const eventStart = new Date(event.date?.start || '');
            const eventEnd = new Date(event.date?.end || '');
            
            // Check if event overlaps with current view range
            const overlaps = eventStart <= viewEnd && eventEnd >= viewStart;
            return overlaps;
          });
          
          // console.log('Badge update - events in view:', eventsInView.length);
          eventCountBadge.textContent = `${eventsInView.length}`;
        } else {
          // Fallback to state-based dates
          const count = getEventsInCurrentView();
          // console.log('Badge update - fallback count:', count);
          eventCountBadge.textContent = `${count}`;
        }
      };
      
      // Store reference for later updates
      (window as any).updateEventCountBadge = updateEventCountBadge;
      
      // Initial update
      updateEventCountBadge();
    }

    // Add Legend
    if (!document.getElementById('legend')) {
      const legendWrapper = document.createElement('div');
      legendWrapper.className = 'w-full flex justify-center mb-2 -ml-14';
      legendWrapper.id = 'legend-wrapper';

      const legend = document.createElement('div');
      legend.id = 'legend';
      legend.className = 'flex items-center space-x-4 text-[11px]';
      legend.innerHTML = `
        <div class="flex items-center space-x-1">
          <span class="w-3 h-3 bg-[#6c757d] inline-block rounded-[3px]"></span>
          <span>Tentative</span>
        </div>
        <div class="flex items-center space-x-1">
          <span class="w-3 h-3 bg-[#026adf] inline-block rounded-[3px]"></span>
          <span>Confirmed</span>
        </div>
        <div class="flex items-center space-x-1">
          <span class="w-3 h-3 bg-[#28a745] inline-block rounded-[3px]"></span>
          <span>Completed</span>
        </div>
      `;

      legendWrapper.appendChild(legend);

      const toolbarParent = document.querySelector('.fc-header-toolbar');
      if (toolbarParent) {
        toolbarParent.insertAdjacentElement('afterend', legendWrapper);
      }
    }
  }

  if (isLoading) {
    /* return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    ); */
    return (
      <div className="p-6 h-screen bg-background">
        <div className="flex rounded-lg border relative overflow-hidden h-full">
          {/* Left side: 80% */}
          <div className="basis-[80%] bg-background p-4 h-full">
            <div className="space-y-4 h-full flex flex-col border-r relative">
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              </div>
            </div>
          </div>

          {/* Right side: 20% */}
          <div className="basis-[20%] bg-background p-4 h-full">
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

  return (
    <div className="p-4 h-[calc(100vh-2rem)] bg-background">
      <ResizablePanelGroup direction="horizontal" className="gap-4">
        <ResizablePanel defaultSize={75} minSize={50}>
          <div className="bg-background rounded-lg shadow-lg p-6 h-full border">
            <ScrollArea className="h-[calc(100%-1rem)]">
              <div className="h-[calc(100%-4rem)] bg-background">
                <FullCalendar
                  ref={calendarRef}
                  plugins={[dayGridPlugin, timeGridPlugin, resourceTimelinePlugin, interactionPlugin]}
                  schedulerLicenseKey="XXXX"
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'resourceTimelineDay,resourceTimeline3Days,resourceTimelineWeek newEvent'
                  }}
                  initialView={'resourceTimeline3Days'}
                  views={{
                    resourceTimelineDay: {
                      buttonText: 'Day',
                      slotDuration: '01:00:00',
                      slotLabelInterval: '01:00',
                    },
                    resourceTimeline3Days: {
                      type: 'resourceTimeline',
                      duration: { days: 3 },
                      buttonText: '3 Days',
                      titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
                      slotDuration: '04:00:00',
                      slotLabelFormat: [
                        {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        },
                        {
                          hour: 'numeric',
                          omitZeroMinute: false,
                          meridiem: 'short'
                        }
                      ],
                    },
                    resourceTimelineWeek: {
                      type: 'resourceTimeline',
                      duration: { weeks: 1 },
                      buttonText: 'Week',
                      titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
                      slotDuration: '04:00:00',
                      slotLabelFormat: [
                        {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        },
                        {
                          hour: 'numeric',
                          omitZeroMinute: false,
                          meridiem: 'short'
                        }
                      ]
                    }
                  }}
                   events={filteredCalendarEvents}
                   resources={calendarResources}
                   resourceOrder={'group'}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    eventMouseEnter={handleEventMouseEnter}
                    eventMouseLeave={handleEventMouseLeave}
                    eventContent={(arg) => {
                      const event = events.find(e => e.id === arg.event.extendedProps.originalEventId);
                      if (!event) return null;
                      
                      return (
                        <div className="flex items-center justify-between w-full p-1 relative group">
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium truncate">
                              {event.title || 'Untitled Event'} [ID {event.id}]
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-5 w-5 p-0 hover:bg-background"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-32">
                              <DropdownMenuItem 
                                className="text-xs cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEventAction('update', event.id);
                                }}
                              >
                                Update
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-xs cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEventAction('complete', event.id);
                                }}
                              >
                                Complete
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-xs cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEventAction('remove', event.id);
                                }}
                              >
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      );
                    }}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  weekends={true}
                  height="100%"
                  slotMinTime="00:00:00"
                  slotMaxTime="24:00:00"
                  allDaySlot={false}
                  resourceAreaWidth="200px"
                  resourceAreaColumns={[
                    {
                      field: 'title',
                      headerContent: () => (
                        <div className="flex items-center gap-2 -mt-3">
                          <Users className="h-4 w-4 text-foreground mt-[1px]" strokeWidth={2.5} />
                          <h2 className="text-sm font-medium text-foreground">Resources</h2>
                          <Badge
                            variant="secondary"
                            className="text-[9px] px-1 py-0 h-3 min-w-[12px]"
                          >
                            {employees.length + vendors.length + assets.length}
                          </Badge>
                        </div>
                      )
                    }
                  ]}
                  resourceLabelContent={(arg) => {
                    if (arg.resource.extendedProps.customTitleHtml) {
                      return { html: arg.resource.extendedProps.customTitleHtml };
                    }
                    return arg.resource.title;
                  }}
                  nowIndicator={true}
                  droppable={true}
                  editable={true}
                  aspectRatio={1}
                  eventDurationEditable={true}
                  eventResizableFromStart={true}
                  eventOverlap={true}
                  contentHeight={'auto'}
                  scrollTime={'08:00:00'}
                  dayMinWidth={100}
                  slotMinWidth={75}
                  snapDuration='01:00:00'
                  drop={handleCalendarDrop}
                  customButtons={{
                    newEvent: {
                      text: '+ New Event',
                      click: handleCreateNewEvent
                    }
                  }}
                   viewDidMount={handleViewDidMount}
                   datesSet={handleDatesSet}
                   slotLaneClassNames={() => ['fc-slot-hoverable']}
                   eventReceive={(info) => {
                       console.log('eventReceive:', info);
                       const woId = info.event.extendedProps.woId;
                       if (woId) {
                         const job = jobs.find(j => j.id === woId);
                         if (job) {
                           // Capture resource information
                           const resources = info.event.getResources();
                           const resourceId = resources.length > 0 ? resources[0].id : undefined;
                           
                           // Capture date/time information
                           const startDate = info.event.start ? format(info.event.start, 'yyyy-MM-dd') : '';
                           const endDate = info.event.end ? format(info.event.end, 'yyyy-MM-dd') : startDate;
                           const startTime = info.event.start ? format(info.event.start, 'HH:mm') : '08:00';
                           const endTime = info.event.end ? format(info.event.end, 'HH:mm') : '12:00';
                           
                           console.log('Drop info:', { resourceId, startDate, endDate, startTime, endTime });
                           
                           setSelectedJob(job);
                           setPrefilledResourceId(resourceId);
                           setPrefilledStartDate(startDate);
                           setPrefilledEndDate(endDate);
                           setPrefilledStartTime(startTime);
                           setPrefilledEndTime(endTime);
                           setIsCreateModalOpen(true);
                         }
                       }
                       info.revert();
                   }}
                     eventDrop={(info) => {
                         const oldStart = info.oldEvent.start ? format(info.oldEvent.start, 'PPP p') : '';
                         const oldEnd = info.oldEvent.end ? format(info.oldEvent.end, 'PPP p') : '';
                         const newStart = info.event.start ? format(info.event.start, 'PPP p') : '';
                         const newEnd = info.event.end ? format(info.event.end, 'PPP p') : '';
                         const oldCalResourceId = info.oldEvent.extendedProps.calendarResourceId;
                         const newCalResourceId = info.oldEvent.extendedProps.calendarResourceId;
                         
                         const oldResourceId = info.oldResource?.id || oldCalResourceId;
                         const newResourceId = info.newResource?.id || newCalResourceId;
                         const oldResourceName = getResourceName(oldResourceId);
                         const newResourceName = getResourceName(newResourceId);
                         console.log('Confirm Event dropped:', info);
                         
                         setConfirmDialogData({
                           type: 'move',
                           id: info.event.extendedProps.id,
                           title: info.event.title,
                           oldStart,
                           oldEnd,
                           newStart,
                           newEnd,
                           oldResource: oldResourceName,
                           newResource: newResourceName,
                           onConfirm: () => {
                             console.log('Event dropped:', info);
                             toast.success('Event moved successfully');
                             setIsConfirmDialogOpen(false);
                           },
                           onCancel: () => {
                             info.revert();
                             setIsConfirmDialogOpen(false);
                           }
                         });
                         setIsConfirmDialogOpen(true);
                     }}
                     eventResize={(info) => {
                         const oldStart = info.oldEvent.start ? format(info.oldEvent.start, 'PPP p') : '';
                         const oldEnd = info.oldEvent.end ? format(info.oldEvent.end, 'PPP p') : '';
                         const newStart = info.event.start ? format(info.event.start, 'PPP p') : '';
                         const newEnd = info.event.end ? format(info.event.end, 'PPP p') : '';
                         
                         const resourceId = info.event.getResources()[0]?.id;
                         const resourceName = getResourceName(resourceId);
                         
                         setConfirmDialogData({
                           type: 'resize',
                           id: info.event.extendedProps.id,
                           title: info.event.title,
                           oldStart,
                           oldEnd,
                           newStart,
                           newEnd,
                           oldResource: resourceName,
                           newResource: resourceName,
                           onConfirm: () => {
                             console.log('Event resized:', info);
                             toast.success('Event resized successfully');
                             setIsConfirmDialogOpen(false);
                           },
                           onCancel: () => {
                             info.revert();
                             setIsConfirmDialogOpen(false);
                           }
                         });
                         setIsConfirmDialogOpen(true);
                     }}
                />
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={18} minSize={18}>
          <div className="bg-background rounded-lg shadow-lg p-4 h-full border">
            <div className="space-y-4 h-full flex flex-col">
                <div className="flex items-center justify-between w-full">
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
                      >
                        <Filter className="h-3 w-3" />
                      </Button>
                    </PopoverTrigger>
                    {getActiveJobFiltersCount(jobsFilter) > 0 && (
                      <Badge 
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-4 w-4 text-[9px] flex items-center justify-center p-0"
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
                              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-foreground pointer-events-none" />
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
                                  className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground hover:text-foreground flex items-center justify-center"
                                >
                                  <X className="!h-3 !w-3" />
                                </button>
                              )}
                            </div>
                            <div className="relative">
                              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-foreground pointer-events-none" />
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
                                  className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground hover:text-foreground flex items-center justify-center"
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
              <ScrollArea className="flex-1 h-[calc(100%-4rem)]">
                <div id="external-jobs" className="grid auto-rows-max gap-0 justify-items-center"
                     style={{
                       gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                       width: '100%'
                     }}>
                  {filteredJobs.map((job) => (
                     <div
                       key={job.id}
                       id={job.id}
                       className="card-item w-full max-w-[170px] p-0.5"
                       data-title={job.title}
                       data-wo-id={job.id}
                       data-tooltip-id="job-tooltip"
                       data-tooltip-content={job.title}
                       draggable
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
                        // draggable={false}
                        onDragStart={() => handleJobDragStart(job)}
                        onDragEnd={handleJobDragEnd}
                        isDragging={draggedJob?.id === job.id}
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
      </ResizablePanelGroup>
      {/* AI Assistant Button */}
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
        prefilledResourceId={prefilledResourceId}
        prefilledStartDate={prefilledStartDate}
        prefilledEndDate={prefilledEndDate}
        prefilledStartTime={prefilledStartTime}
        prefilledEndTime={prefilledEndTime}
      />

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Confirm Update Event [ID {confirmDialogData?.id}]
            </DialogTitle>
          </DialogHeader>
           <div className="space-y-4">
             <div>
               <p className="font-medium">Title: {confirmDialogData?.title}</p>
             </div>
             <div className="space-y-2">
               <div>
                 <p className="text-sm font-medium">Original:</p>
                 <p className="text-sm text-muted-foreground">
                   {confirmDialogData?.oldStart} - {confirmDialogData?.oldEnd}
                 </p>
                 {confirmDialogData?.oldResource && (
                   <p className="text-sm text-muted-foreground">
                     Resource: {confirmDialogData.oldResource}
                   </p>
                 )}
               </div>
               <div>
                 <p className="text-sm font-medium">New:</p>
                 <p className="text-sm text-muted-foreground">
                   {confirmDialogData?.newStart} - {confirmDialogData?.newEnd}
                 </p>
                 {confirmDialogData?.newResource && (
                   <p className="text-sm text-muted-foreground">
                     Resource: {confirmDialogData.newResource}
                   </p>
                 )}
               </div>
             </div>
           </div>
          <DialogFooter>
            <Button variant="outline" onClick={confirmDialogData?.onCancel}>
              Cancel
            </Button>
            <Button onClick={confirmDialogData?.onConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Events Filter Popover */}
      <Popover open={isEventsFilterOpen} onOpenChange={setIsEventsFilterOpen}>
        <PopoverTrigger asChild>
          <div style={{ display: 'none' }} />
        </PopoverTrigger>
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
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-foreground pointer-events-none" />
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
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground hover:text-foreground flex items-center justify-center"
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
  );
};

export default Calendar;
