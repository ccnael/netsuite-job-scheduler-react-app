
import React, { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { suiteletUrl } from '@/lib/constants';
import { fetchRoutingGroups, RoutingGroup } from "@/api/routingGroup";
import { toast } from 'sonner';
import { Loader } from "lucide-react";

interface CreateRoutingGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoutingGroupCreated: (groups: RoutingGroup[], newGroupName: string, newGroupId: string) => void;
  onLoadingChange?: (loading: boolean) => void;
}

export const CreateRoutingGroupModal: React.FC<CreateRoutingGroupModalProps> = ({
  open,
  onOpenChange,
  onRoutingGroupCreated,
  onLoadingChange
}) => {
  const [newGroupName, setNewGroupName] = useState('');
  const [creatingRoutingGroup, setCreatingRoutingGroup] = useState(false);

  const handleCreateRoutingGroup = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default AlertDialogAction behavior
    if (!newGroupName.trim()) return;

    setCreatingRoutingGroup(true);
    // Notify parent that loading has started
    // TBR
    if (onLoadingChange) {
      onLoadingChange(true);
    }

    try {
      const url = `${suiteletUrl}&mode=createRoutingGroup`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newGroupName.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create routing group: ${response.status}`);
      }

      const newGroup = await response.json();
      console.log('Created new routing group:', newGroup);

      // Reload routing groups
      const updatedGroups = await fetchRoutingGroups();
      
      // Notify parent component with the new group ID for auto-selection
      onRoutingGroupCreated(updatedGroups, newGroup.name, newGroup.id);

      toast.success(`Routing group "${newGroup.name}" created successfully`, {
        position: "top-right",
        className: "!bg-green-100 !text-green-800 !border !border-green-300",
      });
      
      // Close modal and reset form
      onOpenChange(false);
      setNewGroupName('');
    } catch (err) {
      console.error('Failed to create routing group:', err);
      // alert('Failed to create routing group. Please try again.');
      toast.error(`Failed to create routing group. ${err}`, {
        position: "top-right",
        className: "!bg-red-100 !text-red-800 !border !border-red-300",
      });
    } finally {
      setCreatingRoutingGroup(false);
      // Notify parent that loading has ended
      if (onLoadingChange) {
        onLoadingChange(false);
      }
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setNewGroupName('');
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[16px]">Create New Routing Group</AlertDialogTitle>
          {/* <AlertDialogDescription className="text-[14px]">
            Enter a name for the new routing group. This will be used to organize your events.
          </AlertDialogDescription> */}
        </AlertDialogHeader>
        <div className="py-4">
          <Label htmlFor="group-name" className="text-[12px] tracking-tight">
            Routing Group Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="group-name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Enter group name"
            className="mt-2 h-8 text-[12px]"
            // onKeyDown={(e) => {
            //   if (e.key === 'Enter' && newGroupName.trim()) {
            //     handleCreateRoutingGroup(e);
            //   }
            // }}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={handleClose}
            disabled={creatingRoutingGroup}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCreateRoutingGroup}
            disabled={!newGroupName.trim() || creatingRoutingGroup}
          >
            {creatingRoutingGroup ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
