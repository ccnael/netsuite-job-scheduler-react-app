
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Event {
  id: string;
  title?: string;
  note?: string;
  status?: {
    text: string;
    value: string;
    code: string;
  };
}

interface UpdateEventProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEvent: Event | null;
  setSelectedEvent: (event: Event) => void;
  onUpdate: () => void;
}

export const UpdateEvent: React.FC<UpdateEventProps> = ({
  isOpen,
  onClose,
  selectedEvent,
  setSelectedEvent,
  onUpdate
}) => {
  if (!selectedEvent) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
          <DialogDescription>
            Make changes to the event details below.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="update-title">Title</Label>
            <Input
              id="update-title"
              value={selectedEvent.title || ''}
              onChange={(e) => setSelectedEvent({
                ...selectedEvent,
                title: e.target.value
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="update-description">Description</Label>
            <Textarea
              id="update-description"
              value={selectedEvent.note || ''}
              onChange={(e) => setSelectedEvent({
                ...selectedEvent,
                note: e.target.value
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="update-status">Status</Label>
            <Select
              value={selectedEvent.status?.text || 'Pending'}
              onValueChange={(value) => setSelectedEvent({
                ...selectedEvent,
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

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onUpdate}>Update Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
