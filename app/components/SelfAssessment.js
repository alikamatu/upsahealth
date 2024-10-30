"use client"
import { useState } from "react";

const questions = [
    { 
        id: 1, 
        question: "How would you rate your current well-being?", 
        options: [1, 2, 3, 4, 5],
        type: "rating" 
    },
    { 
        id: 2, 
        question: "How do you feel today?", 
        options: ["Anxiety", "Depression", "Stress", "Confused", "Low Energy", "Mood swing", "Happy", "Irritated", "Sad", "Calm"],
        type: "multiple-choice" 
    },
    { 
        id: 3, 
        question: "Have you experienced any mental health issue in the past?", 
        options: ["Yes", "No"],
        type: "multiple-choice" 
    },
    { 
        id: 4, 
        question: "How often do you experience feelings of overwhelm or burnout?", 
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        type: "rating"
    },
    // Add remaining questions following the same structure
];

export default function SelfAssessment() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const handleAnswer = (value) => {
        const updatedAnswers = { ...answers, [questions[currentQuestionIndex].id]: value };
        setAnswers(updatedAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to next question
        } else {
            calculateResult(updatedAnswers);
        }
    };

    const calculateResult = (responses) => {
        // Example scoring system (simplify or adjust based on desired logic)
        const totalScore = Object.values(responses).reduce((acc, curr) => acc + (typeof curr === "number" ? curr : 0), 0);

        // Determine mood based on total score (customize as needed)
        let mood;
        if (totalScore <= 10) mood = "Calm";
        else if (totalScore <= 20) mood = "Moderate";
        else mood = "High Stress";

        setResult(`Your mood is: ${mood}`);
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="w-screen h-screen flex items-center justify-center p-6">
            {result ? (
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">{result}</h2>
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => window.location.reload()}>
                        Restart Assessment
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
                    <div className="flex flex-col gap-2">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
