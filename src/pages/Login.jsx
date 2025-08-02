import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const validateEmail = (email) => email.endsWith('@universal.edu.in');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Email must be a university ID (ends with @universal.edu.in');
      return;
    }

    // Simulate login success (replace with actual API call)
    toast.success('Logged in successfully!');
    console.log('Login Data:', formData);
    navigate('/dashboard'); // Replace with your actual route
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-400 via-purple-200 to-gray-600 flex items-center justify-center p-6">
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
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
        >
          Login
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
