import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Solution from "./pages/components/Home/Solution";
import News from "./pages/News";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Home from "@/pages/Home";
import About from "@/pages/About";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  return (
    <div className="relative overflow-hidden">
      <Router basename="/data-visualization/">
        <Navbar />

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/solution" element={<Solution />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
