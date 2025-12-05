import React, { useState } from 'react';
import { useStocks } from '../context/StockContext';
import Ticker from '../components/Ticker';
import StockCard from '../components/StockCard';
import { Mic, MicOff, Activity, Layers } from 'lucide-react';

const Dashboard = () => {
    const { stocks, subscriptions, toggleSubscription } = useStocks();
    const [isListening, setIsListening] = useState(false);
    const [voiceText, setVoiceText] = useState('');

    const subscribedStocks = stocks.filter(s => subscriptions.includes(s));
    const otherStocks = stocks.filter(s => !subscriptions.includes(s));

    const handleVoiceCommand = () => {
        if (isListening) return;

        setIsListening(true);
        setVoiceText("Listening...");

        // Simulate voice recognition
        setTimeout(() => {
            const randomStock = stocks[Math.floor(Math.random() * stocks.length)];
            const action = Math.random() > 0.5 ? "Subscribe to" : "Check";
            const command = `${action} ${randomStock}`;

            setVoiceText(`"${command}"`);

            setTimeout(() => {
                if (action === "Subscribe to" && !subscriptions.includes(randomStock)) {
                    toggleSubscription(randomStock);
                }
                setIsListening(false);
                setVoiceText('');
            }, 1500);
        }, 2000);
    };

    return (
        <div className="space-y-8">
            <div className="-mx-6 -mt-6 mb-6">
                <Ticker />
            </div>

            {/* Voice Command FAB */}
            <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2">
                {voiceText && (
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-2">
                        {voiceText}
                    </div>
                )}
                <button
                    onClick={handleVoiceCommand}
                    className={`p-4 rounded-full shadow-2xl transition-all duration-300 ${isListening
                            ? 'bg-red-500 animate-pulse scale-110'
                            : 'bg-blue-600 hover:bg-blue-500 hover:scale-105'
                        }`}
                >
                    {isListening ? <MicOff size={24} className="text-white" /> : <Mic size={24} className="text-white" />}
                </button>
            </div>

            {/* Watchlist Section */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Activity className="text-blue-400" />
                    <h2 className="text-2xl font-bold text-white">Your Watchlist</h2>
                </div>

                {subscribedStocks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subscribedStocks.map(symbol => (
                            <StockCard key={symbol} symbol={symbol} />
                        ))}
                    </div>
                ) : (
                    <div className="glass-card p-8 text-center text-slate-400 border-dashed border-2 border-slate-700">
                        <p>You haven't subscribed to any stocks yet.</p>
                        <p className="text-sm mt-2">Use the voice command or select from below.</p>
                    </div>
                )}
            </section>

            {/* Market Overview Section */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Layers className="text-purple-400" />
                    <h2 className="text-2xl font-bold text-white">Market Overview</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherStocks.map(symbol => (
                        <StockCard key={symbol} symbol={symbol} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
