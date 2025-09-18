'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Tab { label: string; key: string; }

interface TabNavigationProps {
  tabs: Tab[];
  onTabChange?: (activeKey: string) => void;
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, onTabChange, className }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = (key: string) => {
    setActiveTab(key);
    setShowDropdown(false);
    onTabChange?.(key);
  };

  return (
    <div className={`${className}`}>
      {/* Mobile dropdown */}
      <div className="sm:hidden relative px-4 py-2">
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="flex items-center justify-between w-full border rounded-md px-3 py-2 text-sm font-medium text-gray-700"
        >
          {tabs.find((t) => t.key === activeTab)?.label}
          <ChevronDown className="w-4 h-4" />
        </button>

        {showDropdown && (
          <ul className="absolute left-4 right-4 mt-2 bg-white border rounded-md shadow-lg z-10">
            {tabs.map((tab) => (
              <li
                key={tab.key}
                onClick={() => handleClick(tab.key)}
                className={`px-3 py-2 cursor-pointer text-sm hover:bg-gray-50 ${
                  activeTab === tab.key ? 'text-[#7B4C1F] font-semibold' : 'text-gray-700'
                }`}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop tabs */}
      <ul className="hidden sm:flex relative px-4">
        {/* background bottom border (covered by active underline when active) */}
        <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-gray-200 z-0" />

        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <li
              key={tab.key}
              tabIndex={0}
              onClick={() => handleClick(tab.key)}
              onKeyDown={(e) => e.key === 'Enter' && handleClick(tab.key)}
              className={`relative cursor-pointer whitespace-nowrap px-4 py-3 text-sm md:text-base font-medium transition-colors z-10
                ${isActive ? 'text-[#7B4C1F]' : 'text-gray-600 hover:text-gray-800'}`}
            >
              {tab.label}

              {/* active underline that sits above the background border */}
              {isActive && (
                <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#7B4C1F] rounded z-20" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TabNavigation;
