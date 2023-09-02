import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
//
import FavoriteIconHandle from "./FavoriteIconHandle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CharacterCard = ({
  dataItem,
  className,
  handleFavorites,
  userFavorites,
  favoriteType,
}) => {
  // const [selected, setSelected] = useState(false);
  // console.log(userFavorites);
  return (
    <div className={className}>
      <Link to={`/character-comics/${dataItem._id}`}>
        <img
          src={`${dataItem.thumbnail.path}.${dataItem.thumbnail.extension}`}
          alt={dataItem.name}
        />
        <h2>{dataItem.name || dataItem.title}</h2>
      </Link>
      <FavoriteIconHandle
        userFavorites={userFavorites}
        dataItem={dataItem}
        handleFavorites={handleFavorites}
        favoriteType={favoriteType}
        className="favorite-icon-char"
      />
      {dataItem.description && (
        <p>
          {dataItem.description.length > 100
            ? dataItem.description.slice(0, 100) + "..."
            : dataItem.description}
        </p>
      )}
    </div>
  );

  // })}
  // </div>
};

export default CharacterCard;
