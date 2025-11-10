'use client'

import { stats } from '../data/statistics'

export default function Statistics() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 rounded-xl sm:rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${stat.gradient} text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon()}
                </div>

                {/* Number */}
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {stat.number}
                </h3>

                {/* Label */}
                <p className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

