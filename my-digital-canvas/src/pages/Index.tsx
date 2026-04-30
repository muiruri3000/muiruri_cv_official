import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import SkillsSection from "@/components/SkillsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { fetchPortfolioData } from "@/components/Portfolio";
import { useEffect, useState } from "react";
import { initAuth } from "@/lib/initAuth";

const Index = () => {
const [data, setData] = useState<any>(null);

useEffect(()=>{
  const load = async()=>{
    const res = await fetchPortfolioData();
    setData(res);
  }

  load();
},[])

console.log('all data', data)


useEffect(() => {
  const load = async () => {
    await initAuth();          
    const res = await fetchPortfolioData();
    setData(res);
  };

  load();
}, []);
  return (
    
    
    <div className="min-h-screen ">
      <Navbar />
       <div className="max-w-6xl mx-auto px-6">
      <AboutSection />
      <HeroSection  {...data?.hero}/>
      <ExperienceSection experiences={data?.experiences ?? []}/>
      <EducationSection education={data?.education}/>
      <ArchitectureSection systemArchitectures={data?.systemArchitectures ?? []} />
      <SkillsSection 
      skill={data?.skills ?? []}
      softSkill={data?.softSkills ?? []}
      />
      <BlogSection articles ={data?.articles ?? []} />
      <ContactSection />
      <Footer />
    </div>
    </div>
  );
};

export default Index;
