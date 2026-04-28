import { Code, Users } from "lucide-react";


type Skills = {
  id: number;
  name: string;
}



type SoftSkills ={
  id: number,
  skill: string
}

type Props = {
  skill : Skills[],
  softSkill: SoftSkills[]
}

const SkillsSection = ({skill, softSkill}) => {
console.log('skills', skill)
console.log('soft skills', softSkill)

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="section-heading">Skills</h2>
        <p className="section-subheading">Technical expertise and interpersonal strengths.</p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Technical */}
          <div className="card-gradient rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Code size={18} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Technical Skills</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {skill.map((skill,index) => (
                <div
                  key={skill.id ?? index}
                  className="px-4 py-3 rounded-lg border border-border bg-secondary/50 hover:border-primary/30 hover:bg-primary/5 transition-colors text-sm text-foreground text-center"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>

          {/* Soft */}
          <div className="card-gradient rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Users size={18} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Soft Skills</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {softSkill.map((skills,idx) => (
                <div
                  key={skills.id ?? idx}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-secondary/50 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{skills.skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
