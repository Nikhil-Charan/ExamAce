import { motion } from "framer-motion";
import { BookOpen, Download, Search, Star, Filter } from "lucide-react";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";

const departments = ["All", "CSE", "ECE", "Mechanical", "Civil", "EEE"];
const semesters = ["All", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

const papers = [
  { id: 1, name: "Data Structures & Algorithms", dept: "CSE", sem: "3rd", year: 2024, important: 12 },
  { id: 2, name: "Digital Signal Processing", dept: "ECE", sem: "5th", year: 2024, important: 8 },
  { id: 3, name: "Engineering Mathematics III", dept: "All", sem: "3rd", year: 2023, important: 15 },
  { id: 4, name: "Operating Systems", dept: "CSE", sem: "5th", year: 2024, important: 10 },
  { id: 5, name: "Thermodynamics", dept: "Mechanical", sem: "4th", year: 2023, important: 7 },
  { id: 6, name: "Database Management Systems", dept: "CSE", sem: "4th", year: 2024, important: 11 },
  { id: 7, name: "Computer Networks", dept: "CSE", sem: "6th", year: 2023, important: 9 },
  { id: 8, name: "Structural Analysis", dept: "Civil", sem: "5th", year: 2024, important: 6 },
];

const importantQuestions = [
  { question: "Explain BFS and DFS with examples", subject: "DSA", frequency: 5 },
  { question: "Derive Laplace transform properties", subject: "Math III", frequency: 4 },
  { question: "Compare process vs thread with diagram", subject: "OS", frequency: 6 },
  { question: "Explain normalization up to BCNF", subject: "DBMS", frequency: 5 },
  { question: "Explain TCP/IP model layers", subject: "CN", frequency: 4 },
];

export default function QuestionBank() {
  const [dept, setDept] = useState("All");
  const [sem, setSem] = useState("All");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"papers" | "important">("papers");

  const filtered = papers.filter((p) => {
    if (dept !== "All" && p.dept !== dept) return false;
    if (sem !== "All" && p.sem !== sem) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Question Bank</h1>
          <p className="text-muted-foreground mt-1">Browse papers and AI-extracted important questions.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit mb-6">
          <button
            onClick={() => setTab("papers")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              tab === "papers" ? "bg-card text-foreground notion-shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Papers
          </button>
          <button
            onClick={() => setTab("important")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              tab === "important" ? "bg-card text-foreground notion-shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Star className="w-3.5 h-3.5 inline mr-1.5" />
            Important Questions
          </button>
        </div>

        {tab === "papers" && (
          <>
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search papers..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="px-3 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
              >
                {departments.map((d) => <option key={d} value={d}>{d === "All" ? "All Departments" : d}</option>)}
              </select>
              <select
                value={sem}
                onChange={(e) => setSem(e.target.value)}
                className="px-3 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
              >
                {semesters.map((s) => <option key={s} value={s}>{s === "All" ? "All Semesters" : `${s} Sem`}</option>)}
              </select>
            </div>

            {/* Papers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.map((paper, i) => (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-xl bg-card border border-border notion-shadow hover:notion-shadow-lg transition-shadow group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mt-0.5">
                        <BookOpen className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-foreground">{paper.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{paper.dept} • {paper.sem} Sem • {paper.year}</p>
                        <p className="text-xs text-primary mt-1.5">{paper.important} important questions extracted</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-accent transition-colors opacity-0 group-hover:opacity-100">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <Filter className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No papers found matching your filters.</p>
              </div>
            )}
          </>
        )}

        {tab === "important" && (
          <div className="bg-card border border-border rounded-xl notion-shadow overflow-hidden">
            <div className="p-4 border-b border-border">
              <p className="text-xs text-muted-foreground">Questions ranked by frequency across uploaded papers</p>
            </div>
            {importantQuestions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center justify-between p-4 hover:bg-accent/50 transition-colors ${
                  i < importantQuestions.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{q.question}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{q.subject}</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-accent text-accent-foreground font-medium">
                  {q.frequency}× repeated
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </AppLayout>
  );
}
