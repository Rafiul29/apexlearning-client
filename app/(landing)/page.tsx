import Community from "@/components/modules/homepage/Community";
import FeaturedTutors from "@/components/modules/homepage/FeaturedTutors";
import FindTutor from "@/components/modules/homepage/FindTutor";
import HeroSection from "@/components/modules/homepage/HeroSection";
import SubjectCategories from "@/components/modules/homepage/SubjectCategories";
import Testimonials from "@/components/modules/homepage/Testimonials";
import { categoryService } from "@/services/category.service";
import { reviewService } from "@/services/review.service";
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

  const reviewLandingPromise = reviewService.findReviewLanding();

  const [featuredTutors, categories, reviews] = await Promise.all([
    featuredTutorsPromise,
    categoriesPromise,
    reviewLandingPromise,
  ]);

  const tutors = featuredTutors?.data?.tutors || [];
  const categoryData = categories?.data || [];
  const reviewData = reviews?.data || [];

  return (
    <>
      <HeroSection />

      <FeaturedTutors featuredTutors={tutors} />

      <SubjectCategories categories={categoryData.slice(0, 8)} />
      <FindTutor searchCategories={categoryData} />

      <Testimonials reviews={reviewData} />
      <Community />
    </>
  );
}
