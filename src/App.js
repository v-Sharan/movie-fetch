import React, { useState, useEffect, useCallback } from "react";
import AddMovie from "./components/AddMovie";
import Movie from "./components/Movie";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setMovies([]);
    try {
      setLoading(true);
      const data = await fetch("https://swapi.dev/api/films/");
      if (!data.ok) {
        //404
        setError("Something went wrong");
      }
      const responeseData = await data.json();
      setLoading(false);
      setMovies(responeseData.results);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddMovie = (data) => {
    setMovies([...movies, data]);
    console.log(movies);
  };

  return (
    <>
      <section>
        <AddMovie handleFunction={handleAddMovie} />
      </section>
      <section>
        <button onClick={fetchData}>Fetch data</button>
      </section>
      <section>
        <Movie data={movies} />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </section>
    </>
  );
};

export default App;
