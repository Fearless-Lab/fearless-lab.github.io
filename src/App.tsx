import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
      <Router basename="/data-visualization/">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/banPick" element={<BanPick />} />

            <Route
              path="/community"
              element={<Navigate to="/community/scrim" replace />}
            />
            <Route path="/community/:category" element={<Community />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
