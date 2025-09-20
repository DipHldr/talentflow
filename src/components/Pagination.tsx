import React from 'react';

const styleNormal = 'rounded-full border border-slate-300 py-2 px-4 text-center text-sm font-medium transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 focus:text-white focus:bg-slate-800 disabled:pointer-events-none disabled:opacity-50';
const styleActive = 'min-w-10 rounded-full bg-slate-800 py-2 px-4 text-center text-sm font-semibold text-white transition-all shadow-md';



// --- Logic to generate page numbers (moved from Playground.tsx) ---
const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, 4, '...', totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};

// --- Define the props the component needs ---
type CustomPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({currentPage,totalPages,onPageChange}:CustomPaginationProps) => {
const paginationRange = generatePagination(currentPage, totalPages);
  return (
    <div className="flex justify-center items-center space-x-2">
      <button 
        className={styleNormal}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {paginationRange.map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === 'number' ? (
            <button 
              className={currentPage === page ? styleActive : styleNormal}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ) : (
            <span className="px-4 py-2 text-slate-500">...</span>
          )}
        </React.Fragment>
      ))}

      <button 
        className={styleNormal}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
