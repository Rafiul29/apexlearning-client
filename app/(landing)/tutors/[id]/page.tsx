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
import { cn } from "@/lib/utils";
import { DAYS } from "@/constrains/weekdays";


export default async function TutorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: tutor, error } = await TutorService.getTutorById(id);

  const availableSlots = tutor?.availability?.map((aviabile: any) => ({
    id: aviabile.id,
    tutorProfileId: aviabile?.tutorProfileId,
    categoryId: aviabile.categoryId,
    category: { name: aviabile.category.name },
    dayOfWeek: aviabile.dayOfWeek,
    startTime: aviabile.startTime,
    endTime: aviabile.endTime,
    isBooked: aviabile.isBooked,
  }));

  if (error || !tutor) return

  return (
    <main className="min-h-screen pt-20 lg:pt-28 bg-white dark:bg-[#0a0a0a] font-sans transition-colors duration-500">
      <section className="relative w-full bg-slate-50/50 dark:bg-[#050505] py-12 md:py-20 transition-colors duration-500">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* --- LEFT SIDEBAR --- */}
            <aside className="w-full lg:w-[400px] space-y-6 lg:sticky lg:top-32">
              <div className="bg-white dark:bg-white/[0.03] backdrop-blur-2xl rounded-[24px] shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 sm:p-8 border border-slate-200/60 dark:border-white/10 transition-all">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Image
                      src={tutor.user?.image || "/images/default-avatar.jpg"}
                      alt={tutor.user?.name || "Tutor"}
                      width={128}
                      height={128}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl"
                    />
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-lg">
                      <BadgeCheck className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h1 className="text-2xl font-black mb-2 text-slate-900 dark:text-white tracking-tight">
                    {tutor?.user?.name}
                  </h1>
                  <div className="flex flex-wrap justify-center gap-2">
                    {tutor.categories.map((cat: Category) => (
                      <Badge
                        key={cat.id}
                        className="bg-emerald-600 dark:bg-emerald-500/20 text-white dark:text-emerald-400 border-none rounded-full px-4 py-1 font-semibold shadow-sm"
                      >
                        {cat?.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact Section */}
                <div className="space-y-3 mb-6 border-t border-slate-100 dark:border-white/5 pt-6">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium truncate">
                      {tutor.user?.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">
                      {tutor.user?.phone || "+1 (555) 000-0000"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-around mb-8 py-5 border-y border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] rounded-2xl">
                  <div className="text-center">
                    <div className="flex items-center gap-1 font-black text-slate-900 dark:text-white">
                      <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                      {tutor.averageRating}
                    </div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
                      Rating
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="font-black text-slate-900 dark:text-white flex items-center gap-1">
                      <Users className="w-4 h-4 text-slate-400" />
                      {tutor?.totalStudents}+
                    </div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
                      Students
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="font-black text-slate-900 dark:text-white">${tutor.pricePerHour}</div>
                    <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
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
                availableSlots={availableSlots || []}
                tutor={tutor}
                DAYS={DAYS}
              />

              <div className="bg-white dark:bg-white/[0.03] backdrop-blur-2xl p-6 sm:p-8 rounded-[24px] shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200/60 dark:border-white/10 transition-all">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-slate-900 dark:text-white tracking-tight">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                    <Quote className="w-6 h-6 text-emerald-500" strokeWidth={1.5} />
                  </div>
                  About Me
                </h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base italic font-medium">
                  &ldquo;{tutor.bio}&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 sm:p-8 bg-white dark:bg-white/[0.03] backdrop-blur-2xl rounded-[24px] shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200/60 dark:border-white/10 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mb-6">
                    <Briefcase className="w-6 h-6 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-white mb-3 text-lg tracking-tight">Experience</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                    {tutor?.experience}
                  </p>
                </div>
                <div className="p-6 sm:p-8 bg-white dark:bg-white/[0.03] backdrop-blur-2xl rounded-[24px] shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200/60 dark:border-white/10 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mb-6">
                    <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-white mb-3 text-lg tracking-tight">Education</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                    {tutor?.education}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 bg-white dark:bg-white/[0.03] backdrop-blur-2xl rounded-[24px] shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200/60 dark:border-white/10 transition-all">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tight">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
                    </div>
                    Student Reviews ({tutor?._count?.reviews})
                  </h3>
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 shadow-sm">
                    <Star className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                    <span className="font-black text-lg text-slate-900 dark:text-white">
                      {tutor.averageRating}
                    </span>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {tutor?.reviews?.length > 0 ? (
                    tutor.reviews.map((review: any) => (
                      <div
                        key={review.id}
                        className="p-6 bg-slate-50 dark:bg-white/[0.02] rounded-[24px] transition-all hover:shadow-md border border-transparent hover:border-emerald-500/20"
                      >
                        {/* Individual Star Rating */}
                        <div className="flex gap-0.5 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={cn(
                                i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-700"
                              )}
                            />
                          ))}
                        </div>

                        <p className="italic text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-sm font-medium">
                          "{review.content}"
                        </p>

                        <div className="flex items-center justify-between border-t border-slate-200/50 dark:border-white/5 pt-4">
                          <div className="flex items-center gap-3">
                            {/* User Avatar / Initials */}
                            {review.student.image ? (
                              <img
                                src={review.student.image}
                                alt={review.student.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center font-black text-emerald-600 dark:text-emerald-400 text-xs uppercase">
                                {review.student.name.substring(0, 2)}
                              </div>
                            )}

                            <div>
                              <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                                {review.student.name}
                              </p>
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                Verified Student • {new Date(review.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          {/* Optional Badge for 5-star reviews */}
                          {review.rating === 5 && (
                            <Badge variant="outline" className="text-[9px] border-emerald-200/50 text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 hidden sm:flex font-bold rounded-full">
                              Top Rated
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 bg-slate-50/50 dark:bg-white/[0.02] rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
                      <p className="text-slate-400 italic font-medium">No reviews yet for this tutor.</p>
                    </div>
                  )}
                </div>

                {/* View More Logic */}
                {tutor?._count?.reviews > 5 && (
                  <Button
                    variant="link"
                    className="w-full mt-8 text-emerald-600 dark:text-emerald-400 font-black hover:no-underline hover:opacity-80 transition-opacity"
                  >
                    View All {tutor?._count?.reviews} Reviews
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
