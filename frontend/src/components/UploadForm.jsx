import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const UploadForm = () => {
    const { token, user } = useAuth();
    const [form, setForm] = useState({ title: '', subject: '', topic: '', file: null });

    if (!user.isApproved) return (
        <div className="max-w-2xl mx-auto mt-20 text-center card-academic bg-amber-50 border-amber-200">
            <span className="text-4xl mb-4 block">⌛</span>
            <h2 className="text-2xl font-cinzel font-bold text-amber-800 mb-2">Awaiting Decree</h2>
            <p className="font-lora text-amber-700">Your petition to join the faculty is currently under review by the Sovereign Admin. Return anon.</p>
        </div>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(form).forEach(key => data.append(key, form[key]));

        const res = await fetch('/api/resources/upload', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: data
        });
        if (res.ok) {
            alert('Manuscript successfully enshrined in the archives!');
            e.target.reset();
        } else {
            alert('Upload failed. Ensure your parchment is of the correct format (PDF, PPT, PPTX).');
        }
    };

    return (
        <div className="max-w-2xl mx-auto animation-fade-in">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-cinzel font-bold text-academic-olive">Contribute to the Archives</h2>
                <p className="font-lora text-academic-dark opacity-80 mt-2 italic">Share your wisdom with fellow scholars.</p>
            </div>

            <div className="card-academic">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-cinzel font-semibold text-academic-olive mb-2">Title of Manuscript</label>
                            <input
                                type="text"
                                placeholder="E.g., The Principles of Reactivity"
                                required
                                className="input-academic text-lg py-4"
                                onChange={e => setForm({ ...form, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-cinzel font-semibold text-academic-olive mb-2">Discipline</label>
                            <input
                                type="text"
                                placeholder="E.g., Computer Science"
                                required
                                className="input-academic"
                                onChange={e => setForm({ ...form, subject: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-cinzel font-semibold text-academic-olive mb-2">Specific Topic</label>
                            <input
                                type="text"
                                placeholder="E.g., State Management"
                                required
                                className="input-academic"
                                onChange={e => setForm({ ...form, topic: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-academic-sand/50">
                        <label className="block text-sm font-cinzel font-semibold text-academic-olive mb-2">The Parchment (PDF, PPT, PPTX)</label>
                        <div className="relative">
                            <input
                                type="file"
                                accept=".pdf,.ppt,.pptx"
                                required
                                className="w-full text-sm text-academic-dark file:mr-4 file:py-3 file:px-6 file:rounded file:border-0 file:text-sm file:font-semibold file:font-cinzel file:bg-academic-sand/50 file:text-academic-olive hover:file:bg-academic-sand hover:file:cursor-pointer border border-academic-sand rounded bg-academic-bg/50 focus:outline-none transition-colors"
                                onChange={e => setForm({ ...form, file: e.target.files[0] })}
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full btn-primary text-xl py-4 mt-8 flex justify-center items-center gap-3">
                        <span>Enshrine Manuscript</span>
                        <span className="text-2xl">📜</span>
                    </button>
                </form>
            </div>
        </div>
    );
};