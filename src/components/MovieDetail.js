import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CartCarousel from "./CartCarousel";
import { useUser } from "../context/userContext";

function MovieDetail() {
  const { id } = useParams();
  const { user } = useUser(); 
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  const addToFavorites = () => {
    const userId=localStorage.getItem("UserID");
    if (!user && !userId) {
      alert("You need to be logged in to add favorites.");
      return;
    }
    
    try {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (!favorites.some((fav) => fav.imdb_id === movie.imdb_id)) {
        favorites.push(movie);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Added to favorites");
      } else {
        alert("Already in favorites");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add to favorites.");
    }

    /*try {
      const response = await axios.post(
        "http://localhost:3001/api/addFavorite",
        {
          userId: userId, 
          movieId: id,
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error(
        "Error adding to favorites:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to add to favorites.");
    }*/
  };

  useEffect(() => {
    const getCast = async () => {
      const url = `https://moviesminidatabase.p.rapidapi.com/movie/id/${id}/cast/`;
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
        setCast(result?.results?.roles || []);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMovieDetails = async () => {
      const url = `https://moviesminidatabase.p.rapidapi.com/movie/id/${id}/`;
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
        setMovie(result.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
    getCast();
  }, [id]);

  return (
    <div>
      {movie ? (
        <div className="bg-lightLBg dark:bg-gray-800 shadow-lg p-6 flex flex-col min-h:[100vh]">
          <div className="flex flex-col md:flex-row">
            <img
              src={movie.image_url}
              alt={movie.title}
              className="w-full md:w-1/4 rounded-lg mb-7 md:mb-1 md:mr-6 h-[50vh]"
            />
            <div className="flex flex-col justify-between items-center md:w-3/4">
              <h1 className="text-2xl font-bold text-lightText dark:text-white">
                {movie.title} ({movie.year})
              </h1>
              <p className="text-lightText dark:text-gray-400 mt-4">
                {movie.plot}
              </p>
              <div className="mt-4 w-[100%] md:px-4">
                <div className="flex justify-evenly items-center w-[100%]">
                  <div>
                    <p className="text-lightText dark:text-white">
                      <strong>Rating: </strong>
                    </p>
                    <div className="text-lightText dark:text-white">
                      <div className="flex flex-col md:flex-row pt-1 md:pt-0">
                        <p>{movie.content_rating}</p>
                        <p className="py-1 px-0 md:px-2 md:py-0">
                          {"⭐" + movie.rating} /10
                        </p>
                      </div>
                    </div>
                    <p className="text-lightText dark:text-white mt-2">
                      <strong>Release Date:</strong>
                    </p>
                    <p className="text-lightText dark:text-white">
                      {movie.release}
                    </p>
                  </div>
                  <div>
                    <div className="text-lightText dark:text-white mr-7 md:mr-9">
                      <p>
                        <strong>Genres:</strong>
                      </p>
                      {movie.gen.map((g,id) => (
                        <p key={id} className="dark:text-gray-400">{g.genre}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[100%] flex items-center justify-center">
                <a
                  href={movie.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 my-4 w-[40%] md:w-[18%] justify-center bg-[#03346E] flex items-center hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                  Watch Trailer
                </a>
                <p
                  onClick={addToFavorites}
                  className="mt-7 my-4 mx-5 md:mx-5 w-[40%] md:w-[18%] justify-center bg-[#03346E] flex items-center hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                  Add to Favorite
                </p>
              </div>
              <div className="text-gray-800 dark:text-white flex flex-wrap md:flex-row w-[100%] justify-center items-center">
                {movie.keywords.map((k,id) => (
                  <p key={id} className="p-2 bg-lightLBg dark:bg-transparent border-[0.25px] border-lightDBg dark:border-gray-400 m-2 shadow-2xl rounded-md text-xs font-semibold text-lightText dark:text-gray-400">
                    {k.keyword}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col max:h-[33vh]">
            <p className="pt-3 pb-3 md:pb-0 md:pt-3 text-lg text-lightText dark:text-darkText font-bold">
              Movie Cast
            </p>
            <CartCarousel cast={cast} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MovieDetail;
