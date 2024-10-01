import React, { useState, useEffect, useRef } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Slider } from "primereact/slider";
import { Tag } from "primereact/tag";
import { Avatar } from "primereact/avatar";
import ButtonComponent from "@/components/button";
import SliderComponent from "@/components/slider";
import { Contacts } from "./CustomerService";
import ReusableTable from "@/components/table/ReusableTable";
import { Badge } from "primereact/badge";
import Style from "./all-contact.module.css";

export default function CustomersDemo() {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "ph.no": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    balance: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleOpenSlider = () => {
    setIsEditMode(false);
    setIsSliderOpen(true);
  };

  // Open sidebar for updating a contact
  const handleRowClick = () => {
    setIsEditMode(true); // Set to true for updating a contact
    setIsSliderOpen(true); // Open the sidebar
  };

  const handleCloseSlider = () => {
    setIsSliderOpen(false);
  };

  const [isInputVisible, setIsInputVisible] = useState(false); // State to toggle input visibility
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Toggle the input field visibility when the icon is clicked
  const handleIconClick = () => {
    setIsInputVisible(!isInputVisible);
  };

  useEffect(() => {
    if (isInputVisible && searchInputRef.current) {
      searchInputRef.current.focus(); // Focus the input field when visible
    }
  }, [isInputVisible]); // Run effect when visibility changes

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-wrap justify-content-between align-items-center">
        <div className="flex gap-3 items-center">
          <h4 className="m-0">All Contacts</h4>
          <button className="bg-[#F9F5FF] px-[8px] py-[2px] text-[12px] text-[#6941C6] leading-[18px] font-medium rounded-[16px]">
            240 Contacts
          </button>
        </div>
        <div className="flex gap-[16px]">
          <div className="border-r-[#E5E9EB] border-r-[1px] border-solid pr-4">
            <IconField
              iconPosition="right"
              //   className="px-2 py-[5px] rounded-3xl border-[#E5E9EB] border-[1px] border-solid"
            >
              <InputIcon
                className={`pi pi-search cursor-pointer`}
                onClick={handleIconClick}
              />
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isInputVisible ? "md:w-full" : "md:w-0"
                }`}
              >
                <InputText
                  ref={searchInputRef}
                  value={globalFilterValue}
                  className={`pl-2 text-[14px] font-medium transition-all duration-300 ease-in-out ${
                    isInputVisible ? "md:w-40" : "md:w-0"
                  }`} // Adjust width during expansion
                  onChange={onGlobalFilterChange}
                  placeholder="Search"
                  style={{
                    width: isInputVisible ? "180px" : "0", // Change the width as per visibility
                    padding: isInputVisible ? "5px" : "5px",
                    border: isInputVisible ? "1px solid #6366F1" : "none",
                    borderRadius: "10px",
                    transition: "width 0.3s ease, padding 0.3s ease",
                  }}
                />
              </div>
            </IconField>
          </div>
          <div className="flex gap-3 items-center pr-4 border-r-[#E5E9EB] border-r-[1px] border-solid">
            <div className="p-[6px] cursor-pointer hover:bg-[#F7F5FF] rounded-lg">
              <img src="assets/contact-filter.svg" alt="Filter icon" />
            </div>
            <div className="p-[6px] cursor-pointer hover:bg-[#F7F5FF] rounded-lg">
              <img src="assets/contact-download.svg" alt="Download icon" />
            </div>
            <div className="p-[6px] cursor-pointer hover:bg-[#F7F5FF] rounded-lg">
              <img src="assets/contact-refresh.svg" alt="Refresh icon" />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button className="flex gap-2 items-center bg-[#F7F5FF] py-1 px-2 rounded-[6px] pr-4">
              <img src="assets/contact-import.svg" alt="Import Icon" />
              <span className="text-[#6366F1] text-[14px] font-normal">
                Import
              </span>
            </button>
            <ButtonComponent onClick={handleOpenSlider} />
            <SliderComponent
              isVisible={isSliderOpen}
              onClose={handleCloseSlider}
              isEditMode={isEditMode}
            />
          </div>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  const [filteredContacts, setFilteredContacts] = useState(Contacts);

  const columns = [
    {
      field: "name",
      header: "Name",
      className: Style["name_column"],
    },
    {
      field: "phone",
      header: "Phone",
      className: Style["phone_column"],
    },
    {
      field: "optIn",
      header: "Marketing OPT-IN",
      className: Style["option_column"],
      body: (rowData: any) => (
        <span style={{ color: rowData.optIn === "Yes" ? "green" : "orange" }}>
          {rowData.optIn}
        </span>
      ),
    },
    {
      field: "tags",
      header: "Tags",
      className: Style["tags_column"],
      body: (rowData: any) => (
        <div>
          {rowData?.tags?.slice(0, 3).map((tag: any, index: any) => (
            <Tag
              key={index}
              value={tag}
              className={`${Style.tags_batches} ${tag.toLowerCase()}`}
            />
          ))}
          {rowData?.tags?.length > 3 && (
            <Tag
              value={`+${rowData.tags.length - 3}`}
              className="bg-[#F2F4F7] text-[#344054] font-normal text-[12px] rounded-xl px-2 py-[2px]"
            />
          )}
        </div>
      ),
    },
    {
      field: "createdDate",
      header: "Created Date",
      className: Style["created_column"],
      body: (rowData: any) => rowData.createdDate,
    },
    {
      field: "lastUpdated",
      header: "Last Updated",
      className: Style["updated_column"],
      body: (rowData: any) => rowData.lastUpdated,
    },
  ];

  return (
    <div className="card">
      <ReusableTable
        data={filteredContacts}
        columns={columns}
        header={header}
        onRowClick={handleRowClick}
        // selectionMode='multiple'
        // globalFilterFields={['name', 'phone']}
      />
    </div>
  );
}
