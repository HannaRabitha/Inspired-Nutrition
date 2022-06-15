import { faBars, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.scss";
import Login from "./modals/Login";
import Register from "./modals/Register";
// import SearchBar from "./SearchBar";

export default function Header() {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalRegis, setShowModalRegis] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <Link to="/" className={classes.header__content__logo}>
          Inspired Nutrition
        </Link>
        {/* <SearchBar /> */}
        <div className={classes.search}>
          <input
            className={classes.search__input}
            type="text"
            placeholder="Search"
          />
          <button className={classes.search__button}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <nav
          className={`${classes.header__content__nav} ${
            menuOpen && size.width < 768 ? classes.isMenu : ""
          }`}
        >
          <ul>
            <li id="dropdown">
              <Link to="#">Categories</Link>
              {/* <div className={classes.header__content__nav__submenu}>
                <div className={classes.header__content__nav__submenuitem}>
                  <ul>
                    <li className="nav__submenu-item ">Our Company</li>
                    <li className="nav__submenu-item ">Our Team</li>
                    <li className="nav__submenu-item ">Our Portfolio</li>
                  </ul>
                </div>
              </div> */}
            </li>
            <li>
              {/* <button onClick={(e) => setShowModalLogin(true)}>Login</button> */}
              <Link to="#" onClick={(e) => setShowModalLogin(true)}>
                Login
              </Link>
            </li>
            <li>
              <Link to="#" onClick={(e) => setShowModalRegis(true)}>
                Register
              </Link>
            </li>
          </ul>
          {/* <button onClick={ctaClickHandler}>CTA Page</button> */}
        </nav>
        <div className={classes.header__content__toggle}>
          {!menuOpen ? (
            <FontAwesomeIcon icon={faBars} onClick={menuToggleHandler} />
          ) : (
            // <button onClick={menuToggleHandler}>OPEN</button>
            <FontAwesomeIcon icon={faClose} onClick={menuToggleHandler} />
          )}
        </div>
      </div>

      {showModalLogin ? <Login setShowModalLogin={setShowModalLogin} /> : null}
      {showModalRegis ? (
        <Register setShowModalRegis={setShowModalRegis} />
      ) : null}
    </header>
  );
}
