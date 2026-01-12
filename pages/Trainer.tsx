import React, { useState, useEffect, useCallback, useRef } from 'react';
import CameraFeed from '../components/CameraFeed';
import YogaModel3D from '../components/YogaModel3D';
import { YOGA_POSES } from '../constants.tsx';
import { getPostureFeedback, speakFeedback } from '../services/gemini';
import { PoseFeedback, YogaPose } from '../types';
import { 
  Play, Pause, RefreshCw, Volume2, VolumeX, 
  CheckCircle, AlertCircle, ChevronLeft, 
  Info, ShieldAlert, Heart, Activity, 
  Zap, Star, ChevronDown, ChevronUp, Languages, Mic, MicOff, AlertTriangle,
  LayoutGrid, X, Brain
} from 'lucide-react';

const Trainer: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [selectedPose, setSelectedPose] = useState<YogaPose>(YOGA_POSES[0]);
  const [isTraining, setIsTraining] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [feedback, setFeedback] = useState<PoseFeedback | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi' | 'gu'>('en');
  const [sessionTime, setSessionTime] = useState(0);
  const [expandedSection, setExpandedSection] = useState<'benefits' | 'precautions' | 'mistakes' | null>('benefits');
  const [isPoseSelectorOpen, setIsPoseSelectorOpen] = useState(false);
  
  const lastFeedbackTime = useRef<number>(0);

  useEffect(() => {
    setFeedback(null);
    lastFeedbackTime.current = 0;
  }, [selectedPose]);

  useEffect(() => {
    let interval: number;
    if (isTraining && !isPaused) {
      interval = window.setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTraining, isPaused]);

  const handleSkeletonUpdate = useCallback(async (angles: Record<string, number>) => {
    if (!isTraining || isPaused) return;
    
    const now = Date.now();
    if (now - lastFeedbackTime.current > 7000) {
      lastFeedbackTime.current = now;
      try {
        const fb = await getPostureFeedback(selectedPose.nameEn, angles, selectedPose.idealAngles, language);
        setFeedback(fb);
        if (!isMuted && fb.message) speakFeedback(String(fb.message), language);
      } catch (err) {
        console.error("AI Trainer Error:", err);
      }
    }
  }, [isTraining, isPaused, selectedPose, isMuted, language]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const toggleTraining = () => {
    if (!isTraining) {
      setIsTraining(true);
      setIsPaused(false);
    } else {
      setIsTraining(false);
      setIsPaused(false);
      window.speechSynthesis.cancel();
    }
  };

  const toggleSection = (section: 'benefits' | 'precautions' | 'mistakes') => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-parchment-50 dark:bg-brand-950 pb-20">
      
      {/* Pose Selector Overlay */}
      {isPoseSelectorOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-brand-950/90 backdrop-blur-xl" onClick={() => setIsPoseSelectorOpen(false)}></div>
          <div className="relative bg-white dark:bg-brand-900 w-full max-w-6xl max-h-[85vh] rounded-[4rem] shadow-2xl overflow-hidden flex flex-col border border-brand-100 dark:border-brand-800 animate-reveal">
            <div className="p-10 border-b border-brand-50 dark:border-brand-800 flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-serif text-brand-950 dark:text-white">Choose Your Asana</h2>
                <p className="text-brand-500 text-sm mt-2 font-medium">Select a practice to begin AI-guided posture analysis</p>
              </div>
              <button onClick={() => setIsPoseSelectorOpen(false)} className="p-4 bg-brand-50 dark:bg-brand-800 rounded-full text-brand-400 hover:text-brand-900 transition-all">
                <X size={24} />
              </button>
            </div>
            <div className="p-10 overflow-y-auto scrollbar-hide grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {YOGA_POSES.map((pose) => (
                <div 
                  key={pose.id}
                  onClick={() => { setSelectedPose(pose); setIsPoseSelectorOpen(false); }}
                  className={`group relative rounded-[2.5rem] overflow-hidden cursor-pointer border-4 transition-all duration-500 ${
                    selectedPose.id === pose.id ? 'border-brand-600 shadow-2xl scale-[1.02]' : 'border-transparent hover:border-brand-100 dark:hover:border-brand-800'
                  }`}
                >
                  <img src={pose.image} className="w-full aspect-[3/4] object-cover" alt={pose.nameEn} />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="text-xl font-serif text-white">{pose.nameEn}</h4>
                    <p className="text-[10px] text-brand-400 font-bold uppercase tracking-widest mt-1">{pose.difficulty} • {pose.nameHi}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-10 gap-8">
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('/')}
              className="p-4 bg-white dark:bg-brand-900 rounded-2xl hover:bg-brand-50 dark:hover:bg-brand-800 transition-all text-brand-400 shadow-sm border border-brand-50 dark:border-brand-800 group"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                 <button 
                  onClick={() => setIsPoseSelectorOpen(true)}
                  className="flex items-center space-x-2 bg-brand-900 dark:bg-brand-100 text-white dark:text-brand-900 px-4 py-1.5 rounded-xl transition-all hover:scale-105 active:scale-95"
                 >
                   <LayoutGrid size={14} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Change Pose</span>
                 </button>
                 <span className="text-[10px] font-black uppercase tracking-widest text-brand-600 bg-brand-100 px-3 py-1.5 rounded-xl">
                   {selectedPose.difficulty}
                 </span>
              </div>
              <h1 className="text-4xl font-serif text-brand-950 dark:text-white leading-tight">
                {selectedPose.nameEn} <span className="serif-italic text-brand-500 text-3xl ml-2">({selectedPose.nameHi})</span>
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
             <div className="bg-white dark:bg-brand-900 rounded-2xl border border-brand-50 dark:border-brand-800 flex items-center px-5 py-3.5 space-x-4 shadow-sm">
               <Languages size={18} className="text-brand-600" />
               <select 
                 value={language}
                 onChange={(e) => setLanguage(e.target.value as any)}
                 className="bg-transparent border-none outline-none text-xs font-bold text-brand-900 dark:text-brand-100 cursor-pointer uppercase tracking-widest"
               >
                 <option value="en">English</option>
                 <option value="hi">हिन्दी</option>
                 <option value="gu">ગુજરાતી</option>
               </select>
             </div>

             <button 
               onClick={() => setIsMuted(!isMuted)}
               className={`p-4 rounded-2xl transition-all border flex items-center space-x-3 font-bold text-xs uppercase tracking-widest ${
                 isMuted ? 'bg-brand-50 text-brand-300' : 'bg-white dark:bg-brand-900 text-brand-600 shadow-sm'
               }`}
             >
               {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
               <span className="hidden sm:inline">{isMuted ? 'Voice Off' : 'Voice On'}</span>
             </button>

             <div className="bg-brand-950 text-white px-8 py-4 rounded-2xl shadow-xl flex items-center space-x-4">
               <div className={`w-2.5 h-2.5 rounded-full ${isTraining && !isPaused ? 'bg-brand-400 animate-pulse' : 'bg-brand-800'}`}></div>
               <span className="text-xl font-mono font-medium tracking-tighter">{formatTime(sessionTime)}</span>
             </div>

             <button 
               onClick={toggleTraining}
               className={`px-12 py-4 rounded-2xl font-bold transition-all shadow-2xl flex items-center justify-center space-x-3 text-sm uppercase tracking-widest active:scale-95 ${
                 isTraining ? 'bg-rose-600 text-white' : 'bg-brand-600 text-white hover:bg-brand-700'
               }`}
             >
               {isTraining ? <span>Stop Practice</span> : <><Play size={18} fill="currentColor" /><span>Start AI Guru</span></>}
             </button>
          </div>
        </div>

        {/* Main Interface Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch h-[calc(100vh-280px)] min-h-[600px]">
          {/* Feed Side */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
             <div className="relative flex-grow rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] border-[10px] border-white dark:border-brand-900 bg-brand-950">
               <CameraFeed isActive={isTraining} onSkeletonUpdate={handleSkeletonUpdate} />
               
               {isPaused && (
                 <div className="absolute inset-0 bg-brand-950/60 backdrop-blur-md flex flex-col items-center justify-center text-white z-20 animate-in fade-in duration-500">
                    <Pause size={64} className="mb-6 text-accent animate-pulse" />
                    <h2 className="text-4xl font-serif">Deep Breath.</h2>
                    <p className="opacity-70 mt-3 font-light tracking-wide italic">Take a moment for yourself.</p>
                 </div>
               )}
               
               {!isTraining && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-950/40 text-white opacity-0 hover:opacity-100 transition-opacity">
                    <button onClick={toggleTraining} className="bg-brand-50 text-brand-950 px-10 py-5 rounded-2xl font-bold shadow-2xl animate-reveal">
                      Begin Practice Session
                    </button>
                 </div>
               )}
             </div>
             
             {/* Feedback Strip */}
             <div className="bg-white dark:bg-brand-900 p-8 rounded-[3rem] border border-brand-50 dark:border-brand-800 shadow-sm flex items-center space-x-8 min-h-[140px]">
                {feedback && isTraining && !isPaused ? (
                  <div className="flex items-center space-x-8 w-full animate-reveal">
                    <div className={`p-5 rounded-3xl ${feedback.isCorrect ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                       {feedback.isCorrect ? <CheckCircle size={32} /> : <AlertCircle size={32} />}
                    </div>
                    <div className="flex-grow">
                      <p className="text-xl font-medium text-brand-900 dark:text-white leading-snug">
                        {feedback.message}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {feedback.corrections.map((c, i) => (
                          <span key={i} className="text-[9px] font-black uppercase tracking-[0.2em] bg-brand-50 dark:bg-brand-800 px-3 py-1.5 rounded-lg text-brand-600 dark:text-brand-300">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right pl-8 border-l border-brand-50 dark:border-brand-800">
                      <p className="text-4xl font-bold text-brand-950 dark:text-white">{feedback.accuracy}%</p>
                      <p className="text-[8px] font-black uppercase tracking-widest text-brand-400">Match Accuracy</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-6 text-brand-300 dark:text-brand-700">
                    <Brain size={32} />
                    <p className="font-serif text-xl italic">Awaiting alignment input...</p>
                  </div>
                )}
             </div>
          </div>

          {/* Model & Info Side */}
          <div className="lg:col-span-5 flex flex-col space-y-6 overflow-y-auto pr-2 scrollbar-hide">
            <div className="h-1/2 min-h-[300px]">
              <YogaModel3D poseId={selectedPose.id} />
            </div>
            
            <div className="bg-white dark:bg-brand-900 rounded-[3rem] border border-brand-50 dark:border-brand-800 p-10 flex flex-col space-y-8 flex-grow shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-brand-400">Asana Insights</h3>
                  <div className="flex items-center space-x-2 text-accent">
                    <Star size={14} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Mastery Guide</span>
                  </div>
                </div>
                <p className="text-brand-700 dark:text-brand-400 font-light leading-relaxed italic text-lg serif-italic">
                  "{selectedPose.description}"
                </p>
              </div>

              <div className="space-y-4">
                <button onClick={() => toggleSection('benefits')} className="w-full flex items-center justify-between group transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center text-brand-600">
                      <Heart size={18} />
                    </div>
                    <span className="font-bold text-sm tracking-wide text-brand-950 dark:text-white uppercase">Therapeutic Benefits</span>
                  </div>
                  {expandedSection === 'benefits' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSection === 'benefits' && (
                  <div className="pl-14 space-y-3 animate-in slide-in-from-top-2 duration-300">
                    {selectedPose.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-sm text-brand-600 dark:text-brand-400">
                        <div className="w-1 h-1 rounded-full bg-brand-300 mt-2" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="h-px bg-brand-50 dark:bg-brand-800" />

                <button onClick={() => toggleSection('precautions')} className="w-full flex items-center justify-between group transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-brand-950 flex items-center justify-center text-rose-500">
                      <ShieldAlert size={18} />
                    </div>
                    <span className="font-bold text-sm tracking-wide text-brand-950 dark:text-white uppercase">Health Precautions</span>
                  </div>
                  {expandedSection === 'precautions' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSection === 'precautions' && (
                  <div className="pl-14 space-y-3 animate-in slide-in-from-top-2 duration-300">
                    {selectedPose.precautions.map((p, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-sm text-rose-600/70 font-medium">
                        <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-auto pt-6 border-t border-brand-50 dark:border-brand-800">
                 <div className="flex items-center space-x-6">
                    <div className="flex-grow">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-400 mb-2">Breathing Flow</p>
                      <p className="text-sm font-bold text-brand-700 dark:text-brand-300 italic">{selectedPose.breathing}</p>
                    </div>
                    <Activity className="text-brand-100" size={40} />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trainer;