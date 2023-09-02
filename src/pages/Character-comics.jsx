import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//
import apiClient from "../api/client";
import CharacterCard from "../components/CharacterCard";

const endpoint = "/character-comics";

const CharacterComics = ({ handleFavorites, userFavorites, favorite }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const { characterId } = useParams();
  // console.log(characterId);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.get(`${endpoint}/${characterId}`);
      // const response = await apiClient.get(
      //   `${endpoint}/5fcf91f4d8a2480017b91453`
      // );

      setData(response.data);
      setIsLoading(false);
      console.log(response.data);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading ... </p>
  ) : (
    <section className="main-container">
      <h1>{data.name} : Comics </h1>
      <div className="character-container">
        {favorite.toLowerCase() === "comics" &&
        userFavorites.comics &&
        userFavorites.comics.length > 0
          ? data.comics
              .filter((elem) => userFavorites.comics.includes(elem._id))
              .map((comic, index) => {
                return (
                  <CharacterCard
                    dataItem={comic}
                    userFavorites={userFavorites}
                    handleFavorites={handleFavorites}
                    favoriteType="comics"
                    className="character-card"
                    key={comic._id}
                  />
                );
              })
          : favorite.toLowerCase() === "favorites" &&
            data.comics.map((comic, index) => (
              <CharacterCard
                dataItem={comic}
                userFavorites={userFavorites}
                handleFavorites={handleFavorites}
                favoriteType="comics"
                className="character-card"
                key={comic._id}
              />
            ))}
      </div>
    </section>
  );
};

export default CharacterComics;
