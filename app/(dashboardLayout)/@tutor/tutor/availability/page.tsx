import { TutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";

import AvailabilityManager from "./_components/availability-manager";
import { categoryService } from "@/services/category.service";
import SetupProfileModal from "../dashboard/_components/setup-profile-modal";
export const dynamic = "force-dynamic";

export default async function AvailabilityPage() {
  const { data: session } = await userService.getSession();
  const userInfo = session?.user;

  const [tutorData, categoriesData] = await Promise.all([
    TutorService.getTutorByUserId(userInfo.id),
    categoryService.getCategories(),
  ]);

  const tutorProfile = tutorData?.data;
  const categories = categoriesData?.data || [];

  const hasNoProfile = !tutorProfile || Object.keys(tutorProfile).length === 0;

  return (
    <div className="container mx-auto py-8">
      {hasNoProfile && <SetupProfileModal />}
      <AvailabilityManager
        tutorProfileId={tutorProfile.id}
        categories={categories}
      />
    </div>
  );
}
