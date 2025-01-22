
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Button } from "./ui/button";

function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  const fetchBooks = async (currentPage) => {
    try {
      setLoading(true);
      const endpoint = `http://openlibrary.org/search.json?q=${
        searchQuery || "all"
      }&limit=10&page=${currentPage}`;
      const response = await axios.get(endpoint);

      const filteredResults =
        response.data.docs?.filter((book) => book.title && book.author_name) || [];

      setSearchResults((prev) => [...prev, ...filteredResults]);
      setHasMore(filteredResults.length === 10);
    } catch (error) {
      console.error("Error fetching books:", error.message);
      alert("An error occurred while fetching the books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search term");
      return;
    }
    setPage(1);
    setSearchResults([]);
    fetchBooks(1);
  };

  const handleBookClick = (book) => setSelectedBook(book);
  const handleClosePopup = () => setSelectedBook(null);

  const lastBookElementRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  const SkeletonCard = () => (
    <div className="bg-gray-300 rounded-lg p-4">
      <div className="w-full h-8 bg-gray-400 rounded mb-4"></div>
      <div className="w-3/4 h-6 bg-gray-400 rounded mb-2"></div>
      <div className="w-1/2 h-6 bg-gray-400 rounded"></div>
    </div>
  );
  

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Welcome to Library Management System!
        </h1>

        {/* Search Input and Button */}
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-4 items-center mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for any Book or Author"
              className="flex-grow p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleSearch} className="shadow hover:bg-blue-600">
              Search
            </Button>
          </div>

          {/* Loader on Initial Load */}
          {loading && searchResults.length === 0 && (
            <div className="text-center text-lg">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mx-auto mb-4"></div>
              Loading books...
            </div>
          )}

          {/* Display Results or Empty State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-5">
            {searchResults.length === 0 && !loading ? (
              <p className="text-center text-lg text-gray-500">
                No results found. Please try a different search term.
              </p>
            ) : (
              searchResults.map((book, index) => (
                <div
                  key={index}
                  ref={index === searchResults.length - 1 ? lastBookElementRef : null}
                  className="p-4 bg-white rounded-md shadow border border-gray-200 cursor-pointer w-full"
                  onClick={() => handleBookClick(book)}
                >
                  <div className="text-lg font-medium text-blue-600 hover:underline truncate">
                    {book.title || "No Title Available"}
                  </div>
                  <div className="text-gray-600 truncate">
                    {book.author_name?.join(", ") || "Unknown Author"}
                  </div>
                  <div className="text-gray-500">
                    First Published: {book.first_publish_year || "Unknown Year"}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Skeleton Cards on Scroll */}
          {loading && searchResults.length > 0 && (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-5">
    {Array(5)
      .fill()
      .map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
  </div>
)}

          {/* No More Data Message */}
          {!hasMore && !loading && searchResults.length > 0 && (
            <p className="text-center text-lg text-gray-500">
              No more books to load.
            </p>
          )}
        </div>
      </div>

      {/* Book Details Popup */}
      {selectedBook && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold text-blue-600">
              {selectedBook.title}
            </h2>
            <p className="text-lg mt-2">
              <strong>Author(s): </strong>
              {selectedBook.author_name?.join(", ") || "Unknown Author"}
            </p>
            <p className="text-lg mt-2">
              <strong>First Published: </strong>
              {selectedBook.first_publish_year || "Unknown Year"}
            </p>
            <Button
              onClick={handleClosePopup}
              className="mt-4 w-full bg-red-600 hover:bg-red-700"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
