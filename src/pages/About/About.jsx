const About = () => {
  return (
    <div className="flex w-full py-2 items-center justify-center">
        {/* ABOUT */}
        <section id="about" className="mt-16">
          <h2 className="text-2xl font-semibold">About me</h2>
          <p className="mt-3 text-slate-600">
            I build client-facing experiences using React, TypeScript and modern CSS. I focus on
            performance, accessibility and an exceptional developer experience. I’ve worked on
            products in fintech, healthcare and B2B tooling.
          </p>

          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-slate-500">Experience</div>
              <div className="mt-1 font-medium">4+ years</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-slate-500">Location</div>
              <div className="mt-1 font-medium">Hyderabad, India</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-slate-500">Open to</div>
              <div className="mt-1 font-medium">Remote / Full-time</div>
            </div>
          </div>
        </section>
    </div>
  );
};

export default About;
