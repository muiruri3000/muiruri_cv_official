import { User } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about-me" className="py-24">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-border bg-secondary text-xs text-muted-foreground">
          <User size={14} />
          About Me
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Engineer, Builder, Architect, Lifelong Learner.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 card-gradient bg-secondary/30 border border-border rounded-xl p-8 hover:border-primary/30 transition-colors">
   <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
  I'm a software engineer focused on building scalable, end-to-end systems. I’ve worked
  across the stack — developing secure Django backends, crafting responsive React
  frontends, and deploying applications using Docker and cloud platforms like AWS.
  I enjoy turning complex requirements into clean, functional products that actually work in production.
</p>

<p className="text-base md:text-lg text-muted-foreground leading-relaxed">
  My approach centers on system design, reliability, and continuous improvement. From
  implementing authentication with JWT to setting up CI/CD pipelines and containerized
  deployments, I focus on building software that is maintainable, scalable, and ready for
  real-world use.
</p>
        </div>

        <div className="space-y-4">
          <div className="card-gradient bg-secondary/30 border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-gradient mb-1">5+</div>
            <div className="text-sm text-muted-foreground">Years of experience</div>
          </div>
          <div className="card-gradient bg-secondary/30 border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-gradient mb-1">5+</div>
            <div className="text-sm text-muted-foreground">Projects completed</div>
          </div>
          <div className="card-gradient bg-secondary/30 border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-gradient mb-1">6+</div>
            <div className="text-sm text-muted-foreground">Technologies mastered</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
