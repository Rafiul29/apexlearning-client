import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="py-20 bg-white dark:bg-[#0a0a0a] font-sans">
      <div className="wrapper">
        <div className="relative rounded-[24px] bg-emerald-800 overflow-hidden p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-950/40 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
                Get the latest learning updates in your inbox
              </h2>
              <p className="text-emerald-100/90 text-lg font-medium leading-[1.6]">
                Join our community of 50,000+ learners and receive weekly tips, news, and exclusive offers.
              </p>
            </div>

            <div className="w-full max-w-md">
              {/* relative এবং overflow-hidden অ্যাড করা হয়েছে যাতে বর্ডার পারফেক্ট থাকে */}
              <form className="relative flex items-center w-full p-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-md">

                <Input
                  type="email"
                  placeholder="Email address"
                  /* ইনপুটের বর্ডার তুলে দেওয়া হয়েছে কারণ ফর্মের মেইন বর্ডারই এখন ইনপুট হিসেবে কাজ করবে */
                  className="h-14 w-full pl-6 pr-36 rounded-full border-none bg-transparent text-[#111827] dark:text-white focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px]"
                />

                <Button
                  className="absolute right-1.5 h-11 bg-emerald-800 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-full px-6 font-semibold shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <span className="hidden sm:inline">Subscribe</span>
                  <Send className="w-4 h-4" strokeWidth={2.5} />
                </Button>

              </form>

              <p className="text-emerald-800/60 dark:text-emerald-200/60 text-[11px] mt-3 text-center lg:text-left font-medium">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
