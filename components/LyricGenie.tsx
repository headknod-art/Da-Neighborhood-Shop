import React, { useState } from 'react';
import { Beat } from '../types';
import { generateLyricsForBeat } from '../services/geminiService';

interface LyricGenieProps {
  beat: Beat;
  onClose: () => void;
}

export const LyricGenie: React.FC<LyricGenieProps> = ({ beat, onClose }) => {
  const [topic, setTopic] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateLyricsForBeat(beat, topic);
    setLyrics(result);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-black w-full max-w-2xl border border-zinc-800 flex flex-col max-h-[90vh] shadow-[0_0_50px_rgba(250,204,21,0.1)]">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
          <div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-2">
              <span className="text-yellow-400">
                 //
              </span>
              Lyric Genie
            </h2>
            <p className="text-zinc-500 text-xs mt-1 uppercase tracking-wide">
              Writing for: <span className="text-white">{beat.title}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!lyrics ? (
            <div className="space-y-6">
              <label className="block">
                <span className="text-white text-sm font-bold uppercase tracking-wider">What's the song about?</span>
                <input 
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Late night drive, Hustle, Heartbreak..."
                  className="mt-3 block w-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:border-yellow-400 focus:ring-0 px-4 py-4 text-sm rounded-none transition-colors"
                />
              </label>

              <div className="bg-zinc-900/50 p-4 border border-zinc-800 border-l-4 border-l-yellow-400">
                <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Beat Intelligence</h4>
                <div className="flex flex-wrap gap-2">
                   <span className="px-3 py-1 bg-black text-white text-xs border border-zinc-700 uppercase font-bold">{beat.mood}</span>
                   <span className="px-3 py-1 bg-black text-white text-xs border border-zinc-700 uppercase font-bold">{beat.genre}</span>
                   <span className="px-3 py-1 bg-black text-white text-xs border border-zinc-700 uppercase font-bold">{beat.bpm} BPM</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap bg-zinc-950 p-8 border border-zinc-800 text-zinc-300 font-mono text-sm leading-relaxed border-l-4 border-l-yellow-400">
                {lyrics}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800 bg-zinc-950">
          {!lyrics ? (
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full py-4 font-bold text-black uppercase tracking-wider transition-all rounded-none
                ${loading 
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                  : 'bg-yellow-400 hover:bg-white hover:text-black'}`}
            >
              {loading ? 'Cooking up heat...' : 'Generate Lyrics'}
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => setLyrics('')}
                className="flex-1 py-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-bold uppercase tracking-wider rounded-none transition-colors"
              >
                Reset
              </button>
              <button
                 onClick={() => {navigator.clipboard.writeText(lyrics); alert('Copied to clipboard!');}}
                 className="flex-1 py-4 bg-yellow-400 text-black hover:bg-white font-bold uppercase tracking-wider rounded-none transition-colors"
              >
                Copy Text
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};