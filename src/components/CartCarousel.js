import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";

const CastCarousel = ({ cast }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsToShow(2);
      } else if (width < 768) {
        setItemsToShow(3);
      } else if (width < 1024) {
        setItemsToShow(5);
      } else if (width < 1280) {
        setItemsToShow(8);
      } else if (width < 1536) {
        setItemsToShow(10);
      } else {
        setItemsToShow(10);
      }
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);

    return () => {
      window.removeEventListener("resize", updateItemsToShow);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsToShow >= cast.length
        ? prevIndex
        : prevIndex + itemsToShow
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsToShow < 0 ? prevIndex : prevIndex - itemsToShow
    );
  };

  return (
    <div className="md:h-[27.5vh] flex justify-center items-center relative">
      <button
        onClick={handlePrev}
        className="absolute left-0 z-10 hover:bg-lightText dark:hover:bg-gray-300 dark:text-white p-2 rounded"
        disabled={currentIndex === 0}
      >
        &lt;
      </button>

      <div className="flex overflow-hidden mx-4">
        {cast
          .slice(currentIndex, currentIndex + itemsToShow)
          .map((actor, index) => (
            <div
              key={index}
              className="flex flex-col w-[250px] h-[150px] items-center border-lightDBg dark:border-gray-400 border-[0.5px] border-solid mx-4 dark:bg-gray-800 dark:text-darkText bg-lightLBg p-3 rounded-lg"
            >
              <CgProfile className="text-5xl text-lightDBg dark:text-gray-400 py-2" />
              <strong className="text-center line-clamp-2 text-xs">
                {actor.actor.name}
              </strong>
              <span className="text-center line-clamp-2 text-xs py-1">
                {actor.role}
              </span>
            </div>
          ))}
      </div>

      <button
        onClick={handleNext}
        className="absolute right-0 z-10 hover:bg-lightText hover:dark:bg-gray-400 p-2 rounded dark:text-white"
        disabled={currentIndex + itemsToShow >= cast.length}
      >
        &gt;
      </button>
    </div>
  );
};

export default CastCarousel;
