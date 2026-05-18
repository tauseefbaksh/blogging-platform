import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    
    const isActive = (path) => location.pathname === path;
    const navLinkClass = (path) => `mr-8 font-cinzel font-semibold text-lg transition-colors duration-300 ${isActive(path) ? 'text-academic-olive border-b-2 border-academic-olive pb-1' : 'text-academic-dark opacity-80 hover:text-academic-olive hover:opacity-100'}`;

    return (
        <nav className="bg-academic-bg/90 backdrop-blur-md sticky top-0 z-50 border-b border-academic-sand py-4 px-8 flex justify-between items-center shadow-sm">
            <Link to="/" className="text-3xl font-bold font-cinzel text-academic-olive tracking-widest flex items-center gap-3 hover:opacity-90 transition-opacity">
                <span className="bg-academic-olive text-academic-bg px-2 py-1 rounded shadow-sm text-2xl">LMS</span>
                Portal
            </Link>
            <div className="flex items-center">
                <Link to="/" className={navLinkClass('/')}>Repository</Link>
                {user ? (
                    <>
                        <Link to="/dashboard" className={navLinkClass('/dashboard')}>Dashboard</Link>
                        <div className="border-l border-academic-sand pl-6 ml-2 flex items-center gap-4">
                            <span className="font-lora text-academic-dark italic">Welcome, Scholar {user.username}</span>
                            <button onClick={logout} className="text-red-700 font-cinzel font-semibold hover:text-red-900 transition-colors bg-red-50 px-4 py-1.5 rounded border border-red-200 shadow-sm hover:shadow">Logout</button>
                        </div>
                    </>
                ) : (
                    <Link to="/login" className="btn-primary ml-4">Facilitator Portal</Link>
                )}
            </div>
        </nav>
    );
};