import React, { useEffect, useState } from "react";

const MovieCard = ({ data }) => {
  const [movieurl, setUrl] = useState("");
  const fetchImage = async () => {
    const url = `https://moviesminidatabase.p.rapidapi.com/movie/id/${data.imdb_id}/`;
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
      setUrl(result.results.banner);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div className="w-[200px] h-[290px] m-2 border-2 border-darkLBg dark:border-darkDBg bg-lightLBg dark:bg-darkDBg dark:text-darkText text-lightText">
      <img
        src="https://m.media-amazon.com/images/M/MV5BMTc0Njc1MTU5Nl5BMl5BanBnXkFtZTcwMjA4NDE2MQ@@._V1_.jpg"
        alt={data.title}
        className="w-full h-[240px] object-cover"
      />
      <h1 className="text-start px-3 font-bold h-[50px] text-sm">
        {data.title}
      </h1>
    </div>
  );
};

export default MovieCard;
