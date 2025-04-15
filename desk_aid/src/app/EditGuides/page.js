"use client"

import React from "react";
import axios from 'axios'
import { useState, useEffect } from "react";
import Link from 'next/link'


export default function Page() {


    const [guides, setGuides] = useState([]);
    const [modal, setModal] = useState(false);
    const [editedGuide, setEditedGuide] = useState(null);
    const [add, setAdd] = useState(true);
    const [deleteModal, setDeleteModal] = useState(false);

    const [categories, setCategories] = useState([]);
    const[tempCategory,setTempCategory] = useState(null)
    const [categories_tables, setCategories_tables] = useState([]);

    const [tempID, setTempID] = useState(null);
    /* Grab Guides */
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
        axios.get('http://localhost:4000/api/categories')
        .then(response => {
        setCategories(response.data);
        })
        .catch(error => {
        console.error(error);
    });
    }, []);


    const searchGuidesByName = (name) => {
        return axios.get('http://localhost:4000/api/guides', {
            params: { name }
        })
        .then((response) => response.data)
        .catch((error) => {
            console.error("Search error:", error);
            return [];
        });
    };

// Add Guide
const addGuide = () => {
    console.log('Adding new guide...');
    axios.get('http://localhost:4000/api/guides')
    .then((response) => {
        const existingGuide = response.data.find(guide => guide.name.toLowerCase() === editedGuide.name.toLowerCase());
        if (!existingGuide) {
        axios.post('http://localhost:4000/api/guides', { name: editedGuide.name })
        .then((response) => {
            console.log('Guide added successfully:', response.data);
            const newGuide = { ...editedGuide, id: response.data.id };
            setGuides([...guides, newGuide]);
            axios.post('http://localhost:4000/api/categories_tables', { categoryID: tempCategory, guideID: response.data.id })
            .then((response) => {
            console.log('Categories table updated successfully:', response.data);
        })
        })
    } 
    else {
        console.log('Guide with the same name already exists');
    }
    })
    .catch((error) => console.error(error));
};


/* Edit Guide */
const editGuide = (id) => {
    axios.put(`http://localhost:4000/api/guides/${id}`, {name: editedGuide.name})
    .then(() => {
        setGuides(guides.map((guide) => (guide.id === editedGuide.id ? editedGuide : guide)));
    })
    .catch((error) => console.error(error));
};

/* Delete Guide */
const deleteGuide = (id) => {
    axios.delete(`http://localhost:4000/api/guides/${id}`)
    .then(() => {
        setGuides(guides.filter((guide) => guide.id !== id));
        deleteCategories_table(id); // pass the guideID to deleteCategories_table
        setModal(false)
        setDeleteModal(false);
    })
    .catch((error) => console.error(error));
};

/* Add categories_table */
const addCategories_table = (categoryID) => {
    axios.post('http://localhost:4000/api/guides', { name: editedGuide.name })
    .then((response) => {
        axios.post('http://localhost:4000/api/categories_tables', { categoryID: categoryID, guideID: response.data.id })
        .then((response) => {
        })

        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
};

  //////////////////////////////////


/* Delete categories_table */
const deleteCategories_table = (guideID) => {
    console.log('Deleting categories_tables with guideID:', guideID);
    axios.delete(`http://localhost:4000/api/categories_tables?guideID=${guideID}`)
    .then((response) => {
        console.log('Response from server:', response);
        setCategories_tables(categories_tables.filter((item) => item.guideID !== guideID));
        setModal(false);
        setDeleteModal(false);
    })
    .catch((error) => {
        console.error('Error deleting categories_table:', error);
    });
};



////////////////////////////////////////

return (
    <div>
        <h1>Edit Guides</h1>

        {/* Add Guide Button */}
        <button className="bg-green-600 hover:bg-green-700 h-10 rounded-md absolute bottom-10 right-10 flex items-center" 
        onClick={() => {
            setEditedGuide({name: ''});
            setAdd(true);
            setModal(true);}}>
        <div className="flex items-center pl-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        </div>
        <p className="px-2" >Add a Guide</p>
        </button>

        {/* Button Fiasco */}
        <div className="absolute w-full h-1 grid grid-cols-5 gap-4 p-3">

        

        {/* Guide Buttons */}
        {guides.map((guide, index) => (
            <button className="hover:bg-blue-500 w-full h-10 rounded-md relative" key={index}
            onClick={() => {
                setEditedGuide(guide);  
                setModal(true);
                setAdd(false);
                }}>
                <p className="text-ellipsis overflow-hidden whitespace-nowrap px-2">
                {guide.name}
                </p>
            
            </button>
        ))}
        </div>

        {/* Popup for Guides */}
        {modal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-blue-950 p-4 rounded-md w-1/2 h-1/2 relative">

            {/* Close Button */}
            <button 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md absolute top-4 right-4"
                onClick={() => setModal(false)}>
                X
            </button>

            {/* Heading */}
            <h2 className="text-lg font-bold mb-4">{add ? `Add New Guide` : 'Edit Guide'}</h2>
            <h1>{tempID}</h1>
            
            {/* Form w Input and Buttons */}
            <form onSubmit={(e) => {
                e.preventDefault();
                if (!add) {
                    editGuide(editedGuide.id);
                    addCategories_table(tempCategory)
                } 
                else {
                    addGuide(e);
                    //addCategories_table(tempCategory)
                }
            }}>
                {/* Input Box */}
                <input 
                type="text" 
                value={editedGuide.name} 
                onChange={(e) => setEditedGuide({name: e.target.value, id: editedGuide.id})}
                placeholder="Guide name"
                className="w-full p-2 mb-4 border text-black border-gray-300 rounded-md"
                />
            
                {/* Frankenstein into category search */}
                
                <p className="font-bold mb-4">Select Category:</p>
                {/* Buttons of Categories */}
                <div className="relative w-full h-1 grid grid-cols-5">
                {categories.map((category, index) => (
                <button 
                type = "button"
                className="hover:bg-blue-500 h-10 rounded-md relative m-1" key={index}
                onClick={() => {
                    setTempCategory(category.id)
                    //addCategories_table(category.id)
                        }}>
                        {category.name}
                    
                    </button>
                ))}
                </div>
                

                {/* Add/Save Button */}
                <button 
                type="submit" 
                className=" bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded-md absolute bottom-4 right-4"
                >
                {add ? 'Add Guide' : 'Save'}
                </button>

                {/* Edit Steps Button */}
                {!add && (
                <Link href={`EditGuideSteps/${editedGuide.id}`}>
                <button
                type="button" 
                className=" hover:bg-blue-500 font-bold py-2 px-6 rounded-md">
                Edit Steps
                </button>
                </Link>
                )}

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
                    <h2 className="text-lg font-bold mb-2">Delete Guide</h2>
                    <p className="mb-4">Are you sure you want to delete this guide?</p>
                    <div className="flex justify-between">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
                        onClick={() => deleteGuide(editedGuide.id)}>
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