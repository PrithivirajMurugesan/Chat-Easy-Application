import React, { useEffect, useRef, useState } from "react";
import Style from "../side-nav/sidenav.module.css";
import {
  BroadCastIcon,
  CoversationIcon,
  CrmIcon,
  FlowIcon,
  HomeIcon,
  SequenceIcon,
  SettingIcon,
} from "../../../utils/icons";
import { useRouter } from "next/router";
import { useNav } from "@/context/NavContext";
import { Button } from "primereact/button";

// Define the type for props
interface SideNavProps {
  isExpanded: boolean; // Boolean type for expansion state
}

const SideNav: React.FC<SideNavProps> = () => {
  const profileRef = useRef<HTMLDivElement>(null); // Create a ref to detect outside clicks
  const router = useRouter();
  const [isNavItem, setIsNavItem] = useState<string | null>("conversation");

  const { isExpanded } = useNav(); // Pull the state from context

  // Sync active nav item with the current route on initial load and route change
  useEffect(() => {
    const currentRoute = router.pathname;

    switch (currentRoute) {
      case "/conversation":
        setIsNavItem("conversation");
        break;
      case "/contact":
        setIsNavItem("crm");
        break;
      // Add other route cases as needed
      case "/app":
        setIsNavItem("home");
        break;
      case "/broadcast":
        setIsNavItem("broadcast");
        break;
      case "/sequence":
        setIsNavItem("sequence");
        break;
      case "/flow":
        setIsNavItem("flow");
        break;
      case "/settings":
        setIsNavItem("settings");
        break;
      default:
        setIsNavItem(null);
    }
  }, [router.pathname]);

  const navOptions = [
    {
      name: "home",
      label: "Home",
      route: "/app",
      icon: <HomeIcon />,
    },
    {
      name: "conversation",
      label: "Conversation",
      route: "/conversation",
      icon: <CoversationIcon />,
    },
    {
      name: "crm",
      label: "CRM",
      route: "/contact",
      icon: <CrmIcon />,
    },
    {
      name: "broadcast",
      label: "Broadcast",
      route: "/broadcast",
      icon: <BroadCastIcon />,
    },
    {
      name: "sequence",
      label: "Sequence",
      route: "/sequence",
      icon: <SequenceIcon />,
    },
    {
      name: "flow",
      label: "Flow",
      route: "/flow",
      icon: <FlowIcon />,
    },
    {
      name: "settings",
      label: "Settings",
      route: "/settings",
      icon: <SettingIcon />,
    },
  ];

  const handleNavigation = (navItem: string, path: string) => {
    setIsNavItem(navItem);
    router.push(path);
  };

  // const [isExpanded, setIsExpanded] = useState(false);
  const toggleCard = () => {
    setIsHovered(!isHovered);
  };

  const [isHovered, setIsHovered] = useState(false);

  // Close the card when clicking outside
  const handleClickOutside = (event: any) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setIsHovered(false); // Hide the card if click is outside
    }
  };

  useEffect(() => {
    if (isHovered) {
      // Add event listener when the card is expanded
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove event listener when the card is collapsed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHovered]);

  return (
    <div className={Style.side_nav}>
      <div
        ref={profileRef}
        className={`${Style.side_nav_info} ${isExpanded ? Style.expanded : ""}`}
      >
        <div className={Style.main_profile} onClick={toggleCard}>
          <img src="assets/main profile.svg" alt="Main Profile Icon" />
          {isExpanded ? (
            <p className={isExpanded ? Style.expanded : ""}>Workefella</p>
          ) : (
            ""
          )}
          <img
            src="assets/main profile down arrow.svg"
            className={`${Style.main_profile_down} ${
              isExpanded ? Style.expandable_down : ""
            }`}
            alt="Main Profile Down Arrow"
          />
        </div>
        {isHovered && (
          <div className={Style.profile_card}>
            {/* Your card content here */}
            <div className={Style.main_profile_info}>
              <div className={Style.user_information}>
                <div className={Style.user_profile_dp}>
                  <img src="assets/main profile.svg" alt="Main Profile Icon" />
                </div>
                <div className={Style.user_profile_info}>
                  <span className={Style.user_profile_name}>
                    Workafella Arena
                  </span>
                  <span className={Style.user_plan}>Free Account</span>
                </div>
              </div>
              <div className={Style.user_profile_options}>
                <div className={Style.profile_options_list}>
                  <img src="assets/settings_user.svg" alt="User Settings" />
                  <span>Settings</span>
                </div>
                <div className={Style.profile_options_list}>
                  <img src="assets/manage_user.svg" alt="User Manage" />
                  <span>Manage Users</span>
                </div>
              </div>
            </div>
            <div className={Style.user_switch_profile}>
              <span className={Style.user_switch_profile_text}>
                Switch Workspace
              </span>
              <div className={Style.switch_profile_users}>
                <div className={Style.seperate_users}>
                  <div className={Style.individual_user_profile}>
                    <div className={Style.seperate_users_dp}>
                      <img src="assets/z_user.svg" alt="Z User" />
                    </div>
                    <div className={Style.seperate_users_info}>
                      <span className={Style.seperate_profile_name}>
                        ZebraLane
                      </span>
                      <div className={Style.individual_profile_info}>
                        <span className={Style.seperate_user_plan}>
                          No Active chats
                        </span>
                        <ul>
                          <li style={{ listStyle: "initial" }}>5 members</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={Style.seperate_users}>
                  <div className={Style.individual_user_profile}>
                    <div className={Style.seperate_users_dp}>
                      <img src="assets/w_user.svg" alt="W User" />
                    </div>
                    <div className={Style.seperate_users_info}>
                      <span className={Style.seperate_profile_name}>
                        Webora
                      </span>
                      <div className={Style.individual_profile_info}>
                        <span className={Style.seperate_user_plan}>
                          3 chats
                        </span>
                        <ul>
                          <li style={{ listStyle: "initial" }}>1 members</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={Style.add_workspace}>
              <div className={Style.add_new_workspace}>
                <Button
                  className={Style.add_workspace_btn}
                  label="New Workspace"
                  icon="pi pi-plus"
                />
              </div>
            </div>
          </div>
        )}
        <div className={Style.side_nav_options}>
          {navOptions.map((option, index) => (
            <div
              key={index}
              className={Style[`set_options_${Math.floor(index / 3) + 1}`]}
              style={{
                borderBottom:
                  (index + 1) % 3 === 0 ? "1px solid #E5E9EB" : "none",
              }}
            >
              <div
                className={`${Style.individual_side_nav_options} ${
                  isNavItem === option.name ? Style.active_nav : ""
                }`}
                onClick={() => handleNavigation(option.name, option.route)}
              >
                {option.icon}
                {isExpanded ? (
                  <p className={isExpanded ? Style.expanded : ""}>
                    {option.label}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
