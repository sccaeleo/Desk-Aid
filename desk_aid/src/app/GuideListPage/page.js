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
        setGuides(response.data);
    })
    .catch(error => {
        console.error(error);
    });
}, []);

return (
    <div className="">
        <h1>List of Guides</h1>
        <div className="absolute w-full h-1 grid grid-cols-5 gap-4 p-3">

        {/* Guides */}
        {guides.map((guide, index) => (
            <Link href={`GuidePage/${guide.id}`} key={index}>
            <button className="hover:bg-blue-500 w-full h-10 rounded-md relative">
            {guide.name}
            </button>
            </Link>
        ))}
        </div>
    </div>
);
}