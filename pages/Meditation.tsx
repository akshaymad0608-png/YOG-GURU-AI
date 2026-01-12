import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RefreshCw, Volume2, CloudRain, Sun, Heart } from 'lucide-react';

const Meditation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [selectedAmbient, setSelectedAmbient] = useState('Zen Garden');

  useEffect(() => {
    let timer: number;
    if (isPlaying && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const ambientSounds = [
    { name: 'Zen Garden', icon: <Wind size={20} />, color: 'bg-emerald-500' },
    { name: 'Rainfall', icon: <CloudRain size={20} />, color: 'bg-blue-500' },
    { name: 'Morning Sun', icon: <Sun size={20} />, color: 'bg-amber-500' },
    { name: 'Deep Breath', icon: <Heart size={20} />, color: 'bg-rose-500' },
  ];

  return (
    <div className="min-h-screen yoga-gradient dark:bg-slate-950 py-20 flex flex-col items-center">
      <div className="max-w-4xl w-full px-4 text-center">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">Find Your Center</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-16">Pause, breathe, and let the world fade away.</p>

        <div className="relative mb-20 flex justify-center">
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full transition-transform duration-[4000ms] ease-in-out ${isPlaying ? 'scale-150 opacity-0' : 'scale-100 opacity-50'}`}></div>
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 rounded-full transition-transform duration-[3000ms] ease-in-out delay-500 ${isPlaying ? 'scale-125 opacity-0' : 'scale-100 opacity-60'}`}></div>
           
           <div className="relative w-72 h-72 bg-white dark:bg-slate-900 rounded-full shadow-2xl flex flex-col items-center justify-center border-8 border-emerald-50 dark:border-slate-800 z-10">
              <span className="text-6xl font-light text-slate-800 dark:text-slate-100 font-mono tracking-tighter">{formatTime(timeLeft)}</span>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-2 uppercase tracking-widest">Remaining</p>
           </div>
        </div>

        <div className="flex justify-center space-x-6 mb-16">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-200 dark:shadow-none hover:bg-emerald-700 transition-all hover:scale-110"
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
          </button>
          <button 
            onClick={() => {
              setIsPlaying(false);
              setTimeLeft(600);
            }}
            className="w-20 h-20 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            <RefreshCw size={28} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ambientSounds.map((sound) => (
            <button
              key={sound.name}
              onClick={() => setSelectedAmbient(sound.name)}
              className={`p-6 rounded-[2rem] border transition-all flex flex-col items-center space-y-4 ${
                selectedAmbient === sound.name 
                  ? 'bg-white dark:bg-slate-800 border-emerald-200 dark:border-emerald-800 shadow-md ring-2 ring-emerald-500' 
                  : 'bg-white/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 opacity-70 hover:opacity-100'
              }`}
            >
              <div className={`p-3 rounded-2xl text-white ${sound.color}`}>
                {sound.icon}
              </div>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{sound.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meditation;