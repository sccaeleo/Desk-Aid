'use client'

import { useState, useEffect } from 'react';
import axios from 'axios'
import Link from 'next/link'
import Image from "next/image";

export default function Home() {
const [categories, setCategories] = useState([]);
const [query, setQuery] = useState('');

  /* Search Function */
  const search = (e) => {
    // Todo by Tim
    

  };

  /* Get Guide Categories */
  useEffect(() => {
    axios.get('http://localhost:4000/api/categories')
    .then(response => {
      setCategories(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

return (
  <div className="flex-col text-center">
    
    {/* Title */}
    <h1 className='text-5xl font-bold pt-20'>Constituent Service Desk Aid</h1>

    {/* Search Bar */}
    <form onSubmit={search} style={{position: 'absolute', top: '40vh', width: '100%'}}>
      <input className='text-black w-4/5 rounded-l-md' 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
      />
      <button type="submit" className='hover:bg-blue-500 rounded-r-md px-4'>Search</button>
    </form>

    {/* List of Guide Categories*/}
    <div className="absolute top-1/2 w-11/12 grid grid-cols-4 gap-4" style={{ left: '50%', transform: 'translateX(-50%)' }}>
      {categories.map((category, index) => (
        <button className="hover:bg-blue-500 w-full h-10 rounded-md" key={index}>{category.name}</button>
      ))}
    </div>
  </div>
);
}


