'use client'
import { useState, useEffect } from 'react';
import axios from 'axios'

export default function Page() {
const [resources, setResources] = useState([]);
const [modal, setModal] = useState(false);
const [editedResource, setEditedResource] = useState({ name: '', description: '' });
const [add, setAdd] = useState(true);
const [deleteModal, setDeleteModal] = useState(false);

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

/* Add Resource */
const addResource = () => {
    axios.post('http://localhost:4000/api/resources', { name: editedResource.name, description: editedResource.description })
    .then((response) => {
        setResources([...resources, editedResource]);
        setModal(false);
    })
    .catch((error) => console.error(error));
};

/* Edit Resource */
const editResource = (id) => {
    axios.put(`http://localhost:4000/api/resources/${id}`, {name: editedResource.name, description: editedResource.description})
    .then(() => {
        setResources(resources.map((resource) => (resource.id === editedResource.id ? editedResource : resource)));
        setModal(false);
    })
    .catch((error) => console.error(error));
};

/* Delete Resource */
const deleteResource = (id) => {
    axios.delete(`http://localhost:4000/api/resources/${id}`)
    .then(() => {
        setResources(resources.filter((resource) => resource.id !== id));
        setModal(false);
        setDeleteModal(false);
    })
    .catch((error) => console.error(error));
};

return (
    <div>
        {/* List of Resources*/}
        <h1>Resources</h1>

        <div className="absolute w-full h-1 grid grid-cols-5 gap-4 p-3">

        {/* Add Resource Button */}
        <button className="hover:bg-blue-500 w-full h-10 rounded-md" 
            onClick={() => {
                setEditedResource({name: ''});
                setAdd(true);
                setModal(true);}}>
            + Add a Resource
        </button>

        {/* Buttons of Resources */}
        {resources.map((resource, index) => (
            <button className="hover:bg-blue-500 w-full h-10 rounded-md relative" key={index}
            onClick={() => {
                setEditedResource(resource);  
                setModal(true);
                setAdd(false);
                }}>
                {resource.name}
            
            </button>
        ))}
        </div>

        {/* Popup for Resources */}
        {modal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-blue-950 p-4 rounded-md w-1/2 relative">

            {/* Close Button */}
            <button 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md absolute top-4 right-4"
                onClick={() => setModal(false)}>
                X
            </button>

            {/* Heading */}
            <h2 className="text-lg font-bold mb-4">{add ? `Add New Resource` : 'Edit Resource'}</h2>
            
            {/* Form w Input and Buttons */}
            <form onSubmit={(e) => {
                e.preventDefault();
                if (!add) {
                    editResource(editedResource.id);
                } 
                else {
                    addResource(e);
                }
            }}>
                {/* Name Input Box */}
                <input 
                type="text" 
                value={editedResource.name} 
                onChange={(e) => setEditedResource({...editedResource, name: e.target.value, description: editedResource.description  || '', id: editedResource.id})}
                placeholder="Resource name"
                className="w-full p-2 mb-4 border text-black border-gray-300 rounded-md"
                />

                {/* Description Input Box */}
                <textarea
                type="text" 
                value={editedResource.description} 
                onChange={(e) => setEditedResource({...editedResource, name: editedResource.name, description: e.target.value, id: editedResource.id})}
                placeholder="Description"
                className="w-full p-2 mb-4 border text-black border-gray-300 rounded-md"
                />

                {/* Add/Save Button */}
                <button 
                type="submit" 
                className={`hover:bg-blue-500 font-bold py-2 px-4 rounded-md ${!(editedResource.name && editedResource.description) ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!(editedResource.name && editedResource.description)}
                > 
                {add ? 'Add Resource' : 'Save'}
                </button>

                {/* Delete Button */}
                {!add && (
                <button
                type="button" 
                className=" bg-red-500 hover:bg-red-700 font-bold py-2 px-6 rounded-md absolute right-4"
                onClick={() => setDeleteModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                </button>
                )}
            </form>
            </div>
        </div>
        )}
        
        {/* Delete Confirmation Popup */}
        {deleteModal && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
                <div className="bg-blue-950 rounded-md p-4 w-1/2">
                    <h2 className="text-lg font-bold mb-2">Delete Resource</h2>
                    <p className="mb-4">Are you sure you want to delete this resource?</p>
                    <div className="flex justify-between">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
                        onClick={() => deleteResource(editedResource.id)}>
                            Delete
                        </button>
                        <button className="hover:bg-blue-500 font-bold py-2 px-4 rounded" 
                        onClick={() => setDeleteModal(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
);
}
