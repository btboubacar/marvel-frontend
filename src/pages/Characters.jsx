import { useState, useEffect } from "react";
import apiClient from "../api/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//
import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";

//
const endpoint = "/characters";

const Characters = ({
  userFavorites,
  handleFavorites,
  // showFavorites,
  // setShowFavorites,
  favorite,
  // setFavorite,
  // setNavBarVisibility,
  token,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [pageArray, setPageArray] = useState([]);
  const [search, setSearch] = useState("");
  const [clickSeacrhOptions, setClickSeacrhOptions] = useState(false);

  const handleSumbitSearch = (character) => {
    if (
      (character.title && character.title.includes("(")) ||
      (character.name && character.name.includes("("))
    ) {
      setSearch(
        (character.title &&
          character.title.slice(0, character.title.indexOf("("))) ||
          (character.name &&
            character.name.slice(0, character.name.indexOf("(")))
      );
    } else {
      setSearch(character.title || character.name);
    }
    setClickSeacrhOptions(true);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const limit = 100;
        // const invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;
        const response = await apiClient.get(
          `${endpoint}?name=${search.slice(
            0,
            search.indexOf("(")
          )}&limit=${limit}&skip=${(page - 1) * 100}`
        );

        setData(response.data);
        console.log(response.data, "here");
        setIsLoading(false);
        const numberOfPages = Math.ceil(response.data.count / limit);

        const copyPageArray = [];
        for (let i = 0; i < numberOfPages; i++) {
          copyPageArray.push(i);
        }
        setPageArray(copyPageArray);
      };

      fetchData();
    } catch (error) {
      console.log(error.response);
    }
  }, [page, search]);

  //

  return isLoading ? (
    // <p>Loading ... </p>
    <progress value={null} />
  ) : (
    <>
      <main
        className="main-container"
        onClick={() => {
          setClickSeacrhOptions(true);
        }}
      >
        <h1>Characters</h1>
        {/* <label htmlFor="search"> */}
        <div
          className="comic-header-like character-header-like"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div>
            <FontAwesomeIcon icon="magnifying-glass" />
            <input
              type="text"
              name="search"
              id="search"
              value={search}
              placeholder="Search characters"
              onChange={(event) => {
                setSearch(event.target.value);
                setClickSeacrhOptions(false);
              }}
            />
            {!clickSeacrhOptions && (
              <ul>
                {search &&
                  data.results &&
                  data.results.map((character, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          handleSumbitSearch(character);
                        }}
                      >
                        {character.title || character.name}
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>{" "}
          {search && data.results && (
            <span>found {data.results && data.results.length} results</span>
          )}
          {/* </label> */}
          <Pagination pageArray={pageArray} page={page} setPage={setPage} />
        </div>
        <div
          className="character-container"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {/* {showFavorites && */}
          {favorite.toLowerCase() === "characters" &&
          userFavorites.characters &&
          userFavorites.characters.length > 0
            ? data.results &&
              data.results
                .filter((elem) => userFavorites.characters.includes(elem._id))
                .map((character, index) => {
                  return (
                    <CharacterCard
                      className="character-card"
                      dataItem={character}
                      userFavorites={userFavorites}
                      handleFavorites={handleFavorites}
                      favoriteType="characters"
                      token={token}
                      key={character._id}
                    />
                  );
                })
            : favorite.toLowerCase() === "favorites" &&
              data.results &&
              data.results.map((character, index) => {
                return (
                  <CharacterCard
                    className="character-card"
                    dataItem={character}
                    userFavorites={userFavorites}
                    handleFavorites={handleFavorites}
                    favoriteType="characters"
                    key={character._id}
                    token={token}
                  />
                );
              })}
        </div>
      </main>
    </>
  );
};

export default Characters;
