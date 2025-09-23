"use client";
import React from "react";
import Button from "./buttons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      if (totalPages > 1) pages.push(totalPages);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-8 w-full">
      {/* Page Numbers */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span key={idx} className="text-gray-400">
              ...
            </span>
          ) : page === currentPage ? (
            <button
              key={idx}
              className="px-3 md:px-4 py-1.5 md:py-2 cursor-pointer rounded-2xl border border-[#7B4C1F] bg-[#F5F3F0] text-black font-semibold text-sm md:text-base"
              disabled
            >
              {page}
            </button>
          ) : (
            <button
              key={idx}
              onClick={() => onPageChange(page as number)}
              className="px-3 md:px-4 py-1.5 md:py-2 cursor-pointer text-gray-500 hover:text-[#7B4C1F] transition-colors text-sm md:text-base"
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Prev / Next Buttons */}
      <div className="flex items-center gap-2">
        <Button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          variant="secondary"
          className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Prev
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          variant="secondary"
          className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
