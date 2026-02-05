export const dynamic = "force-dynamic";

import { TutorProfileForm } from "@/components/modules/tutorDashboard/profile-form";
import { categoryService } from "@/services/category.service";
import { TutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export default async function TutorProfilePage() {
  // ১. সেশন চেক করা
  const { data: session } = await userService.getSession();
  const userInfo = session?.user;

  if (!userInfo) {
    redirect("/login");
  }

  const [tutorResponse, categoryResponse] = await Promise.all([
    TutorService.getTutorByUserId(userInfo.id),
    categoryService.getCategories(),
  ]);

  const tutorData = tutorResponse?.data;
  const categories = categoryResponse?.data || [];

  
  return (
    <div className="container mx-auto py-6">
      <TutorProfileForm
        initialData={tutorData}
        userId={userInfo.id}
        categories={categories}
        mode={!!tutorData}
      />
    </div>
  );
}
