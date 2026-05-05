import { cn } from "@/lib/utils";
import { Logo, LogoImage, LogoText } from "@/components/layout/logo";
import Link from "next/link";
import Image from "next/image";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = ({
  logo = {
    src: "/logo.png",
    alt: "Apex Learning Logo",
    title: "",
    url: "/",
  },
  className,
  tagline = "Empowering students through personalized expert tutoring and interactive learning.",
  menuItems = [
    {
      title: "Explore",
      links: [
        { text: "Find Tutors", url: "/tutors" },
        { text: "Categories", url: "/categories" },
        // { text: "How it Works", url: "/how-it-works" },
        // { text: "Help Center", url: "/help" },
      ],
    },
    {
      title: "Account",
      links: [
        { text: "Join for Free", url: "/register" },
        { text: "Login", url: "/login" },
        // { text: "Become a Tutor", url: "/register" },
        // { text: "Tutor Login", url: "/login" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About Us", url: "/about" },
        { text: "Blog", url: "/blog" },
        // { text: "Our Team", url: "/team" },
        // { text: "Careers", url: "/careers" },
      ],
    },
    {
      title: "Support",
      links: [
        { text: "Contact Us", url: "/contact" },
        { text: "FAQs", url: "/faqs" },
        // { text: "Privacy Policy", url: "/privacy" },
        // { text: "Terms of Service", url: "/terms" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} Apex Learning. All rights reserved.`,
  bottomLinks = [
    { text: "Terms of Service", url: "/terms" },
    { text: "Privacy Policy", url: "/privacy" },
    { text: "Cookie Settings", url: "/cookies" },
  ],
}: FooterProps) => {
  return (
    <section className={cn("pt-20 border-t border-gray-200/60 dark:border-white/10 bg-[#f9fafb] dark:bg-[#0a0a0a] font-sans", className)}>
      <div className="wrapper">
        <footer className="container mx-auto">
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-6 pb-5">
            {/* Branding Section */}
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Logo url={logo.url}>
                  <div className="relative h-10 w-auto flex items-center">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={140}
                      height={40}
                      className="object-contain dark:invert h-full w-auto"
                      priority
                    />
                  </div>
                  <LogoText className="text-2xl font-extrabold tracking-tight text-[#111827] dark:text-white">
                    {logo?.title}
                  </LogoText>
                </Logo>
              </div>
              <p className="mt-6 text-[15px] text-[#4B5563] dark:text-slate-400 leading-[1.6] max-w-xs font-medium">
                {tagline}
              </p>
            </div>

            {/* Link Columns */}
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx} className="col-span-1">
                <h3 className="mb-6 text-sm font-extrabold uppercase tracking-wider text-[#111827] dark:text-white">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.url}
                        className="text-[15px] text-[#4B5563] dark:text-slate-400 transition-colors hover:text-emerald-800 dark:hover:text-emerald-400 font-medium"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer Bottom Bar */}
          <div className="py-8 flex flex-col justify-between gap-6 border-t border-gray-200/60 dark:border-white/10 text-sm font-medium text-[#4B5563] dark:text-slate-500 md:flex-row md:items-center">
            <p className="order-2 md:order-1">{copyright}</p>
            <ul className="order-1 flex flex-wrap gap-6 md:order-2">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <Link
                    href={link.url}
                    className="underline-offset-4 hover:underline hover:text-emerald-800 dark:hover:text-emerald-400 transition-all"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };
