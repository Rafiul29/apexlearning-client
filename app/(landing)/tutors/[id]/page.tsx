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
                      src={tutor.user?.image || "/images/default-avatar.jpg"}
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
                      {tutor?.totalStudents}+
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
                availableSlots={availableSlots || []}
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
                    {tutor?.experience}
                  </p>
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-[28px] border border-slate-100 shadow-sm">
                  <GraduationCap className="w-5 h-5 text-[#FF6B6B] mb-4" />
                  <h3 className="font-bold mb-2">Education</h3>
                  <p className="text-slate-500 text-sm">
                    {tutor?.education}
                  </p>
                </div>
              </div>

              <div className="p-8 bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-2 font-['Poppins']">
                    <MessageSquare className="w-6 h-6 text-[#FF6B6B]" />
                    Student Reviews ({tutor?._count?.reviews})
                  </h3>
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#FF6B6B]/5 rounded-full">
                    <Star className="w-5 h-5 fill-[#FF6B6B] text-[#FF6B6B]" />
                    <span className="font-bold text-lg text-slate-900 dark:text-white">
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
                        className="p-6 bg-[#F6F7F9] dark:bg-slate-800/50 rounded-2xl transition-all hover:shadow-md border border-transparent hover:border-[#FF6B6B]/10"
                      >
                        {/* Individual Star Rating */}
                        <div className="flex gap-0.5 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={cn(
                                i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                              )}
                            />
                          ))}
                        </div>

                        <p className="italic text-slate-600 dark:text-slate-300 mb-4 leading-relaxed line-clamp-3">
                          "{review.content}"
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* User Avatar / Initials */}
                            {review.student.image ? (
                              <img
                                src={review.student.image}
                                alt={review.student.name}
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-[#FF6B6B]/10 rounded-full flex items-center justify-center font-bold text-[#FF6B6B] uppercase">
                                {review.student.name.substring(0, 2)}
                              </div>
                            )}

                            <div>
                              <p className="text-sm font-bold text-slate-900 dark:text-white">
                                {review.student.name}
                              </p>
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                Verified Student • {new Date(review.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          {/* Optional Badge for 5-star reviews */}
                          {review.rating === 5 && (
                            <Badge variant="outline" className="text-[9px] border-emerald-200 text-emerald-600 bg-emerald-50 hidden sm:flex">
                              Top Rated
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-slate-400 italic">No reviews yet for this tutor.</p>
                    </div>
                  )}
                </div>

                {/* View More Logic */}
                {tutor?._count?.reviews > 5 && (
                  <Button
                    variant="link"
                    className="w-full mt-6 text-[#FF6B6B] font-bold hover:no-underline"
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
