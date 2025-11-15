import React from 'react';
import '../css/Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    if (totalPages <= 1) {
        return null; // Don't render pagination if there's only one page
    }

    return (
        <nav className="pagination-container">
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button onClick={() => onPageChange(currentPage - 1)} className="page-link">
                        Previous
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => onPageChange(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button onClick={() => onPageChange(currentPage + 1)} className="page-link">
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;