import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { navLinks } from "@constants/navLinks";

const Navbar = () => {
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
      }
    );
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-5 border-b border-transparent z-999">
      <Link to="/">
        <p className="text-3xl font-outfit">Adlit</p>
      </Link>

      <ul className="hidden lg:flex space-x-8">
        {navLinks.map((link) => (
          <li
            key={link.id}
            className="px-3 py-1 rounded-md transition-all duration-50 hover:border hover:border-white"
          >
            <Link to={link.src}>{link.title}</Link>
          </li>
        ))}
      </ul>

      <button className="lg:hidden focus:outline-none">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <div className="hidden lg:flex items-center gap-1">
        <span className="text-sm font-medium">언어</span>
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 7l5 5 5-5H5z" />
        </svg>
      </div>
    </nav>
  );
};
export default Navbar;
