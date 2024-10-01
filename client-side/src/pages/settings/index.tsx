import React, { useState } from 'react';
import Header from '@/components/header/header';
import SideNav from '@/components/side-nav/sidenav';
import Style from './settings.module.css';

const Settings: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    // Toggle the expansion state
    const handleToggleExpand = () => {
      setIsExpanded((prevState) => !prevState);
    };
    return (
      <div>
        <Header onToggleExpand={handleToggleExpand}/>
      <div className={Style.Settings_container}>
        <SideNav isExpanded={isExpanded}/>  
        <h1 className={Style.main_head}>Settings</h1>
      </div>
      </div>
  
    )
  }
  
  export default Settings;
