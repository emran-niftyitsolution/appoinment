'use client'

import { ReactElement } from 'react'

export interface Step {
  number: string
  title: string
  description: string
  icon: () => ReactElement
  gradient: string
}

export const steps: Step[] = [
  {
    number: '01',
    title: 'Pray',
    description: 'Start your journey with faith and hope for better health',
    icon: () => (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    number: '02',
    title: 'Find Doctors',
    description: 'Browse through our extensive network of verified healthcare professionals',
    icon: () => (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    number: '03',
    title: 'Get Appointment',
    description: 'Book your preferred time slot with just a few clicks',
    icon: () => (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    number: '04',
    title: 'Get Well',
    description: 'Receive quality care and get back to your healthy self',
    icon: () => (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-orange-500 to-yellow-500'
  }
]

