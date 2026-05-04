import { Review } from "@/types";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

const Testimonials = ({ reviews }: { reviews: Review[] }) => {
  return (
    <section className="py-20 bg-[#fafafa] dark:bg-[#050505] font-sans">
      <div className="wrapper">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-md inline-block mb-6">
            Testimonials
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-[#111827] dark:text-white tracking-tight mb-6 leading-[1.1]">
            Trusted by thousands of students worldwide
          </h3>
          <p className="text-[#4B5563] dark:text-slate-400 text-lg leading-[1.6] font-medium">
            Don't just take our word for it. Hear what our community has to say about their learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews?.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col bg-white dark:bg-white/5 backdrop-blur-md rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 dark:border-white/10 p-8 hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" strokeWidth={1.5} />
                  ))}
                </div>

                <div className="relative mb-8">
                  <Quote className="absolute -top-4 -left-4 w-8 h-8 text-emerald-100 dark:text-emerald-500/10 -z-0" strokeWidth={1.5} />
                  <p className="relative z-10 text-[15px] font-medium leading-[1.7] text-[#4B5563] dark:text-slate-300 italic">
                    "{review.content}"
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-4 border-t border-gray-100 dark:border-white/10 pt-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-100 dark:border-emerald-500/20 shadow-sm">
                    <Image
                      src={review?.student?.image || "https://i.pravatar.cc/100"}
                      alt={review?.student?.name || "Student"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#111827] dark:text-white text-base">{review.student?.name}</h4>
                    <p className="text-[11px] text-[#4B5563] dark:text-slate-400 uppercase tracking-widest font-bold">
                      {review.student?.role || "Student"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <div className="col-span-full text-center py-12">
                <p className="text-[#4B5563] dark:text-slate-400 font-medium italic">No reviews yet. Be the first to leave one!</p>
             </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
