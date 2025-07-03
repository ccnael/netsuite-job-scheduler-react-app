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
import { Asset } from "@/api/asset";
import * as helper from "@/lib/helpers";
import TimeRangeFilter from '../TimeRangeFilter';

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
}

export const AssetTable: React.FC<AssetTableProps> = ({ 
  data = [], 
  onSelectionChange
}) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [tableDataState, setTableDataState] = useState<TableAsset[]>(() =>
    data.map(asset => ({
      id: asset.id,
      name: asset.name,
      description: asset.description || '-',
      type: asset.type?.text ?? '-',
      quantity: asset.quantityUsed ?? 0,
      quantityRemaining: asset.quantityRemaining ?? 0,
      startTime: asset.time.start || '08:00',
      endTime: asset.time.end || '18:00'
    }))
  );

  const [rowSelection, setRowSelection] = useState({});

  const updateField = useCallback((rowId: string, key: keyof TableAsset, value: any) => {
    setTableDataState(prev => prev.map(row => row.id === rowId ? { ...row, [key]: value } : row));
  }, []);

  // Handler functions for row selection
  const handleRowToggle = useCallback((rowIndex: string, checked: boolean) => {
    setRowSelection(prev => ({ ...prev, [rowIndex]: checked }));
  }, []);

  // Updated handleSelectAll to only select current page rows
  const handleSelectAll = useCallback((checked: boolean, table: any) => {
    if (checked) {
      const newSelection: Record<string, boolean> = {};
      // Only select rows on the current page
      table.getRowModel().rows.forEach((row: any) => {
        newSelection[row.index.toString()] = true;
      });
      setRowSelection(prev => ({ ...prev, ...newSelection }));
    } else {
      // Deselect only the rows on the current page
      const currentPageRowIndices = table.getRowModel().rows.map((row: any) => row.index.toString());
      setRowSelection(prev => {
        const newSelection = { ...prev };
        currentPageRowIndices.forEach(index => {
          delete newSelection[index];
        });
        return newSelection;
      });
    }
  }, []);

  // Memoize the selection computation to prevent infinite loops
  const selectedAssets = useMemo(() => {
    const selectedRows = Object.keys(rowSelection).filter(key => rowSelection[key]);
    return selectedRows.map(rowIndex => {
      const asset = tableDataState[parseInt(rowIndex)];
      return {
        id: asset.id,
        name: asset.name,
        quantity: asset.quantity,
        startTime: asset.startTime,
        endTime: asset.endTime
      };
    });
  }, [rowSelection, tableDataState]);

  // Effect to communicate selection changes to parent
  useEffect(() => {
    if (onSelectionChange) {
      console.log('AssetTable - Selected assets:', selectedAssets);
      onSelectionChange(selectedAssets);
    }
  }, [selectedAssets, onSelectionChange]);

  const renderSortIcon = (column: any) => {
    const isSorted = column.getIsSorted();
    if (isSorted === 'asc') return <ChevronUp className="ml-1 h-3 w-3" />;
    if (isSorted === 'desc') return <ChevronDown className="ml-1 h-3 w-3" />;
    return <ChevronsUpDown className="ml-1 h-3 w-3 text-slate-400" />;
  };

  const columns: ColumnDef<TableAsset>[] = useMemo(() => [
    {
      id: "select",
      header: ({ table }) => {
        // Calculate if all rows on current page are selected
        const currentPageRows = table.getRowModel().rows;
        const isAllCurrentPageSelected = currentPageRows.length > 0 && 
          currentPageRows.every(row => rowSelection[row.index]);

        return (
          <Checkbox 
            checked={isAllCurrentPageSelected}
            onCheckedChange={(value) => handleSelectAll(!!value, table)}
            className="translate-y-[2px]" 
          />
        );
      },
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
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-slate-700 font-sans tracking-tight text-[12px]">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="text-slate-700 font-sans tracking-tight text-[12px]">{row.getValue("type")}</div>
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
            onChange={(e) => updateField(row.original.id, 'quantity', Number(e.target.value))}
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
        <div className="text-slate-700 font-sans tracking-tight text-[12px]">{helper.addCommas(row.getValue("quantityRemaining"))}</div>
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

        {/* Right - Selected Counter and Search */}
        <div className="flex items-center space-x-2">
          {selectedAssets.length > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-[12px] font-sans text-slate-700">Selected:</span>
              <Badge variant="secondary" className="text-[10px] px-1 py-0.5 h-4">
                {selectedAssets.length}
              </Badge>
            </div>
          )}
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
      </div>

      {/* Table */}
      <div className="rounded border border-slate-200 bg-white shadow-sm overflow-x-auto">
        <Table>
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
              <TableRow><TableCell colSpan={columns.length} className="h-16 text-center text-slate-500 text-[12px]">No assets found.</TableCell></TableRow>
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
