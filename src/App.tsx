import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Home from "@/pages/Home";
import Footer from "./components/Footer";
import BanPick from "@/pages/BanPick";
// import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import { BASE_URL } from "./../constants/url";
import BanPickSimulation from "./pages/BanPickSimulation";
import { useEffect } from "react";
import { initServerOffset } from "./utils/serverTime";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  useEffect(() => {
    initServerOffset();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#050d18]">
      <Router basename={BASE_URL}>
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/banPick" element={<BanPick />} />
            <Route path="/banPickSimulation" element={<BanPickSimulation />} />

            {/* <Route
              path="/community"
              element={<Navigate to="/community/scrim" replace />}
            />
            <Route path="/community/:category" element={<Community />} /> */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
