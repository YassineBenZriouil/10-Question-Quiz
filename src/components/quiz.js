import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import he from "he";

import "./style.css";

import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import Animations from "../animations";

export default function Quiz() {
    const { id } = useParams();
    const API_URL = `https://opentdb.com/api.php?amount=10&category=${id}&type=multiple`;

    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleClicks = (answer) => {
        if (answer === questions[currentQuestion]?.correct_answer) {
            setScore(score + 1);
            Toastify({
                text: "🎉 Correct!",
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                close: true,
            }).showToast();
        } else {
            Toastify({
                text: "❌ Incorrect!",
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                close: true,
            }).showToast();
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setGameOver(true);
        }
    };

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            console.log(response.data); //
            if (response.data.results && Array.isArray(response.data.results)) {
                setQuestions(response.data.results);
            } else {
                console.error(
                    "No questions found or incorrect response format."
                );
                setQuestions([]);
            }
        } catch (error) {
            console.error("Error fetching questions: ", error);
            setQuestions([]);
        } finally {
            setLoading(false);
        }
    };

    const selebOrNot = () => {
        if (score > 8) return "AMAZING , You are a Natural";
        if (score >= 5) return "Great Job";
        if (score >= 3) return "Not Bad";
        return "Better Luck Next Time";
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    if (loading || questions.length === 0) {
        return (
            <div className="home_container">
                <div class="circle-spin-3"></div>
            </div>
        );
    }

    if (!questions[currentQuestion]) {
        return (
            <Animations>
                <div className="home_container">
                    Error: question not found. Refresh the page.
                </div>
            </Animations>
        );
    }

    if (gameOver) {
        return (
            <Animations>
                <div className="home_container">
                    <h1 className="title">Game Over!</h1>
                    <h2 className="text">{selebOrNot()}</h2>
                    <p className="text">Your final score is {score}</p>
                    <button className="btn">
                        <Link to="/">Restart</Link>
                    </button>
                </div>
            </Animations>
        );
    }

    let answers = [
        questions[currentQuestion]?.correct_answer,
        ...questions[currentQuestion]?.incorrect_answers,
    ].sort(() => 0.5 - Math.random());

    return (
        <Animations>
            <div className="home_container">
                <h1 className="question">
                    {he.decode(questions[currentQuestion]?.question)}
                </h1>
                <div className="btns_container">
                    {answers.map((a, index) => (
                        <button
                            className="btn"
                            key={index}
                            onClick={() => handleClicks(a)}
                        >
                            {a}
                        </button>
                    ))}
                </div>
            </div>
        </Animations>
    );
}
