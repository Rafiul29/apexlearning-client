import { LoginForm } from "@/components/modules/authentication/login-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-slate-50/50 dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-500">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-5%] w-[70%] md:w-[50%] h-[50%] bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[60%] md:w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <Suspense fallback={
          <div className="flex items-center justify-center p-8 bg-white dark:bg-white/[0.03] backdrop-blur-2xl rounded-[24px] border border-slate-200/50 dark:border-white/5 shadow-sm">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">Loading Login Form...</p>
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
