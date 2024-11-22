import React from "react";
import "./App.css";

import Home from "./components/home";
import Quiz from "./components/quiz";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/quiz/:id" element={<Quiz />} />
                </Routes>
            </Router>
        </div>
    );
}
