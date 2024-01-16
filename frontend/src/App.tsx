import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";

import "./App.css";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <AuthProvider>
        <h1>Gastos en comun</h1>
        <RegisterPage />
      </AuthProvider>
    </>
  );
}

export default App;
