import React, { useState } from 'react';
import { Check, Info, Shield, Zap, BarChart2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Subscription = () => {
    const { user, updateSubscription } = useAuth();
    const navigate = useNavigate();
    const [billingCycle, setBillingCycle] = useState('monthly');

    const handleSubscribe = (plan) => {
        updateSubscription(plan);
        // Simulate processing
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    const plans = [
        {
            id: 'free',
            name: 'Starter',
            price: 'Free',
            description: 'Essential tools for casual traders',
            features: [
                'Real-time market data (15 min delay)',
                'Basic Watchlist',
                '5 Stock Alerts/month',
                'Standard Charts',
                'Community Access'
            ],
            color: 'border-slate-700',
            buttonColor: 'bg-slate-700 hover:bg-slate-600',
            icon: Shield
        },
        {
            id: 'pro',
            name: 'Pro Trader',
            price: billingCycle === 'monthly' ? '$29' : '$290',
            period: billingCycle === 'monthly' ? '/mo' : '/yr',
            description: 'Advanced insights for serious investors',
            popular: true,
            features: [
                'Real-time data (No delay)',
                'Unlimited Watchlists',
                'Unlimited Stock Alerts',
                'Advanced Technical Indicators',
                'AI-Powered Market Sentiment',
                'Portfolio Analysis'
            ],
            color: 'border-blue-500 shadow-blue-500/20',
            buttonColor: 'bg-blue-600 hover:bg-blue-500',
            icon: Zap
        },
        {
            id: 'institutional',
            name: 'Institutional',
            price: billingCycle === 'monthly' ? '$99' : '$990',
            period: billingCycle === 'monthly' ? '/mo' : '/yr',
            description: 'Full power of professional trading desks',
            features: [
                'Everything in Pro',
                'API Access',
                'Algorithmic Trading Support',
                'Dedicated Account Manager',
                'Priority Support 24/7',
                'Custom Reports'
            ],
            color: 'border-purple-500 shadow-purple-500/20',
            buttonColor: 'bg-purple-600 hover:bg-purple-500',
            icon: BarChart2
        }
    ];

    return (
        <div className="min-h-screen bg-[#0B1121] text-white pt-24 pb-12 px-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent"
                    >
                        Choose Your Trading Edge
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-400 mb-8"
                    >
                        Unlock powerful tools to maximize your portfolio performance
                    </motion.p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
                        <div
                            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                            className="w-14 h-8 bg-slate-800 rounded-full cursor-pointer p-1 transition-colors relative"
                        >
                            <div className={`w-6 h-6 bg-blue-500 rounded-full transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : ''}`} />
                        </div>
                        <span className={`text-sm ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-500'}`}>
                            Yearly <span className="text-green-400 text-xs ml-1">(Save 20%)</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`glass-card p-8 relative flex flex-col ${plan.popular ? 'border-2 scale-105 z-10' : 'border border-slate-700/50'} ${plan.color}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg shadow-blue-500/40">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="mb-8">
                                <div className="p-3 bg-slate-800/50 rounded-xl w-fit mb-4">
                                    <plan.icon size={24} className="text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-slate-400 text-sm h-10">{plan.description}</p>
                            </div>

                            <div className="mb-8">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                {plan.price !== 'Free' && <span className="text-slate-500">{plan.period}</span>}
                            </div>

                            <div className="flex-grow mb-8 space-y-4">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                        <Check size={16} className="text-green-500 mt-1 shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => handleSubscribe(plan.id)}
                                className={`w-full py-3 rounded-xl font-bold transition-all duration-200 active:scale-95 ${user?.subscription === plan.id
                                        ? 'bg-slate-700 text-slate-400 cursor-default'
                                        : `${plan.buttonColor} text-white shadow-lg`
                                    }`}
                                disabled={user?.subscription === plan.id}
                            >
                                {user?.subscription === plan.id ? 'Current Plan' : 'Get Started'}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Subscription;
