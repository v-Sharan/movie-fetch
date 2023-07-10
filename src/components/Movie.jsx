import React from "react";

const Movie = ({ data }) => {
  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://moviedatabase-c8855-default-rtdb.asia-southeast1.firebasedatabase.app/movie/${id}.json`,
        { method: "DELETE" }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ul className="movies-list">
      {data.map((movie, index) => (
        <li className="movie" key={index}>
          <h2>{movie.title}</h2>
          <h3>{movie.release_date}</h3>
          <p>{movie.opening_crawl}</p>
          <div>
            <button onClick={() => handleDelete(movie.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Movie;
