import { useParams } from "react-router-dom";
import { VideoPlayer } from "../components/player/Player";
import { VideoSource } from "../components/player/types";

export function WatchMovie() {
  const { id } = useParams();

  const sources: VideoSource[] = [
    {
      src: `https://files.vidstack.io/sprite-fight/hls/stream.m3u8`,
      type: 'hls'
    }
  ];

  return (
    <>
      <VideoPlayer 
        sources={sources}
        title={id}
      />
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
