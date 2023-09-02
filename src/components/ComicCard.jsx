import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//
import FavoriteIconHandle from "./FavoriteIconHandle";

//
const ComicCard = ({
  dataItem,
  className,
  handleFavorites,
  userFavorites,
  favoriteType,
}) => {
  const [isExpended, setIsExpended] = useState(false);

  return (
    <div className={className}>
      <Link to={`/comic/${dataItem._id}`}>
        <img
          src={`${dataItem.thumbnail.path}.${dataItem.thumbnail.extension}`}
          alt={dataItem.name}
        />
      </Link>
      <div>
        <Link to={`/comic/${dataItem._id}`}>
          <h2>{dataItem.name || dataItem.title}</h2>
        </Link>

        {dataItem.description && (
          <section>
            {!dataItem.description.length > 65
              ? dataItem.description
              : isExpended
              ? dataItem.description
              : dataItem.description.slice(0, 65)}
            <p onClick={() => setIsExpended(!isExpended)}>
              {isExpended ? "less" : "more"}
            </p>
            {/* {dataItem.description.length > 100
              ? dataItem.description.slice(0, 100) + "..."
              : dataItem.description} */}
          </section>
        )}
        <FavoriteIconHandle
          userFavorites={userFavorites}
          dataItem={dataItem}
          handleFavorites={handleFavorites}
          favoriteType={favoriteType}
          className="favorite-icon-com "
        />
      </div>
    </div>
  );

  // })}
  // </div>
};

export default ComicCard;
