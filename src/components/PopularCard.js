import React from 'react'
import { useNavigate } from "react-router-dom";
const PopularCard = ({data}) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
      navigate(`/movie/${data.imdb_id}`);
    };
  return (
    <div
      onClick={handleCardClick}
      className="w-[200px] h-[290px] m-2 border-2 border-darkLBg dark:border-darkDBg bg-lightLBg dark:bg-darkDBg dark:text-darkText text-lightText"
    >
      <img
        src={data.image_url}
        alt={data.title}
        className="w-full h-[240px] object-fit"
      />
      <h1 className="text-start px-3 font-bold h-[50px] text-sm">
        {data.title}
      </h1>
    </div>
  );
}

export default PopularCard