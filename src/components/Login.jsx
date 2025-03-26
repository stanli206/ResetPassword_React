import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import confetti from "canvas-confetti";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const firework = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = [
      "#ff0000",
      "#ff7300",
      "#fffb00",
      "#00ff00",
      "#0080ff",
      "#8000ff",
    ];

    const frame = () => {
      if (Date.now() > animationEnd) return;
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        scalar: 1.2,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        colors: colors,
      });
      requestAnimationFrame(frame);
    };

    frame();
  };

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://reset-password-flow-task.onrender.com/api/users/login",
        user
      );
      localStorage.setItem("authToken", res.data.token); // Save JWT token
      setMessage(res.data.message);
      setError("");
      firework();
      setTimeout(() => navigate("/home"), 500); // Redirect to Home page
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
      setMessage("");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center">Login</h2>
        {message && <p className="text-success text-center">{message}</p>}
        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="form-control mb-3"
            required
          />
          <button className="btn btn-primary w-100">Login</button>
        </form>

        <div className="text-center mt-3">
          <Link to="/forgot-password" className="text-primary">
            Forgot Password?
          </Link>
        </div>

        <div className="text-center mt-2">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
