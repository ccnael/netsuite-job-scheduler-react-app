import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmployeeTable } from './tables/EmployeeTable';
import { VendorTable } from './tables/VendorTable';
import { AssetTable } from './tables/AssetTable';
import { WOItemTable } from './tables/WOItemTable';
import { WOContactTable } from './tables/WOContactTable';
import { WOAddressTable } from './tables/WOAddressTable';
import { CreateRoutingGroupModal } from './CreateRoutingGroupModal';
import { Clock } from 'lucide-react';
import { type Employee } from "@/api/employee";
import { type Vendor } from "@/api/vendor";
import { type Asset } from "@/api/asset";
import * as helper from "@/lib/helpers";
import { fetchRoutingGroups, RoutingGroup } from "@/api/routingGroup";
import DropdownFilter from './DropdownFilter';
import DateRangeFilter from './DateRangeFilter';
import TimeRangeFilter from './TimeRangeFilter';
import { DropdownOption } from './types';

interface SelectedResource {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
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

interface SelectedJob {
  id: string;
  title: string;
  description: string;
  woUrl: string;
  project: string;
  projectUrl: string;
}

interface CreateEventProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJob?: SelectedJob;
  onSubmit: (formData: EventFormData) => void;
  employees?: Employee[];
  vendors?: Vendor[];
  assets?: Asset[];
}

export const CreateEvent: React.FC<CreateEventProps> = ({ 
  isOpen, 
  onClose, 
  selectedJob, 
  onSubmit,
  employees = [],
  vendors = [],
  assets = []
}) => {
  const defaultFormData: EventFormData = {
    eventTitle: '', 
    notes: '', 
    startDate: '', 
    endDate: '', 
    startTime: '08:00', 
    endTime: '18:00', 
    status: 'TENTATIVE', 
    priority: '1', 
    allDay: false, 
    routingGroup: '',
    selectedResources: [],
    selectedVendors: [],
    selectedAssets: [],
    selectedWOItems: [],
    selectedWOContacts: [],
    selectedWOAddress: null
  };
  
  const [formData, setFormData] = useState<EventFormData>(defaultFormData);
  const [bubbleEffect, setBubbleEffect] = useState(false);
  const previousIsOpenRef = useRef(false);

  const [routingGroups, setRoutingGroups] = useState<RoutingGroup[]>([]);
  const [hasFetchedRoutingGroups, setHasFetchedRoutingGroups] = useState(false);
  const [loadingRoutingGroups, setLoadingRoutingGroups] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Options for dropdown filters
  const priorityOptions: DropdownOption[] = [
    { value: '1', text: 'Low' },
    { value: '2', text: 'Mid' },
    { value: '3', text: 'High' },
    { value: '4', text: 'Urgent' }
  ];

  const statusOptions: DropdownOption[] = [
    { value: 'TENTATIVE', text: 'Tentative' },
    { value: 'CONFIRMED', text: 'Confirmed' },
    { value: 'COMPLETED', text: 'Completed' }
  ];

  const fetchRoutingGroupOptions = async (): Promise<DropdownOption[]> => {
    try {
      const groups = await fetchRoutingGroups();
      setRoutingGroups(groups);
      setHasFetchedRoutingGroups(true);
      return groups.map(group => ({ value: group.id, text: group.name }));
    } catch (err) {
      console.error('Failed to fetch routing groups:', err);
      return [];
    }
  };

  const handleFetchRoutingGroups = async () => {
    if (hasFetchedRoutingGroups) return;

    setLoadingRoutingGroups(true);
    try {
      const groups = await fetchRoutingGroups();
      setRoutingGroups(groups);
      setHasFetchedRoutingGroups(true);
    } catch (err) {
      console.error('Failed to fetch routing groups:', err);
    } finally {
      setLoadingRoutingGroups(false);
    }
  };

  const handleRoutingGroupCreated = (updatedGroups: RoutingGroup[], newGroupId: string) => {
    setRoutingGroups(updatedGroups);
    setHasFetchedRoutingGroups(true);
    // Auto-select the newly created routing group
    setFormData(prev => ({ ...prev, routingGroup: newGroupId }));
  };

  const handleRoutingGroupChange = (value: string) => {
    if (value === 'CREATE_NEW') {
      setShowCreateModal(true);
    } else {
      setFormData(prev => ({ ...prev, routingGroup: value }));
    }
  };

  // Only reset form data when dialog opens (transition from closed to open)
  useEffect(() => {
    if (isOpen && !previousIsOpenRef.current) {
      console.log('Dialog opened, resetting form data');
      setFormData(defaultFormData);
    }
    previousIsOpenRef.current = isOpen;
  }, [isOpen]);

  const handleOutsideClick = () => { setBubbleEffect(true); setTimeout(() => setBubbleEffect(false), 300); };
  
  const handleSubmit = () => { 
    console.log('Form data on submit:', formData);
    onSubmit(formData); 
  };

  // Memoized handler functions for table selections to prevent infinite loops
  const handleResourceSelection = useCallback((selectedResources: SelectedResource[]) => {
    setFormData(prev => ({ ...prev, selectedResources }));
  }, []);

  const handleVendorSelection = useCallback((selectedVendors: SelectedVendor[]) => {
    setFormData(prev => ({ ...prev, selectedVendors }));
  }, []);

  const handleAssetSelection = useCallback((selectedAssets: SelectedAsset[]) => {
    setFormData(prev => ({ ...prev, selectedAssets }));
  }, []);

  const handleWOItemSelection = useCallback((selectedWOItems: SelectedWOItem[]) => {
    setFormData(prev => ({ ...prev, selectedWOItems }));
  }, []);

  const handleWOContactSelection = useCallback((selectedWOContacts: SelectedWOContact[]) => {
    setFormData(prev => ({ ...prev, selectedWOContacts }));
  }, []);

  const handleWOAddressSelection = useCallback((selectedWOAddresses: SelectedWOAddress[]) => {
    const selectedAddress = selectedWOAddresses.length > 0 ? selectedWOAddresses[0] : null;
    setFormData(prev => ({ ...prev, selectedWOAddress: selectedAddress }));
  }, []);
  
  const handleStartDateSelect = (date: Date | undefined) => { 
    console.log('Start Date selected:', date); 
    if (date) {
      const isoString = date.toISOString();
      console.log('Setting start date to:', isoString);
      setFormData(prev => ({ ...prev, startDate: isoString })); 
    } else {
      setFormData(prev => ({ ...prev, startDate: '' })); 
    }
  };
  
  const handleEndDateSelect = (date: Date | undefined) => { 
    console.log('End Date selected:', date); 
    if (date) {
      const isoString = date.toISOString();
      console.log('Setting end date to:', isoString);
      setFormData(prev => ({ ...prev, endDate: isoString })); 
    } else {
      setFormData(prev => ({ ...prev, endDate: '' })); 
    }
  };
  
  const handleStartTimeSelect = (time: string) => { setFormData(prev => ({ ...prev, startTime: time })); };
  const handleEndTimeSelect = (time: string) => { setFormData(prev => ({ ...prev, endTime: time })); };
  
  // Memoize the date parsing to prevent unnecessary re-computations
  const parsedStartDate = useMemo(() => {
    if (!formData.startDate) return undefined;
    return new Date(formData.startDate);
  }, [formData.startDate]);

  const parsedEndDate = useMemo(() => {
    if (!formData.endDate) return undefined;
    return new Date(formData.endDate);
  }, [formData.endDate]);
  
  const handleAllDayToggle = (checked: boolean) => { setFormData(prev => ({ ...prev, allDay: checked, ...(checked ? { startTime: '08:00', endTime: '18:00' } : {}) })); };

  const timeOptions = helper.generateTimeOptions();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }} modal>
        <DialogContent className={`max-w-screen-xl text-[12px] font-sans tracking-tight transition-all duration-300 max-h-[90vh] flex flex-col ${bubbleEffect ? 'scale-95' : ''}`} onPointerDownOutside={(e) => { e.preventDefault(); handleOutsideClick(); }} style={{ padding: 16 }}>
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-[15px] tracking-tight font-semibold">Create Event {selectedJob && `[WO ID ${selectedJob.id}]`}</DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full border rounded-lg" defaultValue="primary-info">
                <AccordionItem value="primary-info">
                  <AccordionTrigger className="bg-[#dfe4eb] px-2 py-1 rounded-t-lg">
                    <span className="text-[#234678] font-semibold text-[14px] tracking-tight">Primary Information</span>
                  </AccordionTrigger>
                  <AccordionContent className="p-2 space-y-3">
                    <div className="grid grid-cols-4 gap-2">
                      <div className="col-span-1 space-y-1">
                        <Label className="text-[12px] tracking-tight">Event Title <span className="text-red-500">*</span></Label>
                        <Input
                          id="eventTitle"
                          value={formData.eventTitle}
                          onChange={(e) => setFormData(prev => ({ ...prev, eventTitle: e.target.value }))}
                          placeholder="Enter title"
                          className="h-7 px-2 placeholder:text-[12px]"
                        />
                      </div>

                      <div className="col-span-1 space-y-1">
                        <Label className="text-[12px] tracking-tight">Work Order</Label>
                        <div className="h-7 px-2 rounded flex items-center text-gray-600 truncate text-[12px]">
                          {selectedJob ? (
                            <a href={selectedJob.woUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">{selectedJob.title}</a>
                          ) : 'No work order selected'}
                        </div>
                      </div>

                      <div className="col-span-1 space-y-1">
                        <Label className="text-[12px] tracking-tight">Project</Label>
                        <div className="h-7 px-2 rounded flex items-center text-gray-600 truncate text-[12px]">
                          {selectedJob ? (
                            <a href={selectedJob.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">{selectedJob.project}</a>
                          ) : 'No project'}
                        </div>
                      </div>

                      <div className="col-span-1"></div>

                      <div className="space-y-1">
                        <DateRangeFilter
                          id="startDate"
                          label="Start Date"
                          value={parsedStartDate}
                          onChange={handleStartDateSelect}
                          isRequired={true}
                        />
                      </div>

                      <div className="space-y-1">
                        <DateRangeFilter
                          id="endDate"
                          label="End Date"
                          value={parsedEndDate}
                          onChange={handleEndDateSelect}
                          isRequired={true}
                        />
                      </div>

                      <div className="space-y-1">
                        <TimeRangeFilter
                          id="startTime"
                          label="Start Time"
                          value={formData.startTime}
                          onChange={handleStartTimeSelect}
                          disabled={formData.allDay}
                          isRequired={true}
                        />
                      </div>

                      <div className="space-y-1">
                        <TimeRangeFilter
                          id="endTime"
                          label="End Time"
                          value={formData.endTime}
                          onChange={handleEndTimeSelect}
                          disabled={formData.allDay}
                          isRequired={true}
                        />
                      </div>

                      <div className="col-span-1">
                        <DropdownFilter
                          id="priority"
                          label="Priority"
                          options={priorityOptions}
                          value={formData.priority}
                          onChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                          placeholder="Select priority"
                        />
                      </div>

                      <div className="col-span-1">
                        <DropdownFilter
                          id="status"
                          label="Status"
                          options={statusOptions}
                          value={formData.status}
                          onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                          placeholder="Select status"
                        />
                      </div>

                      <div className="col-span-2 space-y-1 row-span-2">
                        <Label className="text-[12px] tracking-tight">Notes</Label>
                        <Textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Enter notes"
                          className="h-[90px] text-[12px] resize-none px-2"
                        />
                      </div>

                      <div className="col-span-1 flex flex-col justify-center">
                        <DropdownFilter
                          id="routingGroup"
                          label="Routing Group"
                          options={routingGroups.map(group => ({ value: group.id, text: group.name }))}
                          value={formData.routingGroup}
                          onChange={handleRoutingGroupChange}
                          placeholder="Select routing group"
                          fetchOptionsOnOpen={fetchRoutingGroupOptions}
                        />
                      </div>

                      <div className="col-span-1 flex items-center justify-start space-x-2" style={{ marginTop: '16px' }}>
                        <Switch
                          checked={formData.allDay}
                          onCheckedChange={handleAllDayToggle}
                          className="h-5 w-10 data-[state=checked]:bg-blue-600 [&>span]:h-4 [&>span]:w-4"
                        />
                        <Label className="text-[11px] tracking-tight">All Day</Label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="w-full border rounded-lg" defaultValue='resources'>
                <AccordionItem value="resources">
                  <AccordionTrigger className="bg-[#dfe4eb] px-2 py-1 rounded-t-lg">
                    <span className="text-[#234678] font-semibold text-[14px] tracking-tight">Resources</span>
                  </AccordionTrigger>
                  <AccordionContent className="p-2">
                    <div className="max-h-[400px] overflow-y-auto">
                      <EmployeeTable 
                        data={employees.filter(x => !!x.active)} 
                        woId={selectedJob?.id}
                        onSelectionChange={handleResourceSelection}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="w-full border rounded-lg" defaultValue='vendors'>
                <AccordionItem value="vendors">
                  <AccordionTrigger className="bg-[#dfe4eb] px-2 py-1 rounded-t-lg">
                    <span className="text-[#234678] font-semibold text-[14px] tracking-tight">Vendors</span>
                  </AccordionTrigger>
                  <AccordionContent className="p-2">
                    <div className="max-h-[400px] overflow-y-auto">
                      <VendorTable 
                        data={vendors.filter(x => !!x.active)}
                        onSelectionChange={handleVendorSelection}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="single" collapsible className="w-full border rounded-lg" defaultValue='assets'>
                <AccordionItem value="assets">
                  <AccordionTrigger className="bg-[#dfe4eb] px-2 py-1 rounded-t-lg">
                    <span className="text-[#234678] font-semibold text-[14px] tracking-tight">Assets</span>
                  </AccordionTrigger>
                  <AccordionContent className="p-2">
                    <div className="max-h-[400px] overflow-y-auto">
                      <AssetTable 
                        data={assets.filter(x => !!x.active)}
                        onSelectionChange={handleAssetSelection}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {
                (selectedJob?.id) && 
                <>
                  <Accordion type="single" collapsible className="w-full border rounded-lg" defaultValue='woitems'>
                    <AccordionItem value="woitems">
                      <AccordionTrigger className="bg-[#dfe4eb] px-2 py-1 rounded-t-lg">
                        <span className="text-[#234678] font-semibold text-[14px] tracking-tight">Work Order Items</span>
                      </AccordionTrigger>
                      <AccordionContent className="p-2">
                        <div className="max-h-[400px] overflow-y-auto">
                          <WOItemTable 
                            woId={selectedJob?.id}
                            onSelectionChange={handleWOItemSelection}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible className="w-full border rounded-lg" defaultValue='wocontacts'>
                    <AccordionItem value="wocontacts">
                      <AccordionTrigger className="bg-[#dfe4eb] px-2 py-1 rounded-t-lg">
                        <span className="text-[#234678] font-semibold text-[14px] tracking-tight">Work Order Contacts</span>
                      </AccordionTrigger>
                      <AccordionContent className="p-2">
                        <div className="max-h-[400px] overflow-y-auto">
                          <WOContactTable 
                            woId={selectedJob?.id}
                            onSelectionChange={handleWOContactSelection}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible className="w-full border rounded-lg" defaultValue='woaddresses'>
                    <AccordionItem value="woaddresses">
                      <AccordionTrigger className="bg-[#dfe4eb] px-2 py-1 rounded-t-lg">
                        <span className="text-[#234678] font-semibold text-[14px] tracking-tight">Work Order Addresses</span>
                      </AccordionTrigger>
                      <AccordionContent className="p-2">
                        <div className="max-h-[400px] overflow-y-auto">
                          <WOAddressTable 
                            woId={selectedJob?.id}
                            onSelectionChange={handleWOAddressSelection}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </>
              }
            </div>
          </ScrollArea>

          <DialogFooter className="mt-2 flex-shrink-0">
            <Button variant="outline" onClick={onClose} className="text-[12px] h-7 px-3 tracking-tight">Cancel</Button>
            <Button onClick={handleSubmit} className="text-[12px] h-7 px-3 tracking-tight">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Routing Group Modal */}
      <CreateRoutingGroupModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onRoutingGroupCreated={handleRoutingGroupCreated}
      />
    </>
  );
};
