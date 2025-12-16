import React from 'react';

interface TwitchMonitorProps {
  channel: string;
  onClose: () => void;
}

export const TwitchMonitor: React.FC<TwitchMonitorProps> = ({ channel, onClose }) => {
  // Construct the embed URL with necessary parent parameters for security
  const hostname = window.location.hostname;
  
  // Adding aistudio.google.com and localhost for robust support in dev environments
  const embedUrl = `https://player.twitch.tv/?channel=${channel}&parent=${hostname}&parent=aistudio.google.com&parent=localhost&muted=false`;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md animate-fade-in-up">
       
       <div className="bg-black w-full max-w-6xl flex flex-col border border-zinc-800 shadow-[0_0_100px_rgba(250,204,21,0.15)] relative overflow-hidden">
          
          {/* Monitor Header */}
          <div className="flex justify-between items-center p-3 bg-zinc-900 border-b border-zinc-800 z-10">
             <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-black border border-zinc-700 rounded-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-500 font-mono text-[10px] font-bold uppercase tracking-widest leading-none">Live Rec</span>
                </div>
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wide hidden sm:inline">Camera 01 // Community Center</span>
             </div>
             <div className="flex items-center gap-4">
                 <span className="text-yellow-400 font-mono text-xs animate-pulse hidden sm:inline">{new Date().toLocaleTimeString()}</span>
                 <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                 </button>
             </div>
          </div>
          
          {/* Stream Container */}
          <div className="relative aspect-video w-full bg-black group">
              <iframe
                src={embedUrl}
                className="w-full h-full"
                allowFullScreen
                title="Community Watch Stream"
              ></iframe>

              {/* CCTV Overlay Effects */}
              <div className="absolute inset-0 pointer-events-none z-0">
                  {/* Scanlines */}
                  <div className="absolute inset-0 opacity-10" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}></div>
                  
                  {/* Vignette */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.6)_100%)]"></div>

                  {/* Crosshair */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-white/10 opacity-50"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/30 rounded-full"></div>
                  
                  {/* Corner Brackets */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/20"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/20"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/20"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/20"></div>
              </div>
          </div>
          
          {/* Monitor Footer */}
          <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center">
              <div className="flex gap-2 text-[9px] text-zinc-600 font-mono uppercase">
                  <span>Bitrate: 4500kbps</span>
                  <span className="text-zinc-800">|</span>
                  <span>Signal: Strong</span>
              </div>
              <div className="flex gap-2">
                 <button className="px-3 py-1 bg-zinc-900 border border-zinc-700 text-[10px] text-white uppercase hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-colors">
                    Report Activity
                 </button>
              </div>
          </div>
       </div>
    </div>
  );
};