import React, { useState } from 'react';
import { NAV_LINKS } from '../constants.tsx';
import { Menu, X, Leaf, Moon, Sun, Globe, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPath, onNavigate, darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-brand-100 dark:border-brand-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-24 items-center">
            <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => onNavigate('/')}>
              <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-brand-900/20">
                <Leaf size={24} />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight block dark:text-white">YogGuru <span className="text-brand-600 dark:text-brand-400">AI</span></span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-400 dark:text-brand-500 block -mt-1">Ancient wisdom • AI Precision</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-12">
              <div className="flex items-center space-x-8">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => onNavigate(link.path)}
                    className={`text-sm font-semibold tracking-wide transition-all relative py-2 ${
                      currentPath === link.path 
                        ? 'text-brand-700 dark:text-brand-300' 
                        : 'text-brand-400 dark:text-brand-500 hover:text-brand-600'
                    }`}
                  >
                    {link.name}
                    {currentPath === link.path && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-600 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-5 pl-8 border-l border-brand-100 dark:border-brand-800">
                <button 
                  onClick={toggleDarkMode}
                  className="p-3 rounded-full bg-brand-50 dark:bg-brand-900 text-brand-600 dark:text-brand-400 hover:scale-110 transition-all"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <button 
                  onClick={() => onNavigate('/dashboard')}
                  className="flex items-center space-x-2 bg-brand-900 dark:bg-brand-100 text-white dark:text-brand-900 px-6 py-3 rounded-2xl text-sm font-bold hover:shadow-2xl transition-all active:scale-95"
                >
                  <User size={16} />
                  <span>Practice Hub</span>
                </button>
              </div>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-3 text-brand-900 dark:text-white">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden glass border-t border-brand-100 dark:border-brand-900/50 p-8 space-y-6 animate-in slide-in-from-top duration-500">
            {NAV_LINKS.map((link) => (
              <button
                key={link.path}
                onClick={() => { onNavigate(link.path); setIsMenuOpen(false); }}
                className={`block w-full text-left text-lg font-bold ${
                  currentPath === link.path ? 'text-brand-600' : 'text-brand-400'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-6 border-t border-brand-100 dark:border-brand-800">
              <button className="w-full bg-brand-900 text-white py-4 rounded-2xl font-bold">Sign In to Dashboard</button>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-24">{children}</main>

      <footer className="bg-brand-950 text-brand-100 pt-24 pb-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center"><Leaf size={20} /></div>
              <span className="text-2xl font-bold tracking-tight">YogGuru AI</span>
            </div>
            <p className="text-brand-400 max-w-sm mb-10 text-lg serif-italic leading-relaxed">
              Merging the timeless essence of Hatha Yoga with cutting-edge artificial intelligence to guide your wellness journey.
            </p>
            <div className="flex space-x-6">
               <div className="w-12 h-12 rounded-full border border-brand-800 flex items-center justify-center hover:bg-brand-800 transition-colors cursor-pointer">
                 <Globe size={18} />
               </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-10 text-brand-600">Explore</h4>
            <ul className="space-y-4 text-brand-400 font-medium">
              <li className="hover:text-brand-200 cursor-pointer">Pose Library</li>
              <li className="hover:text-brand-200 cursor-pointer">Meditation Tracks</li>
              <li className="hover:text-brand-200 cursor-pointer">Live Workshops</li>
              <li className="hover:text-brand-200 cursor-pointer">AI Custom Flows</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-10 text-brand-600">Connect</h4>
            <ul className="space-y-4 text-brand-400 font-medium">
              <li className="hover:text-brand-200 cursor-pointer">Teacher Portal</li>
              <li className="hover:text-brand-200 cursor-pointer">Scientific Research</li>
              <li className="hover:text-brand-200 cursor-pointer">Support Center</li>
              <li className="hover:text-brand-200 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-24 pt-10 border-t border-brand-900/50 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.4em] text-brand-700">
          <p>© 2024 YogGuru AI Platform. Handcrafted for Mastery.</p>
          <p className="mt-4 md:mt-0 italic">Cultivating Presence Through Precision.</p>
        </div>
        {/* Aesthetic backgrounds */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-900 rounded-full blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      </footer>
    </div>
  );
};

export default Layout;