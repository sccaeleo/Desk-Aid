"use client"

import axios from 'axios'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function Page() {
const {id} = useParams();
const [guide, setGuide] = useState({});
const [steps, setSteps] = useState([]);
const [currStep, setCurrStep] = useState(0);
const [childSteps, setChildSteps] = useState([]);

useEffect(() => {
    // Get the guide
    axios.get(`http://localhost:4000/api/guides/${id}`)
    .then(response => {
        setGuide(response.data);
    });
    
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
    axios.get(`http://localhost:4000/api/step/${id}`)
    .then(response => {
        setChildSteps(response.data);
    })
    .catch(error => {
        console.error(error);
    });
}

// Back button goes back a step if the parent step id is not null, otherwise goes back to the previous page
const backButton = () => {
    if(currStep.parentStepID !== null) {
        changeStep(currStep.parentStepID);
    } else {
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
        <h1>{currStep.name}</h1>
        <p className='text-lg'>{currStep.description}</p>
        {/* TODO tooltip goes here */}

        {/* The buttons for the next step */}
        {childSteps.map((child, index) => (
            <button 
            className="hover:bg-blue-500 w-1/3 h-10 rounded-md relative"
            key={index}
            onClick={() => changeStep(child.id)}>
                {child.name}
            </button>
        ))}
        </div>
    </div>
);
}
