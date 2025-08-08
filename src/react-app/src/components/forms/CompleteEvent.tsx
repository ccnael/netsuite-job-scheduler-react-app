
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TimeSheetTable } from './tables/TimeSheetTable';
import { WOItemTable } from './tables/WOItemTableCompletion';
import { PunchItemTable } from './tables/PunchItemTable';
import { type Event } from "@/api/event";
import { completeEvent } from "@/api/completeEvent";
import { Loader, CheckCircle, X } from "lucide-react";
import { isLocalDevelopment } from "@/lib/helpers";
import { toast } from "sonner";

interface CompleteEventProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEvent: Event;
  onEventCompleted?: () => void;
}

interface SelectedWOItem {
  id: string;
  name: string;
  quantity: number;
}

export const CompleteEvent: React.FC<CompleteEventProps> = ({ 
  isOpen, 
  onClose, 
  selectedEvent, 
  onEventCompleted
}) => {
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('18:00');
  const [bubbleEffect, setBubbleEffect] = useState(false);
  const [selectedWOItems, setSelectedWOItems] = useState<SelectedWOItem[]>([]);
  const [timesheetData, setTimesheetData] = useState<any[]>([]);
  const [punchItemsData, setPunchItemsData] = useState<any[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleStartTimeSelect = (time: string) => {
    setStartTime(time);
  };

  const handleEndTimeSelect = (time: string) => {
    setEndTime(time);
  };

  const handleWOItemSelectionChange = (selectedItems: SelectedWOItem[]) => {
    console.log('CompleteEvent - WO Items selected:', selectedItems);
    setSelectedWOItems(selectedItems);
  };

  const handleTimesheetDataChange = (data: any[]) => {
    console.log('CompleteEvent - Timesheet data:', data);
    setTimesheetData(data);
  };

  const handlePunchItemsDataChange = (data: any[]) => {
    console.log('CompleteEvent - Punch items data:', data);
    setPunchItemsData(data);
  };

  const handleOutsideClick = () => { 
    setBubbleEffect(true); 
    setTimeout(() => setBubbleEffect(false), 300); 
  };

  const handleSubmit = () => {
    const unresolvedPunchItems = punchItemsData.filter(x => x.status.value != 6); // 6 - Not resolved
    if (unresolvedPunchItems.length) {
      toast.error("Unable to proceed. There are still unresolved punch items.", {
        position: "top-right",
        className: "!bg-red-100 !text-red-800 !border !border-red-300",
      });
      return;
    }
    setShowConfirmDialog(true);
  };

  const handleConfirmComplete = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      setIsCompleting(true);
      // if (isLocalDevelopment()) {
      //   console.log('COMPLETING EVENT!!!', { selectedEvent, timesheetData, selectedWOItems });
      //   return;
      // }

      await completeEvent(selectedEvent, timesheetData, selectedWOItems);

      // Show success toast
      toast.custom((id: string) => (
        <div
          data-sonner-rounded-toast
          className="flex items-start gap-3 w-full max-w-xl bg-green-100 text-green-800 border border-green-300 px-4 py-3 rounded-md"
        >
          <CheckCircle className="h-5 w-5 mt-0.5 text-green-700 shrink-0" />
          <div className="flex-1 text-sm font-medium">
            Event "{selectedEvent.title}" successfully completed!
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

      setShowConfirmDialog(false);
      onClose();
      onEventCompleted?.();
    } catch (error) {
      console.error('Error completing event:', error);
      toast.error("Failed to complete event. Please try again.", {
        position: "top-right",
        className: "!bg-red-100 !text-red-800 !border !border-red-300",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }} modal>
      <DialogContent className={`max-w-screen-xl text-[12px] font-sans tracking-tight transition-all duration-300 max-h-[90vh] flex flex-col ${bubbleEffect ? 'scale-95' : ''}`} onPointerDownOutside={(e) => { e.preventDefault(); handleOutsideClick(); }} style={{ padding: 16 }}>
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-[15px] tracking-tight font-semibold">Complete Event [ID {selectedEvent.id}]</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            <Accordion type="multiple" defaultValue={["primary-info", "timesheet", "woitems", "punchitems"]} className="w-full border rounded-lg">
              <AccordionItem value="primary-info">
                <AccordionTrigger className="bg-muted px-2 py-1 rounded-t-lg">
                  <span className="text-foreground font-semibold text-[14px] tracking-tight">Primary Information</span>
                </AccordionTrigger>
                <AccordionContent className="p-2 space-y-3">
                  <div className="p-4 border rounded bg-background space-y-2">
                    <dl className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-3">
                      <div>
                        <dt className="text-[13px] tracking-tight font-semibold">Event Title</dt>
                        <dd className="text-[13px] text-blue-600">
                          <a href={selectedEvent.url} target="_blank" rel="noopener noreferrer">
                            {selectedEvent.title}
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[13px] tracking-tight font-semibold">Work Order</dt>
                        <dd className="text-[13px] text-blue-600">
                          <a href={selectedEvent.woRef?.woUrl} target="_blank" rel="noopener noreferrer">
                            {selectedEvent.woRef?.title || "-"}
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[13px] tracking-tight font-semibold">Project</dt>
                        <dd className="text-[13px] text-blue-600">
                          <a href={selectedEvent.woRef?.projectUrl} target="_blank" rel="noopener noreferrer">
                            {selectedEvent.woRef?.project?.text || "-"}
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[13px] tracking-tight font-semibold text-center">Status</dt>
                        <dd className="text-[13px] text-foreground text-center">{selectedEvent.status?.text || "-"}</dd>
                      </div>
                    </dl>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="multiple" defaultValue={["primary-info", "timesheet", "woitems", "punchitems"]} className="w-full border rounded-lg">
              <AccordionItem value="timesheet">
                <AccordionTrigger className="bg-muted px-2 py-1 rounded-t-lg">
                  <span className="text-foreground font-semibold text-[14px] tracking-tight">Time Sheets</span>
                </AccordionTrigger>
                <AccordionContent className="p-2">
                  <div className="max-h-[400px] overflow-y-auto">
                    <TimeSheetTable 
                      startTime={startTime}
                      endTime={endTime}
                      onStartTimeChange={handleStartTimeSelect}
                      onEndTimeChange={handleEndTimeSelect}
                      selectedEvent={selectedEvent}
                      onDataChange={handleTimesheetDataChange}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="multiple" defaultValue={["primary-info", "timesheet", "woitems", "punchitems"]} className="w-full border rounded-lg">
              <AccordionItem value="woitems">
                <AccordionTrigger className="bg-muted px-2 py-1 rounded-t-lg">
                  <span className="text-foreground font-semibold text-[14px] tracking-tight">Work Order Items</span>
                </AccordionTrigger>
                <AccordionContent className="p-2">
                  <div className="max-h-[400px] overflow-y-auto">
                    <WOItemTable 
                      woId={selectedEvent.woRef?.id || ''}
                      selectedEvent={selectedEvent}
                      onUpdate={false}
                      onSelectionChange={handleWOItemSelectionChange}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="multiple" defaultValue={["primary-info", "timesheet", "woitems", "punchitems"]} className="w-full border rounded-lg">
              <AccordionItem value="punchitems">
                <AccordionTrigger className="bg-muted px-2 py-1 rounded-t-lg">
                  <span className="text-foreground font-semibold text-[14px] tracking-tight">Punch Items</span>
                </AccordionTrigger>
                <AccordionContent className="p-2">
                  <div className="max-h-[400px] overflow-y-auto">
                    <PunchItemTable 
                      soId={selectedEvent?.salesorder?.value || ''}
                      onDataChange={handlePunchItemsDataChange}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>

        <DialogFooter className="mt-2 flex-shrink-0">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Complete</Button>
        </DialogFooter>
      </DialogContent>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Completion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to complete the event "{selectedEvent.title}"? This action will finalize the event details.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isCompleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmComplete} 
              disabled={isCompleting}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isCompleting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Completing Event...
                </>
              ) : (
                "Complete Event"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
};
