"use client"

import axios from 'axios'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function Page() {
const {id} = useParams();
const [guide, setGuide] = useState({});


// Get current guide
useEffect(() => {
    axios.get(`http://localhost:4000/api/guides/${id}`)
    .then(response => {
        setGuide(response.data);
    });
    
},[id]);

return (
    <div>
        <h1>Guide</h1>
        <h2>{JSON.stringify(guide)}</h2>
        <h2>ID: {guide.id}</h2>
        <h3>Name: {guide.name}</h3>
        
    </div>
);
}