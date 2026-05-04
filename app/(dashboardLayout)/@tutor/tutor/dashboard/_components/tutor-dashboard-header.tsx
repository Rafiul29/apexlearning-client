import { Button } from "@/components/ui/button";
import Link from "next/link";

const TutorDashboardHeader = ({ userName }: { userName: string }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
          Welcome back, <span className="text-emerald-600">{userName}!</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Manage your teaching schedule and student growth metrics.
        </p>
      </div>
      <Button asChild className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black rounded-full px-8 h-12 shadow-lg active:scale-95 transition-all uppercase tracking-widest text-[10px]">
        <Link href="/tutor/availability">Create New Slot</Link>
      </Button>
    </div>
  );
};

export default TutorDashboardHeader;
