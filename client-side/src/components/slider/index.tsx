import { Sidebar } from "primereact/sidebar";
import SideBarInfo from "../sideBarInfo";
import { useEffect, useState } from "react";

const SliderComponent = ({ isVisible, onClose, isEditMode }: any) => {
  const [isHeader, setIsHeader] = useState("Create New Contact");
  const [isSaveBtn, setIsSaveBtn] = useState("Save Contact");

  useEffect(() => {
    if (isEditMode) {
      setIsHeader("Update Contact");
      setIsSaveBtn("Update");
    } else {
      setIsHeader("Create New Contact");
      setIsSaveBtn("Save Contact");
    }
  }, [isEditMode]); // Dependency on isEditMode

  return (
    <Sidebar
      visible={isVisible}
      header={isHeader}
      icons={
        <button className="text-white text-[14px] font-normal leading-[24px] py-1 px-[12px] rounded-[6px] bg-[#6366F1]">
          {isSaveBtn}
        </button>
      }
      position="right"
      onHide={onClose}
    >
      <div className="pt-4">
        <SideBarInfo />
      </div>
    </Sidebar>
  );
};

export default SliderComponent;
