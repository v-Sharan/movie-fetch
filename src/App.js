import React, { useState, useEffect, useCallback } from "react";
import AddMovie from "./components/AddMovie";
import Movie from "./components/Movie";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // for (const key in data) {
  //   loadedMeals.push({
  //     id: key,
  //     name: data[key].name,
  //     description: data[key].description,
  //     price: data[key].price,
  //   });
  // }

  let MoviesData = [];

  const fetchData = useCallback(async () => {
    setMovies([]);
    try {
      setLoading(true);
      const data = await fetch(
        // GET --> DEFAULT
        "https://moviedatabase-c8855-default-rtdb.asia-southeast1.firebasedatabase.app/movie.json"
      );
      if (!data.ok) {
        //404
        setError("Something went wrong");
      }
      const responeseData = await data.json();
      setLoading(false);
      console.log(responeseData);
      for (let key in responeseData) {
        MoviesData.push({
          id: key,
          title: responeseData[key].title, //const data = {name:"Jones"}  --> data.name
          opening_crawl: responeseData[key].opening_crawl,
          release_date: responeseData[key].release_date,
        });
      }

      setMovies(MoviesData);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddMovie = async (Movie) => {
    console.log(Movie);
    try {
      await fetch(
        "https://moviedatabase-c8855-default-rtdb.asia-southeast1.firebasedatabase.app/movie.json",
        { method: "POST", body: JSON.stringify(Movie) }
      );
      console.log("Data added");
    } catch (err) {
      console.log(err);
    }
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
        {movies.length > 0 && <Movie data={movies} />}
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </section>
    </>
  );
};

export default App;
