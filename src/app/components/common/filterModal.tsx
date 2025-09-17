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
  onChange?: (filters: Record<string, string[]>) => void;
}

export default function FilterModal({
  isOpen,
  onClose,
  onChange,
}: FilterModalProps) {
  const { data, loading } = useFilterSortStore();
  console.log("data modal", data);
  const modalRef = useRef<HTMLDivElement>(null);
  const didMountRef = useRef(false);

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

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

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    // Exclude hidden categories from emitted filters
    const cleaned = Object.fromEntries(
      Object.entries(selectedFilters).filter(([key]) => {
        const lowered = key.toLowerCase().trim();
        const isExcluded =
          lowered.includes("authors") || lowered.includes("type");
        return !isExcluded;
      })
    );
    if (onChange) onChange(cleaned);
  }, [selectedFilters, onChange]);

  if (!isOpen) return null;

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[category] || [];
      const next = currentValues.includes(value)
        ? { ...prev, [category]: currentValues.filter((v) => v !== value) }
        : { ...prev, [category]: [...currentValues, value] };
      return next;
    });
  };

  // Footer removed; applying filters on each change

  return (
    <div className="fixed px-4 inset-0 mt-10 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white  rounded-xl w-[300px] shadow-2xl md:w-[900px] max-h-[70vh] overflow-hidden flex flex-col"
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
            <div className="flex flex-col md:flex-row justify-between md:gap-2 lg:gap-8  gap-8 w-full">
              {(data?.filters || [])
                .filter((filterObj) => {
                  const key = Object.keys(filterObj)[0];
                  const lowered = key?.toLowerCase().trim();
                  const isExcluded =
                    lowered.includes("authors") ||
                    // lowered.includes("engineering field") ||
                    lowered.includes("type");
                  return !isExcluded;
                })
                .map((filterObj, idx) => {
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
                        <p className="text-sm text-gray-400 italic">
                          No options
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Footer removed: filters apply on change */}
      </div>
    </div>
  );
}
