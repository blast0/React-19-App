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
  { to: "/components", label: "Preview" },
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
  const [menuOpen, setMenuOpen] = useState(false);
  const themeIcon = theme === "light" ? MoonAnimation : SunAnimation;
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <header className="sticky top-2 mx-4 z-30 backdrop-blur-md border-b border-slate-200 rounded-[15px]" style={{
        backgroundColor:
          theme === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)", border: "1px solid gray"
      }}>
        <div className="mx-auto px-6 py-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold" onClick={() => setMenuOpen((s) => !s)}>B</div>
        <div className="md:hidden">
         <div className="md:hidden w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold"
          onClick={() => setMenuOpen((s) => !s)}
          aria-label="Toggle menu"
          // className="p-2 rounded-md border"
        >
          {menuOpen ?  (
            <IoCloseCircleSharp className="h-6 w-6" />
          ) : (
            <FaHamburger className="h-6 w-6" />
          )}
        </div>
      </div>
      <div className="">
        <div className="font-semibold text-[#c72c6c] dark:text-[#07d0e5]">Bishal Kumar</div>
        <div className="text-xs text-slate-500 dark:text-[#07d0e5] hidden md:block">Frontend Engineer</div>
      </div>
    </div>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {NAV_LINKS.map((link) => (
          <NavLink key={link.to} to={link.to} className="hover:text-green-800 text-[#c72c6c] dark:text-[#07d0e5] font-semibold">
            {link.label}
          </NavLink>
        ))}
      </div>



      {/* Right Side - Theme Toggle + Profile/Login */}
      <div className="flex items-center gap-3">
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

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-200">
            <ul className="px-6 py-2 space-y-2 flex flex-col">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className="hover:text-green-800 text-[#c72c6c] dark:text-[#07d0e5] font-semibold">
                {link.label}
              </NavLink>
            ))}
            </ul>
          </div>
        )}
    </header>
  );
};

export default Navbar;

