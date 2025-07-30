import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel, getSortedRowModel, SortingState, useReactTable,
  PaginationState
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
}

interface WOItemTableProps { 
  woId: string; 
  onSelectionChange?: (selectedWOItems: SelectedWOItem[]) => void;
  onUpdate?: boolean;
  selectedEvent?: Event;
}

interface TableWOItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  event?: any;
}

export const WOItemTable: React.FC<WOItemTableProps> = ({ woId, onSelectionChange, onUpdate, selectedEvent }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [tableDataState, setTableDataState] = useState<TableWOItem[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [validationWarnings, setValidationWarnings] = useState<Record<string, boolean>>({});
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 });

  // Fetch data on load
  useEffect(() => {
    const loadData = async () => {
      let data = await fetchWOItems(woId, '');
      if (!onUpdate) {
        data = data.filter(x => !x.event);
      } else {
        // let unassignedItems = data.filter(x => !x.event);
        const unassignedItems = data
          .filter(x => !selectedEvent.items.map(y => y.item.value)
          .includes(x.item.value));
        data = [...selectedEvent.items, ...unassignedItems];
      }
      const mappedData = data.map(woItem => ({
        id: woItem.id,
        name: woItem.item.text,
        description: woItem.description || '-',
        quantity: woItem.quantity ?? 0,
        event: woItem.event
      }));
      setTableDataState(mappedData);
    };

    if (woId) {
      loadData();
    }
  }, [woId, onUpdate]);

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

      // If updating quantity and it's 0, unselect the row
      if (key === 'quantity' && Number(value) === 0) {
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
    
    if (checked && (!woItem.quantity || woItem.quantity === 0)) {
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
      // Only select rows on the current page with valid quantity
      table.getRowModel().rows.forEach((row: any) => {
        const woItem = tableDataState[row.index];
        if (woItem.quantity && woItem.quantity > 0) {
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

  const selectedWOItems = useMemo(() => {
    const selectedRows = Object.keys(rowSelection).filter(key => rowSelection[key]);
    return selectedRows.map(rowIndex => {
      const woItem = tableDataState[parseInt(rowIndex)];
      return {
        id: woItem.id,
        name: woItem.name,
        quantity: woItem.quantity
      };
    });
  }, [rowSelection, tableDataState]);

  useEffect(() => {
    if (onSelectionChange) {
      console.log('WOItemTable - Selected items:', selectedWOItems);
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
        const hasValidQuantity = woItem.quantity && woItem.quantity > 0;
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
      header: () => <span>Quantity <span className="text-red-500">*</span></span>,
      cell: ({ row }) => {
        const woItem = row.original;
        const hasValidQuantity = woItem.quantity && woItem.quantity > 0;
        const showWarning = validationWarnings[row.index];
        
        return (
          <div className="flex flex-col items-center space-y-1">
            <div className="flex justify-center">
              <Input
                type="number"
                value={row.original.quantity}
                onChange={(e) => updateField(row.original.id, 'quantity', Number(e.target.value))}
                className={`h-6 text-center w-[80px] !text-[12px] appearance-none ${
                  !hasValidQuantity ? 'border-amber-500 bg-amber-50' : ''
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
    }
  ], [updateField, handleSelectAll, handleRowToggle, renderSortIcon, validationWarnings, rowSelection]);

  const table = useReactTable({
    data: tableDataState, 
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: false,
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
    autoResetPageIndex: false,
  });

  return (
    <div className="w-full space-y-2">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <span className="text-[12px] font-sans text-foreground">Rows:</span>
          <select
            value={pagination.pageSize}
            onChange={(e) => setPagination(prev => ({ ...prev, pageSize: Number(e.target.value), pageIndex: 0 }))}
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
          {/* {selectedWOItems.length > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-[12px] font-sans text-foreground">Selected:</span>
              <Badge variant="secondary" className="text-[10px] px-1 py-0.5 h-4">
                {selectedWOItems.length}
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
            const pageIndex = pagination.pageIndex;
            const pageSize = pagination.pageSize;
            const total = table.getFilteredRowModel().rows.length;
            const from = total === 0 ? 0 : pageIndex * pageSize + 1;
            const to = Math.min(total, (pageIndex + 1) * pageSize);
            return `Showing ${from} to ${to} of ${total} entries`;
          })()}
        </div>

        <div className="flex items-center justify-end space-x-1">
          <Button variant="outline" className="h-6 w-6 p-0" onClick={() => setPagination(prev => ({ ...prev, pageIndex: 0 }))} disabled={!table.getCanPreviousPage()}>
            <ChevronsLeft className="h-3 w-3" />
          </Button>
          <Button variant="outline" className="h-6 w-6 p-0" onClick={() => setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex - 1 }))} disabled={!table.getCanPreviousPage()}>
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <span className="text-[12px] font-sans">{pagination.pageIndex + 1} / {table.getPageCount()}</span>
          <Button variant="outline" className="h-6 w-6 p-0" onClick={() => setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex + 1 }))} disabled={!table.getCanNextPage()}>
            <ChevronRight className="h-3 w-3" />
          </Button>
          <Button variant="outline" className="h-6 w-6 p-0" onClick={() => setPagination(prev => ({ ...prev, pageIndex: table.getPageCount() - 1 }))} disabled={!table.getCanNextPage()}>
            <ChevronsRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
