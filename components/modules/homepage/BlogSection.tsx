import { Calendar, User, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    title: "How to Choose the Right Tutor for Your Needs",
    excerpt: "Finding the perfect match can be challenging. Here are 5 tips to help you decide.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    author: "Sarah Johnson",
    date: "May 12, 2024",
    category: "Learning Tips",
  },
  {
    title: "Top 10 Most In-Demand Skills in 2024",
    excerpt: "Stay ahead of the curve by mastering these essential skills this year.",
    image: "https://images.unsplash.com/photo-1513258496099-48168024adb0?q=80&w=800&auto=format&fit=crop",
    author: "Michael Chen",
    date: "May 10, 2024",
    category: "Career Growth",
  },
  {
    title: "Effective Study Habits for Busy Professionals",
    excerpt: "Learn how to balance your full-time job with continuous education.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop",
    author: "Emma Williams",
    date: "May 08, 2024",
    category: "Productivity",
  },
];

export default function BlogSection() {
  return (
    <section className="py-20 bg-white dark:bg-[#0a0a0a] font-sans">
      <div className="wrapper">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-xs font-semibold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-md inline-block mb-6">
              Our Blog
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-[#111827] dark:text-white tracking-tight leading-[1.1]">
              Insights and stories from the world of learning
            </h3>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-extrabold hover:gap-3 transition-all text-[15px]"
          >
            View All Articles <ArrowRight className="w-5 h-5" strokeWidth={2} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article
              key={index}
              className="group flex flex-col h-full bg-white dark:bg-white/5 backdrop-blur-md rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 dark:border-white/10 overflow-hidden hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-[24px]">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-white/90 dark:bg-black/50 backdrop-blur-md rounded-full text-xs font-extrabold uppercase tracking-widest text-[#111827] dark:text-white shadow-sm border border-gray-200/50 dark:border-white/10">
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4 text-[13px] text-[#4B5563] dark:text-slate-400 font-semibold tracking-wide">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-emerald-700 dark:text-emerald-400" strokeWidth={1.5} /> {blog.author}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-700 dark:text-emerald-400" strokeWidth={1.5} /> {blog.date}
                  </div>
                </div>
                <h4 className="text-xl font-extrabold mb-4 leading-[1.4] text-[#111827] dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {blog.title}
                </h4>
                <p className="text-[#4B5563] dark:text-slate-400 leading-[1.6] text-[15px] font-medium mb-6 line-clamp-2">
                  {blog.excerpt}
                </p>
                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/10">
                  <Link
                    href={`/blog/${index}`}
                    className="inline-flex items-center gap-2 text-[15px] font-extrabold text-[#111827] dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 group-hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
