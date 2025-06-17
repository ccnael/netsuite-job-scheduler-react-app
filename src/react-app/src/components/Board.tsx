import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { Resources } from './Resources';
import { toast } from "sonner";
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
import { MultiSelect } from './MultiSelect';
import { ChevronRight, Filter, Bot, ClipboardCheck, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { DataTable } from './DataTable';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { fetchEmployees, type Employee } from '@/api/employee';
import { fetchWorkOrders, type WorkOrder } from '@/api/workOrder';
import { fetchEvents, type Event } from '@/api/event';
import { Skeleton } from "@/components/ui/skeleton";
import { Stars } from "lucide-react";

interface FilterState {
  titles: string[];
  descriptions: string[];
  statuses: string[];
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
  receiptStatus: ReceiptStatus;
}

interface EventFormData {
  text: string;
  memo: string;
  dateFrom: string;
  dateTo: string;
  status: string;
  priority: string;
}

export const Board = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isEmployeesLoading, setIsEmployeesLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isJobsLoading, setIsJobsLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [isEventsLoading, setIsEventsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        setIsEmployeesLoading(true);
        const employeeData = await fetchEmployees();
        setEmployees(employeeData);
        console.log('Board: Loaded employees:', employeeData);
      } catch (error) {
        console.error('Board: Failed to load employees:', error);
        toast.error('Failed to load employee data');
      } finally {
        setIsEmployeesLoading(false);
      }
    };

    loadEmployees();
  }, []);

  useEffect(() => {
    const loadWorkOrders = async () => {
      try {
        setIsJobsLoading(true);
        setLoadingError(null);
        
        const workOrders = await fetchWorkOrders();
        
        if (!workOrders || workOrders.length === 0) {
          console.warn('Board: No work orders returned');
          setJobs([]);
          return;
        }
        
        const jobsData = workOrders.map((wo: WorkOrder): Job => ({
          id: wo.id,
          title: wo.title || wo.name || 'Untitled Work Order',
          description: wo.memo || 'No description',
          status: {
            text: wo.status?.text ?? '',
            value: wo.status?.value ?? '',
            code: wo.status?.code ?? wo.status?.value ?? '',
          },
          type: wo.type?.text || 'Standard',
          date: wo.date || new Date().toLocaleDateString(),
          customer: wo.customer?.text || 'Unknown Customer',
          project: wo.project?.text || 'No Project',
          salesOrder: wo.salesorder?.text || 'No Sales Order',
          estHours: wo.esthours || 0,
          woUrl: wo.woUrl,
          soUrl: wo.soUrl,
          projectUrl: wo.projectUrl,
          receiptStatus: wo.receiptStatus
        }));
        
        setJobs(jobsData);
        console.log('Board: Loaded work orders as jobs:', jobsData);
      } catch (error) {
        console.error('Board: Failed to load work orders:', error);
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
        console.log('Board: Loaded events:', eventData);
      } catch (error) {
        console.error('Board: Failed to load events:', error);
        toast.error('Failed to load event data');
        setEvents([]);
      } finally {
        setIsEventsLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleCardAction = (cardId: string, action: string, isEvent: boolean = false) => {
    const cardList = isEvent ? events : jobs;
    const card = isEvent ? events.find(e => e.id === cardId) : jobs.find(j => j.id === cardId);
    
    if (!card) return;

    const cardTitle = isEvent ? (card as Event).title || 'Event' : (card as Job).title;

    switch (action) {
      case 'print':
        toast.success(`Printing ${cardTitle}`);
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
        toast.success(`${cardTitle} closed`);
        break;
      case 'update':
        if (isEvent) {
          setSelectedEventForUpdate(card as Event);
          setIsUpdateModalOpen(true);
        }
        break;
      case 'complete':
        setEvents(events.filter(e => e.id !== cardId));
        toast.success(`${cardTitle} completed`);
        break;
      case 'remove':
        setEvents(events.filter(e => e.id !== cardId));
        toast.info(`${cardTitle} removed from events`);
        break;
    }
  };

  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Job | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const [resourcesFilter, setResourcesFilter] = useState<FilterState>({
    titles: [],
    descriptions: [],
    statuses: [],
  });
  const [availableJobsFilter, setAvailableJobsFilter] = useState<FilterState>({
    titles: [],
    descriptions: [],
    statuses: [],
  });

  const uniqueTitles = Array.from(new Set(jobs?.map(job => job.title) ?? []));
  const uniqueDescriptions = Array.from(new Set(jobs?.map(job => job.description) ?? []));
  const uniqueStatuses = Array.from(new Set(jobs?.map(job => job.status.text) ?? []));

  const handleDragStart = (cardId: string) => {
    setDraggedCard(cardId);
  };

  const handleDragEnd = () => {
    setDraggedCard(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedCard) {
      const card = jobs.find(c => c.id === draggedCard);
      if (card) {
        setSelectedCard(card);
        setIsModalOpen(true);
      }
    }
  };

  const [formData, setFormData] = useState<EventFormData>({
    text: '',
    memo: '',
    dateFrom: '',
    dateTo: '',
    status: 'pending',
    priority: 'medium'
  });

  const handleSubmit = () => {
    if (!formData.text || !formData.dateFrom || !formData.dateTo) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (selectedCard) {
      const newEvent: Event = {
        id: String(Date.now()),
        title: formData.text,
        note: formData.memo,
        date: {
          recurrence: formData.dateFrom,
          dates: [formData.dateFrom],
          start: formData.dateFrom,
          end: formData.dateTo
        },
        status: {
          text: formData.status,
          value: formData.status.toUpperCase(),
          code: formData.status.toUpperCase()
        },
        priority: {
          text: formData.priority,
          value: formData.priority,
          code: formData.priority.toUpperCase()
        }
      };
      
      setEvents([...events, newEvent]);
      setIsModalOpen(false);
      setSelectedCard(null);
      setFormData({
        text: '',
        memo: '',
        dateFrom: '',
        dateTo: '',
        status: 'pending',
        priority: 'medium'
      });
    }
  };

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedEventForUpdate, setSelectedEventForUpdate] = useState<Event | null>(null);

  const handleUpdateEvent = () => {
    if (!selectedEventForUpdate) return;
    
    setEvents(events.map(event => 
      event.id === selectedEventForUpdate.id ? selectedEventForUpdate : event
    ));
    setIsUpdateModalOpen(false);
    setSelectedEventForUpdate(null);
    toast.success("Event updated successfully");
  };

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<'jobs' | 'events'>('jobs');

  const handleOpenFilter = (type: 'jobs' | 'events') => {
    setFilterType(type);
    setIsFilterModalOpen(true);
  };

  const getActiveFiltersCount = (filter: FilterState) => {
    return filter.titles.length + filter.descriptions.length + filter.statuses.length;
  };

  const filteredJobs = jobs.filter(job => 
    (availableJobsFilter.titles.length === 0 || availableJobsFilter.titles.includes(job.title)) &&
    (availableJobsFilter.descriptions.length === 0 || availableJobsFilter.descriptions.includes(job.description)) &&
    (availableJobsFilter.statuses.length === 0 || availableJobsFilter.statuses.includes(job.status.text))
  );

  // Helper function to get receipt status from work orders
  const getReceiptStatusForEvent = (event: Event) => {
    // If workorder.text is not empty, get receiptStatus from jobs
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

  // Helper function to get work order URL for event
  const getWorkOrderUrl = (event: Event) => {
    if (event.workorder?.value && jobs.length > 0) {
      const matchingJob = jobs.find(job => job.id === event.workorder?.value);
      return matchingJob?.woUrl;
    }
    return undefined;
  };

  if (isJobsLoading || isEventsLoading) {
    return (
      <div className="p-6 h-screen bg-gray-50">
        <div className="flex rounded-lg border relative overflow-hidden h-full">
          <div className="w-[250px] min-w-[250px] h-full bg-white p-4 border-r">
            <div className="space-y-2 h-full flex flex-col">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-1 flex-1">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
              {/* <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div> */}
              {/* <div className="absolute inset-0 flex justify-center items-center bg-opacity-60 z-50">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              </div> */}
            </div>
          </div>
          <div className="flex-1 bg-white p-4 h-full">
            <div className="space-y-4 h-full flex flex-col border-r">
              {/* <Skeleton className="h-6 w-32" />
              <div className="grid auto-rows-max gap-0 flex-1" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div> */}
              <div className="absolute flex inset-0 justify-center items-center" style={{ marginRight: 200 }}>
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-white p-4 h-full">
            <div className="space-y-4 h-full flex flex-col">
              <Skeleton className="h-6 w-32" />
              <div className="grid auto-rows-max gap-0 flex-1" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
              {/* <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div> */}
              {/* <div className="absolute inset-0 flex justify-center items-center bg-opacity-60 z-50">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                <Resources filterText={resourcesFilter.titles.join(' ')} />
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
                      <div key={job.id} className="w-full max-w-[170px] p-0.5">
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
              className="h-full bg-white p-4"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="space-y-4 h-full flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-900" strokeWidth={2.5} />
                    <h2 className="text-lg font-medium text-gray-700">Events</h2>
                    <Badge variant="secondary" className="text-[9px] px-1 py-0 h-3 min-w-[12px]">
                      {events.length}
                    </Badge>
                  </div>
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
                <ScrollArea className="flex-1 h-full">
                  <div className="grid auto-rows-max gap-0 justify-items-center h-full"
                       style={{
                         gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                         width: '100%'
                       }}>
                    {events.map((event) => (
                      <div key={event.id} className="w-full max-w-[170px] p-0.5">
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
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

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

      {/* Event Form Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[1024px]">
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <Accordion type="multiple" defaultValue={["item-1", "item-2"]} className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Primary Information</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={formData.priority}
                          onValueChange={(value) => setFormData({ ...formData, priority: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value) => setFormData({ ...formData, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="text">Text *</Label>
                      <Input
                        id="text"
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        placeholder="Enter text"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="memo">Memo</Label>
                      <Textarea
                        id="memo"
                        value={formData.memo}
                        onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                        placeholder="Enter memo"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dateFrom">Date From *</Label>
                        <Input
                          id="dateFrom"
                          type="date"
                          value={formData.dateFrom}
                          onChange={(e) => setFormData({ ...formData, dateFrom: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateTo">Date To *</Label>
                        <Input
                          id="dateTo"
                          type="date"
                          value={formData.dateTo}
                          onChange={(e) => setFormData({ ...formData, dateTo: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Card Details</AccordionTrigger>
                <AccordionContent>
                  <DataTable data={selectedCard ? [{ id: parseInt(selectedCard.id), title: selectedCard.title, description: selectedCard.description }] : []} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Update Event Modal */}
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Event</DialogTitle>
            <DialogDescription>
              Make changes to the event details below.
            </DialogDescription>
          </DialogHeader>
          
          {selectedEventForUpdate && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="update-title">Title</Label>
                <Input
                  id="update-title"
                  value={selectedEventForUpdate.title || ''}
                  onChange={(e) => setSelectedEventForUpdate({
                    ...selectedEventForUpdate,
                    title: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="update-description">Description</Label>
                <Textarea
                  id="update-description"
                  value={selectedEventForUpdate.note || ''}
                  onChange={(e) => setSelectedEventForUpdate({
                    ...selectedEventForUpdate,
                    note: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="update-status">Status</Label>
                <Select
                  value={selectedEventForUpdate.status?.text || 'Pending'}
                  onValueChange={(value) => setSelectedEventForUpdate({
                    ...selectedEventForUpdate,
                    status: {
                      text: value,
                      value: value.toUpperCase(),
                      code: value.toUpperCase()
                    }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateEvent}>Update Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter Modal */}
      <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter {filterType === 'jobs' ? 'Available Jobs' : 'Events'}</DialogTitle>
            <DialogDescription>
              Select your filter criteria below
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <MultiSelect
                options={uniqueTitles}
                selected={filterType === 'jobs' ? availableJobsFilter.titles : []}
                onChange={(value) => filterType === 'jobs' && setAvailableJobsFilter(prev => ({ ...prev, titles: value }))}
                placeholder="Filter by title"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <MultiSelect
                options={uniqueDescriptions}
                selected={filterType === 'jobs' ? availableJobsFilter.descriptions : []}
                onChange={(value) => filterType === 'jobs' && setAvailableJobsFilter(prev => ({ ...prev, descriptions: value }))}
                placeholder="Filter by description"
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <MultiSelect
                options={uniqueStatuses}
                selected={filterType === 'jobs' ? availableJobsFilter.statuses : []}
                onChange={(value) => filterType === 'jobs' && setAvailableJobsFilter(prev => ({ ...prev, statuses: value }))}
                placeholder="Filter by status"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFilterModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsFilterModalOpen(false)}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
