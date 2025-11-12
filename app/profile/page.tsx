"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Avatar, Button, Card, Form, message } from "antd";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import EducationSection from "./components/EducationSection";
import GeneralInfoSection from "./components/GeneralInfoSection";
import LanguagesSection from "./components/LanguagesSection";
import SpecialtiesSection from "./components/SpecialtiesSection";
import WorkHistorySection from "./components/WorkHistorySection";

type ActiveSection =
  | "general"
  | "education"
  | "work-history"
  | "specialties"
  | "languages";

function ProfilePageContent() {
  const { user, loading, checkAuth } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasCalledMeApi = useRef(false);
  const justSaved = useRef(false);

  // Get active section from URL query or default to "general"
  const sectionFromUrl = searchParams.get("section") as ActiveSection | null;
  const validSections: ActiveSection[] = [
    "general",
    "education",
    "work-history",
    "specialties",
    "languages",
  ];
  const initialSection =
    sectionFromUrl && validSections.includes(sectionFromUrl)
      ? sectionFromUrl
      : "general";
  const [activeSection, setActiveSection] =
    useState<ActiveSection>(initialSection);

  // Get available sections based on user type
  const getAvailableSections = (): ActiveSection[] => {
    const isDoctor = user?.userType === "doctor";
    if (isDoctor) {
      return [
        "general",
        "education",
        "work-history",
        "specialties",
        "languages",
      ];
    }
    return ["general"];
  };

  const availableSections = getAvailableSections();
  const isDoctor = user?.userType === "doctor";

  // Navigation functions
  const goToPrevious = () => {
    const currentIndex = availableSections.indexOf(activeSection);
    if (currentIndex > 0) {
      const previousSection = availableSections[currentIndex - 1];
      setActiveSection(previousSection);
      const params = new URLSearchParams(searchParams.toString());
      params.set("section", previousSection);
      router.push(`/profile?${params.toString()}`, { scroll: false });
    }
  };

  const goToNext = () => {
    const currentIndex = availableSections.indexOf(activeSection);
    if (currentIndex < availableSections.length - 1) {
      const nextSection = availableSections[currentIndex + 1];
      setActiveSection(nextSection);
      const params = new URLSearchParams(searchParams.toString());
      params.set("section", nextSection);
      router.push(`/profile?${params.toString()}`, { scroll: false });
    }
  };

  const currentIndex = availableSections.indexOf(activeSection);
  const isFirstSection = currentIndex === 0;
  const isLastSection = currentIndex === availableSections.length - 1;

  // Compute initial values from user data (memoized)
  const initialValues = useMemo(() => {
    if (!user) return {};

    const values: any = {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      designation: (user as any).designation || "",
      institute: (user as any).institute || "",
    };

    // Add doctor-specific fields
    if (user.userType === "doctor") {
      values.specialty = (user as any).specialty || "";
      values.otherSpecialties = (user as any).otherSpecialties || [];
      values.startedWorking = (user as any).startedWorking
        ? dayjs((user as any).startedWorking)
        : undefined;
      values.licenseNumber = (user as any).licenseNumber || "";
      values.bio = (user as any).bio || "";
      values.location = (user as any).location || "";
      values.price = (user as any).price || "";
      values.available = (user as any).available ?? true;
      values.education = (user as any).education || [];
      values.workHistory = (user as any).workHistory || [];
      values.specialties = (user as any).specialties || [];
      values.languages = (user as any).languages || [];
    }

    return values;
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Call /api/auth/me when profile page loads to get fresh user data (only once)
  useEffect(() => {
    if (!loading && user && !hasCalledMeApi.current) {
      hasCalledMeApi.current = true;
      checkAuth();
    }
  }, [loading, user, checkAuth]);

  // Sync activeSection with URL query parameter
  useEffect(() => {
    const sectionFromUrl = searchParams.get("section") as ActiveSection | null;
    const validSections: ActiveSection[] = [
      "general",
      "education",
      "work-history",
      "specialties",
      "languages",
    ];
    if (sectionFromUrl && validSections.includes(sectionFromUrl)) {
      setActiveSection(sectionFromUrl);
    }
  }, [searchParams]);

  // Set default values for all form fields when user data is available
  // Skip if we just saved to prevent overwriting saved values
  useEffect(() => {
    if (user && Object.keys(initialValues).length > 0 && !justSaved.current) {
      form.setFieldsValue(initialValues);
    }
    // Reset the flag after a short delay
    if (justSaved.current) {
      setTimeout(() => {
        justSaved.current = false;
      }, 100);
    }
  }, [user, form, initialValues]);

  // Load section-specific data when active section changes
  useEffect(() => {
    if (user && activeSection !== "general") {
      const sectionFields: any = {};

      if (activeSection === "education" && user.userType === "doctor") {
        sectionFields.education = (user as any).education || [];
      } else if (
        activeSection === "work-history" &&
        user.userType === "doctor"
      ) {
        sectionFields.workHistory = (user as any).workHistory || [];
      } else if (
        activeSection === "specialties" &&
        user.userType === "doctor"
      ) {
        sectionFields.specialties = (user as any).specialties || [];
      } else if (activeSection === "languages" && user.userType === "doctor") {
        sectionFields.languages = (user as any).languages || [];
      }

      if (Object.keys(sectionFields).length > 0) {
        // Set fields as default values
        form.setFieldsValue(sectionFields);
      }
    }
  }, [activeSection, user, form]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const handleSubmit = async (values: any, navigateToNext: boolean = false) => {
    setIsSubmitting(true);
    try {
      // Convert dayjs date to ISO string if present
      const submitValues = { ...values };
      if (
        submitValues.startedWorking &&
        dayjs.isDayjs(submitValues.startedWorking)
      ) {
        submitValues.startedWorking = submitValues.startedWorking.toISOString();
      }

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(submitValues),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      message.success("Profile updated successfully!");

      // Preserve form values before updating user state
      // Convert startedWorking back to dayjs format if needed
      const preservedValues: any = { ...values };
      if (
        preservedValues.startedWorking &&
        typeof preservedValues.startedWorking === "string"
      ) {
        preservedValues.startedWorking = dayjs(preservedValues.startedWorking);
      }

      // Mark that we just saved to prevent useEffect from overwriting
      justSaved.current = true;

      // Set form values immediately to prevent reset
      form.setFieldsValue(preservedValues);

      // Refresh auth context to update user state
      await checkAuth();

      // Navigate to next section if requested
      // Keep edit mode state when navigating
      if (navigateToNext && !isLastSection) {
        goToNext();
      } else {
        // Only exit edit mode if not navigating to next section
        setIsEditing(false);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update profile";
      message.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sidebarItems = [
    {
      key: "general",
      label: "General Info",
      icon: (
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    ...(isDoctor
      ? [
          {
            key: "education",
            label: "Education",
            icon: (
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
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
              </svg>
            ),
          },
          {
            key: "work-history",
            label: "Work History",
            icon: (
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
            ),
          },
          {
            key: "specialties",
            label: "Specialties",
            icon: (
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ),
          },
          {
            key: "languages",
            label: "Languages",
            icon: (
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
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
            ),
          },
        ]
      : []),
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-600 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
            <Avatar
              size={80}
              className="bg-white/20 backdrop-blur-sm border-4 border-white/30 shadow-lg"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
                color: "#ffffff",
                fontWeight: "600",
                fontSize: "32px",
              }}
            >
              {user.firstName[0]}
              {user.lastName[0]}
            </Avatar>
            <div className="flex-1 text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-white/90 text-base sm:text-lg mb-1">
                {user.email}
              </p>
              <p className="text-white/80 text-sm sm:text-base capitalize">
                {user.userType}
              </p>
            </div>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                if (isEditing) {
                  // Restore original user data for current section only
                  if (user) {
                    const currentSectionFields: any = {
                      firstName: user.firstName,
                      lastName: user.lastName,
                      phone: user.phone,
                      designation: (user as any).designation,
                      institute: (user as any).institute,
                    };

                    // Add doctor-specific general info fields
                    if (user.userType === "doctor") {
                      currentSectionFields.specialty = (user as any).specialty;
                      currentSectionFields.otherSpecialties =
                        (user as any).otherSpecialties || [];
                      currentSectionFields.startedWorking = (user as any)
                        .startedWorking
                        ? dayjs((user as any).startedWorking)
                        : undefined;
                      currentSectionFields.licenseNumber = (
                        user as any
                      ).licenseNumber;
                      currentSectionFields.bio = (user as any).bio;
                      currentSectionFields.location = (user as any).location;
                      currentSectionFields.price = (user as any).price;
                      currentSectionFields.available =
                        (user as any).available ?? true;

                      // Add section-specific fields based on active section
                      if (activeSection === "education") {
                        currentSectionFields.education =
                          (user as any).education || [];
                      } else if (activeSection === "work-history") {
                        currentSectionFields.workHistory =
                          (user as any).workHistory || [];
                      } else if (activeSection === "specialties") {
                        currentSectionFields.specialties =
                          (user as any).specialties || [];
                      } else if (activeSection === "languages") {
                        currentSectionFields.languages =
                          (user as any).languages || [];
                      }
                    }

                    form.setFieldsValue(currentSectionFields);
                  }
                  setIsEditing(false);
                } else {
                  setIsEditing(true);
                }
              }}
              className="font-semibold h-12 px-8 rounded-full cursor-pointer"
              style={{
                background: isEditing ? "#1e3a8a" : "#1e40af",
                border: "none",
                color: "#ffffff",
              }}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <Card className="shadow-md sticky" bodyStyle={{ padding: 0 }}>
                <nav className="p-6 space-y-2">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => {
                        const section = item.key as ActiveSection;
                        setActiveSection(section);
                        // Update URL query parameter
                        const params = new URLSearchParams(
                          searchParams.toString()
                        );
                        params.set("section", section);
                        router.push(`/profile?${params.toString()}`, {
                          scroll: false,
                        });
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                        activeSection === item.key
                          ? "bg-blue-50 text-blue-600 border-2 border-blue-200"
                          : "text-gray-700 hover:bg-gray-50 border-2 border-transparent"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium text-sm sm:text-base">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </nav>
              </Card>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              <Form
                form={form}
                layout="vertical"
                onFinish={(values) => handleSubmit(values, false)}
                initialValues={initialValues}
                className="space-y-6"
              >
                {/* General Info Section */}
                {activeSection === "general" && (
                  <GeneralInfoSection
                    isEditing={isEditing}
                    isDoctor={isDoctor}
                  />
                )}

                {/* Education Section */}
                {activeSection === "education" && isDoctor && (
                  <EducationSection isEditing={isEditing} />
                )}

                {/* Work History Section */}
                {activeSection === "work-history" && isDoctor && (
                  <WorkHistorySection isEditing={isEditing} />
                )}

                {/* Specialties & Expertise Section */}
                {activeSection === "specialties" && isDoctor && (
                  <SpecialtiesSection isEditing={isEditing} />
                )}

                {/* Languages Section */}
                {activeSection === "languages" && isDoctor && (
                  <LanguagesSection isEditing={isEditing} />
                )}

                {/* Navigation Buttons - Only show when not editing */}
                {!isEditing && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-6 pt-6 border-t border-gray-200">
                    <Button
                      type="default"
                      size="large"
                      onClick={goToPrevious}
                      disabled={isFirstSection}
                      className="h-14 px-6 rounded-full cursor-pointer"
                      icon={
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
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      }
                    >
                      Previous
                    </Button>

                    <div className="text-sm text-gray-600">
                      {currentIndex + 1} of {availableSections.length}
                    </div>

                    <Button
                      type="default"
                      size="large"
                      onClick={goToNext}
                      disabled={isLastSection}
                      className="h-14 px-6 rounded-full cursor-pointer"
                      icon={
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      }
                    >
                      Next
                    </Button>
                  </div>
                )}

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-end mt-6">
                    <Button
                      type="default"
                      size="large"
                      onClick={() => {
                        form.submit();
                      }}
                      loading={isSubmitting}
                      className="h-14 px-8 rounded-full cursor-pointer"
                    >
                      Save
                    </Button>
                    <Button
                      type="primary"
                      size="large"
                      onClick={async () => {
                        try {
                          const values = await form.validateFields();
                          await handleSubmit(values, true);
                        } catch (_error) {
                          // Validation failed
                        }
                      }}
                      loading={isSubmitting}
                      disabled={isLastSection}
                      className="h-14 px-8 rounded-full cursor-pointer"
                      style={{
                        background: "#1e40af",
                        border: "none",
                        color: "#ffffff",
                      }}
                    >
                      Save and Next
                    </Button>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50">
          <Header />
          <div className="flex items-center justify-center min-h-screen pt-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
          <Footer />
        </main>
      }
    >
      <ProfilePageContent />
    </Suspense>
  );
}
