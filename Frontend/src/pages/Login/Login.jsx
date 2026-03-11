import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { loginUser } from "../../api/AuthApi";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {

  e.preventDefault();
  setLoading(true);

  try {

    const res = await loginUser(form);

    console.log("Login response:", res);

    if (!res || !res.token) {
      throw new Error("Token not received from server");
    }

    localStorage.setItem("token", res.token);

    alert("Login successful 🎉");

    navigate("/");

  } catch (err) {

    console.error("Login error:", err);
    alert(err.message || "Invalid email or password");

  } finally {

    setLoading(false);

  }
};

  return (
    <div className="loginPage">

      <div className="loginContainer">

        <div className="loginHeader">
          <h1>Welcome Back</h1>
          <p>Login to continue exploring MovieHUB</p>
        </div>

        <form className="loginForm" onSubmit={handleLogin}>

          <div className="inputGroup">
            <label>Email Address</label>
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
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="loginBtn" disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <div className="registerRedirect">
          Don't have an account?
          <span onClick={() => navigate("/register")}> Register</span>
        </div>

      </div>

    </div>
  );
};

export default Login;