import React, { useState, useEffect } from 'react';
import { BEATS, CATEGORIES } from '../constants';
import { Beat, CartItem } from '../types';
import { searchBeatsWithAI } from '../services/geminiService';
import { LyricGenie } from './LyricGenie';

interface CornerStoreProps {
  currentBeat: Beat | null;
  isPlaying: boolean;
  cart: CartItem[];
  onPlayToggle: (beat: Beat) => void;
  onAddToCart: (beat: Beat) => void;
}

export const CornerStore: React.FC<CornerStoreProps> = ({ 
  currentBeat, 
  isPlaying, 
  cart, 
  onPlayToggle, 
  onAddToCart 
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [beats, setBeats] = useState<Beat[]>(BEATS);
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [lyricBeat, setLyricBeat] = useState<Beat | null>(null);

  useEffect(() => {
    if (activeCategory === 'All') {
      setBeats(BEATS);
    } else {
      setBeats(BEATS.filter(b => b.genre === activeCategory || b.tags.includes(activeCategory)));
    }
    setSearchQuery('');
  }, [activeCategory]);

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
        setBeats(BEATS);
        return;
    }

    setIsAiSearching(true);
    const matchedIds = await searchBeatsWithAI(searchQuery);
    
    if (matchedIds.length > 0) {
        const filtered = BEATS.filter(b => matchedIds.includes(b.id));
        setBeats(filtered);
    } else {
        const lower = searchQuery.toLowerCase();
        const filtered = BEATS.filter(b => 
            b.title.toLowerCase().includes(lower) || 
            b.tags.some(t => t.toLowerCase().includes(lower))
        );
        setBeats(filtered);
    }
    setIsAiSearching(false);
  };

  return (
    <div className="animate-fade-in-up">
      {/* Store Header */}
      <div className="mb-8 border-b border-zinc-800 pb-6">
        <h1 className="text-4xl font-bold text-white uppercase tracking-tight mb-2">The Corner Store</h1>
        <p className="text-zinc-500 uppercase tracking-widest text-xs">Authorized Supply Chain // Unit 99</p>
      </div>

      {/* Search & Categories Bar */}
      <div className="sticky top-20 z-40 bg-black/95 backdrop-blur-md py-4 border-b border-zinc-800 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Categories */}
              <div className="w-full md:w-auto overflow-x-auto scrollbar-hide pb-1">
                 <div className="flex gap-2">
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`whitespace-nowrap px-6 py-2 border text-sm font-bold uppercase tracking-wider transition-all
                          ${activeCategory === cat 
                            ? 'bg-yellow-400 text-black border-yellow-400' 
                            : 'bg-black text-zinc-500 border-zinc-800 hover:border-zinc-500 hover:text-white'}`}
                      >
                        {cat === 'All' ? 'All Zones' : cat}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Search */}
              <form onSubmit={handleAiSearch} className="w-full md:w-auto relative group">
                 <input 
                    type="text" 
                    placeholder="SEARCH ZONING PERMITS..." 
                    className="w-full md:w-80 bg-black border border-zinc-800 text-white placeholder-zinc-600 px-4 py-2 uppercase text-sm font-bold focus:outline-none focus:border-yellow-400 transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                 />
                 <button 
                    type="submit" 
                    className="absolute right-0 top-0 h-full px-3 text-zinc-500 hover:text-yellow-400"
                    disabled={isAiSearching}
                 >
                    {isAiSearching ? (
                        <div className="animate-spin h-4 w-4 border-2 border-zinc-600 border-t-yellow-400 rounded-full"></div>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    )}
                 </button>
              </form>
           </div>
        </div>

        {/* Beat Grid */}
        <div>
           <div className="flex justify-between items-end mb-6">
              <h2 className="text-lg font-bold text-white uppercase tracking-tight">
                 {activeCategory === 'All' && !searchQuery ? 'Approved Stock' : 'Search Results'}
                 <span className="text-yellow-400 text-sm ml-2 align-middle">({beats.length})</span>
              </h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
              {beats.map(beat => {
                 const isPlayingThis = currentBeat?.id === beat.id && isPlaying;
                 const isInCart = cart.some(i => i.id === beat.id);
                 
                 return (
                    <div key={beat.id} className="group flex flex-col">
                        {/* Artwork */}
                        <div className="relative aspect-square bg-zinc-900 border border-zinc-800 overflow-hidden mb-3 group-hover:border-yellow-400 transition-colors">
                           <img 
                             src={beat.cover} 
                             alt={beat.title} 
                             className={`w-full h-full object-cover transition-all duration-500 ${isPlayingThis ? 'grayscale-0 scale-105' : 'grayscale group-hover:grayscale-0 group-hover:scale-105'}`} 
                           />
                           
                           {/* Overlay Actions */}
                           <div className="absolute inset-0 bg-black/20 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="flex justify-end">
                                 <button onClick={() => setLyricBeat(beat)} className="p-2 bg-black text-white hover:text-yellow-400 border border-zinc-700 hover:border-yellow-400 transition-colors" title="Request Lyric Permit">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                 </button>
                              </div>
                              <div className="flex justify-center">
                                 <button 
                                   onClick={() => onPlayToggle(beat)}
                                   className="h-16 w-16 bg-yellow-400 text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(250,204,21,0.4)]"
                                 >
                                    {isPlayingThis ? (
                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                       </svg>
                                    ) : (
                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                       </svg>
                                    )}
                                 </button>
                              </div>
                              <div className="text-right">
                                  {/* Spacer */}
                              </div>
                           </div>
                        </div>

                        {/* Info */}
                        <div className="flex justify-between items-start gap-2">
                           <div>
                              <h3 className="font-bold text-white text-lg leading-tight uppercase truncate cursor-pointer hover:text-yellow-400 transition-colors" onClick={() => onPlayToggle(beat)}>{beat.title}</h3>
                              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{beat.producer}</p>
                           </div>
                           <div className="text-right">
                             <span className="text-yellow-400 font-bold block">${beat.price}</span>
                             <span className="text-[9px] text-zinc-600 uppercase">HOA Fee</span>
                           </div>
                        </div>

                        {/* Add Button */}
                        <button 
                          onClick={() => onAddToCart(beat)}
                          className={`mt-3 w-full py-3 text-xs font-bold uppercase tracking-widest border transition-all duration-200 flex items-center justify-center gap-2
                             ${isInCart
                               ? 'bg-white text-black border-white' 
                               : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-yellow-400 hover:text-yellow-400'}`}
                        >
                          {isInCart ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Fee Added
                            </>
                          ) : 'Pay Permit Fee'}
                        </button>
                    </div>
                 );
              })}
           </div>
           
           {beats.length === 0 && (
              <div className="py-32 text-center border border-zinc-800 border-dashed">
                 <h3 className="text-2xl font-bold text-white uppercase mb-2">Zone Restricted</h3>
                 <p className="text-zinc-500">No approved assets found for this classification.</p>
              </div>
           )}
        </div>

        {lyricBeat && (
          <LyricGenie beat={lyricBeat} onClose={() => setLyricBeat(null)} />
        )}
    </div>
  );
};