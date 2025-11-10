export interface WorkHistory {
  position: string;
  hospital: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Specialty {
  name: string;
  description: string;
  certifications?: string[];
  procedures?: string[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: number;
  location: string;
  available: boolean;
  price: string;
  education?: string[];
  languages?: string[];
  bio?: string;
  workingHours?: {
    day: string;
    slots: { startTime: string; endTime: string }[];
  }[];
  image?: string;
  workHistory?: WorkHistory[];
  specialties?: Specialty[];
}

