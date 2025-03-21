import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlayPauseButton } from './PlayPause';
import { VolumeControl } from './Volume';
import { ProgressBar } from './ProgressBar';
import { FullscreenButton } from './Fullscreen';
import { SeekButtons } from './Seek';
import { SettingsButton } from './Settings';
import { EpisodesButton } from './Episodes';
import { EpisodeSelector } from './EpisodeSelector';
import { SettingsMenu } from './SettingsMenu';
import { PlayerState, PlayerControls, EpisodeInfo } from '../types';

interface ControlBarProps {
  playerState: PlayerState;
  controls: PlayerControls;
  showControls: boolean;
  episodeInfo?: EpisodeInfo;
}

// Helper function to format time in MM:SS
function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '00:00';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
  return `${formattedMinutes}:${formattedSeconds}`;
}

export function ControlBar({ playerState, controls, showControls, episodeInfo }: ControlBarProps) {
  const [isTimeHovering, setIsTimeHovering] = useState(false);
  const [showEpisodeSelector, setShowEpisodeSelector] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const { id } = useParams<{ id: string }>();

  const handleEpisodesClick = () => {
    setShowEpisodeSelector(!showEpisodeSelector);
    setShowSettingsMenu(false);
  };
  
  const closeEpisodeSelector = () => {
    setShowEpisodeSelector(false);
  };
  
  const handleSettingsClick = () => {
    setShowSettingsMenu(!showSettingsMenu);
    setShowEpisodeSelector(false);
  };
  
  const closeSettingsMenu = () => {
    setShowSettingsMenu(false);
  };

  return (
    <>
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${
        showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <ProgressBar 
          currentTime={playerState.progress} 
          duration={playerState.duration} 
          onSeek={controls.seek}
        />
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-2">
            <PlayPauseButton 
              isPlaying={playerState.isPlaying} 
              onToggle={controls.togglePlay} 
            />
            <SeekButtons 
              onSeekBackward={() => controls.seek(playerState.progress - 10)}
              onSeekForward={() => controls.seek(playerState.progress + 10)}
            />
            <VolumeControl 
              volume={playerState.volume} 
              isMuted={playerState.isMuted} 
              onVolumeChange={controls.setVolume} 
              onToggleMute={controls.toggleMute} 
            />
            <div
              className="relative"
              onMouseEnter={() => setIsTimeHovering(true)}
              onMouseLeave={() => setIsTimeHovering(false)}
            >
              <button 
                className="text-white tabbable p-2 rounded-full hover:bg-video-buttonBackground hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center active:scale-110 active:bg-opacity-75 active:text-white relative group"
              >
                <span className={`absolute inset-0 bg-white opacity-0 rounded-full ${isTimeHovering ? 'opacity-10' : ''} transition-opacity duration-200`}></span>
                <span className="text-base relative z-10">
                  {formatTime(playerState.progress)} / {formatTime(playerState.duration)}
                </span>
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {episodeInfo && id && (
              <div className="relative">
                <EpisodesButton
                  onClick={handleEpisodesClick}
                />
                {showEpisodeSelector && (
                  <div className="absolute bottom-18 right-[-110px] z-50">
                    <EpisodeSelector
                      showId={id}
                      currentSeason={episodeInfo.season}
                      currentEpisode={episodeInfo.episode}
                      onClose={closeEpisodeSelector}
                    />
                  </div>
                )}
              </div>
            )}
            <div className="relative">
              <SettingsButton
                onClick={handleSettingsClick}
              />
              {showSettingsMenu && (
                <div className="absolute bottom-18 right-[-54px] z-50">
                  <SettingsMenu
                    onClose={closeSettingsMenu}
                  />
                </div>
              )}
            </div>
            <FullscreenButton 
              isFullscreen={playerState.isFullscreen} 
              onToggle={controls.toggleFullscreen} 
            />
          </div>
        </div>
      </div>
      
      {/* Add a backdrop to close menus when clicking outside */}
      {(showEpisodeSelector || showSettingsMenu) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            closeEpisodeSelector();
            closeSettingsMenu();
          }}
        ></div>
      )}
    </>
  );
}