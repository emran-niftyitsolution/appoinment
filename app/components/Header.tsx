"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Avatar, Dropdown } from "antd";
import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? ""
          : "bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm"
      }`}
      style={transparent ? {} : { backgroundColor: "rgba(255, 255, 255, 0.8)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center">
              <svg
                className="w-4 h-4 sm:w-6 sm:h-6 text-white"
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
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              DoctorFind
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="/"
              className="text-sm lg:text-base text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/doctors"
              className="text-sm lg:text-base text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Doctors
            </Link>
            <Link
              href="/specialties"
              className="text-sm lg:text-base text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Specialties
            </Link>
            <Link
              href="/about"
              className="text-sm lg:text-base text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm lg:text-base text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden sm:flex items-center">
            {loading ? (
              <div className="w-24 h-10"></div>
            ) : (
              <>
                {user ? (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: "profile",
                          label: (
                            <div className="px-2 py-1">
                              <p className="font-semibold text-gray-900">
                                {user.firstName} {user.lastName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {user.email}
                              </p>
                              <p className="text-xs text-blue-600 capitalize mt-1">
                                {user.userType}
                              </p>
                            </div>
                          ),
                        },
                        {
                          type: "divider",
                        },
                        {
                          key: "dashboard",
                          label: (
                            <Link href="/dashboard" className="block">
                              Dashboard
                            </Link>
                          ),
                          icon: (
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
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                              />
                            </svg>
                          ),
                        },
                        {
                          key: "logout",
                          label: "Logout",
                          danger: true,
                          icon: (
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
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                          ),
                          onClick: logout,
                        },
                      ],
                    }}
                    placement="bottomRight"
                    trigger={["click"]}
                  >
                    <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                      <Avatar
                        size="default"
                        className="bg-gradient-to-br from-blue-600 to-cyan-500"
                        style={{
                          background:
                            "linear-gradient(to bottom right, #2563eb, #06b6d4)",
                          color: "#ffffff",
                          fontWeight: "600",
                          fontSize: "14px",
                        }}
                      >
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </Avatar>
                      <span className="text-sm font-medium text-gray-700 hidden lg:block">
                        {user.firstName}
                      </span>
                    </button>
                  </Dropdown>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer relative z-10"
                    style={{
                      background:
                        "linear-gradient(to right, rgb(37, 99, 235), rgb(6, 182, 212))",
                      backgroundImage:
                        "linear-gradient(to right, #2563eb, #06b6d4)",
                      color: "#ffffff !important",
                      border: "none",
                      textDecoration: "none",
                      display: "inline-block",
                      WebkitTextFillColor: "#ffffff",
                    }}
                  >
                    <span style={{ color: "#ffffff" }}>Login</span>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              transparent
                ? "text-white hover:text-blue-200"
                : "text-gray-700 hover:text-blue-600"
            }`}
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-t py-4 ${
              transparent ? "border-white/20" : "border-gray-200"
            }`}
          >
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className={`text-base transition-colors font-medium px-2 py-1 ${
                  transparent
                    ? "text-white hover:text-blue-200"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/doctors"
                className={`text-base transition-colors font-medium px-2 py-1 ${
                  transparent
                    ? "text-white hover:text-blue-200"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Doctors
              </Link>
              <Link
                href="/specialties"
                className={`text-base transition-colors font-medium px-2 py-1 ${
                  transparent
                    ? "text-white hover:text-blue-200"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Specialties
              </Link>
              <Link
                href="/about"
                className={`text-base transition-colors font-medium px-2 py-1 ${
                  transparent
                    ? "text-white hover:text-blue-200"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`text-base transition-colors font-medium px-2 py-1 ${
                  transparent
                    ? "text-white hover:text-blue-200"
                    : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {!loading && (
                <>
                  {user ? (
                    <div className="mt-2 space-y-2">
                      <div
                        className={`px-2 py-2 border-t ${
                          transparent ? "border-white/20" : "border-gray-200"
                        }`}
                      >
                        <p
                          className={`font-semibold text-sm ${
                            transparent ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {user.firstName} {user.lastName}
                        </p>
                        <p
                          className={`text-xs ${
                            transparent ? "text-white/70" : "text-gray-500"
                          }`}
                        >
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-full text-center hover:bg-red-600 transition-colors cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className={`mt-2 px-4 py-2 font-semibold rounded-full text-center transition-colors ${
                        transparent
                          ? "bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
                          : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      style={
                        !transparent
                          ? {
                              background:
                                "linear-gradient(to right, #2563eb, #06b6d4)",
                              color: "#ffffff",
                            }
                          : {}
                      }
                    >
                      Login
                    </Link>
                  )}
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
