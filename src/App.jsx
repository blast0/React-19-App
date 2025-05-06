import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import About from "./pages/About/About";
import Home from "./pages/Home/Home"; // Adjust the path to your Home component
import Navbar from "./components/Navigation/NavBar"; // Optional: If Navbar should be outside Routes
import Service from "./pages/Service/Service";
import Contact from "./pages/Contact/Contact";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Dashboard/Profile";
import Settings from "./pages/Dashboard/Settings";
import Spin from "./components/ui/custom/spinner";
import { useAuth0 } from "@auth0/auth0-react";
import FabricEditorPage from "./pages/FabricEditor/Editor";

function App() {
  const [theme, setTheme] = useState("light");
  const { user, isLoading, isAuthenticated, loginWithRedirect, logout } =
    useAuth0();

  return (
    <>
      <Spin id="root" overlayProps={{ position: "fixed" }} />
      {isLoading ? (
        <div className="w-full h-full bg-red-100 flex flex-col justify-center gap-2 items-center">
          <span class="login-loader"></span>
          <p className="text-4xl">Logging In...</p>
        </div>
      ) : isAuthenticated ? (
        <>
          <Navbar
            user={user}
            theme={theme}
            setTheme={setTheme}
            signout={() => {
              logout();
            }}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Service />} />
            <Route
              path="/imageEditor"
              element={<FabricEditorPage theme={theme} />}
            />
            <Route path="/dashboard" element={<Dashboard />}>
              {/* Nested routes under /dashboard */}
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </>
      ) : (
        loginWithRedirect()
      )}
    </>
  );
}

export default App;
