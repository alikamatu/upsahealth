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
  {
    id: 3,
    title: "The Mindful Way Through Depression",
    author: "Mark Williams",
    category: "Mindfulness",
    cover: "/assets/bk3.jpg", // Placeholder
    description: "Combines mindfulness techniques with cognitive therapy to break the cycle of depression.",
    content: `
      <h2>Introduction</h2>
      <p>Mindfulness offers a path to freedom from the grip of depression by fostering present-moment awareness.</p>
      
      <h2>Chapter 1: The Roots of Depression</h2>
      <p>Explore how rumination fuels depressive cycles.</p>
      
      <h2>Chapter 2: Mindfulness Basics</h2>
      <p>Learn foundational mindfulness practices to anchor yourself in the now.</p>
      
      <h2>Chapter 3: Breaking the Cycle</h2>
      <p>Discover how to interrupt negative thought patterns with awareness.</p>
      
      <h2>Chapter 4: Daily Practices</h2>
      <p>Incorporate mindfulness into your routine for lasting change.</p>
      
      <h2>Conclusion</h2>
      <p>Embrace mindfulness to find peace and reclaim your life from depression.</p>
    `,
  },
  {
    id: 4,
    title: "Self-Compassion: The Proven Power of Being Kind to Yourself",
    author: "Kristin Neff",
    category: "Self-Esteem",
    cover: "/assets/bk4.jpg", // Placeholder
    description: "Explores the science and practice of self-compassion for emotional resilience.",
    content: `
      <h2>Introduction</h2>
      <p>Self-compassion is a transformative tool for emotional well-being.</p>
      
      <h2>Chapter 1: What is Self-Compassion?</h2>
      <p>Understand the three core components of self-compassion.</p>
      
      <h2>Chapter 2: The Science Behind It</h2>
      <p>Explore research showing its benefits for mental health.</p>
      
      <h2>Chapter 3: Practical Exercises</h2>
      <p>Learn techniques to cultivate self-kindness.</p>
      
      <h2>Chapter 4: Overcoming Obstacles</h2>
      <p>Address common barriers to self-compassion.</p>
      
      <h2>Conclusion</h2>
      <p>Build a compassionate relationship with yourself for a stronger you.</p>
    `,
  },
  {
    id: 5,
    title: "Daring Greatly",
    author: "Brené Brown",
    category: "Self-Esteem",
    cover: "/assets/bk5.jpg", // Placeholder
    description: "How vulnerability is the key to courage, connection, and a fulfilling life.",
    content: `
      <h2>Introduction</h2>
      <p>Vulnerability is not weakness—it's the birthplace of courage.</p>
      
      <h2>Chapter 1: The Myth of Vulnerability</h2>
      <p>Debunking misconceptions about emotional exposure.</p>
      
      <h2>Chapter 2: Shame Resilience</h2>
      <p>Learn to navigate shame and build strength.</p>
      
      <h2>Chapter 3: Embracing Vulnerability</h2>
      <p>Practical steps to live wholeheartedly.</p>
      
      <h2>Chapter 4: Connection and Courage</h2>
      <p>How vulnerability fosters deeper relationships.</p>
      
      <h2>Conclusion</h2>
      <p>Dare greatly to live a bold, authentic life.</p>
    `,
  },
  {
    id: 6,
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    category: "Trauma",
    cover: "/assets/bk6.jpg", // Placeholder
    description: "A groundbreaking look at how trauma affects the body and mind, with healing strategies.",
    content: `
      <h2>Introduction</h2>
      <p>Trauma leaves a lasting imprint—understanding it is the first step to healing.</p>
      
      <h2>Chapter 1: The Impact of Trauma</h2>
      <p>How trauma rewires the brain and body.</p>
      
      <h2>Chapter 2: The Science of Recovery</h2>
      <p>Explore cutting-edge research on trauma treatment.</p>
      
      <h2>Chapter 3: Body-Based Therapies</h2>
      <p>Learn about yoga, EMDR, and other somatic approaches.</p>
      
      <h2>Chapter 4: Reclaiming Your Life</h2>
      <p>Strategies to move forward from trauma.</p>
      
      <h2>Conclusion</h2>
      <p>Heal your body and mind to reclaim your story.</p>
    `,
  },
  {
    id: 7,
    title: "Man’s Search for Meaning",
    author: "Viktor E. Frankl",
    category: "Mindfulness",
    cover: "/assets/bk7.jpg", // Placeholder
    description: "A psychiatrist’s memoir on finding purpose in the face of suffering.",
    content: `
      <h2>Introduction</h2>
      <p>Purpose can sustain us through the darkest times.</p>
      
      <h2>Chapter 1: Life in the Camps</h2>
      <p>A firsthand account of surviving the Holocaust.</p>
      
      <h2>Chapter 2: Logotherapy</h2>
      <p>Discover a therapy focused on meaning.</p>
      
      <h2>Chapter 3: Finding Purpose</h2>
      <p>Practical ways to uncover your life’s meaning.</p>
      
      <h2>Chapter 4: Resilience Through Meaning</h2>
      <p>How purpose fosters strength.</p>
      
      <h2>Conclusion</h2>
      <p>Live with meaning, no matter the circumstances.</p>
    `,
  },
  {
    id: 8,
    title: "Overcoming Social Anxiety and Shyness",
    author: "Gillian Butler",
    category: "Anxiety",
    cover: "/assets/bk8.jpg", // Placeholder
    description: "Practical steps to build confidence and reduce social anxiety.",
    content: `
      <h2>Introduction</h2>
      <p>Social anxiety doesn’t have to hold you back.</p>
      
      <h2>Chapter 1: Understanding Social Anxiety</h2>
      <p>What it is and why it happens.</p>
      
      <h2>Chapter 2: Cognitive Techniques</h2>
      <p>Challenge anxious thoughts effectively.</p>
      
      <h2>Chapter 3: Social Skills</h2>
      <p>Build confidence in social settings.</p>
      
      <h2>Chapter 4: Facing Fears</h2>
      <p>Gradual exposure to overcome shyness.</p>
      
      <h2>Conclusion</h2>
      <p>Step into social situations with newfound ease.</p>
    `,
  },
  {
    id: 9,
    title: "The Happiness Trap",
    author: "Russ Harris",
    category: "Mindfulness",
    cover: "/assets/bk9.jpg", // Placeholder
    description: "Using Acceptance and Commitment Therapy to escape the pursuit of happiness.",
    content: `
      <h2>Introduction</h2>
      <p>Chasing happiness can trap us—acceptance sets us free.</p>
      
      <h2>Chapter 1: The Happiness Myth</h2>
      <p>Why striving for constant happiness fails.</p>
      
      <h2>Chapter 2: Acceptance</h2>
      <p>Learn to accept discomfort for peace.</p>
      
      <h2>Chapter 3: Values-Driven Living</h2>
      <p>Focus on what truly matters to you.</p>
      
      <h2>Chapter 4: Mindfulness in Action</h2>
      <p>Practical ACT exercises.</p>
      
      <h2>Conclusion</h2>
      <p>Live a rich life beyond the happiness trap.</p>
    `,
  },
  {
    id: 10,
    title: "Cognitive Behavioral Therapy Made Simple",
    author: "Seth J. Gillihan",
    category: "Depression",
    cover: "/assets/bk10.jpg", // Placeholder
    description: "A straightforward guide to CBT techniques for mental health improvement.",
    content: `
      <h2>Introduction</h2>
      <p>CBT made accessible for everyday use.</p>
      
      <h2>Chapter 1: CBT Basics</h2>
      <p>Understand the core principles of CBT.</p>
      
      <h2>Chapter 2: Thought Records</h2>
      <p>Track and reframe negative thoughts.</p>
      
      <h2>Chapter 3: Behavioral Strategies</h2>
      <p>Change behaviors to shift moods.</p>
      
      <h2>Chapter 4: Applying CBT</h2>
      <p>Use CBT for anxiety, depression, and more.</p>
      
      <h2>Conclusion</h2>
      <p>Simplify your path to better mental health.</p>
    `,
  },
  {
    id: 11,
    title: "The Confidence Gap",
    author: "Russ Harris",
    category: "Self-Esteem",
    cover: "/assets/bk11.jpg", // Placeholder
    description: "A guide to overcoming fear and building self-confidence.",
    content: `
      <h2>Introduction</h2>
      <p>Confidence isn’t the absence of fear—it’s action despite it.</p>
      
      <h2>Chapter 1: The Confidence Myth</h2>
      <p>Why waiting to feel confident fails.</p>
      
      <h2>Chapter 2: Acceptance</h2>
      <p>Embrace fear as part of growth.</p>
      
      <h2>Chapter 3: Values and Goals</h2>
      <p>Align actions with what matters.</p>
      
      <h2>Chapter 4: Taking Action</h2>
      <p>Build confidence through doing.</p>
      
      <h2>Conclusion</h2>
      <p>Bridge the gap to a confident life.</p>
    `,
  },
  {
    id: 12,
    title: "Anxiety Relief for Teens",
    author: "Regine Galanti",
    category: "Anxiety",
    cover: "/assets/bk12.jpg", // Placeholder
    description: "CBT-based strategies tailored for teenagers to manage anxiety.",
    content: `
      <h2>Introduction</h2>
      <p>Anxiety is tough, especially for teens—this book helps.</p>
      
      <h2>Chapter 1: Teen Anxiety</h2>
      <p>Understand what’s unique about anxiety in adolescence.</p>
      
      <h2>Chapter 2: CBT for Teens</h2>
      <p>Simple CBT tools for young minds.</p>
      
      <h2>Chapter 3: Facing Fears</h2>
      <p>Step-by-step exposure techniques.</p>
      
      <h2>Chapter 4: Building Resilience</h2>
      <p>Skills to thrive despite anxiety.</p>
      
      <h2>Conclusion</h2>
      <p>Take charge of your anxiety and live your teen years fully.</p>
    `,
  },
  {
    id: 13,
    title: "The Dialectical Behavior Therapy Skills Workbook",
    author: "Matthew McKay",
    category: "Emotional Regulation",
    cover: "/assets/bk13.jpg", // Placeholder
    description: "Practical exercises for managing emotions and improving relationships.",
    content: `
      <h2>Introduction</h2>
      <p>DBT skills can transform how you handle emotions.</p>
      
      <h2>Chapter 1: Mindfulness Skills</h2>
      <p>Stay present and grounded.</p>
      
      <h2>Chapter 2: Distress Tolerance</h2>
      <p>Cope with crises without making them worse.</p>
      
      <h2>Chapter 3: Emotion Regulation</h2>
      <p>Balance your emotional ups and downs.</p>
      
      <h2>Chapter 4: Interpersonal Effectiveness</h2>
      <p>Build better relationships.</p>
      
      <h2>Conclusion</h2>
      <p>Master your emotions with DBT.</p>
    `,
  },
  {
    id: 14,
    title: "Quiet: The Power of Introverts",
    author: "Susan Cain",
    category: "Self-Esteem",
    cover: "/assets/bk14.jpg", // Placeholder
    description: "Celebrating the strengths of introverts in a world that can’t stop talking.",
    content: `
      <h2>Introduction</h2>
      <p>Introversion is a strength, not a flaw.</p>
      
      <h2>Chapter 1: The Introvert’s World</h2>
      <p>How introverts thrive differently.</p>
      
      <h2>Chapter 2: The Extrovert Ideal</h2>
      <p>Challenging societal biases.</p>
      
      <h2>Chapter 3: Strengths of Quiet</h2>
      <p>Discover introvert superpowers.</p>
      
      <h2>Chapter 4: Living Authentically</h2>
      <p>Embrace your introverted nature.</p>
      
      <h2>Conclusion</h2>
      <p>Quiet power changes the world.</p>
    `,
  },
  {
    id: 15,
    title: "Mindfulness for Beginners",
    author: "Jon Kabat-Zinn",
    category: "Mindfulness",
    cover: "/assets/bk15.jpg", // Placeholder
    description: "An accessible introduction to mindfulness meditation practices.",
    content: `
      <h2>Introduction</h2>
      <p>Mindfulness is simple yet profound.</p>
      
      <h2>Chapter 1: What is Mindfulness?</h2>
      <p>A beginner’s guide to being present.</p>
      
      <h2>Chapter 2: Getting Started</h2>
      <p>Basic meditation practices.</p>
      
      <h2>Chapter 3: Everyday Mindfulness</h2>
      <p>Bring awareness to daily life.</p>
      
      <h2>Chapter 4: Benefits</h2>
      <p>How mindfulness improves well-being.</p>
      
      <h2>Conclusion</h2>
      <p>Start your mindfulness journey today.</p>
    `,
  },
  {
    id: 16,
    title: "Healing the Child Within",
    author: "Charles L. Whitfield",
    category: "Trauma",
    cover: "/assets/bk16.jpg", // Placeholder
    description: "A guide to recovering from childhood trauma and rediscovering your true self.",
    content: `
      <h2>Introduction</h2>
      <p>Healing starts with reconnecting to your inner child.</p>
      
      <h2>Chapter 1: The Wounded Child</h2>
      <p>Recognize the impact of early trauma.</p>
      
      <h2>Chapter 2: Self-Discovery</h2>
      <p>Uncover your authentic self.</p>
      
      <h2>Chapter 3: Healing Techniques</h2>
      <p>Practical steps to recovery.</p>
      
      <h2>Chapter 4: Moving Forward</h2>
      <p>Build a life beyond trauma.</p>
      
      <h2>Conclusion</h2>
      <p>Embrace your true self through healing.</p>
    `,
  },
  {
    id: 17,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    category: "Mindfulness",
    cover: "/assets/bk17.jpg", // Placeholder
    description: "A spiritual guide to living in the present moment for peace and fulfillment.",
    content: `
      <h2>Introduction</h2>
      <p>The present moment holds the key to peace.</p>
      
      <h2>Chapter 1: Beyond the Mind</h2>
      <p>Escape the tyranny of overthinking.</p>
      
      <h2>Chapter 2: The Now</h2>
      <p>Learn to live fully in the present.</p>
      
      <h2>Chapter 3: Letting Go</h2>
      <p>Release past and future burdens.</p>
      
      <h2>Chapter 4: Inner Peace</h2>
      <p>Find stillness within.</p>
      
      <h2>Conclusion</h2>
      <p>Unlock the power of now for a fulfilled life.</p>
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