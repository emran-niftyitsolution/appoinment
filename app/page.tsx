import Hero from './components/Hero'
import Statistics from './components/Statistics'
import Steps from './components/Steps'
import MedicalCategories from './components/MedicalCategories'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Statistics />
      <Steps />
      <MedicalCategories />
      <Footer />
    </main>
  )
}
