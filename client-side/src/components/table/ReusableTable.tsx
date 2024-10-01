import React, { useRef, useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { CustomerService } from '../table-tabView/all-contact/CustomerService';

interface ReusableTableProps {
  data?: any[];
  columns?: { field: string; header: string; body?: (rowData: any) => JSX.Element }[];
  globalFilterFields?: string[];
  onRowClick?: (rowData: any) => void;
  rowsPerPageOptions?: number[];
  defaultRows?: number;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  data,
  columns,
  globalFilterFields,
  onRowClick,
  rowsPerPageOptions = [10, 25, 50],
  defaultRows = 10
}) => {
  const [filters, setFilters] = useState({
    global: { value: null },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <h4>Data Table</h4>
        <div>
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Global Search"
          />
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="card">
      <DataTable
        value={data}
        paginator
        header={header}
        rows={defaultRows}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={rowsPerPageOptions}
        globalFilterFields={globalFilterFields}
        // filters={filters}
        emptyMessage="No records found."
        onRowClick={(e) => onRowClick && onRowClick(e.data)}
      >
        {columns?.map((col, index) => (
          <Column key={index} field={col.field} header={col.header} body={col.body} />
        ))}
      </DataTable>
    </div>
  );
};

export default ReusableTable;
