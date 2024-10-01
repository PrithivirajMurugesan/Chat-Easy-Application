import React, { useEffect, useRef, useState } from "react";
import Style from "./sideBar.module.css";
import { InputText } from "primereact/inputtext";
import FilterDemo from "../country-dropdown";
import { Dropdown } from "primereact/dropdown";
import { DeleteChips, TagsIcon } from "../../../utils/icons";
import { Calendar } from "primereact/calendar";

export default function SideBarInfo() {
  // contact details function starts

  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [isOwner, isSetOwner] = useState("");
  const [contactOpened, setContactOpened] = useState(true);
  const [companyOpened, setCompanyOpened] = useState(false);
  const [additionalOpened, setAdditionalOpened] = useState(false);
  const [isLead, isSetLead] = useState("");
  const [isAppoinmentDate, setIsAppoinmentDate] = useState(null);
  const [islanguage, isSetLanguage] = useState("");

  const handleContactToggle = () => {
    setContactOpened(!contactOpened);
  };

  const handleCompanyToggle = () => {
    setCompanyOpened(!companyOpened);
  };

  const handleAdditionalToggle = () => {
    setAdditionalOpened(!additionalOpened);
  };

  const owners = [
    { name: "Winson Joseph", code: "WJ" },
    { name: "Leo Kaeiser", code: "LK" },
    { name: "Sarah Thompson", code: "ST" },
    { name: "Emily Carter", code: "EC" },
    { name: "Dwight Mitchel", code: "DM" },
  ];

  const leads = [
    { name: "Sales", code: "SL" },
    { name: "Marketing", code: "MG" },
    { name: "Product", code: "PT" },
    { name: "Customer", code: "CR" },
    { name: "Team", code: "TM" },
  ];

  const languages = [
    { name: "Tamil", code: "TL" },
    { name: "English", code: "EH" },
    { name: "Malyalam", code: "ML" },
    { name: "Telungana", code: "TA" },
    { name: "French", code: "FH" },
  ];

  // add tag click function
  const tagtextref = useRef<HTMLInputElement>(null); // tag text refference
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>([]); // To store the list of tags

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTagClick = () => {
    setIsFocused(!isFocused);
    if (!isFocused) {
      // If the div becomes visible, focus the input
      setTimeout(() => {
        tagtextref.current?.focus();
      }, 0); // Timeout ensures that the div is rendered before focusing
    }
  };

  // Handle key down (specifically, pressing Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault(); // Prevent form submission if it's inside a form
      setTags([...tags, inputValue.trim()]); // Add the current value to the list of tags
      setInputValue(""); // Clear the input field after pressing Enter
    }
  };

  // Handle deleting a tag
  const handleDeleteTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index); // Remove the tag by index
    setTags(newTags); // Update the tags array
  };

  const [selectedCompany, setSelectedCompany] = useState(null);
  const companies = [
    { name: "Niram", code: "NM" },
    { name: "Pixel", code: "PL" },
    { name: "Pickmyad", code: "PA" },
    { name: "Amwhiz", code: "AW" },
  ];

  const [companyValue, setCompanyValue] = useState("");
  const [contactId, setContactId] = useState("");

  // contact details function starts

  return (
    <div className={Style.side_bar_section}>
      <div className={Style.all_sidebar_items}>
        <div className={Style.contact_info}>
          <div className={Style.contact_details} onClick={handleContactToggle}>
            <div className={Style.contact_items}>
              <img src="assets/contact icon.svg" alt="contact_icon" />
              <p className={Style.contact_head}>Contact Details</p>
            </div>
            {contactOpened ? (
              <div className={Style.contact_up_arrow}>
                <img src="assets/up-arrow.svg" alt="arrow up" />
              </div>
            ) : (
              <div className={Style.contact_down_arrow}>
                <img src="assets/arrow-down.svg" alt="arrow down" />
              </div>
            )}
          </div>
          <div
            className={`${Style.contact_sub_items} ${
              contactOpened ? Style.open_contact : Style.close_contact
            }`}
          >
            <div className={Style.contact_name}>
              <div className={Style.name_body}>
                <p className={Style.name_label}>Name *</p>
                <InputText
                  value={nameValue}
                  placeholder="Enter your name"
                  className={Style.name_field}
                  onChange={(e) => setNameValue(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={Style.phone_no}>
              <div className={Style.phone_body}>
                <div className="flex justify-between items-center">
                  <p className={Style.phone_label}>Phone Number *</p>
                  <img
                    src="assets/phone_add_icon.svg"
                    alt="Phone Add Icon"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className={Style.phone_field}>
                  <FilterDemo />
                </div>
              </div>
            </div>
            <div className={Style.contact_email}>
              <div className={Style.email_body}>
                <div className="flex items-center justify-between">
                  <p className={Style.email_label}>Email</p>
                  <img
                    src="assets/phone_add_icon.svg"
                    alt="Phone Add Icon"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <InputText
                  value={emailValue}
                  placeholder="Enter email"
                  className={Style.email_field}
                  onChange={(e) => setEmailValue(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={Style.markrting_details}>
              <div className={Style.market_head}>
                <p>Marketing Opt-In*</p>
              </div>
              <div className={Style.market_body}>
                <div className={Style.market_body_info}>
                  <p className={Style.body_content}>
                    A type of permission based marketing that involves using an
                    opt-in process to confirm email addresses
                  </p>
                </div>
                <div className={Style.market_option}>
                  <div className={Style.market_select}>
                    <select className={Style.market_choose}>
                      <option value="" disabled selected>
                        Select Yes/NO
                      </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className={Style.owner_name}>
              <div className={Style.owner_body}>
                <p className={Style.owner_label}>Contact Owner</p>
                <Dropdown
                  value={isOwner}
                  onChange={(e) => isSetOwner(e.value)}
                  options={owners}
                  optionLabel="name"
                  placeholder="Select a owner"
                  className={Style.Owner_field}
                />
              </div>
            </div>
            <div className={Style.tags_name}>
              <div className={Style.tags_body}>
                <p className={Style.tags_label}>Contact Tags</p>
                <div className={Style.tags_content}>
                  <button
                    className="flex items-center pt-[5px]"
                    id="addTag"
                    onClick={handleAddTagClick}
                  >
                    <img src="assets/add tag.svg" alt="add icon" />
                    <p className="text-[#6366F1] text-[12px] font-normal leading-[18px]">
                      Add Tag
                    </p>
                  </button>

                  {isFocused && (
                    <div
                      className={`${Style.tags_selection} ${
                        isFocused ? Style.focused : ""
                      }`}
                    >
                      <div className={Style.tags_icon}>
                        <TagsIcon className="tags_icon size-5" />
                        <input
                          type="text"
                          value={inputValue}
                          ref={tagtextref}
                          onChange={handleTagChange}
                          onKeyDown={handleKeyDown}
                          placeholder="Add a tag"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-[#e5e7eb] text-[#4b5563] py-[2px] px-[8px] rounded-[16px] text-[14px] flex items-center"
                      >
                        {tag}
                        <span
                          onClick={() => handleDeleteTag(index)}
                          className="ml-[7px] text-gray-400"
                        >
                          <img
                            src="assets/tags_clear.svg"
                            alt="Tags Clear"
                            style={{ cursor: "pointer" }}
                          />
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.company_info}>
          <div className={Style.company_details} onClick={handleCompanyToggle}>
            <div className={Style.company_items}>
              <img src="assets/company icon.svg" alt="company_icon" />
              <p className={Style.company_head}>Company Details</p>
            </div>
            {companyOpened ? (
              <div className={Style.company_up_arrow}>
                <img src="assets/up-arrow.svg" alt="arrow up" />
              </div>
            ) : (
              <div className={Style.company_down_arrow}>
                <img src="assets/arrow-down.svg" alt="arrow down" />
              </div>
            )}
          </div>
          <div
            className={`${Style.company_sub_items} ${
              companyOpened ? Style.open_company : Style.close_company
            }`}
          >
            <div className={Style.company_name}>
              <p className={Style.company_label}>Company name</p>
              <Dropdown
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.value)}
                options={companies}
                optionLabel="name"
                editable
                placeholder="Select or Create"
                className={Style.company_dropdown}
              />
            </div>

            <div className={Style.company_website}>
              <p className={Style.company_label}>Company website</p>
              <div className={Style.company_field}>
                <InputText
                  value={companyValue}
                  onChange={(e) => setCompanyValue(e.target.value)}
                  required
                  className={Style.company_input_field}
                  placeholder="website domain"
                />
                <img src="assets/company_web.svg" alt="Company Web" />
              </div>
            </div>

            <div className={Style.company_contact_id}>
              <p className={Style.contact_id_label}>Contact ID</p>
              <div className={Style.contact_id_field}>
                <InputText
                  value={contactId}
                  onChange={(e) => setContactId(e.target.value)}
                  required
                  className={Style.contact_id_input_field}
                />
                <img
                  src="assets/contact_id_copy.svg"
                  alt="Company Web"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={Style.additional_info}>
          <div
            className={Style.additional_details}
            onClick={handleAdditionalToggle}
          >
            <div className={Style.additional_items}>
              <img src="assets/basic info.svg" alt="company_icon" />
              <p className={Style.additional_head}>Additional Information</p>
            </div>
            {additionalOpened ? (
              <div className={Style.company_up_arrow}>
                <img src="assets/up-arrow.svg" alt="arrow up" />
              </div>
            ) : (
              <div className={Style.company_down_arrow}>
                <img src="assets/arrow-down.svg" alt="arrow down" />
              </div>
            )}
          </div>
          <div
            className={`${Style.additional_sub_items} ${
              additionalOpened ? Style.open_info : Style.close_info
            }`}
          >
            <div className={Style.lead_name}>
              <div className={Style.lead_body}>
                <p className={Style.lead_label}>Lead Stag</p>
                <Dropdown
                  value={isLead}
                  onChange={(e) => isSetLead(e.value)}
                  options={leads}
                  optionLabel="name"
                  placeholder="Select a Lead"
                  className={Style.lead_field}
                />
              </div>
            </div>
            <div className={Style.appointment_name}>
              <div className={Style.appoinment_body}>
                <p className={Style.appoinment_label}>Appointment date</p>
                <div className={Style.appoinment_field}>
                  <Calendar
                    value={isAppoinmentDate}
                    className={Style.appoinment_input_field}
                    placeholder="dd-mm-yy"
                    onChange={(e: any) => setIsAppoinmentDate(e.value)}
                  />
                  <img src="assets/date_icon.svg" alt="Company Web" />
                </div>
              </div>
            </div>
            <div className={Style.language_name}>
              <div className={Style.language_body}>
                <p className={Style.language_label}>Preferred Language</p>
                <Dropdown
                  value={islanguage}
                  onChange={(e) => isSetLanguage(e.value)}
                  options={languages}
                  optionLabel="name"
                  placeholder="Choose Language"
                  className={Style.language_field}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
