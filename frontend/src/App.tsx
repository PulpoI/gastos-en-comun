import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/LoginRegisterPage";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Notifications from "./components/Notifications";
import GroupsExpenses from "./pages/GroupsExpenses";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <main>
            <Navbar />
            <Notifications />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/registro"
                element={<RegisterPage type="registro" />}
              />
              <Route path="/login" element={<RegisterPage type="login" />} />
              <Route path="/gastos" element={<GroupsExpenses />} />
            </Routes>
          </main>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
