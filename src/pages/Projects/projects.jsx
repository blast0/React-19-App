const Projects = () => {
const projects = [
  {
    id: 1,
    title: "Project One",
    description: "A short description of project one — what it does and the tech used.",
    tags: ["React", "Tailwind", "Node"],
    href: "#",
  },
  {
    id: 2,
    title: "Project Two",
    description: "A short description of project two — what it does and the tech used.",
    tags: ["TypeScript", "GraphQL"],
    href: "#",
  },
  {
    id: 3,
    title: "Project Three",
    description: "A short description of project three — what it does and the tech used.",
    tags: ["Next.js", "Vercel"],
    href: "#",
  },
];
  return (
    <div className="flex w-full py-2 items-center justify-center">
        {/* PROJECTS */}
        <section id="projects" className="mt-16">
          <h2 className="text-2xl font-semibold">Selected projects</h2>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <motion.article
                key={p.id}
                whileHover={{ translateY: -6 }}
                className="p-5 border rounded-xl bg-white"
              >
                <h3 className="font-semibold text-lg">
                  <a href={p.href} className="hover:text-indigo-600">{p.title}</a>
                </h3>
                <p className="mt-2 text-slate-600">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 border rounded-full">{t}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <a href={p.href} className="text-sm font-medium">View →</a>
                  <div className="text-xs text-slate-400">Jan 2025</div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
    </div>
  );
};

export default Projects;
