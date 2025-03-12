"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaBookOpen, FaFilter } from "react-icons/fa";
import { useRouter } from "next/navigation";
import BookOne from "../assets/bk1.png";
import BookTwo from "../assets/bk2.jpg";
import Image from "next/image";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const ResourceLibrary = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Expanded book data with 15+ books
  const books = [
    {
      id: 1,
      title: "The Anxiety and Phobia Workbook",
      author: "Edmund J. Bourne",
      category: "Anxiety",
      cover: BookOne,
      description: "A comprehensive guide to managing anxiety and phobias with exercises and coping strategies.",
      contentUrl: "/dashboard/books/1",
    },
    {
      id: 2,
      title: "Feeling Good: The New Mood Therapy",
      author: "David D. Burns",
      category: "Depression",
      cover: BookTwo,
      description: "A guide to cognitive therapy techniques for overcoming depression.",
      contentUrl: "/dashboard/books/2",
    },
    {
      id: 3,
      title: "The Mindful Way Through Depression",
      author: "Mark Williams",
      category: "Mindfulness",
      cover: "/assets/bk3.jpg", // Placeholder
      description: "Combines mindfulness techniques with cognitive therapy to break the cycle of depression.",
      contentUrl: "/dashboard/books/3",
    },
    {
      id: 4,
      title: "Self-Compassion: The Proven Power of Being Kind to Yourself",
      author: "Kristin Neff",
      category: "Self-Esteem",
      cover: "/assets/bk4.jpg", // Placeholder
      description: "Explores the science and practice of self-compassion for emotional resilience.",
      contentUrl: "/dashboard/books/4",
    },
    {
      id: 5,
      title: "Daring Greatly",
      author: "Brené Brown",
      category: "Self-Esteem",
      cover: "/assets/bk5.jpg", // Placeholder
      description: "How vulnerability is the key to courage, connection, and a fulfilling life.",
      contentUrl: "/dashboard/books/5",
    },
    {
      id: 6,
      title: "The Body Keeps the Score",
      author: "Bessel van der Kolk",
      category: "Trauma",
      cover: "/assets/bk6.jpg", // Placeholder
      description: "A groundbreaking look at how trauma affects the body and mind, with healing strategies.",
      contentUrl: "/dashboard/books/6",
    },
    {
      id: 7,
      title: "Man’s Search for Meaning",
      author: "Viktor E. Frankl",
      category: "Mindfulness",
      cover: "/assets/bk7.jpg", // Placeholder
      description: "A psychiatrist’s memoir on finding purpose in the face of suffering.",
      contentUrl: "/dashboard/books/7",
    },
    {
      id: 8,
      title: "Overcoming Social Anxiety and Shyness",
      author: "Gillian Butler",
      category: "Anxiety",
      cover: "/assets/bk8.jpg", // Placeholder
      description: "Practical steps to build confidence and reduce social anxiety.",
      contentUrl: "/dashboard/books/8",
    },
    {
      id: 9,
      title: "The Happiness Trap",
      author: "Russ Harris",
      category: "Mindfulness",
      cover: "/assets/bk9.jpg", // Placeholder
      description: "Using Acceptance and Commitment Therapy to escape the pursuit of happiness.",
      contentUrl: "/dashboard/books/9",
    },
    {
      id: 10,
      title: "Cognitive Behavioral Therapy Made Simple",
      author: "Seth J. Gillihan",
      category: "Depression",
      cover: "/assets/bk10.jpg", // Placeholder
      description: "A straightforward guide to CBT techniques for mental health improvement.",
      contentUrl: "/dashboard/books/10",
    },
    {
      id: 11,
      title: "The Confidence Gap",
      author: "Russ Harris",
      category: "Self-Esteem",
      cover: "/assets/bk11.jpg", // Placeholder
      description: "A guide to overcoming fear and building self-confidence.",
      contentUrl: "/dashboard/books/11",
    },
    {
      id: 12,
      title: "Anxiety Relief for Teens",
      author: "Regine Galanti",
      category: "Anxiety",
      cover: "/assets/bk12.jpg", // Placeholder
      description: "CBT-based strategies tailored for teenagers to manage anxiety.",
      contentUrl: "/dashboard/books/12",
    },
    {
      id: 13,
      title: "The Dialectical Behavior Therapy Skills Workbook",
      author: "Matthew McKay",
      category: "Emotional Regulation",
      cover: "/assets/bk13.jpg", // Placeholder
      description: "Practical exercises for managing emotions and improving relationships.",
      contentUrl: "/dashboard/books/13",
    },
    {
      id: 14,
      title: "Quiet: The Power of Introverts",
      author: "Susan Cain",
      category: "Self-Esteem",
      cover: "/assets/bk14.jpg", // Placeholder
      description: "Celebrating the strengths of introverts in a world that can’t stop talking.",
      contentUrl: "/dashboard/books/14",
    },
    {
      id: 15,
      title: "Mindfulness for Beginners",
      author: "Jon Kabat-Zinn",
      category: "Mindfulness",
      cover: "/assets/bk15.jpg", // Placeholder
      description: "An accessible introduction to mindfulness meditation practices.",
      contentUrl: "/dashboard/books/15",
    },
    {
      id: 16,
      title: "Healing the Child Within",
      author: "Charles L. Whitfield",
      category: "Trauma",
      cover: "/assets/bk16.jpg", // Placeholder
      description: "A guide to recovering from childhood trauma and rediscovering your true self.",
      contentUrl: "/dashboard/books/16",
    },
    {
      id: 17,
      title: "The Power of Now",
      author: "Eckhart Tolle",
      category: "Mindfulness",
      cover: "/assets/bk17.jpg", // Placeholder
      description: "A spiritual guide to living in the present moment for peace and fulfillment.",
      contentUrl: "/dashboard/books/17",
    },
  ];

  const categories = [
    "All",
    "Anxiety",
    "Depression",
    "Mindfulness",
    "Self-Esteem",
    "Trauma",
    "Emotional Regulation",
  ];

  // Filter books
  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen w-full bg-gray-900 text-white overflow-x-hidden p-6 md:p-12">
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-teal-600 via-indigo-700 to-purple-800 opacity-80"
        animate={{
          background: [
            "linear-gradient(45deg, #00BCD4, #3F51B5, #9C27B0)",
            "linear-gradient(45deg, #3F51B5, #9C27B0, #00BCD4)",
            "linear-gradient(45deg, #9C27B0, #00BCD4, #3F51B5)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-purple-300 mb-8 text-center"
          variants={itemVariants}
        >
          Mental Health Resource Library
        </motion.h1>

        {/* Search and Filters */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-12"
          variants={itemVariants}
        >
          {/* Search Bar */}
          <div className="relative flex-grow">
            <motion.input
              type="text"
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 pl-12 bg-teal-900/30 text-white border border-teal-400/50 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-300" size={20} />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <motion.button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-6 py-3 bg-indigo-900/50 text-indigo-200 rounded-full flex items-center gap-2 shadow-lg hover:bg-indigo-800/70 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaFilter size={16} />
              <span>{selectedCategory}</span>
            </motion.button>
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  className="absolute top-full mt-2 w-48 bg-indigo-900/90 rounded-lg shadow-xl border border-indigo-400/30 backdrop-blur-md z-20"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-indigo-200 hover:bg-indigo-700/50 transition-colors ${
                        selectedCategory === category ? "bg-indigo-600/50" : ""
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Book Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          <AnimatePresence>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <motion.div
                  key={book.id}
                  className="relative bg-gradient-to-br from-teal-900/30 to-indigo-900/30 rounded-2xl shadow-xl border border-teal-400/20 overflow-hidden cursor-pointer backdrop-blur-md"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 188, 212, 0.3)" }}
                  onClick={() => router.push(book.contentUrl)}
                >
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src={book.cover}
                      alt={book.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 hover:scale-110"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-teal-200 line-clamp-1">{book.title}</h2>
                    <p className="text-sm text-gray-300">by {book.author}</p>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">{book.description}</p>
                    <div className="flex items-center mt-3">
                      <FaBookOpen className="text-indigo-300 mr-2" />
                      <span className="text-sm text-indigo-300">{book.category}</span>
                    </div>
                  </div>
                  <motion.div
                    className="absolute inset-0 border border-teal-400/10 rounded-2xl pointer-events-none"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center text-gray-400 text-xl italic"
                variants={itemVariants}
              >
                No books found—expand your search or explore new categories!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResourceLibrary;