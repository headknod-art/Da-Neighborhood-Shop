import React, { useState } from 'react';
import { BEATS } from './constants';
import { Beat, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Player } from './components/Player';
import { LoginSplash } from './components/LoginSplash';
import { Home } from './components/Home';
import { CornerStore } from './components/CornerStore';
import { Mailbox } from './components/Mailbox';
import { BookingSystem } from './components/BookingSystem';

type ViewState = 'HOME' | 'STORE';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  
  // Global State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMailboxOpen, setIsMailboxOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // --- Global Handlers ---

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

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);

  if (!isAuthenticated) {
    return <LoginSplash onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans pb-32 animate-fade-in-up" style={{ animationDuration: '0.5s', animationDelay: '0s' }}>
      
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        cartCount={cart.length} 
        cartSubtotal={subtotal}
        onNavigate={setCurrentView}
        currentView={currentView}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {currentView === 'HOME' ? (
          <Home 
            onEnterStore={() => setCurrentView('STORE')} 
            onOpenMailbox={() => setIsMailboxOpen(true)}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        ) : (
          <CornerStore 
             currentBeat={currentBeat}
             isPlaying={isPlaying}
             cart={cart}
             onPlayToggle={handlePlayToggle}
             onAddToCart={handleAddToCart}
          />
        )}

      </main>

      {/* Mailbox Overlay */}
      {isMailboxOpen && (
        <Mailbox onClose={() => setIsMailboxOpen(false)} />
      )}

      {/* Booking/Hearing Overlay */}
      {isBookingOpen && (
        <BookingSystem onClose={() => setIsBookingOpen(false)} />
      )}

      {/* Cart Sidebar (Global) */}
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
                    <button onClick={() => { setIsCartOpen(false); setCurrentView('STORE'); }} className="mt-4 text-yellow-400 hover:text-white underline decoration-yellow-400 decoration-2 underline-offset-4 uppercase text-xs font-bold">Review Listings</button>
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

      {/* Global Player */}
      <Player 
        currentBeat={currentBeat} 
        isPlaying={isPlaying} 
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onNext={() => {
           if (!currentBeat) return;
           const idx = BEATS.findIndex(b => b.id === currentBeat.id);
           const nextBeat = BEATS[(idx + 1) % BEATS.length];
           setCurrentBeat(nextBeat);
        }}
        onPrev={() => {
           if (!currentBeat) return;
           const idx = BEATS.findIndex(b => b.id === currentBeat.id);
           const prevBeat = BEATS[(idx - 1 + BEATS.length) % BEATS.length];
           setCurrentBeat(prevBeat);
        }}
      />

    </div>
  );
};

export default App;