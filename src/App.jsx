import { Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import Home from "./pages/Home/Home"; // Adjust the path to your Home component
import ComponentsPreview from "./pages/components-preview/ComponentsPreview";
import GalleryPage from "./pages/ImageGallery/imagegallery";
import { useTheme } from "./context/themeProvider";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Dashboard/Profile";
import Settings from "./pages/Dashboard/Settings";
import Spin from "./components/ui/custom/spinner";
import { useAuth0 } from "@auth0/auth0-react";
import FabricEditor2 from "./pages/NewEditor";
import Navbar from "./components/Navigation/NavBar";

function App() {
  const { isLoading, isAuthenticated, loginWithRedirect, user, logout } = useAuth0();
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = isDarkMode ? "dark" : "light";
  return (
    <div id="popmenu-container">
      <Spin id="root" overlayProps={{ position: "fixed" }} />
      {isLoading ? (
        <div className="w-[100vw] h-[100vh] bg-red-100 flex flex-col justify-center gap-2 items-center">
          <span className="login-loader"></span>
          <p className="text-4xl">Loading...</p>
        </div>
      ) :
      <>
      <div>
      <Navbar
        user={user}
        theme={isDarkMode ? "dark" : "light"}
        setTheme={toggleTheme}
        isAuthenticated={isAuthenticated}
        loginWithRedirect={loginWithRedirect}
        signout={logout}
      />
      <main>          
          <Routes>
            <Route
              path="/"
              element={<Home theme={theme} />}
            />
            <Route
              path="/about"
              element={<About theme={theme} />}
            />
            <Route
              path="/components"
              element={<ComponentsPreview theme={theme} />}
            />
            <Route
              index
              path="/editor"
              element={<FabricEditor2 theme={theme} />}
            />
            <Route
              path="/images"
              element={<GalleryPage theme={theme} />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard theme={theme} />}
            >
              <Route path="profile" element={<Profile theme={theme} />} />
              <Route path="settings" element={<Settings theme={theme} />} />
            </Route>
          </Routes>
        </main>
    </div>
      </>
      }
    </div>
  );
}

export default App;
