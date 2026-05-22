import React, { useState, useEffect } from 'react';
import { ResourceCard } from './ResourceCard';
import { useAuth } from '../context/AuthContext';

export const StudentFeed = () => {
    const [resources, setResources] = useState([]);
    const [search, setSearch] = useState('');
    const [subject, setSubject] = useState('All');

    // Extract the token to authorize the admin's delete request
    const { token } = useAuth();

    const fetchResources = async () => {
        const query = new URLSearchParams();
        if (search) query.append('search', search);
        if (subject !== 'All') query.append('subject', subject);
        try {
            const res = await fetch(`/api/public/resources?${query.toString()}`);
            setResources(await res.json());
        } catch (error) {
            console.error("Failed to fetch resources", error);
        }
    };

    useEffect(() => {
        const delay = setTimeout(fetchResources, 300);
        return () => clearTimeout(delay);
    }, [search, subject]);

    const handleLike = async (id) => {
        if (localStorage.getItem(`liked_${id}`)) return alert('You have already commended this tome!');
        const res = await fetch(`/api/public/resources/${id}/like`, { method: 'PATCH' });
        if (res.ok) {
            const data = await res.json();
            setResources(prev => prev.map(r => r._id === id ? { ...r, likes: data.likes } : r));
            localStorage.setItem(`liked_${id}`, 'true');
        }
    };

    // NEW: The Incinerate Logic
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to incinerate this manuscript? This cannot be undone.")) {
            return;
        }

        try {
            const res = await fetch(`/api/admin/resource/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                // Instantly remove the card from the UI upon successful backend deletion
                setResources(prev => prev.filter(r => r._id !== id));
            } else {
                alert("Failed to incinerate. Ensure you have Sovereign Admin privileges.");
            }
        } catch (error) {
            console.error("Error incinerating resource:", error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto animation-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-cinzel font-bold text-academic-olive mb-4">The Grand Archive</h1>
                <p className="text-lg font-lora text-academic-dark opacity-80 italic max-w-2xl mx-auto">Explore our curated collection of academic resources, tailored for scholars seeking enlightenment and mastery in their disciplines.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-12 bg-white p-6 rounded-lg shadow-sm border border-academic-sand/50 items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-academic-sage"></div>
                <div className="w-full md:w-2/3">
                    <label className="block text-sm font-cinzel font-semibold text-academic-olive mb-2">Search the Archives</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="e.g., Quantum Mechanics, React Hooks..."
                            className="input-academic pl-10"
                            onChange={e => setSearch(e.target.value)}
                        />
                        <span className="absolute left-3 top-3.5 opacity-50">🔍</span>
                    </div>
                </div>
                <div className="w-full md:w-1/3">
                    <label className="block text-sm font-cinzel font-semibold text-academic-olive mb-2">Discipline</label>
                    <select className="input-academic cursor-pointer appearance-none" onChange={e => setSubject(e.target.value)}>
                        <option>All</option>
                        <option>React</option>
                        <option>Node.js</option>
                        <option>Computer Science</option>
                    </select>
                </div>
            </div>

            {resources.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg border border-academic-sand/50 shadow-sm">
                    <p className="font-cinzel text-xl text-academic-dark opacity-60">The archives hold no scrolls matching your inquiry.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* NEW: Passed the handleDelete function down as the onDelete prop */}
                    {resources.map(r => <ResourceCard key={r._id} resource={r} onLike={handleLike} onDelete={handleDelete} />)}
                </div>
            )}
        </div>
    );
};
