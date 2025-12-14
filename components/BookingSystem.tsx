import React, { useState } from 'react';

interface Service {
  id: string;
  name: string;
  alias: string; // The "Studio" name
  duration: string;
  price: number;
}

const SERVICES: Service[] = [
  { id: '1', name: 'Disciplinary Hearing', alias: 'Vocal Recording Session', duration: '1 Hour', price: 50 },
  { id: '2', name: 'Noise Permit Appeal', alias: 'Production & Beat Making', duration: '2 Hours', price: 90 },
  { id: '3', name: 'Full Tribunal', alias: '4-Hour Studio Blockout', duration: '4 Hours', price: 160 },
];

const TIME_SLOTS = [
  '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM', '10:00 PM'
];

export const BookingSystem: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Simple mock calendar generation
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleBook = () => {
    alert(`Hearing Scheduled!\nService: ${selectedService?.name}\nDate: Oct ${selectedDate}\nTime: ${selectedTime}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md animate-fade-in-up">
      <div className="bg-black w-full max-w-4xl border border-zinc-800 flex flex-col max-h-[90vh] shadow-[0_0_50px_rgba(250,204,21,0.15)] relative">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-950 flex justify-between items-center sticky top-0 z-10">
          <div>
             <h2 className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-2">
               <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
               HOA Tribunal Scheduling
             </h2>
             <p className="text-zinc-500 text-xs mt-1 uppercase tracking-wide">Mandatory Appearance // Studio Booking</p>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
             </svg>
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            
            {/* Sidebar Steps */}
            <div className="w-full md:w-64 bg-zinc-900/30 border-r border-zinc-800 p-6 flex flex-col gap-8 overflow-y-auto">
                <div className={`transition-opacity ${step >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Step 01</div>
                    <div className={`text-lg font-bold uppercase ${step === 1 ? 'text-yellow-400' : 'text-white'}`}>Select Citation</div>
                    {selectedService && <div className="text-xs text-zinc-400 mt-1 font-mono border-l-2 border-zinc-700 pl-2">{selectedService.name}</div>}
                </div>
                <div className={`transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Step 02</div>
                    <div className={`text-lg font-bold uppercase ${step === 2 ? 'text-yellow-400' : 'text-white'}`}>Court Date</div>
                    {selectedDate && <div className="text-xs text-zinc-400 mt-1 font-mono border-l-2 border-zinc-700 pl-2">Oct {selectedDate} @ {selectedTime || '...'}</div>}
                </div>
                <div className={`transition-opacity ${step >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Step 03</div>
                    <div className={`text-lg font-bold uppercase ${step === 3 ? 'text-yellow-400' : 'text-white'}`}>Confirm Plea</div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-black relative">
                
                {/* Step 1: Services */}
                {step === 1 && (
                    <div className="space-y-4 animate-fade-in-up">
                        <h3 className="text-xl font-bold text-white uppercase mb-6">Select Hearing Type</h3>
                        <div className="grid gap-4">
                            {SERVICES.map(service => (
                                <button 
                                    key={service.id}
                                    onClick={() => { setSelectedService(service); setStep(2); }}
                                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border border-zinc-800 hover:border-yellow-400 hover:bg-zinc-900/50 transition-all group text-left w-full"
                                >
                                    <div>
                                        <div className="text-lg font-bold text-white uppercase group-hover:text-yellow-400 transition-colors">{service.name}</div>
                                        <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold mt-1">aka "{service.alias}"</div>
                                    </div>
                                    <div className="mt-4 md:mt-0 text-right">
                                        <div className="text-2xl font-mono text-white font-bold">${service.price}</div>
                                        <div className="text-[10px] text-zinc-500 uppercase">{service.duration}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                    <div className="animate-fade-in-up h-full flex flex-col">
                        <button onClick={() => setStep(1)} className="text-xs font-bold text-zinc-500 uppercase hover:text-white mb-6 flex items-center gap-1 w-fit">
                            &larr; Change Hearing Type
                        </button>
                        
                        <div className="flex flex-col lg:flex-row gap-8">
                             {/* Calendar Grid */}
                             <div className="flex-1">
                                 <h3 className="text-sm font-bold text-zinc-400 uppercase mb-4 tracking-wider">Select Date (October)</h3>
                                 <div className="grid grid-cols-7 gap-2">
                                     {['S','M','T','W','T','F','S'].map((d,i) => (
                                         <div key={i} className="text-center text-[10px] font-bold text-zinc-600 mb-2">{d}</div>
                                     ))}
                                     {days.map(day => (
                                         <button
                                            key={day}
                                            disabled={day < 24} // Disable past days mock
                                            onClick={() => setSelectedDate(day)}
                                            className={`
                                                aspect-square flex items-center justify-center text-sm font-bold border transition-colors
                                                ${selectedDate === day 
                                                    ? 'bg-yellow-400 text-black border-yellow-400' 
                                                    : day < 24 
                                                        ? 'text-zinc-800 border-transparent cursor-not-allowed' 
                                                        : 'text-zinc-300 border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900'}
                                            `}
                                         >
                                             {day}
                                         </button>
                                     ))}
                                 </div>
                             </div>

                             {/* Time Slots */}
                             <div className="w-full lg:w-48">
                                 <h3 className="text-sm font-bold text-zinc-400 uppercase mb-4 tracking-wider">Available Slots</h3>
                                 <div className="space-y-2">
                                     {selectedDate ? (
                                         TIME_SLOTS.map(time => (
                                             <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`w-full py-3 border text-xs font-bold uppercase tracking-wider transition-all
                                                    ${selectedTime === time 
                                                        ? 'bg-white text-black border-white' 
                                                        : 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'}
                                                `}
                                             >
                                                 {time}
                                             </button>
                                         ))
                                     ) : (
                                         <div className="text-zinc-600 text-xs italic border border-zinc-900 p-4 text-center">Select a date first</div>
                                     )}
                                 </div>
                             </div>
                        </div>

                        <div className="mt-auto pt-8 flex justify-end">
                            <button 
                                disabled={!selectedDate || !selectedTime}
                                onClick={() => setStep(3)}
                                className={`px-8 py-4 font-bold text-black uppercase tracking-widest transition-all
                                    ${(!selectedDate || !selectedTime) 
                                        ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
                                        : 'bg-yellow-400 hover:bg-white'}
                                `}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && selectedService && (
                    <div className="animate-fade-in-up flex flex-col h-full max-w-lg mx-auto justify-center">
                         <div className="border border-zinc-700 bg-zinc-900/50 p-8 text-center mb-8 relative overflow-hidden">
                             {/* Stamp Effect */}
                             <div className="absolute top-4 right-4 border-4 border-red-500/20 text-red-500/20 font-black text-4xl uppercase -rotate-12 p-2 pointer-events-none select-none">
                                 Pending
                             </div>

                             <h3 className="text-2xl font-bold text-white uppercase mb-1">Official Summons</h3>
                             <div className="w-16 h-1 bg-yellow-400 mx-auto mb-6"></div>
                             
                             <div className="space-y-4 text-sm font-mono text-zinc-300">
                                 <div className="flex justify-between border-b border-zinc-800 pb-2">
                                     <span className="text-zinc-500 uppercase">Violation Type</span>
                                     <span className="text-white font-bold">{selectedService.name}</span>
                                 </div>
                                 <div className="flex justify-between border-b border-zinc-800 pb-2">
                                     <span className="text-zinc-500 uppercase">Date</span>
                                     <span className="text-white font-bold">Oct {selectedDate}, 2024</span>
                                 </div>
                                 <div className="flex justify-between border-b border-zinc-800 pb-2">
                                     <span className="text-zinc-500 uppercase">Time</span>
                                     <span className="text-white font-bold">{selectedTime}</span>
                                 </div>
                                 <div className="flex justify-between pt-2">
                                     <span className="text-zinc-500 uppercase">Fine Amount</span>
                                     <span className="text-yellow-400 font-bold text-lg">${selectedService.price}.00</span>
                                 </div>
                             </div>
                         </div>

                         <div className="space-y-4">
                             <div className="flex items-center gap-3">
                                <input type="checkbox" id="terms" className="w-5 h-5 bg-black border border-zinc-600 rounded-none accent-yellow-400" />
                                <label htmlFor="terms" className="text-xs text-zinc-400 uppercase cursor-pointer select-none">I acknowledge that this session is recorded for quality assurance.</label>
                             </div>
                             <button 
                                onClick={handleBook}
                                className="w-full py-4 bg-yellow-400 text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
                             >
                                Submit Plea (Book Session)
                             </button>
                             <button onClick={() => setStep(2)} className="w-full py-2 text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest">
                                Cancel
                             </button>
                         </div>
                    </div>
                )}

            </div>
        </div>
      </div>
    </div>
  );
};