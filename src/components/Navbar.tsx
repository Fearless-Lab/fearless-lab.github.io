import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { navLinks } from "@constants/navLinks";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // /banPickSimulation 경로에서 숨기기
  if (location.pathname === "/banPickSimulation") {
    return null;
  }

  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
      },
    });

    navTween.fromTo(
      "nav",
      {
        backgroundColor: "transparent",
      },
      {
        backdropFilter: "blur(5px)",
        borderBottom: "1px solid #011d2e",
        duration: 0.3,
      }
    );

    if (window.scrollY > 0) {
      gsap.set("nav", {
        backdropFilter: "blur(5px)",
        borderBottom: "1px solid #011d2e",
        duration: 0.3,
      });
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-5 border-b border-transparent z-99">
      <Link to="/">
        <p className="text-3xl">Fearless</p>
      </Link>

      <ul className="lg:flex space-x-8">
        {navLinks.map((link) => (
          <li
            key={link.id}
            className="px-3 py-1 rounded-md transition-all duration-50 hover:border hover:border-white"
          >
            <Link to={link.src}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
