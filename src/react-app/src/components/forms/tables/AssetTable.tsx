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
import { Asset } from "@/api/asset";
import * as helper from "@/lib/helpers";
import TimeRangeFilter from '../fields/TimeRangeFilter';
import MultiSelectFilter from '../fields/MultiSelectFilter';
import { Option } from "@/components/ui/MultiSelect";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDate, formatTime } from "@/lib/helpers";
import { toast } from "sonner";

interface SelectedAsset {
  id: string;
  name: string;
  quantity: number;
  startTime: string;
  endTime: string;
}

interface AssetTableProps { 
  data?: Asset[]; 
  onSelectionChange?: (selectedAssets: SelectedAsset[]) => void;
  woAssets?: any[];
  onUpdate?: boolean;
  preselectedAssetIds?: string[];
  prefilledStartTime?: string;
  prefilledEndTime?: string;
  currentStartTime?: string;
  currentEndTime?: string;
  conflictedAssetIds?: string[];
  conflictEvents?: Map<string, any[]>;
  clearSelections?: boolean;
  onClearComplete?: () => void;
}

interface TableAsset {
  id: string;
  name: string;
  description: string;
  type: string;
  quantity: number;
  quantityRemaining: number;
  startTime: string;
  endTime: string;
  woAssetId: string;
}

export const AssetTable: React.FC<AssetTableProps> = ({ 
  data = [], 
  onSelectionChange,
  woAssets = [],
  onUpdate,
  preselectedAssetIds = [],
  prefilledStartTime = '',
  prefilledEndTime = '',
  currentStartTime,
  currentEndTime,
  conflictedAssetIds = [],
  conflictEvents = new Map(),
  clearSelections = false,
  onClearComplete
}) => {
  // console.log('[AssetTable] Received conflicted asset IDs:', conflictedAssetIds);
  // console.log('[AssetTable] Received conflict events:', conflictEvents);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [dataOverrides, setDataOverrides] = useState<Record<string, { startTime?: string; endTime?: string; quantity?: number; }>>({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Filter states
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Use ref to track the last selection to prevent unnecessary calls
  const lastSelectionRef = useRef<string>('');

  // Generate filter options from the data
  const nameOptions = useMemo<Option[]>(() => {
    const uniqueNames = [...new Set(data.map(asset => asset.name))].filter(Boolean);
    return uniqueNames.map(name => ({ label: name, value: name }));
  }, [data]);

  const typeOptions = useMemo<Option[]>(() => {
    const uniqueTypes = [...new Set(data.map(asset => asset.type?.text).filter(Boolean))];
    return uniqueTypes.map(type => ({ label: type, value: type }));
  }, [data]);

  // Memoize the table data to prevent infinite loops
  const tableData = useMemo(() => {
    // console.log('[AssetTable] Building table data', { dataLen: data.length, woResourcesLen: woAssets.length });

    if (!data.length) return [];

    return data.map(asset => {
      const woAsset = woAssets.find(wa => wa.asset?.value === asset.id);
      const dataOverride = dataOverrides[asset.id];

      /* console.log(`Asset ${asset.name} (ID: ${asset.id}):`, {
        woAsset: woAsset,
        woAssetId: woAsset?.id,
        hasWoAsset: !!woAsset,
        woAssetAssetValue: woAsset?.asset?.value
      }); */

      return {
        id: asset.id,
        name: asset.name,
        description: asset.description || '-',
        type: asset.type?.text ?? '-',
        quantity: dataOverride?.quantity || woAsset?.quantity || 0,
        quantityRemaining: asset.quantityRemaining ?? 0,
        startTime: dataOverride?.startTime || woAsset?.time?.start || '',
        endTime: dataOverride?.endTime || woAsset?.time?.end || '',
        woAssetId: woAsset?.id || ''
      }
    });
  }, [data, woAssets, dataOverrides]);

  useEffect(() => {
    // Handle preselected assets (for drag and drop functionality)
    if (preselectedAssetIds.length > 0 && tableData.length > 0 && !isInitialized) {
      const initialSelection: Record<string, boolean> = {};
      const initialOverrides: Record<string, { startTime?: string; endTime?: string; quantity?: number; }> = {};

      tableData.forEach(asset => {
        if (preselectedAssetIds.includes(asset.id)) {
          initialSelection[asset.id] = true;
          initialOverrides[asset.id] = {
            startTime: prefilledStartTime,
            endTime: prefilledEndTime,
            quantity: 1,
          };
        }
      });

      setRowSelection(initialSelection);
      setDataOverrides(initialOverrides);
      setIsInitialized(true);
    }
    // Only initialize selection and time override when onUpdate is true and not already initialized
    else if (onUpdate && !isInitialized && tableData.length > 0) {
      const initialSelection: Record<string, boolean> = {};
      const initialOverrides: Record<string, { startTime?: string; endTime?: string; quantity?: number; }> = {};

      tableData.forEach(asset => {
        if (asset.woAssetId) {
          initialSelection[asset.id] = true;

          initialOverrides[asset.id] = {
            startTime: asset.startTime,
            endTime: asset.endTime,
            quantity: asset.quantity,
          };
        }
      });

      setRowSelection(initialSelection);
      setDataOverrides(initialOverrides);
      setIsInitialized(true);
    }
  }, [tableData, onUpdate, isInitialized, preselectedAssetIds, prefilledStartTime, prefilledEndTime]);

  // Handle external clear selections request
  useEffect(() => {
    if (clearSelections) {
      setRowSelection({});
      setDataOverrides({});
      onClearComplete?.();
    }
  }, [clearSelections, onClearComplete]);

  // Reset initialization when onUpdate, data, or preselectedAssetIds changes
  useEffect(() => {
    setIsInitialized(false);
  }, [onUpdate, data.length, preselectedAssetIds.length]);

  const updateField = useCallback((rowId: string, key: 'startTime' | 'endTime' | 'quantity', value: string | number) => {
    // console.log('Field update requested:', { rowId, key, value });
    
    if (key === 'startTime') {
      const timeValue = value as string;
      setDataOverrides(prev => {
        const newData = { 
          ...prev,
          [rowId]: {
            ...prev[rowId],
            startTime: timeValue
          }
        };
        
        if (timeValue && currentStartTime && currentEndTime && (timeValue < currentStartTime || timeValue > currentEndTime)) {
          toast.error(`Start time must be between ${formatTime(currentStartTime)} and ${formatTime(currentEndTime)}`, {
            position: "top-right",
            className: "!bg-red-100 !text-red-800 !border !border-red-300",
          });
          return prev; // Don't update if invalid
        }
        
        // Validate time range if both times are set
        const endTime = newData[rowId]?.endTime;
        if (timeValue && endTime && timeValue > endTime) {
          toast.error("Start time must be earlier than or equal to end time", {
            position: "top-right",
            className: "!bg-red-100 !text-red-800 !border !border-red-300",
          });
          return prev; // Don't update if invalid
        }
        
        return newData;
      });
    } else if (key === 'endTime') {
      const timeValue = value as string;
      setDataOverrides(prev => {
        const newData = { 
          ...prev,
          [rowId]: {
            ...prev[rowId],
            endTime: timeValue
          }
        };
        
        // Only validate if value is not empty (allow clearing with X button)
        if (timeValue && currentStartTime && currentEndTime && (timeValue < currentStartTime || timeValue > currentEndTime)) {
          toast.error(`End time must be between ${formatTime(currentStartTime)} and ${formatTime(currentEndTime)}`, {
            position: "top-right",
            className: "!bg-red-100 !text-red-800 !border !border-red-300",
          });
          return prev; // Don't update if invalid
        }
        
        // Validate time range if both times are set
        const startTime = newData[rowId]?.startTime;
        if (timeValue && startTime && startTime > timeValue) {
          toast.error("End time must be later than or equal to start time", {
            position: "top-right",
            className: "!bg-red-100 !text-red-800 !border !border-red-300",
          });
          return prev; // Don't update if invalid
        }
        
        return newData;
      });
    } else {
      const quantityValue = value as number;
      setDataOverrides(prev => ({
        ...prev,
        [rowId]: {
          ...prev[rowId],
          quantity: quantityValue
        }
      }));
    }
  }, []);

  // Handler functions for row selection
  const handleRowToggle = useCallback((rowId: string, checked: boolean) => {
    setRowSelection(prev => ({ 
      ...prev, 
      [rowId]: checked 
    }));
    
    // Auto-populate start and end time when selecting an asset
    if (checked) {
      setDataOverrides(prev => ({
        ...prev,
        [rowId]: {
          ...prev[rowId],
          startTime: prev[rowId]?.startTime || currentStartTime || prefilledStartTime || '',
          endTime: prev[rowId]?.endTime || currentEndTime || prefilledEndTime || '',
          quantity: prev[rowId]?.quantity || 1,
        }
      }));
    }
  }, [currentStartTime, currentEndTime, prefilledStartTime, prefilledEndTime]);

  // Updated handleSelectAll to only select current page rows
  const handleSelectAll = useCallback((checked: boolean, table: any) => {
    if (checked) {
      const newSelection: Record<string, boolean> = {};
      const newOverrides: Record<string, { startTime?: string; endTime?: string; quantity?: number; }> = {};
      
      // Only select rows on the current page using their IDs
      table.getRowModel().rows.forEach((row: any) => {
        newSelection[row.original.id] = true;
        
        // Auto-populate start and end time when selecting assets
        newOverrides[row.original.id] = {
          startTime: dataOverrides[row.original.id]?.startTime || currentStartTime || prefilledStartTime || '',
          endTime: dataOverrides[row.original.id]?.endTime || currentEndTime || prefilledEndTime || '',
          quantity: dataOverrides[row.original.id]?.quantity || 1,
        };
      });
      
      setRowSelection(prev => ({ ...prev, ...newSelection }));
      setDataOverrides(prev => ({ ...prev, ...newOverrides }));
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
  }, [dataOverrides, currentStartTime, currentEndTime, prefilledStartTime, prefilledEndTime]);

  // Memoize the selection computation to prevent infinite loops
  const selectedAssets = useMemo(() => {
    const selectedIds = Object.keys(rowSelection).filter(key => rowSelection[key]);
    return selectedIds.map(id => {
      const asset = tableData.find(asset => asset.id === id);
      return {
        id: asset.id,
        name: asset.name,
        quantity: asset.quantity,
        startTime: asset.startTime,
        endTime: asset.endTime,
        woAssetId: asset.woAssetId || ''
      };
    }).filter(Boolean);
  }, [rowSelection, tableData]);

// Only call onSelectionChange when selection actually changes
  useEffect(() => {
    const currentSelection = JSON.stringify(selectedAssets);
    if (currentSelection !== lastSelectionRef.current) {
      lastSelectionRef.current = currentSelection;
      if (onSelectionChange) {
        // console.log('AssetTable - Selected assets:', selectedAssets);
        onSelectionChange(selectedAssets);
      }
    }
  }, [selectedAssets, onSelectionChange]);

  const renderSortIcon = useCallback((column: any) => {
    const isSorted = column.getIsSorted();
    if (isSorted === 'asc') return <ChevronUp className="ml-1 h-3 w-3" />;
    if (isSorted === 'desc') return <ChevronDown className="ml-1 h-3 w-3" />;
    return <ChevronsUpDown className="ml-1 h-3 w-3 text-muted-foreground" />;
  }, []);

  const columns: ColumnDef<TableAsset>[] = useMemo(() => [
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
        const isConflicted = conflictedAssetIds.includes(row.original.id);
        const conflicts = conflictEvents.get(row.original.id) || [];
        
        // console.log(`[AssetTable] Row ${row.original.name} (${row.original.id}):`, {
        //   isConflicted,
        //   conflictsCount: conflicts.length,
        //   conflictedAssetIds: conflictedAssetIds
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
                      Asset has conflicting events
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
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-muted-foreground font-sans tracking-tight text-[12px]">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="text-muted-foreground font-sans tracking-tight text-[12px]">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Input
            type="number"
            value={row.original.quantity}
            onChange={(e) => updateField(row.original.id, 'quantity', +e.target.value)}
            className="h-6 text-center w-[80px] !text-[12px] appearance-none"
            min={0}
          />
        </div>
      ),
    },
    {
      accessorKey: "quantityRemaining",
      header: "Quantity Remaining",
      cell: ({ row }) => (
        <div className="text-muted-foreground font-sans tracking-tight text-[12px]">{helper.addCommas(row.getValue("quantityRemaining"))}</div>
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
            onChange={(time) => updateField(row.original.id, 'startTime', time)}
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
            onChange={(time) => updateField(row.original.id, 'endTime', time)}
          />
        </div>
      )
    },
  ], [updateField, handleSelectAll, handleRowToggle, renderSortIcon, rowSelection]);

  // Apply filters to the data
  const filteredData = useMemo(() => {
    return tableData.filter(asset => {
      // Apply name filter if any names are selected
      if (selectedNames.length > 0 && !selectedNames.includes(asset.name)) {
        return false;
      }
      
      // Apply type filter if any types are selected
      if (selectedTypes.length > 0 && !selectedTypes.includes(asset.type)) {
        return false;
      }
      
      return true;
    });
  }, [tableData, selectedNames, selectedTypes]);

  const selectedFilterCount = selectedNames.length + selectedTypes.length;

  const table = useReactTable({
    data: filteredData, 
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
                <Button variant="outline" size="sm">
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
            <PopoverContent className="w-[280px] p-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-md font-medium">Filter Assets</h3>
                    <p className="tracking-tight text-[12px] text-muted-foreground">Select your filter criteria below</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="text-[12px] h-8 px-3 tracking-tight"
                    onClick={() => {
                      setSelectedNames([]);
                      setSelectedTypes([]);
                    }}
                  >
                    Clear All
                  </Button>
                </div>
                <div className="space-y-2">
                  <MultiSelectFilter
                    id="filter-by-name"
                    label=""
                    options={nameOptions}
                    selected={selectedNames}
                    onChange={setSelectedNames}
                    placeholder="Filter by Name"
                    maxDisplay={1}
                  />
                  <MultiSelectFilter
                    id="filter-by-type"
                    label=""
                    options={typeOptions}
                    selected={selectedTypes}
                    onChange={setSelectedTypes}
                    placeholder="Filter by Type"
                    maxDisplay={1}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Right - Selected Counter and Search */}
        <div className="flex items-center space-x-2">
          {/* {selectedAssets.length > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-[12px] font-sans text-foreground">Selected:</span>
              <Badge variant="secondary" className="text-[10px] px-1 py-0.5 h-4">
                {selectedAssets.length}
              </Badge>
            </div>
          )} */}
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
        <Table>
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
                const isConflicted = conflictedAssetIds.includes(row.original.id);
                return (
                  <TableRow 
                    key={row.id} 
                    className={`border-b border-border hover:bg-muted/50 ${
                      isConflicted ? 'bg-yellow-100 hover:bg-yellow-200' : ''
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-1 text-center text-[12px] font-sans text-foreground">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow><TableCell colSpan={columns.length} className="h-16 text-center text-muted-foreground text-[12px]">No assets found.</TableCell></TableRow>
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
