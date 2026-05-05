import { Gavel, CheckCircle2, AlertCircle, FileCheck, Clock } from "lucide-react";

export default function TermsPage() {
  const lastUpdated = "May 5, 2026";

  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing or using the Apex Learning platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
      icon: <FileCheck className="w-6 h-6" />
    },
    {
      title: "User Conduct",
      content: "All users are expected to behave professionally and respectfully. Students and tutors must not engage in harassment, share inappropriate content, or use the platform for any illegal activities. Apex Learning reserves the right to terminate accounts that violate our conduct policies.",
      icon: <CheckCircle2 className="w-6 h-6" />
    },
    {
      title: "Payments and Refunds",
      content: "Apex Learning provides a secure payment gateway for all bookings. Tutors set their own rates, and platform fees are applied to ensure a safe learning environment. Refund requests are handled on a case-by-case basis according to our refund policy.",
      icon: <AlertCircle className="w-6 h-6" />
    }
  ];

  return (
    <main className="min-h-screen pt-20 lg:pt-28 font-sans bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01]">
        <div className="wrapper max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-widest">
            <Gavel className="w-4 h-4" />
            Legal Center
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
            Terms of <span className="text-emerald-600">Service</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
            <Clock className="w-4 h-4" />
            Last Updated: {lastUpdated}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-32">
        <div className="wrapper max-w-3xl mx-auto space-y-20">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Please read these Terms of Service carefully before using Apex Learning. 
              These terms govern your use of our platform and services.
            </p>
          </div>

          <div className="space-y-12">
            {sections.map((section, idx) => (
              <div key={idx} className="group relative p-8 lg:p-12 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[32px] shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 transition-transform group-hover:scale-110">
                    {section.icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {section.title}
                    </h3>
                    <p className="text-[#4B5563] dark:text-slate-400 text-lg leading-relaxed font-medium">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 lg:p-12 bg-emerald-900 dark:bg-emerald-950 rounded-[40px] text-white space-y-6">
            <h3 className="text-2xl font-black tracking-tight">Need Legal Clarification?</h3>
            <p className="text-emerald-100/70 text-lg font-medium">
              If you have any questions about these Terms, please contact our legal team for more information.
            </p>
            <p className="text-xl font-black text-emerald-400">legal@apexlearning.com</p>
          </div>
        </div>
      </section>
    </main>
  );
}
