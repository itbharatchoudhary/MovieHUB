import React, { useState } from "react";
import "./SignUp.scss";

const SignUp = () => {

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
    console.log(form);
  };

  return (
    <div className="signupPage">

      <div className="overlay">

        <div className="signupBox">

          <h1>Sign Up</h1>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <button type="submit">
              Sign Up
            </button>

          </form>

          <p className="loginText">
            Already have an account? <span>Login</span>
          </p>

        </div>

      </div>

    </div>
  );
};

export default SignUp;