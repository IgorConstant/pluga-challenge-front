import React from "react";

interface PaginationProps {
  page: number;
  maxPage: number;
  setPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, maxPage, setPage }) => (
  <div className="join">
    <button
      onClick={() => setPage(Math.max(page - 1, 1))}
      className={`join-item btn ${page === 1 ? "btn-disabled" : ""}`}
    >
      ⬅
    </button>
    {Array.from({ length: maxPage }, (_, i) => i + 1).map((i) => (
      <button
        key={`p${i}`}
        onClick={() => setPage(i)}
        className={`join-item btn ${i === page ? "btn-active" : ""}`}
      >
        {i}
      </button>
    ))}
    <button
      onClick={() => setPage(Math.min(page + 1, maxPage))}
      className={`join-item btn ${page === maxPage ? "btn-disabled" : ""}`}
    >
      ➡
    </button>
  </div>
);
