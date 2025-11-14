import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// We have REMOVED 'query' and 'orderBy' to make the query simpler
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../firebaseConfig.js'; 
import './Gallery.css'; 

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

const Gallery = () => {
    
    const [crewmates, setCrewmates] = useState([]);

    useEffect(() => {
        const fetchCrewmates = async () => {
            console.log("Gallery.jsx (RESET): Fetching crewmates...");
            try {
                // --- THIS IS THE SIMPLIFIED QUERY ---
                // It just gets the whole collection. No sorting, no 'orderBy'.
                const crewmatesRef = collection(db, "crewmates");
                const querySnapshot = await getDocs(crewmatesRef);
                // --- END OF FIX ---
                
                const crewmatesData = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const color = data.color;
                    const imagePath = CREWMATE_IMAGE_MAP[color];
                    const imageUrl = imagePath || FALLBACK_IMAGE;

                    return {
                        id: doc.id,
                        ...data,
                        imageUrl: imageUrl
                    };
                });
                
                console.log("Gallery.jsx (RESET): Firebase returned:", crewmatesData);
                setCrewmates(crewmatesData); 

            } catch (error) {
                console.error("Gallery.jsx (RESET): Error fetching crewmates: ", error); 
            }
        };

        fetchCrewmates();
    }, []); 

    return (
        <div>
            <h2>Your Crewmate Gallery</h2>
            <div className="gallery-grid">
                {
                    crewmates.length > 0 ? (
                        crewmates.map((crewmate) => (
                            <Link to={`/${crewmate.id}`} key={crewmate.id} className="crewmate-card">
                                
                                <div className="card-info">
                                    <h3>{crewmate.name}</h3>
                                    <p><span className="stat">Speed:</span> {crewmate.speed} mph</p>
                                    <p><span className="stat">Color:</span> {crewmate.color}</p>
                                    {/* --- THIS LINE DISPLAYS THE GENDER --- */}
                                    <p><span className="stat">Gender:</span> {crewmate.gender}</p>
                                </div>
                                
                                <img 
                                    src={crewmate.imageUrl} 
                                    alt={`${crewmate.color} ${crewmate.name}`} 
                                    className="card-image-small"
                                />
                            </Link>
                        ))
                    ) : (
                        <p>No crewmates found. <Link to="/new">Create one!</Link></p>
                    )
                }
            </div>
        </div>
    );
};

export default Gallery;