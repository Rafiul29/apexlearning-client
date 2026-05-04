import AboutSection from "@/components/modules/homepage/AboutSection";
import Statistics from "@/components/modules/homepage/Statistics";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="pt-20 font-sans">
      <section className="py-20 bg-[#fafafa] dark:bg-[#050505] overflow-hidden">
        <div className="wrapper">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
              <h1 className="text-5xl md:text-7xl font-extrabold text-[#111827] dark:text-white tracking-tight mb-8">
                Empowering Minds, <span className="text-emerald-700 dark:text-emerald-400 italic">Everywhere.</span>
              </h1>
              <p className="text-xl text-[#4B5563] dark:text-slate-400 leading-[1.6] mb-8 font-medium">
                Apex Learning was founded on a simple yet powerful idea: that everyone, regardless of location or background, should have access to world-class personalized education.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-500/20">
                    <span className="font-extrabold">01</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#111827] dark:text-white mb-2">Our Mission</h3>
                    <p className="text-[#4B5563] dark:text-slate-400 font-medium">To bridge the gap between curiosity and expertise through seamless digital connection.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-500/20">
                    <span className="font-extrabold">02</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#111827] dark:text-white mb-2">Our Vision</h3>
                    <p className="text-[#4B5563] dark:text-slate-400 font-medium">To become the world's most trusted ecosystem for 1-on-1 expert-led learning.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
               <div className="relative z-10 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 dark:border-white/10">
                  <Image 
                    src="/images/about-image.png" 
                    alt="Our Team" 
                    width={800} 
                    height={600} 
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  />
               </div>
               <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
      <Statistics />

      <section className="py-20 bg-white dark:bg-[#0a0a0a]">
        <div className="wrapper text-center max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold text-[#111827] dark:text-white mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Student First", desc: "Every decision we make starts with the student's learning experience." },
              { title: "Expertise", desc: "We only partner with verified experts who are passionate about teaching." },
              { title: "Innovation", desc: "We use state-of-the-art tools to make online learning feel local." },
            ].map((value, i) => (
              <div key={i} className="p-8 bg-white dark:bg-white/5 backdrop-blur-md rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 dark:border-white/10 group hover:-translate-y-1 transition-transform">
                <h4 className="text-xl font-extrabold mb-4 text-emerald-800 dark:text-emerald-400 group-hover:text-emerald-600 transition-colors">{value.title}</h4>
                <p className="text-[#4B5563] dark:text-slate-400 text-sm leading-[1.6] font-medium">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
