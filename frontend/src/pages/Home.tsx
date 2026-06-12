import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/authContext';
import { Leaf, ShieldAlert, CloudSun, IndianRupee, Sprout, Users, CheckCircle, ShieldCheck, Database, ArrowRight } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import { useTranslation } from '../context/LanguageContext';

export default function Home() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const stats = [
    { label: t('home.stat.farmers.label'), value: t('home.stat.farmers.value'), icon: Users, desc: t('home.stat.farmers.desc') },
    { label: t('home.stat.crops.label'), value: t('home.stat.crops.value'), icon: Sprout, desc: t('home.stat.crops.desc') },
    { label: t('home.stat.accuracy.label'), value: t('home.stat.accuracy.value'), icon: ShieldCheck, desc: t('home.stat.accuracy.desc') },
    { label: t('home.stat.sources.label'), value: t('home.stat.sources.value'), icon: Database, desc: t('home.stat.sources.desc') },
  ];

  const features = [
    {
      id: 'cr',
      icon: Leaf,
      title: t('home.feat.cr.title'),
      description: t('home.feat.cr.desc'),
      linkTo: '/crop-recommendation',
      colorClass: 'bg-emerald-50 hover:bg-emerald-100/50 text-emerald-800'
    },
    {
      id: 'dd',
      icon: ShieldAlert,
      title: t('home.feat.dd.title'),
      description: t('home.feat.dd.desc'),
      linkTo: '/disease-detection',
      colorClass: 'bg-emerald-50 hover:bg-emerald-100/50 text-emerald-800'
    },
    {
      id: 'wf',
      icon: CloudSun,
      title: t('home.feat.wf.title'),
      description: t('home.feat.wf.desc'),
      linkTo: '/weather',
      colorClass: 'bg-emerald-50 hover:bg-emerald-100/50 text-emerald-800'
    },
    {
      id: 'mp',
      icon: IndianRupee,
      title: t('home.feat.mp.title'),
      description: t('home.feat.mp.desc'),
      linkTo: '/market-prices',
      colorClass: 'bg-emerald-50 hover:bg-emerald-100/50 text-emerald-800'
    },
  ];

  return (
    <div className="bg-emerald-50/20 flex flex-col min-h-screen" id="home-page-root">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24" id="home-hero-section">
        {/* Background decorative blobs */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-emerald-100/40 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-yellow-100/35 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 self-center lg:self-start bg-emerald-100 text-emerald-850 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                <Leaf className="w-3.5 h-3.5" />
                {t('home.hero.techBadge')}
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-emerald-950 leading-[1.1] tracking-tight">
                {t('home.hero.title')} <span className="text-emerald-600 block sm:inline">{t('home.hero.titleAccent')}</span>
              </h1>
              
              <p className="text-emerald-900/80 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t('home.hero.subtitle')}
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-4">
                <Link
                  to={user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/auth'}
                  className="w-full sm:w-auto text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-8 rounded-2xl shadow-md transition duration-200 outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex items-center justify-center gap-2 group cursor-pointer"
                  id="cta-recommendation"
                >
                  <span>{user ? t('home.hero.btnWorkspace') : t('home.hero.btnGetStarted')}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="#features-section"
                  className="w-full sm:w-auto text-center bg-white hover:bg-emerald-50/50 border border-emerald-200 text-emerald-900 font-bold py-3.5 px-8 rounded-2xl shadow-sm transition duration-200 outline-none focus:ring-2 focus:ring-emerald-500 flex items-center justify-center gap-2 cursor-pointer"
                  id="cta-features-anchor"
                >
                  <span>{t('home.hero.btnLearnMore')}</span>
                </a>
              </div>
            </div>

            {/* Right Graphic Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-md w-full">
                {/* Decorative border frame */}
                <div className="absolute -inset-2 rounded-3xl bg-emerald-100 group-hover:bg-emerald-200/60 transition duration-300 -z-10" />
                
                <img
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=600"
                  alt="Modern Smart Farming Device in Agriculture Fields"
                  className="w-full h-auto aspect-4/3 object-cover rounded-2xl shadow-[0_15px_40px_rgba(10,50,20,0.1)] transition duration-300 group-hover:scale-[1.01]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Float tag */}
                <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur shadow-lg border border-emerald-50 p-4 rounded-2xl animate-bounce">
                  <div className="bg-emerald-100 p-2 rounded-xl text-emerald-700">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-emerald-800 uppercase font-black tracking-widest leading-none">{t('home.hero.badgeTitle')}</p>
                    <p className="text-sm font-extrabold text-emerald-950 leading-tight">{t('home.hero.badgeValue')}</p>
                  </div>
                </div>

                <div className="absolute -top-4 -left-4 bg-emerald-600/90 backdrop-blur text-white py-1 px-3 rounded-full text-xs font-semibold shadow-md border border-white/20">
                  🌱 {t('home.hero.badgeFriendly')}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-16 bg-white" id="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 tracking-tight">
              {t('home.tools.title')}
            </h2>
            <p className="text-emerald-900/75 mt-4 text-base md:text-lg">
              {t('home.tools.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" id="features-grid">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                id={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                linkTo={feature.linkTo}
                colorClass={feature.colorClass}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-emerald-950 text-white relative overflow-hidden" id="home-stats-section">
        {/* Background visual grain */}
        <div className="absolute -inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 bg-emerald-900/35 border border-emerald-800/50 rounded-2xl backdrop-blur-sm transition-all hover:bg-emerald-900/55"
                id={`stat-container-${idx}`}
              >
                <div className="p-3 bg-emerald-500/25 text-emerald-300 rounded-xl mb-4 w-fit">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="font-black text-3xl sm:text-4xl text-emerald-400 font-sans tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="font-bold text-base text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-emerald-200/60 leading-relaxed">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
