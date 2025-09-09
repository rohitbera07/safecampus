import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => email.endsWith('@universal.edu.in');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Email must be a university ID (ends with @universal.edu.in)');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // Save token and role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
        localStorage.setItem("email", data.email);
        localStorage.setItem("name", data.name);
      toast.success("Logged in successfully!");

      // Navigate based on role
      if (data.role === "student") {
        navigate("/student");
      } else if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard"); // fallback
      }
    } catch (error) {
      setLoading(false);
      toast.error("Server error, try again later");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-blue-200 to-gray-300 flex gap-28 items-center justify-center p-6">
     <h1 className='text-3xl fixed top-4 left-0 mx-10 '>Safe Campus</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-md transform transition-all duration-500 hover:scale-[1.02]"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="University Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="text-right mb-4">
          <span
            onClick={() => toast('Password recovery not implemented.')}
            className="text-sm text-blue-600 hover:underline cursor-pointer"
          >
            Forgot password?
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Haven’t registered yet?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
