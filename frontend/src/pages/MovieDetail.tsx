import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovie } from "../api";

const MovieDetail: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getMovie(id).then((res) => {
        setMovie(res); // ✅ use res directly, not res.data
      });
    }
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>
        {movie.title} ({movie.release_year})
      </h1>

      {/* Director */}
      {movie.director && (
        <p>
          Director:{" "}
          <Link to={`/directors/${movie.director._id}`}>
            {movie.director.name}
          </Link>
        </p>
      )}

      {/* Genres */}
      <p>
        Genres:{" "}
        {movie.genres?.map((g: any, i: number) => (
          <span key={g._id}>
            <Link to={`/genres/${g._id}`}>{g.name}</Link>
            {i < movie.genres.length - 1 && ", "}
          </span>
        ))}
      </p>

      {/* Cast */}
      <p>
        Cast:{" "}
        {movie.actors?.map((a: any, i: number) => (
          <span key={a._id}>
            <Link to={`/actors/${a._id}`}>{a.name}</Link>
            {i < movie.actors.length - 1 && ", "}
          </span>
        ))}
      </p>
      <p>
        Rating: {movie.rating}
      </p>
    </div>
  );
};

export default MovieDetail;
