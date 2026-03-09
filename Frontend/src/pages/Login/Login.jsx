import { useState } from "react";
import "./Login.scss";
import api from "../../api/TMDB";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      window.location.href = "/";

    } catch (err) {
      alert("Invalid credentials");
      console.log(err);
    }
  };

  return (
    <div className="login-page">

      <div className="overlay"></div>

      <div className="login-container">

        <h1 className="logo">MovieHUB</h1>

        <form onSubmit={handleLogin}>

          <h2>Sign In</h2>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Sign In
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;