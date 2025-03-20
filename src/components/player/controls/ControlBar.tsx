import { PlayPauseButton } from './PlayPause';
import { VolumeControl } from './Volume';
import { ProgressBar } from './ProgressBar';
import { FullscreenButton } from './Fullscreen';
import { SeekButtons } from './Seek';
import { SettingsButton } from './Settings';
import { PlayerState, PlayerControls } from '../types';
import { useState } from 'react';

interface ControlBarProps {
  playerState: PlayerState;
  controls: PlayerControls;
  showControls: boolean;
}

export function ControlBar({ playerState, controls, showControls }: ControlBarProps) {
  const [isTimeHovering, setIsTimeHovering] = useState(false);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeekForward = () => {
    controls.seek(Math.min(playerState.progress + 10, playerState.duration));
  };

  const handleSeekBackward = () => {
    controls.seek(Math.max(playerState.progress - 10, 0));
  };

  const handleSettingsClick = () => {};

  return (
    <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${
      showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="mb-2">
        <ProgressBar 
          currentTime={playerState.progress} 
          duration={playerState.duration} 
          onSeek={controls.seek}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <PlayPauseButton 
            isPlaying={playerState.isPlaying} 
            onToggle={controls.togglePlay} 
          />
          <SeekButtons
            onSeekForward={handleSeekForward}
            onSeekBackward={handleSeekBackward}
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
          <SettingsButton
            onClick={handleSettingsClick}
          />
          
          <FullscreenButton 
            isFullscreen={playerState.isFullscreen} 
            onToggle={controls.toggleFullscreen} 
          />
        </div>
      </div>
    </div>
  );
}