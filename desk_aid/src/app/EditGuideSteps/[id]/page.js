"use client"

import React from "react";
import axios from 'axios'
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';


export default function Page() {

    const {id} = useParams();
    const [steps, setSteps] = useState([]);
    const [stepLinks, setStepLinks] = useState([]);
    const [selectedStep, setSelectedStep] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);


    // Grab Steps & Links
    useEffect(() => {
        axios.get(`http://localhost:4000/api/steps/${id}`)
        .then(response => {
            setSteps(response.data);
        })

        axios.get(`http://localhost:4000/api/stepLinks/${id}`)
        .then(response => {
            setStepLinks(response.data);
        })


    }, [id]);

    // Add step
    const addStep = (parentID, name, description) => {
        axios.post(`http://localhost:4000/api/steps/`, {
            name: name,
            description: description,
            guideID: steps[0].guideID,
            parentStepID: parentID
        })
        .then((response) => {
            setSteps([...steps, response.data]);
            setAddModal(false);
        })
        .catch((error) => {
            console.error(error);
        });
    }



    // Edit step
    const editStep = (name, description) => {
        axios.put(`http://localhost:4000/api/steps/${selectedStep.id}`, {
            name: name,
            description: description
        })
        .then((response) => {
            setSteps(steps.map((step) => (step.id === selectedStep.id ? response.data : step)));
            setSelectedStep(null);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    // Delete END step
    const deleteEndStep = (id) => {
        axios.delete(`http://localhost:4000/api/steps/${id}`)
        .then(() => {
            setSteps(steps.filter((step) => step.id !== id));
            setStepLinks(stepLinks.filter((link) => link.current_step_ID !== id && link.child_step_ID !== id));
            setSelectedStep(null);
            setDeleteModal(false);
        })
        .catch((error) => {
            console.error(error);
        });
    }   

    // Recursive function to render the steps and their children
    // Do NOT touch, it's very delicate
    const renderStep = (step) => {
        if (!step) return null;
        const childSteps = stepLinks.filter((link) => link.current_step_ID === step.id).map((link) => {
            return steps.find((s) => s.id === link.child_step_ID);
        });
        return (
            <div key={step.id} className="flex flex-col">
                <button className="bg-blue-500 px-4 py-2 rounded mx-2 my-2"
                onClick={() => setSelectedStep(step)}>
                    {step.name}
                </button>
                {childSteps.length > 0 && (
                <div className="flex flex-row">
                    {childSteps.map((childStep) => {
                        if (!childStep) return null;
                        return (
                            <div className="" key={childStep.id}>
                                {renderStep(childStep)}
                            </div>
                        );
                    })}
                </div>
            )}
            </div>
        );
        };

    return (
        <div>
            <h1>Editing Steps for {steps[0]?.name}</h1>

            {/* Flowchart of steps */}
            <div id="flowchart" className="flex justify-center">
            {steps.length > 0 && renderStep(steps[0])}
            </div>

            {/* Edit Step Modal */}
            {selectedStep && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
                <div className="bg-blue-950 p-4 rounded-md w-1/2 relative">
                    <h2 className="text-2xl">Edit Step</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        editStep(e.target.elements.name.value, e.target.elements.description.value);
                    }}>
                        {/* Close Button */}
                        <button 
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md absolute top-4 right-4"
                            onClick={() => setSelectedStep(null)}>
                            X
                        </button>

                        {/* Input name */}
                        <label className="block mb-2" htmlFor="name">Name:</label>
                        <input className="block w-full mb-2 text-black" type="text" id="name" name="name" defaultValue={selectedStep?.name} />
                        
                        {/* Input description */}
                        <label className="block mb-2" htmlFor="description">Description:</label>
                        <textarea className="block w-full mb-2 text-black" id="description" name="description" defaultValue={selectedStep?.description} />
                        
                        {/* Save Button */}
                        <button 
                        className=" hover:bg-blue-500 font-bold py-2 px-4 rounded-md" 
                        type="submit">
                            Save
                        </button>

                        {/* Add New Step Button */}
                        <button 
                        className=" hover:bg-blue-500 font-bold py-2 px-4 rounded-md"
                        onClick={() => setAddModal(true)}>
                            Add New Step
                        </button>

                        {/* Delete Button if step has no children (is an end step) */}
                        {stepLinks.filter((link) => link.current_step_ID === selectedStep.id).length === 0 && (
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

            {/* Add Step Modal */}
            {addModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-blue-950 p-4 rounded-md w-1/2 relative">
                        <h2 className="text-2xl">Add New Step</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            addStep(selectedStep.id, e.target.elements.name.value, e.target.elements.description.value);
                        }}>
                            {/* Close Button */}
                            <button 
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md absolute top-4 right-4"
                                onClick={() => setAddModal(null)}>
                                X
                            </button>
                            <label className="block mb-2" htmlFor="name">Name:</label>
                            <input className="block w-full mb-2 text-black" type="text" id="name" name="name" />
                            <label className="block mb-2" htmlFor="description">Description:</label>
                            <textarea className="block w-full mb-2 text-black" id="description" name="description"></textarea>
                            <button 
                            className=" hover:bg-blue-500 font-bold py-2 px-4 rounded-md" 
                            type="submit">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Popup */}
            {deleteModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-blue-950 rounded-md p-4 w-1/2">
                        <h2 className="text-lg font-bold mb-2">Delete Step</h2>
                        <p className="mb-4">Are you sure you want to delete this step?</p>
                        <div className="flex justify-between">
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
                            onClick={() => deleteEndStep(selectedStep.id)}>
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
        
    )
}