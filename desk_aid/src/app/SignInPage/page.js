'use client'
import Link from 'next/link'
import axios from 'axios';
import { useState } from 'react';

export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    /* Sign in Function */
    const signIn = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/api/signin", { username, password })

        .then((response) => {
            // If correct username and password, send to editselect
            if (response.data.success) {
                window.location.href = "/api/protected";
                window.location.href = "/EditSelectPage";
            } 
            else {
                console.error(response.data.error);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    };

return (
    <div>
        {/* Sign In Form */}
        <h1>Sign In to Edit Guides</h1>
        <form className="max-w-sm mx-auto" onSubmit={signIn}>
        <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username:</label>
            <input 
            type="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            data-testid="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            required 
            />
        </div>
        <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
            <input
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            required 
            />
        </div>
        <button type="submit" className="hover:bg-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
        </form>

    </div>
    
);
}