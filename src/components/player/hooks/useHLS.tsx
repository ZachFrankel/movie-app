import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { VideoSource, isHLSSource } from '../types';

export function useHLS(videoRef: React.RefObject<HTMLVideoElement>, sources: VideoSource[]) {
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Find the first HLS source
    const hlsSource = sources.find(isHLSSource);
    if (!hlsSource) return;

    // Check if the browser supports HLS natively
    const canPlayHLS = videoElement.canPlayType('application/vnd.apple.mpegurl') || 
                      videoElement.canPlayType('application/x-mpegURL');
    
    // For Safari and iOS which have native HLS support
    if (canPlayHLS) {
      // The browser can play it natively, nothing to do
      return;
    }

    // For browsers that don't have native HLS support, use hls.js if it's supported
    if (Hls.isSupported()) {
      // Clean up any existing hls instance
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90
      });

      // Bind hls to the video element
      hls.loadSource(hlsSource.src);
      hls.attachMedia(videoElement);

      // Handle HLS events
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // Ready to play
        if (videoElement.autoplay) {
          videoElement.play().catch(error => {
            console.error('Error attempting to autoplay:', error);
          });
        }
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              // Try to recover network error
              console.log('Fatal network error encountered, trying to recover');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              // Try to recover media error
              console.log('Fatal media error encountered, trying to recover');
              hls.recoverMediaError();
              break;
            default:
              // Cannot recover
              console.error('Fatal error, cannot recover:', data);
              hls.destroy();
              break;
          }
        }
      });

      hlsRef.current = hls;
    }

    // Cleanup function
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [videoRef, sources]); // Re-run when video element or sources change

  return hlsRef;
}