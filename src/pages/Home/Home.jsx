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

export default function Home() {
  return (
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* HERO */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Hi, I’m <span className="text-[#ff7e00]">Bishal Kumar</span> — 
              <span className="text-[#ffce00]"> Software Engineer</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg ">
              Software Engineer with 3+ years of experience building high-performance web apps,
              visual editors, automation workflows and enterprise-scale solutions. I specialize in
              front-end engineering (React / Angular) and scalable backend systems with Node.js & Azure.
            </p>
            <p className="mt-3 text-sm sm:text-base ">
              Passionate about clean UI, performance and developer experience.
            </p>

            {/* Skills */}
            <div className="mt-4">
              <h3 className="text-2xl font-semibold ">Tech Stack</h3>
              {/* <p className="text-sm sm:text-base">
                React, Angular, TypeScript, Node.js, MongoDB, PostgreSQL, Azure, Docker, Jest
              </p> */}   
              <div className="flex flex-wrap gap-2">
                <div className="p-1 flex flex-col items-center h-[85px] w-[85px] overflow-hidden bg-[#12f3f34b] rounded-2xl">
                  <div className="h-[50px] w-[50px] mt-1">
                    <Lottie animationData={Javascript} loop />
                  </div>
                  <span>Javascript</span>
                </div>

                <div className="p-1 flex flex-col items-center h-[85px] w-[85px] overflow-hidden bg-[#12f3f34b] rounded-2xl">
                  <div className="h-[55px] w-[55px]">
                    <Lottie animationData={ReactIcon} loop />
                  </div>
                  <span>React</span>
                </div>

                <div className="p-1 flex flex-col items-center h-[85px] w-[85px] overflow-hidden bg-[#12f3f34b] rounded-2xl">
                  <div className="h-[65px] w-[65px] mt-[-10px]">
                    <Lottie animationData={Angular} loop />
                  </div>
                  <span>Angular</span>
                </div>

                <div className="p-1 flex flex-col items-center h-[85px] w-[85px] overflow-hidden bg-[#12f3f34b] rounded-2xl">
                  <div className="h-[100px] w-[100px] mt-[-15px]">
                    <Lottie animationData={Nodejs} loop />
                  </div>
                  <span className="mt-[-30px]">Nodejs</span>
                </div>

                <div className="p-1 flex flex-col items-center h-[85px] w-[85px] overflow-hidden bg-[#12f3f34b] rounded-2xl">
                  <div className="h-[70px] w-[70px] mt-[-15px]">
                    <Lottie animationData={Mongodb} loop />
                  </div>
                  <span>MongoDB</span>
                </div>

                <div className="p-1 flex flex-col items-center h-[85px] w-[85px] overflow-hidden  bg-[#12f3f34b] rounded-2xl">
                  <div className="h-[80px] w-[80px] mt-[-5px]">
                    <Lottie animationData={MySQL} loop />
                  </div>
                  <span className="mt-[-20px]">MySQL</span>
                </div>
                                
              </div>

              
            </div>

            <div className="mt-6 p-2 flex flex-col sm:flex-row gap-3">
              <a
                href="#projects"
                className="inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-md bg-indigo-600 text-white font-medium"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-md border"
              >
                Contact
              </a>
            </div>

            <div className="mt-6 flex gap-3 items-center">
              <a href="https://github.com/blast0" target="_blank" aria-label="Github" className="hover:text-slate-900 h-[55px] w-[55px]">
                <Lottie animationData={GitHubLogo} loop />
              </a>
              <a href="https://linkedin.com/in/bishal-kumar-832398158" target="_blank" aria-label="LinkedIn" className="hover:text-slate-900 h-[70px] w-[70px]">
                <Lottie animationData={Linkedin} loop />
              </a>
              <a href="#contact" aria-label="Email" className="hover:text-slate-900 h-[75px] w-[75px]">
                <Lottie animationData={Mail} loop />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="w-full max-w-sm h-64 sm:h-72 mx-auto rounded-2xl bg-gradient-to-br from-indigo-100 to-pink-50 flex items-center justify-center border border-slate-100">
              <div className="text-slate-400 text-sm">
                <Lottie animationData={Coding} loop />
              </div>
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer
          id="resume"
          className="mt-20 border-t pt-6 text-center text-xs sm:text-sm text-slate-500"
        >
          © {new Date().getFullYear()} Bishal Kumar — Built with React + Tailwind
        </footer>
      </main>
  );
}
