import { TutorService } from "@/services/tutor.service";
import {
  BadgeCheck,
  Star,
  Users,
  Clock,
  Briefcase,
  Calendar,
  GraduationCap,
  MessageSquare,
  Quote,
  BookOpen,
  Mail,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Category } from "@/types";
import SlotGrid from "@/components/modules/tutorspage/SlotGrid";
import ContactButton from "@/components/modules/tutorspage/ContactButton";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const availableSlots = [
  {
    id: "slot-001",
    tutorProfileId: "tutor-123",
    categoryId: "cat-math",
    category: { name: "Advanced Mathematics" },
    dayOfWeek: 1,
    startTime: "09:00 AM",
    endTime: "10:30 AM",
    isBooked: false,
  },
  {
    id: "slot-002",
    tutorProfileId: "tutor-123",
    categoryId: "cat-math",
    category: { name: "Advanced Mathematics" },
    dayOfWeek: 1,
    startTime: "02:00 PM",
    endTime: "03:30 PM",
    isBooked: false,
  },
  {
    id: "slot-003",
    tutorProfileId: "tutor-123",
    categoryId: "cat-physics",
    category: { name: "Quantum Physics" },
    dayOfWeek: 2,
    startTime: "11:00 AM",
    endTime: "12:30 PM",
    isBooked: false,
  },
  {
    id: "slot-004",
    tutorProfileId: "tutor-123",
    categoryId: "cat-programming",
    category: { name: "Web Development" },
    dayOfWeek: 3,
    startTime: "04:00 PM",
    endTime: "05:00 PM",
    isBooked: false,
  },
];

export default async function TutorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: tutor, error } = await TutorService.getTutorById(id);

  if (error || !tutor) return notFound();

  return (
    <main className="min-h-screen pt-20 lg:pt-28 bg-white dark:bg-slate-950">
      <section className="relative w-full bg-[#F6F7F9] dark:bg-slate-950/50 py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* --- LEFT SIDEBAR --- */}
            <aside className="w-full lg:w-[400px] space-y-6 lg:sticky lg:top-32">
              <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm p-8 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Image
                      src={tutor.user?.image || "/images/default-avatar.png"}
                      alt={tutor.user?.name || "Tutor"}
                      width={128}
                      height={128}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                    />
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#FF6B6B] rounded-full flex items-center justify-center border-2 border-white">
                      <BadgeCheck className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold mb-2 font-['Poppins']">
                    {tutor?.user?.name}
                  </h1>
                  <div className="flex flex-wrap justify-center gap-2">
                    {tutor.categories.map((cat: Category) => (
                      <Badge
                        key={cat.id}
                        className="bg-[#FF6B6B] text-white border-none rounded-full px-4"
                      >
                        {cat?.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact Section */}
                <div className="space-y-3 mb-6 border-t pt-6">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Mail className="w-4 h-4 text-[#FF6B6B]" />
                    <span className="text-sm truncate">
                      {tutor.user?.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Phone className="w-4 h-4 text-[#FF6B6B]" />
                    <span className="text-sm">
                      {tutor.user?.phone || "+1 (555) 000-0000"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-around mb-8 py-4 border-y border-slate-100 dark:border-slate-800">
                  <div className="text-center">
                    <div className="flex items-center gap-1 font-bold">
                      <Star className="w-4 h-4 fill-[#FF6B6B] text-[#FF6B6B]" />
                      {tutor.averageRating}
                    </div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold">
                      Rating
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="font-bold flex items-center gap-1">
                      <Users className="w-4 h-4 text-slate-400" />
                      140+
                    </div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold">
                      Students
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">${tutor.pricePerHour}</div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold">
                      Hourly
                    </span>
                  </div>
                </div>
                <ContactButton tutorEmail={tutor?.user?.email} />
              </div>
            </aside>

            {/* --- RIGHT CONTENT --- */}
            <div className="flex-1 space-y-8 w-full">
              <SlotGrid
                availableSlots={availableSlots}
                tutor={tutor}
                DAYS={DAYS}
              />

              <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 font-['Poppins']">
                  <Quote className="w-6 h-6 text-[#FF6B6B]" /> About Me
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg italic">
                  &ldquo;{tutor.bio}&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-slate-900 rounded-[28px] border border-slate-100 shadow-sm">
                  <Briefcase className="w-5 h-5 text-[#FF6B6B] mb-4" />
                  <h3 className="font-bold mb-2">Experience</h3>
                  <p className="text-slate-500 text-sm">
                    8+ years of professional teaching.
                  </p>
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-[28px] border border-slate-100 shadow-sm">
                  <GraduationCap className="w-5 h-5 text-[#FF6B6B] mb-4" />
                  <h3 className="font-bold mb-2">Education</h3>
                  <p className="text-slate-500 text-sm">
                    Master of Science in Education.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// import { TutorService } from "@/services/tutor.service";
// import {
//   BadgeCheck,
//   Star,
//   Users,
//   Clock,
//   BookOpen,
//   Briefcase,
//   Calendar,
//   GraduationCap,
//   MessageSquare,
//   Quote,
//   ChevronRight,
//   CheckCircle2,
// } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { notFound } from "next/navigation";
// import { Category } from "@/types";

// const DAYS = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];
// const availableSlots = [
//   {
//     id: "slot-001",
//     tutorProfileId: "tutor-123",
//     categoryId: "cat-math",
//     category: { name: "Advanced Mathematics" },
//     dayOfWeek: 1,
//     startTime: "09:00 AM",
//     endTime: "10:30 AM",
//     isBooked: false,
//   },
//   {
//     id: "slot-002",
//     tutorProfileId: "tutor-123",
//     categoryId: "cat-math",
//     category: { name: "Advanced Mathematics" },
//     dayOfWeek: 1,
//     startTime: "02:00 PM",
//     endTime: "03:30 PM",
//     isBooked: false,
//   },
//   {
//     id: "slot-003",
//     tutorProfileId: "tutor-123",
//     categoryId: "cat-physics",
//     category: { name: "Quantum Physics" },
//     dayOfWeek: 2,
//     startTime: "11:00 AM",
//     endTime: "12:30 PM",
//     isBooked: false,
//   },
//   {
//     id: "slot-004",
//     tutorProfileId: "tutor-123",
//     categoryId: "cat-programming",
//     category: { name: "Web Development" },
//     dayOfWeek: 3,
//     startTime: "04:00 PM",
//     endTime: "05:00 PM",
//     isBooked: false,
//   },
//   {
//     id: "slot-005",
//     tutorProfileId: "tutor-123",
//     categoryId: "cat-programming",
//     category: { name: "Web Development" },
//     dayOfWeek: 4,
//     startTime: "10:00 AM",
//     endTime: "11:30 AM",
//     isBooked: false,
//   },
//   {
//     id: "slot-006",
//     tutorProfileId: "tutor-123",
//     categoryId: "cat-math",
//     category: { name: "Calculus" },
//     dayOfWeek: 5,
//     startTime: "08:30 AM",
//     endTime: "10:00 AM",
//     isBooked: false,
//   },
//   {
//     id: "slot-007",
//     tutorProfileId: "tutor-123",
//     categoryId: "cat-physics",
//     category: { name: "Basic Physics" },
//     dayOfWeek: 6,
//     startTime: "11:00 AM",
//     endTime: "12:00 PM",
//     isBooked: false,
//   },
// ];
// export default async function TutorDetailPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const { data: tutor, error } = await TutorService.getTutorById(id);

//   if (error || !tutor) return notFound();

//   // Filter dynamic availability slots

//   // tutor.availabilities?.filter((slot: any) => !slot.isBooked) || [];

//   return (
//     <main className="min-h-screen pt-20 lg:pt-28 bg-white dark:bg-slate-950">
//       <section className="relative w-full bg-[#F6F7F9] dark:bg-slate-900/50 py-12 lg:py-20">
//         <div className="wrapper container mx-auto px-4 lg:px-8">
//           <div className="flex flex-col lg:flex-row gap-12 items-start">
//             {/* --- LEFT SIDEBAR (Sticky) --- */}
//             <aside className="w-full lg:w-[400px] space-y-6 lg:sticky lg:top-32">
//               <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-[0_22px_60px_rgba(0,0,0,0.05)] p-8 border border-slate-100 dark:border-slate-800">
//                 <div className="flex justify-center mb-6">
//                   <div className="relative">
//                     <Image
//                       src={tutor.user?.image || "/images/default-avatar.png"}
//                       alt={tutor.user?.name || "Tutor"}
//                       width={128}
//                       height={128}
//                       className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
//                     />
//                     <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#FF6B6B] rounded-full flex items-center justify-center border-2 border-white">
//                       <BadgeCheck className="w-5 h-5 text-white" />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="text-center mb-6">
//                   <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-2 font-['Poppins']">
//                     {tutor?.user?.name}
//                   </h1>
//                   <div className="flex flex-col items-center gap-2">
//                     {tutor.categories.map((category: Category) => (
//                       <Badge className="bg-[#FF6B6B] hover:bg-[#ff5252] text-white border-none rounded-full px-4">
//                         {category?.name || "Expert Tutor"}
//                       </Badge>
//                     ))}
//                     <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
//                       <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
//                       Available Now
//                     </span>
//                   </div>
//                 </div>

//                 {/* Dynamic Stats Row */}
//                 <div className="flex justify-around mb-8 py-4 border-y border-slate-100 dark:border-slate-800">
//                   <div className="text-center">
//                     <div className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
//                       <Star className="w-4 h-4 fill-[#FF6B6B] text-[#FF6B6B]" />
//                       {tutor.averageRating}
//                     </div>
//                     <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
//                       Rating
//                     </span>
//                   </div>
//                   <div className="text-center">
//                     <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
//                       <Users className="w-4 h-4 text-slate-400" />
//                       140+
//                     </div>
//                     <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
//                       Students
//                     </span>
//                   </div>
//                   <div className="text-center">
//                     <div className="font-bold text-slate-900 dark:text-white">
//                       ${tutor.pricePerHour}
//                     </div>
//                     <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
//                       Hourly
//                     </span>
//                   </div>
//                 </div>

//                 <Button className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-2xl py-7 text-lg font-semibold shadow-lg shadow-rose-200 dark:shadow-none transition-all active:scale-95">
//                   Book a Session
//                 </Button>
//               </div>
//             </aside>

//             {/* --- RIGHT CONTENT --- */}
//             <div className="flex-1 space-y-8 w-full">
//               {/* 1. Availability Slots Section */}
//               <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800">
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
//                   <div>
//                     <h2 className="text-2xl font-bold flex items-center gap-2 font-['Poppins']">
//                       <Calendar className="w-6 h-6 text-[#FF6B6B]" />
//                       Available Slots
//                     </h2>
//                     <p className="text-sm text-slate-500 mt-1">
//                       Directly book your preferred time
//                     </p>
//                   </div>
//                   <Badge
//                     variant="outline"
//                     className="w-fit py-1.5 px-4 rounded-xl border-slate-200 text-slate-500 gap-2"
//                   >
//                     <Clock className="w-3.5 h-3.5" /> GMT+6 Timezone
//                   </Badge>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//                   {availableSlots.length > 0 ? (
//                     availableSlots.map((slot: any) => (
//                       <div
//                         key={slot.id}
//                         className="group relative p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-[#FF6B6B] hover:shadow-md hover:shadow-rose-500/5 transition-all duration-300 cursor-pointer"
//                       >
//                         <div className="flex justify-between items-start mb-3">
//                           <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B6B] bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded">
//                             {DAYS[slot.dayOfWeek]}
//                           </span>
//                           <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
//                         </div>
//                         <div className="space-y-1">
//                           <div className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#FF6B6B] transition-colors">
//                             {slot.startTime} - {slot.endTime}
//                           </div>
//                           <div className="text-xs text-slate-500 flex items-center gap-1">
//                             <BookOpen className="w-3 h-3" />
//                             {slot.category?.name || "General Session"}
//                           </div>
//                         </div>
//                         <div className="mt-4 flex items-center justify-between">
//                           <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
//                             Open Slot
//                           </span>
//                           <span className="text-xs font-bold text-[#FF6B6B] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all flex items-center gap-1">
//                             Book <ChevronRight className="w-3 h-3" />
//                           </span>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
//                       <Calendar className="w-10 h-10 text-slate-300 mb-3" />
//                       <p className="text-slate-500 font-medium">
//                         No available slots found this week.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* 2. Bio Section */}
//               {tutor.bio && (
//                 <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm">
//                   <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 font-['Poppins']">
//                     <Quote className="w-6 h-6 text-[#FF6B6B]" /> About Me
//                   </h2>
//                   <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg italic">
//                     &ldquo;{tutor.bio}&rdquo;
//                   </p>
//                 </div>
//               )}

//               {/* 3. Static Experience/Education (Placeholder Design) */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="p-6 bg-white dark:bg-slate-900 rounded-[28px] shadow-sm border border-slate-50 dark:border-slate-800">
//                   <div className="flex items-center gap-3 mb-4 text-[#FF6B6B]">
//                     <Briefcase className="w-5 h-5" />
//                     <h3 className="font-bold font-['Poppins']">Experience</h3>
//                   </div>
//                   <p className="text-slate-600 dark:text-slate-400 text-sm">
//                     8+ years of professional teaching in academic and practical
//                     environments.
//                   </p>
//                 </div>
//                 <div className="p-6 bg-white dark:bg-slate-900 rounded-[28px] shadow-sm border border-slate-50 dark:border-slate-800">
//                   <div className="flex items-center gap-3 mb-4 text-[#FF6B6B]">
//                     <GraduationCap className="w-5 h-5" />
//                     <h3 className="font-bold font-['Poppins']">Education</h3>
//                   </div>
//                   <p className="text-slate-600 dark:text-slate-400 text-sm">
//                     Master of Science in Education & Behavioral Psychology.
//                   </p>
//                 </div>
//               </div>

//               {/* 4. Expertise Section */}
//               {tutor.subjects?.length > 0 && (
//                 <div className="p-8 bg-white dark:bg-slate-900 rounded-[32px] shadow-sm">
//                   <div className="flex items-center gap-3 mb-6 text-[#FF6B6B]">
//                     <BookOpen className="w-6 h-6" />
//                     <h3 className="text-xl font-bold font-['Poppins']">
//                       Expertise & Subjects
//                     </h3>
//                   </div>
//                   <div className="flex flex-wrap gap-3">
//                     {tutor.subjects.map((sub: string) => (
//                       <Badge
//                         key={sub}
//                         variant="secondary"
//                         className="rounded-full px-5 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-none"
//                       >
//                         {sub}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* 5. Reviews Section */}
//               <div className="p-8 bg-white dark:bg-slate-900 rounded-[32px] shadow-sm">
//                 <div className="flex items-center justify-between mb-8">
//                   <h3 className="text-xl font-bold flex items-center gap-2 font-['Poppins']">
//                     <MessageSquare className="w-6 h-6 text-[#FF6B6B]" />
//                     Student Reviews ({tutor.reviewCount})
//                   </h3>
//                   <div className="flex items-center gap-1 font-bold">
//                     <Star className="w-5 h-5 fill-[#FF6B6B] text-[#FF6B6B]" />
//                     {tutor.averageRating}
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   <div className="p-6 bg-[#F6F7F9] dark:bg-slate-800/50 rounded-2xl relative">
//                     <p className="italic text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
//                       "An incredible teacher! The explanations were so clear and
//                       the session was very interactive. Highly recommended for
//                       anyone looking to master these subjects quickly."
//                     </p>
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-[#FF6B6B]/10 rounded-full flex items-center justify-center font-bold text-[#FF6B6B]">
//                         JS
//                       </div>
//                       <div>
//                         <p className="text-sm font-bold">John Smith</p>
//                         <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
//                           Verified Student • 2 days ago
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
