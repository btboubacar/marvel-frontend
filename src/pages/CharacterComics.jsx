import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//
import apiClient from "../api/client";
import CharacterCard from "../components/CharacterCard";
import ComicCard from "../components/ComicCard";

const endpoint = "/character-comics";

const CharacterComics = ({
  handleFavorites,
  userFavorites,
  favorite,
  token,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const { characterId } = useParams();
  // console.log(characterId);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.get(`${endpoint}/${characterId}`);

      setData(response.data);
      setIsLoading(false);
      console.log(response.data);
    };

    fetchData();
  }, [characterId]);

  return isLoading ? (
    <p>Loading ... </p>
  ) : (
    <section className="main-container">
      <h1>{data.name} : Comics </h1>
      <div
        className="character-container"
        onClick={(event) => {
          event.stopPropagation();
          // setNavBarVisibility(false);
        }}
      >
        {favorite.toLowerCase() === "comics" &&
        userFavorites.comics &&
        userFavorites.comics.length > 0
          ? data.comics
              .filter((elem) => userFavorites.comics.includes(elem._id))
              .map((comic, index) => {
                return (
                  <ComicCard
                    dataItem={comic}
                    userFavorites={userFavorites}
                    handleFavorites={handleFavorites}
                    favoriteType="comics"
                    // className="character-card"
                    className="comic-card"
                    token={token}
                    key={comic._id}
                    char={true}
                  />
                );
              })
          : favorite.toLowerCase() === "favorites (none)" &&
            data.comics.map((comic, index) => (
              <ComicCard
                dataItem={comic}
                userFavorites={userFavorites}
                handleFavorites={handleFavorites}
                favoriteType="comics"
                // className="character-card"
                className="comic-card"
                token={token}
                key={comic._id}
                char={true}
              />
            ))}
      </div>
    </section>
  );
};

export default CharacterComics;
