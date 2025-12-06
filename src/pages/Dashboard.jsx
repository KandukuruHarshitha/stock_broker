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
            <div className="-mx-6 -mt-6 mb-8">
                <Ticker />
            </div>

            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity size={48} className="text-blue-500" />
                    </div>
                    <p className="text-slate-400 text-sm mb-1">Total Portfolio Value</p>
                    <h3 className="text-3xl font-bold text-white">$24,593.00</h3>
                    <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                        +2.4% <span className="text-slate-500">today</span>
                    </p>
                </div>
                <div className="glass-card p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Layers size={48} className="text-purple-500" />
                    </div>
                    <p className="text-slate-400 text-sm mb-1">Total Profit/Loss</p>
                    <h3 className="text-3xl font-bold text-white">+$4,200.50</h3>
                    <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                        +12.8% <span className="text-slate-500">all time</span>
                    </p>
                </div>
                <div className="glass-card p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity size={48} className="text-orange-500" />
                    </div>
                    <p className="text-slate-400 text-sm mb-1">Buying Power</p>
                    <h3 className="text-3xl font-bold text-white">$12,450.00</h3>
                    <p className="text-slate-500 text-sm mt-2 flex items-center gap-1">
                        Available to trade
                    </p>
                </div>
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
