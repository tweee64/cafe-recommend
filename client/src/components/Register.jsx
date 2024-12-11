import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register({ openLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState();

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setSuccess(false);
      return;
    }
    const apiUrl = `${import.meta.env.VITE_API_URL}`;
    axios
      .post(`${apiUrl}register`, { name, email, password })
      .then((result) => {
        console.log(result);
        openLogin();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="">
            Name
          </label>
          <input
            type="name"
            className="w-full px-3 py-2 border"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="text-red-800">{error}</span>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="">
            Password
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <button type="submit" className="w-full bg-red-600 text-white py-2">
            {" "}
            Sign Up
          </button>
        </div>
      </form>
      <div className="text-center">
        <span className="text-gray-700">Already Have an Account? </span>
        <button className="text-red-800" onClick={openLogin}>
          {" "}
          Login
        </button>
      </div>
    </div>
  );
}

export default Register;
