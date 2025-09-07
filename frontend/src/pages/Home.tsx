import React, { useEffect, useState } from "react";
import { fetchMovies } from "../api";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState<any[]>([]);

  const loadMovies = (filters: any = {}) => {
    fetchMovies(filters).then(setMovies);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div>
      <FilterBar onFilterChange={loadMovies} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map((m) => <MovieCard key={m._id} movie={m} />)}
      </div>
    </div>
  );
};

export default Home;
