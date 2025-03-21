import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../layout/Loading';

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
  onClose 
}: EpisodeSelectorProps) {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [showSeasonsList, setShowSeasonsList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showName, setShowName] = useState('');
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

        setShowName(data.name);

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
      <div className="bg-black text-[#8EA3B0] rounded-lg overflow-hidden shadow-lg w-[340px] h-[430px] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-black text-[#8EA3B0] rounded-lg overflow-hidden shadow-lg w-[340px] h-[430px] flex flex-col border border-[rgba(255,255,255,0.1)]">
      {/* Season Header */}
      <div className="flex-none">
        <h3 className="font-bold text-[#8EA3B0] pb-3 pt-5 border-b border-[rgba(255,255,255,0.1)] flex justify-between items-center px-4">
          <div className="flex items-center space-x-3">
            {showSeasonsList ? (
              <div className="truncate max-w-[200px]">
                {showName}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button 
                  type="button"
                  onClick={toggleSeasonsList}
                  className="-ml-2 p-2 rounded tabbable hover:bg-video-context-hoverColor hover:bg-opacity-50"
                  aria-label="View seasons"
                >
                  <span className="text-xl rtl:-scale-x-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                  </span>
                </button>
                <span className="line-clamp-1 break-all">Seasons</span>
              </div>
            )}
          </div>
          <div>
            {!showSeasonsList && selectedSeason && selectedSeason.name}
          </div>
        </h3>
      </div>

      {/* Season List or Episode List - with fixed height */}
      <div className="flex-1 overflow-y-auto">
        {showSeasonsList ? (
          <div className="pt-4 space-y-1 pb-6 px-4">
            {seasons.map((season) => (
              <button
                key={season.id}
                type="button"
                className="flex py-2 px-3 rounded-lg w-full -ml-3 hover:bg-video-context-hoverColor hover:bg-opacity-50 cursor-pointer tabbable"
                style={{ width: 'calc(100% + 1.5rem)' }}
                onClick={() => handleSeasonChange(season)}
              >
                <div className="flex items-center flex-1">
                  <div className="flex-1 text-left">
                    <span className="font-medium text-left text-[#8EA3B0]">
                      {season.name}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-white flex items-center font-medium">
                      <span className="text-xl ml-1 -mr-1.5 rtl:-scale-x-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </span>
                    </span>
                  </div>
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
                className="flex py-2 px-3 rounded-lg w-full -ml-3 hover:bg-video-context-hoverColor hover:bg-opacity-50 cursor-pointer tabbable"
                style={{ width: 'calc(100% + 1.5rem)' }}
                onClick={() => handleEpisodeSelect(selectedSeason.season_number, episode.episode_number)}
              >
                <div className="flex items-center flex-1">
                  <div className="flex-1 text-left">
                    <span className="font-medium text-left text-[#8EA3B0]">
                      <div className="text-left flex items-center space-x-3 text-[#8EA3B0]">
                        <span className="p-0.5 px-2 rounded inline bg-video-context-hoverColor bg-opacity-50">
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
    </div>
  );
}