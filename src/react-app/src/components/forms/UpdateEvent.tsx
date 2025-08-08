
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
import { Clock, Loader, Loader2 } from 'lucide-react';
import { type Employee } from "@/api/employee";
import { type Vendor } from "@/api/vendor";
import { type Asset } from "@/api/asset";
import { type WOResource } from "@/api/woResource";
import { type WOVendor } from "@/api/woVendor";
import { type WOAsset } from "@/api/woAsset";
import { type WorkOrder } from "@/api/workOrder";
import { type Event } from "@/api/event";
import { type WOItem } from "@/api/woItem";
import { type WOContact } from "@/api/woContact";
import { type WOAddress } from "@/api/woAddress";
import { isLocalDevelopment } from "@/lib/helpers";
import { fetchRoutingGroups, RoutingGroup } from "@/api/routingGroup";
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
import { updateEvent } from "@/api/event";

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

interface UpdateEventProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEvent?: Event;
  onEventUpdated?: () => void;
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
}

export const UpdateEvent: React.FC<UpdateEventProps> = ({ 
  isOpen, 
  onClose, 
  selectedEvent, 
  onEventUpdated,
  employees = [],
  vendors = [],
  assets = [],
  woResources = [],
  woVendors = [],
  woAssets = [],
  woItems = [],
  woContacts = [],
  woAddresses = [],
  events = []
}) => {
  const defaultFormData: EventFormData = {
    eventTitle: selectedEvent?.title || '', 
    notes: selectedEvent?.note || '', 
    startDate: selectedEvent?.date?.start || '', 
    endDate: selectedEvent?.date?.end || '', 
    startTime: selectedEvent?.time?.start || '08:00', 
    endTime: selectedEvent?.time?.end || '18:00', 
    status: selectedEvent?.status?.value || 'TENTATIVE', 
    priority: selectedEvent?.priority?.value || '1', 
    allDay: false, 
    assetMaintenance: selectedEvent?.assetMaintenance,
    routingGroupText: selectedEvent?.routingGroup?.text || '',
    routingGroup: selectedEvent?.routingGroup?.value || '',
    woRef: selectedEvent?.woRef,
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
  const [timeChangeKey, setTimeChangeKey] = useState(0); // Force re-render for time changes
  const [isUpdating, setIsUpdating] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showDateTimeChangeConfirm, setShowDateTimeChangeConfirm] = useState(false);
  const [pendingDateTimeChange, setPendingDateTimeChange] = useState<{
    type: 'startDate' | 'endDate' | 'startTime' | 'endTime';
    value: string | Date | undefined;
  } | null>(null);
  const [tableResetKey, setTableResetKey] = useState(0); // Force table reset
  const [clearTableSelections, setClearTableSelections] = useState(false);

  // Get conflict detection functions with event tracking
  const getResourceConflicts = useCallback(() => {
    console.log('[UpdateEvent] Checking employee conflicts with formData:', {
      startDate: formData.startDate,
      endDate: formData.endDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      allDay: formData.allDay
    });

    if (!formData.startDate && !formData.endDate) {
      console.log('[UpdateEvent] No dates provided, returning empty employee conflicts');
      return { conflicts: new Set<string>(), conflictEvents: new Map<string, any[]>() };
    }

    const conflicts = new Set<string>();
    const conflictEvents = new Map<string, any[]>();
    
    events.forEach(event => {
      // Skip the current event being updated
      if (event.id === selectedEvent?.id) return;
      
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
  }, [formData.startDate, formData.endDate, formData.startTime, formData.endTime, formData.allDay, events, selectedEvent?.id]);

  const getAssetConflicts = useCallback(() => {
    console.log('[UpdateEvent] Checking asset conflicts with formData:', {
      startDate: formData.startDate,
      endDate: formData.endDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      allDay: formData.allDay
    });

    if (!formData.startDate && !formData.endDate) {
      console.log('[UpdateEvent] No dates provided, returning empty asset conflicts');
      return { conflicts: new Set<string>(), conflictEvents: new Map<string, any[]>() };
    }

    const conflicts = new Set<string>();
    const conflictEvents = new Map<string, any[]>();
    
    events.forEach(event => {
      // Skip the current event being updated
      if (event.id === selectedEvent?.id) return;
      
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
  }, [formData.startDate, formData.endDate, formData.startTime, formData.endTime, formData.allDay, events, selectedEvent?.id]);

  // Get conflict information with useMemo to ensure consistency
  const resourceConflictInfo = useMemo(() => getResourceConflicts(), [
    formData.startDate, 
    formData.endDate, 
    formData.startTime, 
    formData.endTime, 
    formData.allDay, 
    events,
    selectedEvent?.id
  ]);
  
  const assetConflictInfo = useMemo(() => getAssetConflicts(), [
    formData.startDate, 
    formData.endDate, 
    formData.startTime, 
    formData.endTime, 
    formData.allDay, 
    events,
    selectedEvent?.id
  ]);

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
      setFormData(defaultFormData);
      
      // Set accordion values based on assetMaintenance
      if (defaultFormData.assetMaintenance) {
        setAccordionValues(['primary-info', 'assets']);
      } else {
        setAccordionValues(['primary-info', 'resources', 'vendors', 'assets']);
      }
    }
    previousIsOpenRef.current = isOpen;
  }, [isOpen]);

  const handleOutsideClick = () => { setBubbleEffect(true); setTimeout(() => setBubbleEffect(false), 300); };
  
  const handleSubmit = async () => { 
    console.log('Form data on submit:', formData);
    
    // Validate mandatory fields
    if (!formData.eventTitle || !formData.startDate || !formData.endDate || (!formData.allDay && (!formData.startTime || !formData.endTime))) {
      toast.error("Please fill in all required fields", {
        position: "top-right",
        className: "!bg-red-100 !text-red-800 !border !border-red-300",
      });
      return;
    }
    
    // Show confirmation dialog
    setShowConfirmDialog(true);
  };

  const handleConfirmUpdate = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default AlertDialogAction behavior
    
    try {
      setIsUpdating(true);
      
      // Transform formData to Event structure
      const updates: Partial<Event> = {
        title: formData.eventTitle,
        note: formData.notes,
        date: {
          start: formData.startDate,
          end: formData.endDate,
          recurrence: '',
          dates: []
        },
        time: {
          start: formData.startTime,
          end: formData.endTime
        },
        status: {
          text: String(statusOptions.find(s => s.value === formData.status)?.text || ''),
          value: formData.status
        },
        priority: {
          text: String(priorityOptions.find(p => p.value === formData.priority)?.text || ''),
          value: formData.priority
        },
        assetMaintenance: formData.assetMaintenance,
        routingGroup: {
          text: formData.routingGroupText,
          value: formData.routingGroup
        },
        resources: formData.selectedResources,
        vendors: formData.selectedVendors,
        assets: formData.selectedAssets,
        items: formData.selectedItems,
        contacts: formData.selectedContacts,
        address: formData.selectedAddress ? {
          text: formData.selectedAddress.name,
          value: formData.selectedAddress.id
        } : undefined
      };

      console.log('Update Event Payload', {
        selectedEvent,
        updates
      });

      if (isLocalDevelopment()) {
        console.log('DEBUGGING', {
          selectedEvent,
          updates
        });
        return;
      }
      
      await updateEvent(selectedEvent/* !.id */, updates);
      
      // Success toast
      toast.custom((id) => (
        <div
          data-sonner-rounded-toast
          className="flex items-start gap-3 w-full max-w-xl bg-green-100 text-green-800 border border-green-300 px-4 py-3 rounded-md"
        >
          <CheckCircle className="h-5 w-5 mt-0.5 text-green-700 shrink-0" />
          <div className="flex-1 text-sm font-medium">
            Event "{formData.eventTitle}" updated successfully!
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
      onEventUpdated?.();
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error("Failed to update event. Please try again.", {
        position: "top-right",
        className: "!bg-red-100 !text-red-800 !border !border-red-300",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Updated memoized handler functions for table selections to prevent infinite loops
  const handleResourceSelection = useCallback((selectedResources: SelectedResource[]) => {
    // console.log('Resource selection changed:', selectedResources);
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

  // Function to apply date/time changes with validation
  const applyDateTimeChange = (type: 'startDate' | 'endDate' | 'startTime' | 'endTime', value: string | Date | undefined) => {
    if (type === 'startDate') {
      if (value instanceof Date) {
        const normalized = new Date(value.getFullYear(), value.getMonth(), value.getDate(), 12).toISOString();
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
    } else if (type === 'endDate') {
      if (value instanceof Date) {
        const normalized = new Date(value.getFullYear(), value.getMonth(), value.getDate(), 12).toISOString();
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
    } else if (type === 'startTime') {
      setFormData(prev => {
        const newData = { ...prev, startTime: value as string };
        
        // Validate time range if both times are set and not all day
        if (!newData.allDay && newData.endTime) {
          const [startHour, startMinute] = (value as string).split(':').map(Number);
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
    } else if (type === 'endTime') {
      setFormData(prev => ({ ...prev, endTime: value as string }));
    }
  };

  // Handle confirmation of date/time change
  const handleConfirmDateTimeChange = () => {
    if (!pendingDateTimeChange) return;
    
    // Trigger table clearing first
    setClearTableSelections(true);
    
    // Apply the pending change
    applyDateTimeChange(pendingDateTimeChange.type, pendingDateTimeChange.value);
    
    // Reset state
    setPendingDateTimeChange(null);
    setShowDateTimeChangeConfirm(false);
  };

  // Handle table clear completion
  const handleTableClearComplete = () => {
    // Clear form data selections after tables are cleared
    setFormData(prev => ({ 
      ...prev, 
      selectedResources: [],
      selectedAssets: []
    }));
    
    // Reset clear flag
    setClearTableSelections(false);
  };

  // Handle cancellation of date/time change
  const handleCancelDateTimeChange = () => {
    setPendingDateTimeChange(null);
    setShowDateTimeChangeConfirm(false);
  };
  
  const handleStartDateSelect = (date: Date | undefined) => { 
    console.log('Start Date selected:', date);
    
    // Check if there are selected resources or assets
    if (formData.selectedResources.length > 0 || formData.selectedAssets.length > 0) {
      setPendingDateTimeChange({ type: 'startDate', value: date });
      setShowDateTimeChangeConfirm(true);
      return;
    }
    
    // Direct update if no resources/assets selected
    applyDateTimeChange('startDate', date);
  };
  
  const handleEndDateSelect = (date: Date | undefined) => { 
    console.log('End Date selected:', date);
    
    // Check if there are selected resources or assets
    if (formData.selectedResources.length > 0 || formData.selectedAssets.length > 0) {
      setPendingDateTimeChange({ type: 'endDate', value: date });
      setShowDateTimeChangeConfirm(true);
      return;
    }
    
    // Direct update if no resources/assets selected
    applyDateTimeChange('endDate', date);
  };
  
  const handleStartTimeSelect = (time: string) => { 
    // Check if there are selected resources or assets
    if (formData.selectedResources.length > 0 || formData.selectedAssets.length > 0) {
      setPendingDateTimeChange({ type: 'startTime', value: time });
      setShowDateTimeChangeConfirm(true);
      return;
    }
    
    // Direct update if no resources/assets selected
    applyDateTimeChange('startTime', time);
  };
  const handleEndTimeSelect = (time: string) => { 
    // Check if there are selected resources or assets
    if (formData.selectedResources.length > 0 || formData.selectedAssets.length > 0) {
      setPendingDateTimeChange({ type: 'endTime', value: time });
      setShowDateTimeChangeConfirm(true);
      return;
    }
    
    // Direct update if no resources/assets selected
    applyDateTimeChange('endTime', time);
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
            <Loader2 className="h-4 w-4 animate-spin" />
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
    
    console.log('Routing group options updated:', allOptions);
    console.log('Current form routing group:', formData.routingGroup);
    
    return allOptions;
  }, [routingGroups, isCreatingRoutingGroup, formData.routingGroup]);

  console.log('Selected Event', selectedEvent);
  if (!selectedEvent) return null;

  const selectedJob = selectedEvent.woRef;
  console.log('Selected Job', selectedJob);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }} modal>
        <DialogContent className={`max-w-screen-xl text-[12px] font-sans tracking-tight transition-all duration-300 max-h-[90vh] flex flex-col ${bubbleEffect ? 'scale-95' : ''}`} onPointerDownOutside={(e) => { e.preventDefault(); handleOutsideClick(); }} style={{ padding: 16 }}>
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="text-[15px] tracking-tight font-semibold">Update Event Details {`[ID ${selectedEvent.id}]`}</DialogTitle>
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
                        <div className="h-7 px-2 rounded flex items-center text-gray-600 truncate text-[12px]">
                          {(selectedJob?.id) ? (
                            <a href={selectedJob.woUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">{selectedJob.title}</a>
                          ) : '-'}
                        </div>
                      </div>

                      <div className="col-span-1 space-y-1">
                        <Label className="text-[12px] tracking-tight">Project</Label>
                        <div className="h-7 px-2 rounded flex items-center text-gray-600 truncate text-[12px]">
                          {(selectedJob?.id) ? (
                            <a href={selectedJob.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">{selectedJob.project?.text}</a>
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
                          key={`${dropdownKey}-${formData.routingGroup}`}
                          id="routingGroup"
                          label="Routing Group"
                          options={routingGroupOptions}
                          value={isCreatingRoutingGroup ? 'LOADING' : formData.routingGroup}
                          text={isCreatingRoutingGroup ? 'LOADING' : formData.routingGroupText}
                          onChange={handleRoutingGroupChange}
                          placeholder="Select routing group"
                          fetchOptionsOnOpen={fetchRoutingGroupOptions}
                          disabled={isCreatingRoutingGroup}
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
                                disabled
                                className="h-5 w-10 data-[state=checked]:bg-blue-600 [&>span]:h-4 [&>span]:w-4 opacity-50 cursor-not-allowed"
                              />
                            </div>
                          </div>
                        </div> 
                      }
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="multiple" value={accordionValues} onValueChange={setAccordionValues} className="w-full border rounded-lg">
                <AccordionItem value="resources">
                  <AccordionTrigger 
                    className={`px-2 py-1 rounded-t-lg ${
                      formData.assetMaintenance 
                        ? 'bg-muted/50 text-muted-foreground cursor-not-allowed' 
                        : 'bg-muted'
                    }`}
                    disabled={formData.assetMaintenance}
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
                          key={`employee-table-${formData.assetMaintenance}-${selectedEvent?.id}-${tableResetKey}`}
                          data={employees/* .filter(x => !!x.active) */} 
                          woResources={woResources}
                          onSelectionChange={handleResourceSelection}
                          currentStartTime={formData.startTime}
                          currentEndTime={formData.endTime}
                          onUpdate={true}
                          preselectedResourceIds={[]} 
                          clearSelections={clearTableSelections}
                          onClearComplete={handleTableClearComplete}
                          conflictedResourceIds={Array.from(resourceConflictInfo.conflicts)}
                          conflictEvents={resourceConflictInfo.conflictEvents}
                        />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="multiple" value={accordionValues} onValueChange={setAccordionValues} className="w-full border rounded-lg">
                <AccordionItem value="vendors">
                  <AccordionTrigger 
                    className={`px-2 py-1 rounded-t-lg ${
                      formData.assetMaintenance 
                        ? 'bg-muted/50 text-muted-foreground cursor-not-allowed' 
                        : 'bg-muted'
                    }`}
                    disabled={formData.assetMaintenance}
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
                        onUpdate={true}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion type="multiple" value={accordionValues} onValueChange={setAccordionValues} className="w-full border rounded-lg">
                <AccordionItem value="assets">
                  <AccordionTrigger className="bg-muted px-2 py-1 rounded-t-lg">
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
                          key={`asset-table-${selectedEvent?.id}-${tableResetKey}`}
                          data={assets/* .filter(x => !!x.active) */}
                          woAssets={woAssets}
                          onSelectionChange={handleAssetSelection}
                          onUpdate={true}
                          currentStartTime={formData.startTime}
                          currentEndTime={formData.endTime}
                          preselectedAssetIds={[]}
                          clearSelections={clearTableSelections}
                          onClearComplete={handleTableClearComplete}
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
                  <Accordion type="single" collapsible className="w-full border rounded-lg" defaultValue='woitems'>
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
                            onUpdate={true}
                            selectedEvent={selectedEvent}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible className="w-full border rounded-lg" defaultValue='wocontacts'>
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
                            onUpdate={true}
                            selectedEvent={selectedEvent}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="single" collapsible className="w-full border rounded-lg" defaultValue='woaddresses'>
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
                            onUpdate={true}
                            selectedEvent={selectedEvent}
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
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Update</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to update the event "{formData.eventTitle}"? This action will modify the existing event details.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmUpdate} 
              disabled={isUpdating}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isUpdating ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Event"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Date/Time Change Confirmation Dialog */}
      <AlertDialog open={showDateTimeChangeConfirm} onOpenChange={setShowDateTimeChangeConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Date/Time Change</AlertDialogTitle>
            <AlertDialogDescription>
              Updating the date and time will clear all selected resources and assets. Do you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDateTimeChange}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDateTimeChange}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Continue & Clear Selections
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create Routing Group Modal */}
      <CreateRoutingGroupModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onRoutingGroupCreated={handleRoutingGroupCreated}
        onLoadingChange={handleRoutingGroupLoadingChange}
      />
    </>
  );
};
