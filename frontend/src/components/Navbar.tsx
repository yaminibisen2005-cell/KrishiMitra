/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import { useTranslation } from '../context/LanguageContext';
import LanguageDropdown from './LanguageDropdown';
import ProfileAvatar from './ProfileAvatar';
import { 
  Menu, 
  X, 
  Sprout, 
  Home, 
  Leaf, 
  ShieldAlert, 
  CloudSun, 
  IndianRupee, 
  Settings, 
  User, 
  LogOut, 
  LogIn, 
  UserPlus, 
  LayoutDashboard,
  ShieldCheck,
  Bot,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Listen to outer scrolling events to apply premium glassmorphism elevation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine nav items dynamically based on session role
  const getNavItems = () => {
    if (user && user.role === 'admin') {
      return [
        { label: t('adminConsole'), path: '/admin', icon: Settings },
      ];
    }

    const items = [
      { label: t('home'), path: '/', icon: Home },
      { label: t('cropAdvisory'), path: '/crop-recommendation', icon: Leaf },
      { label: t('diseaseAnalysis'), path: '/disease-detection', icon: ShieldAlert },
      { label: t('weatherWarnings'), path: '/weather', icon: CloudSun },
      { label: t('mandi'), path: '/market-prices', icon: IndianRupee },
    ];

    if (user) {
      items.push({ label: t('dashboard'), path: '/dashboard', icon: LayoutDashboard });
    }

    return items;
  };

  const navItems = getNavItems();

  const handleLogoutClick = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 font-sans border-b ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-md border-emerald-100/65 py-2' 
          : 'bg-white/80 backdrop-blur-md border-emerald-50/50 py-3 md:py-4'
      }`} 
      id="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16" id="navbar-core-flex">
          
          {/* Logo Group */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-emerald-500/25 rounded-2xl p-1" 
            id="nav-brand-logo"
          >
            <div className="bg-gradient-to-tr from-emerald-600 to-emerald-700 p-2.5 rounded-2xl text-white shadow-md shadow-emerald-600/10 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-12">
              <Sprout className="w-5 h-5 flex-shrink-0" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl md:text-2xl text-emerald-950 tracking-tight leading-none">
                Krishi<span className="text-emerald-600">Mitra</span>
              </span>
              <span className="hidden sm:inline text-[9px] uppercase font-black tracking-widest text-emerald-800/40 mt-0.5 leading-none">
                Smart Farming Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-5 xl:gap-6" id="nav-desktop-container">
            <nav className="flex items-center gap-x-1.5 bg-emerald-50/50 p-1.5 rounded-2xl" id="nav-desktop-menu">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative whitespace-nowrap flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs xl:text-sm font-bold tracking-tight transition-all duration-200 outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                      isActive
                        ? 'bg-white text-emerald-900 shadow-sm border border-emerald-100/30'
                        : 'text-slate-600 hover:text-emerald-900 hover:bg-white/50'
                    }`}
                    id={`nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <item.icon className={`w-4 h-4 transition-colors duration-200 ${isActive ? 'text-emerald-600' : 'text-slate-450'}`} />
                    <span>{item.label}</span>

                    {/* Sophisticated micro active line indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 inset-x-5 h-0.5 bg-emerald-600 rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Session Action Controls */}
            <div className="border-l border-emerald-100/70 pl-5 xl:pl-6 flex items-center gap-3">
              {/* Language Selection */}
              <LanguageDropdown />

              {user ? (
                <div className="flex items-center gap-3" id="desktop-session-group">
                  
                  {user.role === 'admin' ? (
                    <span className="inline-flex items-center gap-1.5 bg-zinc-950 text-amber-300 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl border border-zinc-800 shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{t('adminConsole')}</span>
                    </span>
                  ) : (
                    /* Premium Farmer Badge Container */
                    <div className="flex items-center gap-2 bg-slate-50 hover:bg-emerald-50/30 border border-slate-100 rounded-2xl pl-2 pr-3.5 py-1.5 transition duration-150 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs border border-emerald-200 shadow-sm flex-shrink-0">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex flex-col text-left min-w-0 max-w-[130px]">
                        <span className="text-xs font-bold text-emerald-950 truncate leading-tight" title={user.name}>
                          {user.name}
                        </span>
                        <span className="text-[9px] uppercase font-black text-emerald-600 tracking-wider leading-tight">
                          Farmer
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Profile avatar + Logout trigger */}
                  <ProfileAvatar />
                  <button
                    onClick={handleLogoutClick}
                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition duration-150 outline-none focus:ring-2 focus:ring-red-500/20 md:cursor-pointer"
                    title={t('logout')}
                    id="nav-logout-btn"
                  >
                    <LogOut className="w-4.5 h-4.5" />
                  </button>

                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 text-xs xl:text-sm font-bold text-emerald-800 hover:bg-emerald-50 px-3.5 py-2.5 rounded-xl transition outline-none focus:ring-2 focus:ring-emerald-500/10"
                    id="nav-login-link"
                  >
                    <LogIn className="w-4 h-4 text-emerald-600" />
                    <span>{t('login')}</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-1.5 text-xs xl:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl transition shadow-md shadow-emerald-600/10 hover:shadow-lg hover:shadow-emerald-600/15"
                    id="nav-register-link"
                  >
                    <UserPlus className="w-4 h-4 text-white/90" />
                    <span>{t('register')}</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-100 text-emerald-800 transition focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              aria-label="Toggle Menu"
              id="hamburger-toggle"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div 
          className="xl:hidden absolute top-full left-0 w-full bg-white border-b border-emerald-100/80 shadow-xl overflow-hidden animate-fade-in" 
          id="mobile-drawer-menu"
        >
          <div className="px-4 py-5 space-y-4 max-h-[85vh] overflow-y-auto">
            
            {/* 1. Farmer Identity Card (Active User Header) */}
            {user && (
              <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100/40 flex items-center justify-between" id="mobile-user-card">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black border border-emerald-250">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-extrabold text-emerald-950 truncate max-w-[160px]">{user.name}</h5>
                    <p className="text-[10px] text-emerald-700 font-black uppercase tracking-widest leading-none mt-0.5">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="text-xs font-bold text-emerald-700 px-3 py-1 rounded-xl border border-emerald-100/40">Profile</Link>
                  <div className="bg-emerald-600/10 text-emerald-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-100/30">ID Active</div>
                </div>
              </div>
            )}

            {/* 2. Menu Section Header */}
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-450 pl-2">
                Available Services / सेवांची यादी
              </span>
              <div className="space-y-1 mt-1.5" id="mobile-services-list">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition duration-150 ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                      id={`mobile-nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 opacity-50 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 3. Dropdown controls */}
            <div className="border-t border-emerald-50/50 pt-4 space-y-4">
              
              {/* Lang select container */}
              <div className="flex items-center justify-between px-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('language')}</span>
                <LanguageDropdown />
              </div>

              {/* Identity Actions container */}
              {user ? (
                <button
                  onClick={handleLogoutClick}
                  className="w-full bg-red-50 hover:bg-red-100 border border-red-100/80 text-red-600 font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                  id="mobile-logout-btn"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('logout')}</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-1.5 border border-emerald-250 text-emerald-800 font-black py-3 rounded-xl text-xs transition bg-white"
                  >
                    <LogIn className="w-4 h-4 text-emerald-600" />
                    <span>{t('login')}</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl text-xs transition shadow"
                  >
                    <UserPlus className="w-4 h-4 text-white" />
                    <span>{t('register')}</span>
                  </Link>
                </div>
              )}

            </div>

          </div>
        </div>
      )}
    </header>
  );
}
