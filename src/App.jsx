import React from 'react';
import { Outlet, NavLink } from "react-router-dom"; // Use NavLink for active styling
import './Layout.css'; // Import the new layout CSS

const App = () => {
  return (
    <div className="App_layout">

      {/* This is the "gray rectangle on the side" */}
      <aside className="sidebar">
        <nav>
          {/* Links are "lined up from top to bottom" */}
          <NavLink to="/">
            Crewmate Gallery
          </NavLink>
          <NavLink to="/new">
            Create a Crewmate
          </NavLink>
        </nav>
      </aside>

      {/* The rest of the page content */}
      <main className="content">
        <Outlet />
      </main>
      
    </div>
  );
};

export default App;