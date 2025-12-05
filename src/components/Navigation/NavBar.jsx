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
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/components", label: "Ui Testing" },
  { to: "/images", label: "Images" },
  { to: "/neweditor", label: "newEditor" },
  { to: "/contact", label: "contact" },
  { to: "/editor", label: "Editor" },
  { to: "/projects", label: "Projects" },
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
    <motion.header
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6 }}
     className="sticky top-2 mx-4 z-30 backdrop-blur-md rounded-[15px]" style={{
        backgroundColor:
          theme === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)",
          boxShadow: theme === "light" ? "#07d0e58f 4px 6px 0px 0px, rgba(0, 0, 0, 0.35) 0px 16px 16px -12px": "#c72c6c 4px 6px 0px 0px, rgba(0, 0, 0, 0.35) 0px 16px 16px -12px"
      }}>
        <div className="mx-auto px-4 py-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`hidden flex md:flex w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500  ${theme === "light" ? "to-[#07d0e5]" : "to-pink-500"} items-center justify-center text-white font-bold`} onClick={() => setMenuOpen((s) => !s)}>B</div>
        <div className="md:hidden">
          <div className={`md:hidden cursor-pointer w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 ${theme === "light" ? "to-[#07d0e5]" : "to-pink-500"} flex items-center justify-center text-white font-bold`}
            onClick={() => setMenuOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {menuOpen ?  (
              <IoCloseCircleSharp className="h-6 w-6" />
            ) : (
              <FaHamburger className="h-6 w-6" />
            )}
          </div>
        </div>
          <div>
            <NavLink key={"/"} to={"/"} className={`${theme === "light" ? "text-[#07d0e5] hover:text-[#c72c6c]" : "text-[#c72c6c] hover:text-[#07d0e5]"} font-semibold`}>
              <div className={`font-semibold ${theme === "light" ? "text-[#07d0e5]" : "text-[#c72c6c]"}`}>Bishal Kumar</div>
            </NavLink>
            <div className={`text-xs ${theme === "light" ? "text-[#07d0e5]" : "text-[#c72c6c]"} hidden md:block`}>Frontend Engineer</div>
          </div>
        </div>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {NAV_LINKS.map((link) => (
          <NavLink key={link.to} to={link.to} className={`${theme === "light" ? "text-[#07d0e5] hover:text-[#c72c6c]" : "text-[#c72c6c] hover:text-[#07d0e5]"} font-semibold`}>
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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden border-t border-slate-200 overflow-hidden"
          >
            <motion.ul
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="px-4 py-2 space-y-2 flex flex-col"
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.to}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className={`py-1 border-b border-solid ${theme === "light" ? "border-[#07d0e5]" : "border-[#c72c6c]"} `}
                >
                  <NavLink
                    to={link.to}
                    className={`${
                      theme === "light"
                        ? "text-[#07d0e5] hover:text-[#c72c6c]"
                        : "text-[#c72c6c] hover:text-[#07d0e5]"
                    } font-semibold`}
                    onClick={() => setMenuOpen(false)} // optional close on click
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;

