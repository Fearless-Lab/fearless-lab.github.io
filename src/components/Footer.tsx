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
        </div>
      </footer>
    </>
  );
};
export default Footer;
