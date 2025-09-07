import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDirector } from "../api";

function DirectorDetail() {
  const { id } = useParams();
  const [director, setDirector] = useState<any>(null);

  useEffect(() => {
    if (id) getDirector(id).then(setDirector);
  }, [id]);

  if (!director) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold">{director.name}</h1>

      <h2 className="text-xl mt-4 font-semibold">Movies</h2>
      <ul>
        {director.movies.map((m: any) => (
          <li key={m._id}>
            <Link to={`/movies/${m._id}`}>{m.title} ({m.release_year})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DirectorDetail;
