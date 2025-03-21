import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import confetti from "canvas-confetti";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showFireworks, setShowFireworks] = useState(false);

  // Fireworks function
  const firework = () => {
    const duration = 4 * 1000; // Fireworks duration (4 seconds)
    const animationEnd = Date.now() + duration;
    const colors = ["#ff0000", "#ff7300", "#fffb00", "#00ff00", "#0080ff", "#8000ff"];

    const frame = () => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return;
      }

      // Launch multiple fireworks in random positions
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        scalar: 1.2,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.5,
        },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5002/api/users/login", user);
      setMessage(res.data.message);
      setError("");
      setShowFireworks(true);
      firework();

      setTimeout(() => {
        setShowFireworks(false);
        navigate("/");
      }, 3500); // Redirect after fireworks
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md relative z-10">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {message && <p className="text-green-500 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <button
            className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-all"
          >
            Login
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-3">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Register Link */}
        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
