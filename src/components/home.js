import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Animations from "../animations";

import "./style.css";

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                "https://opentdb.com/api_category.php"
            );
            setCategories(response.data.trivia_categories);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <Animations>
            <div className="home_container">
                <h1 className="title">Bienvenue au Quiz !</h1>
                <p className="text">Selectionner La Catégorie</p>
                <form>
                    <select
                        className="select"
                        name="category"
                        id="category"
                        onChange={handleCategoryChange}
                    >
                        <option className="select_opt" value="">
                            -- Select a Category --
                        </option>
                        {categories.map((category) => (
                            <option
                                className="select_opt"
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <Link to={`/quiz/${selectedCategory}`}>
                        <button
                            disabled={!selectedCategory}
                            type="button"
                            className="btn"
                        >
                            Commencer
                        </button>
                    </Link>
                </form>
            </div>
        </Animations>
    );
}
