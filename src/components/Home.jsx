import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getPopularMovies } from "../services/api";
import { useLocation } from "react-router-dom";

function Home({
  movies,
  setMovies,
  loading,
  setLoading,
  searchQuery,
  setSearchQuery,
  toggleInfo,
  setToggleInfo,
  selectedId,
  setSelectedId,
  setError
}) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      const loadPopularMovies = async () => {
        try {
          const popularMovies = await getPopularMovies();
          setMovies(popularMovies);
        } catch (err) {
          console.log(err);
          setError("failed to load Movies");
        } finally {
          setLoading(false);
        }
      };
      loadPopularMovies();
    }
  }, [location.pathname]);

  return (
    <>
      {loading ? (
        <div className="w-[100vw] h-[100vh]  kolo text-xl font-semibold flex items-center text-white justify-center ">
          loading...
        </div>
      ) : (
        <div className="kolor flex justify-around px-10 pt-20 gap-y-8 gap-x-2 w-[100vw] h-[100vh] flex-wrap ">
          {movies.map((data) => (
            <Card
              key={data.id}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              data={data}
              toggleInfo={toggleInfo}
              setToggleInfo={setToggleInfo}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Home;
