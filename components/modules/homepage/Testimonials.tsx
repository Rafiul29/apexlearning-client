import { Quote } from "lucide-react";
export const testimonials = [
  {
    id: 1,
    name: "Ava L.",
    avatar: "/images/student-ava.jpg",
    quote:
      "My tutor explained things in a way that finally made sense. I actually look forward to studying now.",
  },
  {
    id: 2,
    name: "David R.",
    avatar: "/images/student-david.jpg",
    quote:
      "Flexible times, clear pricing, and real progress. Best tutoring experience I've had.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative w-full bg-[#F6F7F9] py-16 lg:py-24">
      <div className="px-6 lg:px-[7vw]">
        <div className="mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-[clamp(28px,3vw,44px)] font-bold text-[#111827] font-['Poppins']">
            What students say
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-1 bg-white rounded-[28px] shadow-[0_22px_60px_rgba(0,0,0,0.10)] p-6 lg:p-8"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FF6B6B]/10 flex items-center justify-center mb-6">
                <Quote className="w-5 h-5 text-[#FF6B6B]" />
              </div>

              <p className="text-lg lg:text-xl text-[#111827] leading-relaxed mb-8 font-['Poppins']">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <span className="block font-semibold text-[#111827]">
                    {testimonial.name}
                  </span>
                  <span className="text-sm text-[#6B7280]">Student</span>
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
