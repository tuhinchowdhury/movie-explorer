import React from "react";
import { Link } from "react-router-dom";

interface Props {
  movie: any;
}

const MovieCard: React.FC<Props> = ({ movie }) => (
  <div style={{ border: "1px solid #ccc", padding: "10px", margin: "5px" }}>
    <h3><Link to={`/movies/${movie._id}`}>{movie.title}</Link></h3>
    <p>Release Year: {movie.release_year}</p>
    <p>Director: {movie.director.name}</p>
    <p>Genres: {movie.genres.map((g: any) => g.name).join(", ")}</p>
  </div>
);

export default MovieCard;
