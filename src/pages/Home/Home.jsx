import { motion } from "framer-motion";
import Mail from "../../assets/Mail.json";
import Coding from "../../assets/coding.json";
import Linkedin from "../../assets/Linkedin.json";
import GitHubLogo from "../../assets/GitHubLogo.json";
import Whatsapp from "../../assets/Whatsapp.json";
import Call from "../../assets/Call.json";
import Me from "../../assets/me.jpg";
import { projects } from "../../data/projects";
import { techStack } from "../../data/techstack";
import { ProjectCard } from "../../components/ProjectCard";
import { TechCard } from "../../components/TechCard";
import Lottie from "lottie-react";

export default function Home() {
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

                  <div className="flex gap-4 flex-wrap items-center">
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

                {/* CTA */}
                <div className="my-4 flex flex-col sm:flex-row gap-3">
                  <a href="#projects" className="inline-flex justify-center px-5 py-2.5 rounded-md bg-indigo-600 text-white">
                    View Projects
                  </a>
                  <a href="#contact" className="inline-flex justify-center px-5 py-2.5 rounded-md border">
                    Contact
                  </a>
                </div>

                {/* Tech Stack */}
                <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-3 mt-3">
                  {techStack.map((skill) => (
                    <TechCard skill={skill}  />
                  ))}
                </div>

                {/* Projects */}
                <section id="projects" className="py-20">
                  <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <ProjectCard project={project} index={index} />
                    ))}
                  </div>
                </section> 
            </motion.div>
          </section>
    </main>
  );
}
