
import { bookingService } from "@/services/booking.service";
import { userService } from "@/services/user.service";
import MyBookingsClient from "../../../../../components/modules/bookingPage/MyBookingsClient";
export const dynamic = "force-dynamic";

export default async function BookingsPage() {

  const { data: bookings, error: bookingError } = await bookingService.getbookings();

  const { data: sessionData, error: sessionError } = await userService.getSession();

  if (bookingError || sessionError) {
    return (
      <div className="p-10 text-rose-500">
        Error: {bookingError || sessionError}
      </div>
    );
  }

  const userRole = sessionData?.user?.role || "STUDENT";

  return (
    <MyBookingsClient
      initialBookings={bookings || []}
      userRole={userRole}
    />
  );
}