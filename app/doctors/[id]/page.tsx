"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import AppointmentModal from "../../components/AppointmentModal";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import TimeSlotPicker from "../../components/TimeSlotPicker";
import allDoctors from "../../data/doctors";

export default function DoctorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.id as string;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const doctor = allDoctors.find((d) => d.id === doctorId);

  if (!doctor) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Doctor Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The doctor you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push("/doctors")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-200"
          >
            Browse All Doctors
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      setIsModalOpen(true);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with Doctor Image */}
      <section className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 sm:top-20 right-4 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-4 sm:bottom-10 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Doctor Image */}
              <div className="relative h-64 sm:h-80 md:h-auto">
                {doctor.image ? (
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-4xl sm:text-6xl md:text-8xl font-bold text-white">
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                )}
                {doctor.available && (
                  <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 bg-green-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                    Available Now
                  </div>
                )}
              </div>

              {/* Doctor Info */}
              <div className="p-6 sm:p-8 md:p-12">
                <div className="mb-4 sm:mb-6">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                    {doctor.name}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-blue-600 font-semibold mb-3 sm:mb-4">
                    {doctor.specialty}
                  </p>

                  {/* Rating & Stats */}
                  <div className="flex flex-wrap items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <svg
                          className="w-6 h-6 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-xl font-bold text-gray-900">
                          {doctor.rating}
                        </span>
                      </div>
                      <span className="text-gray-600">
                        ({doctor.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{doctor.experience} years</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{doctor.location}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-gray-900">
                      ${doctor.price}
                    </span>
                    <span className="text-gray-600 ml-2">/consultation</span>
                  </div>

                  {/* Work History Summary */}
                  {doctor.workHistory && doctor.workHistory.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        Current Position
                      </h3>
                      <p className="text-base font-semibold text-gray-900">
                        {doctor.workHistory[0].position}
                      </p>
                      <p className="text-sm text-gray-600">
                        {doctor.workHistory[0].hospital}
                      </p>
                    </div>
                  )}

                  {/* Specialties Summary */}
                  {doctor.specialties && doctor.specialties.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        Specialties
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {doctor.specialties
                          .slice(0, 3)
                          .map((specialty, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                            >
                              {specialty.name}
                            </span>
                          ))}
                        {doctor.specialties.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                            +{doctor.specialties.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column - Doctor Details */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* About */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  About
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {doctor.bio || "No biography available."}
                </p>
              </div>

              {/* Education */}
              {doctor.education && doctor.education.length > 0 && (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Education
                  </h2>
                  <ul className="space-y-3 sm:space-y-4">
                    {doctor.education.map((edu, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 sm:gap-4"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        </div>
                        <span className="text-sm sm:text-base text-gray-700 pt-1.5 sm:pt-2">
                          {edu}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Work History */}
              {doctor.workHistory && doctor.workHistory.length > 0 && (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Work History
                  </h2>
                  <div className="space-y-4 sm:space-y-6">
                    {doctor.workHistory.map((work, index) => (
                      <div
                        key={index}
                        className="relative pl-6 sm:pl-8 border-l-2 border-blue-200"
                      >
                        <div className="absolute -left-1.5 sm:-left-2 top-0 w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded-full border-2 border-white"></div>
                        <div className="mb-2">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                            {work.position}
                          </h3>
                          <p className="text-base sm:text-lg font-semibold text-blue-600">
                            {work.hospital}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {work.location}
                          </p>
                        </div>
                        <div className="mb-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {work.startDate} - {work.endDate}
                          </span>
                        </div>
                        {work.description && (
                          <p className="text-gray-600 leading-relaxed mt-2">
                            {work.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specialties */}
              {doctor.specialties && doctor.specialties.length > 0 && (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Specialties & Expertise
                  </h2>
                  <div className="space-y-4 sm:space-y-6">
                    {doctor.specialties.map((specialty, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:border-blue-300 transition-colors"
                      >
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                          {specialty.name}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                          {specialty.description}
                        </p>

                        {specialty.certifications &&
                          specialty.certifications.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                Certifications
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {specialty.certifications.map(
                                  (cert, certIndex) => (
                                    <span
                                      key={certIndex}
                                      className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200"
                                    >
                                      {cert}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {specialty.procedures &&
                          specialty.procedures.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                Procedures & Services
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {specialty.procedures.map(
                                  (procedure, procIndex) => (
                                    <span
                                      key={procIndex}
                                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                                    >
                                      {procedure}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {doctor.languages && doctor.languages.length > 0 && (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Languages
                  </h2>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {doctor.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-full text-sm sm:text-base font-medium border border-blue-200"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Appointment Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 lg:sticky lg:top-24">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Book Appointment
                </h2>

                {/* Working Hours Summary */}
                {doctor.workingHours && doctor.workingHours.length > 0 && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg sm:rounded-xl border border-blue-100">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">
                      Working Hours
                    </h3>
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                      {doctor.workingHours.map((wh, index) => {
                        const formatTime = (time: string) => {
                          const [hour, minute] = time.split(":").map(Number);
                          const hour12 =
                            hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
                          const ampm = hour >= 12 ? "PM" : "AM";
                          return `${hour12.toString().padStart(2, "0")}:${minute
                            .toString()
                            .padStart(2, "0")}${ampm}`;
                        };
                        return (
                          <div
                            key={index}
                            className="flex justify-between items-start text-gray-700"
                          >
                            <span className="font-medium">{wh.day}:</span>
                            <div className="flex flex-col items-end gap-1">
                              {wh.slots.map((slot, slotIndex) => (
                                <span key={slotIndex}>
                                  {formatTime(slot.startTime)} -{" "}
                                  {formatTime(slot.endTime)}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Time Slot Picker */}
                {doctor.workingHours && doctor.workingHours.length > 0 && (
                  <div className="mb-6">
                    <TimeSlotPicker
                      workingHours={doctor.workingHours}
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      onDateSelect={setSelectedDate}
                      onTimeSelect={setSelectedTime}
                    />
                  </div>
                )}

                {/* Consultation Info */}
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm sm:text-base text-gray-600">
                      Consultation Fee
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">
                      ${doctor.price}
                    </span>
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={handleBookAppointment}
                  disabled={!doctor.available || !selectedDate || !selectedTime}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mb-3 sm:mb-4"
                >
                  {!selectedDate || !selectedTime
                    ? "Select Date & Time"
                    : "Confirm Appointment"}
                </button>

                {/* Quick Info */}
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Verified Doctor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Instant Confirmation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Cancel Anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doctorName={doctor.name}
        doctorSpecialty={doctor.specialty}
        price={doctor.price}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />

      <Footer />
    </main>
  );
}
