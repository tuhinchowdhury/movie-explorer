import React, { useEffect, useState } from "react";
import { fetchGenres, fetchActors, fetchDirectors } from "../api";

interface Props {
  onFilterChange: (filters: any) => void;
}

const FilterBar: React.FC<Props> = ({ onFilterChange }) => {
  const [genres, setGenres] = useState<any[]>([]);
  const [actors, setActors] = useState<any[]>([]);
  const [directors, setDirectors] = useState<any[]>([]);

  const [genre, setGenre] = useState("");
  const [actor, setActor] = useState("");
  const [director, setDirector] = useState("");

  useEffect(() => {
    fetchGenres().then(setGenres);
    fetchActors().then(setActors);
    fetchDirectors().then(setDirectors);
  }, []);

  const applyFilters = () => {
    onFilterChange({ genre, actor, director });
  };

  return (
    <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
      <select onChange={(e) => setGenre(e.target.value)} value={genre}>
        <option value="">All Genres</option>
        {genres.map((g) => <option key={g._id} value={g._id}>{g.name}</option>)}
      </select>

      <select onChange={(e) => setActor(e.target.value)} value={actor}>
        <option value="">All Actors</option>
        {actors.map((a) => <option key={a._id} value={a._id}>{a.name}</option>)}
      </select>

      <select onChange={(e) => setDirector(e.target.value)} value={director}>
        <option value="">All Directors</option>
        {directors.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
      </select>

      <button onClick={applyFilters}>Apply</button>
    </div>
  );
};

export default FilterBar;
