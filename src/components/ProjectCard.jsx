export const ProjectCard = ({ project, index }) => (
  <div
    key={index}
    className="
      group rounded-2xl 
      border border-gray-200
      shadow-sm hover:shadow-xl 
      dark:shadow-gray-800/30 
      transition duration-300 overflow-hidden
    "
  >
    <h3 className="flex px-4 justify-center text-2xl font-semibold mt-4 mb-2">
      {project.title}
    </h3>

    {project.preview && (
      <div className="px-4 mb-4">
        <div className="relative w-full aspect-video overflow-hidden rounded-xl border border-amber-200">
          <img
            src={project.preview}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      </div>
    )}

    <div className="px-4 pb-4">
      <p className="mb-4">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((t, idx) => (
          <span
            key={idx}
            className="
              px-3 py-1 text-sm rounded-full 
              border border-gray-300 
            "
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            className="
              px-3 py-1 rounded-xl font-medium transition
              border border-blue-600 text-blue-600
              hover:bg-blue-600 hover:text-white
              dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-500 dark:hover:text-white
            "
          >
            Live Demo
          </a>
        )}

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            className="
              px-3 py-1 rounded-xl font-medium transition
              border border-gray-600
            "
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  </div>
);
