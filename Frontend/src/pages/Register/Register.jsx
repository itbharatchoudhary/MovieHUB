import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/AuthApi";
import "./Register.scss";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // confirm password check
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {

      const userData = {
        name: form.name,
        email: form.email,
        password: form.password
      };

      const res = await registerUser(userData);

      localStorage.setItem("token", res.token);

      navigate("/");

    } catch (err) {

      setError(
        err.response?.data?.message || "Registration failed"
      );

    }
  };

  return (

    <div className="registerPage">

      <div className="registerContainer">

        <div className="registerHeader">
          <h1>Create Your Account</h1>
          <p>Join MovieHUB and start exploring movies</p>
        </div>

        {error && <p className="errorMsg">{error}</p>}

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