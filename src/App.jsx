import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

//
import "./App.css";

// Components
import Header from "./components/Header";

// Pages
import Characters from "./pages/Characters";
import CharacterComics from "./pages/Character-Comics";
import Comics from "./pages/Comics";
import ComicDetail from "./pages/ComicDetail";

// External libraries
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBookmark,
  faThumbsUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
library.add(faBookmark, faThumbsUp, faMagnifyingGlass);

function App() {
  // console.log(typeof Cookies.get("__marvel_char_favorites"));
  const [userFavorites, setUserFavorites] = useState({
    characters:
      (Cookies.get("__marvel_char_favorites") &&
        JSON.parse(Cookies.get("__marvel_char_favorites"))) ||
      "",
    comics:
      (Cookies.get("__marvel_com_favorites") &&
        JSON.parse(Cookies.get("__marvel_com_favorites"))) ||
      "",
  });

  const [showFavorites, setShowFavorites] = useState(false);
  const [favorite, setFavorite] = useState("Favorites");
  const [mode, setMode] = useState(true); // dark

  // ----------
  const handleFavorites = (favoriteType, id, del) => {
    let type = "";
    if (favoriteType === "characters") type = "char";
    else if (favoriteType === "comics") type = "com";

    //
    let value = [];
    // del -> true => delete; false :  no delete
    console.log("inside handleFavorites", type, del, id);
    if (type && !id && del) {
      console.log("inside delete all type");
      const copyFavorites = { ...userFavorites };
      if (type === "char") {
        copyFavorites.characters = "";
      } else {
        copyFavorites.comics = "";
      }

      Cookies.remove(`__marvel_${type}_favorites`);
      setUserFavorites(copyFavorites);
    } else {
      if (type && id && !del) {
        if (Cookies.get(`__marvel_${type}_favorites`)) {
          value = JSON.parse(Cookies.get(`__marvel_${type}_favorites`));
          console.log(value, typeof value);
          value.push(id);
          console.log("inside 1");
        } else {
          value = [id];
          console.log("inside 2");
          console.log(value);
        }
      } else if (type && id && del) {
        console.log("inside delete");
        value = JSON.parse(Cookies.get(`__marvel_${type}_favorites`));
        console.log("value before filter", value);
        value = value.filter((item) => {
          console.log("item filter", item, id);
          return item !== id;
        });
        console.log("value after filter", value);
      }
      const copyFavorites = { ...userFavorites };
      if (type === "char") {
        copyFavorites.characters = value;
      } else {
        copyFavorites.comics = value;
      }
      if (value.length > 0)
        Cookies.set(`__marvel_${type}_favorites`, JSON.stringify(value), {
          expires: 15,
        });
      else {
        Cookies.remove(`__marvel_${type}_favorites`);
      }
      setUserFavorites(copyFavorites);
    }
  };

  // --------
  useEffect(() => {
    if (mode) {
      document.body.style.backgroundColor = "#202020";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "#202020";
    }
  }, [mode]);

  return (
    <Router>
      <Header
        userFavorites={userFavorites}
        handleFavorites={handleFavorites}
        favorite={favorite}
        setFavorite={setFavorite}
        setMode={setMode}
        mode={mode}
      />
      <Routes>
        {/* <Route
          path="/"
          element={
            <Characters
              userFavorites={userFavorites}
              handleFavorites={handleFavorites}
            />
          }
        /> */}
        <Route
          path="/characters"
          element={
            <Characters
              userFavorites={userFavorites}
              handleFavorites={handleFavorites}
              showFavorites={showFavorites}
              setShowFavorites={setShowFavorites}
              favorite={favorite}
              setFavorite={setFavorite}
            />
          }
        />
        <Route
          path="/character-comics/:characterId"
          element={
            <CharacterComics
              handleFavorites={handleFavorites}
              userFavorites={userFavorites}
              favorite={favorite}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              userFavorites={userFavorites}
              handleFavorites={handleFavorites}
              favorite={favorite}
            />
          }
        />
        <Route
          path="/comic/:comicId"
          element={
            <ComicDetail
              userFavorites={userFavorites}
              handleFavorites={handleFavorites}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
