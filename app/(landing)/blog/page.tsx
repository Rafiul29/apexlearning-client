import BlogSection from "@/components/modules/homepage/BlogSection";
import Newsletter from "@/components/modules/homepage/Newsletter";
import { Search, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function BlogPage() {
  return (
    <main className="pt-20 font-sans">
      <section className="py-20 bg-[#fafafa] dark:bg-[#050505]">
        <div className="wrapper">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#111827] dark:text-white mb-8 tracking-tight">Apex <span className="text-emerald-700 dark:text-emerald-400 italic">Insights</span></h1>
            <p className="text-xl text-[#4B5563] dark:text-slate-400 mb-12 leading-[1.6] font-medium">
              Deep dives into educational technology, learning science, and career growth.
            </p>
            
            <div className="relative max-w-2xl mx-auto group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#4B5563] dark:text-slate-400 w-5 h-5 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors" strokeWidth={1.5} />
               <Input 
                placeholder="Search articles, topics, or authors..." 
                className="h-16 pl-14 pr-8 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] focus-visible:ring-emerald-700/20 text-lg text-[#111827] dark:text-white transition-shadow"
               />
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-10">
               {["Learning Tips", "Career", "Productivity", "Technology", "Interviews"].map((tag) => (
                 <button key={tag} className="px-6 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm text-sm font-semibold text-[#4B5563] dark:text-slate-300 hover:bg-emerald-800 hover:border-emerald-800 hover:text-white dark:hover:bg-emerald-600 dark:hover:border-emerald-600 dark:hover:text-white transition-all">
                    {tag}
                 </button>
               ))}
            </div>
          </div>
        </div>
      </section>

      <BlogSection />

      <section className="py-20 bg-white dark:bg-[#0a0a0a]">
         <div className="wrapper">
            <div className="flex items-center gap-4 mb-12">
               <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20">
                 <Tag className="text-emerald-700 dark:text-emerald-400 w-6 h-6" strokeWidth={1.5} />
               </div>
               <h2 className="text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight">Featured Topics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { title: "Academic Success", count: 42 },
                 { title: "Creative Skills", count: 28 },
                 { title: "STEM Education", count: 35 },
                 { title: "Language Learning", count: 19 },
               ].map((topic, i) => (
                 <div key={i} className="p-8 bg-white dark:bg-white/5 backdrop-blur-md rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 dark:border-white/10 group hover:-translate-y-1 transition-transform cursor-pointer">
                    <h4 className="text-xl font-extrabold text-[#111827] dark:text-white mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{topic.title}</h4>
                    <p className="text-[15px] text-[#4B5563] dark:text-slate-400 font-semibold">{topic.count} Articles</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <Newsletter />
    </main>
  );
}
