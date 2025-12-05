import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            login(email);
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black p-4">
            <div className="glass-card p-8 w-full max-w-md relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/40 rotate-3">
                            <LayoutDashboard size={32} className="text-white" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-center mb-2 text-white">Welcome Back</h2>
                    <p className="text-center text-slate-400 mb-8">Enter your email to access your trading dashboard</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full glass-input"
                                placeholder="trader@example.com"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full glass-btn flex items-center justify-center gap-2 group"
                        >
                            <span>Enter Dashboard</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-6 text-center text-xs text-slate-500">
                        <p>Demo Mode: No password required.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
