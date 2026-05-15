import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTrending } from '../../hooks/useTrending';

export default function TrendingDashboard() {
  const { trendingData, loading, error, refetch, lastUpdated } = useTrending();

  // Top 10 by pure views volume for the bar chart
  const top10Volume = useMemo(() => {
    if (!trendingData) return [];
    return [...trendingData]
      .sort((a, b) => b.totalViews - a.totalViews)
      .slice(0, 10)
      .map(t => ({
        name: t.id.replace(/-/g, ' '), // basic cleanup if slugs are used
        views: t.totalViews,
      }));
  }, [trendingData]);

  const handleRecalculate = () => {
    refetch();
  };

  if (loading) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center glass-card border border-[#262626] rounded-2xl bg-[#09090B]/80">
        <div className="w-8 h-8 rounded-full border-4 border-[#7C3AED] border-t-transparent animate-spin mb-4" />
        <p className="text-[#737373] font-dm-sans">Running anomaly detection engine...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-8 glass-card border border-red-500/30 rounded-2xl bg-[#09090B]/80">
        <h3 className="text-xl font-syne font-bold text-red-400 mb-2">Error Loading Trending Data</h3>
        <p className="text-[#737373] font-dm-sans">{error}</p>
        <button onClick={handleRecalculate} className="mt-4 px-4 py-2 bg-white/10 rounded-lg text-white">Retry</button>
      </div>
    );
  }

  if (!trendingData || trendingData.length === 0) {
    return (
      <div className="w-full p-12 text-center glass-card border border-[#262626] rounded-2xl bg-[#09090B]/80">
        <h3 className="text-2xl font-syne font-bold text-white mb-2">No Tracking Data Found</h3>
        <p className="text-[#737373] font-dm-sans max-w-md mx-auto">
          The engine requires view data. Ensure your tracking schema is applied and views are being logged in Supabase.
        </p>
        <button 
          onClick={handleRecalculate}
          className="mt-6 px-6 py-3 bg-[#7C3AED]/20 border border-[#7C3AED]/30 text-[#7C3AED] font-medium rounded-xl hover:bg-[#7C3AED]/30 transition-colors"
        >
          Check Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 font-dm-sans">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-syne font-bold text-white">Trending Engine Results</h2>
          <p className="text-[#737373] text-sm mt-1">
            Last recalculated: {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}
          </p>
        </div>
        <button
          onClick={handleRecalculate}
          className="px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(108,99,255,0.3)] flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path></svg>
          Recalculate Now
        </button>
      </div>

      {/* Top 10 Bar Chart */}
      <div className="glass-card border border-[#262626] rounded-2xl bg-[#09090B]/80 p-6 md:p-8">
        <h3 className="text-xl font-syne font-bold text-white mb-6">Top 10 Tools by Volume (30 Days)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={top10Volume} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
              <YAxis stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#1A1A24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
              />
              <Bar dataKey="views" radius={[4, 4, 0, 0]}>
                {top10Volume.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index < 3 ? '#7C3AED' : '#7C3AED'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Anomaly Detection Cards */}
      <div>
        <h3 className="text-xl font-syne font-bold text-white mb-6">Z-Score Anomaly Detection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingData.map((tool, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={tool.id}
              className="glass-card border border-[#262626] rounded-xl p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative overflow-hidden"
            >
              {/* Status Color Glow */}
              <div 
                className="absolute top-0 right-0 w-16 h-16 blur-2xl opacity-20 pointer-events-none rounded-full"
                style={{ backgroundColor: tool.statusColor }}
              />
              
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-bold text-white truncate pr-4 text-lg capitalize">
                  {tool.id.replace(/-/g, ' ')}
                </h4>
                <div 
                  className="px-3 py-1 rounded-full text-xs font-bold shrink-0 whitespace-nowrap border"
                  style={{ 
                    backgroundColor: `${tool.statusColor}20`, 
                    color: tool.statusColor,
                    borderColor: `${tool.statusColor}40`
                  }}
                >
                  {tool.statusLabel}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#737373] uppercase tracking-wider mb-1">Z-Score</p>
                  <p className="text-xl font-syne font-bold text-white">
                    {tool.zScore > 0 ? '+' : ''}{tool.zScore}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#737373] uppercase tracking-wider mb-1">Total Views</p>
                  <p className="text-xl font-syne font-bold text-white">
                    {tool.totalViews}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-[#262626] flex justify-between items-center text-sm">
                <span className="text-[#737373]">7-Day Velocity:</span>
                <span className="text-white font-medium">{tool.views} views</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
