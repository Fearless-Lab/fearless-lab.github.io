import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Home from "@/pages/Home";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <Router basename="/data-visualization/">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
