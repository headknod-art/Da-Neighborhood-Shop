import React, { useState } from 'react';

interface Message {
  id: string;
  from: string;
  subject: string;
  date: string;
  body: string;
  urgent?: boolean;
}

const INBOX_MESSAGES: Message[] = [
  {
    id: '1',
    from: 'HOA Board of Directors',
    subject: 'VIOLATION: Bass Levels Too Low',
    date: 'Today, 9:41 AM',
    body: `Dear Resident of Unit 404,

Our sensors indicate that your average bass output dropped below 80dB between the hours of 2:00 AM and 4:00 AM. 

As per Neighborhood Bylaw §408.2, "Quiet Hours" are strictly prohibited. Sleep is not an excuse for low fidelity.

Please increase your subwoofer gain immediately to avoid a citation.

Regards,
Da Neighborhood H.O.A.`,
    urgent: true
  },
  {
    id: '2',
    from: 'Community Event Bot',
    subject: 'Upcoming Block Party: "Mandatory Mosh"',
    date: 'Yesterday',
    body: `Greetings Resident,

You are cordially summoned to the monthly Block Party. 

Theme: High BPM Only.
Location: Cul-de-sac 4.
Time: Sunset until the police give up.

Attendance is mandatory. Bring your own earplugs (optional, but recommended for weak constitutions).

- Event Committee`,
    urgent: false
  },
  {
    id: '3',
    from: 'Maintenance',
    subject: 'Scheduled Downtime: Street Lights',
    date: 'Oct 24',
    body: `To All Units:

The street lights will be entering "Strobe Mode" for routine testing this Friday. 

Please ensure your window blinds are secured if you are photosensitive. We are not responsible for any seizures or spontaneous dancing that may occur.

- Maintenance Division`,
    urgent: false
  }
];

export const Mailbox: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [replyMode, setReplyMode] = useState(false);

  const selectedMessage = INBOX_MESSAGES.find(m => m.id === selectedId);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-md animate-fade-in-up">
      <div className="bg-black w-full max-w-5xl h-[80vh] border border-zinc-800 flex flex-col md:flex-row shadow-[0_0_50px_rgba(250,204,21,0.1)] overflow-hidden">
        
        {/* Sidebar / List */}
        <div className={`w-full md:w-1/3 border-r border-zinc-800 flex flex-col ${selectedId ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-6 border-b border-zinc-800 bg-zinc-950 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white uppercase tracking-tight">Inbox <span className="text-yellow-400">({INBOX_MESSAGES.length})</span></h2>
                <button onClick={onClose} className="md:hidden text-zinc-500">Close</button>
            </div>
            <div className="flex-1 overflow-y-auto">
                {INBOX_MESSAGES.map(msg => (
                    <div 
                        key={msg.id}
                        onClick={() => { setSelectedId(msg.id); setReplyMode(false); }}
                        className={`p-4 border-b border-zinc-800 cursor-pointer transition-colors hover:bg-zinc-900 group
                            ${selectedId === msg.id ? 'bg-zinc-900 border-l-4 border-l-yellow-400' : 'border-l-4 border-l-transparent'}
                        `}
                    >
                        <div className="flex justify-between items-start mb-1">
                            <span className={`text-xs font-bold uppercase truncate max-w-[70%] ${msg.urgent ? 'text-red-500' : 'text-zinc-400 group-hover:text-white'}`}>{msg.from}</span>
                            <span className="text-[10px] text-zinc-600">{msg.date}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1 truncate">{msg.subject}</h4>
                        <p className="text-xs text-zinc-500 truncate">{msg.body}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Message View */}
        <div className={`w-full md:w-2/3 flex flex-col bg-zinc-950/50 ${!selectedId ? 'hidden md:flex' : 'flex'}`}>
            {selectedMessage ? (
                <>
                    {/* Header */}
                    <div className="p-6 border-b border-zinc-800 flex justify-between items-start bg-zinc-900/30">
                        <div>
                            <button onClick={() => setSelectedId(null)} className="md:hidden mb-4 text-xs font-bold text-zinc-500 uppercase flex items-center gap-1">
                                &larr; Back to Inbox
                            </button>
                            <h2 className="text-2xl font-bold text-white mb-2">{selectedMessage.subject}</h2>
                            <div className="flex items-center gap-2 text-xs">
                                <span className="text-zinc-500 uppercase font-bold">From:</span>
                                <span className="text-yellow-400 font-mono">{selectedMessage.from}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-zinc-600 font-mono">{selectedMessage.date}</span>
                            <button onClick={onClose} className="hidden md:block text-zinc-500 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex-1 p-8 overflow-y-auto">
                         <div className="whitespace-pre-wrap font-mono text-sm text-zinc-300 leading-relaxed max-w-2xl">
                            {selectedMessage.body}
                         </div>
                    </div>

                    {/* Actions */}
                    <div className="p-6 border-t border-zinc-800 bg-zinc-900">
                        {!replyMode ? (
                            <div className="flex gap-4">
                                <button onClick={() => setReplyMode(true)} className="px-6 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-yellow-400 transition-colors">
                                    Reply
                                </button>
                                <button className="px-6 py-3 border border-zinc-700 text-zinc-400 font-bold uppercase tracking-wider hover:text-white hover:border-white transition-colors">
                                    Archive
                                </button>
                            </div>
                        ) : (
                            <div className="animate-fade-in-up">
                                <textarea 
                                    className="w-full h-32 bg-black border border-zinc-700 p-4 text-white font-mono text-sm mb-4 focus:border-yellow-400 outline-none resize-none"
                                    placeholder="Write your response..."
                                    autoFocus
                                ></textarea>
                                <div className="flex gap-4 justify-end">
                                    <button onClick={() => setReplyMode(false)} className="px-4 py-2 text-zinc-500 hover:text-white text-xs font-bold uppercase">Cancel</button>
                                    <button onClick={() => { alert('Message sent to HOA Board.'); setReplyMode(false); }} className="px-6 py-2 bg-yellow-400 text-black font-bold uppercase tracking-wider hover:bg-white">
                                        Send Transmission
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 p-8 text-center relative">
                    <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white md:block hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="uppercase tracking-widest font-bold">Select a message to read</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};