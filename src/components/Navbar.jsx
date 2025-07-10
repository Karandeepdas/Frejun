import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../assets/logo.png';

function Navbar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a href="/" className="navbar-brand">
        <img style={{height:"25px",width:"25px"}} src={logo} alt="Logo" className="me-2" />
        Frejun
      </a>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item mx-3"><a className="nav-link text-white" href="#">About</a></li>
          <li className="nav-item mx-3"><a className="nav-link text-white" href="#">Contact</a></li>
          <li className="nav-item mx-3"><a className="nav-link text-white" href="#">Pricing</a></li>
        </ul>

        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search email..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="btn btn-light" onClick={handleSearch}>
            <i color='' className="fas fa-search text-dark"></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
