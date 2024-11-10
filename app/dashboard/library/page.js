"use client"
import { useState } from 'react';
import BookOne from '../assets/bk1.png'
import BookTwo from '../assets/bk2.jpg'
import Image from 'next/image';

export default function ResourceLibrary() {
    // Sample data for books
    const books = [
        { 
            id: 1, 
            title: "The Anxiety and Phobia Workbook", 
            author: "Edmund J. Bourne", 
            category: "Anxiety",
            cover: BookOne,
            description: "A comprehensive guide to managing anxiety and phobias with exercises and coping strategies.",
            contentUrl: "/books/anxiety-phobia-workbook"
        },
        { 
            id: 2, 
            title: "Feeling Good: The New Mood Therapy", 
            author: "David D. Burns", 
            category: "Depression",
            cover: BookTwo,
            description: "A guide to cognitive therapy techniques for overcoming depression.",
            contentUrl: "/books/feeling-good-new-mood-therapy"
        },
        // Add more book details here
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Filtering books based on category and search term
    const filteredBooks = books.filter(book => {
        const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="flex flex-col p-6">
            <h1 className="text-3xl font-semibold mb-4">Mental Health Resource Library</h1>

            {/* Search and Category Filters */}
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border px-4 py-2 rounded-md flex-grow bg-transparent"
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border px-4 py-2 rounded-md text-black"
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
            <div className="flex items-start justify-start gap-4">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                        <div
                            key={book.id}
                            className="hover:shadow-lg cursor-pointer w-[250px]"
                            onClick={() => window.location.href = book.contentUrl} // Navigate to book content
                        >
                            <div className="overflow-hidden w-[250px] h-[300px]">
                            <Image className='object-cover' src={book.cover} alt='Book Cover' />
                            </div>
                            <h2 className="text-sm font-bold">{book.title}</h2>
                            <p className="text-xs text-gray-600">by {book.author}</p>
                            <p className="text-sm mt-2 text-gray-500">{book.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No books found for your search criteria.</p>
                )}
            </div>
        </div>
    );
}
