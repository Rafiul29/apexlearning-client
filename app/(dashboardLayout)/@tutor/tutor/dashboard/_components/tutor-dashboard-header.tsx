import { Button } from "@/components/ui/button";
import Link from "next/link";

const TutorDashboardHeader = ({ userName }: { userName: string }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Welcome back, {userName}!
        </h1>
        <p className="text-slate-500">
          Here is what is happening with your tutoring today.
        </p>
      </div>
      <Button asChild className="bg-rose-600 hover:bg-rose-700">
        <Link href="/tutor/availability"> Create New Slot</Link>
      </Button>
    </div>
  );
};

export default TutorDashboardHeader;
