"use client"

import React from "react";
import { useState, useEffect } from "react";

export default function Page() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('api/server')
            .then(response => response.text())
            .then(data => setCategories(data));
    }, []);

    return (
        <div className="p-2">
            <h1>Edit Guide Categories</h1>
            <button>Add Category</button>
            <ul>
                <p>{categories}</p>
                
            </ul>
        </div>
    );
}