import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSection() {
  return (
    <section className="py-20 bg-[#fafafa] dark:bg-[#050505] font-sans">
      <div className="wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-xs font-semibold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-md inline-block mb-6">
              Contact Us
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-[#111827] dark:text-white tracking-tight mb-8 leading-[1.1]">
              Let's talk about your learning journey
            </h3>
            <p className="text-[#4B5563] dark:text-slate-400 text-lg mb-12 leading-[1.6] font-medium">
              Have a question about our platform or want to become a tutor? Our team is here to help you every step of the way.
            </p>

            <div className="space-y-8">
              {[
                { icon: Mail, title: "Email", info: "hello@apexlearning.com", desc: "Our friendly team is here to help." },
                { icon: MessageSquare, title: "Live Chat", info: "Start a conversation", desc: "Speak to us via our integrated chat." },
                { icon: MapPin, title: "Office", info: "123 Education Plaza", desc: "New York, NY 10001, USA" },
                { icon: Phone, title: "Phone", info: "+1 (555) 000-0000", desc: "Mon-Fri from 8am to 5pm." },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 group cursor-default">
                  <div className="w-14 h-14 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm text-emerald-700 dark:text-emerald-400 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                    <item.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#111827] dark:text-white text-lg mb-1">{item.title}</h4>
                    <p className="text-emerald-700 dark:text-emerald-400 font-extrabold text-[15px] mb-1">{item.info}</p>
                    <p className="text-[14px] font-medium text-[#4B5563] dark:text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 dark:border-white/10">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-[#111827] dark:text-white ml-2">First Name</label>
                  <Input placeholder="John" className="h-14 rounded-full bg-[#f9fafb] dark:bg-white/5 border border-gray-200 dark:border-white/10 focus-visible:ring-emerald-700/20 px-6 text-[15px]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-[#111827] dark:text-white ml-2">Last Name</label>
                  <Input placeholder="Doe" className="h-14 rounded-full bg-[#f9fafb] dark:bg-white/5 border border-gray-200 dark:border-white/10 focus-visible:ring-emerald-700/20 px-6 text-[15px]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-extrabold text-[#111827] dark:text-white ml-2">Email</label>
                <Input type="email" placeholder="john@example.com" className="h-14 rounded-full bg-[#f9fafb] dark:bg-white/5 border border-gray-200 dark:border-white/10 focus-visible:ring-emerald-700/20 px-6 text-[15px]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-extrabold text-[#111827] dark:text-white ml-2">Message</label>
                <Textarea placeholder="How can we help you?" className="min-h-[150px] rounded-[24px] bg-[#f9fafb] dark:bg-white/5 border border-gray-200 dark:border-white/10 focus-visible:ring-emerald-700/20 p-6 resize-none text-[15px]" />
              </div>
              <Button className="w-full h-14 rounded-full bg-emerald-800 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold shadow-sm transition-all text-base mt-4">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
