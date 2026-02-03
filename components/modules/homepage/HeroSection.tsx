import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Adjust path as needed
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#F6F7F9] dark:bg-[#0F172A] transition-colors duration-300">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.03] mix-blend-multiply pointer-events-none" />

      <div className="relative w-full px-6 lg:px-[7vw] pt-20 lg:pt-0 pb-8 lg:pb-0 min-h-screen flex flex-col justify-center">
        <div className="lg:w-[40vw] z-10 mb-8 lg:mb-12">
          <span className="text-xs lg:text-sm font-medium tracking-[0.12em] uppercase text-[#6B7280] dark:text-gray-400 mb-4 block">
            Online Tutoring
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[clamp(36px,4.5vw,64px)] font-bold text-[#111827] dark:text-white leading-[1.05] tracking-[-0.02em] font-['Poppins'] mb-4 lg:mb-6">
            Learn what you love,{" "}
            <span className="text-[#FF6B6B]">your way.</span>
          </h1>
          <p className="text-base lg:text-lg text-[#6B7280] dark:text-gray-300 leading-relaxed mb-6 lg:mb-8 max-w-md">
            Book 1-on-1 sessions in minutes. From academics to creative
            skills—find the right tutor and start today.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button className="bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-xl px-6 lg:px-8 py-5 lg:py-6 text-base font-medium shadow-lg shadow-[#FF6B6B]/20">
              Find a tutor
            </Button>
            <Button
              variant={"link"}
              className="flex items-center gap-2 text-[#6B7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-white transition-colors text-sm lg:text-base font-medium group"
            >
              See how it works
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Image Container with Dynamic Shadow */}
        <div className="w-full lg:absolute lg:right-[6vw] lg:top-[20vh] lg:w-[38vw] lg:h-[44vh] h-[30vh] rounded-[28px] overflow-hidden shadow-[0_22px_60px_rgba(0,0,0,0.10)] dark:shadow-[0_22px_60px_rgba(0,0,0,0.40)] z-10 mb-8 lg:mb-0 border-4 border-white dark:border-slate-800">
          <Image
            width={720}
            height={480}
            src="/images/hero-student.jpg"
            alt="Student learning"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Decorative SVG */}
        <svg
          className="absolute left-[7vw] bottom-[15vh] w-[50vw] h-[8vh] pointer-events-none z-0 hidden lg:block opacity-60"
          viewBox="0 0 400 60"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 50 Q100 10 200 40 T400 20"
            stroke="#FF6B6B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
}
