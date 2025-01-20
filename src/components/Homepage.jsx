// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Homepage() {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchType, setSearchType] = useState("author"); // Default search type

//   const handleAuthorsClick = () => {
//     navigate("/manageauthors");
//   };

//   const handleBooksClick = () => {
//     navigate("/managebooks");
//   };

//   const handleSearch = async () => {
//     try {
//       const endpoint =
//         searchType === "author"
//           ? `http://localhost:8080/api/books/author?authorName=${searchQuery}`
//           : `http://localhost:8080/api/books/title?title=${searchQuery}`;

//       const response = await axios.get(endpoint);
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar */}
//       <nav className="bg-blue-600 p-4 shadow-md">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <h1 className="text-white text-2xl font-bold">Library Management</h1>
//           <div className="space-x-4">
//             <button
//               onClick={handleAuthorsClick}
//               className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
//             >
//               Manage Authors
//             </button>
//             <button
//               onClick={handleBooksClick}
//               className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition duration-200"
//             >
//               Manage Books
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="flex flex-col items-center justify-center py-16">
//         <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
//           Welcome to Library Management System!
//         </h1>

//         {/* Search Bar */}
//         <div className="flex items-center space-x-4 mb-6">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search for any Book or Author"
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <select
//             value={searchType}
//             onChange={(e) => setSearchType(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg"
//           >
//             <option value="author">Author</option>
//             <option value="title">Title</option>
//           </select>
//           <button
//             onClick={handleSearch}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
//           >
//             Search
//           </button>
//         </div>

//         {/* Search Results */}
//         {searchResults.length > 0 && (
//           <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
//             <h2 className="text-xl font-bold mb-4">Search Results:</h2>
//             <ul>
//               {searchResults.map((book, index) => (
//                 <li
//                   key={index}
//                   className="p-2 border-b border-gray-300 last:border-b-0"
//                 >
//                   <strong>{book.title}</strong> - {book.authorName}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Homepage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const endpoint = `http://openlibrary.org/search.json?q=all&limit=50`;
        const response = await axios.get(endpoint);
        const filteredResults =
          response.data.docs?.filter((book) => book.title && book.author_name) ||
          [];
        setSearchResults(filteredResults);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching initial data:", error.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search term");
      return;
    }

    try {
      setLoading(true);
      const query = encodeURIComponent(searchQuery);
      const endpoint = `http://openlibrary.org/search.json?q=${query}&limit=50`;
      const response = await axios.get(endpoint);

      const filteredResults =
        response.data.docs?.filter((book) => book.title && book.author_name) ||
        [];
      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      alert("An error occurred while fetching the data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="flex flex-col items-center justify-center py-16">
             <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
               Welcome to Library Management System!
            </h1>
          <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Search Books</h1>
        <div className="flex gap-4 items-center mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for any Book or Author"
            className="flex-grow p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleSearch}
            className="shadow hover:bg-blue-600"
          >
            Search
          </Button>
        </div>

        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : searchResults.length > 0 ? (
          <ul className="space-y-4">
            {searchResults.map((book, index) => (
              <li
                key={index}
                className="p-4 bg-white rounded-md shadow border border-gray-200"
              >
                <strong className="block text-lg font-medium text-gray-700">
                  {book.title || "No Title Available"}
                </strong>
                <span className="text-gray-600">
                  {book.author_name?.join(", ") || "Unknown Author"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg text-red-500">
            No results found. Try a different search term.
          </p>
        )}
      </div>
    </div>
    </div>
  );
}

export default Homepage;



