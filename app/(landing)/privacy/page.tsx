import { Shield, Lock, Eye, FileText, Clock } from "lucide-react";

export default function PrivacyPage() {
  const lastUpdated = "May 5, 2026";

  const sections = [
    {
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, update your profile, book a session, or communicate with us. This may include your name, email address, payment information, and any other information you choose to provide.",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "How We Use Information",
      content: "We use the information we collect to provide, maintain, and improve our services, to process your transactions, to send you technical notices and support messages, and to communicate with you about products, services, and events offered by Apex Learning.",
      icon: <Eye className="w-6 h-6" />
    },
    {
      title: "Security of Information",
      content: "Apex Learning takes reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. We use industry-standard encryption and security protocols to safeguard your data.",
      icon: <Lock className="w-6 h-6" />
    }
  ];

  return (
    <main className="min-h-screen pt-20 lg:pt-28 font-sans bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01]">
        <div className="wrapper max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-widest">
            <Shield className="w-4 h-4" />
            Legal Center
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
            Privacy <span className="text-emerald-600">Policy</span>
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
              Your privacy is important to us. This Privacy Policy explains how Apex Learning collects, 
              uses, and protects your personal information when you use our tutoring platform.
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
            <h3 className="text-2xl font-black tracking-tight">Questions about Privacy?</h3>
            <p className="text-emerald-100/70 text-lg font-medium">
              If you have any questions or concerns about our Privacy Policy or data practices, 
              please contact our Data Protection Officer at:
            </p>
            <p className="text-xl font-black text-emerald-400">privacy@apexlearning.com</p>
          </div>
        </div>
      </section>
    </main>
  );
}
