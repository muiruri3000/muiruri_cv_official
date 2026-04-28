import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../lib/api"; 
import { getToken } from "../lib/api";



type Hero ={
  
  portfolio: any;
}




const HeroSection = ({portfolio}: Hero) => {


// const [hero, setHero] = useState<Hero | null>(null);

// useEffect(() => {


  
//   const fetchHero = async ()=>{
//     try{
//       if(!localStorage.getItem("access")){

//         await getToken(); // Ensure token is fetched before making API call
//       }


//       const response = await api.get<Hero[] | Hero>('/hero/');
      
//       console.log(response.data);

//       setHero(Array.isArray(response.data) ? response.data[0] : response.data);
//     }catch(err: any){
//       console.error("login failed", err.response?.data ||err.message);
//       throw err;
//     }

//   };
//   fetchHero();
// }, []);
if (!portfolio) return <p>Loading...</p>;

  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(190 90% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(190 90% 50%) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-border bg-secondary text-sm text-muted-foreground">
          Available for work
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
         <span className="text-gradient">

            Joseph Muiruri Portfolio
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {
            portfolio.subheading
          }
        </p>

        <div className="flex items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity glow"
          >
            Get in touch
          </a>
          <a
            href="#experience"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors"
          >
            {portfolio.cta_text}
          </a>
        </div>

        <a href="#experience" className="inline-block mt-20 text-muted-foreground animate-bounce">
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
