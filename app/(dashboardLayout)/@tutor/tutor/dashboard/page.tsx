import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BarChart3, CalendarCheck, ChevronRight, DollarSign, GraduationCap, Star, Users } from "lucide-react";

const StatsCards = [
  { label: "Total Earnings", value: "$4,250", icon: DollarSign, color: "text-green-600" },
  { label: "Sessions Taught", value: "128", icon: GraduationCap, color: "text-blue-600" },
  { label: "Active Students", value: "12", icon: Users, color: "text-purple-600" },
  { label: "Avg. Rating", value: "4.9", icon: Star, color: "text-amber-500" },
];


export default function TutorDashboard() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* 1. Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, Alex!</h1>
          <p className="text-slate-500">Here is what is happening with your tutoring today.</p>
        </div>
        <Button className="bg-rose-600 hover:bg-rose-700">Create New Slot</Button>
      </div>

      {/* 2. Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {StatsCards.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className={cn("p-3 rounded-xl bg-slate-100 dark:bg-slate-900", stat.color)}>
                <stat.icon size={24} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. Upcoming Sessions (Left Column) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CalendarCheck className="text-rose-600" /> Upcoming Sessions
          </h2>
          {[1, 2, 3].map((session) => (
            <Card key={session} className="group hover:border-rose-200 transition-all cursor-pointer">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-rose-100 text-rose-700 p-3 rounded-lg text-center min-w-[60px]">
                  <span className="block text-xs font-bold uppercase">Feb</span>
                  <span className="text-xl font-bold">0{session + 4}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">Advanced Calculus</h4>
                  <p className="text-sm text-slate-500">Student: Sarah Jenkins</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">10:30 AM - 11:30 AM</p>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Confirmed</span>
                </div>
                <Button variant="ghost" size="icon"><ChevronRight size={18} /></Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 4. Statistics & Performance (Right Column) */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BarChart3 className="text-blue-600" /> Weekly Growth
          </h2>
          <Card className="h-[300px] flex items-center justify-center border-dashed border-2">
            {/* You can drop a Recharts bar chart here */}
            <div className="text-center p-6 text-slate-400">
               [Chart Placeholder: Earnings over last 7 days]
            </div>
          </Card>
          
          {/* Quick Insights */}
          <Card className="bg-slate-900 text-white border-none">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Top Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Mathematics</p>
              <p className="text-xs text-slate-400 mt-1">45% of your total revenue</p>
            </CardContent>
          </Card>
        </div>
      </div>
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
