import { Calendar, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../lib/api";
import { getToken } from "../lib/api";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  description: string;
  body: string;
  tags: string;
  slug: string;
  created_at: string;

}



const formatDate = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

type Props={
  articles : BlogPost[]
}

const BlogSection = ({articles}) => {



return (
    <section id="blog" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="section-heading">Blog</h2>
        <p className="section-subheading">Thoughts on engineering, architecture, and craft.</p>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((post, i) => (
            <article
              key={i}
              className="card-gradient rounded-xl border border-border p-6 hover:border-primary/30 transition-all group cursor-pointer hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                  {post.tags}
                </span>
                <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {post.body.length > 100 ? post.body.substring(0, 100) + "..." : post.body}
              </p>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {post.created_at ? formatDate(post.created_at) : "Unknown date"}
                </span>
                <span>·</span>
                <span></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
