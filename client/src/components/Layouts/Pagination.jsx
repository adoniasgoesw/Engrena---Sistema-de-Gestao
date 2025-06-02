import React from 'react';

const PaginatorJRX = ({ totalItems, itemsPerPage = 5, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 2) return [1, 2, 3];
    if (currentPage >= totalPages - 1) return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-end px-4 mt-6 pb-2">
      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 shadow-sm">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="text-gray-500 hover:text-blue-600 disabled:opacity-30 transition duration-200"
        >
          &#x276E;
        </button>

        {getPageNumbers().map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition 
              ${currentPage === num
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-700 hover:bg-blue-200 hover:text-blue-800'}`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="text-gray-500 hover:text-blue-600 disabled:opacity-30 transition duration-200"
        >
          &#x276F;
        </button>
      </div>
    </div>
  );
};

export default PaginatorJRX;
