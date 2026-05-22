import React from 'react';
import { useAuth } from '../context/AuthContext';

// NEW: Destructured onDelete from props
export const ResourceCard = ({ resource, onLike, onDelete }) => {
    // Extract the user to check their role
    const { user } = useAuth();
    const isLiked = localStorage.getItem(`liked_${resource._id}`);

    return (
        <div className="card-academic group flex flex-col h-full transform hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-academic-sand/20 rounded-bl-full -z-10 transition-transform group-hover:scale-150"></div>

            <div className="flex justify-between items-start mb-4 gap-2">
                <h3 className="font-bold text-xl font-cinzel text-academic-olive line-clamp-2 leading-snug">{resource.title}</h3>
                <span className="text-xs font-bold px-2 py-1 rounded bg-academic-bg border border-academic-sand text-academic-olive uppercase tracking-wider shrink-0 shadow-sm">{resource.fileType}</span>
            </div>

            <div className="mb-6 flex-grow">
                <div className="inline-block bg-academic-sage/20 px-3 py-1 rounded-full text-sm font-semibold text-academic-dark mb-2 font-cinzel tracking-wide border border-academic-sage/30">
                    {resource.subject}
                </div>
                <p className="text-sm text-academic-dark/70 font-lora mt-2">Topic: <span className="italic">{resource.topic}</span></p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-academic-sand/50 mt-auto">
                <button
                    onClick={() => onLike(resource._id)}
                    className={`px-4 py-1.5 rounded-full flex items-center gap-2 transition-all font-cinzel font-semibold text-sm border shadow-sm ${isLiked ? 'bg-academic-olive text-academic-bg border-academic-olive' : 'bg-white text-academic-olive border-academic-sand hover:bg-academic-sage hover:text-white hover:border-academic-sage'}`}
                >
                    <span className="text-lg">✒️</span>
                    <span>{resource.likes} {resource.likes === 1 ? 'Commendation' : 'Commendations'}</span>
                </button>

                <div className="flex items-center gap-4">
                    {/* CONDITIONAL RENDER: Only the Sovereign Admin sees this */}
                    {user?.role === 'Admin' && (
                        <button
                            onClick={() => onDelete(resource._id)}
                            className="text-sm font-bold font-cinzel text-red-800 border-b-2 border-transparent hover:border-red-800 transition-all pb-0.5 tracking-wider"
                        >
                            Incinerate
                        </button>
                    )}

                    <a
                        href={`/uploads/${resource.storedFilename}`}
                        download
                        className="text-sm font-bold font-cinzel text-academic-olive border-b-2 border-transparent hover:border-academic-olive transition-all pb-0.5 tracking-wider"
                    >
                        Retrieve Manuscript
                    </a>
                </div>
            </div>
        </div>
    );
};
