import { Briefcase } from "lucide-react";

type Experiences = {
  id: number;
  role: string;
  company: string;
  duties: string;
  start_date: string;
  end_date: string;
  description: string;
}


type Props ={
  experiences : Experiences[]
}
const ExperienceSection = ({experiences}) => {




  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="section-heading">Experience</h2>
        <p className="section-subheading">Where I've worked and what I've built.</p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border hidden md:block" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="hidden md:flex flex-col items-center pt-1">
                  <div className="w-10 h-10 rounded-full border border-border bg-secondary flex items-center justify-center group-hover:border-primary transition-colors">
                    <Briefcase size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>

                <div className="flex-1 card-gradient rounded-xl border border-border p-6 hover:border-primary/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <span className="text-sm text-muted-foreground">{exp.start_date} – {exp.end_date}</span>
                  </div>
                  <p className="text-primary text-sm font-medium mb-3">{exp.company}</p>
                  <ul className="list-disc pl-5 text-muted-foreground text-sm leading-relaxed mb-4">
  {exp.description.split(/\r?\n/).map((line, i) => (
    line.trim() && <li key={i}>{line.trim()}</li>
  ))}
</ul>
                  {/* <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-secondary text-xs text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
