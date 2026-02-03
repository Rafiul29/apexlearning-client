import Community from "@/components/modules/homepage/Community";
import FeaturedTutors from "@/components/modules/homepage/FeaturedTutors";
import FindTutor from "@/components/modules/homepage/FindTutor";
import HeroSection from "@/components/modules/homepage/HeroSection";
import SubjectCategories from "@/components/modules/homepage/SubjectCategories";
import Testimonials from "@/components/modules/homepage/Testimonials";
import { categoryService } from "@/services/category.service";
import { TutorService } from "@/services/tutor.service";

export default async function Home() {
  const featuredTutorsPromise = TutorService.getTutors(
    { limit: "4", rating: "4", sortOrder: "desc" },
    { revalidate: 10 },
  );

  const categoriesPromise = categoryService.getCategories(
    {},
    { revalidate: 10 },
  );

  const [featuredTutors, categories] = await Promise.all([
    featuredTutorsPromise,
    categoriesPromise,
  ]);

  return (
    <>
      <HeroSection />
      <FeaturedTutors featuredTutors={featuredTutors.data.tutors} />
      <SubjectCategories categories={categories?.data.slice(0, 8) || []} />
      <FindTutor searchCategories={categories?.data || []} />
      <Testimonials />
      <Community />
    </>
  );
}
