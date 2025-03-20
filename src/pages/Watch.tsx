import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { VideoPlayer } from "../components/player/Player";
import { VideoSource } from "../components/player/types";

async function getTitle(id: string, type: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
  );
  
  const data = await response.json();
  return data.title || data.name;
}

async function getEpisodeTitle(id: string, season: string, episode: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
  );
  
  const data = await response.json();
  return data.name;
}

export function WatchMovie() {
  const { id } = useParams();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (!id) return;
    
    const fetchTitle = async () => {
      const title = await getTitle(id, 'movie');
      setTitle(title);
    };

    fetchTitle();
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

  const [title, setTitle] = useState('');
  const [episodeTitle, setEpisodeTitle] = useState('');

  useEffect(() => {
    if (!id || !season || !episode) return;
    
    const fetchTitle = async () => {
      const title = await getTitle(id, 'tv');
      setTitle(title);
    };

    const fetchEpisodeDetails = async () => {
      const episodeTitle = await getEpisodeTitle(id, season, episode);
      setEpisodeTitle(episodeTitle);
    };

    fetchTitle();
    fetchEpisodeDetails();
  }, [id, season, episode]);

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
        episodeInfo={season && episode ? {
          season: Number(season),
          episode: Number(episode),
          episodeTitle
        } : undefined}
      />
    </>
  );
}