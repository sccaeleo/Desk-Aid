"use client"

import React from "react";
import axios from 'axios'
import { useState, useEffect } from "react";

export default function Page() {

const [categories, setCategories] = useState([]);
const [modal, setModal] = useState(false);
const [editedCategory, setEditedCategory] = useState(null);
const [add, setAdd] = useState(true);
const [deleteModal, setDeleteModal] = useState(false);

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

/* Add Category */
const addCategory = () => {
        axios.post('http://localhost:4000/api/categories', { name: editedCategory.name })
        .then((response) => {
            setCategories([...categories, editedCategory]);
            setModal(false);
        })
        .catch((error) => console.error(error));
};

/* Edit Category */
const editCategory = (id) => {
    axios.put(`http://localhost:4000/api/categories/${id}`, {name: editedCategory.name})
    .then(() => {
        setCategories(categories.map((category) => (category.id === editedCategory.id ? editedCategory : category)));
        setModal(false);
    })
    .catch((error) => console.error(error));
};

/* Delete Category */
const deleteCategory = (id) => {
    axios.delete(`http://localhost:4000/api/categories/${id}`)
    .then(() => {
        setCategories(categories.filter((category) => category.id !== id));
        setModal(false);
        setDeleteModal(false);
    })
    .catch((error) => console.error(error));
};

return (
    <div>
        <h1>Edit Guide Categories</h1>

        {/* The Buttonsssss */}
        <div className="absolute w-full h-1 grid grid-cols-5 gap-4 p-3">

        {/* Add Category Button */}
        <button className="hover:bg-blue-500 w-full h-10 rounded-md" 
        onClick={() => {
            setEditedCategory({name: ''});
            setAdd(true);
            setModal(true);}}>
        + Add a Category
        </button>

        {/* Buttons of Categories */}
        {categories.map((category, index) => (
            <button className="hover:bg-blue-500 w-full h-10 rounded-md relative" key={index}
            onClick={() => {
                setEditedCategory(category);  
                setModal(true);
                setAdd(false);
                }}>
                {category.name}
            
            </button>
        ))}
        </div>

        {/* Popup for Categories */}
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
            <h2 className="text-lg font-bold mb-4">{add ? `Add New Category` : 'Edit Category'}</h2>
            
            {/* Form w Input and Buttons */}
            <form onSubmit={(e) => {
                e.preventDefault();
                if (!add) {
                    editCategory(editedCategory.id);
                } 
                else {
                    addCategory(e);
                }
            }}>
                {/* Input Box */}
                <input 
                type="text" 
                value={editedCategory.name} 
                onChange={(e) => setEditedCategory({name: e.target.value, id: editedCategory.id})}
                placeholder="Category name"
                className="w-full p-2 mb-4 border text-black border-gray-300 rounded-md"
                />

                {/* Add/Save Button */}
                <button 
                type="submit" 
                className=" hover:bg-blue-500 font-bold py-2 px-4 rounded-md"
                >
                {add ? 'Add Category' : 'Save'}
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
                    <h2 className="text-lg font-bold mb-2">Delete Category</h2>
                    <p className="mb-4">Are you sure you want to delete this category?</p>
                    <div className="flex justify-between">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
                        onClick={() => deleteCategory(editedCategory.id)}>
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

