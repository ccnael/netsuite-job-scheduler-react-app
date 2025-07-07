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
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp, ChevronDown, ChevronsUpDown, Filter, AlertTriangle } from "lucide-react";
import { Vendor } from "@/api/vendor";

interface SelectedVendor {
  id: string;
  name: string;
  manpower: number;
  notes: string;
  woVendorId: string;
}

interface VendorTableProps { 
  data?: Vendor[]; 
  onSelectionChange?: (selectedVendors: SelectedVendor[]) => void;
  woVendors?: any[];
  onUpdate?: boolean;
}

export const VendorTable: React.FC<VendorTableProps> = ({ data = [], onSelectionChange, woVendors = [], onUpdate = false }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [tableDataState, setTableDataState] = useState<Vendor[]>(() =>
    data.map(vendor => {
      const woVendor = woVendors.find(wv => wv.vendor?.value === vendor.id);
      
      // Auto-populate fields when onUpdate is true and woVendor exists
      if (onUpdate && woVendor?.id) {
        return {
          ...vendor,
          woVendorId: woVendor.id,
          quantityRequired: woVendor.quantityRequired || vendor.quantityRequired,
          memo: woVendor.memo || vendor.memo
        };
      }
      
      return {
        ...vendor,
        woVendorId: woVendor?.id || ''
      };
    })
  );

  const [rowSelection, setRowSelection] = useState(() => {
    // Auto-select rows when onUpdate is true and woVendor exists with valid data
    if (onUpdate) {
      const initialSelection: Record<string, boolean> = {};
      data.forEach((vendor, index) => {
        const woVendor = woVendors.find(wv => wv.vendor?.value === vendor.id);
        if (woVendor?.id && woVendor.quantityRequired > 0) {
          initialSelection[index.toString()] = true;
        }
      });
      return initialSelection;
    }
    return {};
  });

  const [validationWarnings, setValidationWarnings] = useState<Record<string, boolean>>({});

  // Local state for memo inputs to prevent auto-exit - initialize properly
  const [memoInputs, setMemoInputs] = useState<Record<string, string>>(() => {
    const initialMemos: Record<string, string> = {};
    data.forEach(vendor => {
      const woVendor = woVendors.find(wv => wv.vendor?.value === vendor.id);
      if (onUpdate && woVendor?.memo) {
        initialMemos[vendor.id] = woVendor.memo;
      }
    });
    return initialMemos;
  });

  const updateField = useCallback((rowId: string, key: keyof Vendor, value: any) => {
    setTableDataState(prev => {
      const updated = prev.map(row =>
        row.id === rowId ? { ...row, [key]: value } : row
      );

      // If updating quantityRequired and it's 0, unselect the row
      if (key === 'quantityRequired' && Number(value) === 0) {
        const index = updated.findIndex(row => row.id === rowId);
        setRowSelection(prev => {
          const newSelection = { ...prev };
          delete newSelection[index];
          return newSelection;
        });
      }

      return updated;
    });
  }, []);

  // Handle memo input changes locally
  const handleMemoChange = useCallback((rowId: string, value: string) => {
    setMemoInputs(prev => ({ ...prev, [rowId]: value }));
  }, []);

  // Handle memo blur to update main state
  const handleMemoBlur = useCallback((rowId: string, value: string) => {
    updateField(rowId, 'memo', value);
  }, [updateField]);

  // Custom row selection handler to validate manpower and show warnings only on check attempt
  const handleRowToggle = useCallback((rowIndex: string, checked: boolean) => {
    const vendor = tableDataState[parseInt(rowIndex)];
    
    if (checked && (!vendor.quantityRequired || vendor.quantityRequired === 0)) {
      // Show warning for invalid selection attempt
      setValidationWarnings(prev => ({ ...prev, [rowIndex]: true }));
      // Auto-hide warning after 3 seconds with fade
      setTimeout(() => {
        setValidationWarnings(prev => ({ ...prev, [rowIndex]: false }));
      }, 3000);
      return;
    }
    
    setRowSelection(prev => ({ ...prev, [rowIndex]: checked }));
  }, [tableDataState]);

  // Custom select all handler to skip vendors with 0 manpower and only select current page
  const handleSelectAll = useCallback((checked: boolean, table: any) => {
    if (checked) {
      const newSelection: Record<string, boolean> = {};
      // Only select rows on the current page with valid manpower
      table.getRowModel().rows.forEach((row: any) => {
        const vendor = tableDataState[row.index];
        if (vendor.quantityRequired && vendor.quantityRequired > 0) {
          newSelection[row.index.toString()] = true;
        }
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
  }, [tableDataState]);

  // Memoize the selection computation to prevent infinite loops
  const selectedVendors = useMemo(() => {
    const selectedRows = Object.keys(rowSelection).filter(key => rowSelection[key]);
    return selectedRows.map(rowIndex => {
      const vendor = tableDataState[parseInt(rowIndex)];
      return {
        id: vendor.id,
        name: vendor.name,
        manpower: vendor.quantityRequired || 0,
        notes: vendor.memo || '',
        woVendorId: vendor.woVendorId || ''
      };
    });
  }, [rowSelection, tableDataState]);

  // Effect to communicate selection changes to parent
  useEffect(() => {
    if (onSelectionChange) {
      console.log('VendorTable - Selected vendors:', selectedVendors);
      onSelectionChange(selectedVendors);
    }
  }, [selectedVendors, onSelectionChange]);

  const renderSortIcon = (column: any) => {
    const isSorted = column.getIsSorted();
    if (isSorted === 'asc') return <ChevronUp className="ml-1 h-3 w-3" />;
    if (isSorted === 'desc') return <ChevronDown className="ml-1 h-3 w-3" />;
    return <ChevronsUpDown className="ml-1 h-3 w-3 text-slate-400" />;
  };

  // Memoized memo cell component to prevent re-renders
  const MemoCell = React.memo(({ vendorId, initialValue }: { vendorId: string, initialValue: string }) => {
    const [localValue, setLocalValue] = useState(initialValue);
    
    return (
      <textarea
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={(e) => updateField(vendorId, 'memo', e.target.value)}
        className="w-full text-[12px] p-1 border border-slate-300 rounded"
        rows={2}
      />
    );
  });

  const columns: ColumnDef<Vendor>[] = useMemo(() => [
    {
      id: "select",
      header: ({ table }) => {
        // Calculate if all selectable vendors on current page are selected
        const currentPageRows = table.getRowModel().rows;
        const selectableRows = currentPageRows.filter(row => {
          const vendor = row.original;
          return vendor.quantityRequired && vendor.quantityRequired > 0;
        });
        
        const isAllCurrentPageSelected = selectableRows.length > 0 && 
          selectableRows.every(row => rowSelection[row.index]);

        return (
          <div className="flex justify-center items-center">
            <Checkbox 
              checked={isAllCurrentPageSelected}
              onCheckedChange={(value) => handleSelectAll(!!value, table)}
              className="translate-y-[1px]"
            />
          </div>
        );
      },
      cell: ({ row }) => {
        const vendor = row.original;
        const hasValidManpower = vendor.quantityRequired && vendor.quantityRequired > 0;
        const showWarning = validationWarnings[row.index];

        return (
          <div className="flex justify-center items-center space-x-1">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => handleRowToggle(row.index.toString(), !!value)}
              disabled={!hasValidManpower}
              className="translate-y-[1px]"
            />
            {showWarning && (
              <AlertTriangle className="h-3 w-3 text-amber-500 animate-fade-in" />
            )}
          </div>
        );
      },
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
      accessorKey: "quantityRequired",
      header: () => <span>Manpower Required <span className="text-red-500">*</span></span>,
      cell: ({ row }) => {
        const vendor = row.original;
        const hasValidManpower = vendor.quantityRequired && vendor.quantityRequired > 0;
        const showWarning = validationWarnings[row.index];
        
        return (
          <div className="flex flex-col items-center space-y-1">
            <div className="flex justify-center">
              <Input
                type="number"
                value={row.original.quantityRequired}
                onChange={(e) => updateField(row.original.id, 'quantityRequired', Number(e.target.value))}
                className={`h-6 text-center w-[80px] !text-[12px] appearance-none ${
                  !hasValidManpower ? 'border-amber-500 bg-amber-50' : ''
                }`}
                min={0}
              />
            </div>
            {showWarning && (
              <div className="text-[10px] text-amber-600 text-center animate-fade-in">
                Must be &gt; 0 to select
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "memo",
      header: () => "Memo",
      cell: ({ row }) => {
        return (
          <MemoCell 
            vendorId={row.original.id} 
            initialValue={row.original.memo || ''}
          />
        );
      },
    },
  ], [handleSelectAll, handleRowToggle, renderSortIcon, validationWarnings, rowSelection, updateField]);

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
          <Button variant="outline" size="sm"><Filter className="h-3 w-3" /></Button>
        </div>

        {/* Right - Selected Counter and Search */}
        <div className="flex items-center space-x-2">
          {selectedVendors.length > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-[12px] font-sans text-slate-700">Selected:</span>
              <Badge variant="secondary" className="text-[10px] px-1 py-0.5 h-4">
                {selectedVendors.length}
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
                  <TableHead key={header.id} className="h-8 px-2 text-center font-sans text-[12px] font-semibold text-slate-700 border-b border-slate-200">
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
              <TableRow><TableCell colSpan={columns.length} className="h-16 text-center text-slate-500 text-[12px]">No vendors found.</TableCell></TableRow>
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
          <Button variant="outline" className="h-6 w-6 p-0" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}><ChevronsLeft className="h-3 w-3" /></Button>
          <Button variant="outline" className="h-6 w-6 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}><ChevronLeft className="h-3 w-3" /></Button>
          <span className="text-[12px] font-sans">{table.getState().pagination.pageIndex + 1} / {table.getPageCount()}</span>
          <Button variant="outline" className="h-6 w-6 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}><ChevronRight className="h-3 w-3" /></Button>
          <Button variant="outline" className="h-6 w-6 p-0" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}><ChevronsRight className="h-3 w-3" /></Button>
        </div>
      </div>
    </div>
  );
};
