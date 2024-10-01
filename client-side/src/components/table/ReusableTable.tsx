import React, { useRef, useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface ColumnProps {
  field: string;
  header: string;
  body?: (rowData: any) => JSX.Element | string; // For custom rendering of column cells
  sortable?: boolean;
  className?: string;
}

interface ReusableTableProps {
  data: any[]; // The array of objects representing the data for the table
  columns: ColumnProps[]; // The array of column definitions
  header?: string | JSX.Element; // The optional header for the table
  paginator?: boolean; // To enable or disable pagination
  defaultRows?: number; // The default number of rows to display
  rowsPerPageOptions?: number[]; // Options for rows per page dropdown
  filters?: Record<string, any>; // Filter meta for the table (e.g., global filter)
  globalFilterFields?: string[]; // Fields to apply global filtering to
  emptyMessage?: string; // Message to display when no records are found
  onRowClick?: (data: any) => void; // Optional event handler for row clicks
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  data,
  header,
  paginator = true,
  columns,
  filters,
  emptyMessage = "No records found.",
  globalFilterFields,
  onRowClick,
  rowsPerPageOptions = [10, 25, 50],
  defaultRows = 10,
}) => {
  return (
    <div className="card">
      <DataTable
        value={data}
        paginator={paginator}
        header={header}
        rows={defaultRows}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={rowsPerPageOptions}
        globalFilterFields={globalFilterFields}
        filters={filters}
        emptyMessage={emptyMessage}
        onRowClick={(e) => onRowClick && onRowClick(e.data)}
      >
        {columns?.map((col, index) => (
          <Column
            className={col.className}
            key={index}
            field={col.field}
            header={col.header}
            body={col.body}
            sortable={col.sortable}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default ReusableTable;
