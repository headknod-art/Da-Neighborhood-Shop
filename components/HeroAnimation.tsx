import React from 'react';

export const HeroAnimation: React.FC = () => {
  // Generate random window patterns
  const getWindowPattern = (count: number) => {
     return Array.from({ length: count }).map((_, i) => (
        <div 
           key={i} 
           className={`bg-yellow-400 w-1 h-1 md:w-1.5 md:h-2 m-0.5 ${Math.random() > 0.6 ? 'opacity-0' : 'opacity-60'} ${Math.random() > 0.9 ? 'animate-flicker' : ''}`}
        ></div>
     ));
  };

  return (
    <div className="absolute inset-0 bg-black overflow-hidden pointer-events-none select-none">
       {/* Stars */}
       <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
              <div 
                 key={i}
                 className="absolute bg-white rounded-full animate-twinkle"
                 style={{
                    width: Math.random() * 2 + 'px',
                    height: Math.random() * 2 + 'px',
                    top: Math.random() * 50 + '%',
                    left: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 5 + 's',
                    opacity: Math.random() * 0.5
                 }}
              ></div>
          ))}
      </div>

      {/* Back Layer City */}
      <div className="absolute bottom-0 left-0 w-[200%] h-[60%] flex items-end opacity-30 animate-scroll-slow">
          {Array.from({ length: 30 }).map((_, i) => {
              const height = 30 + Math.random() * 40; 
              const width = 4 + Math.random() * 8;
              return (
                  <div key={i} className="bg-zinc-800 mx-0.5 relative" style={{ height: `${height}%`, width: `${width}%` }}></div>
              );
          })}
      </div>

      {/* Front Layer Neighborhood */}
      <div className="absolute bottom-0 left-0 w-[200%] h-[40%] flex items-end animate-scroll-fast">
          {Array.from({ length: 20 }).map((_, i) => {
              const height = 40 + Math.random() * 40 + 'px'; // Fixed px height for neighborhood feel
              const width = 10 + Math.random() * 5 + '%';
              
              return (
                 <div key={i} className="flex flex-col justify-end mx-0 relative shrink-0 border-r border-zinc-900" style={{ width }}>
                    <div className="w-full bg-zinc-900 border-t border-zinc-800 flex flex-wrap content-start p-1 justify-center gap-0.5" style={{ height }}>
                        {getWindowPattern(6)}
                    </div>
                 </div>
              );
          })}
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
    </div>
  );
};