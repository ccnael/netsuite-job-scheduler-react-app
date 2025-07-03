import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Draggable } from '@fullcalendar/interaction';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { fetchEvents, type Event } from '@/api/event';
import { fetchEmployees, type Employee } from '@/api/employee';
import { fetchVendors, type Vendor } from '@/api/vendor';
import { fetchAssets, type Asset } from '@/api/asset';
import { fetchWOResources, type WOResource } from '@/api/woResource';
import { fetchWOVendors, type WOVendor } from '@/api/woVendor';
import { fetchWOAssets, type WOAsset } from '@/api/woAsset';
import { fetchWorkOrders, type WorkOrder } from '@/api/workOrder';
import { toast } from "sonner";
import { Card } from '../components/Card';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Users, Stars, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

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

const FullCalendarPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [draggedJob, setDraggedJob] = useState<Job | null>(null);

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
          workOrderData
        ] = await Promise.all([
          fetchEvents().catch(() => []),
          fetchEmployees().catch(() => []),
          fetchVendors().catch(() => []),
          fetchAssets().catch(() => []),
          fetchWOResources('', '').catch(() => []),
          fetchWOVendors('', '').catch(() => []),
          fetchWOAssets('', '').catch(() => []),
          fetchWorkOrders().catch(() => [])
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

    // Create a new event from the dropped job
    const newEvent: Event = {
      id: `event-${Date.now()}`,
      title: draggedJob.title,
      note: draggedJob.description,
      date: {
        recurrence: info.dateStr,
        dates: [info.dateStr],
        start: info.dateStr,
        end: info.dateStr
      },
      time: info.allDay ? undefined : {
        start: new Date(info.date).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        end: new Date(new Date(info.date).getTime() + 2 * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
      },
      status: {
        text: 'Tentative',
        value: 'TENTATIVE',
        code: 'TENTATIVE'
      },
      priority: {
        text: 'Mid',
        value: '2',
        code: '2'
      },
      workorder: {
        text: draggedJob.title,
        value: draggedJob.id
      },
      resources: [],
      vendors: [],
      assets: []
    };

    setEvents([...events, newEvent]);
    setDraggedJob(null);

    toast.success(`Created event for ${draggedJob.title}`, {
      className: "!bg-green-100 !text-green-800 !border !border-green-300",
    });
  };

  const calendarEvents = [];

  events.forEach(event => {
    //  WO Resources
    event.resources.forEach(resource => {
      resource.resourceGroups.forEach(resourceGroup => {
        calendarEvents.push({
          id: event.id,
          title: event.title || 'Untitled Event',
          start: new Date(`${event.date.start}T${resource.time.start}:00`),
          end: new Date(`${event.date.end}T${resource.time.end}:00`),
          resourceId: `${resourceGroup.value}-${resource.employee.value}`,
          description: event.note || '',
          color: event.color,
          extendedProps: {
            resourceType: 'employee',
            woResourceId: resource.id
          }
        });
      })
    });

    // WO Vendors
    event.vendors.forEach(vendor => {
      calendarEvents.push({
        id: event.id,
        title: event.title || 'Untitled Event',
        start: new Date(`${event.date.start}T${event.time.start}:00`),
        end: new Date(`${event.date.end}T${event.time.end}:00`),
        resourceId: `vendor-${vendor.vendor.value}`,
        description: event.note || '',
        color: event.color,
        extendedProps: {
          resourceType: 'vendor',
          woVendorId: vendor.id
        }
      });
    });

    // WO Assets
    event.assets.forEach(asset => {
      calendarEvents.push({
        id: event.id,
        title: event.title || 'Untitled Event',
        start: new Date(`${event.date.start}T${asset.time.start}:00`),
        end: new Date(`${event.date.end}T${asset.time.end}:00`),
        resourceId: `asset-${asset.asset.value}`,
        description: event.note || '',
        color: event.color,
        extendedProps: {
          resourceType: 'asset',
          woAssetId: asset.id
        }
      });
    });

    if (!event.resources.length && !event.vendors.length && !event.assets.length) {
      calendarEvents.push({
        id: event.id,
        title: event.title || 'Untitled Event',
        start: new Date(`${event.date.start}T${event.time.start}:00`),
        end: new Date(`${event.date.end}T${event.time.end}:00`),
        resourceId: ['z-unassigned'],
        color: event.color,
        extendedProps: { ...event }
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

  const combinedResourceGroups = [
    ...resourceGroups,
    {
      text: 'Vendor Subcons',
      value: 'vendor',
      resources: vendors,
      resourceCount: vendors.length,
    },
    {
      text: 'Assets',
      value: 'asset',
      resources: assets,
      resourceCount: assets.length,
    },
    // Events with no resource gets assigned here
    {
      text: 'Unassigned',
      value: 'z-unassugned', // Auto sorts by id, needs to ba after asset group
      resources: []/* events.filter(event =>
        !event.resources.length
        && !event.vendors.length
        && !event.assets.length
      ) */,
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

  const handleDateClick = (arg: any) => {
    toast.info(`Date clicked: ${arg.dateStr}`);
  };

  const handleEventClick = (arg: any) => {
    toast.info(`Event clicked: ${arg.event.title}`);
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
      button.onclick = () => alert('TBD');

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
          <span class="w-3 h-3 bg-green-500 inline-block rounded-sm"></span>
          <span>Confirmed</span>
        </div>
        <div class="flex items-center space-x-1">
          <span class="w-3 h-3 bg-yellow-500 inline-block rounded-sm"></span>
          <span>Tentative</span>
        </div>
        <div class="flex items-center space-x-1">
          <span class="w-3 h-3 bg-gray-500 inline-block rounded-sm"></span>
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
                        <div className="flex items-center gap-2">
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
                      click: () => {
                        toast.info('New Event clicked!');
                        // Replace with actual dialog/modal trigger later
                      }
                    }
                  }}
                  viewDidMount={handleViewDidMount}
                  slotLaneClassNames={() => ['fc-slot-hoverable']}
                  eventReceive={(info) => {
                      console.log('eventReceive:', info);
                      alert('TBD');
                      // Open create event modal
                      info.revert();
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
                  onClick={() => alert('TBD')}
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
    </div>
  );
};

export default FullCalendarPage;
