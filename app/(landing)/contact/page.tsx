import ContactSection from "@/components/modules/homepage/ContactSection";
import FAQ from "@/components/modules/homepage/FAQ";

export default function ContactPage() {
  return (
    <main className="pt-20 font-sans">
      <section className="py-20 bg-emerald-800 text-white dark:bg-emerald-950">
        <div className="wrapper text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">Get In Touch</h1>
          <p className="text-xl text-emerald-100 dark:text-emerald-200/80 leading-[1.6] font-medium">
            Have questions about our platform or need help finding the right tutor? We're here for you 24/7.
          </p>
        </div>
      </section>

      <ContactSection />
      
      <section className="py-20 bg-[#f9fafb] dark:bg-[#050505]">
         <div className="wrapper">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-8 bg-white dark:bg-white/5 backdrop-blur-md rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 dark:border-white/10 text-center hover:-translate-y-1 transition-transform">
                  <h3 className="text-xl font-extrabold text-[#111827] dark:text-white mb-4">Support</h3>
                  <p className="text-[#4B5563] dark:text-slate-400 font-medium mb-6 leading-[1.6]">Need help with your account or a session?</p>
                  <p className="text-emerald-700 dark:text-emerald-400 font-extrabold">support@apexlearning.com</p>
               </div>
               <div className="p-8 bg-white dark:bg-white/5 backdrop-blur-md rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 dark:border-white/10 text-center hover:-translate-y-1 transition-transform">
                  <h3 className="text-xl font-extrabold text-[#111827] dark:text-white mb-4">Sales</h3>
                  <p className="text-[#4B5563] dark:text-slate-400 font-medium mb-6 leading-[1.6]">Interested in enterprise or group learning?</p>
                  <p className="text-emerald-700 dark:text-emerald-400 font-extrabold">sales@apexlearning.com</p>
               </div>
               <div className="p-8 bg-white dark:bg-white/5 backdrop-blur-md rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 dark:border-white/10 text-center hover:-translate-y-1 transition-transform">
                  <h3 className="text-xl font-extrabold text-[#111827] dark:text-white mb-4">Careers</h3>
                  <p className="text-[#4B5563] dark:text-slate-400 font-medium mb-6 leading-[1.6]">Want to join our global team of experts?</p>
                  <p className="text-emerald-700 dark:text-emerald-400 font-extrabold">careers@apexlearning.com</p>
               </div>
            </div>
         </div>
      </section>

      <FAQ />
    </main>
  );
}
