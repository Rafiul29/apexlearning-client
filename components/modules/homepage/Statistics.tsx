"use client";

import { Users, BookOpen, Star, Award } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  {
    label: "Active Students",
    value: 15000,
    icon: Users,
    suffix: "+",
  },
  {
    label: "Expert Tutors",
    value: 1200,
    icon: Award,
    suffix: "+",
  },
  {
    label: "Subjects Covered",
    icon: BookOpen,
    value: 300,
    suffix: "+",
  },
  {
    label: "Success Rate",
    icon: Star,
    value: 99,
    suffix: "%",
  },
];

export default function Statistics() {
  return (
    <section className="py-20 bg-white dark:bg-[#0a0a0a] font-sans">
      <div className="wrapper">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-8 flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in duration-700 bg-white dark:bg-white/5 backdrop-blur-md rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 dark:border-white/10 group hover:-translate-y-1 transition-all"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl text-emerald-700 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                <stat.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight">
                  <Counter value={stat.value} />
                  {stat.suffix}
                </h3>
                <p className="text-[#4B5563] dark:text-slate-400 font-semibold mt-2 text-[15px]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}</span>;
}
