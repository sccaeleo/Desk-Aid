'use client'

import { useState } from 'react';
import Link from 'next/link'
import Image from "next/image";

export default function Home() {
const [query, setQuery] = useState('');

  /* Search Function */
  const search = (e) => {
    // todo when database
  };

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
  </div>
);
}

