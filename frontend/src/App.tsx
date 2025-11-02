import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <div className="dark:bg-neutral-800 bg-white dark:text-white min-h-screen">
      <Navbar />
      <main className="pt-10">
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
}
