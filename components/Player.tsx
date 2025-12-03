import React, { useEffect, useState } from 'react';
import { Beat } from '../types';

interface PlayerProps {
  currentBeat: Beat | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const Player: React.FC<PlayerProps> = ({ currentBeat, isPlaying, onTogglePlay, onNext, onPrev }) => {
  const [progress, setProgress] = useState(0);

  // Simulate progress when playing
  useEffect(() => {
    let interval: number;
    if (isPlaying && currentBeat) {
      interval = window.setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentBeat]);

  if (!currentBeat) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 p-0 z-50">
      {/* Progress Bar Top */}
      <div className="w-full h-1 bg-zinc-900 cursor-pointer group">
         <div className="h-full bg-yellow-400 relative" style={{ width: `${progress}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 bg-yellow-400 opacity-0 group-hover:opacity-100 shadow-[0_0_10px_rgba(250,204,21,0.5)] transition-opacity"></div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 p-4">
        
        {/* Track Info */}
        <div className="flex items-center gap-4 w-1/3 min-w-[150px]">
          <img src={currentBeat.cover} alt={currentBeat.title} className="h-14 w-14 object-cover border border-zinc-800" />
          <div className="overflow-hidden">
            <h4 className="text-white font-bold text-sm uppercase truncate tracking-wide">{currentBeat.title}</h4>
            <p className="text-zinc-500 text-xs truncate uppercase font-medium">{currentBeat.producer}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="flex items-center gap-8">
             <button onClick={onPrev} className="text-zinc-500 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
              </svg>
            </button>
            <button 
              onClick={onTogglePlay}
              className="h-12 w-12 bg-white hover:bg-yellow-400 rounded-none flex items-center justify-center transition-colors text-black"
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <button onClick={onNext} className="text-zinc-500 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Extra Actions */}
        <div className="w-1/3 flex justify-end items-center gap-6">
          <span className="text-yellow-400 font-bold font-mono text-xl">${currentBeat.price}</span>
          <button className="text-zinc-500 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};