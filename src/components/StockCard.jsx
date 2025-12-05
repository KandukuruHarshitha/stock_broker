import React from 'react';
import { useStocks } from '../context/StockContext';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { Plus, Check, Mic, Sparkles } from 'lucide-react';

const StockCard = ({ symbol }) => {
    const { prices, subscriptions, toggleSubscription, history } = useStocks();
    const price = prices[symbol];
    const isSubscribed = subscriptions.includes(symbol);
    const data = history[symbol] || [];

    // Generate a random AI insight
    const getInsight = (sym) => {
        const insights = [
            "Bullish trend detected",
            "High volatility expected",
            "Strong buy signal",
            "Accumulation phase",
            "Breaking resistance"
        ];
        // Deterministic based on symbol char code sum
        const index = sym.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % insights.length;
        return insights[index];
    };

    return (
        <div className="glass-card p-5 relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-bold text-white">{symbol}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium border border-blue-500/30 flex items-center gap-1">
                            <Sparkles size={10} />
                            {getInsight(symbol)}
                        </span>
                    </div>
                    <p className="text-3xl font-mono text-white mt-1">${price.toFixed(2)}</p>
                </div>
                <button
                    onClick={() => toggleSubscription(symbol)}
                    className={`p-2 rounded-full transition-all duration-300 ${isSubscribed
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                        }`}
                >
                    {isSubscribed ? <Check size={20} /> : <Plus size={20} />}
                </button>
            </div>

            <div className="h-24 w-full -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id={`color${symbol}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <YAxis domain={['auto', 'auto']} hide />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill={`url(#color${symbol})`}
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StockCard;
