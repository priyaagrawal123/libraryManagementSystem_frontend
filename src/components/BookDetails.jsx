// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import ContentLoader from "react-content-loader";

// function BookDetails() {
//   const { bookId } = useParams();
//   const [bookDetails, setBookDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBookDetails = async () => {
//       try {
//         setLoading(true);
//         const endpoint = `http://openlibrary.org/search.json?title=${bookId}`;
//         const response = await axios.get(endpoint);

//         if (response.data.docs && response.data.docs.length > 0) {
//           setBookDetails(response.data.docs[0]);
//         } else {
//           setBookDetails(null);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching book details:", error.message);
//         setLoading(false);
//       }
//     };

//     if (bookId) {
//       fetchBookDetails();
//     }
//   }, [bookId]);

//   if (loading) {
//     return (
//       <div className="max-w-4xl mx-auto py-16">
//         <h1 className="text-2xl font-bold mb-6">Loading Book Details...</h1>
//         <div className="grid grid-cols-2 gap-4">
//           {Array.from({ length: 4 }).map((_, index) => (
//             <SkeletonCard key={index} />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (!bookDetails) {
//     return <p>No book details available.</p>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto py-16">
//       <div className="bg-white p-8 rounded-md shadow-md">
//         <h1 className="text-4xl font-bold text-center mb-4">
//           {bookDetails.title || "No Title Available"}
//         </h1>
//         <h2 className="text-xl font-semibold text-center mb-4">
//           {bookDetails.author_name?.join(", ") || "Unknown Author"}
//         </h2>
//         <div className="space-y-2">
//           <p>
//             <strong>Published Year:</strong> {bookDetails.first_publish_year || "Not Available"}
//           </p>
//           <p>
//             <strong>Description:</strong>{" "}
//             {bookDetails.cover_edition_key ? "Cover Image Available" : "No description available."}
//           </p>
//           <p>
//             <strong>Subjects:</strong> {bookDetails.subject?.join(", ") || "Not Available"}
//           </p>
//         </div>
//         {bookDetails.cover_i && (
//           <div className="text-center mt-4">
//             <img
//               src={`http://covers.openlibrary.org/b/id/${bookDetails.cover_i}-L.jpg`}
//               alt={bookDetails.title}
//               className="w-48 h-72 object-cover mx-auto"
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Skeleton Loader Component
// const SkeletonCard = () => (
//   <div className="bg-white rounded-lg shadow-lg p-4">
//     <ContentLoader
//       speed={2}
//       width={200}
//       height={300}
//       viewBox="0 0 200 300"
//       backgroundColor="#f3f3f3"
//       foregroundColor="#ecebeb"
//     >
//       {/* Book Cover */}
//       <rect x="0" y="0" rx="4" ry="4" width="128" height="192" />
//       {/* Title */}
//       <rect x="0" y="210" rx="4" ry="4" width="160" height="16" />
//       {/* Subtitle */}
//       <rect x="0" y="240" rx="4" ry="4" width="100" height="12" />
//     </ContentLoader>
//   </div>
// );

// export default BookDetails;

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