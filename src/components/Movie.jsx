import React from "react";

const Movie = ({ data }) => {
  return (
    <ul className="movies-list">
      {data.map((movie, index) => (
        <li className="movie" key={index}>
          <h2>{movie.title}</h2>
          <h3>{movie.release_date}</h3>
          <p>{movie.opening_crawl}</p>
        </li>
      ))}
    </ul>
  );
};

export default Movie;
