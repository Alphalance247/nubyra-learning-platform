"use client";
import React, { useEffect, useRef } from "react";
import { useFilterSortStore } from "@/stores/courses/filterSortStore";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const { data, fetchFilterOptions, loading } = useFilterSortStore();
  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch filter options
  useEffect(() => {
    if (isOpen && !data) {
      fetchFilterOptions();
    }
  }, [isOpen, data, fetchFilterOptions]);

  // Close modal on click outside
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

  // Prevent page scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // lock background scroll
    } else {
      document.body.style.overflow = "auto"; // restore scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 mt-38 flex items-start justify-center pt-6 z-50 bg-transparent">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-[800px] max-h-[80vh] overflow-y-auto transform -translate-y-6 transition-transform duration-300 ease-out"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
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

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7B4C1F]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {data && (
                <>
                  <div>
                    <p className="font-semibold text-gray-800 mb-3">
                      Filter By Category
                    </p>
                    {data.categories.map((cat: string) => (
                      <div key={cat} className="mb-2">
                        <span className="text-sm text-gray-700">{cat}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 mb-3">
                      Course Category
                    </p>
                    {data.courseCategories.map((cat: string) => (
                      <div key={cat} className="mb-2">
                        <span className="text-sm text-gray-700">{cat}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 mb-3">
                      Training Software
                    </p>
                    {data.software.map((sw: string) => (
                      <div key={sw} className="mb-2">
                        <span className="text-sm text-gray-700">{sw}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 mb-3">
                      Price Ranges
                    </p>
                    {data.priceRanges.map((range: string) => (
                      <div key={range} className="mb-2">
                        <span className="text-sm text-gray-700">{range}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
