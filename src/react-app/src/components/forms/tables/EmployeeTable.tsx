
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
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp, ChevronDown, ChevronsUpDown, Filter } from "lucide-react";
import { Employee } from "@/api/employee";
import TimeRangeFilter from '../TimeRangeFilter';

interface SelectedResource {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
}

interface EmployeeTableProps { 
  data?: Employee[]; 
  woId?: string;
  onSelectionChange?: (selectedResources: SelectedResource[]) => void;
  primaryStartTime?: string;
  primaryEndTime?: string;
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
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ 
  data = [], 
  woId, 
  onSelectionChange,
  primaryStartTime = '08:00',
  primaryEndTime = '18:00'
}) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [tableDataState, setTableDataState] = useState<TableEmployee[]>(() =>
    data.map(emp => ({
      id: emp.id, name: emp.name,
      group: emp.resourceGroups?.map(x => x.text).join(', ') || '-',
      skill: emp.resourceSkills?.map(x => x.text).join(', ') || '-',
      email: emp.email, phone: emp.phone || '-',
      affiliationType: emp.affiliationType?.text || '-',
      startTime: emp.time?.start || primaryStartTime,
      endTime: emp.time?.end || primaryEndTime
    }))
  );

  const [rowSelection, setRowSelection] = useState({});

  const updateTime = useCallback((rowId: string, key: 'startTime' | 'endTime', value: string) => {
    setTableDataState(prev => prev.map(row => row.id === rowId ? { ...row, [key]: value } : row));
  }, []);

  // Helper function to copy primary times if times are not set
  const copyPrimaryTimesIfNeeded = useCallback((employee: TableEmployee) => {
    const updatedEmployee = { ...employee };
    if (!updatedEmployee.startTime || updatedEmployee.startTime === '08:00') {
      updatedEmployee.startTime = primaryStartTime;
    }
    if (!updatedEmployee.endTime || updatedEmployee.endTime === '18:00') {
      updatedEmployee.endTime = primaryEndTime;
    }
    return updatedEmployee;
  }, [primaryStartTime, primaryEndTime]);

  // Custom row selection handler for individual checkboxes
  const handleRowToggle = useCallback((rowIndex: string, checked: boolean) => {
    if (checked) {
      // Copy primary times if needed when selecting
      const employee = tableDataState[parseInt(rowIndex)];
      const updatedEmployee = copyPrimaryTimesIfNeeded(employee);
      
      setTableDataState(prev => prev.map((row, idx) => 
        idx === parseInt(rowIndex) ? updatedEmployee : row
      ));
    }
    
    setRowSelection(prev => ({ ...prev, [rowIndex]: checked }));
  }, [tableDataState, copyPrimaryTimesIfNeeded]);

  // Custom select all handler
  const handleSelectAll = useCallback((checked: boolean) => {
    if (checked) {
      // Copy primary times for all employees when selecting all
      setTableDataState(prev => prev.map(copyPrimaryTimesIfNeeded));
      
      // Select all rows
      const newSelection = {};
      tableDataState.forEach((_, index) => {
        newSelection[index] = true;
      });
      setRowSelection(newSelection);
    } else {
      setRowSelection({});
    }
  }, [tableDataState, copyPrimaryTimesIfNeeded]);

  // Memoize the selection computation to prevent infinite loops
  const selectedResources = useMemo(() => {
    const selectedRows = Object.keys(rowSelection).filter(key => rowSelection[key]);
    return selectedRows.map(rowIndex => {
      const employee = tableDataState[parseInt(rowIndex)];
      return {
        id: employee.id,
        name: employee.name,
        startTime: employee.startTime,
        endTime: employee.endTime
      };
    });
  }, [rowSelection, tableDataState]);

  // Effect to communicate selection changes to parent - only when selectedResources actually changes
  useEffect(() => {
    if (onSelectionChange) {
      console.log('EmployeeTable - Selected resources:', selectedResources);
      onSelectionChange(selectedResources);
    }
  }, [selectedResources, onSelectionChange]);

  const renderSortIcon = (column: any) => {
    const isSorted = column.getIsSorted();
    if (isSorted === 'asc') return <ChevronUp className="ml-1 h-3 w-3" />;
    if (isSorted === 'desc') return <ChevronDown className="ml-1 h-3 w-3" />;
    return <ChevronsUpDown className="ml-1 h-3 w-3 text-slate-400" />;
  };

  const columns: ColumnDef<TableEmployee>[] = useMemo(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox 
          checked={table.getIsAllPageRowsSelected()} 
          onCheckedChange={(value) => handleSelectAll(!!value)}
          className="translate-y-[2px]" 
        />
      ),
      cell: ({ row }) => (
        <Checkbox 
          checked={row.getIsSelected()} 
          onCheckedChange={(value) => handleRowToggle(row.index.toString(), !!value)}
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
          className="h-6 px-1 text-[12px] font-sans tracking-tight font-semibold hover:bg-slate-100/60">
          Name {renderSortIcon(column)}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-slate-900 text-[12px] font-sans tracking-tight">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "group",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-6 px-1 text-[12px] font-sans tracking-tight font-semibold hover:bg-slate-100/60">
          Group {renderSortIcon(column)}
        </Button>
      ),
      cell: ({ row }) => {
        const groups = (row.getValue("group") as string).split(',').map(g => g.trim());
        return (
          <div className="flex flex-wrap gap-1 justify-center">
            {groups.map((group, idx) => (
              <span key={idx} className="inline-block rounded bg-blue-500 text-white px-1.5 text-[10px] font-medium">{group}</span>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "skill",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-6 px-1 text-[12px] font-sans tracking-tight font-semibold hover:bg-slate-100/60">
          Skill {renderSortIcon(column)}
        </Button>
      ),
      cell: ({ row }) => {
        const skills = (row.getValue("skill") as string).split(',').map(g => g.trim());
        return (
          <div className="flex flex-wrap gap-1 justify-center">
            {skills.map((skill, idx) => (
              <span key={idx} className="inline-block rounded bg-blue-500 text-white px-1.5 text-[10px] font-medium">{skill}</span>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="text-slate-700 font-sans tracking-tight text-[12px]">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <div className="text-slate-700 font-sans tracking-tight text-[12px]">{row.getValue("phone")}</div>
      ),
    },
    {
      accessorKey: "affiliationType",
      header: "Type",
      cell: ({ row }) => (
        <div className="text-slate-700 font-sans tracking-tight text-[12px]">{row.getValue("affiliationType")}</div>
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
  ], [updateTime, handleSelectAll, handleRowToggle, renderSortIcon]);

  const table = useReactTable({
    data: tableDataState, 
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { 
      globalFilter, 
      sorting,
      rowSelection
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    initialState: { pagination: { pageSize: 5 } },
  });

  return (
    <div className="w-full space-y-2">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between">
        {/* Left - Rows and Filter */}
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

        {/* Right - Search */}
        <div className="relative w-[200px]">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400 h-3 w-3" />
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8 h-6 border-slate-200 text-[12px] font-sans placeholder:text-[12px]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded border border-slate-200 bg-white shadow-sm overflow-x-auto">
        <Table className="min-w-[900px] md:min-w-[1000px] lg:min-w-[1400px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-slate-50/50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className={`h-8 px-2 text-center font-sans text-[12px] font-semibold text-slate-700 border-b border-slate-200 
                    ${['startTime', 'endTime'].includes(header.column.id) ? 'min-w-[130px]' : ''}`}>
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
                    <TableCell key={cell.id} className="px-2 py-1 text-center text-[12px] font-sans">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={columns.length} className="h-16 text-center text-slate-500 text-[12px]">No employees found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Bottom Pagination */}
      <div className="flex items-center justify-between mt-2">
        {/* Bottom Left: Showing X to Y of Z entries */}
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
