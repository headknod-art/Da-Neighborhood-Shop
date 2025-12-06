import React from 'react';

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onCartClick, cartCount }) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 relative group cursor-pointer">
                <img 
                    src="https://i.imgur.com/jWk7v0m.png" 
                    alt="Da Neighborhood HOA Logo" 
                    className="h-full w-full object-contain drop-shadow-[0_0_8px_rgba(250,204,21,0.3)] transition-transform group-hover:scale-110 duration-300"
                />
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-tighter leading-none uppercase">Da Neighborhood <span className="text-yellow-400">H.O.A.</span></span>
                <span className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase">Official Resident Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={onCartClick}
              className="relative group flex items-center gap-2 text-zinc-400 hover:text-yellow-400 transition-colors"
            >
              <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 text-[10px] font-bold leading-none text-black bg-yellow-400 rounded-full">
                      {cartCount}
                    </span>
                  )}
              </div>
              <div className="hidden sm:flex flex-col items-start leading-none">
                 <span className="text-[10px] uppercase font-bold text-zinc-600 group-hover:text-yellow-400/70">Outstanding</span>
                 <span className="text-sm font-bold uppercase tracking-wider">Fees</span>
              </div>
            </button>
            <div className="flex items-center gap-2 border-l border-zinc-800 pl-6">
                <div className="text-right hidden md:block">
                   <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Unit 404</div>
                   <div className="text-xs font-bold text-white uppercase">Resident</div>
                </div>
                <div className="h-9 w-9 rounded-none border border-zinc-700 bg-zinc-900 overflow-hidden hover:border-yellow-400 transition-colors cursor-pointer">
                    <img src="https://picsum.photos/100/100" alt="Resident" className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};