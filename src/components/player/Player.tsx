import { useState, useEffect, useCallback, useRef } from 'react';
import { ControlBar } from './controls/ControlBar';
import { Loading } from '../layout/Loading';
import { Spinner } from '../layout/Spinner';
import { PlayerProps } from './types';
import { usePlayer } from './hooks/usePlayer';

export function VideoPlayer({ sources, autoPlay = true, title }: PlayerProps) {
  const { videoRef, containerRef, playerState, controls } = usePlayer(sources);
  const [showControls, setShowControls] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to hide controls after inactivity
  const hideControlsAfterDelay = useCallback(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // If video is playing, set a timer to hide controls
    if (playerState.isPlaying) {
      setShowControls(true);
      timerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3250); // 4 seconds
    } else {
      // Always show controls when video is paused
      setShowControls(true);
    }
  }, [playerState.isPlaying]);

  // Set up the timer when play state changes
  useEffect(() => {
    hideControlsAfterDelay();
  }, [playerState.isPlaying, hideControlsAfterDelay]);

  // Clean up the timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Reset the timer on mouse movement
  const handleMouseMove = useCallback(() => {
    hideControlsAfterDelay();
  }, [hideControlsAfterDelay]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen bg-black overflow-hidden ${
        showControls ? '' : 'cursor-none'
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        if (playerState.isPlaying) {
          setShowControls(false);
        }
      }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        autoPlay={autoPlay}
        onClick={controls.togglePlay}
        playsInline
      >
        {sources.map((source, index) => (
          <source key={index} src={source.src} type={source.type} />
        ))}
        Your browser does not support the video tag.
      </video>

      {playerState.isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <Loading />
        </div>
      )}

      {playerState.isBuffering && !playerState.isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Spinner className="text-white" />
        </div>
      )}

      <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>
      
      <ControlBar 
        playerState={playerState} 
        controls={controls}
        showControls={showControls} 
      />
    </div>
  );
}