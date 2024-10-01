import { createContext, useState, useContext, ReactNode } from "react";

// Define the types for the context values
interface NavContextType {
  isExpanded: boolean;
  toggleExpand: () => void;
}

// Create the initial context with a default value (null to handle undefined cases)
const NavContext = createContext<NavContextType | undefined>(undefined);

// Define the type for the provider's props (children must be ReactNode)
interface NavProviderProps {
  children: ReactNode;
}

// Create the NavProvider that will wrap your app
export const NavProvider = ({ children }: NavProviderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the expand/collapse state
  const toggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <NavContext.Provider value={{ isExpanded, toggleExpand }}>
      {children}
    </NavContext.Provider>
  );
};

// Hook to use the Nav context in components
export const useNav = () => {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
};
