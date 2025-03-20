import { useState, useRef, useEffect } from 'react';
import { PlayerState, PlayerControls, VideoSource } from '../types';
import { useHLS } from './useHLS';

export function usePlayer(sources: VideoSource[]) {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    progress: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isFullscreen: false,
    isLoading: true,
    isBuffering: false,
    error: null
  });

  // Initialize HLS if needed
  useHLS(videoRef, sources);

  // Set up event listeners when the video element is available
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const updateProgress = () => {
      setPlayerState(prev => ({
        ...prev,
        progress: videoElement.currentTime,
        duration: videoElement.duration
      }));
    };

    const handlePlay = () => setPlayerState(prev => ({ ...prev, isPlaying: true }));
    const handlePause = () => setPlayerState(prev => ({ ...prev, isPlaying: false }));
    const handleVolumeChange = () => setPlayerState(prev => ({ 
      ...prev, 
      volume: videoElement.volume,
      isMuted: videoElement.muted
    }));
    const handleLoadStart = () => setPlayerState(prev => ({ ...prev, isLoading: true }));
    const handleCanPlay = () => setPlayerState(prev => ({ ...prev, isLoading: false }));
    const handleError = () => setPlayerState(prev => ({ 
      ...prev, 
      error: 'Error loading video',
      isLoading: false
    }));

    const handleWaiting = () => setPlayerState(prev => ({ ...prev, isBuffering: true }));
    const handlePlaying = () => setPlayerState(prev => ({ ...prev, isBuffering: false }));

    videoElement.addEventListener('timeupdate', updateProgress);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('volumechange', handleVolumeChange);
    videoElement.addEventListener('loadstart', handleLoadStart);
    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('error', handleError);
    videoElement.addEventListener('waiting', handleWaiting);
    videoElement.addEventListener('playing', handlePlaying);

    return () => {
      videoElement.removeEventListener('timeupdate', updateProgress);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('volumechange', handleVolumeChange);
      videoElement.removeEventListener('loadstart', handleLoadStart);
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('error', handleError);
      videoElement.removeEventListener('waiting', handleWaiting);
      videoElement.removeEventListener('playing', handlePlaying);
    };
  }, []);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = document.fullscreenElement !== null;
      setPlayerState(prev => ({ ...prev, isFullscreen }));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const controls: PlayerControls = {
    play: () => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.error('Failed to play video:', error);
        });
      }
    },
    pause: () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    },
    togglePlay: () => {
      if (videoRef.current) {
        if (playerState.isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch(error => {
            console.error('Failed to play video:', error);
          });
        }
      }
    },
    seek: (time: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
      }
    },
    setVolume: (volume: number) => {
      if (videoRef.current) {
        videoRef.current.volume = volume;
        videoRef.current.muted = volume === 0;
      }
    },
    toggleMute: () => {
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
      }
    },
    toggleFullscreen: () => {
      if (!containerRef.current) return;
      
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return {
    videoRef,
    containerRef,
    playerState,
    controls
  };
}