import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        duration: 0.3,
      }
    );

    if (window.scrollY > 0) {
      gsap.set("nav", {
        backdropFilter: "blur(5px)",
        duration: 0.3,
      });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-5 border-b border-transparent z-50">
      <Link to="/" className="flex items-center gap-3 group">
        <img src="/favicon-48x48.png" alt="Fearless Logo" className="w-7 h-7" />
        <p className="text-3xl">Fearless</p>
      </Link>

      <ul className="hidden md:flex space-x-6 text-lg">
        <li className="px-3 py-1 rounded-md transition-all duration-200 hover:bg-white/10">
          <Link to="/about">About</Link>
        </li>
        <li className="px-3 py-1 rounded-md transition-all duration-200 hover:bg-white/10">
          <Link to="/quiz">Quiz</Link>
        </li>
        <li className="px-3 py-1 rounded-md transition-all duration-200 hover:bg-white/10">
          <Link to="/reactionSpeed">Reaction-Speed</Link>
        </li>
      </ul>

      <DropdownMenu.Root open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenu.Trigger asChild>
          <button
            className="md:hidden flex flex-col space-y-1.5 w-8 h-8 justify-center items-center rounded-md hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-5 bg-white" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[200px] bg-white/5 backdrop-blur-xl rounded-lg p-2 shadow-2xl border border-white/20 animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 z-[100]"
            sideOffset={8}
            align="end"
          >
            <DropdownMenu.Item asChild>
              <Link
                to="/about"
                className="flex items-center px-3 py-2 text-base rounded-md outline-none cursor-pointer hover:bg-white/10 focus:bg-white/10 transition-colors"
              >
                About
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item asChild>
              <Link
                to="/quiz"
                className="flex items-center px-3 py-2 text-base rounded-md outline-none cursor-pointer hover:bg-white/10 focus:bg-white/10 transition-colors"
              >
                Quiz
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item asChild>
              <Link
                to="/reactionSpeed"
                className="flex items-center px-3 py-2 text-base rounded-md outline-none cursor-pointer hover:bg-white/10 focus:bg-white/10 transition-colors"
              >
                Reaction-Speed
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </nav>
  );
};

export default Navbar;
