import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For page navigation
import "./Register.scss";

const Register = () => {
  const navigate = useNavigate(); // initialize navigation
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Replace this with actual API call
    console.log("User Register Data:", form);
    alert("Registration Successful! Redirecting to Login page...");

    // Reset form
    setForm({ name: "", email: "", password: "" });

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="registerPage">
      <div className="overlay">
        <div className="registerBox">
          <h1>Register</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Register</button>
          </form>

          <p className="loginText">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;