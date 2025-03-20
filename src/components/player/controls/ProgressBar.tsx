import React from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(parseFloat(e.target.value));
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex-1 relative">
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleProgressChange}
        className="w-full cursor-pointer progress-slider"
        aria-label="Playback progress"
        style={{
          // Reset browser styling
          appearance: 'none',
          backgroundColor: 'transparent',
          height: '10px',
        }}
      />
      <style>
        {`
        .progress-slider::-webkit-slider-runnable-track {
          background: linear-gradient(to right, #5A62EB ${progress}%, rgba(255, 255, 255, 0.25) ${progress}%);
          height: 4px;
          border-radius: 2px;
        }
        
        .progress-slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          margin-top: -4px;
          cursor: pointer;
        }
        
        .progress-slider::-moz-range-track {
          background: #363940;
          height: 4px;
          border-radius: 2px;
        }
        
        .progress-slider::-moz-range-progress {
          background: #5A62EB;
          height: 4px;
          border-radius: 2px;
        }
        
        .progress-slider::-moz-range-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
        }
        
        .progress-slider::-ms-track {
          background: #363940;
          height: 4px;
          border-radius: 2px;
        }
        
        .progress-slider::-ms-fill-lower {
          background: #5A62EB;
        }
        
        .progress-slider::-ms-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
        }
        `}
      </style>
    </div>
  );
}