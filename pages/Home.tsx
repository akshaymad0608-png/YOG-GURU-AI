import React from 'react';
import { Play, Sparkles, ChevronRight, Activity, Camera, Brain, Zap, Clock, Star, Users, Bell, Globe, ArrowDown, Leaf } from 'lucide-react';
import { YOGA_POSES } from '../constants.tsx';

const Home: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 dark:opacity-5"></div>
        <div className="max-w-7xl mx-auto px-8 pt-20 pb-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12 animate-reveal">
              <div className="inline-flex items-center space-x-3 bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 px-5 py-2 rounded-full border border-brand-200 dark:border-brand-800">
                <Sparkles size={14} className="text-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Next-Gen Posture Intelligence</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-medium leading-[0.95] font-serif text-brand-950 dark:text-white">
                  Discover Your <br />
                  <span className="serif-italic text-brand-600">Perfect Form.</span>
                </h1>
                <p className="text-xl md:text-2xl text-brand-700 dark:text-brand-400 max-w-xl leading-relaxed font-light">
                  YogGuru AI blends ancient meditative wisdom with the precision of computer vision to guide your path to balance.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => onNavigate('/trainer')}
                  className="bg-brand-900 dark:bg-brand-50 text-white dark:text-brand-950 px-12 py-6 rounded-2xl text-lg font-bold hover:shadow-2xl transition-all flex items-center justify-center space-x-4 group active:scale-95"
                >
                  <span>Start Training</span>
                  <div className="w-6 h-6 bg-white/20 dark:bg-brand-900/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <Play size={14} fill="currentColor" />
                  </div>
                </button>
                <button 
                  onClick={() => onNavigate('/library')}
                  className="bg-transparent border-2 border-brand-200 dark:border-brand-800 px-12 py-6 rounded-2xl text-lg font-bold hover:bg-brand-50 dark:hover:bg-brand-900 transition-all active:scale-95"
                >
                  Explore Poses
                </button>
              </div>

              <div className="flex items-center space-x-12 pt-12">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-brand-950 overflow-hidden bg-brand-200">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white dark:border-brand-950 bg-brand-900 flex items-center justify-center text-[10px] text-white font-bold">+10k</div>
                </div>
                <p className="text-xs font-medium text-brand-500 max-w-[150px]">Join thousands of practitioners worldwide.</p>
              </div>
            </div>

            <div className="relative animate-reveal" style={{ animationDelay: '0.3s' }}>
              <div className="relative rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(45,90,39,0.2)] border-[12px] border-white dark:border-brand-900">
                <img 
                  src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=1200" 
                  alt="Professional Yoga" 
                  className="w-full aspect-[4/5] object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 to-transparent"></div>
                
                {/* AI HUD Mockup */}
                <div className="absolute top-10 left-10 space-y-3">
                  <div className="glass px-4 py-2 rounded-xl flex items-center space-x-3 text-brand-950 dark:text-white">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Tracking Skeletal Map</span>
                  </div>
                </div>
                
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="bg-white/10 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/20">
                    <div className="flex justify-between items-center text-white">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Current Asana</p>
                        <h4 className="text-2xl font-serif">Virabhadrasana II</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-4xl font-bold text-accent">98%</p>
                        <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Accuracy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating aesthetic elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-brand-300">
          <ArrowDown size={32} />
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-40 bg-white dark:bg-brand-900/20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center space-y-6 mb-32 max-w-3xl mx-auto">
            <div className="flex justify-center"><Leaf className="text-brand-500" size={32} /></div>
            <h2 className="text-sm font-black text-brand-600 uppercase tracking-[0.4em]">Digital Mastery</h2>
            <h3 className="text-5xl md:text-7xl font-serif text-brand-950 dark:text-white">A Sacred Practice, <br /> <span className="serif-italic">Redefined.</span></h3>
            <p className="text-xl text-brand-500 font-light">Experience yoga like never before with technology that truly understands the human anatomy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Camera />} 
              title="Real-time Tracking" 
              description="MediaPipe-powered skeletal analysis tracks 33 key body points with millisecond precision."
            />
            <FeatureCard 
              icon={<Brain />} 
              title="AI Corrections" 
              description="Get instant, spoken feedback in multiple languages to adjust your posture as you practice."
            />
            <FeatureCard 
              icon={<Star />} 
              title="Mastery Tracking" 
              description="Visualize your progress through detailed analytics and accuracy heatmaps of every session."
            />
          </div>
        </div>
      </section>

      {/* Popular Poses - SEO friendly showcase */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="space-y-4">
              <h2 className="text-sm font-black text-brand-600 uppercase tracking-[0.4em]">Curated Path</h2>
              <h3 className="text-5xl font-serif text-brand-950 dark:text-white">Begin Your <br /> <span className="serif-italic">Transformation.</span></h3>
            </div>
            <button 
              onClick={() => onNavigate('/library')}
              className="group flex items-center space-x-3 text-brand-900 dark:text-brand-100 font-bold"
            >
              <span className="text-lg">View Full Library</span>
              <div className="p-3 bg-brand-100 dark:bg-brand-900 rounded-full group-hover:translate-x-2 transition-transform">
                <ChevronRight size={20} />
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {YOGA_POSES.slice(0, 3).map((pose) => (
              <div key={pose.id} className="group cursor-pointer" onClick={() => onNavigate('/trainer')}>
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 shadow-xl transition-all group-hover:-translate-y-4 duration-500">
                  <img src={pose.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={pose.nameEn} />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-white text-xl font-serif">{pose.nameHi}</span>
                    <Play className="text-white" size={24} fill="currentColor" />
                  </div>
                </div>
                <h4 className="text-2xl font-serif text-brand-950 dark:text-white">{pose.nameEn}</h4>
                <p className="text-brand-500 text-sm mt-2">{pose.difficulty} • {pose.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-40 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-brand-900 rounded-[4rem] p-16 md:p-32 text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]">
            <div className="relative z-10 max-w-3xl mx-auto space-y-12">
              <h2 className="text-4xl md:text-7xl font-serif leading-tight">Elevate Your Practice <br /> <span className="serif-italic text-brand-300">Today.</span></h2>
              <p className="text-xl text-brand-200 font-light leading-relaxed">
                Unlock your full potential with YogGuru AI. Start your journey towards physical mastery and mental clarity.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button 
                  onClick={() => onNavigate('/trainer')}
                  className="bg-brand-50 text-brand-950 px-12 py-6 rounded-2xl text-lg font-bold hover:scale-105 transition-all shadow-2xl"
                >
                  Join the Community
                </button>
                <button className="bg-transparent border-2 border-brand-800 px-12 py-6 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all">
                  Contact Master Teachers
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-12 bg-parchment-200 dark:bg-brand-950 rounded-[3rem] border border-brand-100 dark:border-brand-900 hover:shadow-2xl transition-all duration-500 group">
    <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900 rounded-2xl flex items-center justify-center text-brand-900 dark:text-brand-100 mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
      {React.cloneElement(icon as React.ReactElement, { size: 32 })}
    </div>
    <h4 className="text-2xl font-serif text-brand-950 dark:text-white mb-6">{title}</h4>
    <p className="text-brand-600 dark:text-brand-400 leading-relaxed font-light">{description}</p>
  </div>
);

export default Home;