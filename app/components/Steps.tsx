'use client'

import { steps } from '../data/steps'

export default function Steps() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            How It <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Simple steps to connect with the right healthcare professional for you
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connection Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 sm:top-24 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-cyan-200 -z-10 transform translate-x-4">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              )}

              <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                {/* Number Badge */}
                <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`inline-flex p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br ${step.gradient} text-white mb-4 sm:mb-6 mt-2 sm:mt-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {step.icon()}
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

