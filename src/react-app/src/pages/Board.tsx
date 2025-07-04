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
import { ChevronRight, Filter, Bot, ClipboardCheck, Calendar, Plus, Search, Users } from "lucide-react";
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
import { CreateEvent } from '../components/forms/CreateEvent';
import { UpdateEvent } from '../components/forms/UpdateEvent';
import { em } from 'node_modules/@fullcalendar/core/internal-common';

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
  selectedResources: any[];
  selectedVendors: any[];
  selectedAssets: any[];
  selectedWOItems: any[];
  selectedWOContacts: any[];
  selectedWOAddresses: any[];
}

interface SelectedJob {
  id: string;
  title: string;
  description: string;
  woUrl: string;
  project: string;
  projectUrl: string;
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
  // const [draggedJob, setDraggedJob] = useState<Job | null>(null);
  // const [jobs, setJobs] = useState<Job[]>([]);
  // const [events, setEvents] = useState<Event[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
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

        for (const wo of workOrderData) {
          const event = eventData.find(e => e.workorder.value === wo.id);
          if (event) {
            event.woRef = { ...wo };
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
        setEvents(events.filter(e => e.id !== cardId));
        toast.success(`${cardTitle} completed`, {
          position: "top-right",
          className: "!bg-green-100 !text-green-800 !border !border-green-300",
        });
        break;
      case 'remove':
        setEvents(events.filter(e => e.id !== cardId));
        toast.info(`${cardTitle} removed from events`);
        break;
    }
  };

  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
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
        setSelectedJob(card);
        setIsCreateModalOpen(true);
      }
    }
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

    if (selectedJob) {
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
          code: submittedFormData.status.toUpperCase()
        },
        priority: {
          text: submittedFormData.priority === '1' ? 'Low' : submittedFormData.priority === '2' ? 'Mid' : submittedFormData.priority === '3' ? 'High' : 'Urgent',
          value: submittedFormData.priority,
          code: submittedFormData.priority
        },
        workorder: {
          text: selectedJob.title,
          value: selectedJob.id
        }
      };
      
      setEvents([...events, newEvent]);
      console.log('NEW EVENT', { newEvent, events });
      setIsCreateModalOpen(false);
      setSelectedJob(null);
    }
  }, [selectedJob, events]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedEventForUpdate, setSelectedEventForUpdate] = useState<Event | null>(null);

  const handleUpdateEvent = () => {
    if (!selectedEventForUpdate) return;
    
    setEvents(events.map(event => 
      event.id === selectedEventForUpdate.id ? selectedEventForUpdate : event
    ));
    setIsUpdateModalOpen(false);
    setSelectedEventForUpdate(null);
    toast.success("Event updated successfully", {
      position: "top-right",
      className: "!bg-green-100 !text-green-800 !border !border-green-300",
    });
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

  const handleCreateNewEvent = () => {
    setIsCreateModalOpen(true);
    setSelectedJob(null); // Clear any selected card since this is a new event
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
              // className="h-full bg-white p-4"
              className={`h-full bg-white p-4 ${
                draggedCard ? 'border-[5px] border-dashed' : ''
              }`}
              style={draggedCard ? { borderColor: '#26CC4E' } : undefined}
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
          onClick={() => toast.info("AI Assistant coming soon!", { 
            duration: 500,
            className: "!bg-blue-100 !text-blue-800 !border !border-blue-300"
          })}
        >
          <Stars className="h-8 w-8" />
        </Button>
      </div>

      {/* Create Event Form */}
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

      {/* Update Event Form */}
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

export default Board;