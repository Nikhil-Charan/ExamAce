import { motion } from "framer-motion";
import { Upload as UploadIcon, FileText, X } from "lucide-react";
import { useState, useCallback } from "react";
import { AppLayout } from "@/components/AppLayout";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files).filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...dropped]);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files).filter((f) => f.type === "application/pdf");
      setFiles((prev) => [...prev, ...selected]);
    }
  };

  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Upload Papers</h1>
          <p className="text-muted-foreground mt-1">Upload previous year question papers as PDF files.</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            >
              <option value="">Select Department</option>
              <option value="cse">Computer Science</option>
              <option value="ece">Electronics</option>
              <option value="mech">Mechanical</option>
              <option value="civil">Civil</option>
              <option value="eee">Electrical</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Semester</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            >
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>{s}{s === 1 ? "st" : s === 2 ? "nd" : s === 3 ? "rd" : "th"} Semester</option>
              ))}
            </select>
          </div>
        </div>

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          className={`relative rounded-xl border-2 border-dashed p-12 text-center transition-all cursor-pointer ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/40 bg-card"
          }`}
        >
          <input
            type="file"
            accept=".pdf"
            multiple
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <UploadIcon className={`w-10 h-10 mx-auto mb-4 transition-colors ${dragOver ? "text-primary" : "text-muted-foreground"}`} />
          <p className="text-sm font-medium text-foreground">Drag & drop PDF files here</p>
          <p className="text-xs text-muted-foreground mt-1">or click to browse • PDF only, max 20MB</p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6 space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Selected Files</h3>
            {files.map((file, i) => (
              <motion.div
                key={`${file.name}-${i}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border notion-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-accent flex items-center justify-center">
                    <FileText className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button onClick={() => removeFile(i)} className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}

            <button className="mt-4 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              Upload {files.length} {files.length === 1 ? "file" : "files"}
            </button>
          </div>
        )}
      </motion.div>
    </AppLayout>
  );
}
