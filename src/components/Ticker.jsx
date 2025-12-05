import React from 'react';
import { useStocks } from '../context/StockContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

const Ticker = () => {
    const { stocks, prices } = useStocks();

    // Duplicate list for seamless scrolling
    const tickerItems = [...stocks, ...stocks, ...stocks];

    return (
        <div className="w-full bg-slate-900/80 border-b border-white/5 overflow-hidden py-2 backdrop-blur-sm">
            <div className="flex animate-scroll whitespace-nowrap">
                {tickerItems.map((symbol, index) => {
                    const price = prices[symbol];
                    // Mock change for visual
                    const isUp = price % 2 > 0.5; // Random-ish
                    const change = (price * 0.01).toFixed(2);

                    return (
                        <div key={`${symbol}-${index}`} className="flex items-center gap-2 mx-6 text-sm font-medium">
                            <span className="text-slate-300">{symbol}</span>
                            <span className="text-white">${price.toFixed(2)}</span>
                            <span className={`flex items-center text-xs ${isUp ? 'text-green-400' : 'text-red-400'}`}>
                                {isUp ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                                {change}
                            </span>
                        </div>
                    );
                })}
            </div>
            <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    );
};

export default Ticker;
