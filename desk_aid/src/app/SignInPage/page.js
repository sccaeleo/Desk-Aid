'use client'
import Link from 'next/link'
import { useState } from 'react';
export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    /* Sign in Function */
    const signIn = (e) => {
    
    };

return (
    <div>
        <h1>Sign in</h1>
        <form onSubmit={signIn}>
            <label>Username: </label>
            <input className='text-black w-4/5 rounded-l-md' 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            /> <br></br>
            <label>Password: </label>
            <input className='text-black w-4/5 rounded-l-md' 
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            /><br></br>
            <button type="submit" className='hover:bg-blue-500 rounded-r-md px-4'>Sign in</button>
        </form>
    </div>
    
);
}