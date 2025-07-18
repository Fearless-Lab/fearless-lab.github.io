const Footer = () => {
  return (
    <>
      <footer className="w-full py-4 text-center text-sm text-gray-500">
        <div>
          © {new Date().getFullYear()} Jinyoung Kim. All rights reserved.
        </div>
        <div>
          Contact me:{" "}
          <a
            href="mailto:jyk41993@gmail.com"
            className="text-[#027b96] hover:underline"
          >
            jyk41993@gmail.com
          </a>
          <p className="my-2">
            This site is not affiliated with or endorsed by Riot Games.
          </p>
          <p>
            Riot Games, League of Legends and all associated properties are
            trademarks or registered trademarks of Riot Games, Inc.
          </p>
        </div>
      </footer>
    </>
  );
};
export default Footer;
