import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Home from "@/pages/Home";
import Footer from "./components/Footer";
import BanPick from "@/pages/BanPick";
import Community from "./pages/components/Home/Community";
import NotFound from "./pages/NotFound";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse at top, #1a3a5e 0%, #0a1f33 40%, #050d18 60%)",
        backgroundColor: "#050d18",
      }}
    >
      <Navbar />

      <main className="flex-grow">
        <Router basename="/data-visualization/">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/banPick" element={<BanPick />} />
            <Route path="/community" element={<Community />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </main>

      <Footer />
    </div>
  );
}

export default App;
