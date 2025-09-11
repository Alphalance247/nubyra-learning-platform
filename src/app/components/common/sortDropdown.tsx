"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import Button from "./buttons";
import { useFilterSortStore } from "@/stores/courses/sortFilterStore";

interface SortDropdownProps {
  currentSort: string;
  onSortChange: (sort: string) => void;
}

export default function SortDropdown({
  currentSort,
  onSortChange,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data, fetchFilterOptions } = useFilterSortStore();

  // fetch sort/filter options on mount
  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  const sortOptions = data?.sorts?.length
    ? data.sorts
    : [
        { label: "Recent", value: "recent" },
        { label: "Newest to oldest", value: "newest" },
        { label: "Oldest to newest", value: "oldest" },
      ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortSelect = (sort: string) => {
    onSortChange(sort);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <Button
        variant="secondary"
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[#7B4C1F] font-medium">
          {currentSort || "Sort"}
        </span>
        <FaChevronDown
          className={`w-3 h-3 text-[#7B4C1F] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortSelect(option.value)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                currentSort === option.value
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
