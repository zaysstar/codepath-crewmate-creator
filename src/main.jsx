// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import CreateCrewmate from './pages/CreateCrewmate';
import Gallery from './pages/Gallery';
import Details from './pages/Details';
import EditCrewmate from './pages/EditCrewmate'; // <-- Import the new Edit page
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index={true} element={<Gallery />} /> 
          <Route path="/new" element={<CreateCrewmate />} />
          <Route path="/:id" element={<Details />} /> 
          <Route path="/:id/edit" element={<EditCrewmate />} /> {/* <-- ADD THIS LINE */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);