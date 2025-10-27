import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";

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

  // 경로에 따른 동적 링크 설정
  // const isCommunity = location.pathname.startsWith("/community");
  // const dynamicLink = {
  //   title: isCommunity ? "Ban-Pick" : "Community",
  //   path: isCommunity ? "/banPick" : "/community",
  // };

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-5 border-b border-transparent z-99">
      <Link to="/">
        <p className="text-3xl">Fearless</p>
      </Link>

      {/* <ul className="lg:flex space-x-8">
        <li className="px-3 py-1 rounded-md transition-all duration-50 hover:border hover:border-white">
          <Link to={dynamicLink.path}>{dynamicLink.title}</Link>
        </li>
      </ul> */}

      {/* <ul className="flex space-x-6 text-lg">
        <li className="px-3 py-1">
          <Link to="/banPickSimulation">About</Link>
        </li>
      </ul> */}
    </nav>
  );
};

export default Navbar;
