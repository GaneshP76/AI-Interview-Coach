const API_URL = "http://127.0.0.1:8000/api";

export const fetchQuestions = async () => {
    try {
        const response = await fetch(`${API_URL}/questions`);
        const data = await response.json();
        return data.questions;
    } catch (error) {
        console.error("Error fetching questions:", error);
        return [];
    }
};
