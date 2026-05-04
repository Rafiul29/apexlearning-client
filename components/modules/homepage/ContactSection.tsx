import { Mail, Phone, MapPin, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function ContactSection() {
  return (
    <section className="py-20 bg-white dark:bg-[#0a0a0a] font-sans transition-colors duration-500">
      <div className="wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          {/* Left Column: Info */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest mb-6 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Contact Us
            </div>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.1]">
              Let&apos;s talk about your <span className="text-emerald-600 dark:text-emerald-500">learning journey</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-12 leading-relaxed font-medium max-w-xl">
              Have a question about our platform or want to become a tutor? Our team is here to help you every step of the way.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {[
                { icon: Mail, title: "Email", info: "hello@apexlearning.com", desc: "Our friendly team is here to help." },
                { icon: MessageSquare, title: "Live Chat", info: "Start a conversation", desc: "Speak to us via our integrated chat." },
                { icon: MapPin, title: "Office", info: "123 Education Plaza", desc: "New York, NY 10001, USA" },
                { icon: Phone, title: "Phone", info: "+1 (555) 000-0000", desc: "Mon-Fri from 8am to 5pm." },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-4 group">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 shadow-sm text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110">
                    <item.icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-base mb-1 tracking-tight">{item.title}</h4>
                    <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-1">{item.info}</p>
                    <p className="text-[13px] font-medium text-slate-400 dark:text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white dark:bg-white/[0.03] backdrop-blur-2xl p-8 md:p-10 rounded-[32px] shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200/60 dark:border-white/10 transition-all">
            <form className="space-y-6" >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-4">First Name</label>
                  <Input
                    placeholder="John"
                    className="h-14 rounded-full bg-slate-50/50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 focus-visible:ring-emerald-500/20 px-6 text-[15px] font-medium transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-4">Last Name</label>
                  <Input
                    placeholder="Doe"
                    className="h-14 rounded-full bg-slate-50/50   dark:bg-white/[0.02] border-slate-200 dark:border-white/10 focus-visible:ring-emerald-500/20 px-6 text-[15px] font-medium transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-4">Email Address</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="h-14 rounded-full bg-slate-50/50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 focus-visible:ring-emerald-500/20 px-6 text-[15px] font-medium transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-4">Message</label>
                <Textarea
                  placeholder="How can we help you?"
                  className="min-h-[160px] rounded-[24px] bg-slate-50/50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 focus-visible:ring-emerald-500/20 p-6 resize-none text-[15px] font-medium transition-all"
                />
              </div>
              <Button className="w-full h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-black shadow-lg shadow-emerald-500/20 transition-all text-base mt-4 group">
                Send Message
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
