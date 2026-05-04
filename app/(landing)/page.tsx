import AboutSection from "@/components/modules/homepage/AboutSection";
import BlogSection from "@/components/modules/homepage/BlogSection";
import Community from "@/components/modules/homepage/Community";
import ContactSection from "@/components/modules/homepage/ContactSection";
import FAQ from "@/components/modules/homepage/FAQ";
import FeaturedTutors from "@/components/modules/homepage/FeaturedTutors";
import FindTutor from "@/components/modules/homepage/FindTutor";
import HeroSection from "@/components/modules/homepage/HeroSection";
import Newsletter from "@/components/modules/homepage/Newsletter";
import Services from "@/components/modules/homepage/Services";
import Statistics from "@/components/modules/homepage/Statistics";
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
    <main className="flex flex-col pt-32">
      <HeroSection />
      <Statistics />
      <FeaturedTutors featuredTutors={tutors} />
      <AboutSection />
      <SubjectCategories categories={categoryData.slice(0, 8)} />
      <Services />
      <FindTutor searchCategories={categoryData} />
      <Testimonials reviews={reviewData} />
      <BlogSection />
      <FAQ />
      <Newsletter />
      {/* <Community /> */}
    </main>
  );
}

