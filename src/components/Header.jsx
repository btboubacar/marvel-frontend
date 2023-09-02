import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/img/logo.png";
import SliderSwitch from "../components/SliderSwitch";

const Header = ({
  userFavorites,
  handleFavorites,
  setFavorite,
  favorite,
  mode,
  setMode,
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
        <div>
          <SliderSwitch mode={mode} setMode={setMode} />
        </div>
      </div>
    </header>
  );
};

export default Header;
