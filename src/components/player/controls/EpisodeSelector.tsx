import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Episode {
  id: number;
  name: string;
  episode_number: number;
  overview: string;
  still_path: string | null;
  vote_average: number;
  air_date: string;
}

interface Season {
  id: number;
  name: string;
  season_number: number;
  episodes: Episode[];
}

interface EpisodeSelectorProps {
  showId: string;
  currentSeason: number;
  currentEpisode: number;
  onClose: () => void;
}

export function EpisodeSelector({ 
  showId, 
  currentSeason, 
  currentEpisode, 
  onClose 
}: EpisodeSelectorProps) {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [showSeasonsList, setShowSeasonsList] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        setLoading(true);
        // Fetch TV show details to get seasons
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${showId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
        );
        
        if (!response.ok) throw new Error('Failed to fetch show data');
        
        const data = await response.json();
        const seasonsData = await Promise.all(
          data.seasons.map(async (season: any) => {
            // Fetch each season's episodes
            const episodesResponse = await fetch(
              `https://api.themoviedb.org/3/tv/${showId}/season/${season.season_number}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
            );
            
            if (!episodesResponse.ok) return null;
            
            const episodesData = await episodesResponse.json();
            return {
              id: season.id,
              name: season.name,
              season_number: season.season_number,
              episodes: episodesData.episodes || []
            };
          })
        );
        
        const filteredSeasons = seasonsData.filter(Boolean);
        setSeasons(filteredSeasons);
        
        // Set the current season
        const current = filteredSeasons.find(s => s.season_number === currentSeason) || filteredSeasons[0];
        setSelectedSeason(current);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasons();
  }, [showId, currentSeason]);

  const handleEpisodeSelect = (seasonNumber: number, episodeNumber: number) => {
    navigate(`/watch/tv/${showId}/${seasonNumber}/${episodeNumber}`);
    onClose();
  };

  const handleSeasonChange = (season: Season) => {
    setSelectedSeason(season);
    setShowSeasonsList(false);
  };

  const toggleSeasonsList = () => {
    setShowSeasonsList(!showSeasonsList);
  };

  if (loading) {
    return (
      <div className="bg-denim-300 text-white rounded-lg overflow-hidden shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="p-4 text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-denim-300 text-white rounded-lg overflow-hidden shadow-lg w-[340px] max-h-[430px] overflow-y-auto">
      {/* Season Header */}
      <div>
        <h3 className="font-bold text-white pb-3 pt-5 border-b border-denim-400 flex justify-between items-center px-4">
          <div className="flex items-center space-x-3">
            {showSeasonsList ? (
              <button 
                type="button" 
                className="-ml-2 p-2 rounded hover:bg-denim-400 hover:bg-opacity-50"
                onClick={toggleSeasonsList}
              >
                <span className="text-xl rtl:-scale-x-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                </span>
              </button>
            ) : (
              <button 
                type="button" 
                className="-ml-2 p-2 rounded hover:bg-denim-400 hover:bg-opacity-50"
                onClick={toggleSeasonsList}
              >
                Seasons
              </button>
            )}
          </div>
          <div>
            {!showSeasonsList && selectedSeason && <span>Season {selectedSeason.season_number}</span>}
          </div>
        </h3>
      </div>

      {/* Season List or Episode List */}
      {showSeasonsList ? (
        <div className="pt-4 space-y-1 pb-6 px-4">
          {seasons.map((season) => (
            <button
              key={season.id}
              type="button"
              className={`flex py-2 px-3 rounded-lg w-full -ml-3 hover:bg-denim-400 hover:bg-opacity-50 cursor-pointer ${
                selectedSeason?.season_number === season.season_number ? 'bg-denim-400 bg-opacity-50' : ''
              }`}
              style={{ width: 'calc(100% + 1.5rem)' }}
              onClick={() => handleSeasonChange(season)}
            >
              <div className="flex items-center flex-1">
                <div className="flex-1 text-left">
                  <span className="font-medium text-left text-white">
                    {season.name}
                  </span>
                </div>
                {selectedSeason?.season_number === season.season_number && (
                  <div className="flex">
                    <svg className="h-[18px] w-[18px] text-white" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="pt-4 space-y-1 pb-6 px-4">
          {selectedSeason?.episodes.map((episode) => (
            <button
              key={episode.id}
              type="button"
              className={`flex py-2 px-3 rounded-lg w-full -ml-3 hover:bg-denim-400 hover:bg-opacity-50 cursor-pointer ${
                currentEpisode === episode.episode_number ? 'bg-denim-400 bg-opacity-50' : ''
              }`}
              style={{ width: 'calc(100% + 1.5rem)' }}
              onClick={() => handleEpisodeSelect(selectedSeason.season_number, episode.episode_number)}
            >
              <div className="flex items-center flex-1">
                <div className="flex-1 text-left">
                  <span className="font-medium text-left text-white">
                    <div className="text-left flex items-center space-x-3 text-white">
                      <span className={`p-0.5 px-2 rounded inline bg-bink-300 ${
                        currentEpisode === episode.episode_number ? 'text-white bg-opacity-100' : 'bg-opacity-50'
                      }`}>
                        E{episode.episode_number}
                      </span>
                      <span className="line-clamp-1 break-all">{episode.name}</span>
                    </div>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}