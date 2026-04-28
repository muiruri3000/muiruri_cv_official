import { GraduationCap } from "lucide-react";
import {useState, useEffect} from "react";
import api from "../lib/api";
import { getToken } from "../lib/api";



type Education = {
  id: number;
  institution: string;
  qualification: string;
  start_year: string;
  end_year: string;
  description: string;

}

type Props = {
  education: Education[]
}



const EducationSection = ({education}) => {

  console.log('education in components', education)

  return (
    <section id="education" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="section-heading">Education</h2>
        <p className="section-subheading">Academic background and credentials.</p>

        <div className="grid md:grid-cols-2 gap-6">
          {education?.map((edu, i) => (
            <div
              key={i}
              className="card-gradient rounded-xl border border-border p-6 hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <GraduationCap size={22} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-semibold mb-1">{edu.qualification}</h3>
              <p className="text-primary text-sm font-medium mb-1">{edu.institution}</p>
              <p className="text-xs text-muted-foreground mb-3">{edu.start_year} – {edu.end_year}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
