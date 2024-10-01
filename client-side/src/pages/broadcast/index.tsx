import React, { useState } from 'react';
import Header from '@/components/header/header';
import SideNav from '@/components/side-nav/sidenav';
import Style from './broadcast.module.css';


const Broadcast: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    // Toggle the expansion state
    const handleToggleExpand = () => {
      setIsExpanded((prevState) => !prevState);
    };
    return (
      <div>
        <Header onToggleExpand={handleToggleExpand}/>
      <div className={Style.Broadcast_container}>
        <SideNav isExpanded={isExpanded}/>  
        <h1 className={Style.main_head}>Broadcast</h1>
      </div>
      </div>
  
    )
  }
  
  export default Broadcast;
