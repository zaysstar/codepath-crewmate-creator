import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebaseConfig.js';
import './EditCrewmate.css'; 

// --- All 22 colors in an array ---
const crewmateColors = [
    "Red", "Blue", "Green", "Pink", "Orange", "Yellow", "Black", "White",
    "Purple", "Brown", "Cyan", "Lime", "Maroon", "Rose", "Banana",
    "Gray", "Tan", "Coral", "Fortegreen", "Olive", "Sky Blue", "Lavender", "Navy", 
];
const genderOptions = ["Male", "Female", "Non-Binary"];

const getGenderSymbol = (gender) => {
    switch (gender) {
        case 'Male': return '♂';
        case 'Female': return '♀';
        case 'Non-Binary': return '⚥';
        default: return '';
    }
};

const EditCrewmate = () => {

    const { id } = useParams();
    const navigate = useNavigate(); 
    const [crewmate, setCrewmate] = useState({ 
        name: "", 
        speed: 0, 
        color: "Red", 
        gender: "Male" 
    });

    useEffect(() => {
        const getCrewmate = async () => {
            const docRef = doc(db, "crewmates", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setCrewmate(docSnap.data()); 
            } else {
                console.log("No such document!");
                navigate('/'); 
            }
        };
        getCrewmate();
    }, [id, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCrewmate( (prev) => {
            return { ...prev, [name]: value }
        });
    }

    const updateCrewmate = async (event) => {
        event.preventDefault();
        const docRef = doc(db, "crewmates", id);

        // This ensures that even if we edit an old "broken" crewmate,
        // it gets a new timestamp.
        const updatedData = {
            ...crewmate,
            createdAt: crewmate.createdAt || new Date()
        };

        try {
            await updateDoc(docRef, updatedData); 
            alert("Crewmate Updated!");
            navigate(`/${id}`); 
        } catch (error) {
            console.error("Error updating document", error);
        }
    };

    const deleteCrewmate = async (event) => {
        event.preventDefault();
        const docRef = doc(db, "crewmates", id);
        try {
            await deleteDoc(docRef);
            alert("Crewmate Deleted!");
            navigate('/'); 
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    return (
        <div>
            <h2>Edit {crewmate.name}</h2>
            <form onSubmit={updateCrewmate}>
                <label>
                    Name:
                    {/* Added '|| ""' to prevent React errors on load */}
                    <input type="text" name="name" value={crewmate.name || ''} onChange={handleChange} required />
                </label>
                <br />

                <label>
                    Speed (mph):
                    <input type="number" name="speed" value={crewmate.speed || 0} onChange={handleChange} required />
                </label>
                <br />

                <label>
                    Color:
                    <select name="color" value={crewmate.color || 'Red'} onChange={handleChange}>
                        {crewmateColors.map(color => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                </label>
                <br />

                <label>
                    Gender:
                    <select name="gender" value={crewmate.gender || 'Male'} onChange={handleChange}>
                        {genderOptions.map(gender => (
                            <option key={gender} value={gender}>
                                {getGenderSymbol(gender)} {gender}
                            </option>
                        ))}
                    </select>
                </label>
                <br />

                <button type="submit">Update Crewmate</button>
                <button className="delete-button" onClick={deleteCrewmate}>
                    Delete Crewmate
                </button>
            </form>
        </div>
    );
};

export default EditCrewmate;