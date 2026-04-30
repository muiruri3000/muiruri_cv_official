import { useState } from "react";
import { Mail, MapPin, Send, Check,Github, Linkedin, Twitter } from "lucide-react";
import api from "../lib/api";


const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — wire up to a backend
try {
      await api.post("/contact/", form);
    } catch (err: any) {
      console.error("Failed to send message", err.response?.data || err.message);
    }
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };
    
    
  

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="section-heading">Get in Touch</h2>
        <p className="section-subheading">Have a project in mind? Let's talk.</p>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <Mail size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm mb-0.5">Email</p>
                <p className="text-muted-foreground text-sm">jmuiruri@zohomail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <MapPin size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm mb-0.5">Location</p>
                <p className="text-muted-foreground text-sm">Nairobi, Kenya</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Find me on</p>
              <div className="flex gap-3">
                {[Github, Linkedin, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={sent}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                sent
                  ? "bg-green-600 text-white"
                  : "bg-primary text-primary-foreground hover:opacity-90 glow"
              }`}
            >
              <Send size={14} />
              
               {sent ? <Check size={14} /> : <Send size={14} />}
              {sent ? "Message Sent" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
