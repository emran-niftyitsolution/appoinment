'use client'

import Link from 'next/link'
import { categories } from '../data/categories'

export default function MedicalCategories() {
  return (
    <section id="specialties" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
            Medical <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Specialties</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Explore our comprehensive range of medical specialties and find the right care for you
          </p>
        </div>

        {/* Categories Grid - Mobile first: 1 column, then 2, then 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/doctors?category=${encodeURIComponent(category.name)}`}
              className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden block"
            >
              {/* Background Gradient on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br ${category.gradient} text-white mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {category.icon()}
                </div>

                {/* Name */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

