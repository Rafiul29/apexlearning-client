
import TutorStatsOverview from "./_components/tutor-stats-overview";
import UpcomingSession from "./_components/upcoming-seesion";
import TutorDashboardHeader from "./_components/tutor-dashboard-header";
import { dashboardStatisticsService } from "@/services/dashboard-statistics.service";
import { userService } from "@/services/user.service";
export const dynamic = "force-dynamic";

export default async function TutorDashboard() {


  const { data: stats, error } = await dashboardStatisticsService.getDashboardStatistics();

  const { data: userData, error: userErr } = await userService.getSession()


  return (
    <div className="p-6 space-y-8  bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* 1. Welcome Header */}
      <TutorDashboardHeader userName={userData?.user.name || {}} />
      {/* 2. Stats Bento Grid */}
      <TutorStatsOverview stats={stats} />
      {/* 3. upcoming session */}
      <UpcomingSession sessions={stats?.upcomingSessions || []} />
    </div>
  );
}