import { useState, useEffect } from "react";
import { BiSolidCameraMovie } from "react-icons/bi";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import MovieDetail from "./components/MovieDetail";
import { useUser } from "./context/userContext";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import FavoritesPage from "./components/FavoritesPage";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import { topMovies } from "./data";
import PopularCard from "./components/PopularCard";

function App() {
  const [theme, setTheme] = useState("dark");
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [popular,setPopular]=useState([]);
  const [noResults, setNoResults] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const body = document.querySelector("body");
    const currentTheme = body.getAttribute("data-theme");
    if (!currentTheme) {
      body.setAttribute("data-theme", "dark");
      body.classList.add("dark");
    } else {
      setTheme(currentTheme);
      if (currentTheme === "dark") {
        body.classList.add("dark");
      } else {
        body.classList.add("light");
      }
    }
  }, []);
   const handleSearch = async (query) => {
     const url = `https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/${query}/`;
     const options = {
       method: "GET",
       headers: {
         "x-rapidapi-key": "60a85f348fmsh4281a45118651b1p1247ddjsn1d04db8e8cde",
         "x-rapidapi-host": "moviesminidatabase.p.rapidapi.com",
       },
     };

     try {
       const response = await fetch(url, options);
       const result = await response.json();
       if (result.results && result.results.length > 0) {
         setPopular(result.results);
       } else {
         setData([]);
       }
     } catch (error) {
       console.error(error);
       setData([]);
       setNoResults(true);
     }
   };
  const handleMovieClick = (imdb_id) => {
    navigate(`/movie/${imdb_id}`);
  };
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchMovies = async (searchQuery) => {
    const url = `https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/${searchQuery}/`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        "x-rapidapi-host": "moviesminidatabase.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result.results && result.results.length > 0) {
        setData(result.results);
        setNoResults(false);
      } else {
        setData([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error(error);
      setData([]);
      setNoResults(true);
    }
  };
  useEffect(() => {
  }, [user]);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      fetchMovies(debouncedQuery);
    } else {
      setData([]);
      setNoResults(false);
    }
  }, [debouncedQuery]);

  const handleToggle = () => {
    const body = document.querySelector("body");
    const themecc = body.getAttribute("data-theme");
    if (themecc === "light") {
      body.setAttribute("data-theme", "dark");
      body.classList.add("dark");
      body.classList.remove("light");
      setTheme("dark");
    } else {
      body.setAttribute("data-theme", "light");
      body.classList.add("light");
      body.classList.remove("dark");
      setTheme("light");
    }
  };
  const handleFirstSearch=async ()=>{
    const url =
      "https://moviesminidatabase.p.rapidapi.com/movie/order/byPopularity/";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "60a85f348fmsh4281a45118651b1p1247ddjsn1d04db8e8cde",
        "x-rapidapi-host": "moviesminidatabase.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setPopular(result.results.slice(0,10));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(()=>{
    //handleFirstSearch();
  },[])
  useEffect(()=>{

  },[popular])
  return (
    <div className="w-full bg-darkLBg dark:bg-darkDBg">
      <div className="h-[9vh] w-full flex items-center justify-between dark:bg-darkDBg bg-lightDBg font-bold">
        <div className="text-lightLBg dark:text-darkText flex items-center ml-3 md:ml-5">
          <span>
            <BiSolidCameraMovie className="text-3xl" />
          </span>
          <span>Den</span>
        </div>
        <div className="text-lightLBg dark:text-darkText">
          <ol className="flex gap-3 items-center">
            <Link to="/">
              <li>Home</li>
            </Link>
            <li className="flex justify-center items-center text-2xl">
              <Link to="/favorite">
                <GrFavorite />
              </Link>
            </li>
            {!user ? (
              <Link to="/login">
                <li>Login</li>
              </Link>
            ) : (
              <li>{user}</li>
            )}
            <li onClick={handleToggle} className="cursor-pointer mr-2 md:mr-5">
              {theme === "light" ? (
                <MdDarkMode className="text-2xl" />
              ) : (
                <MdLightMode className="text-2xl" />
              )}
            </li>
          </ol>
        </div>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-full ">
              <div className="w-full flex justify-center items-center my-4 relative">
                <input
                  onChange={handleChange}
                  value={query}
                  type="text"
                  className="w-[75%] h-[5vh] border-2 px-2 border-darkLBg dark:border-darkDBg
                       hover:border-lightDBg dark:hover:border-darkDBg
                       focus:border-lightDBg dark:focus:border-darkDBg"
                  placeholder="Search for movies..."
                />
                {/*<div
                  onClick={() => handleSearch(query)}
                  className="h-[5vh] w-[30px] flex justify-center items-center dark:text-darkText bg-darkLBg dark:bg-darkDBg"
                >
                  <FaSearch />
                </div>*/}
                {query && (
                  <ul className="absolute top-[5vh] w-[75%] max-h-[200px]  bg-lightLBg dark:bg-darkDBg border border-darkDBg dark:border-darkDBg overflow-y-auto shadow-lg z-10">
                    {noResults ? (
                      <li className="p-2 text-center dark:text-white">
                        No results found
                      </li>
                    ) : (
                      data.map((movie) => (
                        <li
                          key={movie.imdb_id}
                          onClick={() => handleMovieClick(movie.imdb_id)}
                          className="p-2 hover:bg-lightDBg bg-lightLBg dark:bg-[#2d2e32] hover:dark:bg-darkDBg dark:text-darkText dark:hover:lightText dark:hover:bg-darkLBg hover:text-lightLBg cursor-pointer"
                        >
                          {movie.title}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
              <div className="w-full flex justify-center items-center">
                <div className="w-full flex flex-wrap justify-center items-center">
                  {topMovies.length > 0 &&
                    topMovies.map((movie, id) => (
                      <PopularCard key={id} data={movie} />
                    ))}
                </div>
              </div>
            </div>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/favorite"
          element={<ProtectedRoute component={FavoritesPage} />}
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
