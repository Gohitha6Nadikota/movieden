*Project Overview*


The project is a Movie Search Web Application developed using a robust stack of modern technologies including ReactJS, NodeJS, MongoDB, and Tailwind CSS.

The frontend of the application features dynamic movie display and search functionalities powered by the Movie Mini Database API.

Users can view popular movies, search for specific titles, and access detailed information including synopses, release dates, and cast details.

The application also includes a favorites management system that allows users to save and organize their preferred movies, and offers theme customization with options for dark and light modes.


On the backend, RESTful APIs developed with Express facilitate interactions between the frontend and the server.

These APIs handle movie data retrieval, user authentication, and favorites management, with secure user sessions managed using JWT and cross-origin requests enabled through CORS.

The project ensures a seamless and responsive user experience across various devices, emphasizing clean code, intuitive design, and efficient API integration.

Optional features like user authentication and theme customization further enhance the application's functionality and user experience.


*Setup Instructions*

 In the command line enter the following
 
 1. git clone -b master https://github.com/Gohitha6Nadikota/movieden.git

 2. cd movieden
 
 3. npm install
 
 4. npm start to start react 

 5. node server.js to start backend


*API Usage Details*

  I utilized the Movies Mini Database API from RapidAPI for key functionalities in the project:

  1. listgetMoviesOrderByPopularitys:

   Purpose: Fetches the most popular movies.

   Usage: Displays trending movies on the main page.

  2. listgetCastByMovieIds:

   Purpose: Retrieves cast information for a specific movie.

   Usage: Provides detailed casting info when viewing a movie’s details.

  3. retrievegetMovieByImdbId:

   Purpose: Gets detailed movie information using its IMDb ID.

   Usage: Shows comprehensive movie details upon selection.

  4. retrievegetMoviesByKeywords:

   Purpose: Suggests movies based on search keywords.

   Usage: Implements the search functionality for user queries.


*Screenshots*

![bg1](https://github.com/user-attachments/assets/30357ec8-52c1-4491-848e-e51d3b880a19)

![search1](https://github.com/user-attachments/assets/52cc2ade-4111-4c2a-b944-2cd4f49f8e4c)

![Login1](https://github.com/user-attachments/assets/e979ec23-e1c3-4657-b2ee-7f7bc000ca06)

![Register1](https://github.com/user-attachments/assets/bed4a528-165d-4253-a21e-eb5f7b040a08)

![MovieDetail1](https://github.com/user-attachments/assets/6c2d8f37-b124-4121-ab39-aff0c0c74754)

![Favorites1](https://github.com/user-attachments/assets/928e1234-55f6-496a-b1c6-7a016299d940)

![bg](https://github.com/user-attachments/assets/3060f0cc-ffa5-4f2e-baed-7563ea53599a)

![search2](https://github.com/user-attachments/assets/72fa36c5-ec3d-450f-89a0-2c521bb3a0d1)

![Login2](https://github.com/user-attachments/assets/39c34e14-4139-4acc-9774-ffcd2ac9030c)

![Register2](https://github.com/user-attachments/assets/b9eb85ed-7c75-4842-820e-8cdf0e2a5a05)

![MovieDetail2](https://github.com/user-attachments/assets/80d1dc96-7c9c-45e6-a60e-50d4093c1eaf)

![Favorites2](https://github.com/user-attachments/assets/bd8a5d3d-d8f6-4ec6-b642-19a73c88bc3c)

![Screenshot_2024-08-30-09-22-58-89_40deb401b9ffe8e1df2f1cc5ba480b12](https://github.com/user-attachments/assets/6564907d-d23f-424d-abf5-0bbf7dc350d5)

![Screenshot_2024-08-30-09-23-21-95_40deb401b9ffe8e1df2f1cc5ba480b12](https://github.com/user-attachments/assets/c8284aef-7c4f-4244-bfd9-fc20a065566f)

![Screenshot_2024-08-30-09-22-30-25_40deb401b9ffe8e1df2f1cc5ba480b12](https://github.com/user-attachments/assets/aea34f24-d0fe-4959-a522-6809594c3fcd)

![s2](https://github.com/user-attachments/assets/9cd9cedd-7c20-4efc-aebd-008afcd74ce8)

![Screenshot_2024-08-30-09-23-28-72_40deb401b9ffe8e1df2f1cc5ba480b12](https://github.com/user-attachments/assets/c4b71e64-9259-46fb-b749-c4c36574708b)

![Screenshot_2024-08-30-09-25-29-13_40deb401b9ffe8e1df2f1cc5ba480b12](https://github.com/user-attachments/assets/98ed52f7-3759-496c-a4f1-39f6b08fd4ee)

![Screenshot_2024-08-30-09-23-06-62_40deb401b9ffe8e1df2f1cc5ba480b12](https://github.com/user-attachments/assets/62be926b-9d89-4197-8897-f73138268092)

![Screenshot_2024-08-30-09-23-19-02_40deb401b9ffe8e1df2f1cc5ba480b12](https://github.com/user-attachments/assets/afd22df8-92fa-4d7b-bfea-3996c4050963)

![Screenshot_2024-08-30-09-22-40-97_40deb401b9ffe8e1df2f1cc5ba480b12](https://github.com/user-attachments/assets/dc7300a0-d878-4c28-9786-6cf706245bb4)

![S1](https://github.com/user-attachments/assets/6c817ad2-ab2f-424e-bf9d-45075cec823d)

![Screenshot_2024-08-30-09-26-09-58_40deb401b9ffe8e1df2f1cc5ba480b12](https://github.com/user-attachments/assets/d1b491f8-5e45-4ad7-9f4f-cd554e5cbac1)

*Brief Description of Approach*

   In this project, I have developed a web application utilizing a range of modern technologies including ReactJS, NodeJS, MongoDB, Tailwind CSS, and several key libraries and tools.          Here’s a summary of my approach and implementation details:

   Technologies Used:
 
   Frontend: ReactJS, Tailwind CSS, axios, fetch, react-router-dom

   Backend: NodeJS, Express, bcryptjs, cors, JWT

   Database:MongoDB

   Frontend Implementation:

   1. Movie Display and Search Functionality:

   - Initially, the app displays popular movies using the `listgetMoviesOrderByPopularitys` function.

   - Implemented a search feature using `retrievegetMoviesByKeywords`, which allows users to search for movies by keywords.

   - Detailed views of movies are fetched using the `retrievegetMovieByImdbId` function.

   - Movie casting information is retrieved with `listgetCastByMovieIds`, providing users with cast details.

   2. User Authentication:

   - Implemented login and registration functionalities, storing user credentials and data securely in MongoDB using **bcryptjs** for password hashing.

   3. Favorites Management:

   - Users can manage their favorite movies, with functionality to add movies to their favorites list, which is accessible on a dedicated favorites page.

   4. Theme Customization:

   - Incorporated theme functionality allowing users to switch between dark and light modes, enhancing the user experience.


  Backend Implementation:

  API Development:
 
  - Developed RESTful APIs using Express to handle various operations such as fetching movies, user authentication, and managing favorites.

  - Used JWT for secure user authentication and session management.

  - Enabled CORS to allow cross-origin requests from the frontend.

  Key Features:

  - Movie Popularity Display: Automatically showcases trending movies on the main page.

  - Search and Detail View: Users can search for movies and view detailed information.

  - User Authentication: Secure login and registration processes.

  - Favorites System: Allows users to manage a personalized list of favorite movies.

  - Dark/Light Mode: Provides a customizable viewing experience based on user preference.


I have commented some code due to rate limiting on the API. Please have a look at my commented code too. Thank you.  
 
