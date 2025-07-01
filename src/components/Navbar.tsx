import { navLinks } from "./../../constants/navLinks";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to="/">
          <p>Adlit</p>
        </Link>

        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link to={link.src}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
