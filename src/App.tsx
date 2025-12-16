import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Home from "@/pages/Home";
import Footer from "./components/Footer";
import BanPick from "@/pages/BanPick";
import NotFound from "./pages/NotFound";
import { BASE_URL } from "./../constants/url";
import BanPickSimulation from "./pages/BanPickSimulation";
import About from "./pages/About";
import Quiz from "@/pages/Quiz";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  return (
    <div className="min-h-screen flex flex-col app-bg">
      <Router basename={BASE_URL}>
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/banPick" element={<BanPick />} />
            <Route path="/banPickSimulation" element={<BanPickSimulation />} />
            <Route path="/about" element={<About />} />
            <Route path="/quiz" element={<Quiz />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
