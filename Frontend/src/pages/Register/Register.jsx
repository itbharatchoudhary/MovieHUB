import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Register Data:", form);

    alert("Account created successfully!");

    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

    navigate("/login");
  };

  return (
    <div className="registerPage">

      <div className="registerContainer">

        <div className="registerHeader">
          <h1>Create Your Account</h1>
          <p>Join MovieHUB and start exploring movies</p>
        </div>

        <form className="registerForm" onSubmit={handleSubmit}>

          <div className="inputGroup">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="registerBtn">
            Create Account
          </button>

        </form>

        <div className="loginRedirect">
          Already have an account?
          <span onClick={() => navigate("/login")}> Login</span>
        </div>

      </div>

    </div>
  );
};

export default Register;