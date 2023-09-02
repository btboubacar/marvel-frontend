import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import apiClient from "../api/client";
import ComicCard from "../components/ComicCard";

//
const endpoint = "/comic";
//
const ComicDetail = ({ userFavorites, handleFavorites }) => {
  const { comicId } = useParams();
  console.log(comicId);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`${endpoint}/${comicId}`);
        // const response = await apiClient.get(
        //   `${endpoint}/5fce13de78edeb0017c92d68`
        // );

        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <section className="main-container">
      {/* <h1>Comics : {data.name} </h1> */}
      <ComicCard
        dataItem={data}
        userFavorites={userFavorites}
        handleFavorites={handleFavorites}
        favoriteType="comics"
        className="comic-card comic-detail"
        key={data._id}
      />
    </section>
  );
};

export default ComicDetail;
