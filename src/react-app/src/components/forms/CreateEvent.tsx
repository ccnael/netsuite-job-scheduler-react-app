
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmployeeTable } from './tables/EmployeeTable';
import { VendorTable } from './tables/VendorTable';
import { AssetTable } from './tables/AssetTable';
import { WOItemTable } from './tables/WOItemTable';
import { WOContactTable } from './tables/WOContactTable';
import { WOAddressTable } from './tables/WOAddressTable';
import { CreateRoutingGroupModal } from './CreateRoutingGroupModal';
import { type Employee } from "@/api/employee";
import { type Vendor } from "@/api/vendor";
import { type Asset } from "@/api/asset";
import { type WOResource } from "@/api/woResource";
import { type WOVendor } from "@/api/woVendor";
import { type WOAsset } from "@/api/woAsset";
import { type WOItem } from "@/api/woItem";
import { type WOContact } from "@/api/woContact";
import { type WOAddress } from "@/api/woAddress";
import { fetchRoutingGroups, RoutingGroup } from "@/api/routingGroup";
import { createEvent, type Event } from "@/api/event";
import DropdownFilter from './DropdownFilter';
import DateRangeFilter from './DateRangeFilter';
import TimeRangeFilter from './TimeRangeFilter';
import { DropdownOption } from './types';
import { priorityOptions, statusOptions } from "@/lib/constants";
import { toast } from "sonner";
import { CheckCircle, X } from 'lucide-react';
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogCancel, 
  AlertDialogAction 
} from "@/components/ui/alert-dialog";
import { Loader } from "lucide-react";

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
  woAssetId?: string;
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
  assetMaintenance: boolean;
  routingGroupText: string;
  routingGroup: string;
  woRef: object;
  selectedResources: SelectedResource[];
  selectedVendors: SelectedVendor[];
  selectedAssets: SelectedAsset[];
  selectedItems: SelectedItem[];
  selectedContacts: SelectedContact[];
  selectedAddress: SelectedAddress | null;
}

interface SelectedJob {
  id: string;
  title: string;
  description: string;
  woUrl: string;
  project: string;
  projectUrl: string;
  projectInsight?: {
    text: string;
    value: string;
  }
}

interface CreateEventProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJob?: SelectedJob;
  onEventCreated?: () => void;
  employees?: Employee[];
  vendors?: Vendor[];
  assets?: Asset[];
  woResources?: WOResource[];
  woVendors?: WOVendor[];
  woAssets?: WOAsset[];
  woItems?: WOItem[];
  woContacts?: WOContact[];
  woAddresses?: WOAddress[];
  events?: Event[]; // Add events prop for conflict detection
  prefilledResourceId?: string;
  prefilledStartDate?: string;
  prefilledEndDate?: string;
  prefilledStartTime?: string;
  prefilledEndTime?: string;
}

export const CreateEvent: React.FC<CreateEventProps> = ({ 
  isOpen, 
  onClose, 
  selectedJob, 
  onEventCreated,
  employees = [],
  vendors = [],
  assets = [],
  woResources = [],
  woVendors = [],
  woAssets = [],
  woItems = [],
  woContacts = [],
  woAddresses = [],
  events = [],
  prefilledResourceId,
  prefilledStartDate,
  prefilledEndDate,
  prefilledStartTime,
  prefilledEndTime
}) => {
  const defaultFormData: EventFormData = {
    eventTitle: '', 
    notes: '', 
    startDate: prefilledStartDate || '', 
    endDate: prefilledEndDate || '', 
    startTime: prefilledStartTime || '08:00', 
    endTime: prefilledEndTime || '18:00', 
    status: 'TENTATIVE', 
    priority: '1', 
    allDay: false, 
    assetMaintenance: false,
    routingGroupText: '',
    routingGroup: '',
    woRef: selectedJob,
    selectedResources: [],
    selectedVendors: [],
    selectedAssets: [],
    selectedItems: [],
    selectedContacts: [],
    selectedAddress: null
  };
  
  const [formData, setFormData] = useState<EventFormData>(defaultFormData);
  const [bubbleEffect, setBubbleEffect] = useState(false);
  const previousIsOpenRef = useRef(false);
  const [accordionValues, setAccordionValues] = useState<string[]>(['primary-info', 'resources', 'vendors', 'assets']);
  const [routingGroups, setRoutingGroups] = useState<RoutingGroup[]>([]);
  const [hasFetchedRoutingGroups, setHasFetchedRoutingGroups] = useState(false);
  const [loadingRoutingGroups, setLoadingRoutingGroups] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreatingRoutingGroup, setIsCreatingRoutingGroup] = useState(false);
  const [dropdownKey, setDropdownKey] = useState(0); // Force re-render of dropdown
  const [isCreating, setIsCreating] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [timeChangeKey, setTimeChangeKey] = useState(0);

  // Get conflict detection functions with event tracking
  const getResourceConflicts = useCallback(() => {
    console.log('[CreateEvent] Checking employee conflicts with formData:', {
      startDate: formData.startDate,
      endDate: formData.endDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      allDay: formData.allDay
    });

    if (!formData.startDate && !formData.endDate) {
      console.log('[CreateEvent] No dates provided, returning empty employee conflicts');
      return { conflicts: new Set<string>(), conflictEvents: new Map<string, any[]>() };
    }

    const conflicts = new Set<string>();
    const conflictEvents = new Map<string, any[]>();
    
    events.forEach(event => {
      if (!event.resources || !event.date?.start || !event.date?.end) return;
      
      const eventStartDate = new Date(event.date.start);
      const eventEndDate = new Date(event.date.end);
      
      let newStartDate: Date | null = null;
      let newEndDate: Date | null = null;
      
      if (formData.startDate && formData.endDate) {
        newStartDate = new Date(formData.startDate);
        newEndDate = new Date(formData.endDate);
      } else if (formData.startDate && !formData.endDate) {
        newStartDate = new Date(formData.startDate);
        newEndDate = new Date('2099-12-31');
      } else if (!formData.startDate && formData.endDate) {
        newStartDate = new Date('1900-01-01');
        newEndDate = new Date(formData.endDate);
      }
      
      if (!newStartDate || !newEndDate) return;
      
      const dateOverlap = newStartDate <= eventEndDate && newEndDate >= eventStartDate;
      
      if (dateOverlap) {
        let timeOverlap = true;
        
        if (!formData.allDay && formData.startTime && formData.endTime && event.time?.start && event.time?.end) {
          const [newStartHour, newStartMin] = formData.startTime.split(':').map(Number);
          const [newEndHour, newEndMin] = formData.endTime.split(':').map(Number);
          const [eventStartHour, eventStartMin] = event.time.start.split(':').map(Number);
          const [eventEndHour, eventEndMin] = event.time.end.split(':').map(Number);
          
          const newStartMinutes = newStartHour * 60 + newStartMin;
          const newEndMinutes = newEndHour * 60 + newEndMin;
          const eventStartMinutes = eventStartHour * 60 + eventStartMin;
          const eventEndMinutes = eventEndHour * 60 + eventEndMin;
          
          let timeRangeStart = newStartMinutes;
          let timeRangeEnd = newEndMinutes;
          
          if (formData.startTime && !formData.endTime) {
            timeRangeEnd = 24 * 60;
          } else if (!formData.startTime && formData.endTime) {
            timeRangeStart = 0;
          }
          
          timeOverlap = timeRangeStart < eventEndMinutes && timeRangeEnd > eventStartMinutes;
        }
        
        if (timeOverlap) {
          event.resources.forEach((resource: any) => {
            if (resource.employee?.value) {
              // Check if resource has specific start/end times
              let resourceTimeOverlap: boolean = timeOverlap;
              
              if (!formData.allDay && resource.time?.start && resource.time?.end && formData.startTime && formData.endTime) {
                const [resourceStartHour, resourceStartMin] = resource.time.start.split(':').map(Number);
                const [resourceEndHour, resourceEndMin] = resource.time.end.split(':').map(Number);
                const [newStartHour, newStartMin] = formData.startTime.split(':').map(Number);
                const [newEndHour, newEndMin] = formData.endTime.split(':').map(Number);
                
                const resourceStartMinutes = resourceStartHour * 60 + resourceStartMin;
                const resourceEndMinutes = resourceEndHour * 60 + resourceEndMin;
                const newStartMinutes = newStartHour * 60 + newStartMin;
                const newEndMinutes = newEndHour * 60 + newEndMin;
                
                resourceTimeOverlap = newStartMinutes < resourceEndMinutes && newEndMinutes > resourceStartMinutes;
              }
              
              if (resourceTimeOverlap) {
                conflicts.add(resource.employee.value);
                
                if (!conflictEvents.has(resource.employee.value)) {
                  conflictEvents.set(resource.employee.value, []);
                }
                const resourceEvent = {...event};
                resourceEvent.time = resource.time;
                conflictEvents.get(resource.employee.value)!.push(resourceEvent);
              }
            }
          });
        }
      }
    });

    return { conflicts, conflictEvents };
  }, [formData.startDate, formData.endDate, formData.startTime, formData.endTime, formData.allDay, events]);

  const getAssetConflicts = useCallback(() => {
    console.log('[CreateEvent] Checking asset conflicts with formData:', {
      startDate: formData.startDate,
      endDate: formData.endDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      allDay: formData.allDay
    });

    if (!formData.startDate && !formData.endDate) {
      console.log('[CreateEvent] No dates provided, returning empty asset conflicts');
      return { conflicts: new Set<string>(), conflictEvents: new Map<string, any[]>() };
    }

    const conflicts = new Set<string>();
    const conflictEvents = new Map<string, any[]>();
    
    events.forEach(event => {
      if (!event.assets || !event.date?.start || !event.date?.end) return;
      
      const eventStartDate = new Date(event.date.start);
      const eventEndDate = new Date(event.date.end);
      
      let newStartDate: Date | null = null;
      let newEndDate: Date | null = null;
      
      if (formData.startDate && formData.endDate) {
        newStartDate = new Date(formData.startDate);
        newEndDate = new Date(formData.endDate);
      } else if (formData.startDate && !formData.endDate) {
        newStartDate = new Date(formData.startDate);
        newEndDate = new Date('2099-12-31');
      } else if (!formData.startDate && formData.endDate) {
        newStartDate = new Date('1900-01-01');
        newEndDate = new Date(formData.endDate);
      }
      
      if (!newStartDate || !newEndDate) return;
      
      const dateOverlap = newStartDate <= eventEndDate && newEndDate >= eventStartDate;
      
      if (dateOverlap) {
        let timeOverlap = true;
        
        if (!formData.allDay && formData.startTime && formData.endTime && event.time?.start && event.time?.end) {
          const [newStartHour, newStartMin] = formData.startTime.split(':').map(Number);
          const [newEndHour, newEndMin] = formData.endTime.split(':').map(Number);
          const [eventStartHour, eventStartMin] = event.time.start.split(':').map(Number);
          const [eventEndHour, eventEndMin] = event.time.end.split(':').map(Number);
          
          const newStartMinutes = newStartHour * 60 + newStartMin;
          const newEndMinutes = newEndHour * 60 + newEndMin;
          const eventStartMinutes = eventStartHour * 60 + eventStartMin;
          const eventEndMinutes = eventEndHour * 60 + eventEndMin;
          
          let timeRangeStart = newStartMinutes;
          let timeRangeEnd = newEndMinutes;
          
          if (formData.startTime && !formData.endTime) {
            timeRangeEnd = 24 * 60;
          } else if (!formData.startTime && formData.endTime) {
            timeRangeStart = 0;
          }
          
          timeOverlap = timeRangeStart < eventEndMinutes && timeRangeEnd > eventStartMinutes;
        }
        
        if (timeOverlap) {
          event.assets.forEach((asset: any) => {
            if (asset.asset?.value) {
              // Check if asset has specific start/end times
              let assetTimeOverlap: boolean = timeOverlap;
              
              if (!formData.allDay && asset.time?.start && asset.time?.end && formData.startTime && formData.endTime) {
                const [assetStartHour, assetStartMin] = asset.time.start.split(':').map(Number);
                const [assetEndHour, assetEndMin] = asset.time.end.split(':').map(Number);
                const [newStartHour, newStartMin] = formData.startTime.split(':').map(Number);
                const [newEndHour, newEndMin] = formData.endTime.split(':').map(Number);
                
                const assetStartMinutes = assetStartHour * 60 + assetStartMin;
                const assetEndMinutes = assetEndHour * 60 + assetEndMin;
                const newStartMinutes = newStartHour * 60 + newStartMin;
                const newEndMinutes = newEndHour * 60 + newEndMin;
                
                assetTimeOverlap = newStartMinutes < assetEndMinutes && newEndMinutes > assetStartMinutes;
              }
              
              if (assetTimeOverlap) {
                conflicts.add(asset.asset.value);
                
                if (!conflictEvents.has(asset.asset.value)) {
                  conflictEvents.set(asset.asset.value, []);
                }
                const assetEvent = {...event};
                assetEvent.time = asset.time;
                conflictEvents.get(asset.asset.value)!.push(assetEvent);
              }
            }
          });
        }
      }
    });

    return { conflicts, conflictEvents };
  }, [formData.startDate, formData.endDate, formData.startTime, formData.endTime, formData.allDay, events]);

  // Get conflict information with useMemo to ensure consistency
  const resourceConflictInfo = useMemo(() => getResourceConflicts(), [
    formData.startDate, 
    formData.endDate, 
    formData.startTime, 
    formData.endTime, 
    formData.allDay, 
    events
  ]);
  
  const assetConflictInfo = useMemo(() => getAssetConflicts(), [
    formData.startDate, 
    formData.endDate, 
    formData.startTime, 
    formData.endTime, 
    formData.allDay, 
    events
  ]);
  
  // Debug logging for conflicts
  // console.log('[CreateEvent] Resource conflicts:', resourceConflictInfo);
  // console.log('[CreateEvent] Asset conflicts:', assetConflictInfo);
  // console.log('[CreateEvent] Form data for conflict detection:', {
  //   startDate: formData.startDate,
  //   endDate: formData.endDate,
  //   startTime: formData.startTime,
  //   endTime: formData.endTime,
  //   allDay: formData.allDay
  // });
  // console.log('[CreateEvent] Available events for conflict check:', events?.length || 0);
  // console.log('[CreateEvent] Events data:', events);

  // console.log('CreateEvent props', {
  //   employees,
  //   vendors,
  //   assets,
  //   woId: selectedJob?.id,
  //   woResources
  // });

  const fetchRoutingGroupOptions = async (): Promise<DropdownOption[]> => {
    try {
      const groups = await fetchRoutingGroups();
      setRoutingGroups(groups);
      setHasFetchedRoutingGroups(true);
      const groupOptions = groups.map(group => ({ value: group.id, text: group.name }));
      return [
        { value: 'CREATE_NEW', text: '+ Create New' },
        ...groupOptions
      ];
    } catch (err) {
      console.error('Failed to fetch routing groups:', err);
      return [{ value: 'CREATE_NEW', text: '+ Create New' }];
    }
  };

  const handleRoutingGroupCreated = async (updatedGroups: RoutingGroup[], newGroupName: string, newGroupId: string) => {
    console.log('Routing group created, updating list and selecting new group:', newGroupId);
    
    // Update the routing groups list
    setRoutingGroups(updatedGroups);
    setHasFetchedRoutingGroups(true);
    
    // Set the new routing group in form data - this actually selects it
    setFormData(prev => ({ 
      ...prev, 
      routingGroupText: newGroupName,
      routingGroup: newGroupId 
    }));
    
    // Force dropdown to re-render with new options and the selected value
    setDropdownKey(prev => prev + 1);
    
    console.log('Updated routing groups:', updatedGroups);
    console.log('Form data updated with routing group:', newGroupId);
  };

  const handleRoutingGroupLoadingChange = (loading: boolean) => {
    setIsCreatingRoutingGroup(loading);
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
      console.log('prefilledResourceId:', prefilledResourceId);
      console.log('preselectedResourceIds:', getPreselectedResourceIds());
      setFormData(defaultFormData);
    }
    previousIsOpenRef.current = isOpen;
  }, [isOpen]);

  // Get preselected resource IDs based on prefilledResourceId
  const getPreselectedResourceIds = () => {
    if (!prefilledResourceId) return [];
    
    // Parse the resourceId to get the type and id
    const resourceParts = prefilledResourceId.split('-');
    if (resourceParts.length >= 2) {
      const resourceType = resourceParts[0];
      const resourceId = resourceParts.slice(1).join('-');
      
      // Only return the resource ID if it's an employee resource
      if (resourceType !== 'vendor' && resourceType !== 'asset') {
        return [resourceId];
      }
    }
    return [];
  };

  const getPreselectedVendorIds = () => {
    if (!prefilledResourceId) return [];
    
    // Parse the resourceId to get the type and id
    const resourceParts = prefilledResourceId.split('-');
    if (resourceParts.length >= 2) {
      const resourceType = resourceParts[0];
      const resourceId = resourceParts.slice(1).join('-');
      
      if (resourceType === 'vendor') {
        return [resourceId];
      }
    }
    return [];
  };

  const getPreselectedAssetIds = () => {
    if (!prefilledResourceId) return [];
    
    // Parse the resourceId to get the type and id
    const resourceParts = prefilledResourceId.split('-');
    if (resourceParts.length >= 2) {
      const resourceType = resourceParts[0];
      const resourceId = resourceParts.slice(1).join('-');
      
      if (resourceType === 'asset') {
        return [resourceId];
      }
    }
    return [];
  };

  const handleOutsideClick = () => { setBubbleEffect(true); setTimeout(() => setBubbleEffect(false), 300); };
  
  const handleSubmit = async () => { 
    console.log('Form data on submit:', formData);
    
    // Validate mandatory fields
    if (!formData.eventTitle || !formData.startDate || !formData.endDate || (!formData.allDay && (!formData.startTime || !formData.endTime))) {
      toast.error("Please fill in all required fields", {
        position: "top-right",
        className: "!bg-red-100 !text-red-800 !border !border-red-300",
        // duration: 2000
      });
      return;
    }
    
    // Show confirmation dialog
    setShowConfirmDialog(true);
  };

  const handleConfirmCreate = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default AlertDialogAction behavior
    
    try {
      setIsCreating(true);
      await createEvent(formData);
      
      // Success toast
      /* toast.success(`Event "${formData.eventTitle}" created successfully!`, {
        position: "top-right",
        className: "!bg-green-100 !text-green-800 !border !border-green-300",
        closeButton: true,
        duration: Infinity
      }); */
      toast.custom((id) => (
        <div
          data-sonner-rounded-toast
          className="flex items-start gap-3 w-full max-w-xl bg-green-100 text-green-800 border border-green-300 px-4 py-3 rounded-md"
        >
          <CheckCircle className="h-5 w-5 mt-0.5 text-green-700 shrink-0" />
          <div className="flex-1 text-sm font-medium">
            Event "{formData.eventTitle}" created successfully!
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
      
      // Close dialogs and refresh events
      setShowConfirmDialog(false);
      onClose();
      onEventCreated?.();
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error("Failed to create event. Please try again.", {
        position: "top-right",
        className: "!bg-red-100 !text-red-800 !border !border-red-300",
      });
    } finally {
      setIsCreating(false);
    }
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

  const handleWOItemSelection = useCallback((selectedItems: SelectedItem[]) => {
    setFormData(prev => ({ ...prev, selectedItems }));
  }, []);

  const handleWOContactSelection = useCallback((selectedContacts: SelectedContact[]) => {
    setFormData(prev => ({ ...prev, selectedContacts }));
  }, []);

  /* const handleWOAddressSelection = useCallback((selectedAddresses: SelectedAddress[]) => {
    const selectedAddress = selectedAddresses.length > 0 ? selectedAddresses[0] : null;
    setFormData(prev => ({ ...prev, selectedAddress: selectedAddress }));
  }, []); */

  const handleWOAddressSelection = useCallback((selectedAddress: SelectedAddress) => {
    setFormData(prev => ({ ...prev, selectedAddress }));
  }, []);
  
  const handleStartDateSelect = (date: Date | undefined) => { 
    console.log('Start Date selected:', date); 
    if (date) {
      const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12).toISOString();
      setFormData(prev => {
        const newData = { ...prev, startDate: normalized };
        
        // Validate date range if both dates are set
        if (newData.endDate && new Date(normalized) > new Date(newData.endDate)) {
          toast.error("Start date must be earlier than or equal to end date", {
            position: "top-right",
            className: "!bg-red-100 !text-red-800 !border !border-red-300",
          });
          return prev; // Don't update if invalid
        }
        
        return newData;
      }); 
    } else {
      setFormData(prev => ({ ...prev, startDate: '' })); 
    }
  };
  
  const handleEndDateSelect = (date: Date | undefined) => { 
    console.log('End Date selected:', date); 
    if (date) {
      const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12).toISOString(); 
      setFormData(prev => {
        const newData = { ...prev, endDate: normalized };
        
        // Validate date range if both dates are set
        if (newData.startDate && new Date(newData.startDate) > new Date(normalized)) {
          toast.error("End date must be later than or equal to start date", {
            position: "top-right",
            className: "!bg-red-100 !text-red-800 !border !border-red-300",
          });
          return prev; // Don't update if invalid
        }
        
        return newData;
      });
    } else {
      setFormData(prev => ({ ...prev, endDate: '' })); 
    }
  };
  
  const handleStartTimeSelect = (time: string) => { 
    setFormData(prev => {
      const newData = { 
        ...prev, 
        startTime: time,
        selectedResources: [],
        selectedAssets: []
      };
      
      // Validate time range if both times are set and not all day
      if (!newData.allDay && newData.endTime) {
        const [startHour, startMinute] = time.split(':').map(Number);
        const [endHour, endMinute] = newData.endTime.split(':').map(Number);
        
        const startTimeInMinutes = startHour * 60 + startMinute;
        const endTimeInMinutes = endHour * 60 + endMinute;
        
        if (startTimeInMinutes >= endTimeInMinutes) {
          toast.error("Start time must be earlier than end time", {
            position: "top-right",
            className: "!bg-red-100 !text-red-800 !border !border-red-300",
          });
          return prev; // Don't update if invalid
        }
      }
      
      return newData;
    });
    setTimeChangeKey(prev => prev + 1);
  };
  
  const handleEndTimeSelect = (time: string) => { 
    setFormData(prev => {
      const newData = { 
        ...prev, 
        endTime: time,
        selectedResources: [],
        selectedAssets: []
      };
      
      // Validate time range if both times are set and not all day
      if (!newData.allDay && newData.startTime) {
        const [startHour, startMinute] = newData.startTime.split(':').map(Number);
        const [endHour, endMinute] = time.split(':').map(Number);
        
        const startTimeInMinutes = startHour * 60 + startMinute;
        const endTimeInMinutes = endHour * 60 + endMinute;
        
        if (startTimeInMinutes >= endTimeInMinutes) {
          toast.error("End time must be later than start time", {
            position: "top-right",
            className: "!bg-red-100 !text-red-800 !border !border-red-300",
          });
         return prev; // Don't update if invalid
        }
      }
      
      return newData;
    });
    setTimeChangeKey(prev => prev + 1);
  };
  
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

  const handleAssetMaintenanceToggle = (checked: boolean) => {
    setFormData(prev => ({ 
      ...prev, 
      assetMaintenance: checked,
      ...(checked ? { 
        selectedResources: [],
        selectedVendors: []
      } : {})
    }));
    
    if (checked) {
      // Collapse resources and vendors accordions when asset maintenance is enabled
      setAccordionValues(prev => prev.filter(val => !['resources', 'vendors'].includes(val)));
    } else {
      // Expand accordions when asset maintenance is disabled
      setAccordionValues(['primary-info', 'resources', 'vendors', 'assets']);
    }
  };

  // Custom dropdown options for routing group with loading state
  const routingGroupOptions = React.useMemo(() => {
    if (isCreatingRoutingGroup) {
      return [{
        value: 'LOADING',
        text: (
          <div className="flex items-center justify-center p-4">
            <Loader className="h-4 w-4 animate-spin" />
            <span className="ml-2 text-[12px] text-muted-foreground">Loading...</span>
          </div>
        )
      }];
    }
    
    const groupOptions = routingGroups.map(group => ({ value: group.id, text: group.name }));
    const allOptions = [
      { value: 'CREATE_NEW', text: '+ Create New' },
      ...groupOptions
    ];
    
    // console.log('Routing group options updated:', allOptions);
    // console.log('Current form routing group:', formData.routingGroup);
    
    return allOptions;
  }, [routingGroups, isCreatingRoutingGroup, formData.routingGroup]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }} modal>
        <DialogContent className={`max-w-screen-xl text-[12px] font-sans tracking-tight transition-all duration-300 max-h-[90vh] flex flex-col ${bubbleEffect ? 'scale-95' : ''}`} onPointerDownOutside={(e) => { e.preventDefault(); handleOutsideClick(); }} style={{ padding: 16 }}>
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-[15px] tracking-tight font-semibold">Create Event {selectedJob && `[WO ID ${selectedJob.id}]`}</DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              <Accordion type="multiple" value={accordionValues} onValueChange={setAccordionValues} className="w-full border border-border rounded-lg">
                <AccordionItem value="primary-info">
                  <AccordionTrigger className="bg-muted px-2 py-1 rounded-t-lg">
                    <span className="text-foreground font-semibold text-[14px] tracking-tight">Primary Information</span>
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
                          className="h-7 px-2 !text-[12px] placeholder:text-[12px]"
                        />
                      </div>

                      <div className="col-span-1 space-y-1">
                        <Label className="text-[12px] tracking-tight">Work Order</Label>
                        <div className="h-7 px-2 rounded flex items-center text-muted-foreground truncate text-[12px]">
                          {selectedJob ? (
                            <a href={selectedJob.woUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">{selectedJob.title}</a>
                          ) : '-'}
                        </div>
                      </div>

                      <div className="col-span-1 space-y-1">
                        <Label className="text-[12px] tracking-tight">Project</Label>
                        <div className="h-7 px-2 rounded flex items-center text-muted-foreground truncate text-[12px]">
                          {selectedJob ? (
                            <a href={selectedJob.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">{selectedJob.project}</a>
                          ) : '-'}
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
                          disabled={formData.allDay || isCreating}
                          isRequired={true}
                        />
                      </div>

                      <div className="space-y-1">
                        <TimeRangeFilter
                          id="endTime"
                          label="End Time"
                          value={formData.endTime}
                          onChange={handleEndTimeSelect}
                          disabled={formData.allDay || isCreating}
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
                          key={`${dropdownKey}-${formData.routingGroup}`}
                          id="routingGroup"
                          label="Routing Group"
                          options={routingGroupOptions}
                          value={isCreatingRoutingGroup ? 'LOADING' : formData.routingGroup}
                          text={isCreatingRoutingGroup ? 'LOADING' : formData.routingGroupText}
                          onChange={handleRoutingGroupChange}
                          placeholder="Select routing group"
                          fetchOptionsOnOpen={fetchRoutingGroupOptions}
                          disabled={isCreatingRoutingGroup || isCreating}
                        />
                      </div>
                      {
                        (selectedJob?.id) ?
                        <div className="col-span-1 flex items-center justify-start space-x-2" style={{ marginTop: '16px' }}>
                          <Switch
                            checked={formData.allDay}
                            onCheckedChange={handleAllDayToggle}
                            className="h-5 w-10 data-[state=checked]:bg-blue-600 [&>span]:h-4 [&>span]:w-4"
                          />
                          <Label className="text-[11px] tracking-tight">All Day</Label>
                        </div> :
                        <div className="col-span-1 flex flex-col space-y-1">
                          <div className="col-span-2 flex gap-4 mt-1">
                            {/* All Day Toggle */}
                            <div className="flex flex-col items-center space-y-1 ml-8">
                              <Label className="text-[12px] tracking-tight">All Day</Label>
                              <Switch
                                checked={formData.allDay}
                                onCheckedChange={handleAllDayToggle}
                                className="h-5 w-10 data-[state=checked]:bg-blue-600 [&>span]:h-4 [&>span]:w-4"
                              />
                            </div>

                            {/* Asset Maintenance Toggle */}
                            <div className="flex flex-col items-center space-y-1 ml-8">
                              <Label className="text-[12px] tracking-tight">Asset Maintenance</Label>
                              <Switch
                                checked={formData.assetMaintenance}
                                onCheckedChange={handleAssetMaintenanceToggle}
                                className="h-5 w-10 data-[state=checked]:bg-blue-600 [&>span]:h-4 [&>span]:w-4"
                              />
                            </div>
                          </div>
                        </div> 
                      }
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="multiple" value={accordionValues} onValueChange={setAccordionValues} className="w-full border border-border rounded-lg">
                <AccordionItem value="resources">
                  <AccordionTrigger 
                    className={`px-2 py-1 rounded-t-lg ${
                      formData.assetMaintenance || isCreating
                        ? 'bg-muted/50 text-muted-foreground cursor-not-allowed' 
                        : 'bg-muted'
                    }`}
                    disabled={formData.assetMaintenance || isCreating}
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold text-[14px] tracking-tight ${
                        formData.assetMaintenance ? 'text-muted-foreground' : 'text-foreground'
                      }`}>
                        Resources
                      </span>
                      {formData.selectedResources.length > 0 && (
                        <Badge variant="destructive" className="text-[9px] px-1 py-0.5 h-4">
                          {formData.selectedResources.length}
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-2">
                    <div className="max-h-[400px] overflow-y-auto">
                        <EmployeeTable 
                          key={`employee-table-${formData.assetMaintenance}-${timeChangeKey}-${formData.startDate}-${formData.endDate}-${formData.startTime}-${formData.endTime}-${formData.allDay}`}
                          data={employees/* .filter(x => !!x.active) */} 
                          woResources={woResources}
                          onSelectionChange={handleResourceSelection}
                          preselectedResourceIds={getPreselectedResourceIds()}
                          primaryStartTime={prefilledStartTime}
                          primaryEndTime={prefilledEndTime}
                          currentStartTime={formData.startTime}
                          currentEndTime={formData.endTime}
                          conflictedResourceIds={Array.from(resourceConflictInfo.conflicts)}
                          conflictEvents={resourceConflictInfo.conflictEvents}
                        />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="multiple" value={accordionValues} onValueChange={setAccordionValues} className="w-full border border-border rounded-lg">
                <AccordionItem value="vendors">
                  <AccordionTrigger 
                    className={`px-2 py-1 rounded-t-lg ${
                      formData.assetMaintenance || isCreating
                        ? 'bg-muted/50 text-muted-foreground cursor-not-allowed' 
                        : 'bg-muted'
                    }`}
                    disabled={formData.assetMaintenance || isCreating}
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold text-[14px] tracking-tight ${
                        formData.assetMaintenance ? 'text-muted-foreground' : 'text-foreground'
                      }`}>
                        Vendors
                      </span>
                      {formData.selectedVendors.length > 0 && (
                        <Badge variant="destructive" className="text-[9px] px-1 py-0.5 h-4">
                          {formData.selectedVendors.length}
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-2">
                    <div className="max-h-[400px] overflow-y-auto">
                       <VendorTable 
                         key={`vendor-table-${formData.assetMaintenance}`}
                         data={vendors/* .filter(x => !!x.active) */}
                         woVendors={woVendors}
                         onSelectionChange={handleVendorSelection}
                         preselectedVendorIds={getPreselectedVendorIds()}
                       />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="multiple" value={accordionValues} onValueChange={setAccordionValues} className="w-full border border-border rounded-lg">
                <AccordionItem value="assets">
                  <AccordionTrigger 
                    className={`px-2 py-1 rounded-t-lg ${
                      isCreating ? 'bg-muted/50 text-muted-foreground cursor-not-allowed' : 'bg-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-foreground font-semibold text-[14px] tracking-tight">Assets</span>
                      {formData.selectedAssets.length > 0 && (
                        <Badge variant="destructive" className="text-[9px] px-1 py-0.5 h-4">
                          {formData.selectedAssets.length}
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-2">
                    <div className="max-h-[400px] overflow-y-auto">
                        <AssetTable 
                          key={`asset-table-${timeChangeKey}-${formData.startDate}-${formData.endDate}-${formData.startTime}-${formData.endTime}-${formData.allDay}`}
                          data={assets/* .filter(x => !!x.active) */}
                          woAssets={woAssets}
                          onSelectionChange={handleAssetSelection}
                          preselectedAssetIds={getPreselectedAssetIds()}
                          prefilledStartTime={prefilledStartTime}
                          prefilledEndTime={prefilledEndTime}
                          currentStartTime={formData.startTime}
                          currentEndTime={formData.endTime}
                          conflictedAssetIds={Array.from(assetConflictInfo.conflicts)}
                          conflictEvents={assetConflictInfo.conflictEvents}
                        />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {
                (selectedJob?.id) && 
                <>
                  <Accordion type="single" collapsible className="w-full border border-border rounded-lg" defaultValue='woitems'>
                    <AccordionItem value="woitems">
                      <AccordionTrigger className="bg-muted px-2 py-1 rounded-t-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-foreground font-semibold text-[14px] tracking-tight">Work Order Items</span>
                          {formData.selectedItems.length > 0 && (
                            <Badge variant="destructive" className="text-[9px] px-1 py-0.5 h-4">
                              {formData.selectedItems.length}
                            </Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-2">
                        <div className="max-h-[400px] overflow-y-auto">
                          <WOItemTable 
                            data={woItems}
                            woId={selectedJob?.id}
                            onSelectionChange={handleWOItemSelection}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible className="w-full border border-border rounded-lg" defaultValue='wocontacts'>
                    <AccordionItem value="wocontacts">
                      <AccordionTrigger className="bg-muted px-2 py-1 rounded-t-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-foreground font-semibold text-[14px] tracking-tight">Work Order Contacts</span>
                          {formData.selectedContacts.length > 0 && (
                            <Badge variant="destructive" className="text-[9px] px-1 py-0.5 h-4">
                              {formData.selectedContacts.length}
                            </Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-2">
                        <div className="max-h-[400px] overflow-y-auto">
                          <WOContactTable 
                            data={woContacts}
                            woId={selectedJob?.id}
                            onSelectionChange={handleWOContactSelection}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible className="w-full border border-border rounded-lg" defaultValue='woaddresses'>
                    <AccordionItem value="woaddresses">
                      <AccordionTrigger className="bg-muted px-2 py-1 rounded-t-lg">
                        <span className="text-foreground font-semibold text-[14px] tracking-tight">Work Order Addresses</span>
                      </AccordionTrigger>
                      <AccordionContent className="p-2">
                        <div className="max-h-[400px] overflow-y-auto">
                          <WOAddressTable 
                            data={woAddresses}
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
            <Button variant="outline" onClick={onClose} /* className="text-[12px] h-8 px-3 tracking-tight" */>Cancel</Button>
            <Button onClick={handleSubmit}/*  className="text-[12px] h-8 px-3 tracking-tight" */>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Routing Group Modal */}
      <CreateRoutingGroupModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onRoutingGroupCreated={handleRoutingGroupCreated}
        onLoadingChange={handleRoutingGroupLoadingChange}
      />

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create Event</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedJob 
                ? `Create Event for ${selectedJob.title}?` 
                : 'Create General Event?'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isCreating}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCreate} disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Event'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
