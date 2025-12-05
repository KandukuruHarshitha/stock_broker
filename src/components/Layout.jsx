import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, User } from 'lucide-react';
import { cn } from '../lib/utils';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white font-sans selection:bg-blue-500/30">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50">
                        <LayoutDashboard size={20} className="text-white" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        TradePro
                    </h1>
                </div>

                {user && (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-white/10">
                            <User size={14} className="text-slate-400" />
                            <span className="text-sm text-slate-200">{user.email}</span>
                        </div>
                        <button
                            onClick={logout}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="pt-24 px-6 pb-10 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
};

export default Layout;
