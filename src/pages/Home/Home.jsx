import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Mail from "../../assets/Mail.json";
import Coding from "../../assets/coding.json";
import Linkedin from "../../assets/Linkedin.json";
import GitHubLogo from "../../assets/GitHubLogo.json";
import ReactIcon from "../../assets/ReactIcon.json";
import Angular from "../../assets/Angular.json";
import MySQL from "../../assets/MySQL.json";
import Mongodb from "../../assets/Mongodb.json";
import Javascript from "../../assets/Javascript.json";
import Nodejs from "../../assets/Nodejs.json";
import Whatsapp from "../../assets/Whatsapp.json";
import Call from "../../assets/Call.json";
import Cprogram from "../../assets/Cprogram.json";
import Cplusplus from "../../assets/Cplusplus.json";
import Nextjs from "../../assets/Nextjs.json";
import HTML from "../../assets/HTML.json";
import Css3 from "../../assets/css3.json";
import firebase from "../../assets/firebase.json";
import docker from "../../assets/docker.json";
import TypeScipt from "../../assets/TypeScript.json";
import Me from "../../assets/me.jpg";

export default function Home() {
  const techStack = [
    { label: "C", animation: Cprogram, size: "50px", top: 5, labelMargin: 0 },
    { label: "C++", animation: Cplusplus, size: "80px", top: -10, labelMargin: -15 },
    { label: "HTML5", animation: HTML, size: "65px", top: -5, labelMargin: -5 },
    { label: "CSS3", animation: Css3, size: "60px", top: -10, labelMargin: 5 },
    { label: "Javascript", animation: Javascript, size: "45px", top: 10, labelMargin: 0 },
    { label: "TypeScipt", animation: TypeScipt, size: "65px", top: 0, labelMargin: -10 },
    { label: "React", animation: ReactIcon, size: "50px", top: 5, labelMargin: 0 },
    { label: "NextJS", animation: Nextjs, size: "55px", labelMargin: 0 },
    { label: "Angular", animation: Angular, size: "60px", top: -5, labelMargin: 0 },
    { label: "NodeJS", animation: Nodejs, size: "120px", top: -20, labelMargin: -45 },
    { label: "MongoDB", animation: Mongodb, size: "60px", top: -15, labelMargin: 10 },
    { label: "Firebase", animation: firebase, size: "65px", top: -20, labelMargin: 10 },
    { label: "MySQL", animation: MySQL, size: "80px", top: -10, labelMargin: -15 },
    { label: "Docker", animation: docker, size: "80px", top: -10, labelMargin: -15 },
  ];

  const projects = [
  {
  title: "Fleet Tracking Dashboard",
  description: "Interactive real‑time fleet tracking dashboard with trip playback, telemetry events, and Leaflet map visualization.",
  tech: ["React", "Leaflet", "Tailwind", "React‑Leaflet"],
  link: "https://mapup-fleet-dashboard-by-bishalkr.netlify.app/",
  preview: "https://github.com/blast0/Demo-assets/blob/main/ter-ezgif.com-optimize.gif"
  },
  {
  title: "E-Commerce Store",
  description: "Full stack MERN e-commerce platform with cart and authentication.",
  tech: ["MongoDB", "Express", "React", "Node"],
  link: "https://mapup-fleet-dashboard-by-bishalkr.netlify.app/",
  preview: "https://github.com/blast0/Demo-assets/blob/main/ter-ezgif.com-optimize.gif"
  },
  {
  title: "Task Manager App",
  description: "Task management app with drag & drop and real‑time syncing.",
  tech: ["React", "Firebase", "DND Kit"],
  link: "https://mapup-fleet-dashboard-by-bishalkr.netlify.app/",
  preview: "https://github.com/blast0/Demo-assets/blob/main/ter-ezgif.com-optimize.gif"
  },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-6">
          {/* HERO */}
          <section className="grid md:grid-cols-1 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center h-full">
              <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                Hi, I’m <span className="bg-gradient-to-r from-indigo-500 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">Bishal Kumar</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight" >
                <p className="bg-gradient-to-r from-indigo-500 via-pink-500 to-indigo-500 inline-block text-transparent bg-clip-text"> Software Engineer</p>
              </h2>

              <p className="mt-4 text-sm sm:text-lg">
                with 3+ years of experience building high-performance web apps...
              </p>
              <p className="mt-3 text-xs sm:text-base">
                Passionate about clean UI, performance and developer experience.
              </p>              
              </div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-around items-center h-full"
              >
                <div className="w-full max-w-xs sm:max-w-sm h-56 sm:h-72 rounded-2xl  flex items-center justify-center">
                  <img src={Me} className="justify-center" style={{borderRadius: "100%", objectFit: "cover", height: "150px", width: "150px"
                  }} alt=""  />              
                </div>
              </motion.div>
       
              {/* Coding Animation */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="hidden md:flex flex-col justify-around items-center h-full">
                <div className="w-full max-w-xs sm:max-w-sm h-56 sm:h-72 rounded-2xl  flex items-center justify-center">
                  <Lottie animationData={Coding} loop />
                </div>
              </motion.div>
              </div>

                <section id="projects" className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>


                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                <div
                key={index}
                className="group p-0 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition duration-300 bg-white overflow-hidden"
                >
                {project.preview && (
                <div className="h-48 overflow-hidden relative">
                <img
                src={project.preview}
                alt={project.title}
                className="w-full h-full object-cover"
                />
                </div>
                )}


<div className="p-6">
<h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
<p className="text-gray-600 mb-4">{project.description}</p>


<div className="flex flex-wrap gap-2 mb-4">
{project.tech.map((t, idx) => (
<span
key={idx}
className="px-3 py-1 text-sm bg-gray-100 rounded-full border border-gray-200"
>
{t}
</span>
))}
</div>


<div className="flex gap-3 mt-4">
{project.demo && (
<a
href={project.demo}
target="_blank"
className="px-4 py-2 rounded-xl border border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition"
>
Live Demo
</a>
)}
{project.github && (
<a
href={project.github}
target="_blank"
className="px-4 py-2 rounded-xl border border-gray-600 text-gray-700 font-medium hover:bg-gray-700 hover:text-white transition"
>
GitHub
</a>
)}
</div>
</div>
</div>
))}
</div>
</div>
</section> 

              {/* CTA */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a href="#projects" className="inline-flex justify-center px-5 py-2.5 rounded-md bg-indigo-600 text-white">
                  View Projects
                </a>
                <a href="#contact" className="inline-flex justify-center px-5 py-2.5 rounded-md border">
                  Contact
                </a>
              </div>

              <section id="projects" className="py-20 bg-gradient-to-b from-white to-gray-50">
              <div className="">
              <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>


              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
              <div
              key={index}
              className="p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition duration-300 bg-white"
              >
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>


              <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t, idx) => (
              <span
              key={idx}
              className="px-3 py-1 text-sm bg-gray-100 rounded-full border border-gray-200"
              >
              {t}
              </span>
              ))}
              </div>


              <a
              href={project.link}
              target="_blank"
              className="inline-block mt-2 font-medium hover:underline text-blue-600"
              >
              View Project →
              </a>
              </div>
              ))}
              </div>
              </div>
              </section>

              {/* Social Icons */}
              <div className="mt-6 flex gap-4 flex-wrap items-center">
                <a href="https://github.com/blast0" target="_blank" className="h-12 w-12 sm:h-14 sm:w-14">
                  <Lottie animationData={GitHubLogo} loop />
                </a>
                <a href="https://linkedin.com/in/bishal-kumar-832398158" target="_blank" className="h-14 w-14 sm:h-16 sm:w-16">
                  <Lottie animationData={Linkedin} loop />
                </a>
                <a href="mailto:bishalkumar.sde@gmail.com?cc=bishalkumar.coder@gmail.com&subject=Portfolio%20&body=Hello%20Bishal" className="h-14 w-14 sm:h-16 sm:w-16">
                  <Lottie animationData={Mail} loop />
                </a>
                <div className="cursor-pointer h-12 w-12 sm:h-14 sm:w-14">
                  <Lottie animationData={Whatsapp} loop />
                </div>
                <div className="cursor-pointer h-16 w-16 sm:h-20 sm:w-20">
                  <Lottie animationData={Call} loop />
                </div>
              </div>
            </motion.div>
          </section>
    </main>
  );
}
