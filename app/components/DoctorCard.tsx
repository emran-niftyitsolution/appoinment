import Link from 'next/link'

interface Doctor {
  id: string
  name: string
  specialty: string
  experience: number
  rating: number
  reviews: number
  location: string
  image?: string
  available: boolean
  price: string
}

interface DoctorCardProps {
  doctor: Doctor
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Link href={`/doctors/${doctor.id}`}>
      <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 hover:border-blue-300/50 hover:shadow-2xl transition-all duration-300 h-full flex flex-col overflow-hidden">
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-cyan-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:via-cyan-50/20 group-hover:to-purple-50/30 transition-all duration-300 rounded-3xl"></div>
        
        <div className="relative z-10">
          {/* Doctor Image & Badge */}
          <div className="relative mb-5">
            <div className="w-full h-56 bg-gradient-to-br from-blue-100 via-cyan-100 to-purple-100 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              {doctor.image ? (
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              ) : (
                <div className="w-28 h-28 bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl font-bold text-white">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
            </div>
            {doctor.available && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Available
              </div>
            )}
            {!doctor.available && (
              <div className="absolute top-4 right-4 bg-gray-500/80 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                Unavailable
              </div>
            )}
          </div>

          {/* Doctor Info */}
          <div className="flex-1 flex flex-col">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                {doctor.name}
              </h3>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="text-blue-700 font-semibold text-sm">{doctor.specialty}</span>
              </div>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50/50 rounded-xl">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-gray-900 font-bold text-lg">{doctor.rating}</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <span className="text-gray-600 text-sm font-medium">{doctor.reviews} reviews</span>
            </div>

            {/* Experience & Location */}
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-semibold">{doctor.experience} years experience</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="font-semibold">{doctor.location}</span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="mt-auto pt-5 border-t border-gray-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">${doctor.price}</span>
                  </div>
                  <span className="text-gray-500 text-sm font-medium">per consultation</span>
                </div>
                <div className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200 text-sm group-hover:from-blue-700 group-hover:to-cyan-600">
                  View Profile
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

