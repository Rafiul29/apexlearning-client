import { Review } from "@/types";
import { Quote } from "lucide-react";

const Testimonials = ({ reviews }: { reviews: Review[] }) => {
  return (
    <section className="relative w-full bg-[#F6F7F9] dark:bg-[#0F172A] py-16 lg:py-24 transition-colors duration-300">
      <div className="wrapper">
        <div className="mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-[clamp(28px,3vw,44px)] font-bold text-[#111827] dark:text-white font-['Poppins']">
            What students say
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {reviews?.length > 0 &&
            reviews?.map((reviews) => (
              <div
                key={reviews.id}
                className="flex-1 bg-white dark:bg-[#1E293B] rounded-[28px] shadow-[0_22px_60px_rgba(0,0,0,0.05)] dark:shadow-[0_22px_60px_rgba(0,0,0,0.3)] p-6 lg:p-8 border border-transparent dark:border-slate-800 transition-all duration-300 hover:shadow-xl"
              >
                {/* Quote Icon Container */}
                <div className="w-10 h-10 rounded-xl bg-[#FF6B6B]/10 dark:bg-[#FF6B6B]/20 flex items-center justify-center mb-6">
                  <Quote className="w-5 h-5 text-[#FF6B6B]" />
                </div>

                {/* Quote Text */}
                <p className="text-lg lg:text-xl text-[#111827] dark:text-gray-200 leading-relaxed mb-8 font-['Poppins']">
                  "{reviews.content}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={reviews?.student?.image || ""}
                    alt={reviews?.student?.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-slate-700"
                  />
                  <div>
                    <span className="block font-semibold text-[#111827] dark:text-white">
                      {reviews.student?.name}
                    </span>
                    <span className="text-sm text-[#6B7280] dark:text-gray-400">
                      {reviews.student?.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
