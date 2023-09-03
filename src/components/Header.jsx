import { Link } from "react-router-dom";
import { useState } from "react";
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
}) => {
  return (
    <header className="container">
      <div className=" header-container">
        <div>
          <img src={logo} alt="Marvel logo" />
        </div>
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
            <button
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
            </button>
          ) : (
            <>
              <Link to={"/login"}>
                <button>login</button>
              </Link>
              <Link to={"/signup"}>
                <button>signup</button>
              </Link>
            </>
          )}

          <FontAwesomeIcon icon="user" className="user" />
          <div>
            <SliderSwitch mode={mode} setMode={setMode} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
