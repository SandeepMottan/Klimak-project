import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MyList from "./components/MyList";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./contexts/MovieContext";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [toggleInfo, setToggleInfo] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [genre, setGenre] = useState([]);

  return (
    <MovieProvider>
      <div>
        <Navbar
          loading={loading}
          setLoading={setLoading}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          error={error}
          setError={setError}
          movies={movies}
          setMovies={setMovies}
        />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              loading={loading}
              setLoading={setLoading}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              movies={movies}
              setMovies={setMovies}
              toggleInfo={toggleInfo}
              setToggleInfo={setToggleInfo}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              setError={setError}
            />
          }
        />

        <Route path="/myList" element={<MyList />} />
      </Routes>
    </MovieProvider>
  );
}

export default App;
