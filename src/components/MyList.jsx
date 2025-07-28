import Card from "./Card";
import { useMovieContext } from "../contexts/MovieContext";

function MyList() {
  const { favorites } = useMovieContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="w-full h-full pt-13 px-4">
        <h2 className="text-black font-bold text-xl pl-5 pt-">
          Your Favorites
        </h2>
        <div className="kolor flex justify-start px-10 pt-5 gap-4 text-l flex-wrap ">
          {favorites.map((data) => (
            <Card data={data} key={data.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="kolor w-[100vw] text-black h-[100vh] flex items-center justify-center text-xl font-bold">
      <p>My List is empty</p>
    </div>
  );
}

export default MyList;
