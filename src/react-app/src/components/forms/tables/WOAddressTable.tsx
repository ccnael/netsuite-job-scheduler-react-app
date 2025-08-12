
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type WOAddress } from "@/api/woAddress";
import { type Event } from "@/api/event";

interface SelectedAddress {
  id: string;
  name: string;
}

interface WOAddressTableProps {
  data: WOAddress[];
  woId: string; 
  onSelectionChange?: (selectedAddress: SelectedAddress) => void;
  onUpdate?: boolean;
  selectedEvent?: Event;
}

interface TableWOAddress {
  id: string;
  customer: string;
  address: string;
  fullAddress: string;
  events?: string[];
}

export const WOAddressTable: React.FC<WOAddressTableProps> = ({ data, woId, onSelectionChange, onUpdate, selectedEvent }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [tableDataState, setTableDataState] = useState<TableWOAddress[]>([]);

  // Fetch data on load
  useEffect(() => {
    const loadData = async () => {
      const filteredData = data;
      const mappedData = filteredData.map(woAddress => ({
        id: woAddress.id,
        customer: woAddress.customer.text,
        address: woAddress.address.text || '-',
        fullAddress: woAddress.addressDetails || '-',
        events: woAddress.events || []
      }));
      setTableDataState(mappedData);
      
      // Auto-select if only 1 row(on create only)
      if (!onUpdate && mappedData.length) {
        setSelectedRowId(mappedData[0].id);
      }
    };

    if (woId) {
      loadData();
    }
  }, [onUpdate, woId]);

  // console.log('WOAddresses', tableDataState);

  const renderSortIcon = (column: any) => {
    const isSorted = column.getIsSorted();
    if (isSorted === 'asc') return <ChevronUp className="ml-1 h-3 w-3" />;
    if (isSorted === 'desc') return <ChevronDown className="ml-1 h-3 w-3" />;
    return <ChevronsUpDown className="ml-1 h-3 w-3 text-muted-foreground" />;
  };

  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  // Auto-select rows that have an event value when onUpdate is true and data loads
  useEffect(() => {
    if (onUpdate && tableDataState.length > 0 && selectedEvent?.id) {
      const addressWithEvent = tableDataState.find(address => 
        address.events && address.events.includes(selectedEvent.id)
      );
      
      if (addressWithEvent) {
        console.log('Auto-selecting WOAddress row with event:', addressWithEvent.id);
        setSelectedRowId(addressWithEvent.id);
      }
    }
  }, [tableDataState, onUpdate, selectedEvent?.id]);

  // Memoize the selection computation to prevent infinite loops
  const selectedAddress = useMemo(() => {
    if (!selectedRowId) return null;
    const selectedAddress = tableDataState.find(addr => addr.id === selectedRowId);
    return {
      id: selectedAddress?.id || '',
      name: selectedAddress?.customer || ''
    };
  }, [selectedRowId, tableDataState]);

  // Effect to communicate selection changes to parent
  useEffect(() => {
    if (onSelectionChange) {
      // console.log('WOAddressTable - Selected addresses:', selectedAddress);
      onSelectionChange(selectedAddress);
    }
  }, [selectedAddress, onSelectionChange]);

  const columns: ColumnDef<TableWOAddress>[] = useMemo(() => [
  {
    id: "select",
      header: () => <div className="h-6 text-[12px] font-sans font-semibold text-center">Select</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center h-full">
          <RadioGroup value={selectedRowId} onValueChange={(value) => setSelectedRowId(value)}>
            <RadioGroupItem value={row.original.id} className="translate-y-[2px]" />
          </RadioGroup>
        </div>
      ),
      enableSorting: false, enableHiding: false,
    },
    {
      accessorKey: "customer",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-6 px-1 text-[12px] font-sans tracking-tight font-semibold hover:bg-muted/60">
          Customer {renderSortIcon(column)}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-foreground text-[12px] font-sans tracking-tight">{row.getValue("customer")}</div>
      ),
    },
    {
      accessorKey: "address",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-6 px-1 text-[12px] font-sans tracking-tight font-semibold hover:bg-muted/60">
          Address {renderSortIcon(column)}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-foreground text-[12px] font-sans tracking-tight">{row.getValue("address")}</div>
      ),
    },
    {
      accessorKey: "fullAddress",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-6 px-1 text-[12px] font-sans tracking-tight font-semibold hover:bg-muted/60">
          Full Address {renderSortIcon(column)}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-[12px] font-sans text-foreground tracking-tight text-center">
          {(row.getValue("fullAddress") as string).split('<br/>').map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
      ),
    },
  ], [selectedRowId]);

  const table = useReactTable({
    data: tableDataState, 
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
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
          {/* {selectedAddress.length > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-[12px] font-sans text-slate-700">Selected:</span>
              <Badge variant="secondary" className="text-[10px] px-1 py-0.5 h-4">
                {selectedAddress.length}
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
