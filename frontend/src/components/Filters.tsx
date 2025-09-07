import React, { useEffect, useState } from "react";

interface Genre { _id: string; name: string }
interface Actor { _id: string; name: string }
interface Director { _id: string; name: string }

interface FiltersProps {
  onFilter: (filters: { genre?: string; actor?: string; director?: string }) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilter }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [directors, setDirectors] = useState<Director[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedActor, setSelectedActor] = useState<string>("");
  const [selectedDirector, setSelectedDirector] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:8000/genres").then(r => r.json()).then(setGenres);
    fetch("http://localhost:8000/actors").then(r => r.json()).then(setActors);
    fetch("http://localhost:8000/directors").then(r => r.json()).then(setDirectors);
  }, []);

  useEffect(() => {
    onFilter({ genre: selectedGenre, actor: selectedActor, director: selectedDirector });
  }, [selectedGenre, selectedActor, selectedDirector]);

  return (
    <div className="flex gap-4 p-4 bg-gray-100 rounded-lg">
      <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g._id} value={g._id}>{g.name}</option>
        ))}
      </select>

      <select value={selectedActor} onChange={(e) => setSelectedActor(e.target.value)}>
        <option value="">All Actors</option>
        {actors.map((a) => (
          <option key={a._id} value={a._id}>{a.name}</option>
        ))}
      </select>

      <select value={selectedDirector} onChange={(e) => setSelectedDirector(e.target.value)}>
        <option value="">All Directors</option>
        {directors.map((d) => (
          <option key={d._id} value={d._id}>{d.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
