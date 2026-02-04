export type * from "./routes.type";

export enum UserRole {
  STUDENT = "STUDENT",
  TUTOR = "TUTOR",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE="INACTIVE",
  BLOCKED = "BLOCKED",
  SUSPENDED = "SUSPENDED",
  BAN = "BAN"
}

export enum BookingStatus {
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  phone?: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  parentId?: string | null;
  children?: Category[];
}

export interface Tutor {
  id: string;
  userId: string;
  bio?: string | null;
  experience_years: number;
  pricePerHour: number;
  averageRating: number;
  reviewCount: number;
  subjects: string[];
  user?: User;
  categories?: { category: Category }[];
}

export interface Availability {
  id: string;
  tutorProfileId: string;
  categoryId: string;
  dayOfWeek: number; // 0-6
  startTime: string;
  endTime: string;
  isBooked: boolean;
  category?: Category;
}

export interface Review {
  id: string;
  rating: number;
  content?: string | null;
  studentId: string;
  student?: User;
  tutorProfileId: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  studentId: string;
  tutorProfileId: string;
  categoryId: string;
  availabilityId: string;
  slotDate: string;
  startTime: string;
  endTime: string;
  hourlyRate: number;
  totalPrice: number;
  status: BookingStatus;
  meetLink?: string | null;
  isAttended: boolean;
  tutorProfile?: Tutor;
  category?: Category;
  review?: Review;
}

