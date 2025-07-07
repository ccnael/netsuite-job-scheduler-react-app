
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TimeSheetTable } from './tables/TimeSheetTable';
import { type Event } from "@/api/event";

interface CompleteEventProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEvent: Event;
}

export const CompleteEvent: React.FC<CompleteEventProps> = ({ isOpen, onClose, selectedEvent }) => {
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('18:00');

  const handleStartTimeSelect = (time: string) => {
    setStartTime(time);
  };

  const handleEndTimeSelect = (time: string) => {
    setEndTime(time);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }} modal>
      <DialogContent className="max-w-[95vw] text-[12px] font-sans tracking-tight transition-all duration-300 max-h-[90vh] flex flex-col" style={{ padding: 16 }}>
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-[15px] tracking-tight font-semibold">Complete Event [ID {selectedEvent.id}]</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            <Accordion type="multiple" defaultValue={["primary-info", "timesheet"]} className="w-full border rounded-lg">
              <AccordionItem value="primary-info">
                <AccordionTrigger className="bg-[#dfe4eb] px-2 py-1 rounded-t-lg">
                  <span className="text-[#234678] font-semibold text-[14px] tracking-tight">Primary Information</span>
                </AccordionTrigger>
                <AccordionContent className="p-2 space-y-3">
                  <div className="p-4 border rounded bg-white space-y-2">
                    <dl className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-3">
                      <div>
                        <dt className="text-[13px] tracking-tight font-semibold">Event Title</dt>
                        <dd className="text-[13px] text-blue-600 underline">
                          <a href={selectedEvent.url} target="_blank" rel="noopener noreferrer">
                            {selectedEvent.title}
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[13px] tracking-tight font-semibold">Work Order</dt>
                        <dd className="text-[13px] text-blue-600 underline">
                          <a href={selectedEvent.woRef?.woUrl} target="_blank" rel="noopener noreferrer">
                            {selectedEvent.woRef?.title || "-"}
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[13px] tracking-tight font-semibold">Project</dt>
                        <dd className="text-[13px] text-blue-600 underline">
                          <a href={selectedEvent.woRef?.projectUrl} target="_blank" rel="noopener noreferrer">
                            {selectedEvent.woRef?.project?.text || "-"}
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[13px] tracking-tight font-semibold text-center">Status</dt>
                        <dd className="text-[13px] text-slate-900 text-center">{selectedEvent.status?.text || "-"}</dd>
                      </div>
                    </dl>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="multiple" defaultValue={["primary-info", "timesheet"]} className="w-full border rounded-lg">
              <AccordionItem value="timesheet">
                <AccordionTrigger className="bg-[#dfe4eb] px-2 py-1 rounded-t-lg">
                  <span className="text-[#234678] font-semibold text-[14px] tracking-tight">Time Sheets</span>
                </AccordionTrigger>
                <AccordionContent className="p-2">
                  <div className="max-h-[400px] overflow-y-auto">
                    <TimeSheetTable 
                      startTime={startTime}
                      endTime={endTime}
                      onStartTimeChange={handleStartTimeSelect}
                      onEndTimeChange={handleEndTimeSelect}
                      selectedEvent={selectedEvent}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>

        <DialogFooter className="mt-2 flex-shrink-0">
          <Button variant="outline" onClick={onClose} className="text-[12px] h-7 px-3 tracking-tight">Cancel</Button>
          <Button className="text-[12px] h-7 px-3 tracking-tight">Complete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
