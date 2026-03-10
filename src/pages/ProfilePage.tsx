import { motion } from "framer-motion";
import { User, Mail, GraduationCap, BookOpen } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";

export default function ProfilePage() {
  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>
        </div>

        <div className="max-w-lg">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Student User</h2>
              <p className="text-sm text-muted-foreground">CSE • 5th Semester</p>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            {[
              { label: "Email", value: "student@college.edu", icon: Mail },
              { label: "Department", value: "Computer Science & Engineering", icon: GraduationCap },
              { label: "Papers Uploaded", value: "12 papers", icon: BookOpen },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl bg-card border border-border notion-shadow">
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-6 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            Edit Profile
          </button>
        </div>
      </motion.div>
    </AppLayout>
  );
}
