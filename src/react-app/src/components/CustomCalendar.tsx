import React, { useState, useMemo } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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

  const renderEvent = (event: CalendarEvent) => {
    const eventStart = parseISO(event.start);
    const eventEnd = parseISO(event.end);
    const startHour = eventStart.getHours();
    const startMinutes = eventStart.getMinutes();
    const endHour = eventEnd.getHours();
    const endMinutes = eventEnd.getMinutes();
    
    // Calculate position based on actual times within the time slots
    let left = 0;
    let width = 100;
    
    if (view === 'day') {
      // For day view: each slot is 1 hour
      const totalSlots = 24;
      const slotWidth = 100 / totalSlots;
      
      const startTime = startHour + startMinutes / 60;
      const endTime = endHour + endMinutes / 60;
      
      left = (startTime / 24) * 100;
      width = ((endTime - startTime) / 24) * 100;
    } else {
      // For week/3day view: 4-hour slots
      const timeSlotHours = [0, 4, 8, 12, 16, 20, 24]; // Include 24 for end boundary
      const totalSlots = timeSlotHours.length - 1; // 6 slots
      const slotWidth = 100 / totalSlots;
      
      // Calculate precise position within the day (0-24 hours)
      const startTime = startHour + startMinutes / 60;
      const endTime = endHour + endMinutes / 60;
      
      // Convert to percentage of the day
      left = (startTime / 24) * 100;
      width = ((endTime - startTime) / 24) * 100;
    }
    
    const startTime = format(eventStart, 'HH:mm');
    const endTime = format(eventEnd, 'HH:mm');
    
    return (
      <div
        key={event.id}
        className="absolute top-1 bottom-1 px-1 py-1 text-[9px] rounded cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
        style={{
          backgroundColor: event.backgroundColor || '#3b82f6',
          color: event.textColor || '#ffffff',
          borderLeft: `3px solid ${event.borderColor || event.backgroundColor || '#3b82f6'}`,
          left: `${left}%`,
          width: `${width}%`,
          zIndex: 10,
          minHeight: '32px'
        }}
        onClick={() => onEventClick(event)}
      >
        {/* <div className="flex justify-between items-start">
          <div className="text-[9px] font-medium">{event.title}</div>
          <div className="truncate text-[8px] font-extralight">[ID {event.id}]</div>
        </div> */}
        <div className="truncate text-[8px]"><span className="font-medium">{event.title}</span> <span className="font-extralight">[ID {event.id}]</span></div>
        <div className="text-[8px] opacity-90 mt-0.5">
          {format(parse(startTime, 'HH:mm', new Date()), 'h:mm a').toLowerCase()}{endTime && endTime !== startTime ? ` - ${format(parse(endTime, 'HH:mm', new Date()), 'h:mm a').toLowerCase()}` : ''}
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
          className="absolute bg-red-500"
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

  const ROW_HEIGHT = 36; // Increased from 28 to 36

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header - Reduced height */}
      <div className="flex items-center justify-between p-1.5 border-b bg-gray-50 relative h-8">
        {/* Left - empty spacer to help center */}
        <div className="w-20"></div>

        {/* Center - ChevronLeft, Title, ChevronRight */}
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

        {/* Right - View Buttons and New Event */}
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
        <div className="flex min-h-full bg-gray-50">
          {/* Resource Column - Reduced Width */}
          <div className="w-32 border-r flex-shrink-0">
            <div className="h-8 bg-gray-100 flex items-center px-1.5" style={{ paddingTop: 32 }}>
              <Users className="h-4 w-4 text-gray-700" />
              <h2 className="text-sm font-medium text-gray-700 ml-1">Resources</h2>
              <Badge variant="secondary" className="text-[8px] px-0.5 py-0 h-2 ml-1">
                {resources.length}
              </Badge>
            </div>
            {/* Resource List */}
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
                        {groupResources.map(resource => (
                          <div
                            key={resource.id}
                            className="px-1.5 py-0.5 text-xs border-b hover:bg-gray-100 cursor-pointer flex items-center"
                            style={{ height: `${ROW_HEIGHT}px` }}
                          >
                            <div className="truncate text-[9px]">{resource.title}</div>
                          </div>
                        ))}
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
                    {/* Group Header Row */}
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
                    
                    {/* Resource Rows - Only show if not collapsed */}
                    {!isCollapsed && groupResources.map(resource => (
                      <div key={resource.id} className="border-b" style={{ height: `${ROW_HEIGHT}px` }}>
                        <div className="flex h-full">
                          {displayDays.map((day, dayIndex) => (
                            <div key={day.toISOString()} className={`flex-1 min-w-16 ${dayIndex < displayDays.length - 1 ? 'border-r' : ''} relative`}>
                              <div className="flex h-full">
                                {timeSlots.map((slot, slotIndex) => (
                                  <div
                                    key={slot}
                                    className={`flex-1 ${slotIndex < timeSlots.length - 1 ? 'border-r border-gray-200' : ''} hover:bg-blue-50 cursor-pointer relative`}
                                    onClick={() => handleCellClick(resource, day, slot)}
                                  />
                                ))}
                              </div>
                              {/* Render events for this resource and date */}
                              {getEventsForResourceAndDate(resource.id, day).map(event => 
                                renderEvent(event)
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
              
              {/* Now Indicator */}
              {renderNowIndicator()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
