import Footer from "./components/Footer";
import Hero from "./components/Hero";
import MedicalCategories from "./components/MedicalCategories";
import Statistics from "./components/Statistics";
import Steps from "./components/Steps";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Statistics />
      <Steps />
      <MedicalCategories />
      <Footer />
    </main>
  );
}
