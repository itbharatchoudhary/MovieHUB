import React, { useState } from "react";
import "./Login.scss";

const Login = () => {

  const [form, setForm] = useState({
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
    console.log(form);
  };

  return (
    <div className="login-page">

      <div className="login-container">

        <div className="login-header">
          <h1>MovieHUB</h1>
          <p>Welcome back</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

          <button className="login-btn">
            Sign In
          </button>

          <div className="register-link">
            <p>
              Don't have an account?
              <a href="/register">Register</a>
            
            </p>
          </div>

        </form>

      </div>

    </div>
  );
};

export default Login;



