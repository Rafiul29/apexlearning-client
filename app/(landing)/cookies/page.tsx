import { Cookie, Info, ShieldCheck, Clock } from "lucide-react";

export default function CookiesPage() {
  const lastUpdated = "May 5, 2026";

  const sections = [
    {
      title: "What are Cookies?",
      content: "Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.",
      icon: <Info className="w-6 h-6" />
    },
    {
      title: "How We Use Cookies",
      content: "We use cookies for several reasons. Some cookies are required for technical reasons in order for our platform to operate. Other cookies enable us to track and target the interests of our users to enhance the experience on our platform.",
      icon: <Cookie className="w-6 h-6" />
    },
    {
      title: "Controlling Cookies",
      content: "You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.",
      icon: <ShieldCheck className="w-6 h-6" />
    }
  ];

  return (
    <main className="min-h-screen pt-20 lg:pt-28 font-sans bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01]">
        <div className="wrapper max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-widest">
            <Cookie className="w-4 h-4" />
            Legal Center
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
            Cookie <span className="text-emerald-600">Policy</span>
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
              This Cookie Policy explains how Apex Learning uses cookies and similar technologies 
              to recognize you when you visit our platform.
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
            <h3 className="text-2xl font-black tracking-tight">Cookie Preferences?</h3>
            <p className="text-emerald-100/70 text-lg font-medium">
              You can update your cookie preferences at any time through your browser settings or 
              by contacting our technical support team.
            </p>
            <p className="text-xl font-black text-emerald-400">tech@apexlearning.com</p>
          </div>
        </div>
      </section>
    </main>
  );
}
