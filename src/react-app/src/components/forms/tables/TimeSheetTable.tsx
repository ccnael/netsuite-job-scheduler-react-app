import React, { useState, useMemo, useCallback, useEffect } from 'react';
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
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp, ChevronDown, ChevronsUpDown, Filter } from "lucide-react";
import TimeRangeFilter from '../TimeRangeFilter';
import { type Event } from "@/api/event";

interface TimeSheetRow {
  id: string;
  // selected: boolean;
  name: string;
  location: string;
  startTime: string;
  endTime: string;
  awayHrs: string;
  awayMin: string;
  stHrs: string;
  stMin: string;
  otHrs: string;
  otMin: string;
  dtHrs: string;
  dtMin: string;
  note: string;
}

interface TimeSheetTableProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  selectedEvent: Event;
  onDataChange?: (data: TimeSheetRow[]) => void;
}

export const TimeSheetTable: React.FC<TimeSheetTableProps> = ({ 
  startTime, 
  endTime, 
  onStartTimeChange, 
  onEndTimeChange,
  selectedEvent,
  onDataChange
}) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [rowSelection, setRowSelection] = useState({});
  
  // Initialize rows from selectedEvent.resources with proper null checks
  const [rows, setRows] = useState<TimeSheetRow[]>(() => {
    if (selectedEvent?.resources && Array.isArray(selectedEvent.resources) && selectedEvent.resources.length > 0) {
      return selectedEvent.resources.map((resource, index) => ({
        id: String(resource?.id || `resource-${index}`),
        // selected: false,
        name: String(resource?.name || resource?.text || `Resource ${index + 1}`),
        location: String(resource?.location?.text || '-'),
        startTime: '',
        endTime: '',
        awayHrs: '0',
        awayMin: '0',
        stHrs: '0',
        stMin: '0',
        otHrs: '0',
        otMin: '0',
        dtHrs: '0',
        dtMin: '0',
        note: ''
      }));
    }
    
    // Fallback data if no resources
    return [
      {
        id: '1',
        // selected: false,
        name: 'John Doe',
        location: 'Site A',
        startTime: '',
        endTime: '',
        awayHrs: '0',
        awayMin: '0',
        stHrs: '0',
        stMin: '0',
        otHrs: '0',
        otMin: '0',
        dtHrs: '0',
        dtMin: '0',
        note: ''
      },
      {
        id: '2',
        // selected: false,
        name: 'Jane Smith',
        location: 'Site B',
        startTime: '',
        endTime: '',
        awayHrs: '0',
        awayMin: '0',
        stHrs: '8',
        stMin: '0',
        otHrs: '0',
        otMin: '0',
        dtHrs: '0',
        dtMin: '0',
        note: ''
      }
    ];
  });

  console.log('Time sheet rows', rows);
  console.log('Selected event resources:', selectedEvent?.resources);

  // Add useEffect to notify parent of data changes
  useEffect(() => {
    if (onDataChange) {
      onDataChange(rows);
    }
  }, [rows, onDataChange]);

  // Fixed checkbox handlers that don't reset pagination - copied from EmployeeTable
  const handleRowToggle = useCallback((rowId: string, checked: boolean) => {
    setRowSelection(prev => ({ 
      ...prev, 
      [rowId]: checked 
    }));
  }, []);

  const handleSelectAll = useCallback((checked: boolean, table: any) => {
    if (checked) {
      const newSelection: Record<string, boolean> = {};
      // Only select rows on the current page using their IDs
      table.getRowModel().rows.forEach((row: any) => {
        newSelection[row.original.id] = true;
      });
      setRowSelection(prev => ({ ...prev, ...newSelection }));
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
  }, []);

  const handleInputChange = (id: string, field: keyof TimeSheetRow, value: string) => {
    setRows(prev => {
      const updated = prev.map(row => 
        row.id === id ? { ...row, [field]: value } : row
      );
      return updated;
    });
  };

  const handleRowStartTimeChange = (id: string, time: string) => {
    setRows(prev => {
      const updated = prev.map(row => 
        row.id === id ? { ...row, startTime: time } : row
      );
      return updated;
    });
  };

  const handleRowEndTimeChange = (id: string, time: string) => {
    setRows(prev => {
      const updated = prev.map(row => 
        row.id === id ? { ...row, endTime: time } : row
      );
      return updated;
    });
  };

  const renderSortIcon = useCallback((column: any) => {
    const isSorted = column.getIsSorted();
    if (isSorted === 'asc') return <ChevronUp className="ml-1 h-3 w-3" />;
    if (isSorted === 'desc') return <ChevronDown className="ml-1 h-3 w-3" />;
    return <ChevronsUpDown className="ml-1 h-3 w-3 text-slate-400" />;
  }, []);

  const selectedRows = useMemo(() => {
    const selectedIds = Object.keys(rowSelection).filter(key => rowSelection[key]);
    return selectedIds.map(id => {
      const row = rows.find(r => r.id === id);
      return row || null;
    }).filter(Boolean);
  }, [rowSelection, rows]);
  
  const isAllSelected = useMemo(() => rows.length > 0 && rows.every(row => rowSelection[row.id]), [rows, rowSelection]);

  const columns: ColumnDef<TimeSheetRow>[] = useMemo(() => [
    /* {
      id: "select",
      header: ({ table }) => (
        <div className="flex justify-center items-center h-full">
          <Checkbox 
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(checked) => handleSelectAll(checked as boolean, table)}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center h-full">
          <Checkbox 
            checked={!!rowSelection[row.original.id]}
            onCheckedChange={(checked) => handleRowToggle(row.original.id, checked as boolean)}
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    }, */
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-6 px-1 text-[12px] font-sans tracking-tight font-semibold hover:bg-slate-100/60">
          Name {renderSortIcon(column)}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-slate-900 text-[12px] font-sans tracking-tight">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "location",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-6 px-1 text-[12px] font-sans tracking-tight font-semibold hover:bg-slate-100/60">
          <span>Location <span className="text-red-500">*</span></span> {renderSortIcon(column)}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-slate-900 text-[12px] font-sans tracking-tight">{row.getValue("location")}</div>
      ),
    },
    {
      accessorKey: "startTime",
      header: () => <span>Start Time <span className="text-red-500">*</span></span>,
      cell: ({ row }) => (
        <div className="min-w-[130px]">
          <TimeRangeFilter
            id={`startTime-${row.original.id}`}
            label=""
            value={row.original.startTime}
            onChange={(time) => handleRowStartTimeChange(row.original.id, time)}
            disabled={false}
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "endTime",
      header: () => <span>End Time <span className="text-red-500">*</span></span>,
      cell: ({ row }) => (
        <div className="min-w-[130px]">
          <TimeRangeFilter
            id={`endTime-${row.original.id}`}
            label=""
            value={row.original.endTime}
            onChange={(time) => handleRowEndTimeChange(row.original.id, time)}
            disabled={false}
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "awayHrs",
      header: () => <div className="h-6 text-[12px] font-sans font-semibold text-center">Away<br/><span className="text-[10px] font-normal">(hrs)</span></div>,
      cell: ({ row }) => (
        <div className="p-1">
          <Input 
            type="number"
            value={row.original.awayHrs}
            onChange={(e) => handleInputChange(row.original.id, 'awayHrs', e.target.value)}
            className="h-6 w-12 !text-[12px] text-center"
            placeholder="hrs"
            min="0"
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "awayMin",
      header: () => <div className="h-6 text-[12px] font-sans font-semibold text-center">Away<br/><span className="text-[10px] font-normal">(min)</span></div>,
      cell: ({ row }) => (
        <div className="p-1">
          <Input 
            type="number"
            value={row.original.awayMin}
            onChange={(e) => handleInputChange(row.original.id, 'awayMin', e.target.value)}
            className="h-6 w-12 !text-[12px] text-center"
            placeholder="min"
            min="0"
            max="59"
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "stHrs",
      header: () => <div className="h-6 text-[12px] font-sans font-semibold text-center">ST<br/><span className="text-[10px] font-normal">(hrs)</span></div>,
      cell: ({ row }) => (
        <div className="p-1">
          <Input 
            type="number"
            value={row.original.stHrs}
            onChange={(e) => handleInputChange(row.original.id, 'stHrs', e.target.value)}
            className="h-6 w-12 !text-[12px] text-center"
            placeholder="hrs"
            min="0"
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "stMin",
      header: () => <div className="h-6 text-[12px] font-sans font-semibold text-center">ST<br/><span className="text-[10px] font-normal">(min)</span></div>,
      cell: ({ row }) => (
        <div className="p-1">
          <Input 
            type="number"
            value={row.original.stMin}
            onChange={(e) => handleInputChange(row.original.id, 'stMin', e.target.value)}
            className="h-6 w-12 !text-[12px] text-center"
            placeholder="min"
            min="0"
            max="59"
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "otHrs",
      header: () => <div className="h-6 text-[12px] font-sans font-semibold text-center">OT<br/><span className="text-[10px] font-normal">(hrs)</span></div>,
      cell: ({ row }) => (
        <div className="p-1">
          <Input 
            type="number"
            value={row.original.otHrs}
            onChange={(e) => handleInputChange(row.original.id, 'otHrs', e.target.value)}
            className="h-6 w-12 !text-[12px] text-center"
            placeholder="hrs"
            min="0"
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "otMin",
      header: () => <div className="h-6 text-[12px] font-sans font-semibold text-center">OT<br/><span className="text-[10px] font-normal">(min)</span></div>,
      cell: ({ row }) => (
        <div className="p-1">
          <Input 
            type="number"
            value={row.original.otMin}
            onChange={(e) => handleInputChange(row.original.id, 'otMin', e.target.value)}
            className="h-6 w-12 !text-[12px] text-center"
            placeholder="min"
            min="0"
            max="59"
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "dtHrs",
      header: () => <div className="h-6 text-[12px] font-sans font-semibold text-center">DT<br/><span className="text-[10px] font-normal">(hrs)</span></div>,
      cell: ({ row }) => (
        <div className="p-1">
          <Input 
            type="number"
            value={row.original.dtHrs}
            onChange={(e) => handleInputChange(row.original.id, 'dtHrs', e.target.value)}
            className="h-6 w-12 !text-[12px] text-center"
            placeholder="hrs"
            min="0"
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "dtMin",
      header: () => <div className="h-6 text-[12px] font-sans font-semibold text-center">DT<br/><span className="text-[10px] font-normal">(min)</span></div>,
      cell: ({ row }) => (
        <div className="p-1">
          <Input 
            type="number"
            value={row.original.dtMin}
            onChange={(e) => handleInputChange(row.original.id, 'dtMin', e.target.value)}
            className="h-6 w-12 !text-[12px] text-center"
            placeholder="min"
            min="0"
            max="59"
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "note",
      header: () => <div className="h-6 text-[12px] font-sans font-semibold text-center">Note</div>,
      cell: ({ row }) => (
        <div className="p-1">
          <Input 
            value={row.original.note}
            onChange={(e) => handleInputChange(row.original.id, 'note', e.target.value)}
            className="h-6 w-48 !text-[12px] text-center"
            placeholder="Enter note..."
          />
        </div>
      ),
      enableSorting: false,
    },
  ], [/* handleRowToggle, handleSelectAll,  */renderSortIcon/* , rowSelection */]);

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { 
      globalFilter, 
      sorting,
      // rowSelection,
      pagination
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    // onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    // enableRowSelection: true,
    manualPagination: false,
    getRowId: (row) => row.id,
    // This is the key fix - prevent pagination reset on selection changes
    autoResetPageIndex: false,
  });

  return (
    <div className="w-full space-y-2">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <span className="text-[12px] font-sans text-slate-700">Rows:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="h-6 w-[50px] rounded border border-slate-200 bg-white px-1 text-[12px] font-sans"
          >
            {[5, 10, 20, 30].map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
          <Button variant="outline" size="sm">
            <Filter className="h-3 w-3" />
          </Button>
        </div>

        {/* Right - Selected Counter and Search */}
        <div className="flex items-center space-x-2">
          {selectedRows.length > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-[12px] font-sans text-slate-700">Selected:</span>
              <Badge variant="secondary" className="text-[10px] px-1 py-0.5 h-4">
                {selectedRows.length}
              </Badge>
            </div>
          )}
          <div className="relative w-[200px]">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400 h-3 w-3" />
            <Input
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8 h-6 border-slate-200 !text-[12px] font-sans placeholder:text-[12px]"
            />
          </div>
        </div>
      </div>

      <div className="rounded border border-slate-200 bg-white shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-slate-50/50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={`h-14 px-2 text-center font-sans text-[12px] font-semibold text-slate-700 border-b border-slate-200 ${['startTime', 'endTime', 'note'].includes(header.column.id) ? 'min-w-[130px]' : ''}`}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-2 py-1 text-center text-[12px] font-sans">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-16 text-center text-slate-500 text-[12px]">
                  No items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="text-[12px] font-sans text-slate-700">
          {(() => {
            const pageIndex = table.getState().pagination.pageIndex;
            const pageSize = table.getState().pagination.pageSize;
            const total = table.getFilteredRowModel().rows.length;
            const from = total === 0 ? 0 : pageIndex * pageSize + 1;
            const to = Math.min(total, (pageIndex + 1) * pageSize);
            return `Showing ${from} to ${to} of ${total} entries`;
          })()}
        </div>

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
