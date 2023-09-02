import Cookies from "js-cookie";
const handleFavorites = (type, id, userFavorites, setUserFavorites) => {
  let value = [];
  if (type && id) {
    if (Cookies.get(`__marvel_${type}_favorites`)) {
      value = JSON.parse(Cookies.get(type));
      console.log(value);
      // Cookies.set(`__marvel_${type}_favorites`, JSON.stringify(value));
    } else {
      value = JSON.stringify([id]);
      console.log(JSON.stringify([id]));
      console.log(value);
    }
    const copyFavorites = { ...userFavorites };
    if (type === "char") {
      copyFavorites.characters = value;
    } else {
      copyFavorites.comics = value;
    }
    setUserFavorites(copyFavorites);
  } else {
    Cookies.remove(`__marvel_${type}_favorites`);
  }
};

export default handleFavorites;
