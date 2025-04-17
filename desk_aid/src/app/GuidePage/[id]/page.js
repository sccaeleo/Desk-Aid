"use client"

import axios from 'axios'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'

export default function Page() {
const {id} = useParams();
const [steps, setSteps] = useState([]);
const [currStep, setCurrStep] = useState(0);
const [childSteps, setChildSteps] = useState([]);

useEffect(() => {
    // Get the steps
    axios.get(`http://localhost:4000/api/steps/${id}`)
    .then(response => {
        setSteps(response.data);
        setCurrStep(response.data[0]);
        setChildSteps(response.data.filter(step => step.parentStepID === response.data[0].id));
    })
    .catch(error => {
        console.error(error);
    });
    
},[id]);

// Move to a different step
const changeStep = (id) => {
    setCurrStep(steps.find(step => step.id === id));
    setChildSteps(steps.filter(step => step.parentStepID === id));
}

// Back button goes back a step if the parent step id is not null, otherwise goes back to the previous page
const backButton = () => {

    // Gave me a headache so I'm doing it unethically with a try catch
    try {
        if(currStep !== null && currStep.parentStepID !== null) {
            changeStep(currStep.parentStepID);
        } 
        else {
            window.history.back();
        }
    } 
    catch (error) {
        window.history.back();
    }
    
}

return (
    <div>
        {/* Back Button */}
        <button className='hover:bg-blue-500 h-10 w-20 rounded-md relative top-0 left-0 ml-5'
        onClick={() => backButton()}>
            Back
        </button>
        
        {/* Title of current step and its description */}
        <div className="flex flex-col text-center">
        <h1>{currStep?.name}</h1>
        <p className="text-xl mt-20">{currStep?.description}</p>
        {/* TODO tooltip goes here */}

        {/* The buttons for the next step */}
        <div className="fixed bottom-10 left-0 w-full flex justify-center">
        {childSteps.length > 0 ? 
            childSteps.map((child, index) => (
                <button 
                className="hover:bg-blue-500 w-full h-20 rounded-md m-2"
                key={index}
                onClick={() => changeStep(child.id)}>
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap text-xl font-bold">
                        {child.name}
                    </p>
                </button>
            ))
        :
            <Link href="/GuideListPage" className='w-full'>
                <button className='hover:bg-blue-500 w-1/3 h-20 rounded-md m-2'>
                <p className="text-xl font-bold">
                    Done
                </p>
                </button>
            </Link>
        }
        </div>
        </div>
    </div>
);
}

