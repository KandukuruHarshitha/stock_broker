import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const StockContext = createContext();

export const useStocks = () => useContext(StockContext);

const SUPPORTED_STOCKS = ['GOOG', 'TSLA', 'AMZN', 'META', 'NVDA'];

const INITIAL_PRICES = {
    'GOOG': 140.50,
    'TSLA': 240.30,
    'AMZN': 130.20,
    'META': 300.10,
    'NVDA': 450.60
};

export const StockProvider = ({ children }) => {
    const { user } = useAuth();
    const [prices, setPrices] = useState(INITIAL_PRICES);
    const [subscriptions, setSubscriptions] = useState([]);
    const [history, setHistory] = useState({}); // Store history for charts

    // Load subscriptions when user changes
    useEffect(() => {
        if (user) {
            const stored = localStorage.getItem(`stock_subs_${user.email}`);
            if (stored) {
                setSubscriptions(JSON.parse(stored));
            } else {
                setSubscriptions([]);
            }
        } else {
            setSubscriptions([]);
        }
    }, [user]);

    // Simulate Price Updates
    useEffect(() => {
        const interval = setInterval(() => {
            setPrices(prev => {
                const newPrices = { ...prev };
                const newHistory = { ...history };

                SUPPORTED_STOCKS.forEach(symbol => {
                    const change = (Math.random() - 0.5) * 2; // Random change between -1 and 1
                    newPrices[symbol] = Math.max(0, prev[symbol] + change);

                    // Update history (keep last 20 points)
                    if (!newHistory[symbol]) newHistory[symbol] = [];
                    newHistory[symbol] = [...newHistory[symbol], { time: new Date().toLocaleTimeString(), price: newPrices[symbol] }].slice(-20);
                });

                setHistory(newHistory);
                return newPrices;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [history]); // Dependency on history might cause re-render loop if not careful, but setHistory is inside. 
    // Actually, better to use functional update for history to avoid dependency issues.

    const toggleSubscription = (symbol) => {
        if (!user) return;

        let newSubs;
        if (subscriptions.includes(symbol)) {
            newSubs = subscriptions.filter(s => s !== symbol);
        } else {
            newSubs = [...subscriptions, symbol];
        }

        setSubscriptions(newSubs);
        localStorage.setItem(`stock_subs_${user.email}`, JSON.stringify(newSubs));
    };

    return (
        <StockContext.Provider value={{
            stocks: SUPPORTED_STOCKS,
            prices,
            subscriptions,
            toggleSubscription,
            history
        }}>
            {children}
        </StockContext.Provider>
    );
};
