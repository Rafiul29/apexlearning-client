import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
export const categories = [
  {
    id: 1,
    name: "Mathematics",
    slug: "mathematics",
    description: "From algebra to calculus",
    icon: "Calculator",
  },
  {
    id: 2,
    name: "Languages",
    slug: "languages",
    description: "Learn a new language",
    icon: "Languages",
  },
  {
    id: 3,
    name: "Science",
    slug: "science",
    description: "Physics, chemistry & biology",
    icon: "FlaskConical",
  },
  {
    id: 4,
    name: "Programming",
    slug: "programming",
    description: "Code your future",
    icon: "Code",
  },
  {
    id: 5,
    name: "Music",
    slug: "music",
    description: "Instruments & theory",
    icon: "Music",
  },
  {
    id: 6,
    name: "Test Prep",
    slug: "test-prep",
    description: "SAT, GRE & more",
    icon: "GraduationCap",
  },
  {
    id: 7,
    name: "Business",
    slug: "business",
    description: "Finance & marketing",
    icon: "Briefcase",
  },
  {
    id: 8,
    name: "Design",
    slug: "design",
    description: "UI/UX & graphics",
    icon: "Palette",
  },
];
const SubjectCategories = () => {
  return (
    <section
      id="subjects"
      className="relative w-full bg-[#F6F7F9] dark:bg-[#0F172A] py-16 lg:py-24 transition-colors duration-300"
    >
      <div className="wrapper">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-[clamp(28px,3vw,44px)] font-bold text-[#111827] dark:text-white mb-3 lg:mb-0">
            Browse by subject
          </h2>
          <Button
            variant={"link"}
            className="flex items-center gap-2 text-[#FF6B6B] hover:text-[#ff5252] font-semibold group transition-colors"
          >
            View all
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category) => {
            return (
              <div
                key={category.id}
                className="bg-white dark:bg-[#1E293B] rounded-[22px] p-6 shadow-sm hover:shadow-[0_22px_60px_rgba(0,0,0,0.10)] dark:hover:shadow-[0_22px_60px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group border border-transparent dark:border-slate-800"
              >
                <h3 className="text-lg font-semibold text-[#111827] dark:text-white font-['Poppins'] mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-[#6B7280] dark:text-gray-400">
                  {category.description}
                </p>

                <div className="flex justify-end mt-4">
                  {/* Circular Arrow Indicator */}
                  <div className="w-9 h-9 rounded-full bg-[#F6F7F9] dark:bg-slate-700/50 flex items-center justify-center group-hover:bg-[#FF6B6B] transition-colors">
                    <ArrowRight className="w-4 h-4 text-[#6B7280] dark:text-gray-300 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SubjectCategories;
