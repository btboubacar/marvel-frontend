import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  showFavorites,
  setShowFavorites,
  favorite,
  setFavorite,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [pageArray, setPageArray] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const fetchData = async () => {
        const limit = 100;
        const response = await apiClient.get(
          `${endpoint}?name=${search}&limit=${limit}&skip=${(page - 1) * 100}`
        );

        setData(response.data);
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
      <main className="main-container">
        <h1>Characters</h1>
        {/* <label htmlFor="search"> */}
        <div className="comic-header-like">
          <FontAwesomeIcon icon="magnifying-glass" />
          <input
            type="text"
            name="search"
            id="search"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />{" "}
          {search && <span>found {data.results.length} results</span>}
          {/* </label> */}
          <Pagination pageArray={pageArray} page={page} setPage={setPage} />
        </div>
        <p
          style={{ margin: "20px" }}
          onClick={() => {
            setShowFavorites(!showFavorites);
          }}
        >
          {showFavorites ? "Show all" : "Show favorites"}
        </p>
        <p
          onClick={() => {
            handleFavorites("char", null, true);
          }}
        >
          delete favorites
        </p>
        <div className="character-container">
          {/* {showFavorites && */}
          {favorite.toLowerCase() === "characters" &&
          userFavorites.characters &&
          userFavorites.characters.length > 0
            ? data.results
                .filter((elem) => userFavorites.characters.includes(elem._id))
                .map((character, index) => {
                  return (
                    <CharacterCard
                      className="character-card"
                      dataItem={character}
                      userFavorites={userFavorites}
                      handleFavorites={handleFavorites}
                      favoriteType="characters"
                      key={character._id}
                    />
                  );
                })
            : favorite.toLowerCase() === "favorites" &&
              data.results.map((character, index) => {
                return (
                  <CharacterCard
                    className="character-card"
                    dataItem={character}
                    userFavorites={userFavorites}
                    handleFavorites={handleFavorites}
                    favoriteType="characters"
                    key={character._id}
                  />
                );
              })}
        </div>
      </main>
    </>
  );
};

export default Characters;
