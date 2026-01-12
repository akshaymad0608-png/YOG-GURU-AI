import React, { useState } from 'react';
import { YOGA_POSES } from '../constants.tsx';
import { PoseCategory, Difficulty } from '../types';
import { Search, Filter, PlayCircle, BookOpen } from 'lucide-react';

const Library: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filteredPoses = YOGA_POSES.filter(pose => {
    const matchesFilter = filter === 'All' || pose.category === filter || pose.difficulty === filter;
    const matchesSearch = pose.nameEn.toLowerCase().includes(search.toLowerCase()) || pose.nameHi.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-20 bg-emerald-50/20 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
           <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">Yoga Library</h1>
           <p className="text-xl text-slate-500 dark:text-slate-400">Explore over 500+ traditional and modern yoga poses.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name (English or Hindi)..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-slate-900 dark:text-slate-100"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {['All', ...Object.values(Difficulty), ...Object.values(PoseCategory)].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap px-6 py-3 rounded-2xl font-bold transition-all ${
                  filter === f ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100 dark:shadow-none' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPoses.map(pose => (
            <div key={pose.id} className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800">
              <div className="relative h-64">
                 <img src={pose.image} alt={pose.nameEn} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="absolute bottom-4 left-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                    <button 
                      onClick={() => onNavigate('/trainer')}
                      className="flex-grow bg-emerald-500 text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2"
                    >
                      <PlayCircle size={18} />
                      <span>Start Trainer</span>
                    </button>
                 </div>
                 <div className="absolute top-4 right-4">
                    <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                       {pose.difficulty}
                    </span>
                 </div>
              </div>
              <div className="p-8">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                       <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{pose.nameEn}</h3>
                       <p className="text-emerald-600 dark:text-emerald-400 font-medium italic">{pose.nameHi}</p>
                    </div>
                    <BookOpen size={20} className="text-slate-300 dark:text-slate-600" />
                 </div>
                 <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 leading-relaxed mb-6">
                   {pose.description}
                 </p>
                 <div className="flex items-center space-x-4 border-t border-slate-50 dark:border-slate-800 pt-6">
                    <div className="text-center flex-grow">
                       <p className="text-[10px] uppercase font-bold text-slate-400">Duration</p>
                       <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{pose.duration}</p>
                    </div>
                    <div className="w-px h-8 bg-slate-100 dark:bg-slate-800"></div>
                    <div className="text-center flex-grow">
                       <p className="text-[10px] uppercase font-bold text-slate-400">Level</p>
                       <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{pose.difficulty}</p>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPoses.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
             <div className="text-slate-300 dark:text-slate-700 mb-4 flex justify-center"><Search size={64} /></div>
             <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">No poses found</h3>
             <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;