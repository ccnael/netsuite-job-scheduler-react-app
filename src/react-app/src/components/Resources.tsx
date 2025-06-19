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
import { Filter, Users } from "lucide-react";
import { MultiSelect } from './MultiSelect';
import { fetchEmployees, type Employee } from '@/api/employee';
import { fetchVendors, type Vendor } from '@/api/vendor';
import { fetchAssets, type Asset } from '@/api/asset';
import { type Event } from '@/api/event';
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface ResourcesProps {
  filterText: string;
  events: Event[];
}

// Union type for all resources
type Resource = (Employee & { type: 'employee' }) | (Vendor & { type: 'vendor' }) | (Asset & { type: 'asset' });

export const Resources: React.FC<ResourcesProps> = ({ filterText, events }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        setIsLoading(true);
        const [employeeData, vendorData, assetData] = await Promise.all([
          fetchEmployees(),
          fetchVendors(),
          fetchAssets()
        ]);

        // Populate events for employees
        const employeesWithEvents = (employeeData || []).map(employee => {
          const matchingEvents = (events || []).filter(event => 
            (event.resources || []).some(resource => 
              resource.employee?.value === employee.employee?.value
            )
          );
          return {
            ...employee,
            events: matchingEvents.map(event => event.id)
          };
        });

        // Populate events for vendors
        const vendorsWithEvents = (vendorData || []).map(vendor => {
          const matchingEvents = (events || []).filter(event => 
            (event.vendors || []).some(eventVendor => 
              eventVendor.vendor?.value === vendor.vendor?.value
            )
          );
          return {
            ...vendor,
            events: matchingEvents.map(event => event.id)
          };
        });

        // Populate events for assets
        const assetsWithEvents = (assetData || []).map(asset => {
          const matchingEvents = (events || []).filter(event => 
            (event.assets || []).some(eventAsset => 
              eventAsset.asset?.value === eventAsset.asset?.value
            )
          );
          return {
            ...asset,
            events: matchingEvents.map(event => event.id)
          };
        });

        setEmployees(employeesWithEvents || []);
        setVendors(vendorsWithEvents || []);
        setAssets(assetsWithEvents || []);
        console.log('Resources: Loaded employees with events:', employeesWithEvents);
        console.log('Resources: Loaded vendors with events:', vendorsWithEvents);
        console.log('Resources: Loaded assets:', assetsWithEvents);
      } catch (error) {
        console.error('Resources: Failed to load resources:', error);
        toast.error('Failed to load resource data');
        setEmployees([]);
        setVendors([]);
        setAssets([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadResources();
  }, []);

  // Combine employees, vendors, and assets into a unified resource list with proper null checks
  const allResources: Resource[] = [
    ...(employees || []).map(emp => ({ ...emp, type: 'employee' as const })),
    ...(vendors || []).map(vendor => ({ ...vendor, type: 'vendor' as const })),
    ...(assets || []).map(asset => ({ ...asset, type: 'asset' as const }))
  ];

  const filteredResources = allResources.filter(resource => {
    try {
      let name = '';
      if (resource.type === 'employee') {
        name = resource.employee?.text || '';
      } else if (resource.type === 'vendor') {
        name = resource.vendor?.text || '';
      } else if (resource.type === 'asset') {
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
        if (resource.type === 'vendor') {
          defaultGroup = 'Vendors';
        } else if (resource.type === 'asset') {
          defaultGroup = 'Assets';
        }
        
        if (!acc[defaultGroup]) {
          acc[defaultGroup] = [];
        }
        
        let resourceId = '';
        if (resource.type === 'employee') {
          resourceId = resource.employee?.value || '';
        } else if (resource.type === 'vendor') {
          resourceId = resource.vendor?.value || '';
        } else if (resource.type === 'asset') {
          resourceId = resource.asset?.value || '';
        }
        
        if (resourceId && !acc[defaultGroup].find(res => {
          let existingId = '';
          if (res.type === 'employee') {
            existingId = res.employee?.value || '';
          } else if (res.type === 'vendor') {
            existingId = res.vendor?.value || '';
          } else if (res.type === 'asset') {
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
          if (resource.type === 'employee') {
            resourceId = resource.employee?.value || '';
          } else if (resource.type === 'vendor') {
            resourceId = resource.vendor?.value || '';
          } else if (resource.type === 'asset') {
            resourceId = resource.asset?.value || '';
          }
          
          if (resourceId && !acc[groupName].find(res => {
            let existingId = '';
            if (res.type === 'employee') {
              existingId = res.employee?.value || '';
            } else if (res.type === 'vendor') {
              existingId = res.vendor?.value || '';
            } else if (res.type === 'asset') {
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
    ...(assets || []).flatMap(asset => (asset.resourceGroups || []).map(group => group?.text || '')),
    'Vendors', // Always include Vendors group
    'Assets' // Always include Assets group
  ])).filter(group => group !== '');

  const uniqueStatuses = ['active', 'inactive'];

  // Get all group values for the defaultValue
  const defaultExpandedGroups = Object.keys(groupedResources);

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
              <DialogTitle>Filter Resources</DialogTitle>
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
                    
                    if (resource.type === 'employee') {
                      name = resource.employee?.text || 'Unknown';
                      id = resource.employee?.value || '';
                    } else if (resource.type === 'vendor') {
                      name = resource.vendor?.text || 'Unknown';
                      id = resource.vendor?.value || '';
                    } else if (resource.type === 'asset') {
                      name = resource.asset?.text || 'Unknown';
                      id = resource.asset?.value || '';
                    }
                    
                    if (!id) return null;
                    
                    return (
                      <div 
                        key={`${resource.type}-${id}`}
                        className="flex items-center justify-between p-1 hover:bg-gray-50 rounded text-xs"
                      >
                        <div className="flex items-center space-x-1">
                          <div className="relative">
                            <div 
                              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0"
                              style={{ backgroundColor: resource.color || '#007bff' }}
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
    </div>
  );
};
