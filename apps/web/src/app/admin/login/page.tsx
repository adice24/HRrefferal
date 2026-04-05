"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../../context/AppContext';

export default function AdminLoginPage() {
  const { login } = useAppContext();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        // Only redirect valid admins
        const savedUser = localStorage.getItem('refhire_user');
        const userData = savedUser ? JSON.parse(savedUser) : null;
        if (userData?.role === 'ADMIN' || userData?.role === 'HR') {
          router.push('/admin');
        } else {
          setError('Unauthorized. Only admin allowed.');
        }
      } else {
        setError('Invalid admin credentials.');
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-dark flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-ember to-ember-dark rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-ember/20">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">System Admin</h1>
            <p className="text-sm text-white/40 mt-1">Restricted access area</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider block mb-2">Admin Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full bg-black/20 border border-white/10 text-white px-4 py-3 rounded-xl focus:border-ember/50 focus:ring-1 focus:ring-ember/50 outline-none transition-all placeholder:text-white/20"
                placeholder="admin@domain.com"
                required 
              />
            </div>
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-wider block mb-2">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full bg-black/20 border border-white/10 text-white px-4 py-3 rounded-xl focus:border-ember/50 focus:ring-1 focus:ring-ember/50 outline-none transition-all placeholder:text-white/20"
                placeholder="••••••••"
                required 
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-ember hover:bg-ember-dark text-slate-dark font-bold py-3.5 rounded-xl transition-colors mt-2"
            >
              {loading ? 'Authenticating...' : 'Secure Login'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
