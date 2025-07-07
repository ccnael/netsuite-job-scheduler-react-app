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
  woAssets?: any[];
  onUpdate?: boolean;
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
  onUpdate

}) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [dataOverrides, setDataOverrides] = useState<Record<string, { startTime?: string; endTime?: string; quantity?: number; }>>({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [isInitialized, setIsInitialized] = useState(false);

  // Use ref to track the last selection to prevent unnecessary calls
  const lastSelectionRef = useRef<string>('');

  // Memoize the table data to prevent infinite loops
  const tableData = useMemo(() => {
    console.log('[AssetTable] Building table data', { dataLen: data.length, woResourcesLen: woAssets.length });

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
    // Only initialize selection and time override when onUpdate is true and not already initialized
    if (onUpdate && !isInitialized && tableData.length > 0) {
      const initialSelection: Record<string, boolean> = {};
      const initialOverrides: Record<string, { startTime?: string; endTime?: string; quantity?: number; }> = {};

      // console.log('Initializing AssetTable selection for onUpdate mode...');

      tableData.forEach(asset => {
        // console.log(`Checking asset ${asset.name} (ID: ${asset.id}) - woAssetId: ${asset.woAssetId}`);
        if (asset.woAssetId) {
          // console.log(`Auto-selecting asset ${asset.name} because it has woAssetId: ${asset.woAssetId}`);
          initialSelection[asset.id] = true;

          initialOverrides[asset.id] = {
            startTime: asset.startTime,
            endTime: asset.endTime,
            quantity: asset.quantity,
          };
        }
      });

      // console.log('Initial selection for assets:', initialSelection);
      // console.log('Initial overrides for assets:', initialOverrides);

      setRowSelection(initialSelection);
      setDataOverrides(initialOverrides);
      setIsInitialized(true);
    }
  }, [tableData, onUpdate, isInitialized]);

  // Reset initialization when onUpdate or data changes
  useEffect(() => {
    setIsInitialized(false);
  }, [onUpdate, data.length]);

  const updateField = useCallback((rowId: string, key: 'startTime' | 'endTime' | 'quantity', value: string | number) => {
    // console.log('Field update requested:', { rowId, key, value });
    setDataOverrides(prev => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [key]: value
      }
    }));
  }, []);

  // Handler functions for row selection
  const handleRowToggle = useCallback((rowId: string, checked: boolean) => {
    setRowSelection(prev => ({ 
      ...prev, 
      [rowId]: checked 
    }));
  }, []);

  // Updated handleSelectAll to only select current page rows
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
    return <ChevronsUpDown className="ml-1 h-3 w-3 text-slate-400" />;
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
              className="pl-8 h-6 border-slate-200 !text-[12px] font-sans placeholder:text-[12px]"
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
