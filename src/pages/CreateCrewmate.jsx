// src/pages/CreateCrewmate.jsx
import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebaseConfig.js'; // Make sure this path is correct!

// --- NEW: All 18 colors in an array ---
const crewmateColors = [
    "Red", "Blue", "Green", "Pink", "Orange", "Yellow", "Black", "White",
    "Purple", "Brown", "Cyan", "Lime", "Maroon", "Rose", "Banana",
    "Gray", "Tan", "Coral", "Fortegreen", 
];

const CreateCrewmate = () => {

    // Set the default color to be the first one in the list
    const [crewmate, setCrewmate] = useState({ 
        name: "", 
        speed: 0, 
        color: crewmateColors[0] // Default to "Red"
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCrewmate( (prev) => {
            return { ...prev, [name]: value }
        });
    }

    const createCrewmate = async (event) => {
        event.preventDefault(); 
        
        try {
            const docRef = await addDoc(collection(db, "crewmates"), crewmate);
            console.log("Document written with ID: ", docRef.id);
            alert("Crewmate Created!"); 
            
            // Reset form
            setCrewmate({ name: "", speed: 0, color: crewmateColors[0] });

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <div>
            <h2>Create a New Crewmate</h2>
            <form onSubmit={createCrewmate}>
                <label>
                    Name:
                    <input type="text" name="name" value={crewmate.name} onChange={handleChange} required />
                </label>
                <br />

                <label>
                    Speed (mph):
                    <input type="number" name="speed" value={crewmate.speed} onChange={handleChange} required />
                </label>
                <br />

                {/* --- THIS IS THE UPDATED PART --- */}
                <label>
                    Color:
                    <select name="color" value={crewmate.color} onChange={handleChange}>
                        {crewmateColors.map(color => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                </label>
                {/* --- END OF UPDATE --- */}

                <br />
                <button type="submit">Create Crewmate</button>
            </form>
        </div>
    );
};

export default CreateCrewmate;