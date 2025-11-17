import React from 'react';
import '../css/Pagination.css';

const Pagination = ({ prevPage, currentPage, nextPage, onPageChange, currentPageINT, totalPagesINT }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPagesINT; i++) {
        pageNumbers.push(i);
    }

    if (totalPagesINT <= 1) {
        return null; // Don't render pagination if there's only one page
    }

    return (
        <nav className="pagination-container">
            <ul className="pagination">
                <li className={`page-item ${!prevPage ? 'disabled' : ''}`}>
                    <button onClick={() => onPageChange(prevPage, false)} className="page-link">
                        Previous
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPageINT === number ? 'active' : ''}`}>
                        <button onClick={() => onPageChange(number, true)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${!nextPage ? 'disabled' : ''}`}>
                    <button onClick={() => onPageChange(nextPage, false)} className="page-link">
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;