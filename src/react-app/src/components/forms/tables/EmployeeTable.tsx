import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel, getSortedRowModel, SortingState, useReactTable,
} from "@tanstack/react-table";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp, ChevronDown, ChevronsUpDown, Filter, Info } from "lucide-react";
import { Employee } from "@/api/employee";
import TimeRangeFilter from '../fields/TimeRangeFilter';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MultiSelectFilter from '../fields/MultiSelectFilter';
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate, formatTime } from "@/lib/helpers";
import { toast } from "sonner";

interface SelectedResource {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
}

interface EmployeeTableProps { 
  data?: Employee[]; 
  onSelectionChange?: (selectedResources: SelectedResource[]) => void;
  primaryStartTime?: string;
  primaryEndTime?: string;
  currentStartTime?: string;
  currentEndTime?: string;
  woResources?: any[];
  onUpdate?: boolean;
  preselectedResourceIds?: string[];
  conflictedResourceIds?: string[];
  conflictEvents?: Map<string, any[]>;
  clearSelections?: boolean;
  onClearComplete?: () => void;
}

interface TableEmployee {
  id: string;
  name: string;
  group: string;
  skill: string;
  email: string;
  phone: string;
  affiliationType: string;
  startTime: string;
  endTime: string;
  woResourceId: string;
  active?: boolean;
  // employeeProps?: any;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ 
  data = [], 
  woResources = [],
  onSelectionChange,
  primaryStartTime = '08:00',
  primaryEndTime = '18:00',
  currentStartTime,
  currentEndTime,
  onUpdate,
  preselectedResourceIds = [],
  conflictedResourceIds = [],
  conflictEvents = new Map(),
  clearSelections = false,
  onClearComplete
}) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [timeOverrides, setTimeOverrides] = useState<Record<string, { startTime?: string; endTime?: string }>>({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [isInitialized, setIsInitialized] = useState(false);
  
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedAffiliationTypes, setSelectedAffiliationTypes] = useState<string[]>([]);
  
  // Use ref to track the last selection to prevent unnecessary calls
  const lastSelectionRef = useRef<string>('');

  // console.log('EmployeeTable render - woResources:', woResources);
  // console.log('EmployeeTable render - data:', data);
  // console.log('EmployeeTable render - conflictedResourceIds:', conflictedResourceIds);
  // console.log('EmployeeTable render - conflictEvents:', conflictEvents);

  // Calculate unique values for filters
  const uniqueNames = useMemo(() => {
    return Array.from(new Set(
      data.map(emp => emp.name).filter(name => name !== '')
    ));
  }, [data]);

  const uniqueGroups = useMemo(() => {
    return Array.from(new Set(
      data.flatMap(emp => (emp.resourceGroups || []).map(group => group?.text || '')).filter(group => group !== '')
    ));
  }, [data]);

  const uniqueSkills = useMemo(() => {
    return Array.from(new Set(
      data.flatMap(emp => (emp.resourceSkills || []).map(skill => skill?.text || '')).filter(skill => skill !== '')
    ));
  }, [data]);

  const uniqueStatuses = ['Active', 'Inactive'];

  const uniqueAffiliationTypes = useMemo(() => {
    return Array.from(new Set(
      data.map(emp => emp.affiliationType?.text || '').filter(type => type !== '')
    ));
  }, [data]);

  const selectedFilterCount = selectedNames.length + selectedGroups.length + selectedSkills.length + selectedStatuses.length + selectedAffiliationTypes.length;

  // Memoize the table data to prevent infinite loops
  const tableData = useMemo(() => {
    console.log('[EmployeeTable] Building table data', { dataLen: data.length, woResourcesLen: woResources.length });

    if (!data.length) return [];

    let processedData: TableEmployee[] = data.map(emp => {
      const woResource = woResources.find(wr => wr.employee?.value === emp.id);
      const timeOverride = timeOverrides[emp.id];

      return {
        id: emp.id,
        name: emp.name,
        group: emp.resourceGroups?.map(x => x.text).join(', ') || '-',
        skill: emp.resourceSkills?.map(x => x.text).join(', ') || '-',
        email: emp.email,
        phone: emp.phone || '-',
        affiliationType: emp.affiliationType?.text || '-',
        startTime: timeOverride?.startTime || woResource?.time?.start || '',
        endTime: timeOverride?.endTime || woResource?.time?.end || '',
        woResourceId: woResource?.id || '',
        active: emp.active,
        // employeeProps: emp
      };
    });

    // console.log('selectedAffiliationTypes', selectedAffiliationTypes);
    // console.log('processedData', processedData);

    // Apply filters
    if (selectedNames.length > 0 || selectedGroups.length > 0 || selectedSkills.length > 0 || selectedStatuses.length > 0 || selectedAffiliationTypes.length > 0) {
      processedData = processedData.filter(emp => {
        const matchesName = selectedNames.length === 0 || selectedNames.includes(emp.name);
        const empGroups = emp.group.split(',').map(g => g.trim()).filter(g => g !== '-');
        const matchesGroup = selectedGroups.length === 0 || empGroups.some(group => selectedGroups.includes(group));
        const empSkills = emp.skill.split(',').map(s => s.trim()).filter(s => s !== '-');
        const matchesSkill = selectedSkills.length === 0 || empSkills.some(skill => selectedSkills.includes(skill));
        const matchesStatus = selectedStatuses.length === 0 || 
          (selectedStatuses.includes('Active') && emp.active) || 
          (selectedStatuses.includes('Inactive') && !emp.active);
        const matchesAffiliationType = selectedAffiliationTypes.length === 0 || 
          selectedAffiliationTypes.includes(emp.affiliationType);
        
        return matchesName && matchesGroup && matchesSkill && matchesStatus && matchesAffiliationType;
      });
    }

    return processedData;
  }, [data, woResources, timeOverrides, selectedNames, selectedGroups, selectedSkills, selectedStatuses, selectedAffiliationTypes]);

  useEffect(() => {
    // Handle preselected resources (for drag and drop functionality)
    if (preselectedResourceIds.length > 0 && tableData.length > 0 && !isInitialized) {
      const initialSelection: Record<string, boolean> = {};
      const initialOverrides: Record<string, { startTime?: string; endTime?: string }> = {};

      tableData.forEach(emp => {
        if (preselectedResourceIds.includes(emp.id)) {
          initialSelection[emp.id] = true;
          initialOverrides[emp.id] = {
            startTime: emp.startTime || primaryStartTime,
            endTime: emp.endTime || primaryEndTime,
          };
        }
      });

      setRowSelection(initialSelection);
      setTimeOverrides(initialOverrides);
      setIsInitialized(true);
    }
    // Only initialize selection and time override when onUpdate is true and not already initialized
    else if (onUpdate && !isInitialized && tableData.length > 0) {
      const initialSelection: Record<string, boolean> = {};
      const initialOverrides: Record<string, { startTime?: string; endTime?: string }> = {};

      tableData.forEach(emp => {
        if (emp.woResourceId) {
          initialSelection[emp.id] = true;

          initialOverrides[emp.id] = {
            startTime: emp.startTime,
            endTime: emp.endTime,
          };
        }
      });

      setRowSelection(initialSelection);
      setTimeOverrides(initialOverrides);
      setIsInitialized(true);
    }
  }, [tableData, onUpdate, isInitialized, preselectedResourceIds, primaryStartTime, primaryEndTime]);

  // Handle external clear selections request
  useEffect(() => {
    if (clearSelections) {
      setRowSelection({});
      setTimeOverrides({});
      onClearComplete?.();
    }
  }, [clearSelections, onClearComplete]);

  // Reset initialization when onUpdate, data, or preselectedResourceIds changes
  useEffect(() => {
    setIsInitialized(false);
  }, [onUpdate, data.length, preselectedResourceIds.length]);

  const updateTime = useCallback((rowId: string, key: 'startTime' | 'endTime', value: string) => {
    // console.log('Time update requested:', { rowId, key, value });
    
    if (key === 'startTime') {
      setTimeOverrides(prev => {
        const newData = { 
          ...prev,
          [rowId]: {
            ...prev[rowId],
            [key]: value
          }
        };
        
        // Only validate if value is not empty (allow clearing with X button)
        if (value && currentStartTime && currentEndTime && (value < currentStartTime || value > currentEndTime)) {
          toast.error(`Start time must be between ${formatTime(currentStartTime)} and ${formatTime(currentEndTime)}`, {
            position: "top-right",
            className: "!bg-red-100 !text-red-800 !border !border-red-300",
          });
          return prev; // Don't update if invalid
        }
        
        // Validate time range if both times are set
        const endTime = newData[rowId]?.endTime;
        if (value && endTime && value > endTime) {
          toast.error("Start time must be earlier than or equal to end time", {
            position: "top-right",
            className: "!bg-red-100 !text-red-800 !border !border-red-300",
          });
          return prev; // Don't update if invalid
        }
        
        return newData;
      });
    } else {
      setTimeOverrides(prev => {
        const newData = { 
          ...prev,
          [rowId]: {
            ...prev[rowId],
            [key]: value
          }
        };
        
        // Only validate if value is not empty (allow clearing with X button)
        if (value && currentStartTime && currentEndTime && (value < currentStartTime || value > currentEndTime)) {
          toast.error(`End time must be between ${formatTime(currentStartTime)} and ${formatTime(currentEndTime)}`, {
            position: "top-right",
            className: "!bg-red-100 !text-red-800 !border !border-red-300",
          });
          return prev; // Don't update if invalid
        }
        
        // Validate time range if both times are set
        const startTime = newData[rowId]?.startTime;
        if (value && startTime && startTime > value) {
          toast.error("End time must be later than or equal to start time", {
            position: "top-right",
            className: "!bg-red-100 !text-red-800 !border !border-red-300",
          });
          return prev; // Don't update if invalid
        }
        
        return newData;
      });
    }
  }, [currentStartTime, currentEndTime]);

  // Fixed checkbox handlers that don't reset pagination
  const handleRowToggle = useCallback((rowId: string, checked: boolean) => {
    setRowSelection(prev => ({ 
      ...prev, 
      [rowId]: checked 
    }));
    
    // Auto-populate start and end time when selecting a resource
    if (checked) {
      setTimeOverrides(prev => ({
        ...prev,
        [rowId]: {
          startTime: prev[rowId]?.startTime || currentStartTime || primaryStartTime,
          endTime: prev[rowId]?.endTime || currentEndTime || primaryEndTime,
        }
      }));
    }
  }, [primaryStartTime, primaryEndTime, currentStartTime, currentEndTime]);

  const handleSelectAll = useCallback((checked: boolean, table: any) => {
    if (checked) {
      const newSelection: Record<string, boolean> = {};
      const newTimeOverrides: Record<string, { startTime?: string; endTime?: string }> = {};
      
      // Only select rows on the current page using their IDs
      table.getRowModel().rows.forEach((row: any) => {
        newSelection[row.original.id] = true;
        
        // Auto-populate start and end time when selecting resources
        newTimeOverrides[row.original.id] = {
          startTime: timeOverrides[row.original.id]?.startTime || currentStartTime || primaryStartTime,
          endTime: timeOverrides[row.original.id]?.endTime || currentEndTime || primaryEndTime,
        };
      });
      
      setRowSelection(prev => ({ ...prev, ...newSelection }));
      setTimeOverrides(prev => ({ ...prev, ...newTimeOverrides }));
    } else {
      // Deselect only the rows on the current page using their IDs
      const currentPageRowIds = table.getRowModel().rows.map((row: any) => row.original.id);
      setRowSelection(prev => {
        const newSelection = { ...prev };
        currentPageRowIds.forEach(id => {
          delete newSelection[id];
        });
        return newSelection;
      });
    }
  }, [primaryStartTime, primaryEndTime, currentStartTime, currentEndTime, timeOverrides]);

  // Memoize selected resources to prevent infinite loops
  const selectedResources = useMemo(() => {
    const selectedIds = Object.keys(rowSelection).filter(key => rowSelection[key]);
    return selectedIds.map(id => {
      const employee = tableData.find(emp => emp.id === id);
      return employee ? {
        id: employee.id,
        name: employee.name,
        startTime: employee.startTime,
        endTime: employee.endTime,
        woResourceId: employee?.woResourceId || '',
        // employeeProps: employee?.employeeProps
      } : null;
    }).filter(Boolean);
  }, [rowSelection, tableData]);

  // Only call onSelectionChange when selection actually changes
  useEffect(() => {
    const currentSelection = JSON.stringify(selectedResources);
    if (currentSelection !== lastSelectionRef.current) {
      lastSelectionRef.current = currentSelection;
      if (onSelectionChange) {
        // console.log('EmployeeTable - Selected resources:', selectedResources);
        onSelectionChange(selectedResources);
      }
    }
  }, [selectedResources, onSelectionChange]);

  const renderSortIcon = useCallback((column: any) => {
    const isSorted = column.getIsSorted();
    if (isSorted === 'asc') return <ChevronUp className="ml-1 h-3 w-3" />;
    if (isSorted === 'desc') return <ChevronDown className="ml-1 h-3 w-3" />;
    return <ChevronsUpDown className="ml-1 h-3 w-3 text-muted-foreground" />;
  }, []);

  // Memoize columns to prevent recreation on every render
  const columns: ColumnDef<TableEmployee>[] = useMemo(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox 
          checked={table.getIsAllPageRowsSelected()} 
          onCheckedChange={(value) => handleSelectAll(!!value, table)}
          className="translate-y-[2px]" 
        />
      ),
      cell: ({ row }) => (
        <Checkbox 
          checked={!!rowSelection[row.original.id]} 
          onCheckedChange={(value) => handleRowToggle(row.original.id, !!value)}
          className="translate-y-[2px]" 
        />
      ),
      enableSorting: false, 
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-6 px-1 text-[12px] font-sans tracking-tight font-semibold hover:bg-muted/60">
          Name {renderSortIcon(column)}
        </Button>
      ),
      cell: ({ row }) => {
        const isConflicted = conflictedResourceIds.includes(row.original.id);
        const conflicts = conflictEvents.get(row.original.id) || [];
        
        // console.log(`[EmployeeTable] Row ${row.original.name} (${row.original.id}):`, {
        //   isConflicted,
        //   conflictsCount: conflicts.length,
        //   conflictedResourceIds: conflictedResourceIds
        // });
        
        return (
          <div className="flex items-center gap-1 justify-center">
            <div className={cn("font-sans tracking-tight text-[12px] text-muted-foreground", isConflicted && conflicts.length > 0 ? "text-muted-foreground" : "text-foreground")}>{row.getValue("name")}</div>
            {isConflicted && conflicts.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <div 
                    className="h-6 w-6 p-0 flex items-center justify-center cursor-pointer group"
                    onMouseEnter={(e) => {
                      e.currentTarget.click();
                    }}
                  >
                    <Info className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-140 bg-background border border-border shadow-lg z-50" align="start" side="bottom">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">
                      Scheduling Conflicts ({conflicts.length})
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Resource has conflicting events
                    </p>
                    <ScrollArea 
                      className="h-48 overflow-y-auto overscroll-contain"
                      onWheel={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div className="space-y-2">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b">
                              <th className="text-center py-1 px-2">Event ID</th>
                              <th className="text-center py-1 px-2">Event Title</th>
                              <th className="text-center py-1 px-2">Date</th>
                              <th className="text-center py-1 px-2">Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {conflicts.map((conflict, index) => (
                              <tr key={index} className="border-b hover:bg-muted/30">
                                <td className="text-center py-1 px-2">{conflict.id}</td>
                                <td className="text-center py-1 px-2">{conflict.title}</td>
                                <td className="text-center py-1 px-2">{`${formatDate(conflict.date.start)} - ${formatDate(conflict.date.end)}`}</td>
                                <td className="text-center py-1 px-2">{`${formatTime(conflict.time.start)} - ${formatTime(conflict.time.end)}`}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </ScrollArea>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "group",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-6 px-1 text-[12px] font-sans tracking-tight font-semibold hover:bg-muted/60">
          Group {renderSortIcon(column)}
        </Button>
      ),
      cell: ({ row }) => {
        const groups = (row.getValue("group") as string).split(',').map(g => g.trim());
        return (
          <div className="flex flex-wrap gap-1 justify-center">
            {groups.map((group, idx) => (
              <span key={idx} className="inline-block rounded bg-primary text-primary-foreground px-1 text-[10px] font-medium">{group}</span>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "skill",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-6 px-1 text-[12px] font-sans tracking-tight font-semibold hover:bg-muted/60">
          Skill {renderSortIcon(column)}
        </Button>
      ),
      cell: ({ row }) => {
        const skills = (row.getValue("skill") as string).split(',').map(g => g.trim());
        return (
          <div className="flex flex-wrap gap-1 justify-center">
            {skills.map((skill, idx) => (
              <span key={idx} className="inline-block rounded bg-primary text-primary-foreground px-1 text-[10px] font-medium">{skill}</span>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="text-muted-foreground font-sans tracking-tight text-[12px]">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <div className="text-muted-foreground font-sans tracking-tight text-[12px]">{row.getValue("phone")}</div>
      ),
    },
    {
      accessorKey: "affiliationType",
      header: "Affiliation Type",
      cell: ({ row }) => (
        <div className="text-muted-foreground font-sans tracking-tight text-[12px]">{row.getValue("affiliationType")}</div>
      ),
    },
    {
      accessorKey: "startTime",
      header: () => <span>Start <span className="text-red-500">*</span></span>,
      cell: ({ row }) => (
        <div className="min-w-[130px]">
          <TimeRangeFilter
            id={`start-time-${row.original.id}`}
            label=""
            value={row.original.startTime}
            onChange={(time) => updateTime(row.original.id, 'startTime', time)}
          />
        </div>
      )
    },
    {
      accessorKey: "endTime",
      header: () => <span>End <span className="text-red-500">*</span></span>,
      cell: ({ row }) => (
        <div className="min-w-[130px]">
          <TimeRangeFilter
            id={`end-time-${row.original.id}`}
            label=""
            value={row.original.endTime}
            onChange={(time) => updateTime(row.original.id, 'endTime', time)}
          />
        </div>
      )
    },
  ], [updateTime, handleSelectAll, handleRowToggle, renderSortIcon, rowSelection, conflictEvents, conflictedResourceIds]);

  const table = useReactTable({
    data: tableData, 
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { 
      globalFilter, 
      sorting,
      rowSelection,
      pagination
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    enableRowSelection: true,
    manualPagination: false,
    getRowId: (row) => row.id,
    // This is the key fix - prevent pagination reset on selection changes
    autoResetPageIndex: false,
  });

  return (
    <div className="w-full space-y-2">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between">
        {/* Left - Rows and Filter */}
        <div className="flex items-center space-x-1">
          <span className="text-[12px] font-sans text-foreground">Rows:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="h-6 w-[50px] rounded border border-border bg-background px-1 text-[12px] font-sans"
          >
            {[5, 10, 20, 30].map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
          <Popover>
              <div className="relative">
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Filter className="h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                {selectedFilterCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute top-0 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[9px] min-w-[16px]"
                  >
                    {selectedFilterCount}
                  </Badge>
                )}
              </div>
              <PopoverContent className="w-[500px] p-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-md font-medium">Filter Resources</h3>
                      <p className="tracking-tight text-[12px] text-muted-foreground">Select your filter criteria below</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="text-[12px] h-8 px-3 tracking-tight"
                      onClick={() => {
                        setSelectedNames([]);
                        setSelectedGroups([]);
                        setSelectedSkills([]);
                        setSelectedStatuses([]);
                        setSelectedAffiliationTypes([]);
                      }}
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="-mt-[5px]">
                        <MultiSelectFilter
                          id="employee-name-filter"
                          label=""
                          options={uniqueNames.map(name => ({ label: name, value: name }))}
                          selected={selectedNames}
                          onChange={setSelectedNames}
                          placeholder="Filter by Name"
                          maxDisplay={2}
                        />
                      </div>
                      <div className="-mt-[5px]">
                        <MultiSelectFilter
                          id="employee-group-filter"
                          label=""
                          options={uniqueGroups.map(group => ({ label: group, value: group }))}
                          selected={selectedGroups}
                          onChange={setSelectedGroups}
                          placeholder="Filter by Group"
                          maxDisplay={2}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="-mt-[5px]">
                        <MultiSelectFilter
                          id="employee-skill-filter"
                          label=""
                          options={uniqueSkills.map(skill => ({ label: skill, value: skill }))}
                          selected={selectedSkills}
                          onChange={setSelectedSkills}
                          placeholder="Filter by Skill"
                          maxDisplay={2}
                        />
                      </div>
                      <div className="-mt-[5px]">
                        <MultiSelectFilter
                          id="status-filter"
                          label=""
                          options={uniqueStatuses.map(status => ({ label: status, value: status }))}
                          selected={selectedStatuses}
                          onChange={setSelectedStatuses}
                          placeholder="Filter by Status"
                          maxDisplay={2}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="-mt-[5px]">
                        <MultiSelectFilter
                          id="affiliation-type-filter"
                          label=""
                          options={uniqueAffiliationTypes.map(type => ({ label: type, value: type }))}
                          selected={selectedAffiliationTypes}
                          onChange={setSelectedAffiliationTypes}
                          placeholder="Filter by Affiliation Type"
                          maxDisplay={2}
                        />
                      </div>
                      <div className="-mt-[5px]">
                        {/* Empty column for layout */}
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
          </Popover>
        </div>

        {/* Right - Search */}
        <div className="flex items-center space-x-2">
          <div className="relative w-[200px]">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-3 w-3" />
            <Input
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8 h-6 border-border !text-[12px] font-sans placeholder:text-[12px]"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded border border-border bg-card shadow-sm overflow-x-auto">
        <Table className="min-w-[700px] md:min-w-[800px] lg:min-w-[1200px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={`h-8 px-2 text-center font-sans text-[12px] font-semibold text-foreground border-b border-border 
                    ${['startTime', 'endTime'].includes(header.column.id) ? 'min-w-[130px]' : ''}`}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                const isConflicted = conflictedResourceIds.includes(row.original.id);
                return (
                  <TableRow 
                    key={row.id} 
                    className={`border-b border-border hover:bg-muted/50 ${
                      isConflicted ? 'bg-yellow-100 hover:bg-yellow-200' : ''
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-2 py-1 text-center text-[12px] font-sans">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow><TableCell colSpan={columns.length} className="h-16 text-center text-muted-foreground text-[12px]">No employees found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Bottom Pagination */}
      <div className="flex items-center justify-between mt-2">
        {/* Bottom Left: Showing X to Y of Z entries */}
        <div className="text-[12px] font-sans text-foreground">
          {(() => {
            const pageIndex = table.getState().pagination.pageIndex;
            const pageSize = table.getState().pagination.pageSize;
            const total = table.getFilteredRowModel().rows.length;
            const from = total === 0 ? 0 : pageIndex * pageSize + 1;
            const to = Math.min(total, (pageIndex + 1) * pageSize);
            return `Showing ${from} to ${to} of ${total} entries`;
          })()}
        </div>

        {/* Bottom Right: Pagination Buttons */}
        <div className="flex items-center justify-end space-x-1">
          <Button variant="outline" className="h-6 w-6 p-0" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
            <ChevronsLeft className="h-3 w-3" />
          </Button>
          <Button variant="outline" className="h-6 w-6 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <span className="text-[12px] font-sans">{table.getState().pagination.pageIndex + 1} / {table.getPageCount()}</span>
          <Button variant="outline" className="h-6 w-6 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ChevronRight className="h-3 w-3" />
          </Button>
          <Button variant="outline" className="h-6 w-6 p-0" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
            <ChevronsRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
