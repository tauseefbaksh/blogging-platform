import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { StudentFeed } from './components/StudentFeed';
import { AuthPage } from './components/AuthPage';
import { AdminDashboard } from './components/AdminDashboard';
import { UploadForm } from './components/UploadForm';

export default function App() {
  const { user } = useAuth();

  return (
      <div className="min-h-screen bg-academic-bg text-academic-dark font-lora selection:bg-academic-sage selection:text-academic-bg flex flex-col">
        <Navbar />
        <main className="container mx-auto px-6 py-12 flex-grow">
          <Routes>
            <Route path="/" element={<StudentFeed />} />
            <Route path="/login" element={!user ? <AuthPage /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={
              !user ? <Navigate to="/login" /> :
                  user.role === 'Admin' ? <AdminDashboard /> : <UploadForm />
            } />
          </Routes>
        </main>
        <footer className="py-6 border-t border-academic-sand mt-auto text-center">
            <p className="text-sm text-academic-olive font-cinzel opacity-80">© {new Date().getFullYear()} Universitas LMS Portal. All rights reserved.</p>
        </footer>
      </div>
  );
}