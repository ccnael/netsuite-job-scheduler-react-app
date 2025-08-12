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
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp, ChevronDown, ChevronsUpDown, Filter, AlertTriangle } from "lucide-react";
import { fetchWOItems } from "@/api/woItem";
import { type Event } from "@/api/event";

interface SelectedWOItem {
  id: string;
  name: string;
  quantity: number;
  completeQty: number;
}

interface WOItemTableProps { 
  woId: string; 
  onSelectionChange?: (selectedWOItems: SelectedWOItem[]) => void;
  selectedEvent?: Event;
  onUpdate?: boolean;
}

interface TableWOItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  completeQty: number;
  event?: any;
}

export const WOItemTable: React.FC<WOItemTableProps> = ({ woId, onSelectionChange, selectedEvent, onUpdate }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [tableDataState, setTableDataState] = useState<TableWOItem[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [validationWarnings, setValidationWarnings] = useState<Record<string, boolean>>({});

  // Fetch data on load
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchWOItems(woId, selectedEvent.id);
      const mappedData = data.map(woItem => ({
        id: woItem.id,
        name: woItem.item.text,
        description: woItem.description || '-',
        quantity: woItem.quantity ?? 0,
        completeQty: woItem.quantity ?? 0,
        event: woItem.event
      }));
      setTableDataState(mappedData);
    };

    if (woId) {
      loadData();
    }
  }, [woId, selectedEvent.id]);

  // Auto-select rows that have an event value when onUpdate is true and data loads
  useEffect(() => {
    if (onUpdate && tableDataState.length > 0) {
      const initialSelection: Record<string, boolean> = {};
      
      tableDataState.forEach((item, index) => {
        if (item?.event === selectedEvent?.id) {
          initialSelection[index.toString()] = true;
        }
      });
      
      // console.log('Auto-selecting rows with event values:', initialSelection);
      setRowSelection(initialSelection);
    }
  }, [tableDataState, onUpdate, selectedEvent?.id]);

  // console.log('tableDataState', tableDataState);

  const updateField = useCallback((rowId: string, key: keyof TableWOItem, value: any) => {
    setTableDataState(prev => {
      const updated = prev.map(row =>
        row.id === rowId ? { ...row, [key]: value } : row
      );

      // If updating completeQty and it's 0, unselect the row
      if (key === 'completeQty' && Number(value) === 0) {
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

  const handleRowToggle = useCallback((rowIndex: string, checked: boolean) => {
    const woItem = tableDataState[parseInt(rowIndex)];
    
    if (checked && (!woItem.completeQty || woItem.completeQty === 0)) {
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

  const handleSelectAll = useCallback((checked: boolean, table: any) => {
    if (checked) {
      const newSelection: Record<string, boolean> = {};
      // Only select rows on the current page with valid completeQty
      table.getRowModel().rows.forEach((row: any) => {
        const woItem = tableDataState[row.index];
        if (woItem.completeQty && woItem.completeQty > 0) {
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

  const handleCompleteAll = useCallback(() => {
    setTableDataState(prev => 
      prev.map(item => ({
        ...item,
        completeQty: item.quantity
      }))
    );
    
    // Select all rows with valid quantities
    const newSelection: Record<string, boolean> = {};
    tableDataState.forEach((item, index) => {
      if (item.quantity && item.quantity > 0) {
        newSelection[index.toString()] = true;
      }
    });
    setRowSelection(newSelection);
  }, [tableDataState]);

  const handleClear = useCallback(() => {
    setTableDataState(prev => 
      prev.map(item => ({
        ...item,
        completeQty: 0
      }))
    );
    setRowSelection({});
  }, []);

  const selectedWOItems = useMemo(() => {
    const selectedRows = Object.keys(rowSelection).filter(key => rowSelection[key]);
    return selectedRows.map(rowIndex => {
      const woItem = tableDataState[parseInt(rowIndex)];
      return {
        id: woItem.id,
        name: woItem.name,
        quantity: woItem.quantity,
        completeQty: woItem.completeQty,
      };
    });
  }, [rowSelection, tableDataState]);

  useEffect(() => {
    if (onSelectionChange) {
      console.log('WOItemCompletionTable - Selected items:', selectedWOItems);
      onSelectionChange(selectedWOItems);
    }
  }, [selectedWOItems, onSelectionChange]);

  const renderSortIcon = (column: any) => {
    const isSorted = column.getIsSorted();
    if (isSorted === 'asc') return <ChevronUp className="ml-1 h-3 w-3" />;
    if (isSorted === 'desc') return <ChevronDown className="ml-1 h-3 w-3" />;
    return <ChevronsUpDown className="ml-1 h-3 w-3 text-muted-foreground" />;
  };

  const columns: ColumnDef<TableWOItem>[] = useMemo(() => [
    {
      id: "select",
      header: ({ table }) => {
        // Calculate if all selectable items on current page are selected
        const currentPageRows = table.getRowModel().rows;
        const selectableRows = currentPageRows.filter(row => {
          const woItem = row.original;
          return woItem.quantity && woItem.quantity > 0;
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
        const woItem = row.original;
        const hasValidQuantity = woItem.completeQty && woItem.completeQty > 0;
        const showWarning = validationWarnings[row.index];

        return (
          <div className="flex justify-center items-center space-x-1">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => handleRowToggle(row.index.toString(), !!value)}
              disabled={!hasValidQuantity}
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
          className="h-6 px-1 text-[12px] font-sans tracking-tight font-semibold hover:bg-muted/60">
          Item {renderSortIcon(column)}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-foreground text-[12px] font-sans tracking-tight">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-muted-foreground font-sans tracking-tight text-[12px]">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => (
        <div className="text-muted-foreground font-sans tracking-tight text-[12px]">{row.getValue("quantity")}</div>
      ),
    },
    {
      accessorKey: "completeQty",
      header: "Complete Quantity",
      cell: ({ row }) => {
        const woItem = row.original;
        
        return (
          <div className="flex flex-col items-center space-y-1">
            <div className="flex justify-center">
              <Input
                type="number"
                value={row.original.completeQty}
                onChange={(e) => updateField(row.original.id, 'completeQty', Number(e.target.value))}
                className={`h-6 text-center w-[80px] !text-[12px] appearance-none`}
                min={0}
                max={+row.getValue("quantity")}
              />
            </div>
          </div>
        );
      },
    }
  ], [updateField, handleSelectAll, handleRowToggle, renderSortIcon, validationWarnings, rowSelection]);

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
        <div className="flex items-center space-x-1">
          <span className="text-[12px] font-sans text-foreground">Rows:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="h-6 w-[50px] rounded border border-border bg-background px-1 text-[12px] font-sans"
          >
            {[5, 10, 20, 30].map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
          {/* <Button variant="outline" size="sm">
            <Filter className="h-3 w-3" />
          </Button> */}
        </div>

        {/* Right - Selected Counter and Search */}
        <div className="flex items-center space-x-2">
          {selectedWOItems.length > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-[12px] font-sans text-foreground">Selected:</span>
              <Badge variant="secondary" className="text-[10px] px-1 py-0.5 h-4">
                {selectedWOItems.length}
              </Badge>
            </div>
          )}
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

      <div className="rounded border border-border bg-card shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-8 px-2 text-center font-sans text-[12px] font-semibold text-foreground border-b border-border">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b border-border hover:bg-muted/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-2 py-1 text-center text-[12px] font-sans">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={columns.length} className="h-16 text-center text-muted-foreground text-[12px]">No items found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-2">
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
        <div className="flex items-center justify-end space-x-2">
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
      <div className="flex items-right justify-end space-x-2">
        <Button 
          variant="outline" 
          onClick={handleCompleteAll}
          className="h-6 px-2 text-[11px] font-sans"
        >
          Complete All
        </Button>
        <Button 
          variant="outline" 
          onClick={handleClear}
          className="h-6 px-2 text-[11px] font-sans"
        >
          Clear
        </Button>
      </div>
    </div>
  );
};
