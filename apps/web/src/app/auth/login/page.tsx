"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '../../../context/AppContext';
import VisualSection from '../../../components/auth/VisualSection';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAppContext();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(form.email, form.password);
      if (success) {
        toast.success('Access Granted. Redirecting...');
        // We handle actual route redirect in AppContext or check role here
        // But login_user already sets user state.
        
        // Wait 1s for state update then redirect. 
        // In a real app we'd redirect as soon as state exists.
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        setError('Verification failed. Check credentials.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed.');
      toast.error('Access Denied');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#fcfcf9] overflow-hidden">
      {/* LEFT SIDE - AUTH FORM */}
      <div className="flex flex-col w-full lg:w-1/2 p-6 lg:p-12 overflow-y-auto">
        <header className="flex items-center justify-between mb-12">
          <Link href="/" className="text-2xl font-black tracking-tighter text-[#2B1D1C] hover:opacity-80 transition-opacity">
            PLATFORM
          </Link>
          <Link href="/auth/register" className="px-6 py-2.5 rounded-xl border-2 border-[#861C1C] text-[#861C1C] text-[10px] font-black uppercase tracking-widest hover:bg-[#861C1C]/5 transition-all">
            Join Cluster
          </Link>
        </header>

        <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center py-10">
          <div className="mb-10 animate-fade-in">
            <h1 className="text-[56px] lg:text-[72px] font-black leading-[0.85] tracking-tighter text-[#2B1D1C] mb-6">
              Welcome<br />Back
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Log in to your recruitment cluster securely using your credentials.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-[10px] uppercase font-black tracking-widest border border-red-100 flex items-center justify-center animate-shake">
                 {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2B1D1C]/60 ml-1">Email Identifier</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="identifier@cluster.io"
                className="w-full px-6 py-4 rounded-2xl bg-[#f4f7f4] border-2 border-transparent text-[#2B1D1C] font-bold placeholder:text-[#2B1D1C]/20 focus:border-[#861C1C]/10 focus:bg-white outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2B1D1C]/60">Access Key</label>
                <Link href="#" className="text-[10px] font-black uppercase text-[#861C1C] hover:underline">Forgot?</Link>
              </div>
              <input
                type="password"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                placeholder="••••••••"
                className="w-full px-6 py-4 rounded-2xl bg-[#f4f7f4] border-2 border-transparent text-[#2B1D1C] font-bold placeholder:text-[#2B1D1C]/20 focus:border-[#861C1C]/10 focus:bg-white outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 rounded-2xl bg-[#861C1C] text-white font-black text-sm uppercase tracking-widest hover:bg-[#6b1616] transition-all transform hover:-translate-y-1 shadow-2xl shadow-[#861C1C]/20 disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? 'Decrypting Access...' : 'Initiate Login'}
            </button>
          </form>

          <div className="h-12"></div>

          <p className="text-center text-sm font-bold text-slate-400">
            Don't have an account? 
            <Link href="/auth/register" className="text-[#861C1C] font-black hover:underline ml-2 uppercase text-[10px] tracking-widest">Sign Up</Link>
          </p>

          <div className="mt-auto pt-10 text-[10px] uppercase font-black tracking-widest text-slate-300 text-center">
            © 2026 REFENTRA PLATFORM. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - ANIMATED VISUAL SECTION */}
      <div className="w-full lg:w-1/2">
        <VisualSection 
          title="Supervision Mode Engaged."
          subtitle="Access your global recruitment pipeline with enterprise-grade security."
        />
      </div>
    </div>
  );
}
