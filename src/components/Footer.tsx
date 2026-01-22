import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="w-full py-4 text-center text-sm text-gray-500">
        <div>
          © {new Date().getFullYear()} Jinyoung Kim. All rights reserved.
        </div>
        <div className="flex justify-center gap-4 my-2">
          <Link to="/privacy" className="text-white hover:underline">
            개인정보처리방침
          </Link>
          <span className="text-gray-600">|</span>
          <Link to="/terms" className="text-white hover:underline">
            이용약관
          </Link>
        </div>
        <div>
          <p className="my-2">
            This site is not affiliated with or endorsed by Riot Games, Inc.
          </p>
          <p>
            League of Legends and all related assets are trademarks or
            registered trademarks of Riot Games, Inc.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
