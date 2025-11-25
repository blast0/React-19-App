import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowRight} from "lucide-react";
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
    <div className="">
      <div id="hero" className="hero-section relative flex flex-col items-center justify-center text-center text-white overflow-hidden">
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>
        
        <div class="content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl z-10"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Hi, I’m <span className="text-indigo-400">Bishal Kumar</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-6">
            A passionate <span className="text-indigo-300 font-semibold">Software Engineer </span> 
            crafting elegant, high-performing web experiences.
          </p>

          <motion.a
            href="#projects"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-3 rounded-full transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View My Work <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
        </div>
      </div>
      {/* <div id="about" className="py-20 bg-slate-900 text-slate-100">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6 text-indigo-400">About Me</h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            I’m a passionate <span className="text-indigo-300 font-semibold">Software Engineer</span> 
            with experience in building dynamic web applications using modern frameworks like 
            <span className="text-indigo-300 font-semibold"> Angular</span> and 
            <span className="text-indigo-300 font-semibold"> React</span>.  
            I love solving complex problems, learning new technologies, and creating digital experiences 
            that make a difference.
          </p>
        </motion.div>
      </div>
      <div id="skills" className="py-20 bg-slate-800 text-slate-100 ">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-10 text-indigo-400"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Skills
          </motion.h2>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {skills.map((skill, i) => (
              <div
                key={i}
                className="bg-slate-700/50 cursor-pointer border border-slate-600 py-3 rounded-lg text-sm font-medium hover:bg-indigo-500 hover:text-white transition-colors"
              >
                {skill}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      

      <div id="projects" className="py-20 bg-slate-900 text-slate-100 ">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-10 text-indigo-400"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Projects
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-indigo-500 transition-colors"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-indigo-300">
                  {p.title}
                </h3>
                <p className="text-slate-400 mb-4">{p.desc}</p>
                <a
                  href={p.link}
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  View Project →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div id="contact" className="py-20 bg-slate-800 text-slate-100 ">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6 text-indigo-400">Contact</h2>
          <p className="text-slate-300 mb-8">
            I’m always open to discussing new projects, collaborations, or opportunities.  
            Let’s connect!
          </p>

          <div className="flex justify-center gap-6">
            <a href="mailto:youremail@example.com" className="hover:text-indigo-400">
              <Mail size={28} />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="hover:text-indigo-400">
              <Linkedin size={28} />
            </a>
            <a href="https://github.com/yourgithub" target="_blank" rel="noreferrer" className="hover:text-indigo-400">
              <Github size={28} />
            </a>
          </div>
        </motion.div>
      </div>  */}
    </div>
  );
};

export default Home;
