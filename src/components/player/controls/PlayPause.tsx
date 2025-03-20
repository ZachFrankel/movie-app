interface PlayPauseButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function PlayPauseButton({ isPlaying, onToggle }: PlayPauseButtonProps) {
  return (
    <button 
      type="button"
      className="text-white tabbable p-2 rounded-full hover:bg-video-buttonBackground hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center gap-3 active:scale-110 active:bg-opacity-75 active:text-white relative group"
      onClick={onToggle}
      aria-label={isPlaying ? "Pause" : "Play"}
    >
      <span className="absolute inset-0 bg-white opacity-0 rounded-full group-hover:opacity-10 transition-opacity duration-200"></span>
      <span className="text-2xl relative z-10">
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 320 512">
            <path fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 384 512" style={{ transform: "translateX(5%)" }}>
            <path fill="currentColor" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
          </svg>
        )}
      </span>
    </button>
  );
}