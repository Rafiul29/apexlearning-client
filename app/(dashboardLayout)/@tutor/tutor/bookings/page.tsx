import { bookingService } from "@/services/booking.service";
import { userService } from "@/services/user.service";
import MyBookingsClient from "../../../../../components/modules/bookingPage/MyBookingsClient";
import { TutorService } from "@/services/tutor.service";
import SetupProfileModal from "../dashboard/_components/setup-profile-modal";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const { data: sessionData, error: sessionError } =
    await userService.getSession();

  if (sessionError || !sessionData) {
    return <div className="p-10 text-rose-500">Error: "Unauthorized"</div>;
  }

  const [tutorRes, bookingRes] = await Promise.all([
    TutorService.getTutorByUserId(sessionData.user.id),
    bookingService.getbookings(),
  ]);

  const bookings = bookingRes?.data;
  const bookingError = bookingRes?.error;

  if (bookingError) {
    return (
      <div className="p-10 text-rose-500">
        Error loading bookings: {bookingError}
      </div>
    );
  }

  const userRole = sessionData?.user?.role || "STUDENT";

  const hasNoProfile =
    !tutorRes?.data || Object.keys(tutorRes?.data).length === 0;

  return (
    <>
      {hasNoProfile && <SetupProfileModal />}
      {!hasNoProfile ? (
        <MyBookingsClient
          initialBookings={bookings || []}
          userRole={userRole}
        />
      ) : (
        <div className="flex items-center justify-center h-[50vh]">
          <p className="text-muted-foreground">
            Please complete your profile setup...
          </p>
        </div>
      )}
    </>
  );
}
