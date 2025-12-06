import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ArrowRight, Github, Mail, Chrome } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            // Simulate login/register delay
            setTimeout(() => {
                login(email);
                navigate('/');
            }, 800);
        }
    };

    const socialProviders = [
        { icon: Chrome, name: 'Google', color: 'hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400' },
        { icon: Github, name: 'GitHub', color: 'hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-purple-400' },
        { icon: Mail, name: 'Apple', color: 'hover:bg-white/20 hover:border-white/50 hover:text-white' },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse-glow" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
            </div>

            <div className="w-full max-w-5xl flex rounded-3xl overflow-hidden glass-strong shadow-2xl relative z-10 min-h-[600px]">
                {/* Brand Side */}
                <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-12 flex-col justify-between relative overflow-hidden">
                    {/* Abstract Shapes */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full animate-float" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full animate-float" style={{ animationDelay: '-1s' }} />

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                            <LayoutDashboard className="text-white" size={24} />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Trade Smarter.<br />Not Harder.
                        </h1>
                        <p className="text-blue-100/80 text-lg leading-relaxed">
                            Experience the next generation of stock trading with real-time analytics and AI-powered insights.
                        </p>
                    </div>

                    <div className="relative z-10 glass-card p-6 mt-8 transform hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                <ArrowRight size={20} className="-rotate-45" />
                            </div>
                            <div>
                                <div className="text-sm text-slate-400">AAPL Profit</div>
                                <div className="text-xl font-bold text-white">+$1,240.50</div>
                            </div>
                        </div>
                        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[75%]" />
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="w-full lg:w-1/2 p-8 md:p-12 bg-slate-900/40 relative flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-white mb-2">
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <p className="text-slate-400">
                                {isLogin ? 'Enter your details to access your portfolio' : 'Start your trading journey today'}
                            </p>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-3 gap-3 mb-8">
                            {socialProviders.map((provider) => (
                                <button
                                    key={provider.name}
                                    type="button"
                                    className={`flex items-center justify-center py-2.5 rounded-xl border border-slate-700 bg-slate-800/50 text-slate-300 transition-all duration-300 ${provider.color}`}
                                    onClick={() => alert(`${provider.name} login is currently in demo mode.`)}
                                >
                                    <provider.icon size={20} />
                                </button>
                            ))}
                        </div>

                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-700/50"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-[#0B1121] text-slate-500">Or continue with</span>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.form
                                key={isLogin ? 'login' : 'register'}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                {!isLogin && (
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="glass-input w-full"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="glass-input w-full"
                                        placeholder="trader@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                                    <input
                                        type="password"
                                        className="glass-input w-full"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full glass-btn py-3 mt-4 text-lg shadow-blue-600/20"
                                >
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                </button>
                            </motion.form>
                        </AnimatePresence>

                        <div className="mt-8 text-center">
                            <p className="text-slate-400 text-sm">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                                >
                                    {isLogin ? 'Sign Up' : 'Log In'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
