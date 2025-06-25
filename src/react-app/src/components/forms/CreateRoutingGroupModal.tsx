
import React, { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { suiteletUrl } from '@/lib/constants';
import { fetchRoutingGroups, RoutingGroup } from "@/api/routingGroup";

interface CreateRoutingGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoutingGroupCreated: (groups: RoutingGroup[], newGroupId: string) => void;
}

export const CreateRoutingGroupModal: React.FC<CreateRoutingGroupModalProps> = ({
  open,
  onOpenChange,
  onRoutingGroupCreated
}) => {
  const [newGroupName, setNewGroupName] = useState('');
  const [creatingRoutingGroup, setCreatingRoutingGroup] = useState(false);

  const handleCreateRoutingGroup = async () => {
    if (!newGroupName.trim()) return;

    setCreatingRoutingGroup(true);
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
      onRoutingGroupCreated(updatedGroups, newGroup.id);
      
      // Close modal and reset form
      onOpenChange(false);
      setNewGroupName('');
    } catch (err) {
      console.error('Failed to create routing group:', err);
      alert('Failed to create routing group. Please try again.');
    } finally {
      setCreatingRoutingGroup(false);
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
          <AlertDialogDescription className="text-[14px]">
            Enter a name for the new routing group. This will be used to organize your events.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4">
          <Label htmlFor="group-name" className="text-[12px] tracking-tight">
            Group Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="group-name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Enter group name"
            className="mt-2 h-8 text-[12px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newGroupName.trim()) {
                handleCreateRoutingGroup();
              }
            }}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel 
            className="text-[12px] h-7 px-3"
            onClick={handleClose}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-[12px] h-7 px-3"
            onClick={handleCreateRoutingGroup}
            disabled={!newGroupName.trim() || creatingRoutingGroup}
          >
            {creatingRoutingGroup ? 'Creating...' : 'Create'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
