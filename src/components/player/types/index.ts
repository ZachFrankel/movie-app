export interface VideoSource {
  src: string;
  type: string;
}

export interface PlayerState {
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  isLoading: boolean;
  isBuffering: boolean;
  error: string | null;
}

export interface PlayerControls {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
}

export interface PlayerProps {
  sources: VideoSource[];
  autoPlay?: boolean;
  title?: string;
}

export const isHLSSource = (source: VideoSource): boolean => {
  return source.type === 'application/x-mpegURL' || 
         source.type === 'application/vnd.apple.mpegurl' || 
         source.src.endsWith('.m3u8');
};