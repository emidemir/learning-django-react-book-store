import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Book from '../components/Book';
import Pagination from '../components/Pagination'; // Import the new component
import '../css/HomePage.css';

// Expanded sample book data to demonstrate pagination
const allBooks = [
    // Page 1
    { id: 1, title: 'The Midnight Library', author: 'Matt Haig', price: '15.99', cover_image: 'https://via.placeholder.com/280x420.png?text=Book+1' },
    { id: 2, title: 'Dune', author: 'Frank Herbert', price: '18.50', cover_image: 'https://via.placeholder.com/280x420.png?text=Book+2' },
    { id: 3, title: 'Project Hail Mary', author: 'Andy Weir', price: '22.00', cover_image: 'https://via.placeholder.com/280x420.png?text=Book+3' },
    { id: 4, title: 'Klara and the Sun', author: 'Kazuo Ishiguro', price: '19.99', cover_image: 'https://via.placeholder.com/280x420.png?text=Book+4' },
    { id: 5, title: 'Atomic Habits', author: 'James Clear', price: '14.75', cover_image: 'https://via.placeholder.com/280x420.png?text=Book+5' },
    { id: 6, title: 'The Silent Patient', author: 'Alex Michaelides', price: '12.99', cover_image: 'https://via.placeholder.com/280x420.png?text=Book+6' },
    // Page 2
    { id: 7, title: 'Circe', author: 'Madeline Miller', price: '16.99', cover_image: 'https://via.placeholder.com/280x420.png?text=Book+7' },
    { id: 8, title: 'The Four Winds', author: 'Kristin Hannah', price: '20.50', cover_image: 'https://via.placeholder.com/280x420.png?text=Book+8' },
    { id: 9, title: 'Where the Crawdads Sing', author: 'Delia Owens', price: '14.00', cover_image: 'https://via.placeholder.com/280x420.png?text=Book+9' },
    // Page 3
    { id: 10, title: 'Educated', author: 'Tara Westover', price: '17.99', cover_image: 'https://via.placeholder.com/280x420.png?text=Book+10' },
    { id: 11, title: 'The Vanishing Half', author: 'Brit Bennett', price: '16.25', cover_image: 'https://via.placeholder.com/280x420.png?text=Book+11' },
    { id: 12, title: 'Anxious People', author: 'Fredrik Backman', price: '18.99', cover_image: 'https://via.placeholder.com/280x420.png?text=Book+12' },
];

const BOOKS_PER_PAGE = 6;

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [displayedBooks, setDisplayedBooks] = useState([]);

    const totalPages = Math.ceil(allBooks.length / BOOKS_PER_PAGE);

    // This useEffect simulates fetching data when the page changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
        const endIndex = startIndex + BOOKS_PER_PAGE;
        setDisplayedBooks(allBooks.slice(startIndex, endIndex));

        // In the future, your API call will go here.
        // You'll pass the `currentPage` to the backend.
        // e.g., fetch(`api/books?page=${currentPage}&limit=${BOOKS_PER_PAGE}`)
        
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo(0, 0); // Scroll to top on page change
        }
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
                            <Book key={book.id} book={book} />
                        ))}
                    </div>
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;