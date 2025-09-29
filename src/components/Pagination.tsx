interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (val: number) => void;
  }
  
  export const Pagination = ({ currentPage, totalPages, setCurrentPage }: PaginationProps) => {
    if (totalPages <= 1) return null;
  
    return (
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 rounded-[15px] border border-gray-400"
        >
          Prev
        </button>
        <span className="text-sm text-gray-900">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 rounded-[15px] border border-gray-400"
        >
          Next
        </button>
      </div>
    );
  };
  