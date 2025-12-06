import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('stock_broker_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email) => {
        // Default to 'free' plan on login if not specified
        const userData = {
            email,
            subscription: 'free',
            name: email.split('@')[0]
        };
        setUser(userData);
        localStorage.setItem('stock_broker_user', JSON.stringify(userData));
    };

    const updateSubscription = (plan) => {
        if (user) {
            const updatedUser = { ...user, subscription: plan };
            setUser(updatedUser);
            localStorage.setItem('stock_broker_user', JSON.stringify(updatedUser));
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('stock_broker_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateSubscription, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
