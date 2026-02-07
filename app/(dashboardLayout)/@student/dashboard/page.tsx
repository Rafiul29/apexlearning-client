import { dashboardStatisticsService } from "@/services/dashboard-statistics.service";
import { StudentHero } from "./_components/student-hero";
import { StudentStats } from "./_components/student-stats";
import { RecentBookings } from "./_components/recent-bookings";

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage() {
  const { data: stats, error } = await dashboardStatisticsService.getDashboardStatistics();

  if (error || !stats) {
    return <div className="p-10 text-center">Failed to load data.</div>;
  }

  console.log(stats)

  return (
    <div className="p-6 lg:p-8 space-y-8 bg-white min-h-screen">
      <StudentHero nextSession={stats.nextSession} />
      <StudentStats stats={stats} />
      <RecentBookings bookings={stats.recentBookings} />
    </div>
  );
}