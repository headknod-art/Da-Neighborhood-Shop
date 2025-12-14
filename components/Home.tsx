import React from 'react';
import { HeroAnimation } from './HeroAnimation';

interface HomeProps {
  onEnterStore: () => void;
  onOpenMailbox: () => void;
  onOpenBooking: () => void;
}

export const Home: React.FC<HomeProps> = ({ onEnterStore, onOpenMailbox, onOpenBooking }) => {
  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
        {/* Main Hero Notice */}
        <div className="relative group cursor-pointer overflow-hidden border border-zinc-800 hover:border-yellow-400 transition-colors duration-500 min-h-[500px] h-[60vh] flex items-center">
           
           {/* Background Animation Layer */}
           <div className="absolute inset-0 z-0">
               <HeroAnimation />
           </div>

           {/* Gradient Overlay for Readability */}
           <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

           {/* Content Layer */}
           <div className="relative z-20 p-8 md:p-12 w-full max-w-4xl mx-auto md:mx-0">
                  <h1 className="text-5xl md:text-8xl font-bold text-white uppercase leading-none mb-6 drop-shadow-2xl">
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

             <div className="bg-zinc-900/50 border border-zinc-800 p-6 hover:border-zinc-600 transition-colors group">
                <div className="h-10 w-10 bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-yellow-400 group-hover:text-black transition-colors text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-white font-bold uppercase text-lg mb-2">Permit Fees</h3>
                <p className="text-zinc-500 text-sm">All beats require a Class-A residency permit. Failure to pay dues will result in immediate vibing suspension.</p>
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