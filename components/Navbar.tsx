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
            <div className="h-12 w-12 relative group">
                <img 
                    src="https://i.imgur.com/jWk7v0m.png" 
                    alt="Da Neighborhood Logo" 
                    className="h-full w-full object-contain drop-shadow-[0_0_8px_rgba(250,204,21,0.3)] transition-transform group-hover:scale-110 duration-300"
                />
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-tighter leading-none uppercase">Da Neighborhood</span>
                <span className="text-[10px] font-bold text-yellow-400 tracking-widest uppercase">Est. 2024</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={onCartClick}
              className="relative group flex items-center gap-2 text-zinc-400 hover:text-yellow-400 transition-colors"
            >
              <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 text-[10px] font-bold leading-none text-black bg-yellow-400 rounded-full">
                      {cartCount}
                    </span>
                  )}
              </div>
              <span className="hidden sm:block text-sm font-bold uppercase tracking-wider">Cart</span>
            </button>
            <div className="h-9 w-9 rounded-none border border-zinc-700 bg-zinc-900 overflow-hidden hover:border-yellow-400 transition-colors">
                <img src="https://picsum.photos/100/100" alt="User" className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};