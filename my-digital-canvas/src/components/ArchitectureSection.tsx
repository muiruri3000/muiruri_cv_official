import { Server, Database, Globe, Cloud, Shield, Zap } from "lucide-react";
import api from "../lib/api";
import { useEffect, useState } from "react";
import { getToken } from "../lib/api";

const iconMap: { [key: string]: any } = {
  Server,
  Database,
  Globe,
  Cloud,
  Shield,
  Zap,
};

type Architecture = {
  id: number;
  title: string;
  icon: string;
  description: string;
  items_discussed: string;
  external_link: string;
};

const ArchitectureSection = () => {
  const [architectures, setArchitectures] = useState<Architecture[]>([]);

useEffect(() => {
  const fetchArchitectures = async () => {
    try {
      if (!localStorage.getItem("access")) {
        await getToken();
      }

      const response = await api.get<Architecture[]>("/system-architectures/");
      setArchitectures(
        Array.isArray(response.data) ? response.data : [response.data]
      );
    } catch (err: any) {
      console.error(
        "Failed to fetch architectures data",
        err.response?.data || err.message
      );
    }
  };

  fetchArchitectures();
}, []);

  return (
    <section id="architecture" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="section-heading">System Architecture</h2>
        <p className="section-subheading">
          Notable systems I've designed and shipped.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {architectures.map((d) => {
            const Icon = iconMap[d.icon] || Server;

            return (
              <a
              key={d.id}
              href={d.external_link}
              target="_blank"
              rel="noopener noreferrer"
              >

              <div
                key={d.id}
                className="card-gradient rounded-xl border border-border p-6 hover:border-primary/30 transition-all group hover:-translate-y-1"
                
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <Icon
                    size={18}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </div>

                <h3 className="font-semibold mb-2">{d.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {d.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {d.items_discussed
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded bg-secondary text-xs text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                </div>
              </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;