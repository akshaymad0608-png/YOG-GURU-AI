import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Flame, Target, Star, Calendar, ArrowUpRight, Award } from 'lucide-react';

const data = [
  { name: 'Mon', accuracy: 65, calories: 120 },
  { name: 'Tue', accuracy: 72, calories: 150 },
  { name: 'Wed', accuracy: 68, calories: 110 },
  { name: 'Thu', accuracy: 85, calories: 240 },
  { name: 'Fri', accuracy: 92, calories: 300 },
  { name: 'Sat', accuracy: 88, calories: 210 },
  { name: 'Sun', accuracy: 95, calories: 350 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Namaste, Elena!</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Ready for your 12th day of Zen?</p>
          </div>
          <div className="bg-emerald-600 text-white px-6 py-3 rounded-2xl flex items-center space-x-3 shadow-lg shadow-emerald-100 dark:shadow-none">
            <Calendar size={20} />
            <span className="font-bold">May 24, 2024</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard icon={<Flame className="text-orange-500" />} label="Streak" value="12 Days" trend="+2 from last week" />
          <StatCard icon={<Target className="text-emerald-500" />} label="Avg. Accuracy" value="84%" trend="+5% improvement" />
          <StatCard icon={<Star className="text-amber-500" />} label="Points" value="2,450" trend="Level 4 Practitioner" />
          <StatCard icon={<Award className="text-purple-500" />} label="Calories" value="1,840" trend="Target reached" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Practice Performance</h3>
               <select className="bg-slate-50 dark:bg-slate-800 dark:text-slate-300 border-none rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none">
                 <option>Last 7 Days</option>
                 <option>Last Month</option>
               </select>
            </div>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:opacity-10" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', backgroundColor: '#1e293b', color: '#f8fafc' }}
                  />
                  <Area type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorAcc)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Achievement Board */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Recent Badges</h3>
              <div className="grid grid-cols-2 gap-4">
                <Badge icon="🧘‍♀️" label="Zen Master" date="2 days ago" />
                <Badge icon="🌅" label="Early Bird" date="Today" />
                <Badge icon="🔥" label="10-Day Streak" date="5 days ago" />
                <Badge icon="🤸‍♀️" label="Flex Hero" date="Locked" locked />
              </div>
              <button className="w-full mt-8 py-4 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400 dark:text-slate-600 font-bold hover:border-emerald-200 dark:hover:border-emerald-900 hover:text-emerald-500 transition-all">
                View All Achievements
              </button>
            </div>

            {/* Daily Goal */}
            <div className="bg-emerald-900 dark:bg-emerald-950 p-8 rounded-[2.5rem] text-white overflow-hidden relative">
               <div className="relative z-10">
                 <h3 className="text-xl font-bold mb-4">Daily Goal</h3>
                 <div className="flex justify-between items-end mb-2">
                    <span className="text-4xl font-black">45<span className="text-xl font-normal opacity-60">/60 min</span></span>
                    <span className="text-emerald-400 font-bold">75%</span>
                 </div>
                 <div className="h-2 w-full bg-white/10 dark:bg-white/5 rounded-full overflow-hidden mb-6">
                    <div className="h-full bg-emerald-400 w-3/4 rounded-full"></div>
                 </div>
                 <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-all">
                    Complete Session
                 </button>
               </div>
               <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-emerald-800 dark:bg-emerald-900 rounded-full opacity-50 blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; trend: string }> = ({ icon, label, value, trend }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center space-x-4 mb-4">
      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">{icon}</div>
      <span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
    <div className="flex items-baseline space-x-2">
      <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</h4>
      <span className="text-[10px] text-emerald-500 font-bold flex items-center">
        <ArrowUpRight size={12} className="mr-0.5" />
        {trend}
      </span>
    </div>
  </div>
);

const Badge: React.FC<{ icon: string; label: string; date: string; locked?: boolean }> = ({ icon, label, date, locked }) => (
  <div className={`p-4 rounded-2xl text-center border transition-all ${locked ? 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 opacity-50 grayscale' : 'bg-white dark:bg-slate-800 border-emerald-50 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-900'}`}>
    <div className="text-3xl mb-2">{icon}</div>
    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">{label}</p>
    <p className="text-[10px] text-slate-400 uppercase tracking-wider">{date}</p>
  </div>
);

export default Dashboard;