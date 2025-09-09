"use client";
import React, { useState, useEffect, useRef } from "react";
import { FilterOptions, useFilterSortStore } from "@/stores/courses/filterSortStore";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

export default function FilterModal({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  currentFilters 
}: FilterModalProps) {
  const { filterOptions, fetchFilterOptions, loading } = useFilterSortStore();
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch filter options when modal opens
  useEffect(() => {
    if (isOpen && !filterOptions) {
      fetchFilterOptions();
    }
  }, [isOpen, filterOptions, fetchFilterOptions]);

  // Update local state when currentFilters change
  useEffect(() => {
    setFilters(currentFilters);
    setMinPrice(String(currentFilters.minPrice || ""));
    setMaxPrice(String(currentFilters.maxPrice || ""));
  }, [currentFilters]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const toggleFilter = (type: keyof Omit<FilterOptions, 'minPrice' | 'maxPrice'>, value: string) => {
    setFilters((prev) => {
      const isSelected = prev[type].includes(value);
      return {
        ...prev,
        [type]: isSelected
          ? prev[type].filter((item) => item !== value)
          : [...prev[type], value],
      };
    });
  };

  const handleApplyFilters = () => {
    const finalFilters = {
      ...filters,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    };
    onApplyFilters(finalFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterOptions = {
      category: [],
      courseCategory: [],
      software: [],
      price: [],
    };
    setFilters(clearedFilters);
    setMinPrice("");
    setMaxPrice("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-[800px] max-h-[80vh] overflow-y-auto"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Filter Courses</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7B4C1F]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {/* Filter By Category */}
              <div>
                <p className="font-semibold text-gray-800 mb-3">Filter By Category</p>
                {filterOptions?.categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={filters.category.includes(cat)}
                      onChange={() => toggleFilter("category", cat)}
                    />
                    <span className="text-sm text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>

              {/* Course Category */}
              <div>
                <p className="font-semibold text-gray-800 mb-3">Course Category</p>
                {filterOptions?.courseCategories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={filters.courseCategory.includes(cat)}
                      onChange={() => toggleFilter("courseCategory", cat)}
                    />
                    <span className="text-sm text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>

              {/* Training Software */}
              <div>
                <p className="font-semibold text-gray-800 mb-3">Training Software</p>
                {filterOptions?.software.map((sw) => (
                  <label key={sw} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={filters.software.includes(sw)}
                      onChange={() => toggleFilter("software", sw)}
                    />
                    <span className="text-sm text-gray-700">{sw}</span>
                  </label>
                ))}
              </div>

              {/* Filter By Price */}
              <div>
                <p className="font-semibold text-gray-800 mb-3">Filter By Price</p>
                {filterOptions?.priceRanges.map((range) => (
                  <label key={range} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      checked={filters.price.includes(range)}
                      onChange={() => toggleFilter("price", range)}
                    />
                    <span className="text-sm text-gray-700">{range}</span>
                  </label>
                ))}
                
                {/* Custom Price Range */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Custom Range</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-16 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-xs text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-16 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear All
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyFilters}
                className="px-6 py-2 bg-[#7B4C1F] text-white rounded-lg hover:bg-[#6B3F1A] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
