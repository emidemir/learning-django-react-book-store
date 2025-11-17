import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Book from '../components/Book';
import Pagination from '../components/Pagination'; // Import the new component
import '../css/HomePage.css';

const HomePage = () => {

    const authToken = localStorage.getItem("access_token")
    const page_size = 2; // The number of books I want to fetch at one request, pagination number query param

    const [previousPage, setPreviousPage] = useState('');
    const [currentPage, setCurrentPage] = useState(`${process.env.REACT_APP_BACKEND_URL}/books/?page=1&page_size=${page_size}`);
    const [nextPage, setNextPage] = useState();

    const [displayedBooks, setDisplayedBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(-1);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);

    useEffect(() => {
        const getBooksHomePage = async () => {
            const response = await fetch(currentPage, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                }
            })
            
            const data = await response.json()
            
            const book_amount = data.count  // Total book number in the database
            
            setTotalPages(Math.ceil(book_amount / page_size));
            setPreviousPage(data.previous);
            setNextPage(data.next);

            if (response.ok){
                setDisplayedBooks(data.results)
                
                const urlParams = new URLSearchParams(new URL(currentPage).search);
                const pageNum = parseInt(urlParams.get('page')) || 1;
                setCurrentPageNumber(pageNum);
            }else{
                alert("Failed to get book data on HomePage" + JSON.stringify(data))
            }
        }
        getBooksHomePage()
    }, [currentPage, authToken]);

    const handlePageChange = (page, intPassed) => {
        if (intPassed){
            if (page > 0 && page <= totalPages) {
                setCurrentPage(`${process.env.REACT_APP_BACKEND_URL}/books/?page=${page}&page_size=${page_size}`)
            }
        }else{
            setCurrentPage(page)
        }
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    return (
        <div className="homepage">
            <Navbar />
            
            <header className="hero-section">
                <div className="hero-content">
                    <h1>Find Your Next Great Read</h1>
                    <p>Explore our vast collection of books from every genre imaginable.</p>
                    <button className="hero-button">Browse Books</button>
                </div>
            </header>

            <main className="main-content">
                <section className="featured-books">
                    <h2 className="section-title">Featured Books</h2>
                    <div className="book-grid">
                        {displayedBooks.map(book => (
                            <Book bookID={book.id} book={book} />
                        ))}
                    </div>
                    <Pagination 
                        prevPage = {previousPage}
                        currentPage = {currentPage}
                        nextPage = {nextPage}
                        onPageChange={handlePageChange}
                        currentPageINT = {currentPageNumber}
                        totalPagesINT={totalPages}
                    />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;