import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  "Expert Tutors with Industry Experience",
  "Tailored Curriculum for Every Student",
  "Affordable & Transparent Pricing",
  "User-Friendly Interactive Dashboard",
  "Progress Tracking & Regular Assessments",
  "Lifetime Access to Session Recordings",
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-[#fafafa] dark:bg-[#050505] font-sans">
      <div className="wrapper">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 relative w-full">
            <div className="relative z-10 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 dark:border-white/10">
              <Image
                src="/images/about-image.png"
                alt="About Apex Learning"
                width={600}
                height={700}
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-10 -right-8 p-6 bg-white/90 dark:bg-white/5 backdrop-blur-md rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 dark:border-white/10 hidden md:block z-20 transition-all hover:-translate-y-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20">
                  <CheckCircle2 className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Trust Verified</p>
                  <p className="text-xl font-extrabold text-[#111827] dark:text-white">10k+ <span className="text-sm font-semibold text-[#4B5563] dark:text-slate-400">Students</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-[24px] p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 dark:border-white/10">
            <h2 className="text-xs font-semibold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-md inline-block mb-6">
              Why Choose Us
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-[#111827] dark:text-white tracking-tight mb-6 leading-[1.1]">
              Transforming the way the world learns online
            </h3>
            <p className="text-[#4B5563] dark:text-slate-400 text-lg leading-[1.6] mb-10">
              At Apex Learning, we believe that education should be accessible, engaging, and personalized. Our platform connects students with the best minds in the industry to foster a culture of continuous growth and excellence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
                  </div>
                  <span className="font-semibold text-[15px] text-[#4B5563] dark:text-slate-300 leading-snug">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 pt-6 border-t border-gray-100 dark:border-white/10">
              <Button asChild className="rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold h-12 px-8 group shadow-[0_4px_14px_0_rgb(6,78,59,0.39)] border border-transparent dark:border-emerald-700/50">
                <Link href="/about" className="flex items-center gap-2">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </Link>
              </Button>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-[#0a0a0a] bg-muted overflow-hidden shadow-sm">
                      <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" width={40} height={40} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#4B5563] dark:text-slate-400 font-medium">
                  <strong className="text-[#111827] dark:text-white font-extrabold">500+</strong> joined today
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
