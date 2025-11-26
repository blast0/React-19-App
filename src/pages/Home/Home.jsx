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

export default function Home() {
const techStack = [
  { label: "C", animation: Cprogram, size: "55px", top: 5, labelMargin: -5 },
  { label: "C++", animation: Cplusplus, size: "80px", top: -10, labelMargin: -15 },
  { label: "HTML5", animation: HTML, size: "65px", top: -5, labelMargin: -5 },
  { label: "CSS3", animation: Css3, size: "60px", top: -10, labelMargin: 5 },
  { label: "Javascript", animation: Javascript, size: "45px", top: 10, labelMargin: 0 },
  { label: "React", animation: ReactIcon, size: "50px", top: 5, labelMargin: 0 },
  { label: "NextJS", animation: Nextjs, size: "55px", labelMargin: 0 },
  { label: "Angular", animation: Angular, size: "65px", top: -10, labelMargin: 0 },
  { label: "NodeJS", animation: Nodejs, size: "120px", top: -20, labelMargin: -30 },
  { label: "MongoDB", animation: Mongodb, size: "70px", top: -15, labelMargin: 0 },
  { label: "MySQL", animation: MySQL, size: "80px", top: -5, labelMargin: -20 },
];

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

          <p className="mt-4 text-base sm:text-lg">
            Software Engineer with 3+ years of experience building high-performance web apps...
          </p>
          <p className="mt-3 text-sm sm:text-base">
            Passionate about clean UI, performance and developer experience.
          </p>

          {/* Skills */}
          <div className="mt-4">
            <h3 className="text-2xl font-semibold">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {techStack.map((skill, index) => (
                <div
                  key={index}
                  className="p-1 flex flex-col items-center h-[85px] w-[85px] overflow-hidden
                  bg-[#d9ecec0c] rounded-2xl"
                >
                  <div
                    style={{
                      height: skill.size,
                      width: skill.size,
                      marginTop: skill.top ?? 0,
                    }}
                  >
                    <Lottie animationData={skill.animation} loop />
                  </div>

                  <span
                    className="text-sm"
                    style={{ marginTop: skill.labelMargin ?? 0 }}
                  >
                    {skill.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="mt-6 p-2 flex flex-col sm:flex-row gap-3">
            <a href="#projects" className="inline-flex px-5 py-2.5 rounded-md bg-indigo-600 text-white">
              View Projects
            </a>
            <a href="#contact" className="inline-flex px-5 py-2.5 rounded-md border">
              Contact
            </a>
          </div>

          {/* Social icons */}
          <div className="mt-6 flex gap-3 items-center">
            <a href="https://github.com/blast0" target="_blank" className="h-[55px] w-[55px]">
              <Lottie animationData={GitHubLogo} loop />
            </a>
            <a href="https://linkedin.com/in/bishal-kumar-832398158" target="_blank" className="h-[70px] w-[70px]">
              <Lottie animationData={Linkedin} loop />
            </a>
            <a href="#contact" className="h-[75px] w-[75px]">
              <Lottie animationData={Mail} loop />
            </a>
            <div className="cursor-pointer h-[65px] w-[65px]">
              <Lottie animationData={Whatsapp} loop />
            </div>
            <div className="cursor-pointer h-[95px] w-[95px]">
              <Lottie animationData={Call} loop />
            </div>
          </div>
        </motion.div>

        {/* Coding Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="w-full max-w-sm h-64 sm:h-72 mx-auto rounded-2xl bg-gradient-to-br from-indigo-100 to-pink-50 flex items-center justify-center">
            <Lottie animationData={Coding} loop />
          </div>
        </motion.div>
      </section>

      {/* Footer */}
    </main>
  );
}
