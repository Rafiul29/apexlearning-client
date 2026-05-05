import FAQ from "@/components/modules/homepage/FAQ";
import { HelpCircle, Search, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FAQsPage() {
  return (
    <main className="min-h-screen pt-20 lg:pt-28 font-sans bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="wrapper text-center relative z-10 space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            Support Center
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
            Common <span className="text-emerald-600">Questions</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-[1.6]">
            Everything you need to know about Apex Learning. Can't find what you're looking for? 
            Reach out to our support team.
          </p>
          
          <div className="max-w-xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <Input 
              placeholder="Search for answers..." 
              className="h-16 pl-14 pr-6 rounded-full border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl shadow-slate-200/20 dark:shadow-none focus:ring-emerald-500/20 focus:border-emerald-500 text-lg font-medium"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-32">
        <FAQ />
      </section>

      {/* Support CTA */}
      <section className="pb-32">
        <div className="wrapper">
          <div className="bg-emerald-900 dark:bg-emerald-950 rounded-[48px] p-12 lg:p-20 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-10 space-y-8">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/10">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Still have questions?</h2>
              <p className="text-xl text-emerald-100/70 font-medium max-w-xl mx-auto">
                If you cannot find answer to your question in our FAQ, you can always contact us. We will answer to you shortly!
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button size="lg" className="h-14 px-10 rounded-full bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-lg shadow-xl shadow-emerald-950/20">
                  Contact Support
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 rounded-full border-white/20 text-white hover:bg-white/10 font-bold text-lg">
                  Visit Help Center
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
