import React, { useState, useEffect } from 'react';
import { BEATS, CATEGORIES } from './constants';
import { Beat, CartItem } from './types';
import { searchBeatsWithAI } from './services/geminiService';
import { Navbar } from './components/Navbar';
import { Player } from './components/Player';
import { LyricGenie } from './components/LyricGenie';
import { LoginSplash } from './components/LoginSplash';
import { HeroAnimation } from './components/HeroAnimation';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beats, setBeats] = useState<Beat[]>(BEATS);
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [lyricBeat, setLyricBeat] = useState<Beat | null>(null);

  // --- Handlers ---

  const handlePlayToggle = (beat: Beat) => {
    if (currentBeat?.id === beat.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentBeat(beat);
      setIsPlaying(true);
    }
  };

  const handleAddToCart = (beat: Beat) => {
    if (cart.some(item => item.id === beat.id)) {
      setIsCartOpen(true);
      return;
    }
    const newItem: CartItem = { ...beat, licenseType: 'Basic' };
    setCart([...cart, newItem]);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

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

  useEffect(() => {
    if (activeCategory === 'All') {
      setBeats(BEATS);
    } else {
      setBeats(BEATS.filter(b => b.genre === activeCategory || b.tags.includes(activeCategory)));
    }
    setSearchQuery('');
  }, [activeCategory]);


  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);

  if (!isAuthenticated) {
    return <LoginSplash onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans pb-32 animate-fade-in-up" style={{ animationDuration: '0.5s', animationDelay: '0s' }}>
      
      <Navbar onCartClick={() => setIsCartOpen(true)} cartCount={cart.length} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Hero Section */}
        <div className="mb-12 relative group cursor-pointer overflow-hidden border border-zinc-800 hover:border-yellow-400 transition-colors duration-500">
           <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10 pointer-events-none"></div>
           <div className="grid md:grid-cols-2 bg-zinc-900">
              <div className="p-8 md:p-12 flex flex-col justify-center relative z-20">
                  <span className="text-yellow-400 font-bold tracking-widest uppercase mb-4 text-xs">// Official HOA Notice</span>
                  <h1 className="text-5xl md:text-7xl font-bold text-white uppercase leading-none mb-6">
                    Mandatory<br/>Vibing
                  </h1>
                  <p className="text-zinc-400 mb-8 max-w-md">
                    The Neighborhood Board has approved a new collection of sonic assets. Compliance is mandatory for all residents.
                  </p>
                  <div className="flex gap-4">
                     <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-yellow-400 transition-colors">
                        Inspect Assets
                     </button>
                     <button className="px-8 py-3 border border-zinc-600 text-white font-bold uppercase tracking-wider hover:border-yellow-400 hover:text-yellow-400 transition-colors">
                        Read Bylaws
                     </button>
                  </div>
              </div>
              <div className="relative h-64 md:h-auto overflow-hidden bg-zinc-950">
                 <HeroAnimation />
              </div>
           </div>
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
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
                 {activeCategory === 'All' && !searchQuery ? 'Approved Community Assets' : 'Permit Search Results'}
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
                                   onClick={() => handlePlayToggle(beat)}
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
                              <h3 className="font-bold text-white text-lg leading-tight uppercase truncate cursor-pointer hover:text-yellow-400 transition-colors" onClick={() => handlePlayToggle(beat)}>{beat.title}</h3>
                              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{beat.producer}</p>
                           </div>
                           <div className="text-right">
                             <span className="text-yellow-400 font-bold block">${beat.price}</span>
                             <span className="text-[9px] text-zinc-600 uppercase">HOA Fee</span>
                           </div>
                        </div>

                        {/* Add Button */}
                        <button 
                          onClick={() => handleAddToCart(beat)}
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

      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="relative w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full flex flex-col shadow-2xl">
             <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-black">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-white uppercase">HOA Statement</h2>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Monthly Dues & Assessments</span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-zinc-500 hover:text-white">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                   </svg>
                </button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                    <div className="h-16 w-16 mb-4 border-2 border-dashed border-zinc-800 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <p className="uppercase tracking-widest font-bold text-sm">No Outstanding Fees</p>
                    <button onClick={() => setIsCartOpen(false)} className="mt-4 text-yellow-400 hover:text-white underline decoration-yellow-400 decoration-2 underline-offset-4 uppercase text-xs font-bold">Review Listings</button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-black p-3 border border-zinc-800 hover:border-zinc-600 transition-colors group">
                       <img src={item.cover} alt={item.title} className="h-20 w-20 object-cover grayscale group-hover:grayscale-0 transition-all" />
                       <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                             <h4 className="text-white font-bold uppercase leading-none">{item.title}</h4>
                             <p className="text-[10px] text-zinc-500 uppercase mt-1">Noise Permit (Class A)</p>
                          </div>
                          <div className="flex justify-between items-end">
                             <span className="text-yellow-400 font-bold">${item.price}</span>
                             <button onClick={() => handleRemoveFromCart(item.id)} className="text-zinc-600 hover:text-red-500 text-[10px] font-bold uppercase tracking-wider">Void</button>
                          </div>
                       </div>
                    </div>
                  ))
                )}
             </div>

             {cart.length > 0 && (
                <div className="p-6 border-t border-zinc-800 bg-black">
                   <div className="flex justify-between items-center mb-2 text-zinc-400 text-sm uppercase font-bold tracking-wider">
                      <span>Subtotal</span>
                      <span className="text-white">${subtotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between items-center mb-6 text-zinc-600 text-[10px] uppercase font-bold tracking-wider">
                      <span>Processing Fee</span>
                      <span>$0.00</span>
                   </div>
                   <button className="w-full py-4 bg-yellow-400 text-black font-bold uppercase tracking-widest hover:bg-white transition-colors">
                      Settle Balance
                   </button>
                </div>
             )}
          </div>
        </div>
      )}

      <Player 
        currentBeat={currentBeat} 
        isPlaying={isPlaying} 
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onNext={() => {
           if (!currentBeat) return;
           const idx = beats.findIndex(b => b.id === currentBeat.id);
           const nextBeat = beats[(idx + 1) % beats.length];
           setCurrentBeat(nextBeat);
        }}
        onPrev={() => {
           if (!currentBeat) return;
           const idx = beats.findIndex(b => b.id === currentBeat.id);
           const prevBeat = beats[(idx - 1 + beats.length) % beats.length];
           setCurrentBeat(prevBeat);
        }}
      />
      
      {lyricBeat && (
        <LyricGenie beat={lyricBeat} onClose={() => setLyricBeat(null)} />
      )}

    </div>
  );
};

export default App;