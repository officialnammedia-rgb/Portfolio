import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Projects } from "../components/Projects";
import { Robotics } from "../components/Robotics";
import { Achievements } from "../components/Achievements";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div className="bg-black text-[#E1E0CC] min-h-screen selection:bg-primary selection:text-black">
      <Hero />
      <About />
      <Projects />
      <Robotics />
      <Achievements />
      <Footer />
    </div>
  );
};
