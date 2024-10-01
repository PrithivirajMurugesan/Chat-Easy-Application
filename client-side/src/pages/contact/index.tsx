import React, { useState } from 'react';
import Header from '@/components/header/header';
import Style from './index.module.css';
import SideNav from '@/components/side-nav/sidenav';
import TabViewTable from '@/components/table-tabView/tab-view';

const Contact: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the expansion state
  const handleToggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };
  return (
    <div>
      <Header onToggleExpand={handleToggleExpand}/>
    <div className={Style.Contact_container}>
      <SideNav isExpanded={isExpanded}/>
      <TabViewTable/>

    </div>
    </div>

  )
}

export default Contact;