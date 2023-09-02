import { useEffect, useState } from "react";

//
import apiClient from "../api/client";
import ComicCard from "../components/ComicCard";
import Pagination from "../components/Pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//
const endpoint = "/comics";

const Comics = ({ userFavorites, handleFavorites, favorite }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [pageArray, setPageArray] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const fetchData = async () => {
        const title = "";
        const limit = 100;
        const response = await apiClient.get(
          `${endpoint}?title=${search}&limit=${limit}&skip=${(page - 1) * 100}`
        );

        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        const numberOfPages = Math.ceil(response.data.count / limit);

        const copyPageArray = [];
        for (let i = 0; i < numberOfPages; i++) {
          copyPageArray.push(i);
        }
        setPageArray(copyPageArray);
      };

      //
      fetchData();
    } catch (error) {
      console.log(error.response);
    }
  }, [page, search]);

  return isLoading ? (
    <progress value={null} />
  ) : (
    <main className="comic-main-container">
      <h1>Comics</h1>
      <div className="comic-header-like">
        {/* <label htmlFor="search"> */}
        <FontAwesomeIcon icon="magnifying-glass" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search comics"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />{" "}
        {search && <span>found {data.results.length} results</span>}
        {/* </label> */}
        <Pagination pageArray={pageArray} page={page} setPage={setPage} />
      </div>

      <div className="comic-container">
        {favorite.toLowerCase() === "comics" &&
        userFavorites.comics &&
        userFavorites.comics.length > 0
          ? data.results
              .filter((elem) => userFavorites.comics.includes(elem._id))
              .sort((charA, charB) => charA.title.localeCompare(charB.title))
              .map((character, index) => {
                return (
                  <ComicCard
                    dataItem={character}
                    userFavorites={userFavorites}
                    handleFavorites={handleFavorites}
                    favoriteType="comics"
                    className="comic-card"
                    key={character._id}
                  />
                );
              })
          : favorite.toLowerCase() === "favorites" &&
            data.results
              .sort((charA, charB) => charA.title.localeCompare(charB.title))
              .map((character, index) => {
                return (
                  <ComicCard
                    dataItem={character}
                    userFavorites={userFavorites}
                    handleFavorites={handleFavorites}
                    favoriteType="comics"
                    className="comic-card"
                    key={character._id}
                  />
                );
              })}
      </div>
    </main>
  );
};

export default Comics;
