import { ChevronRight, Play, Sparkles, TrendingUp, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {


  return (


    <section className="relative w-full overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-500 md:py-5">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] -z-10" />

      <div className="wrapper relative z-10 h-full flex flex-col justify-center">
        {/* Bento Box Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mx-auto w-full">

          {/* Main Hero Card (Spans 8 columns) */}
          <div className="lg:col-span-8 p-4 lg:p-16 rounded-[32px] bg-white dark:bg-white/[0.03] dark:backdrop-blur-2xl flex flex-col justify-center relative overflow-hidden group transition-all duration-500">
            {/* Subtle inner glow for dark mode */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 dark:opacity-100 pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-bold w-fit mb-8 border border-emerald-200/50 dark:border-emerald-500/20">
                <Sparkles className="w-4 h-4" strokeWidth={1.5} />
                <span>Empowering 50,000+ Students</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1] font-sans">
                Master Your <span className="text-emerald-800 dark:text-emerald-400">Future</span><br />
                With Expert Tutors
              </h1>

              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl leading-relaxed font-sans">
                Experience personalized 1-on-1 learning that adapts to your pace. From complex mathematics to creative coding, our world-class tutors are here to guide you.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 md:px-8 h-14 text-base group relative overflow-hidden transition-all shadow-[0_10px_30px_-10px_rgba(6,78,59,0.5)] dark:shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)] border border-transparent dark:border-emerald-400/20"
                >
                  <Link href="/tutors" className="flex items-center gap-2">
                    <span className="relative z-10 flex items-center gap-2">
                      Start for Free <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                    </span>
                  </Link>
                </Button>

                <Button

                  size="lg"
                  variant="outline"
                  className="rounded-2xl border border-slate-300 dark:border-white/10 bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-white px-4 md:px-8 h-14 text-base group transition-all"
                >
                  <Play className="w-5 h-5 mr-2 text-slate-500 dark:text-slate-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors" strokeWidth={1.5} />
                  Browse Tutors
                </Button>
              </div>
            </div>
          </div>

          {/* Side Content Container (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-8 lg:gap-10">

            {/* Image/Featured Card */}
            <div className="flex-[3] rounded-[32px] bg-white dark:bg-white/[0.03] dark:backdrop-blur-2xl border border-slate-200/60 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group transition-all duration-500 min-h-[300px]">
              <Image
                src="/images/hero-image.png"
                alt="Featured Tutor Session"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent dark:from-black/90 dark:via-black/40" />

              <div className="absolute top-6 right-6 bg-emerald-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Live Session
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-emerald-500/20 text-emerald-300 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                      Featured
                    </div>
                  </div>
                  <p className="text-white font-bold text-lg leading-tight">Advanced Calculus</p>
                  <p className="text-white/70 text-sm mt-1">with Sarah Jenkins</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold px-3 py-2 rounded-2xl flex items-center gap-1.5">
                  <span className="text-amber-400">★</span> 4.9
                </div>
              </div>
            </div>

            {/* Small Metrics Card */}
            <div className="flex-[2] rounded-[32px] p-8 bg-white dark:bg-white/[0.03] dark:backdrop-blur-2xl border border-slate-200/60 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_40px_rgba(0,0,0,0.2)] flex flex-col justify-center relative overflow-hidden group transition-all duration-500 min-h-[180px]">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl -z-10 group-hover:bg-emerald-500/10 dark:group-hover:bg-emerald-500/20 transition-colors duration-700" />

              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20">
                  <Users className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-500/20">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Approved
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">1.2k+</h3>
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Verified Tutors Online Now</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
