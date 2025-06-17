
import React from 'react';
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export interface Status {
  text:  string;
  value: string;
  code:  string;
}

interface CardProps {
  id: number;
  title: string;
  description: string;
  group?: string;
  draggable?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
  isEvent?: boolean;
  onAction?: (action: string) => void;
  compact?: boolean;
  // New props for job details
  customer?: string;
  date?: string;
  salesOrder?: string;
  project?: string;
  estHours?: number;
  // URL props for links
  woUrl?: string;
  soUrl?: string;
  projectUrl?: string;
  // Status prop for indicator
  status?: Status;
  // Event-specific props
  eventData?: {
    workorder?: {
      text: string;
      value: string;
    };
    url: string;
    date?: {
      start: string;
      end: string;
    };
    time?: {
      start: string;
      end: string;
    };
    organizer?: {
      text: string;
      value: string;
    };
    priority?: {
      text: string;
      value: string;
      code?: string;
    };
    receiptStatus?: {
      text: string;
      value: string;
      code?: string;
      display: string;
    };
    woUrl?: string;
  };
  // New prop to hide certain fields for calendar context
  hideCalendarFields?: boolean;
}

export const Card = ({
  id,
  title,
  description,
  group,
  draggable,
  onDragStart,
  onDragEnd,
  isDragging,
  isEvent,
  onAction,
  compact = false,
  customer,
  date,
  salesOrder,
  project,
  estHours,
  woUrl,
  soUrl,
  projectUrl,
  status,
  eventData,
  hideCalendarFields = false,
}: CardProps) => {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`
        bg-white rounded border border-gray-200 p-1.5 ${isEvent ? 'cursor-default' : 'cursor-grab'}
        transition-all duration-200 w-full relative max-w-[180px]
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        hover:shadow-md hover:border-blue-200
      `}
    >
      <div className="flex justify-between items-start mb-1">
        {isEvent ? (
          eventData?.url ? (
            <a 
              href={eventData.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`font-bold text-blue-600 hover:text-blue-800 underline truncate flex-1 text-[11px]`}
              onClick={(e) => e.stopPropagation()}
              title={title}
            >
              {title}
            </a>
          ) : (
            <h3 className={`font-bold text-gray-800 truncate flex-1 text-[11px]`} title={title}>
              {title}
            </h3>
          )
        ) : woUrl ? (
          <a 
            href={woUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`font-bold text-blue-600 hover:text-blue-800 underline truncate flex-1 text-[11px]`}
            onClick={(e) => e.stopPropagation()}
            title={title}
          >
            {title}
          </a>
        ) : (
          <h3 className={`font-bold text-gray-800 truncate flex-1 text-[11px]`} title={title}>
            {title}
          </h3>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger className="h-3.5 w-3.5 inline-flex items-center justify-center rounded hover:bg-slate-100">
            <MoreHorizontal className="h-2.5 w-2.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="py-1 px-1.5 min-w-[120px]">
            {!isEvent ? (
              <>
                <DropdownMenuItem className="px-2 py-1 text-[11px]" onClick={() => onAction?.('print')}>
                  Print
                </DropdownMenuItem>
                <DropdownMenuItem className="px-2 py-1 text-[11px]" onClick={() => onAction?.('hold')}>
                  Hold
                </DropdownMenuItem>
                <DropdownMenuItem className="px-2 py-1 text-[11px]" onClick={() => onAction?.('close')}>
                  Close
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem className="px-2 py-1 text-[11px]" onClick={() => onAction?.('update')}>
                  Update Event
                </DropdownMenuItem>
                <DropdownMenuItem className="px-2 py-1 text-[11px]" onClick={() => onAction?.('complete')}>
                  Complete Event
                </DropdownMenuItem>
                <DropdownMenuItem className="px-2 py-1 text-[11px]" onClick={() => onAction?.('remove')}>
                  Remove
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isEvent && eventData ? (
        <div className="space-y-0.5">
          <p className={`text-gray-600 font-medium truncate text-[11px]`} title={`ID ${id}`}>
            ID {id}
          </p>
          
          {/* Work Order - show as link if not empty, otherwise show General badge */}
          {eventData.workorder?.text && eventData.workorder.text.trim() ? (
            <div className="truncate" style={{ marginTop: -5 }}>
              {eventData.woUrl ? (
                <a 
                  href={eventData.woUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline text-[11px] font-medium"
                  onClick={(e) => e.stopPropagation()}
                  title={eventData.workorder.text}
                >
                  {eventData.workorder.text}
                </a>
              ) : (
                <p className="text-gray-600 text-[11px] font-medium" title={eventData.workorder.text}>
                  {eventData.workorder.text}
                </p>
              )}
            </div>
          ) : (
            <div className="mb-1" style={{ marginTop: -5 }}>
              <Badge 
                className="text-[8px] px-1 py-0 h-3 text-white"
                style={{ backgroundColor: '#9d1bb3' }}
              >
                General
              </Badge>
            </div>
          )}

          {/* Event Date */}
          {eventData.date && (
            <p className={`text-gray-600 truncate text-[11px]`}>
              {eventData.date.start == eventData.date.end ? eventData.date.start : `${eventData.date.start} - ${eventData.date.end}`}
            </p>
          )}

          {/* Event Time */}
          {eventData.time && (
            <p className={`text-gray-600 truncate text-[11px]`}>
              {eventData.time.start} - {eventData.time.end}
            </p>
          )}

          {/* Organizer - only show if not hiding calendar fields */}
          {!hideCalendarFields && eventData.organizer && (
            <p className={`text-gray-600 truncate text-[11px]`}>
              Organizer: {eventData.organizer.text}
            </p>
          )}

          {/* Status Badges Row */}
          <div className="flex flex-wrap gap-1 mt-2">
            {status && status.text && (
              <Badge 
                style={{ backgroundColor: status.code, color: 'white' }}
                className="text-[8px] px-1 py-0 h-3 {status.code}"
              >
                {status.text}
              </Badge>
            )}
            {eventData.priority && eventData.priority.text && (
              <Badge 
                style={{ backgroundColor: eventData.priority.code, color: 'white' }}
                className="text-[8px] px-1 py-0 h-3"
              >
                {eventData.priority.text}
              </Badge>
            )}
             {(eventData.receiptStatus && eventData.receiptStatus.text) && (
              <Badge 
                style={{ backgroundColor: eventData.receiptStatus.code, color: 'white' }}
                className="text-[8px] px-1 py-0 h-3"
              >
                {eventData.receiptStatus.text}
              </Badge>
            )}
          </div>
        </div>
      ) : !isEvent && (customer || date || salesOrder || project || estHours) ? (
        <div className="space-y-0.5">
           <p className={`text-gray-600 truncate text-[11px]`} title={`ID ${id}`}>
            ID {id}
          </p>
          {customer && (
             <p className={`text-gray-600 font-bold truncate text-[11px]`} title={customer}>
              {customer}
            </p>
          )}
          {date && (
             <p className={`text-gray-600 truncate text-[11px]`} title={date}>
              {date}
            </p>
          )}
          {/* Sales Order - only show if not hiding calendar fields */}
          {!hideCalendarFields && salesOrder && (
             <p className={`text-gray-600 truncate text-[11px]`}>
              {soUrl ? (
                <a 
                  href={soUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline truncate block"
                  onClick={(e) => e.stopPropagation()}
                  title={salesOrder}
                >
                  {salesOrder}
                </a>
              ) : (
                <span title={salesOrder}>{salesOrder}</span>
              )}
            </p>
          )}
          {/* Project - only show if not hiding calendar fields */}
          {!hideCalendarFields && project && (
             <p className={`text-gray-600 truncate text-[11px]`}>
              {projectUrl ? (
                <a 
                  href={projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline truncate block"
                  onClick={(e) => e.stopPropagation()}
                  title={project}
                >
                  {project}
                </a>
              ) : (
                <span title={project}>{project}</span>
              )}
            </p>
          )}
          <p className={`text-gray-600 truncate text-[11px]`} title={`Est Hours: ${estHours}`}>
            Est Hours: {estHours || 0}
          </p>
        </div>
      ) : (
        <p className={`text-gray-600 line-clamp-2 mb-1 text-[11px]`} title={description}>{description}</p>
      )}
      
      {group && (
        <span className={`inline-block px-1 py-0.5 font-medium bg-gray-100 text-gray-600 rounded truncate ${compact ? 'text-[8px]' : 'text-xs'}`} title={group}>
          {group}
        </span>
      )}

      {/* Status badge for jobs - positioned at bottom right */}
      {!isEvent && status && (
        <div className="absolute bottom-1 right-1">
          <Badge 
            style={{ backgroundColor: status.code, color: 'white' }}
            className="text-[8px] px-1 py-0 h-3 min-w-[20px] text-center"
          >
            {status.text}
          </Badge>
        </div>
      )}
    </div>
  );
};
