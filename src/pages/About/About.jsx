import Cprogram from "../../assets/Cprogram.json";
import Cplusplus from "../../assets/Cplusplus.json";
import Javascript from "../../assets/Javascript.json";
import Nodejs from "../../assets/Nodejs.json";
import { TechCard } from "../../components/TechCard";
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


const About = () => {

  const Languages = [
    { label: "C", animation: Cprogram, size: "50px", top: 5, labelMargin: 0 },
    { label: "C++", animation: Cplusplus, size: "80px", top: -10, labelMargin: -15 },
    { label: "Javascript", animation: Javascript, size: "45px", top: 10, labelMargin: 0 },
    { label: "NodeJS", animation: Nodejs, size: "120px", top: -20, labelMargin: -45 },
  ];

  const Frameworks  = [
    { label: "React", animation: ReactIcon, size: "50px", top: 5, labelMargin: 0 },
    { label: "Angular", animation: Angular, size: "60px", top: -5, labelMargin: 0 },
    { label: "NextJS", animation: Nextjs, size: "55px", labelMargin: 0 },
  ];

  const Webtech  = [
    { label: "HTML5", animation: HTML, size: "65px", top: -5, labelMargin: -5 },
    { label: "CSS3", animation: Css3, size: "60px", top: -10, labelMargin: 5 },
  ];

    const Tools  = [
    { label: "Git", animation: Git, size: "65px", top: -5, labelMargin: -5 },
    { label: "CSS3", animation: Css3, size: "60px", top: -10, labelMargin: 5 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-4 flex w-full items-center justify-center">
      {/* ABOUT */}
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
        {/* <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-sm">Experience</div>
            <div className="mt-1 font-medium">3+ years</div>
          </div>
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-sm">Location</div>
            <div className="mt-1 font-medium">Guwahati, India</div>
          </div>
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <div className="text-sm">Open to</div>
            <div className="mt-1 font-medium">Remote / Full-time</div>
          </div>
        </div> */}

        {/* Technical Skills */}
        <h3 className="text-xl font-semibold mt-10">Core Technical Skills</h3>
        <ul className="mt-4 grid sm:grid-cols-2 gap-3">
          <li><span className="font-medium">Languages:</span>
          <div className="grid grid-cols-5 gap-3 mt-3">
          {Languages.map((skill, index) => (
            <TechCard skill={skill}  key={skill.id || index}/>
            
          ))}

          </div>
          </li>
          <li><span className="font-medium">Frameworks & Libraries:</span> 
          <div className="grid grid-cols-5 gap-3 mt-3">
          {Frameworks.map((skill, index) => (
            <TechCard skill={skill}  key={skill.id || index}/>
          ))}
          </div> 
          {/* Redux, Tailwind, Material UI, Bootstrap, Fabric.js, Slate.js */}
          </li>
          <li><span className="font-medium">Web Tech:</span>          
          <div className="grid grid-cols-5 gap-3 mt-3">
          {Webtech.map((skill, index) => (
            <TechCard skill={skill}  key={skill.id || index}/>
          ))} 
          <div className="flex hover:-translate-y-4 transition-all flex-col items-center py-2 rounded-xl bg-[#d9ecec0c] shadow-sm">
            <img
            src={sass}
            alt="icon"
            style={{ width: "55px", height: "55px" }}
            />
            <span className="text-sm" style={{ marginTop:  0 }}>
             Sass
          </span>
          </div>
          <div className="flex hover:-translate-y-4 transition-all flex-col items-center py-2 rounded-xl bg-[#d9ecec0c] shadow-sm">
            <img
            src={shadcn}
            alt="icon"
            style={{ width: "55px", height: "55px" }}
            />
            <span className="text-sm" style={{ marginTop:  0 }}>
             Shadcn-UI
          </span>
          </div>
          </div> </li>
          <li><span className="font-medium">Databases & Cloud:</span><div className="grid grid-cols-5 gap-3 mt-3">           
            <div className="flex hover:-translate-y-4 transition-all flex-col items-center py-2 rounded-xl bg-[#d9ecec0c] shadow-sm">
            <img
            src={mongodb}
            alt="icon"
            style={{ width: "50px", height: "50px" }}
            />
            <span className="text-sm" style={{ marginTop:  0 }}>
             MongoDB
            </span>
            </div>
            <div className="flex hover:-translate-y-4 transition-all flex-col items-center py-2 rounded-xl bg-[#d9ecec0c] shadow-sm">
            <img
            src={redis}
            alt="icon"
            style={{ width: "50px", height: "50px" }}
            />
            <span className="text-sm" style={{ marginTop:  0 }}>
             Redis
            </span>
            </div>
            <div className="flex hover:-translate-y-4 transition-all flex-col items-center py-2 rounded-xl bg-[#d9ecec0c] shadow-sm">
            <img
            src={azure}
            alt="icon"
            style={{ width: "50px", height: "50px" }}
            />
            <span className="text-sm" style={{ marginTop:  0 }}>
             Ms Azure
            </span>
            </div>
          </div> Azure Table Storage</li>
          <li><span className="font-medium">Testing:</span> Jest, React Testing Library</li>
          <li><span className="font-medium">Tools:</span> Git, Jira, Figma, CI/CD</li>
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
