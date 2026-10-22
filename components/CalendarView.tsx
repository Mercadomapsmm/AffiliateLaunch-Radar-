'use client';

import React, { useState } from 'react';
import { LaunchItem, MonthQ4 } from '@/types/launch';
import { Calendar as CalendarIcon, MapPin, DollarSign, ExternalLink, ChevronRight, Sparkles } from 'lucide-react';

interface CalendarViewProps {
  launches: LaunchItem[];
  onOpenDetails: (launch: LaunchItem) => void;
  onOpenAi: (launch: LaunchItem) => void;
}

export function CalendarView({ launches, onOpenDetails, onOpenAi }: CalendarViewProps) {
  const [selectedMonth, setSelectedMonth] = useState<MonthQ4>('Outubro 2026');

  const filtered = launches.filter((l) => l.month === selectedMonth);

  // Group launches by date
  const groupedByDate: { [dateStr: string]: LaunchItem[] } = {};
  filtered.forEach((item) => {
    if (!groupedByDate[item.date]) {
      groupedByDate[item.date] = [];
    }
    groupedByDate[item.date].push(item);
  });

  const sortedDates = Object.keys(groupedByDate).sort();

  return (
    <div className="space-y-6">
      {/* Month Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3 rounded-2xl">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-indigo-400 ml-1" />
          <span className="text-sm font-bold text-white">Cronograma de Lançamentos EUA 2026:</span>
        </div>

        <div className="flex items-center gap-1.5">
          {(['Outubro 2026', 'Novembro 2026', 'Dezembro 2026'] as MonthQ4[]).map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedMonth === m
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {m} ({launches.filter((l) => l.month === m).length})
            </button>
          ))}
        </div>
      </div>

      {/* Date Timeline List */}
      <div className="space-y-4">
        {sortedDates.map((dateStr) => {
          const dayItems = groupedByDate[dateStr];
          const firstItem = dayItems[0];

          return (
            <div 
              key={dateStr}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur shadow-sm hover:border-slate-700 transition-all"
            >
              {/* Date Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-bold text-xs">
                    📅 {dateStr} • {firstItem.dateDisplay}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    {dayItems.length} {dayItems.length === 1 ? 'lançamento no dia' : 'lançamentos neste dia'}
                  </span>
                </div>
              </div>

              {/* Items for this date */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {dayItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 rounded-xl p-3 flex flex-col justify-between group transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
                          {item.niche}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          Score {item.profitabilityScore}
                        </span>
                      </div>

                      <h4 
                        onClick={() => onOpenDetails(item)}
                        className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors cursor-pointer line-clamp-1"
                      >
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                        {item.tagline}
                      </p>

                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-2">
                        <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Comissão</span>
                        <strong className="text-emerald-400 text-xs">${item.commissionPayoutUSD} ({item.commissionPercent}%)</strong>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onOpenAi(item)}
                          className="p-1.5 rounded-lg bg-purple-950/40 text-purple-300 hover:bg-purple-900/60 border border-purple-800/40 transition-colors"
                          title="Gerar Anúncios IA"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onOpenDetails(item)}
                          className="px-2 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-[11px] transition-colors"
                        >
                          Dossiê
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
