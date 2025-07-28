import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchMovies } from "../services/api";

function Navbar({
  movies,
  setMovies,
  error,
  setError,
  loading,
  setLoading,
  searchQuery,
  setSearchQuery,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
      setSearchQuery("");
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("failed to search movies...");
    } finally {
      setLoading(false);
    }
  };
  const handleScroll = () => {
    if (window.scrollY > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={
          scrolled
            ? "glass navbar flex bg-zinc-300 justify-between items-center h-12"
            : "navbar flex bg-zinc-300 justify-between  items-center h-12"
        }
      >
        <div className=" px-8 font-bold text-xl ">
          <Link to="/">Klimak</Link>
        </div>
        <div className=" flex px-1 justify-start w-130 ">
          <Link className="pr-10" to="/">
            Home
          </Link>
          <Link className="pr-10" to="/myList">
            My List
          </Link>
        </div>
        <div className=" flex justify-center gap-1 w-60">
          <button className="pl-10" onClick={toggleSearch}>
            <i className="fa-solid border-none fa-magnifying-glass"></i>
          </button>
          {showSearch && (
            <form
              onSubmit={handleSearch}
              className="search-form flex justify-center"
            >
              <input
                type="text"
                placeholder="search for movies"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-submit-btn">
                Search
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
