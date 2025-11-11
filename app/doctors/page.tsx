"use client";

import { Input, Select } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import allDoctors from "../data/doctors";
import { locations, specialties } from "../data/filters";

function DoctorsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryFromUrl = searchParams.get("category") || "";

  const [selectedSpecialty, setSelectedSpecialty] = useState(
    categoryFromUrl || "All Specialties"
  );
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter doctors based on selected criteria
  const filteredDoctors = useMemo(() => {
    let filtered = [...allDoctors];

    // Filter by specialty
    if (selectedSpecialty !== "All Specialties") {
      filtered = filtered.filter(
        (doctor) => doctor.specialty === selectedSpecialty
      );
    }

    // Filter by location
    if (selectedLocation !== "All Locations") {
      filtered = filtered.filter(
        (doctor) => doctor.location === selectedLocation
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(query) ||
          doctor.specialty.toLowerCase().includes(query) ||
          doctor.location.toLowerCase().includes(query)
      );
    }

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "experience":
          return b.experience - a.experience;
        case "reviews":
          return b.reviews - a.reviews;
        case "price-low":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high":
          return parseFloat(b.price) - parseFloat(a.price);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedSpecialty, selectedLocation, searchQuery, sortBy]);

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialty(specialty);
    // Update URL without page reload
    if (specialty === "All Specialties") {
      router.push("/doctors");
    } else {
      router.push(`/doctors?category=${encodeURIComponent(specialty)}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Header />

      {/* Modern Page Header */}
      <section className="relative mb-5 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8 sm:pb-12 md:pb-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-cyan-500/5 to-purple-500/5">
          <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-blob"></div>
          <div className="absolute top-20 sm:top-40 right-4 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-cyan-200/20 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-4 sm:-bottom-8 left-1/2 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100/50 backdrop-blur-sm rounded-full mb-4 sm:mb-6 border border-blue-200/50">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="text-xs sm:text-sm font-semibold text-blue-700">
                  Verified Healthcare Professionals
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Find Your Perfect{" "}
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  Doctor
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed">
                Browse through our extensive network of trusted healthcare
                professionals. Book appointments, get consultations, and take
                control of your health.
              </p>
            </div>
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden px-4 sm:px-5 py-2.5 sm:py-3 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl sm:rounded-2xl flex items-center gap-2 hover:bg-white hover:shadow-lg transition-all duration-200 shadow-sm text-sm sm:text-base cursor-pointer"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span className="font-semibold text-gray-700">Filters</span>
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20">
        <div className="flex gap-4 sm:gap-6 lg:gap-8">
          {/* Modern Left Sidebar - Filters */}
          <aside
            className={`
            fixed lg:sticky top-20 sm:top-24 left-0 h-[calc(100vh-5rem)] sm:h-[calc(100vh-6rem)] lg:h-auto overflow-y-auto
            w-full sm:w-72 lg:w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-2xl lg:shadow-xl
            z-30 transform transition-all duration-300 ease-in-out rounded-r-2xl sm:rounded-r-3xl lg:rounded-3xl
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
          >
            <div className="p-6 lg:p-8">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Filters
                  </h2>
                  <p className="text-sm text-gray-500">Refine your search</p>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search
                </label>
                <Input
                  size="large"
                  placeholder="Search by name, specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  prefix={
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  }
                  className="rounded-xl border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Specialty Filter */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  Specialty
                </label>
                <Select
                  size="large"
                  value={selectedSpecialty}
                  onChange={handleSpecialtyChange}
                  className="w-full rounded-xl"
                  options={specialties.map((specialty) => ({
                    label: specialty,
                    value: specialty,
                  }))}
                />
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-600"
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
                  Location
                </label>
                <Select
                  size="large"
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  className="w-full rounded-xl"
                  options={locations.map((location) => ({
                    label: location,
                    value: location,
                  }))}
                />
              </div>

              {/* Sort Filter */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                    />
                  </svg>
                  Sort By
                </label>
                <Select
                  size="large"
                  value={sortBy}
                  onChange={setSortBy}
                  className="w-full rounded-xl"
                  options={[
                    { label: "⭐ Rating (Highest)", value: "rating" },
                    { label: "💼 Experience", value: "experience" },
                    { label: "💬 Most Reviews", value: "reviews" },
                    { label: "💰 Price: Low to High", value: "price-low" },
                    { label: "💰 Price: High to Low", value: "price-high" },
                  ]}
                />
              </div>

              {/* Active Filters */}
              {(selectedSpecialty !== "All Specialties" ||
                selectedLocation !== "All Locations" ||
                searchQuery) && (
                <div className="mb-6 pt-6 border-t border-gray-200/50">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-bold text-gray-900 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                      Active Filters
                    </label>
                    <button
                      onClick={() => {
                        setSelectedSpecialty("All Specialties");
                        setSelectedLocation("All Locations");
                        setSearchQuery("");
                        router.push("/doctors");
                      }}
                      className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors cursor-pointer"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpecialty !== "All Specialties" && (
                      <button
                        onClick={() => handleSpecialtyChange("All Specialties")}
                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-xl text-sm font-semibold hover:from-blue-100 hover:to-cyan-100 transition-all duration-200 flex items-center gap-2 border border-blue-200/50 shadow-sm cursor-pointer"
                      >
                        {selectedSpecialty}
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                    {selectedLocation !== "All Locations" && (
                      <button
                        onClick={() => setSelectedLocation("All Locations")}
                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-xl text-sm font-semibold hover:from-blue-100 hover:to-cyan-100 transition-all duration-200 flex items-center gap-2 border border-blue-200/50 shadow-sm cursor-pointer"
                      >
                        {selectedLocation}
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-xl text-sm font-semibold hover:from-blue-100 hover:to-cyan-100 transition-all duration-200 flex items-center gap-2 border border-blue-200/50 shadow-sm cursor-pointer"
                      >
                        &quot;{searchQuery}&quot;
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-300"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Modern Results Header */}
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-lg">
              <div>
                <p className="text-gray-600 mb-1">
                  Showing{" "}
                  <span className="font-bold text-gray-900 text-lg">
                    {filteredDoctors.length}
                  </span>{" "}
                  doctor{filteredDoctors.length !== 1 ? "s" : ""}
                  {selectedSpecialty !== "All Specialties" && (
                    <span>
                      {" "}
                      in{" "}
                      <span className="font-bold text-blue-600">
                        {selectedSpecialty}
                      </span>
                    </span>
                  )}
                </p>
                {filteredDoctors.length > 0 && (
                  <p className="text-sm text-gray-500">
                    All verified and ready to help
                  </p>
                )}
              </div>
              {filteredDoctors.length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-blue-700">
                    Verified Professionals
                  </span>
                </div>
              )}
            </div>

            {/* Modern Doctors Grid */}
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white/60 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-xl">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  No doctors found
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn&apos;t find any doctors matching your criteria. Try
                  adjusting your filters to see more results.
                </p>
                <button
                  onClick={() => {
                    setSelectedSpecialty("All Specialties");
                    setSelectedLocation("All Locations");
                    setSearchQuery("");
                    router.push("/doctors");
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-200 text-lg cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function DoctorsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
          <Header />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
          <Footer />
        </main>
      }
    >
      <DoctorsPageContent />
    </Suspense>
  );
}
