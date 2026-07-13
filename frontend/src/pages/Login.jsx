import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRealLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-100 antialiased px-4">
      <div className="absolute top-1/4 left-1/3 h-72 w-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 h-72 w-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800/80 w-full max-w-md shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-col items-center mb-6">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xl font-black text-white shadow-xl shadow-blue-500/10 mb-3">
            {/*  <img src="/logo.png" alt="logo" /> */}
            Ω
          </div>
          <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Coded Clouds Login
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">Sign in to control dashboard access console</p>
        </div>

        {/* Error Notification Alert */}
        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleRealLogin} className="space-y-4">
          {/* Email Input Field */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 pl-1">Email Address</label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-slate-500"><Mail size={16} /></span>
              <input 
                type="email"
                required
                placeholder="user@code.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div>
            <div className="flex justify-between items-center mb-1.5 pl-1">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Security Password</label>
              <a href="#" className="text-[10px] text-blue-500 hover:underline">Forgot?</a>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-slate-500"><Lock size={16} /></span>
              <input 
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-200 focus:outline-none transition"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
            {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold p-3.5 rounded-xl shadow-lg shadow-blue-600/10 transition active:scale-[0.99] disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Authenticate Account"
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800/60 text-center">
          <span className="text-[10px] text-slate-600 font-semibold uppercase tracking-wider block mb-1">Testing Credentials Matrix</span>
          <p className="text-[10px] text-slate-500">
            Use <code className="text-blue-400 font-mono">dev@code.com</code> or <code className="text-blue-400 font-mono">superadmin@code.com</code> with password: <code className="text-emerald-400 font-mono">password123</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;