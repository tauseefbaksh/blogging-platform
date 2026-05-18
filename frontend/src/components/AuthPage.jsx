import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ username: '', password: '' });
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });
        const data = await res.json();
        if (res.ok) {
            if (isLogin) login(data.token, data.user);
            else alert('Registration complete! Await decree of the Sovereign Admin.');
        } else {
            alert(data.message || data.error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 relative animation-fade-in">
            <div className="absolute -inset-1 bg-gradient-to-r from-academic-olive to-academic-sage rounded-xl blur opacity-20"></div>
            <div className="card-academic relative bg-white">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-cinzel font-bold text-academic-olive mb-2">
                        {isLogin ? 'Facilitator Portal' : 'Request Access'}
                    </h2>
                    <p className="font-lora text-academic-dark/70 italic text-sm">
                        {isLogin ? 'Enter your credentials to access the sanctuary.' : 'Submit your scholarly credentials for review.'}
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-cinzel font-semibold text-academic-olive mb-2">Scholar Identity</label>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            required 
                            className="input-academic" 
                            onChange={e => setForm({...form, username: e.target.value})} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-cinzel font-semibold text-academic-olive mb-2">Secret Cipher</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            required 
                            className="input-academic" 
                            onChange={e => setForm({...form, password: e.target.value})} 
                        />
                    </div>
                    <button type="submit" className="w-full btn-primary text-lg mt-4 shadow-academic-olive/30 drop-shadow-md">
                        {isLogin ? 'Enter Sanctuary' : 'Submit Request'}
                    </button>
                </form>
                
                <div className="mt-8 text-center border-t border-academic-sand pt-6">
                    <button 
                        onClick={() => setIsLogin(!isLogin)} 
                        className="font-cinzel text-sm font-semibold text-academic-dark/70 hover:text-academic-olive transition-colors border-b border-transparent hover:border-academic-olive pb-0.5"
                    >
                        {isLogin ? 'New scholar? Seek admittance here.' : 'Already initiated? Return to the portal.'}
                    </button>
                </div>
            </div>
        </div>
    );
};