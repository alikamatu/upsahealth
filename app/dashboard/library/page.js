"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaBookOpen } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Import useRouter
import BookOne from "../assets/bk1.png";
import BookTwo from "../assets/bk2.jpg";
import Image from "next/image";

export default function ResourceLibrary() {
  const router = useRouter(); // Initialize useRouter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sample data for books
  const books = [
    {
      id: 1,
      title: "The Anxiety and Phobia Workbook",
      author: "Edmund J. Bourne",
      category: "Anxiety",
      cover: BookOne,
      description: "A comprehensive guide to managing anxiety and phobias with exercises and coping strategies.",
      contentUrl: "/dashboard/books/1", // Use book ID for dynamic routing
    },
    {
      id: 2,
      title: "Feeling Good: The New Mood Therapy",
      author: "David D. Burns",
      category: "Depression",
      cover: BookTwo,
      description: "A guide to cognitive therapy techniques for overcoming depression.",
      contentUrl: "/dashboard/books/2", // Use book ID for dynamic routing
    },
    // Add more book details here
  ];

  // Filtering books based on category and search term
  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mental Health Resource Library</h1>

      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 pl-10 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="Anxiety">Anxiety</option>
          <option value="Depression">Depression</option>
          <option value="Mindfulness">Mindfulness</option>
          <option value="Self-Esteem">Self-Esteem</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      {/* Book List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => router.push(book.contentUrl)} // Navigate to book content page
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800">{book.title}</h2>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                  <p className="text-sm text-gray-500 mt-2">{book.description}</p>
                  <div className="flex items-center mt-4">
                    <FaBookOpen className="text-blue-500 mr-2" />
                    <span className="text-sm text-blue-500">{book.category}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No books found for your search criteria.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}