import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";

const Community = () => {
  return (
    <section
      id="community"
      className="relative w-full bg-[#F6F7F9] dark:bg-[#0F172A] py-16 lg:py-24 transition-colors duration-300"
    >
      <div className="px-6 lg:px-[7vw]">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 w-full">
            <h2 className="text-3xl lg:text-[clamp(28px,3vw,44px)] font-bold text-[#111827] dark:text-white font-['Poppins'] mb-4">
              Join the learning community
            </h2>
            <p className="text-base lg:text-lg text-[#6B7280] dark:text-gray-400 mb-8 max-w-md">
              Get study tips, new tutor alerts, and exclusive offers delivered
              to your inbox.
            </p>

            <div className="relative max-w-md">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Mail className="w-5 h-5 text-[#6B7280] dark:text-gray-400" />
              </div>
              <Input
                type="email"
                placeholder="Email address"
                className="h-14 pl-12 pr-32 rounded-xl border-gray-200 dark:border-slate-700 bg-white dark:bg-[#1E293B] text-[#111827] dark:text-white shadow-sm focus-visible:ring-[#FF6B6B] transition-colors"
              />
              <Button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-lg lg:rounded-xl px-5 h-11 shadow-lg shadow-[#FF6B6B]/20 transition-all active:scale-95">
                <span className="hidden sm:inline">Subscribe</span>
                <Send className="w-4 h-4 sm:ml-2" />
              </Button>
            </div>

            {/* Decorative Squiggle */}
            <svg
              className="w-48 h-4 mt-6 opacity-80"
              viewBox="0 0 150 10"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q37 0 75 5 T150 5"
                stroke="#FF6B6B"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Image Side */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="w-full lg:w-[35vw] h-[300px] lg:h-[44vh] rounded-[28px] overflow-hidden shadow-[0_22px_60px_rgba(0,0,0,0.10)] dark:shadow-[0_22px_60px_rgba(0,0,0,0.4)] border-4 border-white dark:border-slate-800 transition-all">
              <img
                src="/images/community-group.jpg"
                alt="Learning community"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
