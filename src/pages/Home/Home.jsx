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
import Me from "../../assets/me.jpg"

export default function Home() {
const techStack = [
  { label: "C", animation: Cprogram, size: "50px", top: 5, labelMargin: 0 },
  { label: "C++", animation: Cplusplus, size: "80px", top: -10, labelMargin: -15 },
  { label: "HTML5", animation: HTML, size: "65px", top: -5, labelMargin: -5 },
  { label: "CSS3", animation: Css3, size: "60px", top: -10, labelMargin: 5 },
  { label: "Javascript", animation: Javascript, size: "45px", top: 10, labelMargin: 0 },
  { label: "React", animation: ReactIcon, size: "50px", top: 5, labelMargin: 0 },
  { label: "NextJS", animation: Nextjs, size: "55px", labelMargin: 0 },
  { label: "Angular", animation: Angular, size: "60px", top: -5, labelMargin: 0 },
  { label: "NodeJS", animation: Nodejs, size: "120px", top: -20, labelMargin: -45 },
  { label: "MongoDB", animation: Mongodb, size: "60px", top: -15, labelMargin: 10 },
  { label: "MySQL", animation: MySQL, size: "80px", top: -5, labelMargin: -20 },
];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {/* HERO */}
          <section className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                Hi, I’m <span className="text-[#ff7e00]">Bishal Kumar</span>
                <span className="text-[#ffce00]"> Software Engineer</span>
              </h1>

              <p className="mt-4 text-sm sm:text-lg">
                with 3+ years of experience building high-performance web apps...
              </p>
              <p className="mt-3 text-xs sm:text-base">
                Passionate about clean UI, performance and developer experience.
              </p>              

              {/* Tech Stack */}
              <div className="mt-5">
                <h3 className="text-xl sm:text-2xl font-semibold">Tech Stack</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-3">
                  {techStack.map((skill, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center py-2  rounded-xl bg-[#d9ecec0c] shadow-sm"
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

              {/* CTA */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a href="#projects" className="inline-flex justify-center px-5 py-2.5 rounded-md bg-indigo-600 text-white">
                  View Projects
                </a>
                <a href="#contact" className="inline-flex justify-center px-5 py-2.5 rounded-md border">
                  Contact
                </a>
              </div>

              {/* Social Icons */}
              <div className="mt-6 flex gap-4 flex-wrap items-center">
                <a href="https://github.com/blast0" target="_blank" className="h-12 w-12 sm:h-14 sm:w-14">
                  <Lottie animationData={GitHubLogo} loop />
                </a>
                <a href="https://linkedin.com/in/bishal-kumar-832398158" target="_blank" className="h-14 w-14 sm:h-16 sm:w-16">
                  <Lottie animationData={Linkedin} loop />
                </a>
                <a href="#contact" className="h-14 w-14 sm:h-16 sm:w-16">
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

          {/* Coding Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-around items-center h-full"
            >
              <img src={Me} className="justify-center" style={{borderRadius: "100%", objectFit: "cover", height: "200px", width: "200px"
              }} alt=""  />
              <div className="w-full max-w-xs sm:max-w-sm h-56 sm:h-72 rounded-2xl  flex items-center justify-center">
                <Lottie animationData={Coding} loop />
              </div>
            </motion.div>
          </section>
    </main>
  );
}
