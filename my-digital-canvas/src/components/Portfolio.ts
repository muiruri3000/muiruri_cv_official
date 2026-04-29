import api from "@/lib/api";
import { ensureToken } from "@/lib/ensureToken";
export const fetchPortfolioData = async () => {


  console.log("API URL:", import.meta.env.VITE_API_URL);
  await ensureToken()
  const [
    experience,
    education,
    articles,
    skills,
    softSkills,
    hero,
  ] = await Promise.all([
    api.get("/experiences/"),
    api.get("/education/"),
    api.get("/articles/"),
    api.get("/skills/"),
    api.get("/soft-skills/"),
    api.get("/hero/"),
  ]);

  return {
    experiences: experience.data,
    education: education.data,
    articles: articles.data,
    skills: skills.data,
    softSkills: softSkills.data,
    hero: hero.data,
  };
};
