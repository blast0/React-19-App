import Nodejs from "../../assets/Nodejs.json";
import Nextjs from "../../assets/Nextjs.json";
import ReactIcon from "../../assets/ReactIcon.json";
import Javascript from "../../assets/Javascript.json";
import Angular from "../../assets/Angular.json";
import css from "../../assets/css.svg";
import html from "../../assets/html.svg";
import sass from "../../assets/sass.svg";
import redis from "../../assets/redis.svg";
import redux from "../../assets/redux.svg";
import azure from "../../assets/azure.svg";
import shadcn from "../../assets/shadcn.svg";
import mongodb from "../../assets/mongodb.svg";
import Cprogram from "../../assets/Cprogram.svg";
import Cplusplus from "../../assets/Cplusplus.svg";
import { TechCard } from "../../components/TechCard";

const skillGroups = [
  {
    title: "Languages",
    items: [
      { label: "C", icon: Cprogram, size: "50px", top: 5, labelMargin: 0 },
      { label: "C++", icon: Cplusplus, size: "65px", top: -5, labelMargin: -5 },
      { label: "Javascript", animation: Javascript, size: "45px", top: 10, labelMargin: 0 },
      { label: "NodeJS", animation: Nodejs, size: "120px", top: -20, labelMargin: -45 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    items: [
      { label: "React", animation: ReactIcon, size: "50px", top: 5 },
      { label: "Angular", animation: Angular, size: "60px", top: -5 },
      { label: "NextJS", animation: Nextjs, size: "55px" },
      { label: "Redux", icon: redux, size: "55px" },
    ],
  },
  {
    title: "Web Tech",
    items: [
      { label: "HTML5", icon: html, size: "55px" },
      { label: "CSS3", icon: css, size: "55px" },
      { label: "Sass", icon: sass, size: "55px" },
      { label: "Shadcn-UI", icon: shadcn, size: "55px" },
    ],
  },
  {
    title: "Databases & Cloud",
    items: [
      { label: "MongoDB", icon: mongodb, size: "50px" },
      { label: "Redis", icon: redis, size: "50px" },
      { label: "MS Azure", icon: azure, size: "50px" },
    ],
  },
];

const IconCard = ({ icon, label, size,labelMargin, top }) => (
  <div className="flex hover:-translate-y-4 transition-all flex-col items-center py-2 rounded-xl bg-[#d9ecec0c] shadow-sm">
    <img src={icon} alt={label} style={{ width: size, height: size, marginTop: top }} />
    <span className="text-sm" style={{ marginTop: labelMargin ?? 0 }}>{label}</span>
  </div>
);

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex w-full items-center justify-center">
      <section id="about" className="mt-6">
        <h2 className="text-3xl font-semibold">About Me</h2>
        <p className="mt-4 leading-relaxed">
          I’m a <span className="font-semibold">Software Engineer</span> with over{" "}
          <span className="font-semibold">3 years of hands-on experience</span> building scalable,
          high-performance web applications. I specialize in creating responsive UI experiences using
          modern frameworks like <span className="font-semibold">React, Angular, Next.js</span> and
          backend services with <span className="font-semibold">Node.js</span>.
          My expertise includes frontend performance optimization, component-driven architecture,
          and developing production-ready, maintainable systems.
        </p>

        <p className="mt-4 leading-relaxed">
          Skilled in Agile development and collaborative team environments, I work closely with
          cross-functional teams using tools like <span className="font-semibold">Git, Jira and
          Figma</span>. I’m passionate about clean code, accessibility, user-centered
          interfaces, and continuous learning to deliver meaningful digital experiences.
        </p>

        {/* Quick Info Cards */}
        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          <div className="p-2 border rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-sm">Experience</div>
            <div className="mt-1 font-medium">3+ years</div>
            </div>
          <div className="p-2 border rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-sm">Location</div>
            <div className="mt-1 font-medium">Guwahati, India</div>
          </div>
          <div className="p-2 border rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-sm">Open to</div>
            <div className="mt-1 font-medium">Remote / Full-time</div>
        </div>
        </div>

        {/* Technical Skills */}
        <h3 className="text-xl font-semibold mt-6">Core Technical Skills</h3>

        <ul className="mt-4 grid sm:grid-cols-2 gap-6">
          {skillGroups.map((group, i) => (
            <li key={i}>
              <span className="font-medium">{group.title}:</span>
              <div className="grid grid-cols-5 gap-3 mt-3">
                {group.items.map((skill, index) =>
                  skill.animation ? (
                    <TechCard key={index} skill={skill} />
                  ) : (
                    <IconCard key={index} {...skill} />
                  )
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Experience Summary */}
        <h3 className="text-xl font-semibold mt-10">Recent Experience</h3>
        <p className="mt-4 leading-relaxed">
          Most recently, I worked as a Frontend Engineer & AI Evaluation Specialist at{" "}
          <span className="font-semibold">Outlier AI</span>, improving the accuracy and reliability of
          AI-assisted development systems using RLHF techniques. Before that, I was a Full-Stack
          Engineer at <span className="font-semibold">Attosol Pvt. Ltd.</span> building scalable web
          and cloud-based solutions using React, Node.js, Azure, and CI/CD automation.
        </p>
      </section>
    </div>
  );
};

export default About;
