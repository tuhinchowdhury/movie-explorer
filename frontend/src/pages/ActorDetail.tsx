import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getActor } from "../api";

function ActorDetail() {
  const { id } = useParams();
  const [actor, setActor] = useState<any>(null);

  useEffect(() => {
    if (id) getActor(id).then(setActor);
  }, [id]);

  if (!actor) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold">{actor.name}</h1>

      <h2 className="text-xl mt-4 font-semibold">Movies</h2>
      <ul>
        {actor.movies?.map((m: any) => (
          <li key={m._id}>
            <Link to={`/movies/${m._id}`}>{m.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActorDetail;
