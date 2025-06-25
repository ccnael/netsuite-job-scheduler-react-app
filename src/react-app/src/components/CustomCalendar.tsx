import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ChevronLeft, ChevronRight, Clock, MapPin, ChevronDown, ChevronRight as ChevronRightIcon, Users, Plus } from "lucide-react";
import { format, parse, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks, isSameDay, parseISO, addDays, startOfDay } from "date-fns";

interface Resource {
  id: string;
  title: string;
  group: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  resourceId: string;
  description?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  extendedProps?: {
    description?: string;
    workorder?: string;
    location?: string;
    status?: string;
    priority?: string;
  };
}

interface CustomCalendarProps {
  resources: Resource[];
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDateSelect: (selectInfo: { startStr: string; endStr: string; resource: Resource }) => void;
  onEventResize?: (info: { event: CalendarEvent }) => void;
  onNewEvent?: () => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  resources,
  events,
  onEventClick,
  onDateSelect,
  onEventResize,
  onNewEvent
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | '3days' | 'week'>('week');
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);
  const [dragOverCell, setDragOverCell] = useState<string | null>(null);
  const [resizePreview, setResizePreview] = useState<{
    eventId: string;
    resourceId: string;
    startTime: number;
    endTime: number;
    isActive: boolean;
  } | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    event: CalendarEvent | null;
    newStart: string;
    newEnd: string;
    newResourceId: string;
    type: 'move' | 'resize';
    targetResourceTitle?: string;
    originalResourceTitle?: string;
  }>({ open: false, event: null, newStart: '', newEnd: '', newResourceId: '', type: 'move' });

  const resizeStateRef = useRef<{
    eventId: string;
    resourceId: string;
    handle: 'left' | 'right';
    startX: number;
    originalStart: string;
    originalEnd: string;
    originalStartTime: number;
    originalEndTime: number;
    isResizing: boolean;
  } | null>(null);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Get days based on view
  const displayDays = useMemo(() => {
    switch (view) {
      case 'day':
        return [currentDate];
      case '3days':
        return eachDayOfInterval({ 
          start: currentDate, 
          end: addDays(currentDate, 2) 
        });
      case 'week':
        return weekDays;
      default:
        return weekDays;
    }
  }, [view, currentDate, weekDays]);

  const timeSlots = useMemo(() => {
    const slots = [];
    if (view === 'day') {
      // 1-hour intervals for day view (24 hours)
      for (let hour = 0; hour < 24; hour++) {
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const ampm = hour < 12 ? 'am' : 'pm';
        if (hour === 0) {
          slots.push('12am');
        } else if (hour === 12) {
          slots.push('12pm');
        } else {
          slots.push(`${displayHour}${ampm}`);
        }
      }
    } else {
      // 4-hour intervals for week and 3-day views
      const hours = [0, 4, 8, 12, 16, 20]; // 12am, 4am, 8am, 12pm, 4pm, 8pm
      hours.forEach(hour => {
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const ampm = hour < 12 ? 'am' : 'pm';
        if (hour === 0) {
          slots.push('12am');
        } else if (hour === 12) {
          slots.push('12pm');
        } else {
          slots.push(`${displayHour}${ampm}`);
        }
      });
    }
    return slots;
  }, [view]);

  const groupedResources = useMemo(() => {
    const groups: Record<string, Resource[]> = {};
    resources.forEach(resource => {
      const groupName = resource.group.replace(/^\d+_/, '');
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(resource);
    });
    return groups;
  }, [resources]);

  const toggleGroupCollapse = (groupName: string) => {
    setCollapsedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupName)) {
        newSet.delete(groupName);
      } else {
        newSet.add(groupName);
      }
      return newSet;
    });
  };

  const getEventsForResourceAndDate = (resourceId: string, date: Date) => {
    return events.filter(event => {
      const eventStart = parseISO(event.start);
      return event.resourceId === resourceId && isSameDay(eventStart, date);
    });
  };

  // New function to detect overlapping events and assign vertical positions
  const getEventLayout = (resourceId: string, date: Date) => {
    const resourceEvents = getEventsForResourceAndDate(resourceId, date);
    
    // Sort events by start time
    const sortedEvents = resourceEvents.sort((a, b) => {
      const startA = parseISO(a.start);
      const startB = parseISO(b.start);
      return startA.getTime() - startB.getTime();
    });

    // Assign vertical positions to overlapping events
    const eventLayout: Array<{ event: CalendarEvent; row: number; totalRows: number }> = [];
    const rows: Array<{ endTime: number; events: CalendarEvent[] }> = [];

    sortedEvents.forEach(event => {
      const eventStart = parseISO(event.start);
      const eventEnd = parseISO(event.end);
      const startTime = eventStart.getHours() + eventStart.getMinutes() / 60;
      const endTime = eventEnd.getHours() + eventEnd.getMinutes() / 60;

      // Find the first row where this event can fit (no overlap)
      let assignedRow = -1;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].endTime <= startTime) {
          // No overlap, can use this row
          assignedRow = i;
          rows[i].endTime = endTime;
          rows[i].events.push(event);
          break;
        }
      }

      // If no existing row works, create a new one
      if (assignedRow === -1) {
        assignedRow = rows.length;
        rows.push({ endTime, events: [event] });
      }

      eventLayout.push({ event, row: assignedRow, totalRows: rows.length });
    });

    // Update totalRows for all events to reflect the final number of rows
    const finalTotalRows = rows.length;
    eventLayout.forEach(layout => {
      layout.totalRows = finalTotalRows;
    });

    return eventLayout;
  };

  const getCellId = (resourceId: string, date: Date, timeSlot: string) => {
    return `${resourceId}-${format(date, 'yyyy-MM-dd')}-${timeSlot}`;
  };

  const handleCellClick = (resource: Resource, date: Date, timeSlot: string) => {
    // Convert timeSlot to 24-hour format
    let hour24 = 0;
    if (timeSlot.includes('12am')) {
      hour24 = 0;
    } else if (timeSlot.includes('12pm')) {
      hour24 = 12;
    } else if (timeSlot.includes('am')) {
      hour24 = parseInt(timeSlot.replace('am', ''));
    } else if (timeSlot.includes('pm')) {
      hour24 = parseInt(timeSlot.replace('pm', '')) + 12;
    }

    const startStr = `${format(date, 'yyyy-MM-dd')}T${hour24.toString().padStart(2, '0')}:00:00`;
    let endHour;
    if (view === 'day') {
      endHour = hour24 + 1;
    } else {
      endHour = hour24 + 4;
    }
    const endStr = `${format(date, 'yyyy-MM-dd')}T${endHour.toString().padStart(2, '0')}:00:00`;
    
    onDateSelect({
      startStr,
      endStr,
      resource
    });
  };

  const handleEventDragStart = (event: CalendarEvent, e: React.DragEvent) => {
    console.log('Drag started for event:', event.id);
    setDraggedEvent(event);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', event.id);
    
    // Add visual feedback to the dragged event
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  const handleCellDragEnter = (resource: Resource, date: Date, timeSlot: string, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedEvent) {
      const cellId = getCellId(resource.id, date, timeSlot);
      setDragOverCell(cellId);
    }
  };

  const handleCellDragLeave = (resource: Resource, date: Date, timeSlot: string, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only clear if we're actually leaving this specific cell
    const relatedTarget = e.relatedTarget as HTMLElement;
    const currentTarget = e.currentTarget as HTMLElement;
    
    if (!currentTarget.contains(relatedTarget)) {
      const cellId = getCellId(resource.id, date, timeSlot);
      if (dragOverCell === cellId) {
        setDragOverCell(null);
      }
    }
  };

  const handleCellDrop = (resource: Resource, date: Date, timeSlot: string, e: React.DragEvent) => {
    e.preventDefault();
    console.log('Drop on cell:', getCellId(resource.id, date, timeSlot));
    setDragOverCell(null);
    
    if (!draggedEvent) return;

    // Convert timeSlot to 24-hour format
    let hour24 = 0;
    if (timeSlot.includes('12am')) {
      hour24 = 0;
    } else if (timeSlot.includes('12pm')) {
      hour24 = 12;
    } else if (timeSlot.includes('am')) {
      hour24 = parseInt(timeSlot.replace('am', ''));
    } else if (timeSlot.includes('pm')) {
      hour24 = parseInt(timeSlot.replace('pm', '')) + 12;
    }

    const originalStart = parseISO(draggedEvent.start);
    const originalEnd = parseISO(draggedEvent.end);
    const duration = originalEnd.getTime() - originalStart.getTime();

    const newStart = `${format(date, 'yyyy-MM-dd')}T${hour24.toString().padStart(2, '0')}:00:00`;
    const newEndDate = new Date(parseISO(newStart).getTime() + duration);
    const newEnd = format(newEndDate, "yyyy-MM-dd'T'HH:mm:ss");

    // Find resource titles for confirmation dialog
    const originalResource = resources.find(r => r.id === draggedEvent.resourceId);
    const targetResource = resource;

    setConfirmDialog({
      open: true,
      event: draggedEvent,
      newStart,
      newEnd,
      newResourceId: resource.id,
      type: 'move',
      originalResourceTitle: originalResource?.title,
      targetResourceTitle: targetResource.title
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    console.log('Drag ended');
    // Reset visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
    // Don't clear draggedEvent here, let the dialog handle it
  };

  const confirmEventUpdate = async () => {
    if (!confirmDialog.event) return;

    try {
      if (confirmDialog.type === 'resize') {
        // For resize operations, call onEventResize with the updated event
        await onEventResize?.({
          event: {
            ...confirmDialog.event,
            start: confirmDialog.newStart,
            end: confirmDialog.newEnd,
            resourceId: confirmDialog.newResourceId
          }
        });
      } else {
        // For move operations, also call onEventResize (since it handles both cases)
        await onEventResize?.({
          event: {
            ...confirmDialog.event,
            start: confirmDialog.newStart,
            end: confirmDialog.newEnd,
            resourceId: confirmDialog.newResourceId
          }
        });
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }

    setConfirmDialog({ open: false, event: null, newStart: '', newEnd: '', newResourceId: '', type: 'move' });
    setDraggedEvent(null);
    setDragOverCell(null);
    setResizePreview(null);
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      switch (view) {
        case 'day':
          return direction === 'prev' ? addDays(prev, -1) : addDays(prev, 1);
        case '3days':
          return direction === 'prev' ? addDays(prev, -3) : addDays(prev, 3);
        case 'week':
          return direction === 'prev' ? subWeeks(prev, 1) : addWeeks(prev, 1);
        default:
          return direction === 'prev' ? subWeeks(prev, 1) : addWeeks(prev, 1);
      }
    });
  };

  const getDateRangeTitle = () => {
    switch (view) {
      case 'day':
        return format(currentDate, 'EEEE, MMM d, yyyy');
      case '3days':
        const threeDayEnd = addDays(currentDate, 2);
        return `${format(currentDate, 'MMM d')} - ${format(threeDayEnd, 'MMM d, yyyy')}`;
      case 'week':
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
      default:
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleResizeStart = useCallback((event: CalendarEvent, handle: 'left' | 'right', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Starting resize for event:', event.id, 'handle:', handle);
    
    const eventStart = parseISO(event.start);
    const eventEnd = parseISO(event.end);
    const originalStartTime = eventStart.getHours() + eventStart.getMinutes() / 60;
    const originalEndTime = eventEnd.getHours() + eventEnd.getMinutes() / 60;
    
    resizeStateRef.current = {
      eventId: event.id,
      resourceId: event.resourceId,
      handle,
      startX: e.clientX,
      originalStart: event.start,
      originalEnd: event.end,
      originalStartTime,
      originalEndTime,
      isResizing: true
    };

    // Initialize the resize preview
    setResizePreview({
      eventId: event.id,
      resourceId: event.resourceId,
      startTime: originalStartTime,
      endTime: originalEndTime,
      isActive: true
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeStateRef.current || !resizeStateRef.current.isResizing) return;

      const deltaX = e.clientX - resizeStateRef.current.startX;
      const containerElement = document.querySelector('.timeline-container');
      if (!containerElement) return;
      
      const containerWidth = containerElement.clientWidth;
      const dayWidth = containerWidth / displayDays.length;
      
      // Calculate time change based on mouse movement with 4-hour snapping
      const pixelsPerHour = dayWidth / 24;
      const timeChangeHours = deltaX / pixelsPerHour;
      
      // Snap to 4-hour intervals (0, 4, 8, 12, 16, 20)
      const snapToFourHours = (time: number) => {
        return Math.round(time / 4) * 4;
      };
      
      // Snap to 1-hour intervals within 4-hour blocks for finer control
      const snapToHour = (time: number) => {
        return Math.round(time);
      };

      let newStartTime = resizeStateRef.current.originalStartTime;
      let newEndTime = resizeStateRef.current.originalEndTime;

      if (resizeStateRef.current.handle === 'left') {
        // Resize from left (change start time)
        const candidateStartTime = resizeStateRef.current.originalStartTime + timeChangeHours;
        newStartTime = snapToHour(candidateStartTime);
        
        // Ensure it doesn't go past end time and maintains minimum duration
        if (newStartTime >= newEndTime) {
          newStartTime = newEndTime - 1; // 1 hour minimum
        }
        
        // Keep within 0-24 hour range
        newStartTime = Math.max(0, Math.min(23, newStartTime));
      } else {
        // Resize from right (change end time)
        const candidateEndTime = resizeStateRef.current.originalEndTime + timeChangeHours;
        newEndTime = snapToHour(candidateEndTime);
        
        // Ensure it doesn't go before start time and maintains minimum duration
        if (newEndTime <= newStartTime) {
          newEndTime = newStartTime + 1; // 1 hour minimum
        }
        
        // Keep within 0-24 hour range
        newEndTime = Math.max(1, Math.min(24, newEndTime));
      }

      // Update the resize preview in real-time
      setResizePreview(prev => prev ? {
        ...prev,
        startTime: newStartTime,
        endTime: newEndTime
      } : null);
    };

    const handleMouseUp = (e: MouseEvent) => {
      console.log('Ending resize for event:', event.id);
      
      if (!resizeStateRef.current || !resizePreview) {
        // Clean up even if no resize state
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setResizePreview(null);
        resizeStateRef.current = null;
        return;
      }

      // Mark as not resizing immediately
      resizeStateRef.current.isResizing = false;

      // Calculate new start and end dates
      const originalStart = parseISO(resizeStateRef.current.originalStart);
      const newStartDate = new Date(originalStart);
      newStartDate.setHours(Math.floor(resizePreview.startTime), (resizePreview.startTime % 1) * 60);
      
      const newEndDate = new Date(originalStart);
      newEndDate.setHours(Math.floor(resizePreview.endTime), (resizePreview.endTime % 1) * 60);

      const newStartStr = format(newStartDate, "yyyy-MM-dd'T'HH:mm:ss");
      const newEndStr = format(newEndDate, "yyyy-MM-dd'T'HH:mm:ss");

      // Only show confirmation if there was actual change
      if (newStartStr !== resizeStateRef.current.originalStart || newEndStr !== resizeStateRef.current.originalEnd) {
        setConfirmDialog({
          open: true,
          event: event,
          newStart: newStartStr,
          newEnd: newEndStr,
          newResourceId: event.resourceId,
          type: 'resize'
        });
      } else {
        setResizePreview(null);
      }

      // Clean up
      resizeStateRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [displayDays.length, resizePreview]);

  const renderEvent = (event: CalendarEvent, resourceId: string, row: number, totalRows: number) => {
    // Check if this event is being resized and get preview values
    const isBeingResized = resizePreview?.eventId === event.id && 
                          resizePreview?.resourceId === resourceId &&
                          resizePreview?.isActive &&
                          event.resourceId === resourceId;
    
    let startTime, endTime;
    
    if (isBeingResized && resizePreview) {
      startTime = resizePreview.startTime;
      endTime = resizePreview.endTime;
    } else {
      const eventStart = parseISO(event.start);
      const eventEnd = parseISO(event.end);
      startTime = eventStart.getHours() + eventStart.getMinutes() / 60;
      endTime = eventEnd.getHours() + eventEnd.getMinutes() / 60;
    }
    
    // Calculate position based on actual times within the time slots
    const left = (startTime / 24) * 100;
    const width = Math.max(((endTime - startTime) / 24) * 100, 2); // Minimum 2% width
    
    // Calculate vertical position based on row and total rows
    const eventHeight = totalRows > 1 ? `${100 / totalRows}%` : '100%';
    const topPosition = totalRows > 1 ? `${(row / totalRows) * 100}%` : '0%';
    
    // Create display times
    const displayStart = new Date();
    displayStart.setHours(Math.floor(startTime), (startTime % 1) * 60);
    const displayEnd = new Date();
    displayEnd.setHours(Math.floor(endTime), (endTime % 1) * 60);
    
    const displayStartTime = format(displayStart, 'HH:mm');
    const displayEndTime = format(displayEnd, 'HH:mm');
    
    return (
      <div
        key={`${event.id}-${resourceId}-${row}`}
        data-event-id={`${event.id}-${resourceId}`}
        className={`absolute px-1 py-1 text-[9px] rounded cursor-move hover:opacity-80 overflow-hidden select-none group ${
          isBeingResized 
            ? 'ring-2 ring-blue-500 shadow-lg z-30 bg-blue-200 border-blue-500' 
            : 'transition-all duration-100'
        }`}
        style={{
          backgroundColor: isBeingResized ? '#dbeafe' : (event.backgroundColor || '#3b82f6'),
          color: isBeingResized ? '#1e40af' : (event.textColor || '#ffffff'),
          borderLeft: `3px solid ${isBeingResized ? '#3b82f6' : (event.borderColor || event.backgroundColor || '#3b82f6')}`,
          left: `${left}%`,
          width: `${width}%`,
          top: topPosition,
          height: eventHeight,
          zIndex: isBeingResized ? 30 : 10,
          minHeight: totalRows > 1 ? '24px' : '32px',
          transform: isBeingResized ? 'scale(1.02)' : 'scale(1)',
          boxShadow: isBeingResized ? '0 4px 12px rgba(59, 130, 246, 0.4)' : 'none',
          opacity: isBeingResized ? 0.9 : 1,
          transition: isBeingResized ? 'none' : 'all 0.1s ease'
        }}
        draggable={!isBeingResized}
        onDragStart={(e) => !isBeingResized && handleEventDragStart(event, e)}
        onDragEnd={handleDragEnd}
        onClick={() => !isBeingResized && onEventClick(event)}
      >
        {/* Left resize handle */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize bg-white/20 hover:bg-white/40 transition-all ${
            isBeingResized ? 'opacity-100 bg-blue-400' : 'opacity-0 group-hover:opacity-100'
          }`}
          onMouseDown={(e) => handleResizeStart(event, 'left', e)}
          onClick={(e) => e.stopPropagation()}
        />
        
        {/* Right resize handle */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize bg-white/20 hover:bg-white/40 transition-all ${
            isBeingResized ? 'opacity-100 bg-blue-400' : 'opacity-0 group-hover:opacity-100'
          }`}
          onMouseDown={(e) => handleResizeStart(event, 'right', e)}
          onClick={(e) => e.stopPropagation()}
        />
        
        <div className="truncate text-[8px]">
          <span className="font-medium">{event.title}</span> 
          <span className="font-extralight">[ID {event.id}]</span>
        </div>
        <div className="text-[8px] opacity-90 mt-0.5">
          {format(parse(displayStartTime, 'HH:mm', new Date()), 'h:mm a').toLowerCase()}
          {displayEndTime && displayEndTime !== displayStartTime ? 
            ` - ${format(parse(displayEndTime, 'HH:mm', new Date()), 'h:mm a').toLowerCase()}` : 
            ''
          }
        </div>
        {event.extendedProps?.workorder && (
          <div className="text-[7px] opacity-80 truncate mt-0.5">
            WO: {event.extendedProps.workorder}
          </div>
        )}
      </div>
    );
  };

  const renderNowIndicator = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    
    // Check if current time is within displayed days
    const isCurrentDayVisible = displayDays.some(day => isSameDay(day, now));
    
    if (!isCurrentDayVisible) return null;

    // Calculate position based on view
    let position = 0;
    if (view === 'day') {
      // For day view: each hour slot
      position = (currentHour + currentMinutes / 60) / 24 * 100;
    } else {
      // For week/3day view: 4-hour intervals
      const slotDuration = 4; // hours per slot
      const totalSlots = timeSlots.length;
      const currentSlot = Math.floor(currentHour / slotDuration);
      const minutesIntoSlot = (currentHour % slotDuration) * 60 + currentMinutes;
      const slotPercentage = minutesIntoSlot / (slotDuration * 60);
      position = ((currentSlot + slotPercentage) / totalSlots) * 100;
    }

    // Find which day column the current day is in
    const currentDayIndex = displayDays.findIndex(day => isSameDay(day, now));
    if (currentDayIndex === -1) return null;

    const dayWidth = 100 / displayDays.length;
    const leftPosition = currentDayIndex * dayWidth;

    return (
      <div
        className="absolute z-30 pointer-events-none"
        style={{
          left: `${leftPosition}%`,
          width: `${dayWidth}%`,
          top: 0,
          height: '100%',
        }}
      >
        {/* Full vertical red line */}
        <div
          className="absolute bg-red-500"
          style={{
            top: 0,
            bottom: 0,
            left: '50%',
            width: '2px',
            transform: 'translateX(-50%)',
          }}
        />

        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            top: `${position}%`,
            left: '50%',
            width: '6px',
            height: '6px',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <div
          className="absolute text-[8px] text-red-500 font-medium whitespace-nowrap"
          style={{
            top: `${position}%`,
            left: 'calc(50% + 8px)',
            transform: 'translateY(-50%)',
          }}
        >
          {format(now, 'h:mm a')}
        </div>
      </div>
    );
  };

  const ROW_HEIGHT = 36; // Base row height

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-1.5 border-b bg-gray-50 relative h-8">
        <div className="w-20"></div>

        <div className="flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-1"
            onClick={() => navigateDate('prev')}
          >
            <ChevronLeft className="h-2.5 w-2.5" />
          </Button>

          <h2 className="text-[14px] font-medium">
            {getDateRangeTitle()}
          </h2>

          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-1"
            onClick={() => navigateDate('next')}
          >
            <ChevronRight className="h-2.5 w-2.5" />
          </Button>
        </div>

        <div className="flex items-center gap-0.5">
          {['day', '3days', 'week'].map((v) => (
            <Button
              key={v}
              variant={view === v ? 'default' : 'outline'}
              size="sm"
              className={`h-6 px-1.5 text-[9px] ${view === v ? 'bg-gray-800 text-white hover:bg-gray-700' : ''}`}
              onClick={() => setView(v as 'day' | '3days' | 'week')}
            >
              {v === '3days' ? '3 Days' : v.charAt(0).toUpperCase() + v.slice(1)}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="h-6 px-1.5 text-[9px] ml-1 hover:bg-gray-700 hover:text-white"
            onClick={onNewEvent}
          >
            <span className="text-[10px]">+</span>
            New Event
          </Button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="flex-1 overflow-auto">
        <div className="flex min-h-full bg-gray-50 timeline-container">
          {/* Resource Column */}
          <div className="w-32 border-r flex-shrink-0">
            <div className="h-8 bg-gray-100 flex items-center px-1.5" style={{ paddingTop: 32 }}>
              <Users className="h-4 w-4 text-gray-700" />
              <h2 className="text-sm font-medium text-gray-700 ml-1">Resources</h2>
              <Badge variant="secondary" className="text-[8px] px-0.5 py-0 h-2 ml-1">
                {resources.length}
              </Badge>
            </div>
            <div style={{ marginTop: 32 }}>
              {Object.entries(groupedResources).map(([groupName, groupResources]) => {
                const isCollapsed = collapsedGroups.has(groupName);
                
                return (
                  <div key={groupName}>
                    <Collapsible open={!isCollapsed} onOpenChange={() => toggleGroupCollapse(groupName)}>
                      <CollapsibleTrigger asChild>
                        <div 
                          className="px-1.5 py-0.5 bg-gray-200 border-b hover:bg-gray-300 cursor-pointer" 
                          style={{ height: `${ROW_HEIGHT}px` }}
                        >
                          <div className="flex items-center justify-between h-full">
                            <div className="flex items-center gap-0.5">
                              <span className="text-[11px] font-semibold text-gray-700">{groupName}</span>
                              <Badge variant="secondary" className="text-[8px] px-0.5 py-0 h-2">
                                {groupResources.length}
                              </Badge>
                            </div>
                            {isCollapsed ? (
                              <ChevronRightIcon className="h-3 w-3 text-gray-600" />
                            ) : (
                              <ChevronDown className="h-3 w-3 text-gray-600" />
                            )}
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {groupResources.map(resource => {
                          // Calculate dynamic height based on overlapping events
                          const maxOverlappingEvents = Math.max(...displayDays.map(day => {
                            const layout = getEventLayout(resource.id, day);
                            return layout.length > 0 ? layout[0].totalRows : 1;
                          }));
                          const dynamicHeight = Math.max(ROW_HEIGHT, ROW_HEIGHT * maxOverlappingEvents);
                          
                          return (
                            <div
                              key={resource.id}
                              className="px-1.5 py-0.5 text-xs border-b hover:bg-gray-100 cursor-pointer flex items-center"
                              style={{ height: `${dynamicHeight}px` }}
                            >
                              <div className="truncate text-[9px]">{resource.title}</div>
                            </div>
                          );
                        })}
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="flex-1 min-w-0">
            {/* Calendar Header */}
            <div className="h-8 border-b bg-white">
              <div className="flex">
                {displayDays.map((day, dayIndex) => (
                  <div key={day.toISOString()} className={`flex-1 min-w-16 ${dayIndex < displayDays.length - 1 ? 'border-r' : ''}`}>
                    <div className="p-0.5 text-center bg-gray-50 h-8 flex flex-col justify-center border-b">
                      <div className="text-[9px] font-medium">{format(day, 'EEE')} {format(day, 'M/d')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Slots Header */}
            <div className="h-8 border-b bg-gray-50">
              <div className="flex">
                {displayDays.map((day, dayIndex) => (
                  <div key={day.toISOString()} className={`flex-1 min-w-16 ${dayIndex < displayDays.length - 1 ? 'border-r' : ''}`}>
                    <div className="flex h-8">
                      {timeSlots.map((slot, slotIndex) => (
                        <div key={slot} className={`flex-1 flex items-center justify-center ${slotIndex < timeSlots.length - 1 ? 'border-r border-gray-200' : ''}`}>
                          <div className="text-[7px] text-gray-500">{slot}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events Grid */}
            <div className="relative">
              {Object.entries(groupedResources).map(([groupName, groupResources]) => {
                const isCollapsed = collapsedGroups.has(groupName);
                
                return (
                  <div key={groupName}>
                    <div className="border-b bg-gray-100" style={{ height: `${ROW_HEIGHT}px` }}>
                      <div className="flex">
                        {displayDays.map((day, dayIndex) => (
                          <div key={day.toISOString()} className={`flex-1 min-w-16 ${dayIndex < displayDays.length - 1 ? 'border-r' : ''}`}>
                            <div className="flex h-full">
                              {timeSlots.map((slot, slotIndex) => (
                                <div
                                  key={slot}
                                  className={`flex-1 ${slotIndex < timeSlots.length - 1 ? 'border-r border-gray-200' : ''} bg-gray-100`}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {!isCollapsed && groupResources.map(resource => {
                      // Calculate dynamic height based on overlapping events
                      const maxOverlappingEvents = Math.max(...displayDays.map(day => {
                        const layout = getEventLayout(resource.id, day);
                        return layout.length > 0 ? layout[0].totalRows : 1;
                      }));
                      const dynamicHeight = Math.max(ROW_HEIGHT, ROW_HEIGHT * maxOverlappingEvents);
                      
                      return (
                        <div key={resource.id} className="border-b" style={{ height: `${dynamicHeight}px` }}>
                          <div className="flex h-full">
                            {displayDays.map((day, dayIndex) => (
                              <div key={day.toISOString()} className={`flex-1 min-w-16 ${dayIndex < displayDays.length - 1 ? 'border-r' : ''} relative`}>
                                <div className="flex h-full">
                                  {timeSlots.map((slot, slotIndex) => {
                                    const cellId = getCellId(resource.id, day, slot);
                                    const isHighlighted = dragOverCell === cellId && draggedEvent;
                                    
                                    return (
                                      <div
                                        key={slot}
                                        className={`flex-1 ${slotIndex < timeSlots.length - 1 ? 'border-r border-gray-200' : ''} cursor-pointer relative transition-all duration-150 ${
                                          isHighlighted 
                                            ? 'bg-blue-100 border-4 border-blue-600 border-solid shadow-xl z-20 transform scale-[1.02]' 
                                            : 'hover:bg-blue-50'
                                        }`}
                                        style={{
                                          borderStyle: isHighlighted ? 'solid' : undefined,
                                          borderWidth: isHighlighted ? '4px' : undefined,
                                          borderColor: isHighlighted ? '#2563eb' : undefined,
                                          backgroundColor: isHighlighted ? '#dbeafe' : undefined,
                                          boxShadow: isHighlighted ? '0 10px 25px -5px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(37, 99, 235, 0.05)' : undefined
                                        }}
                                        onClick={() => handleCellClick(resource, day, slot)}
                                        onDrop={(e) => handleCellDrop(resource, day, slot, e)}
                                        onDragOver={handleDragOver}
                                        onDragEnter={(e) => handleCellDragEnter(resource, day, slot, e)}
                                        onDragLeave={(e) => handleCellDragLeave(resource, day, slot, e)}
                                      />
                                    );
                                  })}
                                </div>
                                {/* Render events with proper vertical positioning */}
                                {getEventLayout(resource.id, day).map(({ event, row, totalRows }) => 
                                  renderEvent(event, resource.id, row, totalRows)
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              
              {renderNowIndicator()}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog(prev => ({ ...prev, open }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmDialog.type === 'move' ? 'Confirm Event Move' : 'Confirm Event Resize'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.type === 'move' ? (
                <>
                  Are you sure you want to move "{confirmDialog.event?.title}" 
                  {confirmDialog.originalResourceTitle && confirmDialog.targetResourceTitle && 
                   confirmDialog.originalResourceTitle !== confirmDialog.targetResourceTitle && (
                    <> from <strong>{confirmDialog.originalResourceTitle}</strong> to <strong>{confirmDialog.targetResourceTitle}</strong></>
                  )} to {confirmDialog.newStart ? format(parseISO(confirmDialog.newStart), 'MMM d, yyyy h:mm a') : ''}
                  {confirmDialog.newEnd && confirmDialog.newEnd !== confirmDialog.newStart ? ` - ${format(parseISO(confirmDialog.newEnd), 'h:mm a')}` : ''}?
                </>
              ) : (
                <>
                  Are you sure you want to resize "{confirmDialog.event?.title}" to {confirmDialog.newStart ? format(parseISO(confirmDialog.newStart), 'MMM d, yyyy h:mm a') : ''}
                  {confirmDialog.newEnd && confirmDialog.newEnd !== confirmDialog.newStart ? ` - ${format(parseISO(confirmDialog.newEnd), 'h:mm a')}` : ''}?
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setConfirmDialog({ open: false, event: null, newStart: '', newEnd: '', newResourceId: '', type: 'move' });
              setDraggedEvent(null);
              setDragOverCell(null);
              setResizePreview(null);
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmEventUpdate}>
              Confirm {confirmDialog.type === 'move' ? 'Move' : 'Resize'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CustomCalendar;
