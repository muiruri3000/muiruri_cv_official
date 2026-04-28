import api from "@/lib/api";
import { useEffect, useState } from "react";
const Footer = () => {
  
  
  
  
const [data, setData] = useState(null);
console.time("API");

useEffect(() => {
  const fetchData = async () => {
    console.time("API");
    const res = await api.get("/hero/");
    console.timeEnd("API");

    console.time("setState");
    setData(res.data);
    console.timeEnd("setState");
  };

  fetchData();
}, []);

return (

<footer className="border-t border-border py-8">
    <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Joseph Muiruri. All rights reserved.
      </p>
      <p className="text-xs text-muted-foreground">
        Built with React & Tailwind CSS
      </p>
    </div>
  </footer>
);
}                                                     

export default Footer;
