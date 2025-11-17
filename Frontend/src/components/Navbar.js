import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './NavBar.css';

function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isSubscribed');
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow sticky-top" style={{ padding: '10px 20px' }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-danger fs-3" to="/home">
          ReadWatchFlix
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/anime">Anime</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/reading">Reading</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/vote">Vote</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/payment">Payment</Link>
            </li>
          </ul>

          {/* ✅ Search Bar */}
          <form className="d-flex me-3" onSubmit={handleSearchSubmit}>
            <input
              className="form-control rounded-pill me-2"
              type="search"
              placeholder="Search Anime / Manga..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '250px' }}
            />
            <button className="btn btn-danger rounded-pill" type="submit">Search</button>
          </form>

          <button className="btn btn-outline-light rounded-pill" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
