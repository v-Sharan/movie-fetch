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

  const fetchData = useCallback(async () => {
    setMovies([]);
    try {
      setLoading(true);
      const data = await fetch(
        "https://moviedatabase-c8855-default-rtdb.asia-southeast1.firebasedatabase.app/data.json"
      );
      if (!data.ok) {
        //404
        setError("Something went wrong");
      }
      const responeseData = await data.json();
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://moviefetching-default-rtdb.asia-southeast1.firebasedatabase.app/data.json"
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddMovie = async (Movie) => {
    try {
      const response = await fetch(
        "https://moviefetching-default-rtdb.asia-southeast1.firebasedatabase.app/data.json",
        { method: "POST", body: JSON.stringify(Movie) }
      );
      const data = await response.json();
      console.log(data);
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
