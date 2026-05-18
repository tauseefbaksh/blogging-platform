import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const AdminDashboard = () => {
    const { token } = useAuth();
    const [pending, setPending] = useState([]);

    useEffect(() => {
        fetch('/api/admin/pending-users', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => res.json()).then(setPending);
    }, [token]);

    const approve = async (id) => {
        await fetch(`/api/admin/approve/${id}`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } });
        setPending(prev => prev.filter(u => u._id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto animation-fade-in">
            <div className="mb-10 border-b border-academic-sand pb-4">
                <h2 className="text-3xl font-cinzel font-bold text-academic-olive">Sovereign Admin Chamber</h2>
                <p className="font-lora text-academic-dark opacity-80 mt-2 italic">Oversee the admission of scholars to the faculty.</p>
            </div>
            
            <div className="card-academic">
                <h3 className="text-xl font-cinzel font-semibold mb-6 flex items-center gap-2">
                    <span className="text-academic-sage">✦</span> Pending Initiates <span className="text-academic-sage">✦</span>
                </h3>
                
                {Array.isArray(pending) && pending.length === 0 ? (
                    <div className="text-center py-12 bg-academic-bg/50 rounded border border-academic-sand/50 border-dashed">
                        <p className="font-cinzel text-lg text-academic-dark opacity-60">The chamber is quiet. No initiates await judgment.</p>
                    </div>
                ) : Array.isArray(pending) ? (
                    <ul className="divide-y divide-academic-sand">
                        {pending.map(u => (
                            <li key={u._id} className="py-5 flex justify-between items-center group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-academic-sand/30 flex items-center justify-center font-cinzel font-bold text-academic-olive">
                                        {u.username.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-lora font-medium text-lg text-academic-dark group-hover:text-academic-olive transition-colors">{u.username}</span>
                                </div>
                                <button 
                                    onClick={() => approve(u._id)} 
                                    className="btn-secondary flex items-center gap-2"
                                >
                                    <span>Grant Access</span>
                                    <span className="text-lg">✓</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-12 bg-red-50 rounded border border-red-200">
                        <p className="font-cinzel text-lg text-red-600">Failed to load initiates. You may lack the necessary privileges or the connection was lost.</p>
                    </div>
                )}
            </div>
        </div>
    );
};