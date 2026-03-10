import { AppSidebar } from "@/components/AppSidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1 min-h-screen overflow-auto">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
