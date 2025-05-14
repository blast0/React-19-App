import React, { useState } from "react";
import {
  // Sun,
  // Moon,
  UserRound,
  UserRoundX,
  UsersRound,
  ChevronDown,
  UserRoundPen,
  UserRoundPlus,
} from "lucide-react";
import { MenuButton } from "../ui/custom/menu-button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaHamburger } from "react-icons/fa"; // Hamburger icon
import { IoCloseCircleSharp } from "react-icons/io5"; // Close icon
import { NavLink } from "react-router-dom";
import SunAnimation from "../../assets/SunLightTheme.json";
import MoonAnimation from "../../assets/MoonLightTheme.json";
import Lottie from "lottie-react";
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
  {
    name: "Switch Account",
    icon: <UsersRound />,
    value: "SwitchAccount",
  },
  {
    name: "Add another Account",
    icon: <UserRoundPlus />,
    value: "AddAccount",
  },
];

const Navbar = ({
  user = {},
  theme = "dark",
  setTheme = () => {},
  signout = () => {},
}) => {
  console.log(user);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="NavBar"
      style={{
        width: "100%",
        height: "50px",
        backgroundColor: theme === "light" ? "#0078d4" : "#181717",
        display: "flex",
        gap: "30px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="hidden md:flex md:items-center mx-10 md:space-x-8">
        <NavLink to="/" className="hover:text-green-300 text-white">
          Home
        </NavLink>
        <NavLink to="/about" className="hover:text-green-300 text-white">
          About
        </NavLink>
        <NavLink to="/services" className="hover:text-green-300 text-white">
          Services
        </NavLink>
        <NavLink to="/Editor" className="hover:text-green-300 text-white">
          Editor
        </NavLink>
        <NavLink to="/dashboard" className="hover:text-green-300 text-white">
          Dashboard
        </NavLink>
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex cursor-pointer items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <FaHamburger className={`${isOpen ? "hidden" : "block"} h-6 w-6`} />
          <IoCloseCircleSharp
            className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
          />
        </button>
      </div>

      <div className="flex mr-5 justify-center gap-5 items-center">
        <div
          className="cursor-pointer h-[50px] w-[50px] overflow-hidden"
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
        >
          {theme === "light" ? (
            <div className="h-[80px] w-[80px] mt-[-12px] ml-[-12px]">
              <Lottie animationData={MoonAnimation} loop={true} />
            </div>
          ) : (
            <div className="h-[50px] w-[50px] ">
              <Lottie animationData={SunAnimation} loop={true} />
            </div>
          )}
        </div>
        <MenuButton
          title="Profile options"
          options={ACCOUNT}
          onSelect={(option) => {
            if (option.value === "Logout") {
              signout();
            }
          }}
        >
          <div className="flex items-end">
            <Avatar>
              <AvatarImage
                src={user ? user.picture : "https://github.com/shadcn.png"}
              />
              <AvatarFallback>
                <UserRound color="white" />
              </AvatarFallback>
            </Avatar>
            <ChevronDown color="white" />
          </div>
        </MenuButton>
      </div>
    </div>
  );
};

export default Navbar;
