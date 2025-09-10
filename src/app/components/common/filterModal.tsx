"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FilterOption,
  FilterValue,
  useFilterSortStore,
} from "@/stores/courses/filterSortStore";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const { data, fetchFilterOptions, loading } = useFilterSortStore();
  const modalRef = useRef<HTMLDivElement>(null);

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    if (isOpen && !data) {
      fetchFilterOptions();
    }
  }, [isOpen, data, fetchFilterOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[category] || [];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [category]: currentValues.filter((v) => v !== value),
        };
      } else {
        return {
          ...prev,
          [category]: [...currentValues, value],
        };
      }
    });
  };

  const handleClearAll = () => {
    setSelectedFilters({});
  };

  const handleApply = () => {
    console.log("Applied Filters:", selectedFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 mt-10 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-[900px] max-h-[70vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Filter Courses
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7B4C1F]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-8">
              {data?.filters.map((filterObj, idx) => {
                const key = Object.keys(filterObj)[0];
                const values: FilterValue = filterObj[key];

                return (
                  <div key={idx} className="min-w-[150px]">
                    <p className="font-semibold text-gray-800 mb-3">{key}</p>

                    {Array.isArray(values) && values.length > 0 ? (
                      (values as FilterValue).map((item, i) => {
                        const label =
                          typeof item === "string"
                            ? item
                            : (item as FilterOption).label;
                        return (
                          <label
                            key={i}
                            className="flex items-center gap-2 mb-2 text-sm text-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={
                                selectedFilters[key]?.includes(label) || false
                              }
                              onChange={() => toggleFilter(key, label)}
                              className="w-4 h-4 accent-[#7B4C1F] cursor-pointer"
                            />
                            {label}
                          </label>
                        );
                      })
                    ) : (
                      <p className="text-sm text-gray-400 italic">No options</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-4">
          <button
            onClick={handleClearAll}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 rounded-lg bg-[#7B4C1F] text-white hover:bg-[#693f1b]"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
