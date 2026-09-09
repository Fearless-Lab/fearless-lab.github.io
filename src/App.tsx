import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
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
import ReactionSpeed from "@/pages/ReactionSpeed";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import PromoModal from "./components/PromoModal";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PROMO_HIDDEN_PATHS = ["/banpicksimulation"];

// 프리렌더 결과가 디렉터리로 배포되어 pathname 끝에 "/"가 붙는 경우가 있어 정규화한다.
function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, "").toLowerCase() || "/";
}

function isPromoHiddenPath(pathname: string) {
  return PROMO_HIDDEN_PATHS.includes(normalizePath(pathname));
}

function shouldShowPromoModal(pathname: string) {
  if (isPromoHiddenPath(pathname)) return false;

  const isPrerender = /HeadlessChrome/.test(navigator.userAgent);
  if (isPrerender) return false;

  return true;
}

function AppContent() {
  const location = useLocation();
  const [isPromoOpen, setIsPromoOpen] = useState(false);

  useEffect(() => {
    setIsPromoOpen(shouldShowPromoModal(location.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/banPick" element={<BanPick />} />
          <Route path="/banPickSimulation" element={<BanPickSimulation />} />
          <Route path="/about" element={<About />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/reactionSpeed" element={<ReactionSpeed />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {!isPromoHiddenPath(location.pathname) && (
        <PromoModal open={isPromoOpen} onOpenChange={setIsPromoOpen} />
      )}
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col app-bg">
      <Router basename={BASE_URL}>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;
