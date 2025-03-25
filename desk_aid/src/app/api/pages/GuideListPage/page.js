'use client'

import Link from 'next/link'
import axios from 'axios'
import { useState, useEffect } from 'react';

export default function Page() {

const [guides, setGuides] = useState([]);


/* Get Guides */
useEffect(() => {
    axios.get('http://localhost:4000/api/guides')
    .then(response => {
        if (Array.isArray(response.data)) {
            setGuides(response.data);
        } else {
            console.error('Expected an array, but got:', response.data);
        }
    })
    .catch(error => {
        console.error(error);
    });
}, []);

/* Set current guide */
const setCurrentGuide = (id) => {
    axios.put(`http://localhost:4000/api/currentGuideID/${id}`)
};

return (
    <div className="">
        <h1>List of Guides</h1>
        <div className="absolute w-full h-1 grid grid-cols-5 gap-4 p-3">

        {/* Guides */}
        {guides.map((guide, index) => (
            <Link href={`/api/pages/GuidePage/`} key={index}>
            <button className="hover:bg-blue-500 w-full h-10 rounded-md relative"
            onClick= {setCurrentGuide(guide.id)}>
                {guide.name}
            </button>
            </Link>
        ))}
        </div>
    </div>
);
}