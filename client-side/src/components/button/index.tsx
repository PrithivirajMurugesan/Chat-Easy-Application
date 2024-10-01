const ButtonComponent = ({ onClick  } : any) => {
    return (
      <button
        className="flex gap-2 items-center bg-[#6366F1] py-1 px-2 rounded-[6px]"
        onClick={onClick}
      >
        <img src="assets/add-contact-icon.svg" alt="Add Contact Icon" />
        <span className="text-[14px] text-white font-normal">Add Contact</span>
      </button>
    );
  };
  
  export default ButtonComponent;
  