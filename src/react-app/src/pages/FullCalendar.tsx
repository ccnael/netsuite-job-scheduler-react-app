import { useState, useEffect, useCallback } from 'react';
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
/* import { fetchWOItems, type WOItem } from '@/api/woItem';
import { fetchWOContacts, type WOContact } from '@/api/woContact';
import { fetchWOAddresses, type WOAddress } from '@/api/woAddress'; */
import { toast } from "sonner";
import { Card } from '../components/Card';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Users, Stars, Filter } from "lucide-react";
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
} from "@/components/ui/dialog";

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

interface EventFormData {
  eventTitle: string;
  notes: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
  assetMaintenance: boolean;
  routingGroup: string;
  status: string;
  priority: string;
  selectedResources: any[];
  selectedVendors: any[];
  selectedAssets: any[];
  selectedWOItems: any[];
  selectedWOContacts: any[];
  selectedWOAddress: any;
}

const Calendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [draggedJob, setDraggedJob] = useState<Job | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [prefilledResourceId, setPrefilledResourceId] = useState<string | undefined>(undefined);
  const [prefilledStartDate, setPrefilledStartDate] = useState<string | undefined>(undefined);
  const [prefilledStartTime, setPrefilledStartTime] = useState<string | undefined>(undefined);
  const [prefilledEndTime, setPrefilledEndTime] = useState<string | undefined>(undefined);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmDialogData, setConfirmDialogData] = useState<{
    type: 'move' | 'resize';
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
          /* woItemData,
          woContactData,
          woAddressData */
        ] = await Promise.all([
          fetchEvents().catch(() => []),
          fetchEmployees().catch(() => []),
          fetchVendors().catch(() => []),
          fetchAssets().catch(() => []),
          fetchWOResources('', '').catch(() => []),
          fetchWOVendors('', '').catch(() => []),
          fetchWOAssets('', '').catch(() => []),
          fetchWorkOrders().catch(() => []),
          /* fetchWOItems('', '').catch(() => []),
          fetchWOContacts('', '').catch(() => []),
          fetchWOAddresses('', '').catch(() => []), */
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

        /* for (const item of woItemData) {
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
          const event = eventData.find(e => address.event.includes(e.id));
          if (event) {
            event.address = { ...address.address };
          }
        } */

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
    };

    loadAllData();
  }, []);

  const handleCreateNewEvent = () => {
    setIsCreateModalOpen(true);
    setSelectedJob(null);
    setPrefilledResourceId(undefined);
    setPrefilledStartDate(undefined);
    setPrefilledStartTime(undefined);
    setPrefilledEndTime(undefined);
  };

  const handleSubmit = useCallback((submittedFormData: EventFormData) => {
    if (!submittedFormData.eventTitle || !submittedFormData.startDate || !submittedFormData.endDate || (!submittedFormData.allDay && (!submittedFormData.startTime || !submittedFormData.endTime))) {
      console.log('Form Data', submittedFormData);
      toast.error("Please fill in all required fields", {
        position: "top-right",
      });
      return;
    }
    
    const newEvent: Event = {
      id: `event-${Date.now()}`,
      title: submittedFormData.eventTitle,
      note: submittedFormData.notes,
      date: {
        recurrence: submittedFormData.startDate,
        dates: [submittedFormData.startDate, submittedFormData.endDate],
        start: submittedFormData.startDate,
        end: submittedFormData.endDate
      },
      time: submittedFormData.allDay ? undefined : {
        start: submittedFormData.startTime,
        end: submittedFormData.endTime
      },
      status: {
        text: submittedFormData.status === 'TENTATIVE' ? 'Tentative' : submittedFormData.status === 'CONFIRMED' ? 'Confirmed' : 'Completed',
        value: submittedFormData.status,
        code: submittedFormData.status
      },
      priority: {
        text: submittedFormData.priority === '1' ? 'High' : submittedFormData.priority === '2' ? 'Mid' : 'Low',
        value: submittedFormData.priority,
        code: submittedFormData.priority
      },
      workorder: selectedJob ? {
        text: selectedJob.title,
        value: selectedJob.id
      } : { text: '', value: '' },
      resources: [],
      vendors: [],
      assets: []
    };
    
    setEvents([...events, newEvent]);
    console.log('NEW EVENT', { newEvent, events });
    setIsCreateModalOpen(false);

    if (selectedJob) {
      setSelectedJob(null);
    }
  }, [selectedJob, events]);

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

  const calendarEvents = [];

  events.forEach(event => {
     //  WO Resources
     event.resources.forEach(resource => {
       resource.resourceGroups.forEach(resourceGroup => {
           // Format tooltip content with event title, ID, resource info
           const formatDate = (dateStr: string) => {
             try {
               return dateStr ? format(new Date(dateStr), 'M/d/yyyy') : '';
             } catch {
               return dateStr || '';
             }
           };
           const formatTime = (timeStr: string) => {
             try {
               return timeStr ? format(parse(timeStr, 'HH:mm', new Date()), 'h:mm a') : '';
             } catch {
               return timeStr || '';
             }
           };
           
           const tooltipContent = [
             `<strong>${event.title || 'Untitled Event'}</strong>`,
             `ID ${event.id}`,
             '',
             `<strong>${resource.employee?.text || 'Unknown Resource'}</strong>`,
             resource.date ? `${formatDate(resource.date.start)} - ${formatDate(resource.date.end)}` : (event.date ? `${formatDate(event.date.start)} - ${formatDate(event.date.end)}` : ''),
             resource.time ? `${formatTime(resource.time.start)} - ${formatTime(resource.time.end)}` : (event.time ? `${formatTime(event.time.start)} - ${formatTime(event.time.end)}` : '')
           ].filter(Boolean).join('<br>');
         
         calendarEvents.push({
           id: event.id,
           title: event.title || 'Untitled Event',
           start: new Date(`${event.date.start}T${resource.time.start}:00`),
           end: new Date(`${event.date.end}T${resource.time.end}:00`),
           resourceId: `${resourceGroup.value}-${resource.employee.value}`,
           description: event.note || '',
           color: event.status.code,
           extendedProps: {
             resourceType: 'employee',
             woResourceId: resource.id,
             tooltipContent
           }
         });
       })
     });

     // WO Vendors
     event.vendors.forEach(vendor => {
         // Format tooltip content with event title, ID, vendor info (uses event date/time)
         const formatDate = (dateStr: string) => {
           try {
             return dateStr ? format(new Date(dateStr), 'M/d/yyyy') : '';
           } catch {
             return dateStr || '';
           }
         };
         const formatTime = (timeStr: string) => {
           try {
             return timeStr ? format(parse(timeStr, 'HH:mm', new Date()), 'h:mm a') : '';
           } catch {
             return timeStr || '';
           }
         };
         
         const tooltipContent = [
           `<strong>${event.title || 'Untitled Event'}</strong>`,
           `ID ${event.id}`,
           '',
           `<strong>${vendor.vendor?.text || 'Unknown Vendor'}</strong>`,
           event.date ? `${formatDate(event.date.start)} - ${formatDate(event.date.end)}` : '',
           event.time ? `${formatTime(event.time.start)} - ${formatTime(event.time.end)}` : ''
         ].filter(Boolean).join('<br>');
       
       calendarEvents.push({
         id: event.id,
         title: event.title || 'Untitled Event',
         start: new Date(`${event.date.start}T${event.time.start}:00`),
         end: new Date(`${event.date.end}T${event.time.end}:00`),
         resourceId: `vendor-${vendor.vendor.value}`,
         description: event.note || '',
         color: event.status.code,
         extendedProps: {
           resourceType: 'vendor',
           woVendorId: vendor.id,
           tooltipContent
         }
       });
     });

     // WO Assets
     event.assets.forEach(asset => {
         // Format tooltip content with event title, ID, asset info
         const formatDate = (dateStr: string) => {
           try {
             return dateStr ? format(new Date(dateStr), 'M/d/yyyy') : '';
           } catch {
             return dateStr || '';
           }
         };
         const formatTime = (timeStr: string) => {
           try {
             return timeStr ? format(parse(timeStr, 'HH:mm', new Date()), 'h:mm a') : '';
           } catch {
             return timeStr || '';
           }
         };
         
         const tooltipContent = [
           `<strong>${event.title || 'Untitled Event'}</strong>`,
           `ID ${event.id}`,
           '',
           `<strong>${asset.asset?.text || 'Unknown Asset'}</strong>`,
           asset.date ? `${formatDate(asset.date.start)} - ${formatDate(asset.date.end)}` : (event.date ? `${formatDate(event.date.start)} - ${formatDate(event.date.end)}` : ''),
           asset.time ? `${formatTime(asset.time.start)} - ${formatTime(asset.time.end)}` : (event.time ? `${formatTime(event.time.start)} - ${formatTime(event.time.end)}` : '')
         ].filter(Boolean).join('<br>');
       
       calendarEvents.push({
         id: event.id,
         title: event.title || 'Untitled Event',
         start: new Date(`${event.date.start}T${asset.time.start}:00`),
         end: new Date(`${event.date.end}T${asset.time.end}:00`),
         resourceId: `asset-${asset.asset.value}`,
         description: event.note || '',
         color: event.status.code,
         extendedProps: {
           resourceType: 'asset',
           woAssetId: asset.id,
           tooltipContent
         }
       });
     });

     if (!event.resources.length && !event.vendors.length && !event.assets.length) {
         // Format tooltip content for unassigned events
         const formatDate = (dateStr: string) => {
           try {
             return dateStr ? format(new Date(dateStr), 'M/d/yyyy') : '';
           } catch {
             return dateStr || '';
           }
         };
         const formatTime = (timeStr: string) => {
           try {
             return timeStr ? format(parse(timeStr, 'HH:mm', new Date()), 'h:mm a') : '';
           } catch {
             return timeStr || '';
           }
         };
         
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
            tooltipContent
          }
        });
     }
  });

  console.log('Processed Events', calendarEvents);

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
  const unassignedEvents = events.filter(event =>
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

  const calendarResources = combinedResourceGroups.map(resourceGroup => ({
    id: resourceGroup.value,
    title: resourceGroup.text,
    children: resourceGroup.resources
      .map(resource => ({
        id: `${resourceGroup.value}-${resource.id}`,
        customTitleHtml: `<span class="text-[11px] font-normal text-gray-700">${resource.name}</span>`,
        extendedProps: resource
      })),
    extendedProps: {
      ...resourceGroup,
      customTitleHtml: `
        <span class="text-[12px] font-semibold text-gray-700">${resourceGroup.text}</span>
        <span class="inline-flex items-center rounded-full border border-transparent bg-gray-200 px-1 py-0 text-[9px] font-semibold text-gray-800 h-3 min-w-[12px] justify-center ml-1">${resourceGroup.resources.length}</span>
      `
    }
  }));

  // Add single Unassigned resource
  if (unassignedEvents.length > 0) {
    calendarResources.push({
      id: 'z-unassigned',
      title: 'Unassigned',
      children: [],
      extendedProps: {
        customTitleHtml: `<span class="text-[12px] font-bold text-gray-700">Unassigned</span>`
      }
    });
  }

  // // Events with no resource gets assigned here
  // calendarResources.push({
  //   id: 'z-unassigned', // Auto sorts by id, needs to ba after vendor group
  //   title: 'Unassigned',
  //   children: events.filter(event =>
  //     !event.resources
  //     && !event.vendors
  //     && !event.assets
  //   ),
  //   extendedProps: {}
  // });

  console.log('Calendar Resources', calendarResources);

  const getResourceName = (resourceId: string) => {
    if (!resourceId) return 'Unassigned';
    
    if (resourceId === 'z-unassigned') return 'Unassigned';
    
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
     toast.info(`Event clicked: ${arg.event.title}`);
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

  const handleViewDidMount = () => {
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
      button.onclick = () => alert('IN PROGRESS');

      const flexWrapper = document.createElement('div');
      flexWrapper.className = 'flex items-center space-x-2';
      titleEl.replaceWith(flexWrapper);
      flexWrapper.appendChild(titleEl);
      flexWrapper.appendChild(button);
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
          <span class="w-3 h-3 bg-[#6c757d] inline-block rounded-sm"></span>
          <span>Tentative</span>
        </div>
        <div class="flex items-center space-x-1">
          <span class="w-3 h-3 bg-[#026adf] inline-block rounded-sm"></span>
          <span>Confirmed</span>
        </div>
        <div class="flex items-center space-x-1">
          <span class="w-3 h-3 bg-[#28a745] inline-block rounded-sm"></span>
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
      <div className="p-6 h-screen bg-gray-50">
        <div className="flex rounded-lg border relative overflow-hidden h-full">
          {/* Left side: 80% */}
          <div className="basis-[80%] bg-white p-4 h-full">
            <div className="space-y-4 h-full flex flex-col border-r relative">
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              </div>
            </div>
          </div>

          {/* Right side: 20% */}
          <div className="basis-[20%] bg-white p-4 h-full">
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
    <div className="p-4 h-[calc(100vh-2rem)] bg-gray-50">
      <ResizablePanelGroup direction="horizontal" className="gap-4">
        <ResizablePanel defaultSize={75} minSize={50}>
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <ScrollArea className="h-[calc(100%-1rem)]">
              <div className="h-[calc(100%-4rem)]">
                <FullCalendar
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
                  events={calendarEvents}
                  resources={calendarResources}
                  resourceOrder={'group'}
                   dateClick={handleDateClick}
                   eventClick={handleEventClick}
                   eventMouseEnter={handleEventMouseEnter}
                   eventMouseLeave={handleEventMouseLeave}
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
                          <Users className="h-4 w-4 text-gray-900 mt-[1px]" strokeWidth={2.5} />
                          <h2 className="text-sm font-medium text-gray-700">Resources</h2>
                          <Badge
                            variant="secondary"
                            className="bg-gray-200 text-[9px] px-1 py-0 h-3 min-w-[12px]"
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
                         
                         const oldResourceId = info.oldResource?.id;
                         const newResourceId = info.newResource?.id;
                         const oldResourceName = getResourceName(oldResourceId);
                         const newResourceName = getResourceName(newResourceId);
                         
                         setConfirmDialogData({
                           type: 'move',
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
          <div className="bg-white rounded-lg shadow-lg p-4 h-full">
            <div className="space-y-4 h-full flex flex-col">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4 text-gray-900" strokeWidth={2.5} />
                  <h2 className="text-lg font-medium text-gray-700">Available Jobs</h2>
                  <Badge variant="secondary" className="text-[9px] px-1 py-0 h-3 min-w-[12px]">
                    {jobs.length}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => alert('IN PROGRESS')}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <ScrollArea className="flex-1 h-[calc(100%-4rem)]">
                <div id="external-jobs" className="grid auto-rows-max gap-0 justify-items-center"
                     style={{
                       gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                       width: '100%'
                     }}>
                  {jobs.map((job) => (
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
        prefilledResourceId={prefilledResourceId}
        prefilledStartDate={prefilledStartDate}
        prefilledStartTime={prefilledStartTime}
        prefilledEndTime={prefilledEndTime}
      />

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Confirm Update Event
            </DialogTitle>
          </DialogHeader>
           <div className="space-y-4">
             <div>
               <p className="font-medium">{confirmDialogData?.title}</p>
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
            <Button variant="outline" onClick={confirmDialogData?.onCancel} className="text-[12px] h-8 px-3 tracking-tight">
              Cancel
            </Button>
            <Button onClick={confirmDialogData?.onConfirm} className="text-[12px] h-8 px-3 tracking-tight">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
