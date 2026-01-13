import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Layout = ({ children }) => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleConfirmLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans antialiased text-slate-200">
      {/* Navigation */}
      {isAuthenticated && (
        <nav className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-8">
                <Link to="/posts" className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition">
                  Mini Blog
                </Link>
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/posts" className="text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg text-sm font-medium transition">
                    My Posts
                  </Link>
                  <Link to="/posts/create" className="text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg text-sm font-medium transition">
                    Create Post
                  </Link>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Account</p>
                  <p className="text-sm font-medium text-slate-300">{user?.email}</p>
                </div>
                <button
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="bg-slate-800 hover:bg-red-900/30 hover:text-red-400 border border-slate-700 hover:border-red-900/50 px-4 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className="animate-in fade-in duration-700">
        {children}
      </main>

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={() => setIsLogoutModalOpen(false)} />
          <div className="relative bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
              </div>
              <h2 className="text-lg font-bold text-white mb-2">Confirm Logout</h2>
              <p className="text-slate-400 text-sm">Are you sure you want to end your session?</p>
            </div>
            <div className="flex border-t border-slate-800">
              <button onClick={() => setIsLogoutModalOpen(false)} className="flex-1 px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800 transition">Cancel</button>
              <button onClick={handleConfirmLogout} className="flex-1 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 transition border-l border-slate-800">Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;