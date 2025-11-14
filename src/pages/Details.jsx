import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebaseConfig.js'; 
import './Details.css';

// --- Image map for all 22 colors ---
const CREWMATE_IMAGE_MAP = {
    'Red': '/images/red.png',
    'Blue': '/images/blue.png',
    'Green': '/images/green.png',
    'Pink': '/images/pink.png',
    'Orange': '/images/orange.png',
    'Yellow': '/images/yellow.png',
    'Black': '/images/black.png',
    'White': '/images/white.png',
    'Purple': '/images/purple.png',
    'Brown': '/images/brown.png',
    'Cyan': '/images/cyan.png',
    'Lime': '/images/lime.png',
    'Maroon': '/images/maroon.png',
    'Rose': '/images/rose.png',
    'Banana': '/images/banana.png',
    'Gray': '/images/gray.png',
    'Tan': '/images/tan.png',
    'Coral': '/images/coral.png',
    'Fortegreen': '/images/fortegreen.png',
    'Olive': '/images/olive.png',
    'Sky Blue': '/images/skyblue.png',
    'Lavender': '/images/lavender.png',
    'Navy': '/images/navy.png',
};
const FALLBACK_IMAGE = '/images/default.png'; 
// --- End of map ---

// --- Helper function to get the symbol ---
const getGenderSymbol = (gender) => {
    switch (gender) {
        case 'Male': return '♂';
        case 'Female': return '♀';
        case 'Non-Binary': return '⚥';
        default: return '';
    }
};


const Details = () => {
    
    const { id } = useParams();
    const [crewmate, setCrewmate] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const getCrewmate = async () => {
            try {
                const docRef = doc(db, "crewmates", id); 
                const docSnap = await getDoc(docRef); 

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setCrewmate(data);

                    const crewmateColor = data.color; 
                    const imagePath = CREWMATE_IMAGE_MAP[crewmateColor];
                    setImageUrl(imagePath || FALLBACK_IMAGE);

                } else {
                    console.log("No such document!");
                    setCrewmate(false);
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
            }
        };

        getCrewmate();
    }, [id]); 

    
    if (crewmate === null) {
        return <p>Loading crewmate details...</p>;
    }

    if (crewmate === false) {
        return <p>Crewmate not found. <Link to="/">Return to Gallery</Link></p>;
    }

    return (
        <div className="details-container">
            <img 
                className="details-image" 
                src={imageUrl} 
                alt={`${crewmate.color} ${crewmate.name}`} 
            />
            <div className="details-info">
                <h2>{crewmate.name}</h2>
                <p>
                    <span 
                        className="color-swatch" 
                        style={{ backgroundColor: crewmate.color }}
                    ></span>
                    <span className="stat">Color:</span> {crewmate.color}
                </p>
                <p><span className="stat">Speed:</span> {crewmate.speed} mph</p>
                
                <p>
                    <span className="stat">Gender:</span> {getGenderSymbol(crewmate.gender)} {crewmate.gender}
                </p>

                <Link to={`/${id}/edit`}>Edit Crewmate</Link>
            </div>
        </div>
    );
};

export default Details;