'use client'

import Link from 'next/link'
import axios from 'axios'
import { useState, useEffect } from 'react';

export default function Page() {

const [guide, setGuide] = useState([]);
const [currentID, setCurrentID] = useState(0);

// Get current guide
useEffect(() => {
    axios.get('http://localhost:4000/api/currentGuideID')
    .then(response => {
        setCurrentID(response.data.currentGuideID);
        axios.get(`http://localhost:4000/api/guides/${response.data.currentGuideID}`)
        .then(response => {
            setGuide(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    })
    .catch(error => {
        console.error(error);
    });
}, []);

return (
    <div>
        <h1>Guide</h1>
        <h2>{currentID}</h2>
        <h2>{guide.name}</h2>
        <h3>{guide.description}</h3>
    </div>
);
}