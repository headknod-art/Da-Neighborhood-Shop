import React, { useState } from 'react';

const CHARACTER_IMG = "generated-image-6.png";

interface LoginSplashProps {
  onLogin: () => void;
}

export const LoginSplash: React.FC<LoginSplashProps> = ({ onLogin }) => {
  const [codename, setCodename] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication bypass for demo
    onLogin();
  };

  return (
    <div className="fixed inset-0 bg-black z-[100] overflow-hidden flex items-center justify-center">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black pointer-events-none"></div>
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="relative w-full max-w-7xl mx-auto h-full flex items-center justify-center px-4">
        
        {/* Character Animation */}
        <div className="hidden md:block absolute bottom-0 left-[10%] lg:left-[15%] xl:left-[20%] z-10 w-[60vh] h-[80vh] animate-slide-in-left pointer-events-none origin-bottom">
             <img 
                src={CHARACTER_IMG} 
                alt="Love Thy Neighbor Character" 
                className="w-full h-full object-contain object-bottom drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
             />
        </div>

        {/* Login Container - Positioned to look like character is leaning on it */}
        <div className="relative z-20 bg-zinc-950/90 backdrop-blur-md border-4 border-yellow-400 p-8 md:p-12 w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-fade-in-up md:ml-[300px] lg:ml-[400px]">
           {/* Decorative Corners */}
           <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-yellow-400"></div>
           <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-yellow-400"></div>
           
           <div className="text-center mb-10">
              <div className="inline-block mb-4">
                 <img src="https://i.imgur.com/jWk7v0m.png" alt="Logo" className="h-12 w-auto mx-auto invert opacity-80" />
              </div>
              <h1 className="text-4xl font-bold text-white uppercase tracking-tighter mb-2 leading-none">Restricted<br/><span className="text-yellow-400">Access</span></h1>
              <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em]">Authorized Personnel Only</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                 <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 group-focus-within:text-yellow-400 transition-colors">Codename</label>
                 <input 
                    type="text" 
                    value={codename}
                    onChange={(e) => setCodename(e.target.value)}
                    className="w-full bg-black/50 border border-zinc-800 text-white px-4 py-3 text-sm focus:border-yellow-400 focus:outline-none transition-colors placeholder-zinc-700 font-mono"
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
                    className="w-full bg-black/50 border border-zinc-800 text-white px-4 py-3 text-sm focus:border-yellow-400 focus:outline-none transition-colors placeholder-zinc-700 font-mono"
                    placeholder="••••••••"
                 />
              </div>

              <button 
                type="submit"
                className="w-full bg-yellow-400 text-black font-bold uppercase py-4 tracking-widest hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 mt-2"
              >
                Enter Neighborhood
              </button>
           </form>
           
           <div className="mt-8 text-center border-t border-zinc-900 pt-6">
              <p className="text-[10px] text-zinc-600 uppercase font-mono">Secure Connection // Encrypted v2.4</p>
           </div>
        </div>
      </div>
    </div>
  );
};