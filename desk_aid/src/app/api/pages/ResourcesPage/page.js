'use client'
import { useState, useEffect } from 'react';
import axios from 'axios'

export default function Page() {

const [resources, setResources] = useState([]);
const [modal, setModal] = useState(false);
const [selectedResource, setSelectedResource] = useState({ name: '', description: '' });

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

const clickResource = (resource) => {
    setSelectedResource(resource);
    setModal(true);
};

return (
    <div>
    {/* List of Resources*/}
    <h1>Resources</h1>
    <div className="absolute w-11/12 h-full grid grid-cols-5 gap-4" style={{ left: '50%', transform: 'translateX(-50%)' }}>
    {resources.map((resource, index) => (
        <button className="hover:bg-blue-500 w-full h-10 rounded-md" 
        onClick={() => clickResource(resource)} 
        key={index}>{resource.name}
        </button>
    ))}
    </div>

    {/* Popup for when a Resource is clicked */}
    {modal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-blue-950 p-4 rounded-md w-1/2 relative">

            {/* Close Button */}
            <button 
                className="bg-transparent hover:bg-blue-500 text-white font-bold py-1 px-3 rounded-md absolute top-4 right-4"
                onClick={() => setModal(false)}>
                X
            </button>

            {/* Name */}
            <h2 className="text-lg font-bold mb-4">{selectedResource.name}</h2>

            {/* Description Box */}
            <p>{selectedResource.description}</p>
            </div>
        </div>
    )}
    </div>
);
}
