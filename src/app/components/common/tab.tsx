'use client';

import React, { useState } from 'react';

interface Tab {
  label: string;
  key: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  onTabChange?: (activeKey: string) => void;
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, onTabChange, className }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const handleClick = (key: string) => {
    setActiveTab(key);
    onTabChange?.(key);
  };

  return (
    <div className={`h-[56px] border-b border-gray-200 ${className}`}>
      <ul className="flex space-x-8 px-4 py-4">
        {tabs.map((tab) => (
          <li
            key={tab.key}
            onClick={() => handleClick(tab.key)}
            className={`pb-3.5 cursor-pointer text-base font-inter font-medium ${
              activeTab === tab.key
                ? 'text-[#7B4C1F] border-b-2 border-[#7B4C1F]'
                : 'text-[#413B35] font-normal'
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabNavigation;
