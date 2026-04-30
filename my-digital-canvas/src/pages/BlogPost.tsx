import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import api from "@/lib/api";
import { ensureToken } from "@/lib/ensureToken";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sampleArticles } from "@/data/SampleArticles";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  description: string;
  body: string;
  tags: string;
  slug: string;
  created_at: string;
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        await ensureToken();
        // Try direct slug endpoint first, fall back to list filter
        try {
          const res = await api.get<BlogPost>(`/articles/${slug}/`);
          setPost(res.data);
        } catch {
          const res = await api.get<BlogPost[]>("/articles/");
          const list = Array.isArray(res.data) ? res.data : [res.data];
          const found = list.find((a) => a.slug === slug);
          if (!found) throw new Error("not-in-api");
          setPost(found);
        }
      } catch {
        // Fall back to sample articles so the page is always testable
        const sample = sampleArticles.find((a) => a.slug === slug);
        if (sample) {
          setPost(sample);
          setError(null);
        } else {
          setError("Article not found");
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <Link
          to="/#blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to blog
        </Link>

        {loading && <p className="text-muted-foreground">Loading…</p>}
        {error && <p className="text-destructive">{error}</p>}

        {post && (
          <article>
            {post.tags && (
              <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                {post.tags}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-3 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
              <Calendar size={12} />
              {formatDate(post.created_at)}
            </div>
            {post.description && (
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {post.description}
              </p>
            )}
            <div className="prose prose-invert max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
              {post.body}
            </div>
          </article>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;
