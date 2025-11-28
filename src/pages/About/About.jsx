import Cprogram from "../../assets/Cprogram.json";
import Cplusplus from "../../assets/Cplusplus.json";
import Javascript from "../../assets/Javascript.json";
import Nodejs from "../../assets/Nodejs.json";

import ReactIcon from "../../assets/ReactIcon.json";
import Angular from "../../assets/Angular.json";
import Nextjs from "../../assets/Nextjs.json";

import HTML from "../../assets/HTML.json";
import Css3 from "../../assets/css3.json";

import Git from "../../assets/Git.json";
import sass from "../../assets/sass.svg";
import shadcn from "../../assets/shadcn.svg";
import mongodb from "../../assets/mongodb.svg";
import redis from "../../assets/redis.svg";
import azure from "../../assets/azure.svg";
import figma from "../../assets/figma.svg";

import { TechCard } from "../../components/TechCard";

const SkillSection = ({ title, children }) => (
  <li>
    <span className="font-medium">{title}:</span>
    <div className="grid grid-cols-5 gap-3 mt-3">{children}</div>
  </li>
);

const About = () => {
  const Languages = [
    { label: "C", animation: Cprogram, size: "50px", top: 5, labelMargin: 0 },
    { label: "C++", animation: Cplusplus, size: "80px", top: -10, labelMargin: -15 },
    { label: "Javascript", animation: Javascript, size: "45px", top: 10, labelMargin: 0 },
    { label: "NodeJS", animation: Nodejs, size: "120px", top: -20, labelMargin: -45 },
  ];

  const Frameworks  = [
    { label: "React", animation: ReactIcon, size: "50px", top: 0, labelMargin: 0 },
    { label: "Angular", animation: Angular, size: "50px", top: 0, labelMargin: 0 },
    { label: "NextJS", animation: Nextjs, size: "50px", labelMargin: 0 },
  ];

  const WebTech  = [
    { label: "HTML5", animation: HTML, size: "65px", top: -5, labelMargin: -5 },
    { label: "CSS3", animation: Css3, size: "60px", top: -10, labelMargin: 5 },
  ];

  const WebIcons = [
    { label: "Sass", icon: sass, size: "60px", top: 0, labelMargin: -5 },
    { label: "Shadcn-UI", icon: shadcn, size: "45px", top: 5, labelMargin: 5 },
  ];

  const DBCloud = [
    { label: "MongoDB", icon: mongodb, size: "50px", top: -10, labelMargin: 5 },
    { label: "Redis", icon: redis, size: "50px", top: -10, labelMargin: 5 },
    { label: "Azure", icon: azure, size: "50px", top: -10, labelMargin: 5 },
  ];

  const ToolIcons = [
    { label: "Figma", icon: figma, size: "35px", top: 0, labelMargin: 10 },
  ];

  const Tools = [
    { label: "Git", animation: Git, size: "65px", top: 0, labelMargin: 0 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex w-full items-center justify-center">
      <section id="about" className="mt-6">
        <h2 className="text-3xl font-semibold">About Me</h2>
        <p className="mt-4 leading-relaxed">
          I’m a <span className="font-semibold">Software Engineer</span> with over{" "}
          <span className="font-semibold">3 years of experience</span> building scalable
          web applications with modern frameworks such as{" "}
          <span className="font-semibold">React, Angular, Next.js</span> and backend services using{" "}
          <span className="font-semibold">Node.js</span>.
        </p>

        <p className="mt-4 leading-relaxed">
          I focus on performance, accessibility, clean component architecture and
          collaborative development using tools like <span className="font-semibold">Git, Jira & Figma</span>.
        </p>

        {/* --- Skills Section --- */}
        <h3 className="text-xl font-semibold mt-10">Core Technical Skills</h3>
        <ul className="mt-4 grid sm:grid-cols-2 gap-4">

          <SkillSection title="Languages">
            {Languages.map((skill, i) => <TechCard key={i} skill={skill} />)}
          </SkillSection>

          <SkillSection title="Frameworks & Libraries">
            {Frameworks.map((skill, i) => <TechCard key={i} skill={skill} />)}
          </SkillSection>

          <SkillSection title="Web Tech">
            {WebTech.map((skill, i) => <TechCard key={i} skill={skill} />)}
            {WebIcons.map((item, i) => (
              <div key={i} className="flex flex-col items-center hover:-translate-y-4 transition-all py-2 rounded-xl bg-[#d9ecec0c] shadow-sm">
                <img src={item.icon} style={{ marginTop: item.top ?? 0 }} alt={item.label} width={item.size} height={item.size} />
                <span className="text-sm" style={{ marginTop: item.labelMargin ?? 0 }}>{item.label}</span>
              </div>
            ))}
          </SkillSection>

          <SkillSection title="Databases & Cloud">
            {DBCloud.map((item, i) => (
              <div key={i} className="flex flex-col items-center hover:-translate-y-4 transition-all py-2 rounded-xl bg-[#d9ecec0c] shadow-sm">
                <img src={item.icon} style={{ marginTop: item.top ?? 0 }} alt={item.label} width={item.size} height={item.size} />
                <span className="text-sm" style={{ marginTop: item.labelMargin ?? 0 }}>{item.label}</span>
              </div>
            ))}
          </SkillSection>

          <SkillSection title="Tools">
            {Tools.map((skill, i) => <TechCard key={i} skill={skill} />)}
            {ToolIcons.map((item, i) => (
              <div key={i} className="flex flex-col items-center hover:-translate-y-4 transition-all py-2 rounded-xl bg-[#d9ecec0c] shadow-sm">
                <img src={item.icon} style={{ marginTop: item.top ?? 0 }} alt={item.label} width={item.size} height={item.size} />
                <span className="text-sm" style={{ marginTop: item.labelMargin ?? 0 }}>{item.label}</span>
              </div>
            ))}
          </SkillSection>

        </ul>

        {/* Experience */}
        <h3 className="text-xl font-semibold mt-10">Recent Experience</h3>
        <p className="mt-4 leading-relaxed">
          Most recently, I worked as a Frontend Engineer & AI Evaluation Specialist at <span className="font-semibold">Outlier AI</span> improving AI-assisted development via RLHF.
          Previously, I worked at <span className="font-semibold">Attosol Pvt. Ltd.</span> developing scalable solutions with React, Node.js & Azure.
        </p>

      </section>
    </div>
  );
};

export default About;
