import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ControlBar } from "./controls/ControlBar";
import { Loading } from "../layout/Loading";
import { Spinner } from "../layout/Spinner";
import { PlayerProps } from "./types";
import { usePlayer } from "./hooks/usePlayer";

export function VideoPlayer({
  sources,
  autoPlay = true,
  title,
  episodeInfo,
}: PlayerProps) {
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
      }, 3250); // ~3 seconds
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
        showControls ? "" : "cursor-none"
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

      <div
        className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center">
          <Link
            to="/"
            className="py-1 -my-1 px-2 -mx-2 tabbable rounded-lg flex items-center cursor-pointer text-secondary-grey hover:text-white transition-colors duration-200 font-medium"
          >
            <span className="mr-2 rtl:-scale-x-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </span>
            <span className="hidden md:block">Back to home</span>
          </Link>

          <span className="text mx-3 text-secondary-grey">/</span>

          <p className="cursor-default transform transition-transform duration-200 hover:scale-105 text-white">
            {title}
          </p>
        </div>

        {episodeInfo && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
            <div className="flex items-center">
              <span className="text-white">
                S{episodeInfo.season} - E{episodeInfo.episode}
              </span>
              <span className="ml-2 text-secondary-grey">
                {episodeInfo.episodeTitle}
              </span>
            </div>
          </div>
        )}
      </div>

      <ControlBar
        playerState={playerState}
        controls={controls}
        showControls={showControls}
        episodeInfo={episodeInfo}
      />
    </div>
  );
}
