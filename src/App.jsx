import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

//
import "./App.css";

// Components
import Header from "./components/Header";

// Pages
import Characters from "./pages/Characters";
import CharacterComics from "./pages/CharacterComics";
import Comics from "./pages/Comics";
import ComicDetail from "./pages/ComicDetail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// External libraries
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBookmark,
  faThumbsUp,
  faMagnifyingGlass,
  faUser,
  faCamera,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import apiClient from "./api/client";
library.add(
  faBookmark,
  faThumbsUp,
  faMagnifyingGlass,
  faUser,
  faCamera,
  faBars
);

function App() {
  const [userFavorites, setUserFavorites] = useState({
    characters: [],
    comics: [],
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorite, setFavorite] = useState("Favorites");
  const [mode, setMode] = useState(true); // dark
  const [token, setToken] = useState(Cookies.get("token" || null));
  const [navbarVisibility, setNavBarVisibility] = useState(true);

  // ----------
  const handleFavorites = async (favoriteType, id, del) => {
    let type = "";
    if (favoriteType === "characters") type = "char";
    else if (favoriteType === "comics") type = "com";
    console.log("inside handleFavorites", type, del, id);

    if (type && id && !del) {
      try {
        const response = await apiClient.post(
          "/favorites",
          {
            type: favoriteType,
            id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const obj = response.data.userFavorites;
        setUserFavorites({
          ...userFavorites,
          characters: [...obj.characters],
          comics: [...obj.comics],
        });
        //
        //}
      } catch (error) {
        console.log(error.response);
      }
    } else if (type && id && del) {
      try {
        // db
        const response = await apiClient.delete(
          `/favorites?type=${favoriteType}&id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const obj = response.data.userFavorites;
        setUserFavorites({
          ...userFavorites,
          characters: [...obj.characters],
          comics: [...obj.comics],
        });
      } catch (error) {
        console.log(error.response);
      }
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

    const matchMedia = window.matchMedia("(max-width:859px)");

    const fetchFavorites = async () => {
      if (token) {
        try {
          const response = await apiClient.get("/favorites", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const obj = response.data.userFavorites;
          setUserFavorites({
            ...userFavorites,
            characters: [...obj.characters],
            comics: [...obj.comics],
          });
        } catch (error) {
          console.log(error.response);
        }
      } else {
        setUserFavorites({
          ...userFavorites,
          characters: [],
          comics: [],
        });
      }
    };

    fetchFavorites();
  }, [mode, token]);

  return (
    <Router>
      <Header
        userFavorites={userFavorites}
        setUserFavorites={setShowFavorites}
        handleFavorites={handleFavorites}
        favorite={favorite}
        setFavorite={setFavorite}
        setMode={setMode}
        mode={mode}
        token={token}
        setToken={setToken}
        navbarVisibility={navbarVisibility}
        setNavBarVisibility={setNavBarVisibility}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Characters
              userFavorites={userFavorites}
              handleFavorites={handleFavorites}
              showFavorites={showFavorites}
              setShowFavorites={setShowFavorites}
              favorite={favorite}
              setFavorite={setFavorite}
              setNavBarVisibility={setNavBarVisibility}
              token={token}
            />
          }
        />
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
              setNavBarVisibility={setNavBarVisibility}
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
              token={token}
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
              setNavBarVisibility={setNavBarVisibility}
              token={token}
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
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
