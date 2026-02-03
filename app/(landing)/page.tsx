import Community from "@/components/modules/homepage/Community";
import FeaturedTutors from "@/components/modules/homepage/FeaturedTutors";
import HeroSection from "@/components/modules/homepage/HeroSection";
import SubjectCategories from "@/components/modules/homepage/SubjectCategories";
import Testimonials from "@/components/modules/homepage/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedTutors />
      <SubjectCategories/>
      <Testimonials/>
      <Community/>
    </>
  );
}
