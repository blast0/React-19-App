import { Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import Home from "./pages/Home/Home"; // Adjust the path to your Home component
import Service from "./pages/Service/Service";
import { useTheme } from "./context/themeProvider";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Dashboard/Profile";
import Settings from "./pages/Dashboard/Settings";
import Spin from "./components/ui/custom/spinner";
import { useAuth0 } from "@auth0/auth0-react";
import FabricEditorPage from "./pages/FabricEditor/Editor";
import Layout from "./components/Layout/layout";

function App() {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
  const { darkMode } = useTheme();
  const theme = darkMode ? "dark" : "light";
  return (
    <div id="popmenu-container">
      <Spin id="root" overlayProps={{ position: "fixed" }} />
      {isLoading ? (
        <div className="w-[100vw] h-[100vh] bg-red-100 flex flex-col justify-center gap-2 items-center">
          <span className="login-loader"></span>
          <p className="text-4xl">Loading...</p>
        </div>
      ) : isAuthenticated ? (
        <>
          <Routes>
            <Route
              index
              path="/Editor"
              element={<Layout children={<FabricEditorPage theme={theme} />} />}
            />
            <Route
              path="/"
              element={<Layout children={<Home theme={theme} />} />}
            />
            <Route
              path="/about"
              element={<Layout children={<About theme={theme} />} />}
            />
            <Route
              path="/services"
              element={<Layout children={<Service theme={theme} />} />}
            />
            <Route
              path="/dashboard"
              element={<Layout children={<Dashboard theme={theme} />} />}
            >
              <Route path="profile" element={<Profile theme={theme} />} />
              <Route path="settings" element={<Settings theme={theme} />} />
            </Route>
          </Routes>
        </>
      ) : (
        loginWithRedirect()
      )}
    </div>
  );
}

export default App;
