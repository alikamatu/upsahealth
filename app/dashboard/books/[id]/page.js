// app/books/[id]/page.js
import { notFound } from "next/navigation";
import BookOne from "../../assets/bk1.png";
import BookTwo from "../../assets/bk2.jpg";
import Image from "next/image";

// Sample book data (replace with API or database call)
const books = [
    {
      id: 1,
      title: "The Anxiety and Phobia Workbook",
      author: "Edmund J. Bourne",
      category: "Anxiety",
      cover: BookOne,
      description: "A comprehensive guide to managing anxiety and phobias with exercises and coping strategies.",
      content: `
        <h2>Introduction</h2>
        <p>Anxiety is a common mental health issue that affects millions of people worldwide. This workbook provides practical tools and strategies to help you manage anxiety and phobias effectively.</p>
        
        <h2>Chapter 1: Understanding Anxiety</h2>
        <p>Learn about the different types of anxiety disorders and their symptoms.</p>
        
        <h2>Chapter 2: Coping Strategies</h2>
        <p>Explore techniques such as deep breathing, mindfulness, and cognitive-behavioral therapy.</p>
        
        <h2>Chapter 3: Exposure Therapy</h2>
        <p>Discover how gradual exposure to fears can help reduce anxiety over time.</p>
        
        <h2>Chapter 4: Lifestyle Changes</h2>
        <p>Learn about the impact of diet, exercise, and sleep on anxiety management.</p>
        
        <h2>Conclusion</h2>
        <p>By incorporating these strategies into your daily routine, you can build resilience and take control of your anxiety.</p>
      `,
    },
    {
      id: 2,
      title: "Feeling Good: The New Mood Therapy",
      author: "David D. Burns",
      category: "Depression",
      cover: BookTwo,
      description: "A guide to cognitive therapy techniques for overcoming depression.",
      content: `
        <h2>Introduction</h2>
        <p>Depression can feel overwhelming, but cognitive therapy offers a way to regain control of your thoughts and emotions.</p>
        
        <h2>Chapter 1: Identifying Negative Thoughts</h2>
        <p>Learn how to recognize and challenge negative thought patterns.</p>
        
        <h2>Chapter 2: Building Positive Habits</h2>
        <p>Discover strategies to cultivate positivity and resilience.</p>
        
        <h2>Chapter 3: The Power of Self-Talk</h2>
        <p>Understand how changing your internal dialogue can improve your mood and outlook.</p>
        
        <h2>Chapter 4: Behavioral Activation</h2>
        <p>Learn how engaging in enjoyable activities can help break the cycle of depression.</p>
        
        <h2>Conclusion</h2>
        <p>By practicing these techniques consistently, you can develop a more positive and fulfilling life.</p>
      `,
    },
  ];
  

export default function BookContent({ params }) {
  const book = books.find((book) => book.id === parseInt(params.id));

  if (!book) {
    return notFound(); // Show 404 if book is not found
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="relative w-full h-64 mb-6">
          <Image
            src={book.cover}
            alt={book.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
        <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
        <div
          className="prose prose-lg text-gray-700"
          dangerouslySetInnerHTML={{ __html: book.content }}
        />
      </div>
    </div>
  );
}