import { useParams } from "react-router-dom";

export function WatchMovie() {
  const { id } = useParams();

  return (
    <>
      <p>{id}</p>
    </>
  );
}

export function WatchTV() {
  const { id, season, episode } = useParams();

  return (
    <>
      <p>{id}</p>
      <p>{season}</p>
      <p>{episode}</p>
    </>
  );
}
