import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchForm from './SearchForm';


const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Allomovie</h1>

      <div className="links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Accueil
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Favoris
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar;