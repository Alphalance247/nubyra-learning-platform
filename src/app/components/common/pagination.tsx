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
    <div className="flex items-center justify-center gap-6 mt-8">
      <div className="flex items-center gap-3">
        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span key={idx} className="text-gray-400">
              ...
            </span>
          ) : page === currentPage ? (
            <button
              key={idx}
              className="px-4 py-2 rounded-2xl border border-[#7B4C1F] bg-[#F5F3F0] text-black font-semibold"
              disabled
            >
              {page}
            </button>
          ) : (
            <button
              key={idx}
              onClick={() => onPageChange(page as number)}
              className="px-4 py-2 text-gray-500 hover:text-[#7B4C1F] transition-colors"
            >
              {page}
            </button>
          )
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          variant="secondary"
          className="px-6 py-3 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Prev Page
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          variant="secondary"
          className="px-6 py-3 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}
