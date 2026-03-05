// Business management types matching Flutter app

export interface ScheduleSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  isBooked: boolean;
  bookedBy?: string;
}

export interface AvailabilitySettings {
  workingDays: string[];
  dailyStartTime: string;
  dailyEndTime: string;
  slotDuration: number; // in minutes
  bufferTime: number; // in minutes
  maxBookingsPerDay: number;
}

export interface CreateScheduleSlotRequest {
  date: string;
  startTime: string;
  endTime: string;
}

export interface UpdateAvailabilityRequest {
  workingDays: string[];
  dailyStartTime: string;
  dailyEndTime: string;
  slotDuration: number;
  bufferTime: number;
  maxBookingsPerDay: number;
}

export interface CustomerStats {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  averageRating: number;
  lastOrderDate?: string;
  status: 'active' | 'inactive';
}

export interface CustomerSegment {
  name: string;
  count: number;
  totalRevenue: number;
  averageOrderValue: number;
}
