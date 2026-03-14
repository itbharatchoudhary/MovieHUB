import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./pages/Navbar/Navbar";
import Footer from "./pages/Footer/Footer";
import AppRoutes from "./routes/App.routes";


const App = () => {
  return (
    <div>

      <Navbar />

      <AppRoutes />

      <Footer />

    </div>
  );
};

export default App;