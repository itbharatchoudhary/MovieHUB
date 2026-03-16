import React, { useState } from "react";
import "./Register.scss";

const Register = () => {

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

    if(form.password !== form.confirmPassword){
      alert("Passwords do not match");
      return;
    }

    console.log("Register Data:", form);
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h1 className="logo">MovieHUB</h1>
        <p className="subtitle">Create your account</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@email.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          <button className="register-btn">
            Create Account
          </button>

        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>

      </div>

    </div>
  );
};

export default Register;