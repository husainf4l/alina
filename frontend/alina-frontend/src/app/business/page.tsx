'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PageTransition } from '@/components/ui/PageTransition';
import { Button } from '@/components/ui/Button';

export default function BusinessPage() {
  const [activeTab, setActiveTab] = useState<'schedule' | 'availability'>('schedule');
  const [selectedDay, setSelectedDay] = useState<string>('monday');

  // Mock data
  const workingDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const dailyStartTime = '09:00';
  const dailyEndTime = '17:00';
  const slotDuration = 60;
  const bufferTime = 15;
  const maxBookingsPerDay = 8;

  const scheduleSlots = [
    { id: '1', date: '2026-03-04', startTime: '09:00', endTime: '10:00', isAvailable: true, isBooked: true, bookedBy: 'John Doe' },
    { id: '2', date: '2026-03-04', startTime: '10:00', endTime: '11:00', isAvailable: true, isBooked: false },
    { id: '3', date: '2026-03-04', startTime: '11:00', endTime: '12:00', isAvailable: true, isBooked: false },
    { id: '4', date: '2026-03-04', startTime: '13:00', endTime: '14:00', isAvailable: true, isBooked: true, bookedBy: 'Jane Smith' },
    { id: '5', date: '2026-03-04', startTime: '14:00', endTime: '15:00', isAvailable: true, isBooked: false },
    { id: '6', date: '2026-03-04', startTime: '15:00', endTime: '16:00', isAvailable: false, isBooked: false },
    { id: '7', date: '2026-03-04', startTime: '16:00', endTime: '17:00', isAvailable: true, isBooked: false },
  ];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Business Management</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your schedule and availability settings</p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-4 mb-6">
              {['schedule', 'availability'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`
                    px-6 py-3 rounded-2xl font-semibold transition-all capitalize
                    ${activeTab === tab
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Weekly Schedule</h2>
                  <Button>Add Time Slot</Button>
                </div>

                {/* Calendar/Day Selector */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex gap-2 mb-6 overflow-x-auto">
                    {days.map((day) => (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`
                          px-6 py-3 rounded-xl font-medium capitalize whitespace-nowrap transition-all
                          ${selectedDay === day
                            ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }
                        `}
                      >
                        {day}
                      </button>
                    ))}
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Time Slots for {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
                    </h3>
                    {scheduleSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`
                          p-4 rounded-2xl border-2 flex items-center justify-between
                          ${slot.isBooked
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                            : slot.isAvailable
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                            : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
                          }
                        `}
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {slot.startTime} - {slot.endTime}
                          </div>
                          {slot.isBooked && (
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                                Booked
                              </span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                by {slot.bookedBy}
                              </span>
                            </div>
                          )}
                          {!slot.isBooked && slot.isAvailable && (
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold">
                              Available
                            </span>
                          )}
                          {!slot.isAvailable && (
                            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">
                              Unavailable
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {!slot.isBooked && (
                            <Button size="sm" variant="outline">
                              {slot.isAvailable ? 'Block' : 'Open'}
                            </Button>
                          )}
                          {slot.isBooked && (
                            <Button size="sm" variant="outline">View Details</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-6 text-white">
                    <div className="text-3xl font-bold mb-1">24</div>
                    <div className="text-sm opacity-90">Total Bookings This Week</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-6 text-white">
                    <div className="text-3xl font-bold mb-1">18</div>
                    <div className="text-sm opacity-90">Available Slots</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 text-white">
                    <div className="text-3xl font-bold mb-1">85%</div>
                    <div className="text-sm opacity-90">Booking Rate</div>
                  </div>
                </div>
              </div>
            )}

            {/* Availability Tab */}
            {activeTab === 'availability' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Availability Settings</h2>
                  <Button>Save Changes</Button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 space-y-6">
                  {/* Working Days */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Working Days
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {days.map((day) => (
                        <button
                          key={day}
                          className={`
                            px-4 py-2 rounded-xl font-medium capitalize transition-all
                            ${workingDays.includes(day)
                              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }
                          `}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Daily Hours */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Daily Start Time
                      </label>
                      <input
                        type="time"
                        defaultValue={dailyStartTime}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Daily End Time
                      </label>
                      <input
                        type="time"
                        defaultValue={dailyEndTime}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Slot Settings */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Slot Duration (minutes)
                      </label>
                      <input
                        type="number"
                        defaultValue={slotDuration}
                        min="15"
                        step="15"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Buffer Time (minutes)
                      </label>
                      <input
                        type="number"
                        defaultValue={bufferTime}
                        min="0"
                        step="5"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Max Bookings/Day
                      </label>
                      <input
                        type="number"
                        defaultValue={maxBookingsPerDay}
                        min="1"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4">
                    <div className="flex gap-3">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">Availability Tips</p>
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          Buffer time helps prevent back-to-back bookings. Recommended: 15-30 minutes between slots.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
