import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginRegisterPage from "./pages/LoginRegisterPage";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Notifications from "./components/Notifications";
import GroupsExpenses from "./pages/GroupsExpenses";
import ProtectedRoute from "./ProtectedRoute";
import { GroupsProvider } from "./context/GroupsContext";
import GroupPage from "./pages/GroupPage";
import Footer from "./components/Footer";
import Error404 from "./components/Error404";
import FAQ from "./pages/FAQ";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <GroupsProvider>
            <main className="min-h-screen md:min-h-0">
              <Navbar />
              <Notifications />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/registro"
                  element={<LoginRegisterPage type="registro" />}
                />
                <Route
                  path="/login"
                  element={<LoginRegisterPage type="login" />}
                />

                <Route path="/faq" element={<FAQ />} />
                <Route path="/grupo/:groupId" element={<GroupPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/grupos" element={<GroupsExpenses />} />
                </Route>

                <Route path="*" element={<Error404 />} />
              </Routes>
              <Footer />
            </main>
          </GroupsProvider>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
