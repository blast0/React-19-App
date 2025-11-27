import { ProjectCard } from "../../components/ProjectCard";
import { projects } from "../../data/projects";

const Projects = () => {
  return (
      <section id="projects" className="py-6">
        <h2 className="text-4xl font-bold text-center mb-6">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} />
          ))}
        </div>
      </section> 
  );
};

export default Projects;
