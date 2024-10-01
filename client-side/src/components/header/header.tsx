import React, { useEffect, useRef, useState } from "react";
import Style from "../header/header.module.css";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useNav } from "@/context/NavContext";
import { Button } from "primereact/button";

// Define the type for props
interface HeaderProps {
  onToggleExpand: () => void; // Function type that returns nothing (void)
}

const Header: React.FC<HeaderProps> = ({ onToggleExpand }) => {
  const { isExpanded, toggleExpand } = useNav();

  // const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the background color on click
  const handleClick = () => {
    // setIsExpanded(prevState => !prevState); // Toggle state
    toggleExpand(); // Call the passed function to handle further behavior
  };

  const [isUser, setIsUser] = useState(false);
  const toggleUser = () => {
    setIsUser(!isUser);
  };

  const handleClose = () => {
    setIsUser(false);
  };

  return (
    <div className={Style.main_header}>
      <div className={Style.header_items}>
        <div className={Style.logo_expand}>
          <div className={Style.logo}>
            <img src="assets/logo.svg" alt="Logo" />
          </div>
          <div
            className={`${Style.expandable} ${
              isExpanded ? Style.expandable_active : ""
            }`}
            onClick={handleClick}
          >
            <img src="assets/expandable icon.svg" alt="Expandable icon" />
          </div>
        </div>
        <div className={Style.main_search}>
          <IconField iconPosition="right">
            <InputIcon>
              <img
                src="assets/main search icon.svg"
                alt="search icon"
                style={{ cursor: "pointer" }}
              />{" "}
            </InputIcon>
            <InputText
              v-model="value1"
              placeholder="Search"
              style={{ color: "#8C8C8C", width: "100%" }}
            />
          </IconField>
        </div>

        <div className={Style.user_credentials}>
          <div className={Style.upgrade_button}>
            <button>
              <img src="assets/upgrade icon.svg" alt="Upgrade Icon" />
              <p className="text-[13px] font-medium leading-[22px] text-[#fff]">
                Upgrade to Pro
              </p>
            </button>
          </div>
          <div className={Style.notify_icon}>
            <img src="assets/Notification icon.svg" alt="Notification icon" />
          </div>
          <div
            // ref={switchAccountRef}
            className={Style.user_interface}
            onClick={toggleUser}
          >
            <img
              src="assets/userone.png"
              alt="User Profile"
              style={{ maxWidth: "24px" }}
            />
            <img src="assets/user down arrow.svg" alt="User Down Arrow" />
          </div>

          {isUser && (
            <div className="bg-[#fff] min-w-[340px] absolute top-[50px] z-50 right-[10px] shadow-2xl rounded-lg text-black text-[12px] px-3 py-4">
              <div className="relative">
                <div
                  className="close_icon absolute top-0 right-[10px] border border-[#8C8C8C] border-solid rounded-[50px] px-[6px] pt-[7px]"
                  onClick={handleClose}
                >
                  <i className="pi pi-times" style={{ fontSize: "1rem" }}></i>
                </div>
                <div className="flex flex-col gap-[10px] items-center justify-center">
                  <h3 className="text-[14px] font-medium">Manage Accounts</h3>
                  <p className="text-[12px] text-[#8C8C8C] font-normal leading-[20px]">
                    Switch accounts or Add an accounts
                  </p>
                </div>
                <div className="flex flex-col gap-3 items-normal justify-left pt-3">
                  <div className="flex justify-between items-center gap-4 border-[2px] border-[#F6F6F7] border-solid rounded-lg p-2">
                    <div className="flex gap-2 items-center">
                      <div className="profile">
                        <img src="assets/w_user.svg" alt="" />
                      </div>
                      <div className="user_details">
                        <h4>Emmma Holand</h4>
                        <p>Emma@gmail.com</p>
                      </div>
                    </div>
                    <div className="more">
                      <i className="pi pi-ellipsis-h"></i>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-4 border-[2px] border-[#F6F6F7] border-solid rounded-lg p-2">
                    <div className="flex gap-2 items-center">
                      <div className="profile">
                        <img src="assets/z_user.svg" alt="" />
                      </div>
                      <div className="user_details">
                        <h4>Emmma ray</h4>
                        <p>EmmaRay@gmail.com</p>
                      </div>
                    </div>
                    <div className="more">
                      <i className="pi pi-ellipsis-h"></i>
                    </div>
                  </div>

                  <div className="add_account bg-[#F6F6F7] px-3 py-3 rounded-lg flex justify-center items-center">
                    <Button
                      label="Add an account"
                      className="shadow-none text-[14px] font-medium leading-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
