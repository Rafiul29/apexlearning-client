import { RegisterForm } from "@/components/modules/authentication/register-form";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center p-6 md:p-10 bg-slate-50/50 dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-500">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-5%] w-[70%] md:w-[50%] h-[50%] bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[60%] md:w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="flex w-full max-w-md flex-col gap-6 relative z-10">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-bold text-lg text-slate-900 dark:text-white hover:opacity-80 transition-opacity"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-white/5 border border-emerald-100 dark:border-white/10 shadow-sm overflow-hidden p-1">
            <Image src={"/logo.png"} height={32} width={32} alt="Apex Learning" className="object-cover w-full h-full" />
          </div>
          Apex Learning
        </Link>
        <RegisterForm />
      </div>
    </div>
  );
}
