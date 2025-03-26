import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Please login and try again!"); // Show alert before redirect
        navigate("/"); // Redirect to Login page
      }
    }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear token
    navigate("/"); // Redirect to Login page
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-primary text-white">
      <nav className="navbar navbar-light bg-light shadow px-4">
        <h2 className="navbar-brand fw-bold text-dark">🏡 Welcome to Home</h2>
        <button
          onClick={handleLogout}
          className="btn btn-danger px-4 py-2 fw-bold"
        >
          Logout
        </button>
      </nav>

      <div className="container text-center d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <div className="card shadow-lg p-5 bg-white text-dark rounded-4">
          <h3 className="fw-bold">Hello User! You are logged in. 🚀</h3>
          <p className="fw-small text-secondary">
            You are logged in successfully. Explore and enjoy your experience!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
