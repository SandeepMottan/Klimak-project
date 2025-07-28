import { useMovieContext } from "../contexts/MovieContext";
import InfoCard from "./InfoCard";
import React, { useState } from "react";

function Card({
  data,
  searchQuery,
  setSearchQuery,
  selectedId,
  setSelectedId,
}) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  const favorite = isFavorite(data.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(data.id);
    else addToFavorites(data);
  }

  const [localInfoOpen, setLocalInfoOpen] = useState(false);

  function infoTrigger(id) {
    if (setSelectedId) {
      setSelectedId(id);
    } else {
      setLocalInfoOpen(true);
    }
  }

  return (
    <>
      <div className="text-white flex flex-col h-85 w-52 bg-zinc-600 rounded-md overflow-hidden">
        <div className="image-container w-[100%] h-[80%]">
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
          />
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ❤︎
          </button>
          {(selectedId === data.id || (!selectedId && localInfoOpen)) && (
            <div
              className="movie-overlay"
              onClick={() => {
                if (setSelectedId) setSelectedId(null);
                else setLocalInfoOpen(false);
              }}
            >
              <div className="info-card" onClick={(e) => e.stopPropagation()}>
                <InfoCard data={data} />
              </div>
            </div>
          )}
        </div>

        <div className="h-[30%] bg-zinc-800 flex flex-col justify-start">
          <div className="py-[1px] flex justify-between">
            <p className="px-2 py-1 pt-.5 text-l leading-[1.1] text-balance font-semibold">
              {data.title}
            </p>
            <p className="text-xl w-auto">
              <i
                onClick={() => infoTrigger(data.id)}
                className=" fa-regular fa-square-caret-down"
              ></i>
            </p>
          </div>
          <p className="px-2 pt- text-sm ">
            {data.release_date?.split("-")[0]}
          </p>
        </div>
      </div>
    </>
  );
}

export default Card;
