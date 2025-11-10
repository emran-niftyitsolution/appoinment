'use client'

interface TimeSlotPickerProps {
  workingHours: { day: string; slots: { startTime: string; endTime: string }[] }[]
  selectedDate: string
  selectedTime: string
  onDateSelect: (date: string) => void
  onTimeSelect: (time: string) => void
}

export default function TimeSlotPicker({
  workingHours,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: TimeSlotPickerProps) {
  // Get available time slots for selected date
  const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[date.getDay()]
  }

  const selectedDay = selectedDate ? getDayOfWeek(selectedDate) : null
  const daySchedule = workingHours.find((wh) => wh.day === selectedDay)
  
  // Get available slots for the selected day
  const availableSlots = daySchedule ? daySchedule.slots : []

  // Generate next 14 days for date selection
  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const availableDates = generateDates()

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number)
    const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    const ampm = hour >= 12 ? 'PM' : 'AM'
    return `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}${ampm}`
  }

  // Create a unique identifier for each slot
  const getSlotId = (slot: { startTime: string; endTime: string }) => {
    return `${slot.startTime}-${slot.endTime}`
  }

  // Check if a date has available slots
  const hasSlotsForDate = (date: Date): boolean => {
    const dayOfWeek = getDayOfWeek(date.toISOString().split('T')[0])
    const daySchedule = workingHours.find((wh) => wh.day === dayOfWeek)
    return daySchedule ? daySchedule.slots.length > 0 : false
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Date Selection */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
          Select Date <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
          {availableDates.map((date) => {
            const dateStr = date.toISOString().split('T')[0]
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
            const dayNum = date.getDate()
            const isSelected = selectedDate === dateStr
            const hasSlots = hasSlotsForDate(date)
            const isDisabled = !hasSlots
            
            return (
              <div key={dateStr} className="relative group">
                <button
                  type="button"
                  onClick={() => hasSlots && onDateSelect(dateStr)}
                  disabled={isDisabled}
                  className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all duration-200 w-full ${
                    isDisabled
                      ? 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                      : isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 cursor-pointer'
                  }`}
                >
                  <div className="text-xs font-medium mb-0.5 sm:mb-1">{dayName}</div>
                  <div className="text-base sm:text-lg font-bold">{dayNum}</div>
                </button>
                {isDisabled && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    No available slots for this day
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                      <div className="border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Time Slot Selection */}
      {selectedDate && daySchedule && daySchedule.slots.length > 0 ? (
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
            Select Time Slot <span className="text-red-500">*</span>
          </label>
          
          {/* Display available time slots as a list with radio buttons */}
          <div className="space-y-1.5 sm:space-y-2">
            {availableSlots.map((slot, index) => {
              const slotId = getSlotId(slot)
              const isSelected = selectedTime === slotId
              const displayText = `${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`
              
              return (
                <label
                  key={index}
                  className={`flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-medium ${
                    isSelected ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {displayText}
                  </span>
                  <input
                    type="radio"
                    name="timeSlot"
                    value={slotId}
                    checked={isSelected}
                    onChange={() => onTimeSelect(slotId)}
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-0 focus:ring-offset-0"
                  />
                </label>
              )
            })}
          </div>
        </div>
      ) : selectedDate ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-yellow-800">
            No available slots for {selectedDay}. Please select another date.
          </p>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-600">
            Please select a date to view available time slots.
          </p>
        </div>
      )}
    </div>
  )
}
