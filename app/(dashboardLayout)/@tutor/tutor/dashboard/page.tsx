import TutorStatsOverview from "./_components/tutor-stats-overview";
import UpcomingSession from "./_components/upcoming-seesion";
import TutorDashboardHeader from "./_components/tutor-dashboard-header";
import { dashboardStatisticsService } from "@/services/dashboard-statistics.service";
import { userService } from "@/services/user.service";
import { TutorService } from "@/services/tutor.service";
import SetupProfileModal from "./_components/setup-profile-modal";
export const dynamic = "force-dynamic";

export default async function TutorDashboard() {
  const { data: session } = await userService.getSession();
  const userId = session?.user?.id;

  const [statsResponse, tutorResponse] = await Promise.all([
    dashboardStatisticsService.getDashboardStatistics(),
    TutorService.getTutorByUserId(userId),
  ]);

  const stats = statsResponse?.data;
  const tutorData = tutorResponse?.data;

  const hasNoProfile = !tutorData || Object.keys(tutorData).length === 0;

  return (
    <div className="p-6 space-y-8 bg-slate-50 dark:bg-slate-950 min-h-screen">
      {hasNoProfile && <SetupProfileModal />}

      {!hasNoProfile ? (
        <>
          <TutorDashboardHeader userName={session?.user?.name || "Tutor"} />
          <TutorStatsOverview stats={stats} />
          <UpcomingSession sessions={stats?.upcomingSessions || []} />
        </>
      ) : (
        <div className="flex items-center justify-center h-[50vh]">
          <p className="text-muted-foreground">
            Please complete your profile setup...
          </p>
        </div>
      )}
    </div>
  );
}
