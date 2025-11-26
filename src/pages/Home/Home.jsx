import "./home.css";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Coding from "../../assets/coding.json";
import Lottie from "lottie-react";

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

            <p className="mt-4 text-base sm:text-lg text-slate-700">
              Software Engineer with 3+ years of experience building high-performance web apps,
              visual editors, automation workflows and enterprise-scale solutions. I specialize in
              front-end engineering (React / Angular) and scalable backend systems with Node.js & Azure.
            </p>

            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Passionate about clean UI, performance and developer experience.
            </p>

            {/* Skills */}
            <div className="mt-6">
              <h3 className="font-semibold text-slate-800">Tech Stack</h3>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                React, Angular, TypeScript, Node.js, MongoDB, PostgreSQL, Azure, Docker, Jest
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
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

            <div className="mt-6 flex gap-5">
              <a href="https://github.com/blast0" target="_blank" aria-label="Github" className="hover:text-slate-900">
                <Github size={22} />
              </a>
              <a href="https://linkedin.com/in/bishal-kumar-832398158" target="_blank" aria-label="LinkedIn" className="hover:text-slate-900">
                <Linkedin size={22} />
              </a>
              <a href="#contact" aria-label="Email" className="hover:text-slate-900">
                <Mail size={22} />
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
