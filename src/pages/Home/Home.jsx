import Coding from "../../assets/coding.json";
import Lottie from "lottie-react";
import "./home.css";

const skills = [
  "JavaScript (ES6+)",
  "TypeScript",
  "React.js",
  "Angular",
  "Node.js",
  "Express",
  "HTML5 & CSS3",
  "Tailwind CSS",
  "Git & GitHub"
];

const projects = [
  {
    title: "Employee Management System",
    desc: "A full-stack CRUD app built with Node.js, Express, and Angular.",
    link: "#",
  },
  {
    title: "Portfolio Website",
    desc: "Personal portfolio built using React, Tailwind CSS, and Framer Motion.",
    link: "#",
  },
  {
    title: "E-commerce Dashboard",
    desc: "Admin panel for managing products and orders built with React.",
    link: "#",
  },
];

const Home = () => {
  return (
    <>
      <div class="flex align-center justify-center flex-wrap overflow-x-hidden px-[20px] md:px-[20px] lg:px-[20px] pt-[60px] md:pt-0 md:flex items-center justify-around shadow-zinc-300 dark:shadow-zinc-700 shadow-sm">
        <div className="w-full max-w-[500px] cursor-pointer">
          <Lottie animationData={Coding} loop />
        </div>
      </div>
    </>
  );
};

export default Home;
