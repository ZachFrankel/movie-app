interface EpisodesButtonProps {
    onClick: () => void;
  }
  
  export function EpisodesButton({ onClick }: EpisodesButtonProps) {
    return (
      <button
        type="button"
        className="text-white tabbable p-2 rounded-full hover:bg-video-buttonBackground hover:bg-opacity-50 transition-all duration-200 flex items-center gap-3 active:scale-110 active:bg-opacity-75 active:text-white relative group"
        onClick={onClick}
        aria-label="Episodes"
      >
        <span className="absolute inset-0 bg-white opacity-0 rounded-full group-hover:opacity-10 transition-opacity duration-200"></span>
        <span className="text-2xl relative z-10">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3 4C1.34315 4 0 5.34314 0 7V13.9496C0 15.6065 1.34315 16.9496 3 16.9496H5.86645V14.9496H3C2.44772 14.9496 2 14.5019 2 13.9496V7C2 6.44771 2.44771 6 3 6H16.0327C16.585 6 17.0327 6.44772 17.0327 7V9.86645H19.0327V7C19.0327 5.34315 17.6896 4 16.0327 4H3Z"
              fill="currentColor"
            ></path>
            <rect
              x="5.89929"
              y="10.5444"
              width="17"
              height="10"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            ></rect>
          </svg>
        </span>
        <span className="hidden sm:inline">Episodes</span>
      </button>
    );
  }