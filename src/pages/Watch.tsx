import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VideoPlayer } from "../components/player/Player";
import { VideoSource } from "../components/player/types";

export function WatchMovie() {
  const { id } = useParams();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (!id) return;
    
    const fetchMovieTitle = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
      );
      
      const data = await response.json();
      setTitle(data.title);
    };

    fetchMovieTitle();
  }, [id]);

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
        title={title}
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