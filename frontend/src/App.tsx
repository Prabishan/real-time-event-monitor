import { useState } from 'react'

import './App.css'

type Event = {
    id: string | number;
    event_json: object;
};

function App() {
  const [events, setEvents] = useState<Event[]>([])

  return (
   <div className="bg-gray-900 text-gray-100 min-h-screen font-sans flex flex-col">
            {/* Header */}
            <header className="p-4 border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-cyan-400">System Event Monitor</h1>
                    
                </div>
            </header>
            

            <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Event Log */}
                <section className="lg:col-span-2 bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col">
                    <h2 className="text-xl font-semibold mb-4 text-gray-200">Live Event Log</h2>
                    <div className="bg-gray-900 rounded-lg p-4 flex-grow h-96 overflow-y-auto font-mono text-sm">
                        {events.length === 0 ? (
                             <div className="h-full flex items-center justify-center text-gray-500">
                                Waiting for matching events...
                            </div>
                        ) : (
                            events.map(event => <EventLogItem key={event.id} event={event} />)
                        )}
                       
                    </div>
                </section>
            </main>
        </div>
  )
}
const EventLogItem = ({ event }: any) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const levelColors = {
        error: 'bg-red-500/20 border-red-500 text-red-300',
        warn: 'bg-yellow-500/20 border-yellow-500 text-yellow-300',
        info: 'bg-blue-500/20 border-blue-500 text-blue-300',
        success: 'bg-green-500/20 border-green-500 text-green-300',
        default: 'bg-gray-500/20 border-gray-500 text-gray-300',
    };

    const levelColor = levelColors[event.level as keyof typeof levelColors] || levelColors.default;

    return (
        <div className={`border-l-4 p-3 mb-2 rounded-r-lg ${levelColor}`}>
            <div className="flex justify-between items-start cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div>
                    <span className={`font-bold uppercase text-xs mr-3`}>{event.level}</span>
                    <span className="text-gray-200">{event.message}</span>
                </div>
                <div className="text-gray-400 text-xs text-right ml-4">
                    <div className="font-semibold">{event.source}</div>
                    <div>{new Date(event.timestamp).toLocaleTimeString()}</div>
                </div>
            </div>
            {isExpanded && (
                 <div className="mt-2 pt-2 border-t border-gray-700/50">
                     <pre className="text-xs text-cyan-300 whitespace-pre-wrap bg-gray-800/50 p-3 rounded">
                         {JSON.stringify(event.details, null, 2)}
                     </pre>
                 </div>
            )}
        </div>
    );
};

export default App
