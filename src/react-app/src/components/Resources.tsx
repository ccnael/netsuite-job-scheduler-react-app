import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Users, Search, X } from "lucide-react";
import { MultiSelect } from './MultiSelect';
import { type Employee } from '@/api/employee';
import { type Vendor } from '@/api/vendor';
import { type Asset } from '@/api/asset';
import { type Event } from '@/api/event';
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tooltip } from 'react-tooltip';



interface ResourcesProps {
  events: Event[];
  employees: Employee[];
  vendors: Vendor[];
  assets: Asset[];
  isLoading: boolean;
  selectedResources?: string[];
  onResourceDragStart?: (resourceId: string, resourceType: 'employee' | 'vendor' | 'asset') => void;
  onResourceDragEnd?: () => void;
  onResourceClick?: (resourceName: string) => void;
}

// Union type for all resources with proper type definitions
type ExtendedEmployee = Employee & { 
  resourceType: 'employee'; 
  resourceGroups?: { text: string; value: string }[]; 
  color?: string; 
  events?: string[] 
};

type ExtendedVendor = Vendor & { 
  resourceType: 'vendor'; 
  resourceGroups?: { text: string; value: string }[]; 
  color?: string; 
  events?: string[] 
};

type ExtendedAsset = Asset & { 
  resourceType: 'asset'; 
  resourceGroups?: { text: string; value: string }[]; 
  color?: string; 
  events?: string[] 
};

type Resource = ExtendedEmployee | ExtendedVendor | ExtendedAsset;

export const Resources: React.FC<ResourcesProps> = ({ 
  events, 
  employees, 
  vendors, 
  assets, 
  isLoading,
  selectedResources = [],
  onResourceDragStart,
  onResourceDragEnd,
  onResourceClick
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    // Populate events for employees, vendors, and assets when events change
    if (events.length > 0) {
      console.log('Resources: Processing events for resources');
    }
  }, [events]);

  // Combine employees, vendors, and assets into a unified resource list with proper null checks
  const allResources: Resource[] = [
    ...(employees || []).map((emp): ExtendedEmployee => {
      const matchingEvents = (events || []).filter(event => 
        (event.resources || []).some(resource => 
          resource.employee?.value === emp.employee?.value
        )
      );
      return { 
        ...emp, 
        resourceType: 'employee' as const,
        events: matchingEvents.map(event => event.id),
        resourceGroups: emp.resourceGroups || [],
        color: emp.color || '#007bff'
      };
    }),
    ...(vendors || []).map((vendor): ExtendedVendor => {
      const matchingEvents = (events || []).filter(event => 
        (event.vendors || []).some(eventVendor => 
          eventVendor.vendor?.value === vendor.vendor?.value
        )
      );
      return { 
        ...vendor, 
        resourceType: 'vendor' as const,
        events: matchingEvents.map(event => event.id),
        resourceGroups: vendor.resourceGroups || [],
        color: vendor.color || '#007bff'
      };
    }),
    ...(assets || []).map((asset): ExtendedAsset => {
      const matchingEvents = (events || []).filter(event => 
        (event.assets || []).some(eventAsset => 
          eventAsset.asset?.value === asset.asset?.value
        )
      );
      return { 
        ...asset, 
        resourceType: 'asset' as const,
        events: matchingEvents.map(event => event.id),
        resourceGroups: [],
        color: '#007bff'
      };
    })
  ];

  const filteredResources = allResources.filter(resource => {
    try {
      let name = '';
      if (resource.resourceType === 'employee') {
        name = resource.employee?.text || '';
      } else if (resource.resourceType === 'vendor') {
        name = resource.vendor?.text || '';
      } else if (resource.resourceType === 'asset') {
        name = resource.asset?.text || '';
      }
      
      const matchesFilter = name.toLowerCase().includes((filterText || '').toLowerCase());
      const resourceGroups = resource.resourceGroups || [];
      const matchesGroup = selectedGroups.length === 0 || resourceGroups.some(group => selectedGroups.includes(group?.text || ''));
      const matchesStatus = selectedStatuses.length === 0 || 
        (selectedStatuses.includes('active') && resource.active) || 
        (selectedStatuses.includes('inactive') && !resource.active);
      
      return matchesFilter && matchesGroup && matchesStatus;
    } catch (error) {
      console.error('Error filtering resource:', resource, error);
      return false;
    }
  });

  const groupedResources = filteredResources.reduce((acc, resource) => {
    try {
      const resourceGroups = resource.resourceGroups || [];
      if (resourceGroups.length === 0) {
        // Add resources without groups to appropriate default group
        let defaultGroup = 'Other';
        if (resource.resourceType === 'vendor') {
          defaultGroup = 'Vendors';
        } else if (resource.resourceType === 'asset') {
          defaultGroup = 'Assets';
        }
        
        if (!acc[defaultGroup]) {
          acc[defaultGroup] = [];
        }
        
        let resourceId = '';
        if (resource.resourceType === 'employee') {
          resourceId = resource.employee?.value || '';
        } else if (resource.resourceType === 'vendor') {
          resourceId = resource.vendor?.value || '';
        } else if (resource.resourceType === 'asset') {
          resourceId = resource.asset?.value || '';
        }
        
        if (resourceId && !acc[defaultGroup].find(res => {
          let existingId = '';
          if (res.resourceType === 'employee') {
            existingId = res.employee?.value || '';
          } else if (res.resourceType === 'vendor') {
            existingId = res.vendor?.value || '';
          } else if (res.resourceType === 'asset') {
            existingId = res.asset?.value || '';
          }
          return existingId === resourceId;
        })) {
          acc[defaultGroup].push(resource);
        }
      } else {
        resourceGroups.forEach(group => {
          const groupName = group?.text || 'Unknown';
          if (!acc[groupName]) {
            acc[groupName] = [];
          }
          
          let resourceId = '';
          if (resource.resourceType === 'employee') {
            resourceId = resource.employee?.value || '';
          } else if (resource.resourceType === 'vendor') {
            resourceId = resource.vendor?.value || '';
          } else if (resource.resourceType === 'asset') {
            resourceId = resource.asset?.value || '';
          }
          
          if (resourceId && !acc[groupName].find(res => {
            let existingId = '';
            if (res.resourceType === 'employee') {
              existingId = res.employee?.value || '';
            } else if (res.resourceType === 'vendor') {
              existingId = res.vendor?.value || '';
            } else if (res.resourceType === 'asset') {
              existingId = res.asset?.value || '';
            }
            return existingId === resourceId;
          })) {
            acc[groupName].push(resource);
          }
        });
      }
    } catch (error) {
      console.error('Error grouping resource:', resource, error);
    }
    return acc;
  }, {} as Record<string, Resource[]>);

  const uniqueGroups = Array.from(new Set([
    ...(employees || []).flatMap(emp => (emp.resourceGroups || []).map(group => group?.text || '')),
    ...(vendors || []).flatMap(vendor => (vendor.resourceGroups || []).map(group => group?.text || '')),
    'Vendors', // Always include Vendors group
    'Assets' // Always include Assets group
  ])).filter(group => group !== '');

  const uniqueStatuses = ['active', 'inactive'];

  // Get all group values for the defaultValue
  const defaultExpandedGroups = Object.keys(groupedResources);

  const handleDragStart = (resource: Resource) => {
    let resourceId = '';
    if (resource.resourceType === 'employee') {
      resourceId = resource.employee?.value || '';
    } else if (resource.resourceType === 'vendor') {
      resourceId = resource.vendor?.value || '';
    } else if (resource.resourceType === 'asset') {
      resourceId = resource.asset?.value || '';
    }
    
    if (resourceId && onResourceDragStart) {
      onResourceDragStart(resourceId, resource.resourceType);
    }
  };

  const handleDragEnd = () => {
    if (onResourceDragEnd) {
      onResourceDragEnd();
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-2 h-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-900" strokeWidth={2.5} />
            <h2 className="text-lg font-medium text-gray-700">Resources</h2>
          </div>
          <Button variant="outline" size="sm" disabled>
            <Filter className="h-3 w-3" />
          </Button>
        </div>
        {/* <Search className="h-4 w-4 text-gray-400 mb-3" /> */}
        <div className="space-y-1 flex-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded p-2">
              <Skeleton className="h-4 w-24 mb-1" />
              <div className="space-y-1">
                {[1, 2].map((j) => (
                  <div key={j} className="flex items-center space-x-1">
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }


  // Helper function to format tooltip content as HTML string
  const formatTooltipContent = (resource: Resource) => {
    let name = 'Unknown';
    let id = '';
    let groups = '';
    let skills = '';
    let email = '';
    let phone = '';
    let location = '';
    let events = '';
    
    if (resource.resourceType === 'employee') {
      name = resource.employee?.text || 'Unknown';
      id = resource.employee?.value || '';
      groups = resource.resourceGroups?.map(group => group.text).join(', ') || 'None';
      skills = resource.resourceSkills?.map(skill => skill.text).join(', ') || 'None';
      email = resource.email || 'N/A';
      phone = resource.phone || 'N/A';
      location = resource.location?.text || 'N/A';
      events = resource.events?.length ? resource.events.length.toString() : '0';
    } else if (resource.resourceType === 'vendor') {
      name = resource.vendor?.text || 'Unknown';
      id = resource.vendor?.value || '';
      groups = resource.resourceGroups?.map(group => group.text).join(', ') || 'None';
      skills = 'N/A';
      email = resource.email || 'N/A';
      phone = 'N/A';
      location = resource.location?.text || 'N/A';
      events = resource.events?.length ? resource.events.length.toString() : '0';
    } else if (resource.resourceType === 'asset') {
      name = resource.asset?.text || 'Unknown';
      id = resource.asset?.value || '';
      groups = resource.resourceGroups?.map(group => group.text).join(', ') || 'None';
      skills = 'N/A';
      email = 'N/A';
      phone = 'N/A';
      location = 'N/A';
      events = resource.events?.length ? resource.events.length.toString() : '0';
    }
    
    return `<div style="font-size: 12px; line-height: 1.4;">
      <div style="font-weight: bold; margin-bottom: 4px;">${name}</div>
      <div>ID: ${id}</div>
      <div>Groups: ${groups}</div>
      <div>Skills: ${skills}</div>
      <div>Email: ${email}</div>
      <div>Phone: ${phone}</div>
      <div>Location: ${location}</div>
      <div>Events: ${events}</div>
    </div>`;
  };

  return (
    <div className="space-y-2 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-900" strokeWidth={2.5} />
          <h2 className="text-lg font-medium text-gray-700">Resources</h2>
          <Badge variant="secondary" className="text-[10px] px-0.5 py-0.5">
            {filteredResources.length}
          </Badge>
        </div>
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-3 w-3" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Resources (IN PROGRESS)</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Filter by Group</label>
                <MultiSelect
                  options={uniqueGroups}
                  selected={selectedGroups}
                  onChange={setSelectedGroups}
                  placeholder="Select groups"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Filter by Status</label>
                <MultiSelect
                  options={uniqueStatuses}
                  selected={selectedStatuses}
                  onChange={setSelectedStatuses}
                  placeholder="Select status"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="relative mb-3">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        <Input
          placeholder="Search by name..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="h-8 text-sm !text-[12px] placeholder:text-[12px] pl-7 pr-8 outline-none focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:ring-transparent focus:shadow-none"
        />
        {filterText && (
          <button
            onClick={() => setFilterText('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 flex items-center justify-center"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      <ScrollArea className="flex-1 h-full">
        <Accordion 
          type="multiple" 
          className="w-full space-y-1"
          defaultValue={defaultExpandedGroups}
        >
          {Object.entries(groupedResources).map(([group, resources]) => (
            <AccordionItem key={group} value={group} className="border rounded">
              <AccordionTrigger className="px-2 py-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{group}</span>
                  <Badge variant="secondary" className="text-[9px] px-1 py-0 h-3 min-w-[12px]">
                    {resources.length}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-0.5 px-1">
                {(resources || []).map(resource => {
                  try {
                    let name = 'Unknown';
                    let id = '';
                    
                    if (resource.resourceType === 'employee') {
                      name = resource.employee?.text || 'Unknown';
                      id = resource.employee?.value || '';
                    } else if (resource.resourceType === 'vendor') {
                      name = resource.vendor?.text || 'Unknown';
                      id = resource.vendor?.value || '';
                    } else if (resource.resourceType === 'asset') {
                      name = resource.asset?.text || 'Unknown';
                      id = resource.asset?.value || '';
                    }
                    
                    if (!id) return null;
                    
                    const isSelected = selectedResources.includes(name);
                    
                    return (
                      <div 
                        key={`${resource.resourceType}-${id}`}
                        className={`flex items-center justify-between p-1 rounded text-xs cursor-pointer transition-colors ${
                          isSelected 
                            ? 'bg-green-100 hover:bg-green-200' 
                            : 'hover:bg-gray-50'
                        }`}
                        data-tooltip-id="resource-tooltip"
                        data-tooltip-html={formatTooltipContent(resource)}
                        onClick={() => onResourceClick && onResourceClick(name)}
                      >
                        <div className="flex items-center space-x-1">
                          <div className="relative">
                            <div 
                              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0 cursor-grab active:cursor-grabbing transition-transform hover:scale-105"
                              style={{ backgroundColor: resource.color || '#007bff' }}
                              draggable
                              onDragStart={() => handleDragStart(resource)}
                              onDragEnd={handleDragEnd}
                            >
                              {resource.initials || '??'}
                            </div>
                            {/* Status indicator circle */}
                            <div 
                              className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white ${
                                resource.active ? 'bg-green-500' : 'bg-red-500'
                              }`}
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-medium">{name}</span>
                          </div>
                        </div>
                      </div>
                    );
                  } catch (error) {
                    console.error('Error rendering resource:', resource, error);
                    return null;
                  }
                })}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
      <Tooltip 
        id="resource-tooltip"
        style={{ 
          backgroundColor: '#1f2937',
          color: 'white',
          fontSize: '12px',
          padding: '8px 12px',
          borderRadius: '6px',
          maxWidth: '300px',
          zIndex: 9999,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      />
    </div>
  );
};
