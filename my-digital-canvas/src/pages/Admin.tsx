import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Plus, Pencil, Trash2, X, Save } from "lucide-react";

interface PortfolioItem {
  id: string;
  section: string;
  title: string;
  subtitle: string;
  description: string;
}

const initialItems: PortfolioItem[] = [
  { id: "1", section: "Experience", title: "Senior Software Engineer", subtitle: "TechCorp · 2022–Present", description: "Leading the platform team, building microservices architecture." },
  { id: "2", section: "Experience", title: "Software Engineer", subtitle: "StartupXYZ · 2020–2022", description: "Built the core product from scratch." },
  { id: "3", section: "Education", title: "M.Sc. Computer Science", subtitle: "MIT · 2016–2018", description: "Focused on distributed systems and machine learning." },
  { id: "4", section: "Blog", title: "Designing Fault-Tolerant Systems", subtitle: "Mar 2026", description: "A deep dive into patterns for building resilient microservices." },
];

const sections = ["Experience", "Education", "Architecture", "Blog", "Skills"];

const Admin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({ section: "Experience", title: "", subtitle: "", description: "" });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filtered = filter === "All" ? items : items.filter((i) => i.section === filter);

  const handleCreate = () => {
    if (!form.title.trim()) return;
    const newItem: PortfolioItem = { id: Date.now().toString(), ...form };
    setItems([...items, newItem]);
    setForm({ section: "Experience", title: "", subtitle: "", description: "" });
    setIsCreating(false);
  };

  const handleUpdate = () => {
    if (!editing) return;
    setItems(items.map((i) => (i.id === editing.id ? editing : i)));
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="min-h-screen">
      {/* Admin header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-xl font-bold text-gradient">Portfolio</a>
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Manage Content</h1>
            <p className="text-sm text-muted-foreground mt-1">Create, edit, and delete portfolio items.</p>
          </div>
          <button
            onClick={() => { setIsCreating(true); setEditing(null); }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity glow"
          >
            <Plus size={14} />
            Add Item
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["All", ...sections].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Create / Edit Modal */}
        {(isCreating || editing) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-6">
            <div className="card-gradient border border-border rounded-xl p-6 w-full max-w-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">{editing ? "Edit Item" : "New Item"}</h2>
                <button
                  onClick={() => { setIsCreating(false); setEditing(null); }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Section</label>
                  <select
                    value={editing ? editing.section : form.section}
                    onChange={(e) =>
                      editing
                        ? setEditing({ ...editing, section: e.target.value })
                        : setForm({ ...form, section: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {sections.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Title</label>
                  <input
                    type="text"
                    value={editing ? editing.title : form.title}
                    onChange={(e) =>
                      editing
                        ? setEditing({ ...editing, title: e.target.value })
                        : setForm({ ...form, title: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Item title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Subtitle</label>
                  <input
                    type="text"
                    value={editing ? editing.subtitle : form.subtitle}
                    onChange={(e) =>
                      editing
                        ? setEditing({ ...editing, subtitle: e.target.value })
                        : setForm({ ...form, subtitle: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Company, date, etc."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Description</label>
                  <textarea
                    rows={3}
                    value={editing ? editing.description : form.description}
                    onChange={(e) =>
                      editing
                        ? setEditing({ ...editing, description: e.target.value })
                        : setForm({ ...form, description: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Description..."
                  />
                </div>
                <button
                  onClick={editing ? handleUpdate : handleCreate}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Save size={14} />
                  {editing ? "Save Changes" : "Create Item"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Items list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground text-sm">
            No items found. Click "Add Item" to create one.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="card-gradient rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-primary/20 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                      {item.section}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{item.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => { setEditing(item); setIsCreating(false); }}
                    className="p-2 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg bg-secondary hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
