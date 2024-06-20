import { useContext, useState, useRef, useEffect } from "react";
import AuthContext from "./auth/AuthProvider";
import { Link } from "react-router-dom";

// ICONS
import { CiMenuFries } from "react-icons/ci";
import { LuPartyPopper } from "react-icons/lu";
import { IoIosCloseCircleOutline } from "react-icons/io";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navBarRef = useRef();

  const { auth, logout } = useContext(AuthContext);

  const handleClickMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navBarRef.current && !navBarRef.current.contains(event.target)) {
        handleCloseMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false); 
  }, [auth]); 

  if (!auth) {
    return null;
  }

  return (
    <header>
      <nav>
        <LuPartyPopper />
        {isMenuOpen && <div className="back"></div>}
        <div className="front" ref={navBarRef}>
          <div className={`container ${isMenuOpen ? "open" : "close"}`}>
            <IoIosCloseCircleOutline
              className="close-btn text-white"
              onClick={handleClickMenu}
            />
            <ul>
              <li>Salones</li>
              <li>Reservas</li>
              <li>Contacto</li>
              <li>
                <Link to="/eventos" onClick={handleClickMenu}>
                  Tipo de eventos
                </Link>
              </li>
              <li className="wsp-btn">Whatsapp</li>
              <div className="user-opt">
                <li onClick={handleLogout}>LogOut</li>
              </div>
            </ul>
          </div>
        </div>
        <CiMenuFries onClick={handleClickMenu} />
      </nav>
    </header>
  );
};
