import { motion } from "framer-motion";
import { BookOpen, Upload, MessageCircle, TrendingUp, FileText, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";

const stats = [
  { label: "Papers Uploaded", value: "248", icon: FileText, color: "text-primary" },
  { label: "Questions Extracted", value: "1,420", icon: Star, color: "text-warning" },
  { label: "Active Users", value: "89", icon: TrendingUp, color: "text-success" },
];

const quickActions = [
  { title: "Upload Paper", description: "Add a new question paper", icon: Upload, url: "/upload", variant: "primary" as const },
  { title: "Question Bank", description: "Browse important questions", icon: BookOpen, url: "/questions", variant: "default" as const },
  { title: "AI Assistant", description: "Ask your study doubts", icon: MessageCircle, url: "/chat", variant: "default" as const },
];

const recentPapers = [
  { name: "Data Structures - 2024", dept: "CSE", sem: "3rd", date: "2 days ago" },
  { name: "Digital Electronics - 2024", dept: "ECE", sem: "4th", date: "3 days ago" },
  { name: "Engineering Mathematics III", dept: "Common", sem: "3rd", date: "5 days ago" },
  { name: "Operating Systems - 2023", dept: "CSE", sem: "5th", date: "1 week ago" },
];

export default function Dashboard() {
  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Welcome back 👋</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your study materials.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-xl bg-card border border-border notion-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {quickActions.map((action, i) => (
              <Link key={action.title} to={action.url}>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`p-5 rounded-xl border transition-all cursor-pointer group ${
                    action.variant === "primary"
                      ? "bg-primary/5 border-primary/20 hover:bg-primary/10"
                      : "bg-card border-border hover:border-primary/30 notion-shadow"
                  }`}
                >
                  <action.icon className={`w-5 h-5 mb-3 ${action.variant === "primary" ? "text-primary" : "text-muted-foreground group-hover:text-primary"} transition-colors`} />
                  <h3 className="font-medium text-foreground text-sm">{action.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Papers */}
        <div>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Recent Papers</h2>
          <div className="bg-card border border-border rounded-xl notion-shadow overflow-hidden">
            {recentPapers.map((paper, i) => (
              <motion.div
                key={paper.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className={`flex items-center justify-between p-4 hover:bg-accent/50 transition-colors cursor-pointer ${
                  i < recentPapers.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                    <FileText className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{paper.name}</p>
                    <p className="text-xs text-muted-foreground">{paper.dept} • {paper.sem} Sem</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{paper.date}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
}
