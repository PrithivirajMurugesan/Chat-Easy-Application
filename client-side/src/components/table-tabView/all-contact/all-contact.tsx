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
import { CustomerService } from "./CustomerService";
import { Avatar } from "primereact/avatar";
import ButtonComponent from "@/components/button";
import SliderComponent from "@/components/slider";
import ReusableTable from "@/components/table/ReusableTable";


export default function CustomersDemo() {

  const generateColumns = () => {
    return [
        { field: 'name', header: 'Name' },
        { field: 'ph.no', header: 'Phone' },
        { field: 'company', header: 'Company' },
        { field: 'date', header: 'Date' },
        { field: 'status', header: 'Status' },
        { field: 'verified', header: 'Verified' },
        { field: 'activity', header: 'Activity' },
        { field: 'representative.name', header: 'Representative' },
        { field: 'tags', header: 'Tags' },
        { field: 'createdDate', header: 'Created Date' },
        { field: 'lastUpdated', header: 'Last Updated' },
        { field: 'balance', header: 'Balance' }
    ];
};
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState<any>(null);
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
  const [representatives] = useState([
    { name: "Yes" },
    { name: "Yes" },
    { name: "No" },
    { name: "Yes" },
    { name: "No" },
    { name: "No" },
    { name: "Yes" },
    { name: "Yes" },
    { name: "No" },
    { name: "Yes" },
  ]);
  const [statuses] = useState([
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "renewal",
  ]);

  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleOpenSlider = () => {
    setIsEditMode(false);
    setIsSliderOpen(true);
  };

    // Open sidebar for updating a contact
    const handleRowClick = () => {
      setIsEditMode(true); // Set to true for updating a contact
      setIsSliderOpen(true);     // Open the sidebar
  };

  const handleCloseSlider = () => {
    setIsSliderOpen(false);
  };

  const getSeverity = (status: any) => {
    switch (status) {
      case "unqualified":
        return "danger";

      case "qualified":
        return "success";

      case "new":
        return "info";

      case "negotiation":
        return "warning";

      case "renewal":
        return null;
    }
  };

  useEffect(() => {
    CustomerService.getCustomersLarge().then((data) =>
      setCustomers(getCustomers(data) as any)
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getCustomers = (data: any) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);

      return d;
    });
  };

  const formatDate = (value: any) => {
    return value.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (value: any) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
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

  const countryBodyTemplate = (rowData: any) => {
    return (
      <div className="flex align-items-center gap-2">
        {/* <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} /> */}
        <span className="text-[14px] font-normal leading-[24px] text-[#252C32]">
          {rowData?.ph?.no}
        </span>
      </div>
    );
  };

  const representativeBodyTemplate = (rowData: any) => {
    const representative = rowData.representative;

    return (
      <div className="flex align-items-center gap-2">
        {/* <img alt={representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" /> */}
        <span
          className={`${
            representative.name === "Yes" ? "text-[#119C2B]" : "text-[#CF940A]"
          } text-[14px] font-normal leading-[24px]`}
        >
          {representative.name}
        </span>
      </div>
    );
  };

  const representativeFilterTemplate = (options: any) => {
    return (
      <React.Fragment>
        <div className="mb-3 font-bold">Agent Picker</div>
        <MultiSelect
          value={options.value}
          options={representatives}
          itemTemplate={representativesItemTemplate}
          onChange={(e) => options.filterCallback(e.value)}
          optionLabel="name"
          placeholder="Any"
          className="p-column-filter"
        />
      </React.Fragment>
    );
  };

  const representativesItemTemplate = (option: any) => {
    return (
      <div className="flex align-items-center gap-2">
        {/* <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" /> */}
        <span>{option.name}</span>
      </div>
    );
  };

  const dateBodyTemplate = (rowData: any) => {
    return formatDate(rowData.date);
  };

  const dateFilterTemplate = (options: any) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };

  const balanceBodyTemplate = (rowData: any) => {
    return formatCurrency(rowData.balance);
  };

  const balanceFilterTemplate = (options: any) => {
    return (
      <InputNumber
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    );
  };

  const statusBodyTemplate = (rowData: any) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const statusFilterTemplate = (options: any) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option: any) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const activityBodyTemplate = (rowData: any) => {
    return (
      <ProgressBar
        value={rowData.activity}
        showValue={false}
        style={{ height: "6px" }}
      ></ProgressBar>
    );
  };

  const activityFilterTemplate = (options: any) => {
    return (
      <>
        <Slider
          value={options.value}
          onChange={(e) => options.filterCallback(e.value)}
          range
          className="m-3"
        ></Slider>
        <div className="flex align-items-center justify-content-between px-2">
          <span>{options.value ? options.value[0] : 0}</span>
          <span>{options.value ? options.value[1] : 100}</span>
        </div>
      </>
    );
  };

  const actionBodyTemplate = () => {
    return <Button type="button" icon="pi pi-cog" rounded></Button>;
  };

  const nameTemplate = (rowData: any) => {
    const initials = rowData.name
      .split(" ")
      .map((name: any) => name[0])
      .join("")
      .split("")
      .shift();
    return (
      <div className="flex align-items-center">
        <Avatar
          label={initials}
          className={`${
            initials === "J" || initials === "L"
              ? "mr-2 rounded-full bg-[#FEF5FF]"
              : "mr-2 rounded-full bg-[#F5FFF7]"
          }`}
        />
        <span className="text-[14px] font-normal leading-[24px] text-[#252C32]">
          {rowData.name}
        </span>
      </div>
    );
  };

  const tagsTemplate = (rowData: any) => {
    return (
      <div>
        {rowData?.tags?.slice(0, 3).map((tag: any, index: any) => (
          <Tag
            key={index}
            value={tag}
            className={tag}
                        // {`mr-1 rounded-xl px-2 py-[2px] font-normal text-[12px] ${
            //   index < 2
            //     ? "bg-[#F9F5FF] text-blue-600"
            //     : "bg-[#FDF2FA] text-[#C11574]"
            // }`}
          />
        ))}
        {rowData?.tags?.length > 3 && (
          <Tag
            value={`+${rowData.tags.length - 3}`}
            className="bg-[#F2F4F7] text-[#344054] font-normal text-[12px] rounded-xl px-2 py-[2px]"
          />
        )}
      </div>
    );
  };

  // updated the rowClick Event in the SideBar Component

  const [updatedContact, setUpdatedContact] = useState(null);

  const [activeRow, setActiveRow] = useState(null);
  // Function to toggle the dropdown menu for a row
  const toggleOptions = (id: any) => {
    setActiveRow(activeRow === id ? null : id); // Close if it's already open
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveRow(null); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  useEffect(() => {
    
    // console.log(selectedCustomers);
  }, [selectedCustomers]);

  const actionsTemplate = (rowData: any) => {
    return (
      <div className="relative">
        <Button
          icon="pi pi-ellipsis-v"
          className="p-button-text"
          onClick={() => toggleOptions(rowData.id)}
        />
        {activeRow === rowData.id && (
          <div
            ref={dropdownRef}
            className="absolute top-9 right-3 rounded-xl md:min-w-[300px] bg-white border-solid border-[#ccc] border-[1px] p-[10px] z-50 shadow-xl"
          >
            <div className="flex gap-[10px] p-[6px]">
              <img src="assets/whatsapp-icon.svg" alt="whatsapp icon" />
              <p
                className="text-[14px] text-[#48535B]"
                onClick={() => alert(`Send message to ${rowData.phone}`)}
              >
                Send Message to {rowData.ph.no}
              </p>
            </div>
            <div className="flex gap-[10px] p-[6px]">
              <img src="assets/Delete.svg" alt="whatsapp icon" />
              <p
                className="text-[#D15757] text-[14px]"
                onClick={() => deleteContact(rowData.id)}
              >
                Delete Contact
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const deleteContact = (id: any) => {
    const updatedCustomers = customers.filter(
      (customer: any) => (customer as any).id !== id
    );
    console.log(updatedCustomers); // Update your state or handle the delete
    // Here you would update your state to remove the contact
  };

  const header = renderHeader();

  const customersDetails = CustomerService.getData();
  const columns = generateColumns();

    useEffect(() => {
        const data = CustomerService.getData(); // Fetch the data from CustomerService
        setCustomers(data as any);  // Set the data in the state
    }, []);

  return (
    <div className="card">
      <ReusableTable
       data={customersDetails} 
      columns={columns}
      // globalFilterFields={['name', 'phone']}
      
      />
      <DataTable
        value={customers}
        paginator
        header={header}
        rows={8}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]}
        dataKey="id"
        selectionMode="checkbox"
        selection={selectedCustomers}
        onSelectionChange={(e) => setSelectedCustomers(e.value)}
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={[
          "name",
          "ph.no",
          "representative.name",
          "tags",
          "status",
        ]}
        emptyMessage="No customers found."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        onRowClick={(e) => {
          handleRowClick();
          setSelectedCustomers(e.data);
        }}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        {/* if want to add filter sorted use this "-- sortable filter filterPlaceholder="Search by name"-- " */}
        <Column field="name" header="Name" body={nameTemplate} />
        {/* if want to add filter sorted use this "-- sortable filterField="country.name" filter filterPlaceholder="Search by country" -- " */}
        <Column field="ph.no" header="Phone" body={countryBodyTemplate} />
        {/* if want to add filter and sorrted use this "-- sortable sortField="representative.name" filterField="representative" filter filterElement={representativeFilterTemplate} --" */}
        <Column
          header="Marketing OPT-IN"
          showFilterMatchModes={false}
          filterMenuStyle={{ width: "14rem" }}
          body={representativeBodyTemplate}
        />
        {/* if want to add filter and sorted use this "-- sortable filterField="date" filter filterElement={dateFilterTemplate} --" */}
        <Column field="tags" header="Tags" body={tagsTemplate} />
        <Column
          field="createdDate"
          style={{ fontSize: "14px", fontWeight: "400" }}
          header="Created Date"
        />
        <Column
          field="lastUpdated"
          style={{ fontSize: "14px", fontWeight: "400" }}
          header="Last Updated"
        />
        <Column body={actionsTemplate} />
        {/* <Column field="date" header="Date" dataType="date" body={dateBodyTemplate} /> */}
      </DataTable>
    </div>
  );
}
