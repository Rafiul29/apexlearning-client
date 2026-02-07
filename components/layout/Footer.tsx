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
        { text: "Home", url: "/" },
        { text: "Find Tutors", url: "/tutors" },
        // { text: "Subject Categories", url: "/categories" },
        { text: "How it Works", url: "/how-it-works" },
      ],
    },
    // {
    //   title: "For Tutors",
    //   links: [
    //     { text: "Become a Tutor", url: "/become-tutor" },
    //     { text: "Tutor Dashboard", url: "/dashboard/tutor" },
    //     { text: "Resources", url: "/tutor-resources" },
    //   ],
    // },
    {
      title: "Company",
      links: [
        { text: "About Us", url: "/about" },
        { text: "Our Team", url: "/team" },
        { text: "Blog", url: "/blog" },
        // { text: "Careers", url: "/careers" },
      ],
    },
    {
      title: "Support",
      links: [
        { text: "Help Center", url: "/help" },
        { text: "Contact Us", url: "/contact" },
        { text: "FAQs", url: "/faqs" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} Apex Learning. All rights reserved.`,
  bottomLinks = [
    { text: "Terms and Conditions", url: "/terms" },
    { text: "Privacy Policy", url: "/privacy" },
    { text: "Cookie Policy", url: "/cookies" },
  ],
}: FooterProps) => {
  return (
    <section className={cn("py-12 border-t bg-background", className)}>
      <div className="wrapper">
        <footer className="container mx-auto">
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-6">
            {/* Branding Section */}
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Logo url={logo.url}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={200}
                    height={120}
                    className="object-contain dark:invert h-12 w-full"
                  />
                  <LogoText className="text-xl font-bold tracking-tight">
                    {logo?.title}
                  </LogoText>
                </Logo>
              </div>
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xs">
                {tagline}
              </p>
            </div>

            {/* Link Columns */}
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx} className="col-span-1">
                <h3 className="mb-6 text-sm font-bold uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.url}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary font-medium"
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
          <div className="mt-20 flex flex-col justify-between gap-6 border-t pt-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center">
            <p className="order-2 md:order-1">{copyright}</p>
            <ul className="order-1 flex flex-wrap gap-6 md:order-2">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <Link
                    href={link.url}
                    className="underline-offset-4 hover:underline hover:text-primary transition-all"
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
