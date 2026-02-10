import { TutorProfileForm } from "@/components/modules/tutorDashboard/profile-form";
import { categoryService } from "@/services/category.service";
import { TutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function TutorProfilePage() {
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

  const isExistingTutor = tutorData && Object.keys(tutorData).length > 0;

  return (
    <div className="container mx-auto py-6">
      <TutorProfileForm
        initialData={
          isExistingTutor
            ? tutorData
            : {
                user: {
                  name: userInfo?.name ?? "",
                  phone: userInfo?.phone ?? "",
                },
              }
        }
        userId={userInfo?.id}
        categories={categories}
        mode={!!tutorData}
      />
    </div>
  );
}
