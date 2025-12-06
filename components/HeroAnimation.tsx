import React from 'react';

export const HeroAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-zinc-950 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full mix-blend-overlay filter blur-[100px] animate-pulse"></div>
      </div>

      {/* Back Layer - Industrial/Cranes (Slow) */}
      <div className="absolute bottom-0 left-0 w-[200%] h-full flex items-end opacity-40 animate-scroll-slow z-0 pointer-events-none">
         {Array.from({ length: 16 }).map((_, i) => (
             <div key={i} className="flex-1 h-full flex items-end justify-center px-1">
                 {/* Random Industrial Shapes */}
                 <div 
                   className="bg-zinc-800 w-full relative border-t border-zinc-700" 
                   style={{ height: `${20 + Math.random() * 40}%` }}
                 >
                    {/* Crane or Antenna */}
                    {i % 3 === 0 && (
                        <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-zinc-600">
                             <div className="absolute top-0 left-0 w-4 h-0.5 bg-zinc-600 animate-pulse"></div>
                        </div>
                    )}
                 </div>
             </div>
         ))}
      </div>

      {/* Front Layer - Skyscrapers (Fast) */}
      <div className="absolute bottom-0 left-0 w-[200%] h-full flex items-end animate-scroll-fast z-10 pointer-events-none">
         {Array.from({ length: 12 }).map((_, i) => {
             const height = 40 + Math.random() * 60; // Taller buildings for hero
             const hasBillboard = i % 4 === 0;
             return (
                 <div 
                    key={i} 
                    className="flex-1 flex items-end px-1"
                 >
                    <div 
                        className="w-full bg-zinc-900 border-t border-r border-l border-zinc-800 relative overflow-hidden"
                        style={{ height: `${height}%` }}
                    >
                        {/* Windows */}
                        <div className="grid grid-cols-3 gap-1 p-2">
                            {Array.from({ length: 15 }).map((__, j) => (
                                <div 
                                    key={j}
                                    className={`h-0.5 w-full bg-yellow-400 rounded-full ${Math.random() > 0.8 ? 'opacity-90 animate-flicker' : 'opacity-10'}`}
                                ></div>
                            ))}
                        </div>
                        
                        {/* Billboard on some buildings */}
                        {hasBillboard && (
                             <div className="absolute top-1/4 left-0 w-full h-12 bg-yellow-400/5 border-y border-yellow-400/20 flex flex-col items-center justify-center overflow-hidden backdrop-blur-sm">
                                 <div className="text-[6px] font-bold text-yellow-400 whitespace-nowrap tracking-widest animate-pulse">
                                     AVAILABLE NOW
                                 </div>
                                 <div className="w-1/2 h-0.5 bg-yellow-400 mt-1"></div>
                             </div>
                        )}
                        
                         {/* Rooftop AC Unit */}
                         <div className="absolute -top-2 right-2 w-3 h-2 bg-zinc-800 border border-zinc-700"></div>
                    </div>
                 </div>
             );
         })}
      </div>
      
      {/* Overlay to blend bottom */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent z-20 pointer-events-none"></div>
    </div>
  );
};