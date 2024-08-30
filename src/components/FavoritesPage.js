import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
    setMovies(storedFavorites);
    console.log(storedFavorites);
  }, []);

 /* useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const moviePromises = favorites.map((id) =>
        axios.get(`https://moviesminidatabase.p.rapidapi.com/movie/id/${id}/`, {
          headers: {
            "x-rapidapi-key": process.env.REACT_APP_API_KEY,
            "x-rapidapi-host": "moviesminidatabase.p.rapidapi.com",
          },
        })
      );

      try {
        const movieResponses = await Promise.all(moviePromises);
        const movieData = movieResponses.map(
          (response) => response.data.results
        );
        setMovies(movieData);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };

    if (favorites.length > 0) {
      //fetchFavoriteMovies();
    }
  }, [favorites]);*/

  return (
    <div className="favorites-page bg-lightLBg dark:bg-gray-800 min-h-[100vh] p-6">
      <h1 className="text-3xl font-bold text-lightText dark:text-white mb-6">
        My Favorites
      </h1>
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies && movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="favorite-item bg-lightDBg dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={movie.image_url}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-lightText dark:text-white">
                  {movie.title} ({movie.year})
                </h2>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-lightText dark:text-gray-400">
          No favorites added yet.
        </p>
      )}
    </div>
  );
};

export default FavoritesPage;
