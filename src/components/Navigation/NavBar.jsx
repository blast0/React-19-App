import { useState } from "react";
import {
  UserRound,
  UserRoundX,
  ChevronDown,
  UserRoundPen,
} from "lucide-react";
import { MenuButton } from "../ui/custom/menu-button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaHamburger } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import SunAnimation from "../../assets/SunLightTheme.json";
import MoonAnimation from "../../assets/MoonLightTheme.json";
import { Title } from "@/components/ui/title";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/components", label: "Components Preview" },
  { to: "/images", label: "Images" },
  { to: "/editor", label: "Editor" },
  { to: "/dashboard", label: "Dashboard" },
];

const ACCOUNT = [
  {
    name: "Edit Profile",
    icon: <UserRoundPen />,
    value: "EditAccount",
  },
  {
    name: "Logout",
    icon: <UserRoundX />,
    value: "Logout",
  },
];

const Navbar = ({
  user = {},
  theme = "dark",
  setTheme = () => {},
  signout = () => {},
  isAuthenticated = false,
  loginWithRedirect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const themeIcon = theme === "light" ? MoonAnimation : SunAnimation;
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div
      className={`w-full h-[50px] lg:px-8 md:px-4 bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(0,0,0,0.8)] static backdrop-filter backdrop-blur-lg hidden md:flex justify-between items-center gap-4 shadow-sm shadow-gray-300 dark:shadow-gray-800 fixed z-10 transition-all duration-100`}
      style={{
        backgroundColor:
          theme === "light" ? "#ffffffcc" : "rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {NAV_LINKS.map((link) => (
          <NavLink key={link.to} to={link.to} className="hover:text-green-800 text-[#c72c6c] dark:text-[#07d0e5] font-semibold">
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
        >
          {isOpen ? (
            <IoCloseCircleSharp className="h-6 w-6" />
          ) : (
            <FaHamburger className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Right Side - Theme Toggle + Profile/Login */}
      <div className="flex items-center gap-5">
        {/* Theme Toggle */}
        <div
          className="cursor-pointer h-[50px] w-[50px] hover:scale-110"
          onClick={toggleTheme}
        >
          <Lottie animationData={themeIcon} loop />
        </div>

        {/* Profile or Login */}
        {isAuthenticated ? (
          <MenuButton
            title="Profile options"
            options={ACCOUNT}
            onSelect={(option) => option.value === "Logout" && signout()}
          >
            <div className="flex items-end">
              <Avatar>
                <AvatarImage
                  src={user?.picture || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>
                  <UserRound color="white" />
                </AvatarFallback>
              </Avatar>
              <ChevronDown color="white" />
            </div>
          </MenuButton>
        ) : (
          <Title title="Login To use all Features">
            <Avatar
              className="cursor-pointer"
              onClick={loginWithRedirect}
            >
              <AvatarImage src="/login.png" />
              <AvatarFallback>
                <UserRound color="white" />
              </AvatarFallback>
            </Avatar>
          </Title>
        )}
      </div>
    </div>
  );
};

export default Navbar;
