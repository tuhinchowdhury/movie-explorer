import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../api";

function MovieList() {
  const [movies, setMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [actors, setActors] = useState<any[]>([]);
  const [directors, setDirectors] = useState<any[]>([]);

  const [genre, setGenre] = useState("");
  const [actor, setActor] = useState("");
  const [director, setDirector] = useState("");

  useEffect(() => {
    fetchMovies();
    fetchFilters();
  }, []);

  const fetchMovies = async () => {
    const data = await getMovies({ genre, actor, director });
    setMovies(data);
  };

  const fetchFilters = async () => {
    try {
      const [g, a, d] = await Promise.all([
        fetch("http://localhost:8000/genres").then((res) => res.json()),
        fetch("http://localhost:8000/actors").then((res) => res.json()),
        fetch("http://localhost:8000/directors").then((res) => res.json()),
      ]);

      setGenres(g);
      setActors(a);
      setDirectors(d);
    } catch (err) {
      console.error("Error fetching filters", err);
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {/* Genre Dropdown */}
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border p-1"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g._id} value={g._id}>
              {g.name}
            </option>
          ))}
        </select>

        {/* Actor Dropdown */}
        <select
          value={actor}
          onChange={(e) => setActor(e.target.value)}
          className="border p-1"
        >
          <option value="">All Actors</option>
          {actors.map((a) => (
            <option key={a._id} value={a._id}>
              {a.name}
            </option>
          ))}
        </select>

        {/* Director Dropdown */}
        <select
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          className="border p-1"
        >
          <option value="">All Directors</option>
          {directors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>

        <button
          onClick={fetchMovies}
          className="bg-blue-500 text-white px-2 rounded"
        >
          Filter
        </button>
      </div>

      <ul>
        {movies.map((m) => (
          <li key={m._id}>
            <Link
              to={`/movies/${m._id}`}
              className="text-blue-600 hover:underline"
            >
              {m.title}
            </Link>{" "}
            ({m.release_year})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
