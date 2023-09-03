import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/img/logo.png";
import SliderSwitch from "../components/SliderSwitch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Header = ({
  setFavorite,
  favorite,
  mode,
  setMode,
  token,
  setToken,
  userFavorites,
  setUserFavorites,
  navbarVisibility,
  setNavBarVisibility,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const matchMedia = window.matchMedia("(max-width:859px)");
    matchMedia.onchange = (event) => {
      if (event.matches) {
        setNavBarVisibility(false);
      } else {
        setNavBarVisibility(true);
      }
    };
  }, []);
  return (
    <header
      className="container"
      onClick={() => {
        setNavBarVisibility(false);
      }}
    >
      <div className=" header-container">
        <div
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <img
            src={logo}
            alt="Marvel logo"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="header-visibleXs">
          <FontAwesomeIcon
            icon="bars"
            onClick={(event) => {
              setNavBarVisibility(true);
              event.stopPropagation();
            }}
          />
        </div>
        <div
          className="header-middle"
          style={{ display: navbarVisibility ? "flex" : "none" }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <nav className="header-nav">
            <Link to="/characters">
              <span>Characters</span>
            </Link>
            <Link to="/comics">
              <span>Comics</span>
            </Link>
            <select
              name="favorites"
              id="favorites"
              defaultValue={favorite}
              value={favorite}
              className="favorites"
              onChange={(event) => {
                setFavorite(event.target.value);
              }}
            >
              <option selected>Favorites</option>
              <option>Characters</option>
              <option>Comics</option>
            </select>
          </nav>
          <div className="account">
            {token ? (
              <span
                style={{ backgroundColor: "tomato" }}
                onClick={() => {
                  setUserFavorites({
                    ...userFavorites,
                    characters: [],
                    comics: [],
                  });
                  Cookies.remove("token");
                  setToken(null);
                }}
              >
                logout
              </span>
            ) : (
              <div>
                <Link to={"/login"}>
                  <span>Login</span> {" | "}
                </Link>
                <Link to={"/signup"}>
                  <span>Signup</span>
                </Link>
                <FontAwesomeIcon icon="user" className="user" />
              </div>
            )}
          </div>
        </div>{" "}
        <div
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <SliderSwitch mode={mode} setMode={setMode} />
        </div>
      </div>
    </header>
  );
};

export default Header;
