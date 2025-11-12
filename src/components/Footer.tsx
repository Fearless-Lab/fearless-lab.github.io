const Footer = () => {
  return (
    <>
      <footer className="w-full py-4 text-center text-sm text-gray-500">
        <div>
          © {new Date().getFullYear()} Jinyoung Kim. All rights reserved.
        </div>
        <div>
          <a href="/about" className="text-[#027b96] hover:underline">
            Contact & Who’s This For?
          </a>
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
