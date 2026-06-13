import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import { useTranslation } from '../context/LanguageContext';
import LanguageDropdown from '../components/LanguageDropdown';
import { ShieldAlert, Mail, Lock, ChevronLeft, AlertCircle, Terminal } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminLogin() {
  const { loginAdmin } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({});
  const [authError, setAuthError] = useState('');
  const [localLoading, setLocalLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const errors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      errors.email = t('admin.errEmailReq');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = t('admin.errEmailValid');
      valid = false;
    }

    if (!password) {
      errors.password = t('admin.errPasswordReq');
      valid = false;
    }

    setValidationErrors(errors);
    return valid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!validateForm()) {
      return;
    }

    setLocalLoading(true);
    try {
      await loginAdmin(email.trim(), password);
      navigate('/admin');
    } catch (err: any) {
      setAuthError(err.message || t('admin.errAccessDenied'));
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-zinc-950 to-slate-900 min-h-screen py-16 px-4 flex flex-col justify-center font-sans text-white" id="admin-login-root">
      
      {/* Back to auth select and Language Selector */}
      <div className="max-w-md w-full mx-auto mb-6 flex justify-between items-center bg-transparent">
        <Link to="/auth" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition">
          <ChevronLeft className="w-4 h-4" />
          <span>{t('login.roleSelection')}</span>
        </Link>
        <LanguageDropdown darkMode={true} />
      </div>

      <div className="max-w-md w-full mx-auto bg-zinc-900/85 border border-zinc-850/85 rounded-3xl shadow-2xl overflow-hidden p-8 md:p-10 relative">
        
        {localLoading && (
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-center animate-fade-in animate-pulse">
            <LoadingSpinner message={t('admin.spinner')} size="lg" />
          </div>
        )}

        <div className="text-center mb-8">
          <div className="inline-flex justify-center bg-zinc-800 text-amber-300 p-3 rounded-2xl mb-4 shadow-sm border border-zinc-700/60">
            <Terminal className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">{t('adminConsoleTitle')}</h2>
          <p className="text-xs text-zinc-400 mt-1.5">{t('adminLoginSub')}</p>
        </div>

        {authError && (
          <div className="bg-red-950/40 border border-red-900/60 rounded-2xl p-4 mb-6 flex gap-3 text-red-100 animate-fade-in">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-red-400">{t('accessDenied')}</p>
              <p className="text-xs text-red-200 mt-0.5">{authError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email input */}
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="admin-email" className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>{t('adminEmail')}</span>
            </label>
            <input
              id="admin-email"
              type="email"
              placeholder="admin@krishimitra.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (validationErrors.email) {
                  setValidationErrors({ ...validationErrors, email: undefined });
                }
              }}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition bg-zinc-950 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 ${
                validationErrors.email ? 'border-red-500' : 'border-zinc-800'
              }`}
            />
            {validationErrors.email && (
              <span className="text-xs font-semibold text-red-400 mt-1">{validationErrors.email}</span>
            )}
          </div>

          {/* Password input */}
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="admin-password" className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>{t('password')}</span>
            </label>
            <input
              id="admin-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (validationErrors.password) {
                  setValidationErrors({ ...validationErrors, password: undefined });
                }
              }}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition bg-zinc-950 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 ${
                validationErrors.password ? 'border-red-500' : 'border-zinc-800'
              }`}
            />
            {validationErrors.password && (
              <span className="text-xs font-semibold text-red-400 mt-1">{validationErrors.password}</span>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 px-5 rounded-xl transition duration-150 text-sm flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/20 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-emerald-75" />
              <span>{t('initializeSystemControl')}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
