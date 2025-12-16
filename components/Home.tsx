import React from 'react';
import { HeroAnimation } from './HeroAnimation';
import { DEFAULT_TWITCH_CHANNEL } from '../constants';

interface HomeProps {
  onEnterStore: () => void;
  onOpenMailbox: () => void;
  onOpenBooking: () => void;
  onOpenStream: () => void;
}

export const Home: React.FC<HomeProps> = ({ onEnterStore, onOpenMailbox, onOpenBooking, onOpenStream }) => {
  // Use window.location.hostname for Twitch parent parameter to ensure embed works
  const hostname = window.location.hostname;

  // Construct src with multiple parents to handle different environments (Local, AI Studio, etc)
  const embedSrc = `https://player.twitch.tv/?channel=${DEFAULT_TWITCH_CHANNEL}&parent=${hostname}&parent=aistudio.google.com&parent=localhost&muted=true`;

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
        {/* Main Hero Notice */}
        <div className="relative group overflow-hidden border border-zinc-800 hover:border-yellow-400 transition-colors duration-500 min-h-[600px] h-[70vh] flex items-center">
           
           {/* Background Animation Layer */}
           <div className="absolute inset-0 z-0">
               <HeroAnimation />
           </div>

           {/* Gradient Overlay for Readability - Adjusted to fade out towards the video */}
           <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/30 z-10 pointer-events-none"></div>

           {/* Content Layer */}
           <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col lg:flex-row items-center justify-between gap-12 py-12">
                  
                  {/* Left Side: Text Content */}
                  <div className="flex-1 max-w-2xl pt-8 lg:pt-0">
                      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase leading-none mb-6 drop-shadow-2xl">
                        Mandatory<br/>Vibing
                      </h1>
                      <div className="h-1 w-20 bg-yellow-400 mb-6 shadow-[0_0_15px_rgba(250,204,21,0.6)]"></div>
                      <p className="text-zinc-300 mb-8 max-w-lg text-lg leading-relaxed font-medium drop-shadow-md">
                        The Neighborhood Board has updated the noise ordinances. All residents must equip Class-A beats immediately. Failure to vibe will result in fines.
                      </p>
                      <div className="flex flex-wrap gap-4">
                         <button 
                            onClick={onEnterStore}
                            className="px-8 py-4 bg-yellow-400 text-black font-bold uppercase tracking-widest hover:bg-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                         >
                            Enter Corner Store
                         </button>
                         <button className="px-8 py-4 border border-zinc-600 bg-black/50 backdrop-blur-sm text-white font-bold uppercase tracking-widest hover:border-yellow-400 hover:text-yellow-400 transition-colors">
                            Read Bylaws
                         </button>
                      </div>
                  </div>

                  {/* Right Side: Embedded Live Feed (Visible on Desktop) */}
                  <div className="hidden lg:block w-[480px] xl:w-[600px] shrink-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                      <div className="border border-zinc-800 bg-black shadow-[0_0_60px_rgba(0,0,0,0.8)] relative group/monitor transform rotate-1 hover:rotate-0 transition-transform duration-500">
                           
                           {/* Monitor Header */}
                           <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center z-20 bg-gradient-to-b from-black/90 to-transparent pointer-events-none">
                               <div className="flex items-center gap-2">
                                   <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                                   <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest shadow-black drop-shadow-md bg-black/50 px-1 rounded">Live Feed</span>
                               </div>
                               <span className="text-[10px] font-mono text-zinc-400 uppercase bg-black/50 px-1 rounded">Cam-04 // Plaza</span>
                           </div>

                           {/* Video Embed */}
                           <div className="aspect-video w-full bg-zinc-900 relative">
                                <iframe
                                    src={embedSrc}
                                    className="w-full h-full pointer-events-auto"
                                    allowFullScreen
                                    title="Hero Stream"
                                ></iframe>
                                
                                {/* Overlay Effects (Scanlines) */}
                                <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}></div>
                                {/* Vignette */}
                                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.8)_100%)]"></div>
                           </div>

                           {/* Monitor Footer */}
                           <div className="bg-zinc-900 border-t border-zinc-800 p-2 flex justify-between items-center">
                                <div className="text-[9px] text-zinc-500 uppercase font-mono flex gap-2">
                                    <span>Rec: ON</span>
                                    <span>|</span>
                                    <span className="text-yellow-400">Signal: Optimal</span>
                                </div>
                                <button 
                                  onClick={onOpenStream}
                                  className="text-[9px] font-bold text-zinc-400 uppercase hover:text-white flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded hover:bg-zinc-700 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                    </svg>
                                    Expand View
                                </button>
                           </div>
                      </div>
                  </div>
           </div>
        </div>

        {/* Secondary Notices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
                onClick={onOpenBooking}
                className="bg-zinc-900/50 border border-zinc-800 p-6 hover:border-zinc-600 transition-colors group cursor-pointer"
            >
                <div className="h-10 w-10 bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-yellow-400 group-hover:text-black transition-colors text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                </div>
                <h3 className="text-white font-bold uppercase text-lg mb-2">Schedule Hearing</h3>
                <p className="text-zinc-500 text-sm">Contest a noise violation or book a production session with the board. Disciplinary recordings available.</p>
            </div>

             <div 
                onClick={onOpenStream}
                className="bg-zinc-900/50 border border-zinc-800 p-6 hover:border-zinc-600 transition-colors group cursor-pointer relative overflow-hidden"
             >
                {/* Live Indicator in Corner */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_red]"></div>
                   <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest">Live</span>
                </div>

                <div className="h-10 w-10 bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-yellow-400 group-hover:text-black transition-colors text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-white font-bold uppercase text-lg mb-2">Community Watch</h3>
                <p className="text-zinc-500 text-sm">Monitor the neighborhood vibe in real-time. Unauthorized loitering will be streamed to the cloud.</p>
            </div>

             <div 
                onClick={onOpenMailbox}
                className="bg-zinc-900/50 border border-zinc-800 p-6 hover:border-zinc-600 transition-colors group cursor-pointer"
             >
                 <div className="h-10 w-10 bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-yellow-400 group-hover:text-black transition-colors text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-white font-bold uppercase text-lg mb-2">HOA Mailbox</h3>
                <p className="text-zinc-500 text-sm">Check official correspondence. Failure to read notices regarding volume violations is not a valid excuse.</p>
            </div>
        </div>
    </div>
  );
};