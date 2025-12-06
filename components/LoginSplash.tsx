import React, { useState } from 'react';

interface LoginSplashProps {
  onLogin: () => void;
}

export const LoginSplash: React.FC<LoginSplashProps> = ({ onLogin }) => {
  const [codename, setCodename] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  // Generate random window patterns for the buildings
  const getWindowPattern = (count: number) => {
     return Array.from({ length: count }).map((_, i) => (
        <div 
           key={i} 
           className={`bg-yellow-400 w-1 h-2 md:w-2 md:h-3 m-1 ${Math.random() > 0.7 ? 'opacity-0' : 'opacity-80'} ${Math.random() > 0.8 ? 'animate-pulse' : ''}`}
           style={{ animationDelay: `${Math.random() * 5}s` }}
        ></div>
     ));
  };

  return (
    <div className="fixed inset-0 bg-black z-[100] overflow-hidden flex items-center justify-center">
      {/* --- Background Animation Layer --- */}
      
      {/* Stars */}
      <div className="absolute inset-0 z-0">
          {Array.from({ length: 50 }).map((_, i) => (
              <div 
                 key={i}
                 className="absolute bg-white rounded-full animate-twinkle"
                 style={{
                    width: Math.random() * 3 + 'px',
                    height: Math.random() * 3 + 'px',
                    top: Math.random() * 60 + '%',
                    left: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 5 + 's',
                    opacity: Math.random()
                 }}
              ></div>
          ))}
      </div>

      {/* Moon */}
      <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-yellow-400 opacity-20 blur-xl z-0"></div>
      <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-zinc-900 border-2 border-yellow-400/50 z-0"></div>

      {/* Back City Layer (Slow) */}
      <div className="absolute bottom-0 left-0 w-[200%] h-[40%] flex items-end opacity-40 animate-scroll-slow z-1">
          {Array.from({ length: 20 }).map((_, i) => {
              const height = 20 + Math.random() * 40; // 20-60% height
              const width = 5 + Math.random() * 10;   // 5-15% width
              return (
                  <div key={i} className="bg-zinc-800 mx-1 relative" style={{ height: `${height}%`, width: `${width}%` }}>
                     {/* Roof antenna */}
                     <div className="absolute -top-4 left-1/2 w-[1px] h-4 bg-zinc-600"></div>
                  </div>
              );
          })}
      </div>

      {/* Front Neighborhood Layer (Fast) */}
      <div className="absolute bottom-0 left-0 w-[200%] h-[35%] flex items-end animate-scroll-fast z-2">
          {Array.from({ length: 15 }).map((_, i) => {
              // Alternate between houses and small apartments
              const isHouse = i % 2 === 0;
              const height = isHouse ? '150px' : '250px';
              const width = isHouse ? '180px' : '140px';
              
              return (
                 <div key={i} className="flex flex-col justify-end mx-0 relative shrink-0" style={{ width }}>
                    {/* Roof for House */}
                    {isHouse && (
                        <div className="w-full h-16 bg-zinc-900 border-t border-l border-r border-yellow-400/30" 
                             style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
                        </div>
                    )}
                    {/* Building Body */}
                    <div 
                        className={`w-full bg-zinc-900 border-r border-t border-zinc-800 flex flex-wrap content-start p-2 justify-center gap-1
                            ${!isHouse ? 'border-yellow-400/20' : ''}
                        `}
                        style={{ height }}
                    >
                        {getWindowPattern(isHouse ? 6 : 12)}
                    </div>
                    {/* Street Lamp */}
                    {i % 3 === 0 && (
                        <div className="absolute -right-8 bottom-0 w-2 h-40 bg-zinc-800 flex flex-col items-center">
                            <div className="w-6 h-2 bg-zinc-700 absolute top-0"></div>
                            <div className="w-3 h-4 bg-yellow-400 rounded-b-full shadow-[0_10px_30px_rgba(250,204,21,0.6)]"></div>
                        </div>
                    )}
                 </div>
              );
          })}
      </div>

      {/* Ground Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10"></div>

      {/* --- Login Container --- */}
      <div className="relative z-20 bg-black/80 backdrop-blur-md border border-zinc-800 p-8 md:p-12 w-full max-w-md shadow-[0_0_80px_rgba(250,204,21,0.15)] animate-fade-in-up">
           {/* Decorative Corners */}
           <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-yellow-400"></div>
           <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-yellow-400"></div>
           
           <div className="text-center mb-10">
              <div className="inline-block mb-4 p-4 rounded-full border border-yellow-400/20 bg-yellow-400/5">
                 <img src="https://i.imgur.com/jWk7v0m.png" alt="Logo" className="h-16 w-auto mx-auto invert opacity-90" />
              </div>
              <h1 className="text-4xl font-bold text-white uppercase tracking-tighter mb-2 leading-none">Restricted<br/><span className="text-yellow-400">Access</span></h1>
              <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em]">Da Neighborhood Portal</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                 <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 group-focus-within:text-yellow-400 transition-colors">Codename</label>
                 <input 
                    type="text" 
                    value={codename}
                    onChange={(e) => setCodename(e.target.value)}
                    className="w-full bg-black/60 border border-zinc-800 text-white px-4 py-3 text-sm focus:border-yellow-400 focus:outline-none transition-colors placeholder-zinc-700 font-mono"
                    placeholder="ENTER ID..."
                    autoFocus
                 />
              </div>
              <div className="group">
                 <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 group-focus-within:text-yellow-400 transition-colors">Passkey</label>
                 <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/60 border border-zinc-800 text-white px-4 py-3 text-sm focus:border-yellow-400 focus:outline-none transition-colors placeholder-zinc-700 font-mono"
                    placeholder="••••••••"
                 />
              </div>

              <button 
                type="submit"
                className="w-full bg-yellow-400 text-black font-bold uppercase py-4 tracking-widest hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-2 border-2 border-yellow-400 hover:border-white"
              >
                Enter Neighborhood
              </button>
           </form>
           
           <div className="mt-8 text-center border-t border-zinc-800 pt-6">
              <p className="text-[10px] text-zinc-600 uppercase font-mono">Secure Connection // Encrypted v2.4</p>
           </div>
        </div>
    </div>
  );
};