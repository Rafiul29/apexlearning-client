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
      className="relative w-full bg-[#F6F7F9] py-16 lg:py-24"
    >
      <div className="wrapper">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-[clamp(28px,3vw,44px)] font-bold text-[#111827] mb-3 lg:mb-0">
            Browse by subject
          </h2>
          <button className="flex items-center gap-2 text-[#FF6B6B] hover:text-[#ff5252] font-medium group">
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category) => {
            return (
              <div
                key={category.id}
                className="bg-white rounded-[22px] p-6 shadow-sm hover:shadow-[0_22px_60px_rgba(0,0,0,0.10)] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <h3 className="text-lg font-semibold text-[#111827] font-['Poppins'] mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-[#6B7280]">{category.description}</p>

                <div className="flex justify-end mt-4">
                  <div className="w-8 h-8 rounded-full bg-[#F6F7F9] flex items-center justify-center group-hover:bg-[#FF6B6B] transition-colors">
                    <ArrowRight className="w-4 h-4 text-[#6B7280] group-hover:text-white transition-colors" />
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
