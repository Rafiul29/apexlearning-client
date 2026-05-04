import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "How do I find the right tutor for me?",
    answer: "You can browse through our list of expert tutors, filter by subject, rating, and price. We also provide detailed profiles and reviews from other students to help you make an informed decision.",
  },
  {
    question: "Is the first session free?",
    answer: "Many of our tutors offer a free 15-minute consultation to discuss your goals and see if you're a good match. Look for the 'Free Consultation' badge on their profiles.",
  },
  {
    question: "How do online sessions work?",
    answer: "Our platform features an integrated virtual classroom with video chat, a shared whiteboard, and screen-sharing tools. Once you book a session, you'll receive a link to join the classroom at the scheduled time.",
  },
  {
    question: "What if I need to cancel or reschedule?",
    answer: "You can easily reschedule or cancel a session through your dashboard. We have a 24-hour cancellation policy to ensure tutors are compensated for their time while providing flexibility for students.",
  },
  {
    question: "How are the tutors vetted?",
    answer: "Every tutor on our platform undergoes a rigorous vetting process, including identity verification, background checks, and an assessment of their teaching experience and subject matter expertise.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20 bg-[#fafafa] dark:bg-[#050505] font-sans">
      <div className="wrapper">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-xs font-semibold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-md inline-block mb-6">
              Common Questions
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-[#111827] dark:text-white tracking-tight mb-6 leading-[1.1]">
              Frequently Asked Questions
            </h3>
            <p className="text-[#4B5563] dark:text-slate-400 text-lg leading-[1.6] font-medium">
              Have more questions? Feel free to reach out to our support team anytime. We're here to help you succeed.
            </p>
            <div className="mt-8 p-8 bg-white dark:bg-white/5 backdrop-blur-md rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 dark:border-white/10 text-center lg:text-left">
              <p className="font-extrabold text-[#111827] dark:text-white mb-2 text-xl">Still have questions?</p>
              <p className="text-[15px] text-[#4B5563] dark:text-slate-400 mb-8 font-medium">Can't find the answer you're looking for? Please chat to our friendly team.</p>
              <Button asChild className="w-full h-14 rounded-full bg-emerald-800 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-base shadow-sm">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>

          <div className="lg:w-2/3">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 px-8 py-2 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all data-[state=open]:border-emerald-200 dark:data-[state=open]:border-emerald-500/30 data-[state=open]:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                >
                  <AccordionTrigger className="text-[17px] font-extrabold text-[#111827] dark:text-white hover:no-underline py-5 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#4B5563] dark:text-slate-400 text-[15px] leading-[1.7] pb-6 font-medium">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
