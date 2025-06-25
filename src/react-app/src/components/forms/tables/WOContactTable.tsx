
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
import { WOContact, fetchWOContacts } from "@/api/woContact";

interface SelectedWOContact {
  id: string;
  name: string;
}

interface WOContactTableProps { 
  woId: string; 
  onSelectionChange?: (selectedWOContacts: SelectedWOContact[]) => void;
}

export const WOContactTable: React.FC<WOContactTableProps> = ({ woId, onSelectionChange }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [tableDataState, setTableDataState] = useState<WOContact[]>([]);
  const [rowSelection, setRowSelection] = useState({});

  // Fetch data on load
  useEffect(() => {
    const loadData = async () => {
      let data = await fetchWOContacts(woId, '');
      data = data.filter(x => !x.event.length);
      const mappedData = data;
      setTableDataState(mappedData);
    };

    if (woId) {
      loadData();
    }
  }, [woId]);

  // Memoize the selection computation to prevent infinite loops
  const selectedWOContacts = useMemo(() => {
    const selectedRows = Object.keys(rowSelection).filter(key => rowSelection[key]);
    return selectedRows.map(rowIndex => {
      const contact = tableDataState[parseInt(rowIndex)];
      return {
        id: contact.id,
        name: contact.name
      };
    });
  }, [rowSelection, tableDataState]);

  // Effect to communicate selection changes to parent
  useEffect(() => {
    if (onSelectionChange) {
      console.log('WOContactTable - Selected contacts:', selectedWOContacts);
      onSelectionChange(selectedWOContacts);
    }
  }, [selectedWOContacts, onSelectionChange]);

  const renderSortIcon = (column: any) => {
    const isSorted = column.getIsSorted();
    if (isSorted === 'asc') return <ChevronUp className="ml-1 h-3 w-3" />;
    if (isSorted === 'desc') return <ChevronDown className="ml-1 h-3 w-3" />;
    return <ChevronsUpDown className="ml-1 h-3 w-3 text-slate-400" />;
  };

  const columns: ColumnDef<WOContact>[] = useMemo(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} className="translate-y-[2px]" />
      ),
      cell: ({ row }) => (
        <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} className="translate-y-[2px]" />
      ),
      enableSorting: false, enableHiding: false,
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
      accessorKey: "email",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-6 px-1 text-[12px] font-sans tracking-tight font-semibold hover:bg-slate-100/60">
          Email {renderSortIcon(column)}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-slate-900 text-[12px] font-sans tracking-tight">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "jobTitle",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-6 px-1 text-[12px] font-sans tracking-tight font-semibold hover:bg-slate-100/60">
          Job Title {renderSortIcon(column)}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-slate-900 text-[12px] font-sans tracking-tight">{row.getValue("jobTitle") || '-'}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-6 px-1 text-[12px] font-sans tracking-tight font-semibold hover:bg-slate-100/60">
          Phone # {renderSortIcon(column)}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-slate-900 text-[12px] font-sans tracking-tight">{row.getValue("phone") || '-'}</div>
      ),
    },
    {
      accessorKey: "mobilePhone",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-6 px-1 text-[12px] font-sans tracking-tight font-semibold hover:bg-slate-100/60">
          Mobile # {renderSortIcon(column)}
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-slate-900 text-[12px] font-sans tracking-tight">{row.getValue("mobilePhone") || '-'}</div>
      ),
    }
  ], []);

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
                    <TableCell key={cell.id} className="px-2 py-1 text-center text-[12px] font-sans">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={columns.length} className="h-16 text-center text-slate-500 text-[12px]">No items found.</TableCell></TableRow>
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
