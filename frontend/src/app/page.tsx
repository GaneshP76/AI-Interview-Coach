"use client";

import { useState } from "react";

const API_URL = "http://127.0.0.1:8000/api";

export default function Home() {
    const [questions, setQuestions] = useState<string[]>([]); // ✅ Ensure it's initialized as an array
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [feedback, setFeedback] = useState<{ [key: number]: string }>({});
    const [loading, setLoading] = useState(false); // ✅ Loading state

    // ✅ Fetch Questions
    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/questions`);
            const data = await response.json();
            setQuestions(data.questions || []);  // ✅ Ensure it's always an array
        } catch (error) {
            console.error("Error fetching questions:", error);
            setQuestions([]);  // ✅ Prevent breaking the UI
        } finally {
            setLoading(false);
        }
    };

    // ✅ Submit Answer
    const submitAnswer = async (index: number, question: string) => {
        if (!answers[index]) return;

        try {
            const response = await fetch(`${API_URL}/evaluate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ question, answer: answers[index] }),
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.statusText}`);
            }

            const data = await response.json();
            setFeedback((prev) => ({ ...prev, [index]: data.feedback }));
        } catch (error) {
            console.error("Error submitting answer:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">AI Interview Questions</h1>
            <button
                onClick={fetchQuestions}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-md"
                disabled={loading} // ✅ Disable button while loading
            >
                {loading ? "Loading..." : "Generate Questions"}
            </button>
            <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
                {loading ? (
                    <p className="text-gray-600">Generating questions...</p>
                ) : questions && questions.length > 0 ? ( // ✅ Defensive check
                    questions.map((question, index) => (
                        <div key={index} className="mb-6">
                            <p className="text-lg font-medium text-gray-900">
                                <strong>{index + 1}. {question}</strong>
                            </p>
                            <textarea
                                className="w-full p-3 border rounded-md mt-2 text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Type your answer here..."
                                value={answers[index] || ""}
                                onChange={(e) =>
                                    setAnswers((prev) => ({ ...prev, [index]: e.target.value }))
                                }
                            />
                            <button
                                onClick={() => submitAnswer(index, question)}
                                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md"
                            >
                                Submit Answer
                            </button>
                            {feedback[index] && (
                                <div className="mt-2 p-2 bg-gray-100 rounded-md">
                                    <strong>Feedback:</strong> {feedback[index]}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">Click the button to generate questions.</p>
                )}
            </div>
        </div>
    );
}
