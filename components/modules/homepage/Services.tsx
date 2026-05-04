import { Monitor, Users, Zap, Clock, ShieldCheck, Globe } from "lucide-react";

const services = [
  {
    title: "1-on-1 Personalized Learning",
    description: "Tailored lessons designed specifically for your goals and learning style.",
    icon: Users,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20",
  },
  {
    title: "On-Demand Tutoring",
    description: "Get help instantly whenever you're stuck on a problem or project.",
    icon: Zap,
    color: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20",
  },
  {
    title: "Interactive Virtual Classrooms",
    description: "State-of-the-art tools for seamless online collaboration.",
    icon: Monitor,
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20",
  },
  {
    title: "Flexible Scheduling",
    description: "Book sessions that fit perfectly into your busy lifestyle.",
    icon: Clock,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400 border border-purple-100 dark:border-purple-500/20",
  },
  {
    title: "Verified Experts",
    description: "Learn from top-tier professionals and academic leaders.",
    icon: ShieldCheck,
    color: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-100 dark:border-rose-500/20",
  },
  {
    title: "Global Reach",
    description: "Access world-class education from anywhere in the world.",
    icon: Globe,
    color: "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-500/20",
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-[#fafafa] dark:bg-[#050505] font-sans">
      <div className="wrapper">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-md inline-block mb-6">
            Our Services
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-[#111827] dark:text-white tracking-tight mb-6 leading-[1.1]">
            Comprehensive learning solutions for everyone
          </h3>
          <p className="text-[#4B5563] dark:text-slate-400 text-lg leading-[1.6] font-medium">
            Whether you're a student looking for academic help or an adult learning a new skill, we have the right service for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-white dark:bg-white/5 backdrop-blur-md rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 dark:border-white/10 hover:-translate-y-1 transition-transform cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${service.color}`}>
                <service.icon className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-extrabold text-[#111827] dark:text-white mb-3 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                {service.title}
              </h4>
              <p className="text-[#4B5563] dark:text-slate-400 leading-[1.6] text-[15px] font-medium">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
