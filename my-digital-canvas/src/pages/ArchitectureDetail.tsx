import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Server, Database, Globe, Cloud, Shield, Zap, ExternalLink } from "lucide-react";
import api from "@/lib/api";
import { ensureToken } from "@/lib/ensureToken";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sampleArchitectures } from "@/data/sampleArchitectures";
import { parseTags } from "@/utils/tags";
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
  slug?: string;
  body?: string;
};

const ArchitectureDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<Architecture | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        await ensureToken();
        try {
          const res = await api.get<Architecture>(`/system-architectures/${slug}/`);
          setItem(res.data);
        } catch {
          const res = await api.get<Architecture[]>("/system-architectures/");
          const list = Array.isArray(res.data) ? res.data : [res.data];
          const found = list.find((a) => a.slug === slug);
          if (!found) throw new Error("not-in-api");
          setItem(found);
        }
      } catch {
        const sample = sampleArchitectures.find((a) => a.slug === slug);
        if (sample) {
          setItem(sample);
          setError(null);
        } else {
          setError("Architecture not found");
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const Icon = item ? iconMap[item.icon] || Server : Server;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <Link
          to="/#architecture"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to architectures
        </Link>

        {loading && <p className="text-muted-foreground">Loading…</p>}
        {error && <p className="text-destructive">{error}</p>}

        {item && (
          <article>
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-6">
              <Icon size={22} className="text-primary" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
              {item.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {item.description}
            </p>

            {item.items_discussed && (
      <div className="flex flex-wrap gap-2">
    {parseTags(item.items_discussed).map((tag, i) => (
      <span
        key={i}
        className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
      >
        {tag}
      </span>
    ))}
  </div>
            )}

            {item.body && (
              <div className="text-foreground leading-relaxed whitespace-pre-wrap mb-8">
                {item.body}
              </div>
            )}

            {item.external_link && (
              <a
                href={item.external_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                View external resource
                <ExternalLink size={14} />
              </a>
            )}
          </article>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ArchitectureDetail;
