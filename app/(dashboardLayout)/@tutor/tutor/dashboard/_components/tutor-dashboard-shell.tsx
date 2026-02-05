"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import { TutorProfileForm } from "@/components/modules/tutorDashboard/profile-form";
import TutorStatsOverview from "./tutor-stats-overview";

export default function TutorDashboardShell({ userInfo, tutorProfile, hasProfile }: any) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {userInfo?.name?.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground">
            {hasProfile
              ? "Manage your profile, schedule, and students."
              : "Complete your profile to start teaching."}
          </p>
        </div>
      </div>

      {!hasProfile && (
        <Alert variant="destructive" className="max-w-2xl border-rose-500 text-rose-600">
          <CheckCircle2Icon className="h-4 w-4" />
          <AlertTitle>Profile Setup Required</AlertTitle>
          <AlertDescription>
            Students won&apos;t be able to find you until you provide your details. 
            Please complete your setup in the <b>Setup Profile</b> tab.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue={hasProfile ? "overview" : "profile"} className="space-y-6">
        <TabsList className="bg-white dark:bg-slate-900 border p-1 h-auto">
          {hasProfile && <TabsTrigger value="overview">Overview</TabsTrigger>}
          <TabsTrigger value="sessions" disabled={!hasProfile}>Sessions</TabsTrigger>
          <TabsTrigger value="availability" disabled={!hasProfile}>Availability</TabsTrigger>
          <TabsTrigger value="profile">
            {hasProfile ? "Profile Settings" : "Setup Profile"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <TutorStatsOverview />
        </TabsContent>

        <TabsContent value="profile">
          {/* <TutorProfileForm
            initialData={tutorProfile}
            userId={userInfo?.id}
            mode={hasProfile}
          /> */}
        </TabsContent>
        
        {/* Add other TabsContent here */}
      </Tabs>
    </div>
  );
}