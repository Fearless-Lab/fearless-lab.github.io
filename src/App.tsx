import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Solution from "./pages/Solution";
import News from "./pages/News";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  return (
    <div>
      <Router basename="/data-visualization/">
        <Navbar />

        <div className="h-[1000px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/solution" element={<Solution />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
