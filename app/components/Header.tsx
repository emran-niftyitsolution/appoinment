'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              DoctorFind
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="text-sm lg:text-base text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/doctors" className="text-sm lg:text-base text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Doctors
            </Link>
            <Link href="/specialties" className="text-sm lg:text-base text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Specialties
            </Link>
            <Link href="/about" className="text-sm lg:text-base text-gray-700 hover:text-blue-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-sm lg:text-base text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Desktop Login Button */}
          <Link
            href="/login"
            className="hidden sm:block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm sm:text-base font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Login
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-base text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/doctors" 
                className="text-base text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Doctors
              </Link>
              <Link 
                href="/specialties" 
                className="text-base text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Specialties
              </Link>
              <Link 
                href="/about" 
                className="text-base text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-base text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/login" 
                className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

