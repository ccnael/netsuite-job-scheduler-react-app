import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { fetchEmployees, type Employee } from '@/api/employee';
import { fetchVendors, type Vendor } from '@/api/vendor';
import { fetchAssets, type Asset } from '@/api/asset';
import { fetchWorkOrders, type WorkOrder } from '@/api/workOrder';
import { fetchEvents, type Event } from '@/api/event';
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/Card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Stars, Users, ClipboardCheck } from "lucide-react";
import { format } from "date-fns";
import CustomCalendar from '@/components/CustomCalendar';

interface Job {
  id: string;
  title: string;
  description: string;
  status: string;
  type: string;
  date: string;
  customer: string;
  project: string;
  salesorder?: string;
  esthours?: number;
  woUrl?: string;
  soUrl?: string;
  projectUrl?: string;
  statusCode?: string;
}

const Calendar = () => {
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isEventsLoading, setIsEventsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [eventId, setEventId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isJobsLoading, setIsJobsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    const loadResources = async () => {
      try {
        setIsLoading(true);
        const [employeeData, vendorData, assetData] = await Promise.all([
          fetchEmployees(),
          fetchVendors(),
          fetchAssets()
        ]);
        setEmployees(employeeData);
        setVendors(vendorData);
        setAssets(assetData);
        console.log('Calendar: Loaded employees:', employeeData);
        console.log('Calendar: Loaded vendors:', vendorData);
        console.log('Calendar: Loaded assets:', assetData);
      } catch (error) {
        console.error('Calendar: Failed to load resources:', error);
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

  useEffect(() => {
    const loadWorkOrders = async () => {
      try {
        setIsJobsLoading(true);
        setLoadingError(null);
        
        const workOrders = await fetchWorkOrders();
        
        if (!workOrders || workOrders.length === 0) {
          console.warn('Calendar: No work orders returned');
          setJobs([]);
          return;
        }
        
        const jobsData = workOrders.map((wo: WorkOrder): Job => ({
          id: wo.id,
          title: wo.title || wo.name || 'Untitled Work Order',
          description: wo.memo || 'No description',
          status: wo.status?.text || 'Unknown',
          type: wo.type?.text || 'Standard',
          date: wo.date || new Date().toLocaleDateString(),
          customer: wo.customer?.text || 'Unknown Customer',
          project: wo.project?.text || 'No Project',
          salesorder: wo.salesorder?.text || '',
          esthours: wo.esthours || 0,
          woUrl: wo.woUrl,
          soUrl: wo.soUrl,
          projectUrl: wo.projectUrl,
          statusCode: wo.status?.code || '#808080'
        }));
        
        setJobs(jobsData);
        console.log('Calendar: Loaded work orders as jobs:', jobsData);
      } catch (error) {
        console.error('Calendar: Failed to load work orders:', error);
        setLoadingError('Failed to load work orders. Using default data.');
        toast.error('Failed to load work orders');
        setJobs([]);
      } finally {
        setIsJobsLoading(false);
      }
    };

    loadWorkOrders();
  }, []);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsEventsLoading(true);
        const eventData = await fetchEvents();
        setEvents(eventData);
        
        // Convert events to FullCalendar format with proper date/time handling
        const formattedEvents = eventData.map(event => {
          let startDateTime, endDateTime;
          
          // Handle date and time formatting
          if (event.date?.start && event.time?.start) {
            startDateTime = `${event.date.start}T${event.time.start}:00`;
          } else if (event.date?.start) {
            startDateTime = `${event.date.start}T09:00:00`;
          }
          
          if (event.date?.end && event.time?.end) {
            endDateTime = `${event.date.end}T${event.time.end}:00`;
          } else if (event.date?.end) {
            endDateTime = `${event.date.end}T17:00:00`;
          } else if (startDateTime) {
            // If no end date, make it 1 hour duration
            const startDate = new Date(startDateTime);
            startDate.setHours(startDate.getHours() + 1);
            endDateTime = startDate.toISOString().slice(0, 19);
          }
          
          // Only include events with valid start times
          if (!startDateTime) {
            console.warn('Event skipped due to missing start date/time:', event);
            return null;
          }
          
          return {
            id: event.id,
            title: event.title || 'Untitled Event',
            start: startDateTime,
            end: endDateTime || startDateTime,
            resourceId: event.organizer?.value || 'person1',
            description: event.note || '',
            backgroundColor: event.color || '#1a6756',
            borderColor: event.color || '#1a6756',
            textColor: '#ffffff',
            extendedProps: {
              description: event.note || '',
              workorder: event.workorder?.text || '',
              location: event.location || '',
              status: event.status?.text || '',
              priority: event.priority?.text || ''
            }
          };
        }).filter(event => event !== null); // Remove null events
        
        setCalendarEvents(formattedEvents);
        console.log('Calendar: Loaded and formatted events:', formattedEvents);
      } catch (error) {
        console.error('Calendar: Failed to load events:', error);
        toast.error('Failed to load event data');
        setEvents([]);
        setCalendarEvents([]);
      } finally {
        setIsEventsLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleEventClick = (event: any) => {
    setOpen(true);
    setIsEditMode(true);
    setEventId(event.id);
    setTitle(event.title);
    setDescription(event.extendedProps?.description || '');
    setStart(event.start);
    setEnd(event.end);
    setResourceId(event.resourceId);
  };

  const handleDateSelect = (selectInfo: any) => {
    setOpen(true);
    setIsEditMode(false);
    setStart(selectInfo.startStr);
    setEnd(selectInfo.endStr);
    setResourceId(selectInfo.resource.id);
  };

  const handleEventResize = (info: any) => {
    const updatedEvents = calendarEvents.map(event => {
      if (event.id === info.event.id) {
        return {
          ...event,
          start: info.event.start,
          end: info.event.end,
        };
      }
      return event;
    });
    setCalendarEvents(updatedEvents);
    toast.success("Event resized successfully!");
  };

  const handleSubmit = () => {
    if (isEditMode) {
      const updatedEvents = calendarEvents.map(event => {
        if (event.id === eventId) {
          return {
            ...event,
            title: title,
            description: description,
            start: start,
            end: end,
            resourceId: resourceId
          };
        }
        return event;
      });
      setCalendarEvents(updatedEvents);
      toast.success("Event updated successfully!");
    } else {
      const newEvent = {
        id: String(Date.now()),
        title: title,
        description: description,
        start: start,
        end: end,
        resourceId: resourceId
      };
      setCalendarEvents([...calendarEvents, newEvent]);
      toast.success("Event created successfully!");
    }
    setOpen(false);
    clearForm();
  };

  const handleDelete = () => {
    const updatedEvents = calendarEvents.filter(event => event.id !== eventId);
    setCalendarEvents(updatedEvents);
    setOpen(false);
    clearForm();
    toast.success("Event deleted successfully!");
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setStart('');
    setEnd('');
    setResourceId('');
    setEventId('');
  };

  const handleCardAction = (cardId: string, action: string) => {
    const card = jobs.find(c => c.id === cardId);
    
    if (!card) return;

    switch (action) {
      case 'print':
        toast.success(`Printing ${card.title}`);
        break;
      case 'hold':
        toast.info(`${card.title} put on hold`);
        break;
      case 'close':
        toast.success(`${card.title} closed`);
        break;
    }
  };

  // Convert employees, vendors, and assets to resources format
  const resources = employees.length > 0 || vendors.length > 0 || assets.length > 0
    ? [
        ...employees.map(employee => ({
          id: employee.employee.value,
          title: employee.employee.text,
          group: `1_${employee.resourceGroups.length > 0 ? employee.resourceGroups[0].text : 'Default'}`
        })),
        ...vendors.map(vendor => ({
          id: vendor.vendor.value,
          title: vendor.vendor.text,
          group: '2_Vendors'
        })),
        ...assets.map(asset => ({
          id: asset.asset.value,
          title: asset.asset.text,
          group: '3_Assets'
        }))
      ]
    : [
        { id: 'person1', title: 'John Doe', group: '1_Development' },
        { id: 'person2', title: 'Jane Smith', group: '1_Design' },
        { id: 'person3', title: 'Mike Johnson', group: '1_Development' },
        { id: 'person4', title: 'Sarah Wilson', group: '1_Marketing' },
        { id: 'room1', title: 'Conference Room A', group: '2_Rooms' },
        { id: 'room2', title: 'Conference Room B', group: '2_Rooms' },
      ];

  const handleNewEvent = () => {
    setOpen(true);
    setIsEditMode(false);
    clearForm();
    // Set default start time to current time
    const now = new Date();
    const startStr = `${format(now, 'yyyy-MM-dd')}T${format(now, 'HH:mm')}:00`;
    const endDate = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour later
    const endStr = `${format(endDate, 'yyyy-MM-dd')}T${format(endDate, 'HH:mm')}:00`;
    setStart(startStr);
    setEnd(endStr);
  };

  if (isLoading || isJobsLoading || isEventsLoading) {
    return (
      <div className="p-4 h-screen bg-gray-50">
        <div className="flex min-h-[600px] rounded-lg border bg-white h-full">
          <ResizablePanelGroup direction="horizontal" className="flex-1 h-full">
            <ResizablePanel defaultSize={85}>
              {/* <div className="h-full p-2">
                <Skeleton className="h-full w-full" />
              </div> */}
              <div className="absolute flex inset-0 justify-center items-center" style={{ marginRight: 200 }}>
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              </div>
              {/* <div className="absolute inset-0 flex justify-center items-center bg-opacity-60 z-50">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              </div> */}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={15}>
              <div className="h-full bg-white p-2 border-l">
                <div className="space-y-2 h-full flex flex-col">
                  <Skeleton className="h-4 w-24" />
                  <div className="space-y-2 flex-1">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-20 w-full" />
                    ))}
                  </div>
                </div>
                {/* <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div> */}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-screen bg-gray-50">
      <div className="flex min-h-[600px] rounded-lg border bg-white overflow-hidden h-full">
        <ResizablePanelGroup direction="horizontal" className="flex-1 h-full">
          <ResizablePanel defaultSize={85}>
            <div className="h-full p-1">
              {loadingError && (
                <div className="bg-yellow-50 p-2 mb-2 border border-yellow-200 rounded text-yellow-800 text-sm">
                  {loadingError}
                </div>
              )}
              <div className="h-full">
                <CustomCalendar
                  resources={resources}
                  events={calendarEvents}
                  onEventClick={handleEventClick}
                  onDateSelect={handleDateSelect}
                  onEventResize={handleEventResize}
                  onNewEvent={handleNewEvent}
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={15}>
            <div className="h-full bg-white p-2 border-l">
              <div className="space-y-2 h-full flex flex-col">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4 text-gray-900" strokeWidth={2.5} />
                  <h2 className="text-sm font-medium text-gray-700">Available Jobs</h2>
                  <Badge variant="secondary" className="text-[9px] px-1 py-0 h-3 min-w-[12px]">
                    {jobs.length}
                  </Badge>
                </div>
                <ScrollArea className="flex-1 h-full">
                  <div className="grid auto-rows-max gap-1 justify-items-center"
                       style={{
                         gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                         width: '100%'
                       }}>
                    {jobs.map((job) => (
                      <Card
                        key={job.id}
                        id={parseInt(job.id)}
                        title={job.title}
                        description={job.description}
                        customer={job.customer}
                        date={job.date}
                        salesOrder={job.salesorder}
                        project={job.project}
                        estHours={job.esthours}
                        woUrl={job.woUrl}
                        soUrl={job.soUrl}
                        projectUrl={job.projectUrl}
                        status={{
                          text: job.status,
                          value: job.id,
                          code: job.statusCode || '#808080'
                        }}
                        draggable
                        compact={true}
                        hideCalendarFields={true}
                        onAction={(action) => handleCardAction(job.id, action)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Dialog component for creating/editing events */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[225px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Event" : "Create Event"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resource" className="text-right">
                Resource
              </Label>
              <Select onValueChange={setResourceId} defaultValue={resourceId}>
                <SelectTrigger className="col-span-3">  
                  <SelectValue placeholder="Select a resource" />
                </SelectTrigger>
                <SelectContent>
                  {resources.map(resource => (
                    <SelectItem key={resource.id} value={resource.id}>{resource.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start" className="text-right">
                Start
              </Label>
              <Input type="datetime-local" id="start" value={start} onChange={(e) => setStart(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end" className="text-right">
                End
              </Label>
              <Input type="datetime-local" id="end" value={end} onChange={(e) => setEnd(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            {isEditMode && (
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Button type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              {isEditMode ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Assistant Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          size="icon"
          className="h-9 w-9 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          onClick={() => toast.info("AI Assistant coming soon!", { duration: 500 })}
        >
          <Stars className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
};

export default Calendar;
