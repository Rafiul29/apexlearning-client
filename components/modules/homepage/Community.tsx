import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";

const Community = () => {
  return (
    <section
      id="community"
      className="relative w-full bg-[#fafafa] dark:bg-[#050505] py-20 font-sans transition-colors duration-300 overflow-hidden"
    >
      <div className="wrapper relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 w-full">
            <h2 className="text-4xl md:text-5xl lg:text-[clamp(28px,3vw,48px)] font-extrabold text-[#111827] dark:text-white mb-6 leading-[1.1] tracking-tight">
              Join the learning <span className="text-emerald-700 dark:text-emerald-400 italic">community</span>
            </h2>
            <p className="text-lg text-[#4B5563] dark:text-slate-400 mb-10 max-w-md leading-[1.6] font-medium">
              Get study tips, new tutor alerts, and exclusive offers delivered
              to your inbox.
            </p>

            <div className="relative max-w-md">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
                <Mail className="w-5 h-5 text-[#4B5563] dark:text-slate-400" strokeWidth={1.5} />
              </div>
              <Input
                type="email"
                placeholder="Email address"
                className="h-16 pl-14 pr-40 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-[#111827] dark:text-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus-visible:ring-emerald-700/20 text-[15px]"
              />
              <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-800 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-full px-6 h-12 font-bold shadow-sm transition-all active:scale-95">
                <span className="hidden sm:inline">Subscribe</span>
                <Send className="w-4 h-4 sm:ml-2" strokeWidth={2} />
              </Button>
            </div>

            {/* Decorative Squiggle */}
            <svg
              className="w-48 h-4 mt-8 opacity-60 text-emerald-500"
              viewBox="0 0 150 10"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q37 0 75 5 T150 5"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Image Side */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="relative w-full lg:w-[35vw] h-[300px] lg:h-[44vh] rounded-[24px] overflow-hidden shadow-[0_22px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_22px_60px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/10 transition-all hover:scale-[1.02] duration-700">
              <img
                src="/images/community-group.jpg"
                alt="Learning community"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 to-transparent mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[100%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
    </section>
  );
};

export default Community;
