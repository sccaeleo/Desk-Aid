'use client'
import { useState, useEffect } from 'react';
import axios from 'axios'

export default function Page() {

const [resources, setResources] = useState([]);

/* Get Resources */
useEffect(() => {
axios.get('http://localhost:4000/api/resources')
.then(response => {
    if (Array.isArray(response.data)) {
        setResources(response.data);
    } else {
        console.error('Expected an array, but got:', response.data);
    }
})
.catch(error => {
    console.error(error);
});
}, []);

return (
    <div>
    {/* List of Resources*/}
        <div className="absolute w-11/12 h-full grid grid-cols-5 gap-4" style={{ left: '50%', transform: 'translateX(-50%)' }}>
        {resources.map((resource, index) => (
            <button className="hover:bg-blue-500 w-full h-10 rounded-md" key={index}>{resource.name}</button>
        ))}
        </div>
    </div>
);
}