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
    {/* Logo */}
    <Image
      src="/DOO_Logo.png"
      alt="Logo"
      width={200}
      height={200}
      className='mx-auto position-relative'
    />

    {/* Title */}
    <h1 className='text-5xl my-5'>Constituent Service Desk Aid</h1>

    {/* Search Bar */}
    <form onSubmit={search} className="mx-auto max-w-screen-lg my-5">
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
      </div>
      <input 
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a guide..."
        required
      />
      <button type="submit" className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2'>Search</button>
    </div>
    </form>



    {/* List of Guide Categories*/}
    <div className="grid grid-cols-4 gap-4 p-3">
      {categories.map((category, index) => (
        <button className="hover:bg-blue-500 w-full h-10 rounded-md" key={index}>
          <p className="text-ellipsis overflow-hidden whitespace-nowrap px-2">
          {category.name}
          </p>
        </button>
      ))}
    </div>
  </div>
);
}


