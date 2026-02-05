export const dynamic = "force-dynamic";
import TutorStatsOverview from "./_components/tutor-stats-overview";
import UpcomingSession from "./_components/upcoming-seesion";
import TutorDashboardHeader from "./_components/tutor-dashboard-header";

export default function TutorDashboard() {
  return (
    <div className="p-6 space-y-8  bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* 1. Welcome Header */}
      <TutorDashboardHeader />
      {/* 2. Stats Bento Grid */}
      <TutorStatsOverview />
      {/* 3. upcoming session */}
      <UpcomingSession />
    </div>
  );
}

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { TutorService } from "@/services/tutor.service";
// import { userService } from "@/services/user.service";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { CheckCircle2Icon, InfoIcon } from "lucide-react";
// import { TutorProfileForm } from "@/components/modules/tutorDashboard/profile-form";

// export default async function TutorDashboard() {
//   const { data } = await userService.getSession();
//   const userInfo = data?.user;

//   const { data: tutorProfile } = await TutorService.getTutorByUserId(
//     userInfo?.id,
//   );

//   const hasProfile = !tutorProfile;

//   console.log({ hasProfile });
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-end">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Tutor Dashboard</h1>
//           <p className="text-muted-foreground">
//             {hasProfile
//               ? "Manage your profile, schedule, and students."
//               : "Complete your profile to start teaching."}
//           </p>
//         </div>
//       </div>

//       {/* 3. Show Setup Alert if profile is missing */}
//       {!hasProfile && (
//         <>
//           <Alert variant="destructive" className="max-w-md space-x-1">
//             <CheckCircle2Icon />
//             <AlertTitle>Profile Setup Required</AlertTitle>
//             <AlertDescription>
//               You haven't set up your tutor profile yet. Students won't be able
//               to find you until you provide your details in the{" "}
//               <b>Profile Settings</b> tab.
//             </AlertDescription>
//           </Alert>
//         </>
//       )}

//       <Tabs
//         defaultValue={hasProfile ? "sessions" : "profile"}
//         className="space-y-4"
//       >
//         <TabsList className="bg-white dark:bg-slate-900 border">
//           <TabsTrigger value="sessions" disabled={!hasProfile}>
//             Teaching Sessions
//           </TabsTrigger>
//           <TabsTrigger value="availability" disabled={!hasProfile}>
//             Availability
//           </TabsTrigger>
//           <TabsTrigger value="profile">
//             {hasProfile ? "Profile Settings" : "Setup Profile"}
//           </TabsTrigger>
//           <TabsTrigger value="reviews" disabled={!hasProfile}>
//             Ratings & Reviews
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="sessions" className="space-y-4">
//           {/* {hasProfile && <SessionsList tutorId={tutorProfile.id} />} */}
//         </TabsContent>

//         <TabsContent value="availability">
//           {/* {hasProfile && (
//             <AvailabilityManager
//               tutorId={tutorProfile.id}
//               initialSlots={tutorProfile.availability}
//             />
//           )} */}
//         </TabsContent>

//         <TabsContent value="profile">
//           <TutorProfileForm
//             initialData={tutorProfile}
//             userId={userInfo.id}
//             mode={hasProfile}
//           />
//         </TabsContent>

//         <TabsContent value="reviews">
//           {/* {hasProfile && <ReviewsList tutorId={tutorProfile.id} />} */}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
