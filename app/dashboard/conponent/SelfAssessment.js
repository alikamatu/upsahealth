"use client"
import { useState } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion

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
    {
        id: 5,
        question: "Have you faced a suicidal descision in your lifetime",
        options: ["Mmm yaeh", "nope", "Not quiet sure"]
    }
];

export default function SelfAssessment() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const handleAnswer = (value) => {
        const updatedAnswers = { ...answers, [questions[currentQuestionIndex].id]: value };
        setAnswers(updatedAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateResult(updatedAnswers);
        }
    };

    const calculateResult = (responses) => {
        const totalScore = Object.values(responses).reduce((acc, curr) => {
            if (typeof curr === "number") {
                return acc + curr;
            } else if (typeof curr === "string") {
                if (curr === "Calm") return acc + 1;
                else if (curr === "Happy") return acc + 2;
                else if (curr === "Anxiety" || curr === "Depression" || curr === "Stress") return acc + 3;
                else if (curr === "Yes" ) return acc + 10;
                else if (curr === "Always" ) return acc + 10;
            }
            return acc;
        }, 0);

        let mood;
        if (totalScore <= 5) mood = "Very Calm";
        else if (totalScore <= 10) mood = "Calm";
        else if (totalScore <= 15) mood = "Moderate";
        else if (totalScore <= 20) mood = "High Stress";
        else mood = "Severe Stress";

        setResult(`Your mood is: ${mood}`);
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="w-screen h-screen flex items-center justify-center p-6">
            {result ? (
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">{result}</h2>
                    <button className="bg-transparent border-[1px] border-gray-600 px-4 py-2 rounded-3xl hover:bg-[#80808060] asbnt" onClick={() => window.location.reload()}>
                        Restart Assessment
                    </button>
                </div>
            ) : (
                <motion.div
                    className="flex w-full flex-col items-center gap-4 p-6"
                    key={currentQuestionIndex} // Key for triggering animation on question change
                    initial={{ opacity: 0, y: -20 }} // Initial state
                    animate={{ opacity: 1, y: 0 }} // Animation state
                    exit={{ opacity: 0, y: 20 }} // Exit animation state
                    transition={{ duration: 0.5 }} // Animation duration
                >
                    <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
                    <div className="flex gap-2 w-[50%] flex-wrap items-center justify-center">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                className="bg-transparent border-[1px] border-gray-600 px-4 py-2 rounded-3xl hover:bg-[#80808060] asbnt"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}