"use client";

import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api";

export default function Home() {
    const [questions, setQuestions] = useState<string[]>([]);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const response = await fetch(`${API_URL}/questions`);
                const data = await response.json();
                setQuestions(data.questions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        }
        fetchQuestions();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
                AI Interview Questions
            </h1>
            <div className="p-6 bg-white shadow-lg rounded-lg">
                <ul className="space-y-3">
                    {questions.length > 0 ? (
                        questions.map((question, index) => (
                            <li
                                key={index}
                                className="text-lg font-medium text-gray-900 border-b pb-2 last:border-none"
                            >
                                {question}
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-600">Loading questions...</p>
                    )}
                </ul>
            </div>
        </div>
    );
}
