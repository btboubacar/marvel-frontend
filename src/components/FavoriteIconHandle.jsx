import { useLocation } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FavoriteIconHandle = ({
  favoriteType,
  userFavorites,
  dataItem,
  handleFavorites,
  className,
}) => {
  const location = useLocation();
  console.log(location);
  console.log(location.pathname, `/comic/${dataItem._id}`);
  return (
    <>
      {/* <ReactTooltip
        id="my-tooltip-1"
        place="bottom"
        content="Add to favorites"
      /> */}
      <FontAwesomeIcon
        // data-tooltip-id="my-tooltip-1"
        icon="bookmark"
        className={
          location.pathname === `/comic/${dataItem._id}`
            ? "favorite-icon-com-detail"
            : className
        }
        onClick={() => {
          const isPresent = userFavorites[favoriteType]
            ? userFavorites[favoriteType].find((id) => id === dataItem._id)
            : false;

          // if isPresent => delete id by sending false; else true

          handleFavorites(
            favoriteType,
            dataItem._id,
            !isPresent ? false : true
          );
        }}
        onMouseOver={() => {}}
        style={{
          color:
            userFavorites &&
            userFavorites[favoriteType] &&
            userFavorites[favoriteType].includes(dataItem._id)
              ? "red"
              : "skyblue",
        }}
      />
    </>
  );
};

export default FavoriteIconHandle;
